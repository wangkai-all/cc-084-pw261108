#!/usr/bin/env bash
# 无 root 环境下为 Playwright Chromium 补齐系统共享库。
# 依赖 deb 包已由会话内 apt-get download + dpkg-deb -x 解包到本地前缀，
# 不写入任何系统目录；本脚本只导出运行期环境变量。
# 用法：source tools/chrome-env.sh
CHROME_DEPS_ROOT="${CHROME_DEPS_ROOT:-/tmp/chromedeps/root}"
MULTIARCH="x86_64-linux-gnu"

# 动态链接器搜索路径：本地前缀的多架构库目录 + 常规系统目录
export LD_LIBRARY_PATH="${CHROME_DEPS_ROOT}/usr/lib/${MULTIARCH}:${CHROME_DEPS_ROOT}/lib/${MULTIARCH}:${LD_LIBRARY_PATH:-}"

# 字体配置：fontconfig 需要可读的配置与缓存目录
export FONTCONFIG_PATH="${CHROME_DEPS_ROOT}/etc/fonts"
export FONTCONFIG_FILE="${CHROME_DEPS_ROOT}/etc/fonts/fonts.conf"
export XDG_DATA_HOME="${CHROME_DEPS_ROOT}/usr/share"
export XDG_CACHE_HOME="${CHROME_DEPS_ROOT}/cache"
mkdir -p "$XDG_CACHE_HOME/fontconfig" 2>/dev/null || true

# 锁定 Playwright 浏览器缓存位置，避免被上面的 XDG_CACHE_HOME 带偏
export PLAYWRIGHT_BROWSERS_PATH="${HOME}/.cache/ms-playwright"

# 极简容器内 user namespace 可能受限，headless 启动需要禁用沙箱
export QT_QPA_PLATFORM=offscreen
export PLAYWRIGHT_CHROMIUM_ARGS="--no-sandbox --disable-dev-shm-usage --disable-gpu"

echo "[chrome-env] LD_LIBRARY_PATH=$LD_LIBRARY_PATH"
