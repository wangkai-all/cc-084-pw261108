// 解析 GeoJSON 与坐标 CSV，构建统一的图层/要素模型。
// 关键点：保留原始坐标、记录来源行号（GeoJSON 按字节偏移映射行，CSV 按物理行）。
import { deepClone, stableHash, uid } from './util.js';
import { readGeoJsonCrs } from './crs.js';
import { isEmptyGeom, coordCount } from './geom.js';

// ---- 行号映射：记录某特征在原始文本中的起始/结束行 -------------------------
function buildLineIndex(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') starts.push(i + 1);
  }
  return {
    lineOf(offset) {
      let lo = 0; let hi = starts.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (starts[mid] <= offset) lo = mid; else hi = mid - 1;
      }
      return lo + 1;
    },
    total: starts.length,
  };
}

// 找到目标值在 JSON 文本中的字节偏移（轻量扫描器，匹配 key 后第一个 value）
function findFeatureOffsets(text) {
  const offsets = [];
  let i = 0;
  const n = text.length;
  const skipWs = () => { while (i < n && /\s/.test(text[i])) i += 1; };
  const readStr = () => {
    let s = '';
    i += 1;
    while (i < n && text[i] !== '"') {
      if (text[i] === '\\') { s += text[i] + (text[i + 1] ?? ''); i += 2; }
      else { s += text[i]; i += 1; }
    }
    i += 1;
    return s;
  };
  const skipValue = () => {
    skipWs();
    const ch = text[i];
    if (ch === '"') { readStr(); return; }
    if (ch === '{' || ch === '[') {
      const open = ch; const close = open === '{' ? '}' : ']';
      let depth = 0;
      do {
        if (text[i] === '"') readStr();
        else { if (text[i] === open) depth += 1; if (text[i] === close) depth -= 1; i += 1; }
      } while (i < n && depth > 0);
      return;
    }
    while (i < n && !/[\s,}\]]/.test(text[i])) i += 1;
  };
  // 找到 "features" 键后的数组
  let featuresArrayStart = -1;
  while (i < n) {
    skipWs();
    if (text[i] !== '"') { i += 1; continue; }
    const keyStart = i;
    const key = readStr();
    skipWs();
    if (text[i] === ':') {
      i += 1; skipWs();
      if (key === 'features' && text[i] === '[') { featuresArrayStart = i; break; }
      skipValue();
    }
    keyStart; // noop
  }
  if (featuresArrayStart < 0) return offsets;
  i = featuresArrayStart + 1;
  // 逐元素扫描 feature 对象
  while (i < n) {
    skipWs();
    if (text[i] === ']') break;
    if (text[i] === ',') { i += 1; continue; }
    if (text[i] !== '{') { i += 1; continue; }
    const start = i;
    let depth = 0;
    do {
      if (text[i] === '"') readStr();
      else { if (text[i] === '{') depth += 1; if (text[i] === '}') depth -= 1; i += 1; }
    } while (i < n && depth > 0);
    offsets.push([start, i - 1]);
  }
  return offsets;
}

function makeFeature(raw, source, index, lineStart, lineEnd) {
  const geom = raw.type === 'Feature' ? raw.geometry : raw;
  const props = raw.type === 'Feature' && raw.properties ? raw.properties : {};
  const id = raw.type === 'Feature' && 'id' in raw ? raw.id : undefined;
  return {
    fid: uid('f'),
    sourceIndex: index,                 // 在源 FeatureCollection 中的序号
    id,
    properties: props || {},
    geometry: deepClone(geom),          // 原始坐标，永不修改
    originalGeometry: deepClone(geom), // 同一份原始坐标的独立存档
    source,                             // { kind:'geojson'|'csv', name }
    lineStart, lineEnd,
    coordCount: coordCount(geom),
    empty: isEmptyGeom(geom),
    geomHash: stableHash(geom),
    derived: null,                      // 集合几何拆分/修复产生的要素挂这里
  };
}

export function parseGeoJson(text, fileName) {
  const lineIndex = buildLineIndex(text);
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(`GeoJSON 解析失败：${e.message}`);
  }
  const offsets = findFeatureOffsets(text);
  const raws = [];
  if (data.type === 'FeatureCollection') {
    data.features.forEach((f, idx) => raws.push([f, idx]));
  } else if (data.type === 'Feature') {
    raws.push([data, 0]);
  } else if (typeof data.type === 'string' && data.coordinates !== undefined) {
    raws.push([data, 0]);
  } else {
    throw new Error('未识别的 GeoJSON 结构（需要 FeatureCollection / Feature / Geometry）');
  }
  const features = raws.map(([raw, idx]) => {
    const off = offsets[idx];
    const lineStart = off ? lineIndex.lineOf(off[0]) : null;
    const lineEnd = off ? lineIndex.lineOf(off[1]) : null;
    return makeFeature(raw, { kind: 'geojson', name: fileName }, idx, lineStart, lineEnd);
  });
  const crsRaw = readGeoJsonCrs(data);
  const fallbackName = fileName.replace(/\.(geo)?json$/i, '');
  return {
    layer: {
      lid: uid('layer'),
      // 优先采用 FeatureCollection 自带的业务名称；缺失时回退到文件名
      name: (typeof data.name === 'string' && data.name.trim()) || fallbackName,
      sourceName: fileName,
      sourceKind: 'geojson',
      features,
      crsRaw,
      crsUser: null,
      crs: typeof crsRaw === 'string' ? crsRaw : null,
      crsMissing: !crsRaw,
      importedAt: new Date().toISOString(),
      lineage: data.__qc_lineage || null,
      isCandidate: Boolean(data.__qc_lineage),
      derivedFrom: data.__qc_lineage ? data.__qc_lineage.sourceLayer : null,
    },
    warnings: typeof crsRaw === 'object' && crsRaw && crsRaw.unknown
      ? [`无法识别的 CRS 名称：${crsRaw.raw}，请手动指定`] : [],
  };
}

// ---- CSV ------------------------------------------------------------------
export function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let lineNo = 1;
  const rowStartLines = [1]; // 每个 row 的物理起始行（含表头）
  const pushRow = () => {
    row.push(field);
    rows.push(row);
    row = [];
    field = '';
  };
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; }
        else inQuotes = false;
      } else {
        field += ch;
        if (ch === '\n') lineNo += 1;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      pushRow();
      lineNo += 1;
      rowStartLines.push(lineNo);
    } else {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    pushRow();
    rowStartLines.push(lineNo);
  }
  return { rows, rowStartLines };
}

const X_NAMES = ['lng', 'lon', 'long', 'longitude', 'x', '经度', 'x坐标', 'coord_x'];
const Y_NAMES = ['lat', 'latitude', 'y', '纬度', 'y坐标', 'coord_y'];

function pickColumn(headers, candidates) {
  const lower = headers.map((h) => String(h).trim().toLowerCase());
  for (const c of candidates) {
    const idx = lower.indexOf(c);
    if (idx >= 0) return idx;
  }
  return -1;
}

export function parseCsv(text, fileName, opts = {}) {
  const { rows, rowStartLines } = parseCsvRows(text);
  if (rows.length < 2) throw new Error('CSV 至少需要表头和一行数据');
  const headers = rows[0].map((h) => h.trim());
  const xIdx = opts.xColumn != null ? opts.xColumn : pickColumn(headers, X_NAMES);
  const yIdx = opts.yColumn != null ? opts.yColumn : pickColumn(headers, Y_NAMES);
  const features = [];
  const parseNotes = [];
  for (let r = 1; r < rows.length; r += 1) {
    const cells = rows[r];
    if (cells.length === 1 && cells[0].trim() === '') continue;
    const props = {};
    headers.forEach((h, i) => { props[h || `col${i}`] = cells[i] ?? ''; });
    let geom = null;
    let coordNote = null;
    if (xIdx >= 0 && yIdx >= 0) {
      const x = Number(cells[xIdx]);
      const y = Number(cells[yIdx]);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        geom = { type: 'Point', coordinates: [x, y] };
      } else {
        coordNote = `第 ${xIdx + 1}/${yIdx + 1} 列坐标非数值："${cells[xIdx] ?? ''}", "${cells[yIdx] ?? ''}"`;
        geom = { type: 'Point', coordinates: [] }; // 空几何，交给检查器报 EMPTY
      }
    }
    if (coordNote) parseNotes.push({ row: r + 1, note: coordNote });
    const f = makeFeature(
      { type: 'Feature', properties: props, geometry: geom },
      { kind: 'csv', name: fileName },
      r - 1,
      rowStartLines[r] ?? r + 1,
      rowStartLines[r] ?? r + 1,
    );
    f.csvHeaders = headers;
    features.push(f);
  }
  return {
    layer: {
      lid: uid('layer'),
      name: fileName.replace(/\.csv$/i, ''),
      sourceName: fileName,
      sourceKind: 'csv',
      features,
      crsRaw: opts.crs || null,
      crsUser: opts.crs || null,
      crs: opts.crs || null,
      crsMissing: !opts.crs,
      importedAt: new Date().toISOString(),
      lineage: null,
      csvColumns: headers,
    },
    warnings: [
      ...(xIdx < 0 || yIdx < 0 ? ['未能自动识别经纬度列，请在导入时手动指定'] : []),
      ...parseNotes.map((p) => `第 ${p.row} 行：${p.note}`),
    ],
  };
}
