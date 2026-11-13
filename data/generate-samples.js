// 虚构示例数据生成器：覆盖全部检查项。纯虚构，无真实地理位置含义。
// 运行：node data/generate-samples.js
import proj4 from 'proj4';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const UTM50N = '+proj=utm +zone=50 +datum=WGS84 +units=m +no_defs +axis=enu';
proj4.defs('EPSG:32650', UTM50N);
const toUtm = (lon, lat) => proj4('EPSG:4326', 'EPSG:32650', [lon, lat]);

const fc = (name, crs, features) => {
  const obj = {
    type: 'FeatureCollection',
    name,
    ...(crs ? { crs: { type: 'name', properties: { name: crs } } } : {}),
    features,
  };
  return obj;
};
const f = (id, geometry, properties = {}) => ({ type: 'Feature', id, properties: { name: id, ...properties }, geometry });

// ---------- 1. 主示例图层 EPSG:4326 -----------------------------------------
const main = fc('示例图层_4326（含各类问题）', 'EPSG:4326', [
  f('F01-正常面', {
    type: 'Polygon',
    coordinates: [[[116.30, 39.90], [116.35, 39.90], [116.35, 39.94], [116.30, 39.94], [116.30, 39.90]]],
  }),
  f('F02-带洞面', {
    type: 'Polygon',
    coordinates: [
      [[116.40, 39.90], [116.48, 39.90], [116.48, 39.96], [116.40, 39.96], [116.40, 39.90]],
      [[116.43, 39.92], [116.45, 39.92], [116.45, 39.94], [116.43, 39.94], [116.43, 39.92]],
    ],
  }),
  // 蝴蝶结自相交面（8 字形），可自动拆分为两个面
  f('F03-蝴蝶结自相交', {
    type: 'Polygon',
    coordinates: [[[116.50, 39.85], [116.58, 39.92], [116.50, 39.92], [116.58, 39.85], [116.50, 39.85]]],
  }),
  // 未闭合环
  f('F04-未闭合环', {
    type: 'Polygon',
    coordinates: [[[116.60, 39.90], [116.66, 39.90], [116.66, 39.95], [116.60, 39.95]]],
  }),
  // 含连续重复点
  f('F05-重复点', {
    type: 'LineString',
    coordinates: [[116.30, 39.80], [116.36, 39.80], [116.36, 39.80], [116.40, 39.84]],
  }),
  // 空几何
  f('F06-空几何', null),
  // 越界点（纬度 95）
  f('F07-越界点', { type: 'Point', coordinates: [116.40, 95.0] }),
  // 重复要素（几何+属性完全相同，出现两次；要素 id 不参与属性比对）
  { type: 'Feature', id: 'F08-重复A', properties: { kind: '监测井', label: '同一点位' },
    geometry: { type: 'Point', coordinates: [116.42, 39.88] } },
  { type: 'Feature', id: 'F09-重复B', properties: { kind: '监测井', label: '同一点位' },
    geometry: { type: 'Point', coordinates: [116.42, 39.88] } },
  // 集合几何：点+线
  f('F10-集合几何', {
    type: 'GeometryCollection',
    geometries: [
      { type: 'Point', coordinates: [116.55, 39.98] },
      { type: 'LineString', coordinates: [[116.55, 39.98], [116.60, 40.00]] },
    ],
  }),
  // 跨日期变更线（斐济附近，经度从 178 跳到 -178）
  f('F11-跨日期变更线', {
    type: 'LineString',
    coordinates: [[177.5, -18.0], [179.5, -18.2], [-179.0, -18.4], [-177.0, -18.1]],
  }),
  // 正常多点
  f('F12-正常多点', {
    type: 'MultiPoint',
    coordinates: [[116.33, 39.96], [116.37, 39.97], [116.39, 39.95]],
  }),
]);

// ---------- 2. 缺 CRS 图层 ---------------------------------------------------
const noCrs = fc('示例图层_缺坐标系', null, [
  f('N01', { type: 'Point', coordinates: [121.47, 31.23] }),
  f('N02', {
    type: 'Polygon',
    coordinates: [[[121.47, 31.23], [121.50, 31.23], [121.50, 31.26], [121.47, 31.26], [121.47, 31.23]]],
  }),
]);

// ---------- 3. UTM 50N 平面坐标（正确声明） --------------------------------
const [ux1, uy1] = toUtm(116.30, 39.90);
const [ux2, uy2] = toUtm(116.40, 39.95);
const [ux3, uy3] = toUtm(116.35, 39.98);
const utm = fc('示例图层_UTM50N（平面米）', 'EPSG:32650', [
  f('U01-UTM面', {
    type: 'Polygon',
    coordinates: [[
      [ux1, uy1], [ux2, uy1], [ux2, uy2], [ux1, uy2], [ux1, uy1],
    ]],
  }),
  f('U02-UTM点', { type: 'Point', coordinates: [ux3, uy3] }),
]);

// ---------- 4. 经纬度颠倒图层（声明 4326 但坐标为 lat,lon） -----------------
const swapped = fc('示例图层_经纬度颠倒', 'EPSG:4326', [
  f('S01-颠倒点1', { type: 'Point', coordinates: [39.90, 116.30] }),
  f('S02-颠倒点2', { type: 'Point', coordinates: [31.23, 121.47] }),
  f('S03-颠倒点3', { type: 'Point', coordinates: [22.54, 114.06] }),
]);

writeFileSync(join(here, 'sample_4326.geojson'), JSON.stringify(main, null, 2));
writeFileSync(join(here, 'sample_no_crs.geojson'), JSON.stringify(noCrs, null, 2));
writeFileSync(join(here, 'sample_utm50n.geojson'), JSON.stringify(utm, null, 2));
writeFileSync(join(here, 'sample_swapped.geojson'), JSON.stringify(swapped, null, 2));

// ---------- 5. CSV：含表头、正常点与一个非数值行 ----------------------------
const csv = [
  'id,name,longitude,latitude,note',
  'C01,一号点,116.340,39.910,正常',
  'C02,二号点,116.360,39.925,正常',
  'C03,三号点,bad,39.900,坐标非数值->空几何',
  'C04,四号点,116.390,39.930,正常',
  'C05,重复点,116.340,39.910,与一号点重复',
].join('\n');
writeFileSync(join(here, 'sample_points.csv'), csv);

console.log('示例数据已生成于 data/');
