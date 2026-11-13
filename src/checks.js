// 质检引擎：对图层运行全部检查，生成问题列表。
// 每个问题都带：图层、要素序号、源行号、坐标路径，可点回地图图形与原始行。
import { isNum } from './util.js';
import { isGeographic, inferAxisHint, ensureCrs } from './crs.js';
import {
  eachCoord, eachRing, eachLine, isEmptyGeom, bbox,
  selfIntersections, ringIsClosed, repeatedPoints, crossesAntimeridian,
  pointInRing, geometryArea,
} from './geom.js';
import { stableHash } from './util.js';

export const ISSUE_TYPES = {
  CRS_MISSING:    { sev: 'critical', label: '坐标系缺失', hint: '无法投影转换，需显式指定 CRS' },
  CRS_UNKNOWN:    { sev: 'critical', label: '坐标系无法识别', hint: '元数据中的 CRS 名称无效' },
  AXIS_SWAPPED:   { sev: 'critical', label: '经纬度疑似颠倒', hint: '数值范围显示 (lat, lon) 而非 (lon, lat)' },
  PROJECTED_AS_LL:{ sev: 'critical', label: '投影坐标误当经纬度', hint: '数值远超 ±180/±90，疑似平面坐标' },
  OUT_OF_BOUNDS:  { sev: 'serious',  label: '越界坐标点', hint: '经度须在 [-180,180]、纬度在 [-90,90]' },
  EMPTY_GEOM:     { sev: 'serious',  label: '空几何', hint: '几何缺失或坐标为空，需单独处理' },
  INVALID_POLY:   { sev: 'serious',  label: '非法多边形', hint: '未闭合、自相交、洞在外等' },
  SELF_INTERSECT: { sev: 'serious',  label: '自相交', hint: '环/线自身交叉，拓扑无效' },
  DUPLICATE:      { sev: 'warning', label: '重复要素', hint: '几何（及属性）完全相同' },
  DATELINE:       { sev: 'warning', label: '跨日期变更线', hint: '已保留原始拓扑，渲染时拆分显示' },
  GEOM_COLLECTION:{ sev: 'info',    label: '集合几何', hint: '检查/修复时拆分为成员几何处理' },
  REPEATED_POINT: { sev: 'warning', label: '连续重复点', hint: '相邻坐标完全相同' },
};

let issueSeq = 0;
function makeIssue(type, layer, feature, extra = {}) {
  const t = ISSUE_TYPES[type];
  issueSeq += 1;
  return {
    iid: `iss_${issueSeq}`,
    type,
    severity: t.sev,
    label: t.label,
    hint: t.hint,
    layerId: layer.lid,
    layerName: layer.name,
    featureFid: feature ? feature.fid : null,
    sourceIndex: feature ? feature.sourceIndex : null,
    lineStart: feature ? feature.lineStart : null,
    lineEnd: feature ? feature.lineEnd : null,
    coordPath: null,
    point: null,
    detail: '',
    repairable: false,
    ...extra,
  };
}

// 收集图层内所有坐标样本（用于轴顺序启发式）
function sampleLayerCoords(layer, cap = 500) {
  const sample = [];
  for (const f of layer.features) {
    eachCoord(f.geometry, (p) => {
      if (sample.length < cap && p.length >= 2) sample.push(p);
    });
  }
  return sample;
}

function checkCrsAndAxis(layer, issues) {
  if (!layer.crs || layer.crsMissing) {
    issues.push(makeIssue('CRS_MISSING', layer, null, {
      detail: `图层「${layer.name}」没有可读的 CRS 元数据，投影转换已停止；请显式指定坐标系`,
      repairable: false,
    }));
    return;
  }
  if (!ensureCrs(layer.crs)) {
    issues.push(makeIssue('CRS_UNKNOWN', layer, null, {
      detail: `CRS「${layer.crs}」不在内置定义中，投影转换已停止`,
    }));
    return;
  }
  if (!isGeographic(layer.crs)) return; // 投影坐标系不做经纬度范围判断

  const hint = inferAxisHint(sampleLayerCoords(layer));
  if (hint.total === 0) return;
  const swappedRatio = hint.swapped / hint.total;
  const projectedRatio = hint.projected / hint.total;
  if (projectedRatio > 0.5) {
    issues.push(makeIssue('PROJECTED_AS_LL', layer, null, {
      detail: `${(projectedRatio * 100).toFixed(0)}% 的坐标超出经纬度范围，当前 CRS 声明为地理坐标系，疑似把平面坐标误当经纬度`,
      repairable: true,
    }));
  } else if (swappedRatio > 0.5 && hint.lonLike === 0) {
    issues.push(makeIssue('AXIS_SWAPPED', layer, null, {
      detail: `多数点满足 |x|≤90 且 |y|≤180，疑似经纬度顺序颠倒为 (lat, lon)`,
      repairable: true,
    }));
  }
}

function checkBoundsAndEmpty(layer, issues, geo) {
  for (const f of layer.features) {
    if (isEmptyGeom(f.geometry)) {
      issues.push(makeIssue('EMPTY_GEOM', layer, f, {
        detail: `要素 #${f.sourceIndex} 几何为空（${f.geometry ? f.geometry.type : '无 geometry 字段'}）`,
        repairable: true,
      }));
      continue;
    }
    if (f.geometry.type === 'GeometryCollection') {
      issues.push(makeIssue('GEOM_COLLECTION', layer, f, {
        detail: `要素 #${f.sourceIndex} 为 GeometryCollection，含 ${f.geometry.geometries.length} 个成员，检查与修复按成员拆分，原始集合保留`,
      }));
    }
    if (geo) {
      const bad = [];
      eachCoord(f.geometry, (p, path) => {
        const [x, y] = p;
        if (!isNum(x) || !isNum(y) || x < -180 || x > 180 || y < -90 || y > 90) {
          bad.push({ p, path });
        }
      });
      if (bad.length) {
        issues.push(makeIssue('OUT_OF_BOUNDS', layer, f, {
          coordPath: bad[0].path,
          point: bad[0].p,
          detail: `要素 #${f.sourceIndex} 有 ${bad.length} 个越界坐标点，首个：[${bad[0].p.map((v) => (isNum(v) ? v : 'NaN')).join(', ')}]`,
        }));
      }
    }
    if (crossesAntimeridian(f.geometry)) {
      issues.push(makeIssue('DATELINE', layer, f, {
        detail: `要素 #${f.sourceIndex} 含经度跳变 >180° 的线段，跨日期变更线；原始坐标与拓扑保留，仅在渲染时拆分`,
      }));
    }
  }
}

function checkPolygonValidity(layer, issues) {
  for (const f of layer.features) {
    if (isEmptyGeom(f.geometry)) continue;
    // 自相交（面环 + 线）
    eachRing(f.geometry, (ring, loc) => {
      if (ring.length < 4) {
        issues.push(makeIssue('INVALID_POLY', layer, f, {
          coordPath: ['coordinates', loc.polygonIndex, loc.ringIndex],
          detail: `要素 #${f.sourceIndex} 第 ${loc.ringIndex + 1} 个环只有 ${ring.length} 个点，无法构成面`,
          repairable: true,
        }));
        return;
      }
      if (!ringIsClosed(ring)) {
        issues.push(makeIssue('INVALID_POLY', layer, f, {
          coordPath: ['coordinates', loc.polygonIndex, loc.ringIndex],
          point: ring[ring.length - 1],
          detail: `要素 #${f.sourceIndex} 第 ${loc.ringIndex + 1} 个环未闭合（首尾点不一致）`,
          repairable: true,
        }));
      }
      const dup = repeatedPoints(ring);
      if (dup.length) {
        issues.push(makeIssue('REPEATED_POINT', layer, f, {
          coordPath: ['coordinates', loc.polygonIndex, loc.ringIndex, dup[0]],
          point: ring[dup[0]],
          detail: `要素 #${f.sourceIndex} 环内有 ${dup.length} 处连续重复点`,
          repairable: true,
        }));
      }
      const hits = selfIntersections(ring);
      const proper = hits.filter((h) => h.proper || h.collinear);
      if (proper.length) {
        issues.push(makeIssue('SELF_INTERSECT', layer, f, {
          coordPath: ['coordinates', loc.polygonIndex, loc.ringIndex],
          point: proper[0].point,
          detail: `要素 #${f.sourceIndex} 第 ${loc.ringIndex + 1} 个环存在 ${proper.length} 处自相交（含共线重叠），交点约 (${proper[0].point ? proper[0].point.map((v) => v.toFixed(4)).join(', ') : '共线'})`,
          repairable: true,
        }));
      }
    });
    eachLine(f.geometry, (line, loc) => {
      if (line.length < 2) return;
      const dupLine = repeatedPoints(line);
      if (dupLine.length) {
        issues.push(makeIssue('REPEATED_POINT', layer, f, {
          coordPath: ['coordinates', loc.lineIndex, dupLine[0]],
          point: line[dupLine[0]],
          detail: `要素 #${f.sourceIndex} 线 ${loc.lineIndex + 1} 有 ${dupLine.length} 处连续重复点`,
          repairable: true,
        }));
      }
      const hits = selfIntersections(line);
      const proper = hits.filter((h) => h.proper);
      if (proper.length) {
        issues.push(makeIssue('SELF_INTERSECT', layer, f, {
          coordPath: ['coordinates', loc.lineIndex],
          point: proper[0].point,
          detail: `要素 #${f.sourceIndex} 线 ${loc.lineIndex + 1} 存在 ${proper.length} 处自相交`,
          repairable: true,
        }));
      }
    });
    // 洞必须在外环内部
    eachRing(f.geometry, (ring, loc) => {
      if (loc.ringIndex !== 0 || ring.length < 4) return;
      const outer = ring;
      const polyRings = f.geometry.type === 'Polygon'
        ? f.geometry.coordinates
        : f.geometry.coordinates[loc.polygonIndex];
      for (let hi = 1; hi < polyRings.length; hi += 1) {
        const hole = polyRings[hi];
        if (!hole.length) continue;
        if (!pointInRing(hole[0], outer)) {
          issues.push(makeIssue('INVALID_POLY', layer, f, {
            coordPath: ['coordinates', loc.polygonIndex, hi],
            point: hole[0],
            detail: `要素 #${f.sourceIndex} 第 ${hi + 1} 个洞的参考点落在外环之外，多边形非法`,
            repairable: false,
          }));
        }
      }
    });
  }
}

function checkDuplicates(layer, issues) {
  const byGeom = new Map();
  const byAll = new Map();
  for (const f of layer.features) {
    if (f.empty) continue;
    const gKey = stableHash(f.geometry);
    if (!byGeom.has(gKey)) byGeom.set(gKey, []);
    byGeom.get(gKey).push(f);
    const aKey = stableHash({ g: f.geometry, p: f.properties });
    if (!byAll.has(aKey)) byAll.set(aKey, []);
    byAll.get(aKey).push(f);
  }
  const reported = new Set();
  for (const [key, group] of byAll) {
    if (group.length > 1) {
      for (const f of group) {
        reported.add(f.fid);
        issues.push(makeIssue('DUPLICATE', layer, f, {
          detail: `要素 #${f.sourceIndex} 与 #${group.filter((g) => g !== f).map((g) => g.sourceIndex).join(', #')} 几何与属性完全相同`,
          repairable: true,
          dupKey: key,
        }));
      }
    }
  }
  for (const [key, group] of byGeom) {
    if (group.length > 1) {
      for (const f of group) {
        if (reported.has(f.fid)) continue;
        issues.push(makeIssue('DUPLICATE', layer, f, {
          detail: `要素 #${f.sourceIndex} 几何与其他 ${group.length - 1} 个要素重合（属性不同）`,
          repairable: true,
          dupKey: key,
        }));
      }
    }
  }
}

export function runChecks(layers) {
  const issues = [];
  for (const layer of layers) {
    const geo = layer.crs ? isGeographic(layer.crs) : true; // 缺失时仍按经纬度做越界提示
    checkCrsAndAxis(layer, issues);
    checkBoundsAndEmpty(layer, issues, geo);
    checkPolygonValidity(layer, issues);
    checkDuplicates(layer, issues);
  }
  // 按严重度排序
  const order = { critical: 0, serious: 1, warning: 2, info: 3 };
  issues.sort((a, b) => order[a.severity] - order[b.severity]
    || a.layerName.localeCompare(b.layerName)
    || (a.sourceIndex ?? 0) - (b.sourceIndex ?? 0));
  // 汇总
  const summary = { total: issues.length, critical: 0, serious: 0, warning: 0, info: 0 };
  for (const iss of issues) summary[iss.severity] += 1;
  const featureCount = layers.reduce((s, l) => s + l.features.length, 0);
  const emptyCount = layers.reduce((s, l) => s + l.features.filter((f) => f.empty).length, 0);
  return { issues, summary, featureCount, emptyCount };
}

// 计算要素面积（供修复前后对比）
export function featureArea(feature, geographic) {
  if (!feature || feature.empty) return 0;
  return geometryArea(feature.geometry, geographic);
}

export { bbox };
