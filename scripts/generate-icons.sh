#!/usr/bin/env bash
# Regenerates iOS/PWA icon variants from the source mawh PNG.
# Idempotent — run any time the source changes. Output is committed.
set -euo pipefail

SRC="public/assets/yawningmawoftruth.png"
OUT="public/assets/icons-app"

if [[ ! -f "$SRC" ]]; then
  echo "missing source: $SRC" >&2
  exit 1
fi

mkdir -p "$OUT"

gen() {
  local size="$1" name="$2"
  sips -z "$size" "$size" "$SRC" --out "$OUT/$name" >/dev/null
}

gen 180 apple-touch-icon-180.png
gen 192 icon-192.png
gen 512 icon-512.png
gen 32  favicon-32.png
gen 16  favicon-16.png

echo "Wrote:"
ls -1 "$OUT"
