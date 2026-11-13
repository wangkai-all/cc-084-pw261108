#!/usr/bin/env bash
# 带退避重试的 Chromium 下载（CDN 偶发 SSL 抖动）
set -u
cd "$HOME/.cache/ms-playwright" || exit 1
URL_CHROMIUM="https://cdn.playwright.dev/dbazure/download/playwright/builds/chromium/1194/chromium-linux.zip"
URL_SHELL="https://cdn.playwright.dev/dbazure/download/playwright/builds/chromium/1194/chromium-headless-shell-linux.zip"

fetch() {
  local url="$1" out="$2" n=1
  while [ "$n" -le 12 ]; do
    echo "[$(date +%T)] attempt $n -> $out"
    if curl -fSL --retry 3 --retry-all-errors --connect-timeout 20 -C - -o "$out" "$url"; then
      if python3 -c "import sys,zipfile; zipfile.ZipFile(sys.argv[1]).testzip() is None or sys.exit(1)" "$out" 2>/dev/null; then
        echo "[$(date +%T)] $out VALID"
        return 0
      fi
      echo "[$(date +%T)] $out corrupt, restarting"
      rm -f "$out"
    fi
    n=$((n + 1))
    sleep $((n * 5))
  done
  echo "[$(date +%T)] FAILED $out"
  exit 1
}
fetch "$URL_CHROMIUM" chromium.zip
fetch "$URL_SHELL" shell.zip
echo ALL_DONE
