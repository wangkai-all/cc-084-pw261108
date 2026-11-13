// 端到端浏览器测试：真实页面上验证完整质检工作流。
// 运行：先启动 tools/serve.js，再 node test/e2e.test.js
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const base = process.env.QC_BASE_URL || 'http://localhost:8123';
const results = [];
async function check(name, fn) {
  try { await fn(); results.push(['PASS', name]); }
  catch (e) { results.push(['FAIL', `${name} :: ${e.message}`]); }
}

// 极简/无 root 容器中 user namespace 不可用，通过 PLAYWRIGHT_CHROMIUM_ARGS
// 传入 "--no-sandbox ..."（空格分隔）；常规环境留空即可。
const launchArgs = (process.env.PLAYWRIGHT_CHROMIUM_ARGS || '')
  .split(' ')
  .map((s) => s.trim())
  .filter(Boolean);
const browser = await chromium.launch(launchArgs.length ? { args: launchArgs } : {});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const consoleErrors = [];
page.on('pageerror', (e) => consoleErrors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

await page.goto(base, { waitUntil: 'networkidle' });

await check('页面加载无控制台错误（初始）', () => {
  assert.equal(consoleErrors.length, 0, consoleErrors.join(' | '));
});

await check('载入虚构示例：5 个图层', async () => {
  await page.click('#btn-sample');
  await page.waitForFunction(() => document.querySelectorAll('.layer-chip').length === 5, null, { timeout: 5000 });
  const chips = await page.$$eval('.layer-chip', (els) => els.map((e) => e.textContent));
  assert.ok(chips.some((t) => t.includes('4326')));
  assert.ok(chips.some((t) => t.includes('UTM')));
});

await check('问题列表检出全部关键类型', async () => {
  await page.waitForSelector('.issue-card');
  const text = await page.$eval('#issue-list', (el) => el.textContent);
  for (const label of ['自相交', '非法多边形', '空几何', '越界', '重复要素', '坐标系缺失', '经纬度疑似颠倒', '跨日期变更线', '集合几何', '连续重复点']) {
    assert.ok(text.includes(label), `缺少问题类型：${label}`);
  }
});

await check('统计卡片显示非零计数', async () => {
  const nums = await page.$$eval('.stat .num', (els) => els.map((e) => Number(e.textContent)));
  assert.equal(nums.length, 5);
  assert.ok(nums[2] > 0, '严重问题应 > 0');
});

await check('图层过滤生效', async () => {
  const firstLayer = await page.$eval('#filter-layer option:nth-child(2)', (el) => el.value);
  await page.selectOption('#filter-layer', firstLayer);
  await page.waitForSelector('.issue-card');
  const count = await page.$$eval('.issue-card', (els) => els.length);
  assert.ok(count > 0 && count < 50);
  await page.selectOption('#filter-layer', '');
});

await check('点击问题定位地图并高亮图形', async () => {
  // 前两张卡片为图层级问题（无定位按钮），筛选出带定位按钮的要素级卡片
  await page.click('.issue-card:has([data-act=locate]) >> nth=0 >> [data-act=locate]');
  await page.waitForTimeout(300);
  const toast = await page.$eval('#toast', (el) => el.textContent);
  assert.ok(toast.includes('定位到'));
});

await check('查看原始行弹窗显示物理行号', async () => {
  await page.click('.issue-card:has([data-act=source]) >> nth=0 >> [data-act=source]');
  const dlg = await page.waitForSelector('#dlg-detail[open]');
  const body = await page.$eval('#detail-body', (el) => el.textContent);
  assert.ok(body.includes('物理行号'));
  assert.match(body, /物理行号\D*\d+/);
  await page.keyboard.press('Escape');
});

await check('投影切换：UTM 图层转 EPSG:3857，缺 CRS 图层跳过', async () => {
  await page.click('#btn-proj');
  await page.selectOption('#proj-target', 'EPSG:3857');
  await page.click('#form-proj button[value=confirm]');
  await page.waitForTimeout(400);
  const mode = await page.$eval('#map-mode', (el) => el.textContent);
  assert.ok(mode.includes('3857'));
  const toast = await page.$eval('#toast', (el) => el.textContent);
  assert.ok(toast.includes('原始坐标未改动'));
  // 统一显示 CRS 下，已知 CRS 图层应在平面米制坐标空间仍有可见绘制（非空白画布）
  const nonBgPixels = await page.evaluate(() => {
    const c = document.getElementById('map');
    const ctx = c.getContext('2d');
    const img = ctx.getImageData(0, 0, c.width, c.height).data;
    let count = 0;
    for (let i = 3; i < img.length; i += 4 * 37) if (img[i] > 0) count += 1; // 抽样非透明像素
    return count;
  });
  assert.ok(nonBgPixels > 50, `投影后地图应有可见要素，实际非透明采样 ${nonBgPixels}`);
});

await check('切回 4326 显示', async () => {
  await page.click('#btn-proj');
  await page.selectOption('#proj-target', 'EPSG:4326');
  await page.click('#form-proj button[value=confirm]');
  await page.waitForTimeout(400);
});

await check('要素表可按图层切换并显示行号', async () => {
  await page.click('.tab[data-tab=features]');
  await page.waitForSelector('#feature-table tbody tr');
  const firstRow = await page.$eval('#feature-table tbody tr:first-child', (el) => el.textContent);
  assert.ok(firstRow.includes('#'));
  const rowCount = await page.$$eval('#feature-table tbody tr', (els) => els.length);
  assert.ok(rowCount >= 2);
});

await check('生成候选修复副本：统计与面积变化表', async () => {
  await page.click('.tab[data-tab=repair]');
  await page.waitForSelector('#repair-source');
  // 选主 4326 图层
  const opts = await page.$$eval('#repair-source option', (els) => els.map((e) => ({ v: e.value, t: e.textContent })));
  const mainOpt = opts.find((o) => o.t.includes('4326'));
  await page.selectOption('#repair-source', mainOpt.v);
  await page.click('#btn-build-candidate');
  await page.waitForSelector('#btn-export-candidate', { timeout: 5000 });
  const summary = await page.$eval('.result-summary', (el) => el.textContent);
  assert.ok(summary.includes('移除 2'), summary);
  assert.ok(summary.includes('候选副本'));
  const areaText = await page.$eval('.area-table', (el) => el.textContent);
  assert.ok(areaText.includes('m²') || areaText.includes('km²'));
});

await check('候选副本在图层条以虚线样式标记，源图层仍在', async () => {
  const candidate = await page.$('.layer-chip.candidate');
  assert.ok(candidate);
  const chips = await page.$$eval('.layer-chip', (els) => els.length);
  assert.equal(chips, 6); // 5 源 + 1 副本
});

// 导出候选副本 -> 重新加载 -> 复检
await check('导出修正版并重新加载后复检：空几何/重复消失', async () => {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#btn-export-candidate'),
  ]);
  const tmpPath = join(here, '..', 'data', '_e2e_candidate.geojson');
  await download.saveAs(tmpPath);
  // 通过文件输入重新导入
  const fileContent = readFileSync(tmpPath, 'utf8');
  await page.setInputFiles('#file-geojson', { name: '_e2e_candidate.geojson', mimeType: 'application/geo+json', buffer: Buffer.from(fileContent) });
  await page.waitForFunction(() => document.querySelectorAll('.layer-chip').length === 7, null, { timeout: 5000 });
  await page.click('.tab[data-tab=issues]');
  await page.selectOption('#filter-layer', '');
  const text = await page.$eval('#issue-list', (el) => el.textContent);
  // 重新加载的副本本身不应再有空几何/重复问题
  const reloaded = await page.$$eval('.layer-chip', (els) => els.map((e) => e.textContent));
  assert.ok(reloaded.some((t) => t.includes('候选副本')));
  // 全局文本中，副本相关卡片不再出现空几何/重复（通过过滤到该图层验证）
  // 候选副本图层名含「候选修复」，用过滤下拉框按文案定位，不依赖导入文件名
  const layerOpts = await page.$$eval('#filter-layer option', (els) => els.map((e) => ({ v: e.value, t: e.textContent })));
  const candidateOpts = layerOpts.filter((o) => o.t.includes('候选修复'));
  assert.ok(candidateOpts.length >= 2, '应至少有生成的与重新加载的两个候选副本图层');
  const reloadedOpt = candidateOpts[candidateOpts.length - 1];
  await page.selectOption('#filter-layer', reloadedOpt.v);
  await page.waitForTimeout(300);
  const filtered = await page.$eval('#issue-list', (el) => el.textContent);
  assert.ok(!filtered.includes('空几何'), '副本复检不应有空几何');
  assert.ok(!filtered.includes('重复要素'), '副本复检不应有重复');
  await page.selectOption('#filter-layer', '');
});

await check('溯源页展示移除/拆分清单与安全保证', async () => {
  await page.click('.tab[data-tab=lineage]');
  const text = await page.$eval('#lineage-view', (el) => el.textContent);
  assert.ok(text.includes('源文件'));
  assert.ok(text.includes('安全保证'));
  assert.ok(text.includes('移除清单'));
});

await check('问题 CSV 导出', async () => {
  await page.click('.tab[data-tab=issues]');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#btn-export-issues'),
  ]);
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const c of stream) chunks.push(c);
  const csv = Buffer.concat(chunks).toString();
  assert.ok(csv.startsWith('图层,严重度,问题类型'));
  assert.ok(csv.split('\n').length > 5);
});

await check('显式指定 CRS 解除缺失状态', async () => {
  await page.click('#btn-crs-assign');
  const layerOpts = await page.$$eval('#crs-layer option', (els) => els.map((e) => ({ v: e.value, t: e.textContent })));
  const noCrs = layerOpts.find((o) => o.t.includes('缺坐标系'));
  await page.selectOption('#crs-layer', noCrs.v);
  await page.selectOption('#crs-code', 'EPSG:4326');
  await page.click('#form-crs button[value=confirm]');
  await page.waitForTimeout(300);
  // 该图层的 chip 现在应显示 EPSG:4326，且不再是「无 CRS」
  const allChips = await page.$$eval('.layer-chip', (els) => els.map((e) => e.textContent));
  const target = allChips.find((t) => t.includes('缺坐标系'));
  assert.ok(target, '应找到原缺 CRS 图层');
  assert.ok(target.includes('EPSG:4326'), `图层应已更新 CRS：${target}`);
  assert.ok(!target.includes('无 CRS'), '不应再显示无 CRS');
});

await check('全程无页面错误', () => {
  assert.equal(consoleErrors.length, 0, consoleErrors.join(' | '));
});

// 截图存档
await page.screenshot({ path: join(here, '..', 'data', 'e2e-screenshot.png'), fullPage: false });

await browser.close();
let failed = 0;
for (const [status, name] of results) {
  if (status === 'FAIL') failed += 1;
  console.log(`${status}  ${name}`);
}
console.log(`\n${results.length - failed}/${results.length} 通过`);
process.exit(failed ? 1 : 0);
