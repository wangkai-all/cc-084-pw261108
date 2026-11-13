// 几何原语：环/坐标遍历、自相交、面积、外包框、日期变更线检测
// 纯计算，无 DOM 依赖。
import { isNum } from './util.js';

export const GEOM_TYPES = [
  'Point', 'MultiPoint', 'LineString', 'MultiLineString',
  'Polygon', 'MultiPolygon', 'GeometryCollection',
];

const RING_TYPES = new Set(['Polygon', 'MultiPolygon']);
const LINE_TYPES = new Set(['LineString', 'MultiLineString']);

// ---- 遍历 -----------------------------------------------------------------
// 遍历所有坐标点，回调 (point, path)，path 描述其在几何中的位置。
export function eachCoord(geom, cb, path = []) {
  if (!geom) return;
  if (geom.type === 'GeometryCollection') {
    geom.geometries.forEach((g, i) => eachCoord(g, cb, path.concat(['gc', i])));
    return;
  }
  const walk = (arr, depth, p) => {
    if (depth === 0) cb(arr, p);
    else arr.forEach((c, i) => walk(c, depth - 1, p.concat(i)));
  };
  const depthMap = {
    Point: 0, MultiPoint: 1, LineString: 1, MultiLineString: 2,
    Polygon: 2, MultiPolygon: 3,
  };
  if (geom.type in depthMap) walk(geom.coordinates, depthMap[geom.type], path);
}

export function coordCount(geom) {
  let n = 0;
  eachCoord(geom, () => { n += 1; });
  return n;
}

export function sampleCoords(geom, limit = 200) {
  const out = [];
  eachCoord(geom, (p) => { if (out.length < limit) out.push(p); });
  return out;
}

// 遍历面的每个环：cb(ring, { polygonIndex, ringIndex })
export function eachRing(geom, cb) {
  if (!geom) return;
  if (geom.type === 'GeometryCollection') {
    geom.geometries.forEach((g) => eachRing(g, cb));
  } else if (geom.type === 'Polygon') {
    geom.coordinates.forEach((ring, ri) => cb(ring, { polygonIndex: 0, ringIndex: ri }));
  } else if (geom.type === 'MultiPolygon') {
    geom.coordinates.forEach((poly, pi) =>
      poly.forEach((ring, ri) => cb(ring, { polygonIndex: pi, ringIndex: ri })));
  }
}

export function eachLine(geom, cb) {
  if (!geom) return;
  if (geom.type === 'GeometryCollection') {
    geom.geometries.forEach((g) => eachLine(g, cb));
  } else if (geom.type === 'LineString') {
    cb(geom.coordinates, { lineIndex: 0 });
  } else if (geom.type === 'MultiLineString') {
    geom.coordinates.forEach((line, i) => cb(line, { lineIndex: i }));
  }
}

export function isEmptyGeom(geom) {
  if (!geom) return true;
  if (geom.type === 'GeometryCollection') {
    return geom.geometries.length === 0 || geom.geometries.every(isEmptyGeom);
  }
  if (!('coordinates' in geom)) return true;
  const c = geom.coordinates;
  if (c == null) return true;
  if (Array.isArray(c) && c.length === 0) return true;
  // Polygon: [ [] ] 空环
  let hasPoint = false;
  eachCoord(geom, () => { hasPoint = true; });
  return !hasPoint;
}

// ---- 外包框 ----------------------------------------------------------------
export function bbox(geom) {
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
  eachCoord(geom, ([x, y]) => {
    if (!isNum(x) || !isNum(y)) return;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  if (!Number.isFinite(minX)) return null;
  return [minX, minY, maxX, maxY];
}

// ---- 线段相交 --------------------------------------------------------------
function cross(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

function onSegment(px, py, ax, ay, bx, by) {
  return Math.min(ax, bx) - 1e-12 <= px && px <= Math.max(ax, bx) + 1e-12
    && Math.min(ay, by) - 1e-12 <= py && py <= Math.max(ay, by) + 1e-12;
}

const EPS = 1e-12;

// 返回 { proper, weak(顶点接触), point, collinear }
export function segIntersect(a, b, c, d) {
  const [ax, ay] = a; const [bx, by] = b; const [cx, cy] = c; const [dx, dy] = d;
  const d1 = cross(cx, cy, dx, dy, ax, ay);
  const d2 = cross(cx, cy, dx, dy, bx, by);
  const d3 = cross(ax, ay, bx, by, cx, cy);
  const d4 = cross(ax, ay, bx, by, dx, dy);
  if (((d1 > EPS && d2 < -EPS) || (d1 < -EPS && d2 > EPS))
    && ((d3 > EPS && d4 < -EPS) || (d3 < -EPS && d4 > EPS))) {
    const t = d3 / (d3 - d4);
    return { proper: true, weak: false, point: [ax + t * (bx - ax), ay + t * (by - ay)] };
  }
  // 共线重叠
  if (Math.abs(d1) <= EPS && Math.abs(d2) <= EPS
    && Math.abs(d3) <= EPS && Math.abs(d4) <= EPS) {
    return { proper: false, weak: true, collinear: true, point: null };
  }
  // 端点落在另一线段上（非公共端点的接触）
  const touches = [];
  if (Math.abs(d1) <= EPS && onSegment(ax, ay, cx, cy, dx, dy)) touches.push(a);
  if (Math.abs(d2) <= EPS && onSegment(bx, by, cx, cy, dx, dy)) touches.push(b);
  if (Math.abs(d3) <= EPS && onSegment(cx, cy, ax, ay, bx, by)) touches.push(c);
  if (Math.abs(d4) <= EPS && onSegment(dx, dy, ax, ay, bx, by)) touches.push(d);
  if (touches.length) return { proper: false, weak: true, point: touches[0] };
  return null;
}

function samePt(a, b, tol = 1e-9) {
  return Math.abs(a[0] - b[0]) <= tol && Math.abs(a[1] - b[1]) <= tol;
}

// 环/线自相交。返回数组：{ point, proper, weak, edges:[i,j] }
export function selfIntersections(ring) {
  const out = [];
  const n = ring.length;
  for (let i = 0; i < n - 1; i += 1) {
    for (let j = i + 1; j < n - 1; j += 1) {
      const adjacent = j === i + 1;
      const wrapAdjacent = i === 0 && j === n - 2; // 闭合环的首尾边
      const hit = segIntersect(ring[i], ring[i + 1], ring[j], ring[j + 1]);
      if (!hit) continue;
      if ((adjacent || wrapAdjacent) && !hit.proper && !hit.collinear) continue; // 公共端点，正常
      if (hit.proper || hit.collinear) {
        out.push({ point: hit.point, proper: hit.proper, collinear: Boolean(hit.collinear), weak: false, edges: [i, j] });
      } else if (hit.weak) {
        out.push({ point: hit.point, proper: false, weak: true, edges: [i, j] });
      }
    }
  }
  return out;
}

// ---- 环的结构检查 ----------------------------------------------------------
export function ringIsClosed(ring) {
  return ring.length >= 2 && samePt(ring[0], ring[ring.length - 1]);
}

// 连续重复点（返回索引）
export function repeatedPoints(ring) {
  const idxs = [];
  for (let i = 1; i < ring.length; i += 1) {
    if (samePt(ring[i - 1], ring[i])) idxs.push(i);
  }
  return idxs;
}

// 有向环面积（平面鞋带公式，带符号）
export function ringAreaPlanar(ring) {
  let s = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    s += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return s / 2;
}

// 球面环面积（平方米，带符号），基于经纬度
const EARTH_R = 6378137;
export function ringAreaSpherical(ring) {
  let s = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const lon1 = (ring[i][0] * Math.PI) / 180;
    const lat1 = (ring[i][1] * Math.PI) / 180;
    const lon2 = (ring[i + 1][0] * Math.PI) / 180;
    const lat2 = (ring[i + 1][1] * Math.PI) / 180;
    s += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }
  return (s * EARTH_R * EARTH_R) / 2;
}

// 几何面积（m²）。geographic=true 时用球面公式；洞自动扣除。
export function geometryArea(geom, geographic) {
  if (!geom || isEmptyGeom(geom)) return 0;
  const ringArea = geographic ? ringAreaSpherical : ringAreaPlanar;
  let total = 0;
  eachRing(geom, (ring, { ringIndex }) => {
    if (ring.length < 4) return;
    const a = ringArea(ring);
    total += ringIndex === 0 ? a : -a;
  });
  return Math.abs(total);
}

// 点在环内（射线法）
export function pointInRing([x, y], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0]; const yi = ring[i][1];
    const xj = ring[j][0]; const yj = ring[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// ---- 日期变更线 ------------------------------------------------------------
// 任意相邻坐标经度跳变 > 180° 即视为跨日期变更线（保留原始拓扑，仅标记与渲染拆分）。
export function crossesAntimeridian(geom) {
  let hit = false;
  const checkLine = (line) => {
    for (let i = 1; i < line.length; i += 1) {
      if (Math.abs(line[i][0] - line[i - 1][0]) > 180) { hit = true; }
    }
  };
  eachLine(geom, checkLine);
  eachRing(geom, (ring) => checkLine(ring));
  return hit;
}

// 将一条线在日期变更线处拆成多段（用于渲染；不改原数据）。
// 在经度跳变 >180° 的边处，按比例在 ±180 插入同纬度的连接点；
// 两个连接点各自归属所在半球一侧，保证每段经度跨度不超过 180。
export function splitLineAtDateline(line) {
  const parts = [[]];
  for (let i = 0; i < line.length; i += 1) {
    const p = line[i];
    if (i === 0) { parts[0].push(p); continue; }
    const prev = line[i - 1];
    const dx = p[0] - prev[0];
    if (Math.abs(dx) > 180) {
      // t: 从 prev 走到其同侧 ±180 经线的比例
      const boundaryLon = prev[0] > 0 ? 180 : -180;
      const t = (boundaryLon - prev[0]) / dx;
      const lat = prev[1] + (p[1] - prev[1]) * t;
      // 末端：prev 侧的 ±180 连接点
      parts[parts.length - 1].push([boundaryLon, lat]);
      // 新段：p 侧的 ∓180 连接点（作为一个坐标点推入）
      parts.push([[-boundaryLon, lat]]);
    }
    parts[parts.length - 1].push(p);
  }
  return parts.filter((p) => p.length >= 2);
}

export { RING_TYPES, LINE_TYPES, samePt };
