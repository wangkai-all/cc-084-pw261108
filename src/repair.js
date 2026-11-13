// 候选修复引擎：绝不修改源图层/源几何，只生成候选副本并记录全部改动。
import { deepClone, uid, stableHash } from './util.js';
import {
  isEmptyGeom, eachRing, eachLine, selfIntersections, ringIsClosed,
  repeatedPoints, geometryArea,
} from './geom.js';

// ---- 原子修复（输入/输出均为新几何，不动入参） -----------------------------

function fixRingClosed(ring) {
  if (ringIsClosed(ring) || ring.length < 2) return ring;
  return ring.concat([deepClone(ring[0])]);
}

function fixRingDedup(ring) {
  const out = [ring[0]];
  for (let i = 1; i < ring.length; i += 1) {
    const prev = out[out.length - 1];
    if (prev[0] !== ring[i][0] || prev[1] !== ring[i][1]) out.push(ring[i]);
  }
  // 保持闭合
  if (ring.length > 1 && ringIsClosed(ring) && !ringIsClosed(out)) {
    out.push(deepClone(out[0]));
  }
  return out;
}

// 线的连续点去重：不做闭合处理，保留首尾
function dedupLine(line) {
  if (line.length < 2) return deepClone(line);
  const out = [line[0]];
  for (let i = 1; i < line.length; i += 1) {
    const prev = out[out.length - 1];
    if (prev[0] !== line[i][0] || prev[1] !== line[i][1]) out.push(line[i]);
  }
  return out;
}

// 交换所有坐标的 x/y（经纬度颠倒修复），保留 z
function swapAxesGeom(geom) {
  const swap = (v, depth) => {
    if (depth === 0) {
      const [x, y, ...rest] = v;
      return [y, x, ...rest];
    }
    return v.map((c) => swap(c, depth - 1));
  };
  const depthMap = {
    Point: 0, MultiPoint: 1, LineString: 1, MultiLineString: 2,
    Polygon: 2, MultiPolygon: 3,
  };
  return { type: geom.type, coordinates: swap(geom.coordinates, depthMap[geom.type]) };
}

// 闭合 + 去重，应用到几何内所有环；线几何做连续点去重（不闭合）
function fixRingIssues(geom) {
  const out = deepClone(geom);
  eachRing(out, (ring) => {
    let r = fixRingClosed(ring);
    r = fixRingDedup(r);
    ring.length = 0;
    ring.push(...r);
  });
  eachLine(out, (line) => {
    const deduped = dedupLine(line);
    line.length = 0;
    line.push(...deduped);
  });
  return out;
}

// 经典蝴蝶结（单个真交点）拆分为两个多边形；复杂多交点返回 null（仅标记不自动修）。
function splitBowtie(ring) {
  const hits = selfIntersections(ring).filter((h) => h.proper);
  if (hits.length !== 1 || !hits[0].point) return null;
  const P = hits[0].point;
  const [e1, e2] = hits[0].edges;
  const base = ringIsClosed(ring) ? ring.slice(0, -1) : ring.slice();
  const n = base.length;
  // 把交点 P 插入两条相交边之后，顶点环变为 ... v_e1, P, v_e1+1, ... v_e2, P, v_e2+1 ...
  const inserted = [];
  for (let i = 0; i < n; i += 1) {
    inserted.push(base[i]);
    if (i === e1 || i === e2) inserted.push(P);
  }
  const pIdx = inserted.map((p, i) => (p === P ? i : -1)).filter((i) => i >= 0);
  if (pIdx.length !== 2) return null;
  const [pA, pB] = pIdx;
  const chain = (from, to) => {
    const out = [];
    for (let k = from; k !== to; k = (k + 1) % inserted.length) out.push(inserted[k]);
    out.push(inserted[to]);
    return out;
  };
  const loop1 = chain(pA, pB);          // 第一个闭合环（两端都是 P）
  const loop2 = chain(pB, pA);          // 第二个闭合环
  const close = (loop) => {
    const first = loop[0]; const last = loop[loop.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) loop.push([...first]);
    return loop;
  };
  const polys = [loop1, loop2]
    .map(close)
    .filter((r) => r.length >= 4
      && Math.abs(geometryArea({ type: 'Polygon', coordinates: [r] }, false)) > 1e-12);
  if (polys.length < 1) return null;
  return polys;
}

function fixSelfIntersect(geom) {
  // 仅处理 Polygon（单环蝴蝶结）；MultiPolygon 逐面
  if (geom.type === 'Polygon' && geom.coordinates.length === 1) {
    const split = splitBowtie(geom.coordinates[0]);
    if (!split) return { geom: null, note: '存在多个交点，无法自动拆分，仅标记' };
    return {
      geom: { type: 'MultiPolygon', coordinates: split.map((r) => [r]) },
      note: `蝴蝶结多边形已在交点处拆分为 ${split.length} 个多边形`,
    };
  }
  if (geom.type === 'MultiPolygon') {
    const out = [];
    let changed = false; let failed = false;
    for (const poly of geom.coordinates) {
      if (poly.length === 1) {
        const split = splitBowtie(poly[0]);
        if (split) { split.forEach((r) => out.push([r])); changed = true; }
        else { out.push(poly); failed = true; }
      } else out.push(poly);
    }
    if (!changed) return { geom: null, note: failed ? '含多交点或带洞自相交，无法自动拆分' : '无需拆分' };
    return {
      geom: { type: 'MultiPolygon', coordinates: out },
      note: failed ? '部分蝴蝶结已拆分，复杂面保留原样' : `已拆分为 ${out.length} 个多边形`,
    };
  }
  return { geom: null, note: '该几何类型的自相交不支持自动修复' };
}

// ---- 候选副本生成 ----------------------------------------------------------
// actions: 需要应用的问题类型集合
export function buildCandidate(sourceLayer, issueList, actions, { geographic = true } = {}) {
  const selected = new Set(actions);
  const features = [];
  const changeLog = [];
  const areaChanges = [];
  let removed = 0; let splitCount = 0; let modified = 0;
  const issuesByFid = new Map();
  const layerLevelTypes = new Set(); // featureFid 为 null 的图层级问题（轴顺序/误判等）
  for (const iss of issueList) {
    if (iss.layerId !== sourceLayer.lid || !selected.has(iss.type)) continue;
    if (iss.featureFid === null) { layerLevelTypes.add(iss.type); continue; }
    if (!issuesByFid.has(iss.featureFid)) issuesByFid.set(iss.featureFid, []);
    issuesByFid.get(iss.featureFid).push(iss);
  }

  const areaOf = (geom) => (geom ? geometryArea(geom, geographic) : 0);

  for (const original of sourceLayer.features) {
    const myIssues = issuesByFid.get(original.fid) || [];
    // 图层级问题作用于该图层的每个要素
    const types = new Set([...myIssues.map((i) => i.type), ...layerLevelTypes]);
    if (myIssues.length === 0 && layerLevelTypes.size === 0) {
      features.push(cloneFeature(original, { action: 'kept', note: '未涉及所选检查项' }));
      continue;
    }
    let geom = deepClone(original.geometry);
    const notes = [];
    let dupKey = null;

    // 空几何：移除（单独处理，不与其他修复叠加）
    if (types.has('EMPTY_GEOM')) {
      removed += 1;
      changeLog.push({ sourceIndex: original.sourceIndex, line: original.lineStart, action: 'removed', reason: '空几何', detail: myIssues[0].detail });
      continue;
    }
    if (types.has('AXIS_SWAPPED')) {
      geom = swapAxesGeom(geom);
      notes.push('已交换 x/y 轴（经纬度顺序纠正）');
    }
    if (types.has('INVALID_POLY') || types.has('REPEATED_POINT')) {
      const before = JSON.stringify(geom);
      geom = fixRingIssues(geom);
      if (JSON.stringify(geom) !== before) notes.push('已闭合未闭合环并移除连续重复点');
    }
    if (types.has('SELF_INTERSECT')) {
      const res = fixSelfIntersect(geom);
      if (res.geom) { geom = res.geom; notes.push(res.note); splitCount += 1; }
      else notes.push(res.note || '自相交无法自动修复，保留原样');
    }
    if (types.has('DUPLICATE')) {
      // 保留同组第一个：用 dupKey 在本轮已输出要素中判定
      const key = myIssues.find((i) => i.dupKey)?.dupKey || stableHash(original.geometry);
      const kept = features.find((f) => f._dupKey === key);
      if (kept) {
        removed += 1;
        changeLog.push({ sourceIndex: original.sourceIndex, line: original.lineStart, action: 'removed', reason: '重复要素', detail: `与要素 #${kept.sourceIndex} 重复` });
        continue;
      }
      notes.push('重复组保留首个，其余移除');
      dupKey = key;
    }
    if (types.has('PROJECTED_AS_LL')) {
      notes.push('未改动坐标；请在导出时把 CRS 重新指定为正确的投影坐标系（候选副本可改 CRS 声明）');
    }

    const beforeArea = areaOf(original.geometry);
    const afterArea = areaOf(geom);
    const changedGeom = JSON.stringify(geom) !== JSON.stringify(original.geometry);
    const nf = cloneFeature(original, {
      action: changedGeom ? 'modified' : 'kept',
      note: notes.join('；') || '检查项无需几何改动',
      newGeom: geom,
    });
    if (dupKey) nf._dupKey = dupKey;
    features.push(nf);
    if (changedGeom) modified += 1;
    areaChanges.push({
      sourceIndex: original.sourceIndex,
      line: original.lineStart,
      before: beforeArea,
      after: afterArea,
      delta: afterArea - beforeArea,
      comparable: beforeArea > 0 || afterArea > 0,
      note: notes.join('；'),
    });
    changeLog.push({
      sourceIndex: original.sourceIndex, line: original.lineStart,
      action: changedGeom ? 'modified' : 'kept',
      reason: [...types].join(', '), detail: notes.join('；'),
    });
  }

  const candidate = {
    lid: uid('layer'),
    name: `${sourceLayer.name}__候选修复_${new Date().toISOString().slice(11, 19).replace(/:/g, '')}`,
    sourceName: `${sourceLayer.name}__candidate.geojson`,
    sourceKind: 'geojson',
    features: features.map(stripInternal),
    crs: sourceLayer.crs,
    crsRaw: sourceLayer.crsRaw,
    crsUser: sourceLayer.crsUser,
    crsMissing: sourceLayer.crsMissing,
    importedAt: new Date().toISOString(),
    isCandidate: true,
    derivedFrom: sourceLayer.lid,
    lineage: {
      sourceLayer: sourceLayer.name,
      sourceFile: sourceLayer.sourceName,
      sourceCrs: sourceLayer.crs,
      generatedAt: new Date().toISOString(),
      actions: [...selected],
      changeLog,
      areaChanges,
      stats: { input: sourceLayer.features.length, output: features.length, removed, modified, splitCount },
      guarantee: '源文件与源图层未被修改；本图层为候选副本',
    },
  };
  return candidate;
}

function cloneFeature(original, { action, note, newGeom }) {
  const geom = newGeom ? deepClone(newGeom) : deepClone(original.geometry);
  return {
    fid: uid('f'),
    sourceIndex: original.sourceIndex,
    id: original.id,
    properties: deepClone(original.properties),
    geometry: geom,
    originalGeometry: deepClone(original.originalGeometry), // 原始坐标随副本留存
    source: original.source,
    lineStart: original.lineStart,
    lineEnd: original.lineEnd,
    coordCount: original.coordCount,
    empty: isEmptyGeom(geom),
    geomHash: stableHash(geom),
    lineage: {
      action, note,
      sourceFid: original.fid,
      sourceLine: original.lineStart,
    },
  };
}

function stripInternal(f) {
  const { _dupKey, ...rest } = f;
  return rest;
}

// 导出为 GeoJSON（含质检溯源元数据；坐标使用图层当前 CRS）
export function candidateToGeoJson(layer) {
  const fc = {
    type: 'FeatureCollection',
    name: layer.name,
    crs: layer.crs ? { type: 'name', properties: { name: layer.crs } } : undefined,
    __qc_lineage: layer.lineage,
    features: layer.features.map((f) => ({
      type: 'Feature',
      id: f.id,
      properties: {
        ...f.properties,
        _qc_source_index: f.sourceIndex,
        _qc_source_line: f.lineStart,
        _qc_repair: f.lineage ? f.lineage.action : undefined,
        _qc_repair_note: f.lineage ? f.lineage.note : undefined,
      },
      geometry: f.geometry,
    })),
  };
  return JSON.stringify(fc, null, 2);
}
