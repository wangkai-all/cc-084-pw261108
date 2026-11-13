// 应用状态层冒烟测试：走与 UI 完全相同的 state 函数（无 DOM 依赖）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SAMPLE_FILES } from '../src/samples.js';
import { parseGeoJson, parseCsv } from '../src/parsing.js';
import {
  state, addLayer, refreshChecks, filteredIssues, importCsv,
  assignCrs, createCandidate, crsOptions,
} from '../src/state.js';
import { candidateToGeoJson } from '../src/repair.js';
import { makeCsv } from '../src/util.js';

function loadAllSamples() {
  state.layers = [];
  state.mapEntries = [];
  state.filters = { layerId: '', severity: '', type: '', text: '' };
  for (const s of SAMPLE_FILES) {
    if (s.kind === 'geojson') addLayer(parseGeoJson(s.text, s.name).layer);
    else addLayer(parseCsv(s.text, s.name, s.csvOpts || { crs: 'EPSG:4326' }).layer);
  }
  refreshChecks();
}

test('加载全部虚构示例：5 图层，问题覆盖所有关键类型', () => {
  loadAllSamples();
  assert.equal(state.layers.length, 5);
  const types = new Set(state.report.issues.map((i) => i.type));
  for (const t of ['CRS_MISSING', 'AXIS_SWAPPED', 'OUT_OF_BOUNDS', 'EMPTY_GEOM',
    'INVALID_POLY', 'SELF_INTERSECT', 'DUPLICATE', 'DATELINE', 'GEOM_COLLECTION', 'REPEATED_POINT']) {
    assert.ok(types.has(t), `缺少 ${t}`);
  }
});

test('问题过滤：按图层 / 严重度 / 文本', () => {
  loadAllSamples();
  const total = state.report.issues.length;
  assert.ok(filteredIssues().length === total);
  const firstLayer = state.layers[0].lid;
  state.filters.layerId = firstLayer;
  assert.ok(filteredIssues().every((i) => i.layerId === firstLayer));
  state.filters.layerId = '';
  state.filters.severity = 'critical';
  assert.ok(filteredIssues().every((i) => i.severity === 'critical'));
  state.filters.severity = '';
  state.filters.text = '相交';
  assert.ok(filteredIssues().length >= 1);
  assert.ok(filteredIssues().every((i) => i.detail.includes('相交') || i.label.includes('相交')));
  state.filters.text = '';
});

test('显式指定 CRS 后 CRS_MISSING 消失且投影可用', () => {
  loadAllSamples();
  const noCrsLayer = state.layers.find((l) => l.crsMissing);
  assert.ok(noCrsLayer);
  assignCrs(noCrsLayer.lid, 'EPSG:4326');
  assert.equal(noCrsLayer.crs, 'EPSG:4326');
  assert.equal(noCrsLayer.crsMissing, false);
  assert.ok(!state.report.issues.some((i) => i.type === 'CRS_MISSING' && i.layerId === noCrsLayer.lid));
});

test('候选修复全流程：生成→统计→导出文本可解析→复检', () => {
  loadAllSamples();
  const source = state.layers.find((l) => l.name.includes('4326'));
  const before = source.features.length;
  const candidate = createCandidate(source.lid,
    ['EMPTY_GEOM', 'DUPLICATE', 'INVALID_POLY', 'SELF_INTERSECT', 'REPEATED_POINT'], 'geo');
  assert.ok(candidate.isCandidate);
  assert.equal(source.features.length, before, '源图层要素数不变');
  assert.ok(candidate.features.length < before, '副本要素数减少');
  assert.equal(candidate.lineage.stats.removed, 2);
  // 导出（直接序列化，浏览器下载动作不在无 DOM 环境测试）
  const text = candidateToGeoJson(candidate);
  const parsed = JSON.parse(text);
  assert.equal(parsed.type, 'FeatureCollection');
  assert.ok(parsed.__qc_lineage.guarantee.includes('源文件'));
  // 重新加载并复检
  const reloaded = parseGeoJson(text, 'reloaded__candidate.geojson').layer;
  assert.ok(reloaded.isCandidate);
  addLayer(reloaded);
  refreshChecks();
  const reloadedIssues = state.report.issues.filter((i) => i.layerId === reloaded.lid);
  assert.ok(!reloadedIssues.some((i) => i.type === 'EMPTY_GEOM'));
  assert.ok(!reloadedIssues.some((i) => i.type === 'DUPLICATE'));
});

test('问题导出 CSV 的行内容（无 DOM，直接构造）', () => {
  loadAllSamples();
  const rows = [['图层', '严重度', '问题类型'],
    ...filteredIssues().slice(0, 3).map((i) => [i.layerName, i.severity, i.label])];
  const csv = makeCsv(rows);
  assert.ok(csv.startsWith('图层,严重度,问题类型'));
  assert.equal(csv.split('\n').length, 4);
});

test('CRS 选项包含预置与 UTM 带号', () => {
  const opts = crsOptions();
  const codes = opts.map(([c]) => c);
  assert.ok(codes.includes('EPSG:4326'));
  assert.ok(codes.includes('EPSG:3857'));
  assert.ok(codes.includes('EPSG:32650'));
  assert.ok(codes.includes('EPSG:32733'));
});

test('CSV 导入（含非数值空几何）进入状态层', () => {
  state.layers = []; state.mapEntries = [];
  const csv = SAMPLE_FILES.find((s) => s.kind === 'csv');
  const { layer, warnings } = importCsv(csv.text, csv.name, csv.csvOpts);
  addLayer(layer);
  refreshChecks();
  assert.equal(layer.features.length, 5);
  assert.ok(layer.features.some((f) => f.empty));
  assert.ok(warnings.some((w) => w.includes('非数值')));
  assert.ok(state.report.issues.some((i) => i.type === 'EMPTY_GEOM'));
});
