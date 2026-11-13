// 坐标系（CRS）模块：定义、转换、推断
// 全部投影通过本地 proj4 完成，不依赖任何在线服务（无 epsg.io 请求）。
import proj4 from 'proj4';

// ---- 预置坐标系定义 -------------------------------------------------------
// GeoJSON RFC 7946 规定经纬度顺序为 [经度, 纬度]，axis=enu 保证 proj4 按 lon/lat 处理。
const GEOG_4326 = '+proj=longlat +datum=WGS84 +no_defs +axis=enu';
const GEOG_4490 = '+proj=longlat +ellps=GRS80 +no_defs +axis=enu'; // CGCS2000 地理坐标

export const CRS_REGISTRY = [
  { code: 'EPSG:4326', name: 'WGS84 经纬度 (lon, lat)', geographic: true, def: GEOG_4326 },
  { code: 'EPSG:4490', name: 'CGCS2000 经纬度', geographic: true, def: GEOG_4490 },
  { code: 'EPSG:3857', name: 'Web 墨卡托 (球面米)', geographic: false, def: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs' },
];

export function utmCode(zone, north = true) {
  return `EPSG:${north ? 32600 + zone : 32700 + zone}`;
}

export function utmDef(zone, north = true) {
  return `+proj=utm +zone=${zone} ${north ? '' : '+south '}+datum=WGS84 +units=m +no_defs +axis=enu`;
}

export function ensureCrs(code) {
  if (!code) return null;
  const key = String(code).toUpperCase();
  const preset = CRS_REGISTRY.find((c) => c.code.toUpperCase() === key);
  if (preset) {
    proj4.defs(preset.code, preset.def);
    return preset;
  }
  const m = key.match(/^EPSG:(32[67])(\d{2})$/);
  if (m) {
    const zone = Number(m[2]);
    if (zone >= 1 && zone <= 60) {
      const north = m[1] === '326';
      const entry = {
        code: utmCode(zone, north),
        name: `UTM ${zone}N/S (WGS84, 米)`,
        geographic: false,
        def: utmDef(zone, north),
      };
      proj4.defs(entry.code, entry.def);
      return entry;
    }
  }
  // 已通过 proj4.defs 自定义注册的代码
  if (proj4.defs[key]) {
    return { code: key, name: key, geographic: false, def: proj4.defs[key] };
  }
  return null;
}

export function registerCustom(code, projString) {
  proj4.defs(code, projString);
}

export function isGeographic(code) {
  const c = ensureCrs(code);
  return Boolean(c && c.geographic);
}

// ---- 坐标转换 -------------------------------------------------------------
// 输入/输出坐标均为 [x, y]（地理坐标系下 x=经度, y=纬度）。
export function transformPoint(x, y, fromCode, toCode) {
  if (!fromCode || !toCode) throw new Error('缺少坐标系，无法转换');
  if (String(fromCode).toUpperCase() === String(toCode).toUpperCase()) return [x, y];
  const from = ensureCrs(fromCode);
  const to = ensureCrs(toCode);
  if (!from) throw new Error(`未知源坐标系：${fromCode}`);
  if (!to) throw new Error(`未知目标坐标系：${toCode}`);
  return proj4(from.code, to.code, [x, y]);
}

// 递归转换任意 GeoJSON 几何的坐标；返回新几何，不动入参。
export function transformGeometry(geom, fromCode, toCode) {
  if (!geom || geom.type === 'GeometryCollection') {
    if (geom && geom.type === 'GeometryCollection') {
      return {
        type: 'GeometryCollection',
        geometries: geom.geometries.map((g) => transformGeometry(g, fromCode, toCode)),
      };
    }
    return geom;
  }
  const conv = (coords, depth) => {
    if (depth === 0) {
      const [nx, ny] = transformPoint(coords[0], coords[1], fromCode, toCode);
      return coords.length > 2 ? [nx, ny, coords[2]] : [nx, ny];
    }
    return coords.map((c) => conv(c, depth - 1));
  };
  const depthMap = {
    Point: 0,
    MultiPoint: 1,
    LineString: 1,
    MultiLineString: 2,
    Polygon: 2,
    MultiPolygon: 3,
  };
  if (!(geom.type in depthMap)) throw new Error(`不支持的几何类型：${geom.type}`);
  return { type: geom.type, coordinates: conv(geom.coordinates, depthMap[geom.type]) };
}

// ---- 坐标系推断 -----------------------------------------------------------
// 仅根据坐标数值给出启发式提示，绝不静默改写数据。
export function inferAxisHint(coordsSample) {
  let lonLike = 0;
  let latLike = 0;
  let swapped = 0;
  let projected = 0;
  for (const [x, y] of coordsSample) {
    if (![x, y].every(Number.isFinite)) continue;
    const xGeo = Math.abs(x) <= 180 && Math.abs(y) <= 90;
    const yGeo = Math.abs(y) <= 180 && Math.abs(x) <= 90;
    if (xGeo) lonLike += 1;
    if (yGeo && !xGeo) swapped += 1;
    if (!xGeo && !yGeo && (Math.abs(x) > 180 || Math.abs(y) > 90)) projected += 1;
    if (xGeo || yGeo) latLike += 1;
  }
  return { total: coordsSample.length, lonLike, swapped, projected };
}

// 从 GeoJSON 的 crs 成员读取（RFC 旧版命名 CRS），RFC7946 已废弃但数据中常见。
export function readGeoJsonCrs(geoJson) {
  const crs = geoJson && geoJson.crs;
  if (!crs) return null;
  if (crs.type === 'name' && crs.properties && crs.properties.name) {
    let raw = String(crs.properties.name);
    const m = raw.match(/EPSG::?(\d+)/i);
    if (m) raw = `EPSG:${m[1]}`;
    return ensureCrs(raw) ? raw : { raw, unknown: true };
  }
  return null;
}

// 计算 UTM 带号（按经度）
export function utmZoneForLon(lon) {
  return Math.min(60, Math.max(1, Math.floor((lon + 180) / 6) + 1));
}
