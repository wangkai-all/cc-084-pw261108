// 应用状态与核心动作
import { parseGeoJson, parseCsv } from './parsing.js';
import { runChecks, ISSUE_TYPES } from './checks.js';
import { buildCandidate, candidateToGeoJson } from './repair.js';
import { ensureCrs, isGeographic, CRS_REGISTRY, utmCode } from './crs.js';
import { deepClone, download, makeCsv, esc, fmtNum, fmtArea, uid } from './util.js';
import { isEmptyGeom } from './geom.js';

const LAYER_COLORS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#6250d6'];

export const state = {
  layers: [],          // 图层（源图层 + 候选副本图层）
  mapEntries: [],      // 地图渲染条目
  report: null,        // runChecks 结果
  displayCrs: 'EPSG:4326', // 地图级统一显示 CRS（仅影响渲染，原始坐标不变）
  filters: { layerId: '', severity: '', type: '', text: '' },
  selectedIssueId: null,
  selectedFid: null,
  activeTab: 'issues',
  csvDraft: null,      // 待确认的 CSV 导入
};

export function layerColor(index) {
  return LAYER_COLORS[index % LAYER_COLORS.length];
}

export function addLayer(layer) {
  const idx = state.layers.length;
  state.layers.push(layer);
  state.mapEntries.push({
    lid: layer.lid,
    layer,
    visible: true,
    color: layer.isCandidate ? '#1baf7a' : layerColor(idx),
    displayCrs: layer.crs,
    _cache: null,
  });
  refreshChecks();
}

export function removeLayer(lid) {
  state.layers = state.layers.filter((l) => l.lid !== lid);
  state.mapEntries = state.mapEntries.filter((e) => e.lid !== lid);
  refreshChecks();
}

export function refreshChecks() {
  state.report = runChecks(state.layers);
  return state.report;
}

export function mapEntryOf(lid) {
  return state.mapEntries.find((e) => e.lid === lid);
}

export function featureById(fid) {
  for (const layer of state.layers) {
    const f = layer.features.find((x) => x.fid === fid);
    if (f) return { feature: f, layer };
  }
  return null;
}

export function issuesOfFeature(fid) {
  return state.report ? state.report.issues.filter((i) => i.featureFid === fid) : [];
}

// ---- 过滤后的问题列表 -------------------------------------------------------
export function filteredIssues() {
  const { layerId, severity, type, text } = state.filters;
  const q = text.trim().toLowerCase();
  return state.report.issues.filter((iss) => {
    if (layerId && iss.layerId !== layerId) return false;
    if (severity && iss.severity !== severity) return false;
    if (type && iss.type !== type) return false;
    if (q) {
      const hay = `${iss.label} ${iss.detail} ${iss.layerName} ${iss.lineStart ?? ''} ${iss.sourceIndex ?? ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

// ---- 文件导入 ---------------------------------------------------------------
export async function importGeoJsonFiles(fileList) {
  const msgs = [];
  for (const file of fileList) {
    const text = await file.text();
    const { layer, warnings } = parseGeoJson(text, file.name);
    addLayer(layer);
    msgs.push(`已导入 ${file.name}：${layer.features.length} 个要素`
      + (layer.crsMissing ? '（缺 CRS，投影转换已停止）' : `，CRS=${layer.crs}`));
    warnings.forEach((w) => msgs.push(`⚠ ${w}`));
  }
  return msgs;
}

export function importCsv(text, fileName, opts) {
  const { layer, warnings } = parseCsv(text, fileName, opts);
  addLayer(layer);
  return { layer, warnings };
}

export function assignCrs(lid, code) {
  const layer = state.layers.find((l) => l.lid === lid);
  if (!layer) return;
  layer.crsUser = code;
  layer.crs = code;
  layer.crsMissing = !code;
  const entry = mapEntryOf(lid);
  if (entry) entry._cache = null;
  refreshChecks();
}

// ---- 候选修复 ---------------------------------------------------------------
export function createCandidate(sourceLayerId, actionTypes, basis) {
  const source = state.layers.find((l) => l.lid === sourceLayerId);
  if (!source) throw new Error('找不到源图层');
  const geographic = basis === 'geo';
  const candidate = buildCandidate(source, state.report.issues, actionTypes, { geographic });
  addLayer(candidate);
  return candidate;
}

export function exportCandidate(layer) {
  const text = candidateToGeoJson(layer);
  download(layer.sourceName, text, 'application/geo+json');
}

export function exportIssuesCsv() {
  const rows = [['图层', '严重度', '问题类型', '要素序号', '源起始行', '源结束行', '详情', '可修复']];
  for (const iss of filteredIssues()) {
    rows.push([
      iss.layerName, iss.severity, iss.label,
      iss.sourceIndex ?? '', iss.lineStart ?? '', iss.lineEnd ?? '',
      iss.detail, iss.repairable ? '是' : '否',
    ]);
  }
  download(`质检问题_${new Date().toISOString().slice(0, 10)}.csv`, makeCsv(rows), 'text/csv');
}

// ---- 可选 CRS 列表 ----------------------------------------------------------
export function crsOptions() {
  const opts = CRS_REGISTRY.map((c) => [c.code, `${c.code} — ${c.name}`]);
  for (let z = 1; z <= 60; z += 1) {
    opts.push([utmCode(z, true), `${utmCode(z, true)} — UTM ${z}N (WGS84)`]);
    opts.push([utmCode(z, false), `${utmCode(z, false)} — UTM ${z}S (WGS84)`]);
  }
  return opts;
}

export { ISSUE_TYPES, ensureCrs, isGeographic, isEmptyGeom, fmtNum, fmtArea, esc, uid, deepClone };
