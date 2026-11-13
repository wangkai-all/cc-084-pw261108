#!/usr/bin/env bash
# 解包已下载的 Playwright Chromium 到其期望的缓存目录布局。
# 前置：tools/fetch-browser.sh 已产出 ~/.cache/ms-playwright/{chromium,shell}.zip
# 极简镜像无 unzip，统一用 Python 标准库 zipfile 解包并校验。
set -euo pipefail

CACHE="$HOME/.cache/ms-playwright"
REV="$(node -e "console.log(require('/workspace/node_modules/playwright-core/browsers.json').browsers.find(b=>b.name==='chromium').revision)")"

extract() {
  local zip="$1" dest="$2"
  python3 - "$zip" "$dest" <<'PY'
import sys, zipfile
zip_path, dest = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(zip_path) as z:
    bad = z.testzip()
    if bad is not None:
        sys.exit(f"zip 损坏条目：{bad}")
    z.extractall(dest)
print(f"[extract] {zip_path} -> {dest}（{len(zipfile.ZipFile(zip_path).namelist())} 条目）")
PY
}

mkdir -p "$CACHE/chromium-$REV" "$CACHE/chromium_headless_shell-$REV"
extract "$CACHE/chromium.zip" "$CACHE/chromium-$REV"
extract "$CACHE/shell.zip" "$CACHE/chromium_headless_shell-$REV"

chmod +x "$CACHE/chromium-$REV/chrome-linux/chrome" 2>/dev/null || true
chmod +x "$CACHE/chromium_headless_shell-$REV/chrome-linux/headless_shell" 2>/dev/null || true

node -e "const pw=require('/workspace/node_modules/playwright-core'); console.log('expected chrome:', pw.chromium.executablePath())"
ls -la "$CACHE/chromium-$REV/chrome-linux/chrome"
ls -la "$CACHE/chromium_headless_shell-$REV/chrome-linux/headless_shell"
echo "[extract] 完成"
