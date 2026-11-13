// 把 data/ 下的虚构示例打包为 src/samples.js（ES 模块字符串），
// 保证页面通过 file:// 直接打开时也能离线载入示例。
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const files = [
  { name: 'sample_4326.geojson', kind: 'geojson', text: read('data/sample_4326.geojson') },
  { name: 'sample_no_crs.geojson', kind: 'geojson', text: read('data/sample_no_crs.geojson') },
  { name: 'sample_utm50n.geojson', kind: 'geojson', text: read('data/sample_utm50n.geojson') },
  { name: 'sample_swapped.geojson', kind: 'geojson', text: read('data/sample_swapped.geojson') },
  { name: 'sample_points.csv', kind: 'csv', text: read('data/sample_points.csv'), csvOpts: { crs: 'EPSG:4326' } },
];

const out = `// 自动生成，请勿手改（npm run samples 会重新生成）
// 虚构示例数据的内嵌副本，供 file:// 离线场景使用。
export const SAMPLE_FILES = ${JSON.stringify(files, null, 2)};
`;
writeFileSync(join(root, 'src', 'samples.js'), out);
console.log('src/samples.js 已生成');
