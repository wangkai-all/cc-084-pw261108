# 地理数据质检台（离线版）

纯本地运行的地理数据质检页面：导入 **GeoJSON** 和**坐标 CSV**，在无在线底图的本地
Canvas 地图上显示并质检，检查坐标系、越界点、自相交面和重复要素等问题。所有问题可
点回地图图形与源文件物理行号；修复**只生成候选副本**并展示面积变化，永不覆盖源文件。

## 快速开始

```bash
npm install
npm run samples     # 生成虚构示例数据（data/）与内嵌示例（src/samples.js），并构建 bundle
npm run serve       # http://localhost:8123
# 或直接用浏览器打开 index.html（file:// 也可用，示例数据已内嵌）
npm test            # 引擎与应用状态测试（23 项，node:test）
npm run test:e2e    # 浏览器端到端测试（17 项；需先 npm run serve，并安装 Playwright 浏览器）
```

构建：`npm run build`（esbuild 单文件打包到 `vendor/bundle.js`，proj4 已内联，无外部请求）。

### 无 root 容器中运行浏览器测试

极简容器通常缺少 Chromium 的系统共享库且无 sudo（甚至没有 `unzip`）。本仓库提供
两个脚本，全程在用户目录内完成，不写系统目录：

```bash
# 1) 下载浏览器（修订号见 node_modules/playwright-core/browsers.json）
bash tools/fetch-browser.sh        # 产出 chromium.zip / shell.zip 到 ~/.cache/ms-playwright
# 2) 用 Python zipfile 解包浏览器（headless 模式 Playwright 实际用 headless_shell）
bash tools/extract-browser.sh
# 3) 本地解包系统依赖与中文字体（apt-get download + dpkg-deb -x，约 50MB）
bash tools/fetch-chrome-deps.sh
# 4) 注入环境并运行（user namespace 受限，需 --no-sandbox）
source tools/chrome-env.sh
PLAYWRIGHT_CHROMIUM_ARGS="--no-sandbox --disable-dev-shm-usage --disable-gpu" npm run test:e2e
```

Playwright 1.56 在 headless（默认）下启动的是 `chromium-headless-shell`，因此只需
该二进制即可跑完全部 e2e；常规开发机直接 `npx playwright install chromium` 即可，
无需上述脚本。

## 功能与需求对照

| 需求 | 实现位置 / 行为 |
| --- | --- |
| 导入 GeoJSON 与坐标 CSV | `src/parsing.js`；CSV 可手动选 X/Y 列、指定 CRS，非数值坐标转空几何 |
| 本地地图、无在线底图 | `src/mapview.js` Canvas 渲染：经纬/平面网格、比例尺、指北针；无任何网络底图。所有已知 CRS 图层统一转换到地图级 `mapCrs` 叠加，缺 CRS 图层仅在地理模式按原始经纬度显示 |
| 坐标系检查 | 元数据 `crs` 成员读取（`src/crs.js`），缺失报 `CRS_MISSING`、无法识别报 `CRS_UNKNOWN` |
| 缺失 CRS 停止投影转换 | 投影切换对话框跳过缺 CRS 图层并提示；`transformPoint` 无 CRS 时直接抛错 |
| 用户显式指定 CRS | 顶栏「指定图层 CRS」；只改声明，不改坐标数值 |
| 越界点 | 地理坐标系下经度 [-180,180]、纬度 [-90,90] 校验，带坐标路径与首个越界点 |
| 自相交面/线 | `src/geom.js` 线段求交，区分真交点、弱接触、共线重叠；蝴蝶结可拆分为两个面 |
| 重复要素 | 几何哈希 + 属性哈希两级检测，报告同组要素序号 |
| 点回图形与原始行号 | 每个问题带 `lineStart/lineEnd`（GeoJSON 按字节偏移映射物理行，CSV 按物理行）与坐标路径 |
| 切投影留存原始坐标 | 投影只生成显示几何（带缓存）；`originalGeometry` 独立存档，切回即复原 |
| 空几何单独处理 | 报 `EMPTY_GEOM`；候选修复中单独移除并列清单，不与其他修复叠加 |
| 非法多边形单独处理 | 未闭合环、环点不足、洞在外环外分别报告；闭合/去重可生成候选修复 |
| 经纬度误当平面坐标 | `PROJECTED_AS_LL`（数值远超 ±180/±90）与 `AXIS_SWAPPED`（(lat,lon) 颠倒）分开报告 |
| 修复只生成候选副本 | `src/repair.js` 输出新图层，源图层/源文件零修改；导出带 `__qc_lineage` 元数据 |
| 面积变化展示 | 修复前后 m² 对比（地理 CRS 球面公式、投影 CRS 平面公式，自动跟随源 CRS） |
| 多边形洞、集合几何、跨日期变更线保留拓扑 | 洞随环结构保留；GeometryCollection 按成员检查并保留原集合；日界线仅渲染拆分（`splitLineAtDateline`），原始坐标不动 |
| 候选修复显示拆分/移除要素 | 「溯源」页与修复结果区列出移除清单、拆分要素、修改计数 |
| 问题列表按图层过滤 | 图层 + 严重度 + 类型 + 全文搜索四个过滤器，可导出过滤后的 CSV |
| 导出修正版→重新加载→复检 | 导出 GeoJSON 重新导入后自动识别为候选副本（`isCandidate`），可再次运行检查验证 |
| 虚构数据、不依赖在线底图 | `data/generate-samples.js` 生成 5 个场景文件；同时内嵌于 `src/samples.js` |

## 检查项（`src/checks.js`）

| 类型 | 严重度 | 可候选修复 |
| --- | --- | --- |
| CRS_MISSING / CRS_UNKNOWN | 严重 | 否（需人工指定） |
| AXIS_SWAPPED 经纬度颠倒 | 严重 | 是（交换 x/y，图层级作用于全部要素） |
| PROJECTED_AS_LL 平面坐标误当经纬度 | 严重 | 仅标注，引导重指定 CRS，不静默改数 |
| OUT_OF_BOUNDS 越界点 | 重要 | 否（需人工核数据） |
| EMPTY_GEOM 空几何 | 重要 | 移除（副本内） |
| INVALID_POLY 非法多边形 | 重要 | 闭合环 |
| SELF_INTERSECT 自相交 | 重要 | 单交点蝴蝶结拆分；复杂情形仅标记 |
| DUPLICATE 重复要素 | 警告 | 保留组内首个 |
| REPEATED_POINT 连续重复点 | 警告 | 去重并保持闭合 |
| DATELINE 跨日期变更线 | 警告 | 无需修复（拓扑保留） |
| GEOM_COLLECTION 集合几何 | 提示 | 按成员处理 |

## 安全模型

1. 导入的文件只在浏览器内存中解析，不上传任何服务。
2. `geometry` 与 `originalGeometry` 双存档；投影、修复都返回新对象。
3. 修复产物是带虚线标记的「候选副本」图层，导出文件名含 `__candidate`，
   并携带 `__qc_lineage`（来源、动作、逐要素变更、面积变化、安全保证声明）。
4. 重新加载候选副本后复检，可验证空几何/重复等问题已消除且源图层仍保持原样。

## 目录结构

```
src/
  crs.js       坐标系注册、proj4 转换、轴顺序启发式、GeoJSON crs 读取
  geom.js      几何原语：相交、环面积（平面/球面）、日界线、遍历
  parsing.js   GeoJSON/CSV 解析与物理行号映射
  checks.js    质检引擎与问题模型
  repair.js    候选修复（原子修复 + 副本 + 变更/面积台账 + 导出）
  mapview.js   离线 Canvas 地图（平移/缩放/拾取/高亮/日界线渲染）
  state.js     应用状态与动作
  main.js      UI 渲染与事件联动
data/          虚构示例（生成产物）
test/          引擎单元测试 + 浏览器端到端测试
tools/         本地静态服务器、示例内嵌构建器
```
