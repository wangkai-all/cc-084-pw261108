#!/usr/bin/env bash
# 无 root 环境下，把 Chromium 运行所需的 Debian 包下载并解包到用户目录。
# 不使用 sudo、不写 /usr；配合 tools/chrome-env.sh 的 LD_LIBRARY_PATH 使用。
# 仅在 Debian/Utdown 系且 apt 可用的环境有效；常规开发机直接用
# `npx playwright install --with-deps chromium` 即可，无需本脚本。
set -euo pipefail

PREFIX="${CHROME_DEPS_ROOT:-/tmp/chromedeps}"
DEBS="$PREFIX/debs"
ROOT="$PREFIX/root"
mkdir -p "$DEBS" "$ROOT"
APT_LISTS="$PREFIX/apt-lists"
APT_CACHE="$PREFIX/apt-cache"
mkdir -p "$APT_LISTS/partial" "$APT_CACHE/archives/partial"

APT_OPTS=(
  -o "Dir::State::Lists=$APT_LISTS"
  -o "Dir::Cache=$APT_CACHE"
  -o "Dir::State::status=/var/lib/dpkg/status"
)

echo "[deps] 更新用户态 apt 索引…"
apt-get update "${APT_OPTS[@]}" >/dev/null

PKGS=(
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2
  libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1
  libpango-1.0-0 libcairo2 libasound2 libatspi2.0-0 libx11-6 libxcb1 libxext6
  libfontconfig1 fonts-liberation fonts-wqy-microhei
)

# 已安装的包跳过，只下载缺失项
dpkg-query -W -f='${Package}\n' 2>/dev/null | sort -u > "$PREFIX/installed.txt" || true
apt-cache "${APT_OPTS[@]}" depends --recurse --no-recommends --no-suggests \
  --no-conflicts --no-breaks --no-replaces --no-enhances "${PKGS[@]}" \
  2>/dev/null | grep -E '^\w' | sort -u > "$PREFIX/all.txt"
comm -23 "$PREFIX/all.txt" "$PREFIX/installed.txt" > "$PREFIX/missing.txt"

echo "[deps] 待下载包数：$(wc -l < "$PREFIX/missing.txt")"
( cd "$DEBS" && xargs -a "$PREFIX/missing.txt" apt-get download "${APT_OPTS[@]}" )

for d in "$DEBS"/*.deb; do dpkg-deb -x "$d" "$ROOT"; done
echo "[deps] 解包完成：$ROOT"

# fontconfig 增加本地字体目录（已存在则不重复插入）
FC="$ROOT/etc/fonts/fonts.conf"
if [ -f "$FC" ] && ! grep -q "$ROOT/usr/share/fonts" "$FC"; then
  sed -i "\|<dir>/usr/share/fonts</dir>|a\\	<dir>$ROOT/usr/share/fonts</dir>" "$FC"
fi
echo "[deps] 下一步：source tools/chrome-env.sh"
