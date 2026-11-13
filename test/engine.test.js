import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseGeoJson, parseCsv } from '../src/parsing.js';
import { runChecks } from '../src/checks.js';
import { buildCandidate, candidateToGeoJson } from '../src/repair.js';
import { transformGeometry, transformPoint, ensureCrs } from '../src/crs.js';
import {
  selfIntersections, crossesAntimeridian, geometryArea,
  splitLineAtDateline, bbox, ringAreaSpherical,
} from '../src/geom.js';

const here = dirname(fileURLToPath(import.meta.url));
const data = (n) => join(here, '..', 'data', n);
const read = (n) => readFileSync(data(n), 'utf8');

function layer4326() {
  return parseGeoJson(read('sample_4326.geojson'), 'sample_4326.geojson').layer;
}

test('GeoJSON 解析保留行号映射', () => {
  const { layer } = parseGeoJson(read('sample_4326.geojson'), 'sample_4326.geojson');
  assert.equal(layer.features.length, 12);
  assert.ok(layer.features[0].lineStart > 0);
  assert.ok(layer.features[5].lineStart >= layer.features[0].lineStart);
  // 原始坐标独立存档
  const f0 = layer.features[0];
  assert.deepEqual(f0.geometry, f0.originalGeometry);
  f0.geometry.coordinates[0][0][0] = 999;
  assert.notEqual(f0.originalGeometry.coordinates[0][0][0], 999);
});

test('CRS 从元数据读取；UTM 与经纬度互转', () => {
  const utm = parseGeoJson(read('sample_utm50n.geojson'), 'sample_utm50n.geojson').layer;
  assert.equal(utm.crs, 'EPSG:32650');
  const [lon, lat] = transformPoint(utm.features[1].geometry.coordinates[0],
    utm.features[1].geometry.coordinates[1], 'EPSG:32650', 'EPSG:4326');
  assert.ok(Math.abs(lon - 116.35) < 1e-6);
  assert.ok(Math.abs(lat - 39.98) < 1e-6);
  const g = transformGeometry(utm.features[0].geometry, 'EPSG:32650', 'EPSG:4326');
  assert.ok(g.coordinates[0].every((p) => Math.abs(p[0]) <= 180 && Math.abs(p[1]) <= 90));
});

test('缺失 CRS 时报告 CRS_MISSING 且停止投影', () => {
  const layer = parseGeoJson(read('sample_no_crs.geojson'), 'sample_no_crs.geojson').layer;
  assert.equal(layer.crs, null);
  const { issues } = runChecks([layer]);
  assert.ok(issues.some((i) => i.type === 'CRS_MISSING'));
  assert.throws(() => transformGeometry(layer.features[0].geometry, null, 'EPSG:3857'), /缺少坐标系/);
});

test('经纬度颠倒检测', () => {
  const layer = parseGeoJson(read('sample_swapped.geojson'), 'sample_swapped.geojson').layer;
  const { issues } = runChecks([layer]);
  assert.ok(issues.some((i) => i.type === 'AXIS_SWAPPED'));
});

test('主示例图层检出全部预期问题类型', () => {
  const { issues } = runChecks([layer4326()]);
  const types = new Set(issues.map((i) => i.type));
  for (const t of ['SELF_INTERSECT', 'INVALID_POLY', 'REPEATED_POINT', 'EMPTY_GEOM',
    'OUT_OF_BOUNDS', 'DUPLICATE', 'GEOM_COLLECTION', 'DATELINE']) {
    assert.ok(types.has(t), `应检出 ${t}`);
  }
  // 越界问题带坐标路径与点
  const oob = issues.find((i) => i.type === 'OUT_OF_BOUNDS');
  assert.ok(oob.point && oob.lineStart > 0);
});

test('问题携带源行号，可点回原始行', () => {
  const { issues } = runChecks([layer4326()]);
  for (const iss of issues) {
    if (iss.featureFid) assert.ok(iss.lineStart > 0, `${iss.type} 缺少行号`);
  }
});

test('蝴蝶结面自相交被识别，且球面面积为正', () => {
  const ring = [[0, 0], [2, 2], [0, 2], [2, 0], [0, 0]];
  const hits = selfIntersections(ring).filter((h) => h.proper);
  assert.equal(hits.length, 1);
  const validRing = [[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]];
  assert.ok(Math.abs(ringAreaSpherical(validRing)) > 0);
});

test('跨日期变更线检测与渲染拆分保留原始数据', () => {
  const layer = layer4326();
  const f11 = layer.features.find((x) => x.id === 'F11-跨日期变更线');
  assert.ok(crossesAntimeridian(f11.geometry));
  const parts = splitLineAtDateline(f11.geometry.coordinates);
  assert.ok(parts.length >= 2);
  // 每段所有坐标有限、是合法 [lon,lat] 对、经度跨度 <=180
  for (const part of parts) {
    assert.ok(part.every((pt) => Array.isArray(pt) && pt.length >= 2 && Number.isFinite(pt[0]) && Number.isFinite(pt[1])));
    const lons = part.map((pt) => pt[0]);
    assert.ok(Math.max(...lons) - Math.min(...lons) <= 180);
  }
  // 连接点纬度为线性插值
  const joinLat = parts[0][parts[0].length - 1][1];
  assert.ok(joinLat > -18.3 && joinLat < -18.1);
  // 原始几何未被修改
  assert.equal(f11.geometry.coordinates[0][0], 177.5);
});

test('CSV 解析：列识别、非数值->空几何、行号、重复检测', () => {
  const { layer, warnings } = parseCsv(read('sample_points.csv'), 'sample_points.csv', { crs: 'EPSG:4326' });
  assert.equal(layer.features.length, 5);
  assert.equal(layer.features[2].empty, true);
  assert.ok(warnings.some((w) => w.includes('非数值')));
  assert.equal(layer.features[0].lineStart, 2);
  const { issues } = runChecks([layer]);
  assert.ok(issues.some((i) => i.type === 'EMPTY_GEOM'));
  assert.ok(issues.some((i) => i.type === 'DUPLICATE'));
});

test('候选修复：源图层不被修改，移除/拆分/面积变化均有记录', () => {
  const source = layer4326();
  const snapshot = JSON.stringify(source.features.map((f) => f.geometry));
  const { issues } = runChecks([source]);
  const actions = ['EMPTY_GEOM', 'INVALID_POLY', 'REPEATED_POINT', 'SELF_INTERSECT', 'DUPLICATE'];
  const candidate = buildCandidate(source, issues, actions, { geographic: true });

  // 源不变
  assert.equal(JSON.stringify(source.features.map((f) => f.geometry)), snapshot);
  assert.equal(source.features.length, 12);
  // 空几何与重复各移除一个
  assert.equal(candidate.lineage.stats.removed, 2);
  assert.equal(candidate.features.length, 10);
  // 蝴蝶结拆成 MultiPolygon
  const bow = candidate.features.find((f) => f.id === 'F03-蝴蝶结自相交');
  assert.equal(bow.geometry.type, 'MultiPolygon');
  assert.equal(bow.geometry.coordinates.length, 2);
  assert.ok(candidate.lineage.stats.splitCount >= 1);
  // 未闭合环被闭合
  const unclosed = candidate.features.find((f) => f.id === 'F04-未闭合环');
  const ring = unclosed.geometry.coordinates[0];
  assert.deepEqual(ring[0], ring[ring.length - 1]);
  // 面积变化表存在且数值有限
  const ac = candidate.lineage.areaChanges.find((x) => x.sourceIndex === 2);
  assert.ok(Number.isFinite(ac.before) && Number.isFinite(ac.after));
  // 原始坐标随副本留存
  assert.ok(candidate.features.every((f) => f.originalGeometry));
});

test('导出修正版可重新加载并复检，且带溯源元数据', () => {
  const source = layer4326();
  const { issues } = runChecks([source]);
  const candidate = buildCandidate(source, issues,
    ['EMPTY_GEM', 'EMPTY_GEOM', 'DUPLICATE', 'INVALID_POLY', 'SELF_INTERSECT', 'REPEATED_POINT'],
    { geographic: true });
  const text = candidateToGeoJson(candidate);
  const reloaded = parseGeoJson(text, 'candidate.geojson').layer;
  assert.equal(reloaded.features.length, candidate.features.length);
  assert.ok(reloaded.lineage && reloaded.lineage.guarantee.includes('源文件'));
  const { issues: issues2 } = runChecks([reloaded]);
  // 修复后不再有空几何与重复
  assert.ok(!issues2.some((i) => i.type === 'EMPTY_GEOM'));
  assert.ok(!issues2.some((i) => i.type === 'DUPLICATE'));
});

test('线要素的连续重复点在候选副本中被去重', () => {
  const source = layer4326();
  const { issues } = runChecks([source]);
  const candidate = buildCandidate(source, issues, ['REPEATED_POINT'], { geographic: true });
  const f05 = candidate.features.find((f) => f.id === 'F05-重复点');
  assert.equal(f05.lineage.action, 'modified');
  assert.equal(f05.geometry.coordinates.length, 3);
  // 原始线仍保留 4 个点（含重复点）
  assert.equal(source.features.find((f) => f.id === 'F05-重复点').geometry.coordinates.length, 4);
});

test('图层级问题（经纬度颠倒）的修复会作用于每个要素，且原始坐标留存', () => {
  const source = parseGeoJson(read('sample_swapped.geojson'), 'sample_swapped.geojson').layer;
  const snapshot = JSON.stringify(source.features.map((f) => f.geometry));
  const { issues } = runChecks([source]);
  const candidate = buildCandidate(source, issues, ['AXIS_SWAPPED'], { geographic: true });
  // 源图层不变
  assert.equal(JSON.stringify(source.features.map((f) => f.geometry)), snapshot);
  // 副本中每个要素的坐标都已交换
  const f0 = candidate.features[0];
  assert.deepEqual(f0.geometry.coordinates, [116.30, 39.90]);
  assert.deepEqual(f0.originalGeometry.coordinates, [39.90, 116.30]);
  assert.equal(candidate.features.length, source.features.length);
});

test('投影切换只生成新几何，原始坐标留存', () => {
  const layer = layer4326();
  const original = JSON.stringify(layer.features[0].geometry);
  const g3857 = transformGeometry(layer.features[0].geometry, 'EPSG:4326', 'EPSG:3857');
  assert.notDeepEqual(g3857, layer.features[0].geometry);
  assert.equal(JSON.stringify(layer.features[0].geometry), original);
  assert.ok(Math.abs(g3857.coordinates[0][0][0]) > 1e6); // 米级数值
});

test('空几何面积为 0，bbox 为 null', () => {
  assert.equal(geometryArea({ type: 'Point', coordinates: [] }, true), 0);
  assert.equal(bbox({ type: 'Polygon', coordinates: [[]] }), null);
});

test('ensureCrs 支持 UTM 带号生成与未知代码返回 null', () => {
  assert.ok(ensureCrs('EPSG:32650'));
  assert.ok(ensureCrs('EPSG:32733'));
  assert.equal(ensureCrs('EPSG:999999'), null);
});
