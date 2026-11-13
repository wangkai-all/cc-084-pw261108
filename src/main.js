// 主入口：DOM 渲染与事件联动
import {
  state, addLayer, removeLayer, refreshChecks, mapEntryOf, featureById,
  filteredIssues, importGeoJsonFiles, importCsv, assignCrs, createCandidate,
  exportCandidate, exportIssuesCsv, crsOptions, layerColor,
  ISSUE_TYPES, isGeographic, ensureCrs, esc, fmtArea,
} from './state.js';
import { MapView, SEVERITY_COLOR } from './mapview.js';
import { download } from './util.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const map = new MapView($('#map'), {
  onPick: (hit) => selectFeature(hit.feature.fid, { focusTab: true }),
  onHover: (hit, pos) => showMapTooltip(hit, pos),
});

let toastTimer = null;
function toast(msg, ms = 3600) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, ms);
}

// ---------- 渲染：图层条 ----------
function renderLayerBar() {
  const bar = $('#layer-bar');
  bar.innerHTML = '';
  state.layers.forEach((layer, idx) => {
    const entry = mapEntryOf(layer.lid);
    const chip = document.createElement('div');
    chip.className = `layer-chip${layer.isCandidate ? ' candidate' : ''}`;
    chip.innerHTML = `
      <span class="dot" style="background:${entry.color}"></span>
      <label style="display:flex;align-items:center;gap:5px;cursor:pointer">
        <input type="checkbox" ${entry.visible ? 'checked' : ''} data-act="toggle" />
        ${esc(layer.name)}
      </label>
      <span class="crs-tag">${layer.crs ? esc(layer.crs) : '无 CRS'}</span>
      ${layer.isCandidate ? '<span class="tag candidate-tag">候选副本</span>' : ''}
      <button data-act="export" title="导出为 GeoJSON">⤓</button>
      <button data-act="remove" title="移除图层">✕</button>`;
    chip.querySelector('[data-act=toggle]').addEventListener('change', (e) => {
      entry.visible = e.target.checked;
      map.setLayers(state.mapEntries);
      map.render();
    });
    chip.querySelector('[data-act=export]').addEventListener('click', () => {
      if (layer.isCandidate) exportCandidate(layer);
      else exportPlainLayer(layer);
    });
    chip.querySelector('[data-act=remove]').addEventListener('click', () => {
      removeLayer(layer.lid);
      renderAll();
    });
    bar.appendChild(chip);
  });
  $('#map-empty').style.display = state.layers.length ? 'none' : 'grid';
}

function exportPlainLayer(layer) {
  const fc = {
    type: 'FeatureCollection',
    name: layer.name,
    crs: layer.crs ? { type: 'name', properties: { name: layer.crs } } : undefined,
    features: layer.features.map((f) => ({
      type: 'Feature', id: f.id, properties: f.properties, geometry: f.geometry,
    })),
  };
  download(`${layer.name}.geojson`, JSON.stringify(fc, null, 2), 'application/geo+json');
}

// ---------- 渲染：统计卡片 ----------
function renderStats() {
  const r = state.report;
  const el = $('#stats');
  if (!r) { el.innerHTML = ''; return; }
  const cards = [
    ['图层', state.layers.length, ''],
    ['要素', r.featureCount, ''],
    ['严重', r.summary.critical, 'sev-critical'],
    ['重要', r.summary.serious, 'sev-serious'],
    ['警告/提示', r.summary.warning + r.summary.info, 'sev-warning'],
  ];
  el.innerHTML = cards.map(([lbl, num, cls]) =>
    `<div class="stat ${cls}"><div class="num">${num}</div><div class="lbl">${lbl}</div></div>`).join('');
}

// ---------- 渲染：问题列表 ----------
function renderIssueList() {
  const list = $('#issue-list');
  const issues = filteredIssues();
  if (!issues.length) {
    list.innerHTML = '<p class="muted small" style="padding:18px 4px">当前过滤条件下没有问题。</p>';
    return;
  }
  list.innerHTML = issues.map((iss) => `
    <article class="issue-card ${state.selectedIssueId === iss.iid ? 'selected' : ''}"
      style="border-left-color:${SEVERITY_COLOR[iss.severity]}" data-iid="${iss.iid}">
      <div class="issue-head">
        <span class="sev-badge sev-${iss.severity}">${sevText(iss.severity)}</span>
        <span class="issue-type">${esc(iss.label)}</span>
        ${iss.repairable ? '<span class="repair-flag">可生成候选修复</span>' : ''}
      </div>
      <div class="issue-meta">
        ${esc(iss.layerName)} · 要素 #${iss.sourceIndex ?? '—'}
        · 源行 ${iss.lineStart ?? '—'}${iss.lineEnd && iss.lineEnd !== iss.lineStart ? `–${iss.lineEnd}` : ''}
      </div>
      <div class="issue-detail">${esc(iss.detail)}</div>
      <div class="issue-actions">
        ${iss.featureFid ? '<button class="link-btn" data-act="locate">在地图上定位图形</button>' : ''}
        ${iss.lineStart ? '<button class="link-btn" data-act="source">查看原始行</button>' : ''}
        <button class="link-btn" data-act="detail">详情与坐标路径</button>
      </div>
    </article>`).join('');
  list.querySelectorAll('.issue-card').forEach((card) => {
    const iss = issues.find((x) => x.iid === card.dataset.iid);
    card.addEventListener('click', () => selectIssue(iss.iid));
    card.querySelector('[data-act=locate]')?.addEventListener('click', (e) => {
      e.stopPropagation(); locateIssue(iss);
    });
    card.querySelector('[data-act=source]')?.addEventListener('click', (e) => {
      e.stopPropagation(); showSourceLine(iss);
    });
    card.querySelector('[data-act=detail]')?.addEventListener('click', (e) => {
      e.stopPropagation(); showIssueDetail(iss);
    });
  });
}

function sevText(s) {
  return { critical: '严重', serious: '重要', warning: '警告', info: '提示' }[s] || s;
}

// ---------- 渲染：要素表 ----------
function renderFeatureTable() {
  const layerSel = $('#feature-layer');
  const current = layerSel.value;
  layerSel.innerHTML = state.layers.map((l) =>
    `<option value="${l.lid}" ${current === l.lid ? 'selected' : ''}>${esc(l.name)}</option>`).join('');
  const layer = state.layers.find((l) => l.lid === layerSel.value) || state.layers[0];
  const q = $('#feature-search').value.trim().toLowerCase();
  const tbody = $('#feature-table tbody');
  if (!layer) { tbody.innerHTML = ''; return; }
  const rows = layer.features.filter((f) => {
    if (!q) return true;
    return `${f.sourceIndex} ${f.lineStart ?? ''} ${f.geometry?.type ?? ''} ${JSON.stringify(f.properties)}`.toLowerCase().includes(q);
  });
  tbody.innerHTML = rows.map((f) => {
    const issueCount = state.report.issues.filter((i) => i.featureFid === f.fid).length;
    const propSummary = Object.entries(f.properties).slice(0, 3)
      .map(([k, v]) => `${esc(k)}=${esc(String(v).slice(0, 18))}`).join('，');
    return `<tr data-fid="${f.fid}" class="${state.selectedFid === f.fid ? 'selected' : ''}">
      <td class="num">#${f.sourceIndex}</td>
      <td class="num">${f.lineStart ?? '—'}</td>
      <td>${f.empty ? '<span class="tag empty">空几何</span>' : esc(f.geometry.type)}</td>
      <td class="num">${f.coordCount}</td>
      <td>${propSummary || '<span class="muted">—</span>'}</td>
      <td>${issueCount ? `<span class="sev-badge sev-serious">${issueCount} 项问题</span>` : '<span style="color:var(--good)">✓ 正常</span>'}</td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('tr').forEach((tr) =>
    tr.addEventListener('click', () => selectFeature(tr.dataset.fid, { focusTab: false, locate: true })));
}

// ---------- 渲染：修复面板 ----------
const REPAIR_ACTIONS = [
  ['EMPTY_GEOM', '移除空几何', '空几何不参与任何修复，直接从候选副本移除并列清单'],
  ['DUPLICATE', '去重（保留每组首个）', '几何或几何+属性完全相同的要素，只保留第一个'],
  ['INVALID_POLY', '闭合未闭合环', '首尾点不一致的环自动闭合，带洞面结构保留'],
  ['REPEATED_POINT', '移除连续重复点', '相邻完全相同的坐标点去重，保持环闭合'],
  ['SELF_INTERSECT', '拆分蝴蝶结自相交面', '单交点的 8 字面在交点拆成两个面；复杂多交点仅标记不自动改'],
  ['AXIS_SWAPPED', '纠正经纬度颠倒', '交换所有坐标的 x/y；原始坐标仍随副本留存'],
  ['PROJECTED_AS_LL', '投影误判仅标注', '不改坐标，提示重新指定 CRS（防止静默改写）'],
];

function renderRepairPanel() {
  const sourceLayers = state.layers.filter((l) => !l.isCandidate);
  const preferred = $('#feature-layer')?.value;
  const selector = `
    <div class="repair-row">
      <label>源图层（修复只生成副本，该图层保持不变）
        <select id="repair-source">
          ${sourceLayers.length
    ? sourceLayers.map((l) => `<option value="${l.lid}" ${preferred === l.lid ? 'selected' : ''}>${esc(l.name)}（${l.features.length} 要素，${esc(l.crs || '无 CRS')}）</option>`).join('')
    : '<option value="">（请先导入源图层）</option>'}
        </select>
      </label>
    </div>`;
  const box = $('#repair-actions');
  box.innerHTML = selector + REPAIR_ACTIONS.map(([type, name, desc], i) => `
    <label>
      <input type="checkbox" value="${type}" ${i < 5 ? 'checked' : ''} />
      <span><span class="ra-name">${name}</span><br/><span class="ra-desc">${desc}</span></span>
    </label>`).join('');
}

function renderRepairResult(candidate) {
  const s = candidate.lineage.stats;
  const areaRows = candidate.lineage.areaChanges
    .filter((a) => a.comparable)
    .map((a) => {
      const cls = a.delta > 0 ? 'delta-pos' : a.delta < 0 ? 'delta-neg' : '';
      return `<tr>
        <td class="num">#${a.sourceIndex}</td><td class="num">${a.line ?? '—'}</td>
        <td class="num">${fmtArea(a.before)}</td><td class="num">${fmtArea(a.after)}</td>
        <td class="num ${cls}">${a.delta >= 0 ? '+' : ''}${fmtArea(a.delta)}</td>
        <td>${esc(a.note || '—')}</td>
      </tr>`;
    }).join('');
  $('#repair-result').innerHTML = `
    <div class="result-summary">
      <h4>候选副本已生成：${esc(candidate.name)}</h4>
      <p class="small muted" style="margin:4px 0">${esc(candidate.lineage.guarantee)}</p>
      <ul>
        <li>输入 ${s.input} 个要素 → 输出 ${s.output} 个；移除 ${s.removed}，修改 ${s.modified}，拆分 ${s.splitCount}</li>
        <li>被移除/拆分的要素见下方清单与「溯源」页</li>
      </ul>
      <button class="btn btn-primary btn-block" id="btn-export-candidate">导出修正版 GeoJSON（可重新加载复检）</button>
    </div>
    <h4 class="small">面积变化（球面/平面 m²，仅列可比要素）</h4>
    <div class="table-wrap" style="max-height:260px">
      <table class="area-table">
        <thead><tr><th>要素</th><th>源行</th><th>修复前</th><th>修复后</th><th>变化</th><th>说明</th></tr></thead>
        <tbody>${areaRows || '<tr><td colspan="6" class="muted">无面积可比的改动</td></tr>'}</tbody>
      </table>
    </div>`;
  $('#btn-export-candidate').addEventListener('click', () => {
    exportCandidate(candidate);
    toast('已导出候选副本；源文件未被修改。可重新导入该文件再次运行检查');
  });
}

// ---------- 渲染：溯源页 ----------
function renderLineage() {
  const view = $('#lineage-view');
  const candidates = state.layers.filter((l) => l.isCandidate);
  if (!candidates.length) {
    view.innerHTML = '<p class="muted">生成候选修复并重新加载后，这里显示改动只作用于副本的完整证据链。</p>';
    return;
  }
  view.innerHTML = candidates.map((c) => {
    const lin = c.lineage;
    const removed = lin.changeLog.filter((x) => x.action === 'removed');
    const split = lin.areaChanges.filter((x) => x.note.includes('拆分'));
    return `<div class="lineage-card">
      <h4>${esc(c.name)} <span class="tag candidate-tag">候选副本</span></h4>
      <dl>
        <dt>来源图层</dt><dd>${esc(lin.sourceLayer)}（${esc(lin.sourceFile)}）</dd>
        <dt>生成时间</dt><dd>${esc(lin.generatedAt)}</dd>
        <dt>源 CRS</dt><dd>${esc(lin.sourceCrs || '缺失')}</dd>
        <dt>动作</dt><dd>${lin.actions.map((a) => esc(ISSUE_TYPES[a]?.label || a)).join('、')}</dd>
        <dt>移除清单</dt><dd>${removed.length ? removed.map((r) => `#${r.sourceIndex}(行${r.line}) ${esc(r.reason)}`).join('；') : '无'}</dd>
        <dt>拆分要素</dt><dd>${split.length ? split.map((r) => `#${r.sourceIndex}`).join('、') : '无'}</dd>
        <dt class="guarantee">安全保证</dt><dd class="guarantee">${esc(lin.guarantee)}</dd>
      </dl>
    </div>`;
  }).join('');
}

// ---------- 选择与联动 ----------
function selectIssue(iid) {
  state.selectedIssueId = iid;
  const iss = state.report.issues.find((x) => x.iid === iid);
  if (iss?.featureFid) selectFeature(iss.featureFid, { focusTab: false, locate: false });
  renderIssueList();
}

function selectFeature(fid, { focusTab, locate } = {}) {
  state.selectedFid = fid;
  const found = featureById(fid);
  if (!found) return;
  const entry = mapEntryOf(found.layer.lid);
  if (locate && entry) entry.visible = true;
  map.setHighlight(fid);
  if (locate) map.zoomToFeature(found.feature, entry);
  if (focusTab) {
    const iss = state.report.issues.find((i) => i.featureFid === fid);
    if (iss) { switchTab('issues'); state.selectedIssueId = iss.iid; renderIssueList(); }
  }
  renderFeatureTable();
  renderLayerBar();
}

function locateIssue(iss) {
  if (!iss.featureFid) return;
  const found = featureById(iss.featureFid);
  const entry = mapEntryOf(found.layer.lid);
  entry.visible = true;
  map.setLayers(state.mapEntries);
  map.zoomToFeature(found.feature, entry);
  map.setHighlight(found.feature.fid);
  toast(`定位到 ${found.layer.name} 要素 #${found.feature.sourceIndex}（源行 ${found.feature.lineStart ?? '—'}）`);
}

function showMapTooltip(hit, pos) {
  const tip = $('#map-tooltip');
  if (!hit) { tip.hidden = true; return; }
  const { feature, layer } = hit.entry;
  const issues = state.report.issues.filter((i) => i.featureFid === feature.fid);
  const name = feature.properties.name || feature.id || `#${feature.sourceIndex}`;
  tip.innerHTML = `<b>${esc(String(name))}</b><br/>${esc(layer.name)} · ${feature.empty ? '空几何' : esc(feature.geometry.type)}
    <br/>${issues.length ? `<span style="color:#ff9b9b">${issues.length} 项问题</span>` : '<span style="color:#86e0b0">无问题</span>'}`;
  tip.hidden = false;
  const rect = $('#map').getBoundingClientRect();
  tip.style.left = `${Math.min(rect.width - 210, (pos?.x ?? 60) + 14)}px`;
  tip.style.top = `${(pos?.y ?? 60) + 14}px`;
}

// 查看原始行：弹窗显示来源文件中的物理行内容（从属性中无法反推文本，故展示行号与要素 JSON）
function showSourceLine(iss) {
  const found = iss.featureFid ? featureById(iss.featureFid) : null;
  $('#detail-title').textContent = `原始行定位 · ${iss.layerName}`;
  $('#detail-body').innerHTML = `
    <dl class="detail-grid">
      <dt>源文件</dt><dd>${esc(found?.layer.sourceName || iss.layerName)}</dd>
      <dt>物理行号</dt><dd>${iss.lineStart}${iss.lineEnd && iss.lineEnd !== iss.lineStart ? ` – ${iss.lineEnd}` : ''}</dd>
      <dt>要素序号</dt><dd>#${iss.sourceIndex ?? '—'}</dd>
    </dl>
    <p class="small muted" style="margin-top:10px">以下为该要素在源文件对应行范围内的完整 JSON（原始坐标，未做任何改写）：</p>
    <pre class="coords">${esc(JSON.stringify(found?.feature.originalGeometry ?? iss.detail, null, 2))}</pre>`;
  $('#dlg-detail').showModal();
}

function showIssueDetail(iss) {
  const found = iss.featureFid ? featureById(iss.featureFid) : null;
  $('#detail-title').textContent = `${iss.label} · ${sevText(iss.severity)}`;
  $('#detail-body').innerHTML = `
    <dl class="detail-grid">
      <dt>图层</dt><dd>${esc(iss.layerName)}</dd>
      <dt>要素</dt><dd>#${iss.sourceIndex ?? '—'}（源行 ${iss.lineStart ?? '—'}）</dd>
      <dt>问题说明</dt><dd>${esc(iss.detail)}</dd>
      <dt>修复建议</dt><dd>${esc(iss.hint)}</dd>
      <dt>坐标路径</dt><dd>${iss.coordPath ? esc(JSON.stringify(iss.coordPath)) : '—'}</dd>
      <dt>问题坐标</dt><dd>${iss.point ? esc(JSON.stringify(iss.point)) : '—'}</dd>
    </dl>
    ${found ? `<p class="small muted" style="margin-top:10px">原始几何：</p><pre class="coords">${esc(JSON.stringify(found.feature.originalGeometry, null, 2))}</pre>` : ''}`;
  $('#dlg-detail').showModal();
}

// ---------- 过滤器 ----------
function renderFilterOptions() {
  const layerSel = $('#filter-layer');
  const cur = layerSel.value;
  layerSel.innerHTML = '<option value="">全部图层</option>' + state.layers.map((l) =>
    `<option value="${l.lid}">${esc(l.name)}</option>`).join('');
  layerSel.value = cur;
  const typeSel = $('#filter-type');
  const curType = typeSel.value;
  const present = new Set(state.report.issues.map((i) => i.type));
  typeSel.innerHTML = '<option value="">全部类型</option>' + [...present].map((t) =>
    `<option value="${t}">${esc(ISSUE_TYPES[t].label)}</option>`).join('');
  typeSel.value = curType;
}

// ---------- Tab ----------
function switchTab(name) {
  state.activeTab = name;
  $$('.tab').forEach((t) => t.classList.toggle('active', t.dataset.tab === name));
  $$('.tab-panel').forEach((p) => p.classList.toggle('active', p.dataset.panel === name));
  if (name === 'features') renderFeatureTable();
  if (name === 'repair') renderRepairPanel();
  if (name === 'lineage') renderLineage();
}

// ---------- 总渲染 ----------
function renderAll() {
  refreshChecks();
  state.mapEntries.forEach((e) => { e._cache = null; });
  map.setLayers(state.mapEntries);
  // 地图统一显示 CRS：决定网格类型与所有图层的转换目标
  const geo = isGeographic(state.displayCrs);
  map.geoMode = geo;
  map.setMapCrs(state.displayCrs);
  const visibleCrs = state.mapEntries
    .filter((e) => e.visible)
    .map((e) => (e.layer.crs ? state.displayCrs : '未知（缺 CRS）'));
  const modes = [...new Set(visibleCrs)];
  $('#map-mode').textContent = `显示坐标：${modes.join(' / ') || '—'}`;
  map.fitToData();
  renderLayerBar();
  renderStats();
  renderFilterOptions();
  renderIssueList();
  renderFeatureTable();
  renderLineage();
}

// ---------- 事件绑定 ----------
function bindEvents() {
  $$('.tab').forEach((t) => t.addEventListener('click', () => switchTab(t.dataset.tab)));
  $('#filter-layer').addEventListener('change', (e) => { state.filters.layerId = e.target.value; renderIssueList(); });
  $('#filter-sev').addEventListener('change', (e) => { state.filters.severity = e.target.value; renderIssueList(); });
  $('#filter-type').addEventListener('change', (e) => { state.filters.type = e.target.value; renderIssueList(); });
  $('#filter-text').addEventListener('input', (e) => { state.filters.text = e.target.value; renderIssueList(); });
  $('#feature-layer').addEventListener('change', renderFeatureTable);
  $('#feature-search').addEventListener('input', renderFeatureTable);
  $('#btn-fit').addEventListener('click', () => map.fitToData());
  $('#btn-export-issues').addEventListener('click', () => {
    exportIssuesCsv();
    toast('问题列表已按当前过滤条件导出 CSV');
  });

  $('#file-geojson').addEventListener('change', async (e) => {
    const files = [...e.target.files];
    e.target.value = '';
    for (const file of files) {
      try {
        const msgs = await importGeoJsonFiles([file]);
        msgs.forEach((m, i) => setTimeout(() => toast(m), i * 400));
      } catch (err) {
        toast(`导入失败 ${file.name}：${err.message}`, 6000);
      }
    }
    renderAll();
  });

  // CSV 导入对话框
  $('#btn-csv').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,text/csv';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      const text = await file.text();
      openCsvDialog(file, text);
    };
    input.click();
  });

  $('#form-csv').addEventListener('submit', (e) => {
    if (e.submitter?.value !== 'confirm' || !state.csvDraft) return;
    e.preventDefault();
    const { file, text } = state.csvDraft;
    const crs = $('#csv-crs').value || null;
    try {
      const { layer, warnings } = importCsv(text, file.name, {
        xColumn: Number($('#csv-x').value),
        yColumn: Number($('#csv-y').value),
        crs,
      });
      state.csvDraft = null;
      $('#dlg-csv').close();
      renderAll();
      toast(`CSV 已导入：${layer.features.length} 个点${crs ? `，CRS=${crs}` : '，未指定 CRS，投影转换停止'}`);
      warnings.forEach((w, i) => setTimeout(() => toast(`⚠ ${w}`, 5000), (i + 1) * 500));
    } catch (err) {
      toast(`CSV 导入失败：${err.message}`, 6000);
    }
  });

  // 投影切换
  $('#btn-proj').addEventListener('click', () => {
    const opts = crsOptions();
    $('#proj-target').innerHTML = opts.map(([code, label]) => `<option value="${code}">${esc(label)}</option>`).join('');
    const missing = state.layers.filter((l) => l.crsMissing || !ensureCrs(l.crs));
    $('#proj-warn').hidden = missing.length === 0;
    $('#proj-warn').textContent = missing.length
      ? `以下图层缺 CRS 或 CRS 无法识别，将跳过投影转换：${missing.map((l) => l.name).join('、')}` : '';
    $('#dlg-proj').showModal();
  });
  $('#form-proj').addEventListener('submit', (e) => {
    if (e.submitter?.value !== 'confirm') return;
    e.preventDefault();
    const target = $('#proj-target').value;
    let switched = 0; let skipped = 0;
    // 统计：有已知 CRS 的图层会被统一转换到目标 CRS；缺/未知 CRS 的图层跳过
    for (const entry of state.mapEntries) {
      if (!entry.layer.crs || !ensureCrs(entry.layer.crs)) { skipped += 1; continue; }
      switched += 1;
    }
    state.displayCrs = target;
    $('#dlg-proj').close();
    renderAll();
    toast(`显示投影已切换为 ${target}：${switched} 个图层已转换，${skipped} 个因缺 CRS 跳过；原始坐标未改动`);
  });

  // 显式指定 CRS
  $('#btn-crs-assign').addEventListener('click', () => {
    $('#crs-layer').innerHTML = state.layers.map((l) =>
      `<option value="${l.lid}">${esc(l.name)}（当前：${esc(l.crs || '缺失')}）</option>`).join('')
      || '<option value="">（无图层）</option>';
    $('#crs-code').innerHTML = '<option value="">— 不指定 —</option>'
      + crsOptions().map(([code, label]) => `<option value="${code}">${esc(label)}</option>`).join('');
    $('#dlg-crs').showModal();
  });
  $('#form-crs').addEventListener('submit', (e) => {
    if (e.submitter?.value !== 'confirm') return;
    e.preventDefault();
    const lid = $('#crs-layer').value;
    const code = $('#crs-code').value || null;
    if (lid) { assignCrs(lid, code); renderAll(); toast(code ? `已指定 CRS=${code}（坐标数值未改动）` : '已清除 CRS 指定'); }
    $('#dlg-crs').close();
  });

  // 生成候选修复
  $('#btn-build-candidate').addEventListener('click', () => {
    const sourceId = $('#repair-source')?.value;
    const source = state.layers.find((l) => l.lid === sourceId);
    if (!source) { toast('请先导入数据并选择源图层'); return; }
    const actions = [...$$('#repair-actions input:checked')].map((i) => i.value);
    if (!actions.length) { toast('请至少勾选一项修复动作'); return; }
    // 面积基准自动跟随源图层 CRS：明确的投影 CRS 用平面公式；地理 CRS 或缺 CRS 用球面公式
    const basis = source.crs && !isGeographic(source.crs) ? 'planar' : 'geo';
    const candidate = createCandidate(source.lid, actions, basis);
    renderAll();
    renderRepairResult(candidate);
    switchTab('repair');
    toast(`候选副本已生成：源图层「${source.name}」保持不变`);
  });

  // 虚构示例（fetch 本地 data/ 目录，离线可用；file:// 协议下回退内置数据）
  $('#btn-sample').addEventListener('click', loadSamples);
}

async function openCsvDialog(file, text) {
  const { parseCsvRows } = await import('./parsing.js');
  const { rows } = parseCsvRows(text);
  const headers = rows[0].map((h) => h.trim());
  state.csvDraft = { file, text, headers };
  $('#csv-file-name').textContent = file.name;
  $('#csv-x').innerHTML = headers.map((h, i) => `<option value="${i}">${esc(h)}</option>`).join('');
  $('#csv-y').innerHTML = headers.map((h, i) => `<option value="${i}">${esc(h)}</option>`).join('');
  const xGuess = headers.findIndex((h) => /lng|lon|long|经度|^x$/i.test(h));
  const yGuess = headers.findIndex((h) => /lat|纬度|^y$/i.test(h));
  if (xGuess >= 0) $('#csv-x').value = xGuess;
  if (yGuess >= 0) $('#csv-y').value = yGuess;
  $('#csv-crs').innerHTML = '<option value="">— 不指定（投影转换将停止）—</option>'
    + crsOptions().map(([code, label]) => `<option value="${code}" ${code === 'EPSG:4326' ? 'selected' : ''}>${esc(label)}</option>`).join('');
  const warn = xGuess < 0 || yGuess < 0 ? '未能自动识别经纬度列，请手动选择 X/Y 列' : '';
  $('#csv-warn').hidden = !warn;
  $('#csv-warn').textContent = warn;
  $('#dlg-csv').showModal();
}

// ---------- 虚构示例数据（内嵌，保证 file:// 直接打开也可用） ----------------
import { SAMPLE_FILES } from './samples.js';
async function loadSamples() {
  for (const { name, kind, text, csvOpts } of SAMPLE_FILES) {
    if (kind === 'geojson') {
      const { parseGeoJson } = await import('./parsing.js');
      const { layer, warnings } = parseGeoJson(text, name);
      addLayer(layer);
      warnings.forEach((w) => toast(`⚠ ${w}`, 5000));
    } else {
      importCsv(text, name, csvOpts || { crs: 'EPSG:4326' });
    }
  }
  renderAll();
  toast('已载入 5 个虚构示例图层（含全部检查项场景）');
}

bindEvents();
renderRepairPanel();
renderAll();
