// 通用工具函数（无 DOM 依赖，可在 Node 中测试）

export function deepClone(v) {
  return v === undefined ? v : JSON.parse(JSON.stringify(v));
}

export function isNum(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

let uidCounter = 0;
export function uid(prefix = 'id') {
  uidCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${uidCounter}`;
}

export function fmtNum(v, digits = 6) {
  if (!isNum(v)) return '—';
  const abs = Math.abs(v);
  if (abs !== 0 && (abs >= 1e7 || abs < 1e-4)) return v.toExponential(3);
  return Number(v.toFixed(digits)).toLocaleString('zh-CN');
}

// 面积友好格式化：输入单位平方米
export function fmtArea(m2) {
  if (m2 === null || m2 === undefined || !Number.isFinite(m2)) return '—';
  const a = Math.abs(m2);
  if (a >= 1e6) return `${(m2 / 1e6).toFixed(3)} km²`;
  if (a >= 1) return `${m2.toFixed(2)} m²`;
  return `${(m2 * 1e4).toFixed(2)} ha`.replace('ha', 'ha'); // ha 仅在 m² 很小时不常见，保留 m² 主路径
}

export function download(filename, text, mime = 'application/json') {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function makeCsv(rows) {
  return rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell ?? '');
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(','),
    )
    .join('\n');
}

// 转义 HTML
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 稳定的 JSON 哈希（djb2），用于重复要素检测
export function stableHash(value) {
  const s = JSON.stringify(value, (k, v) =>
    typeof v === 'number' ? Number(v.toFixed(9)) : v,
  );
  let h = 5381;
  for (let i = 0; i < s.length; i += 1) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return `h${(h >>> 0).toString(36)}`;
}

export function groupBy(arr, keyFn) {
  const m = new Map();
  for (const item of arr) {
    const k = keyFn(item);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(item);
  }
  return m;
}
