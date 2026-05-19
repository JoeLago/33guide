#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="${1:-public/assets/gifs}"
DST_DIR="${2:-public/assets/videos}"

mkdir -p "$DST_DIR"

for gif in "$SRC_DIR"/*.gif; do
  base="$(basename "$gif" .gif)"
  mp4="$DST_DIR/${base}.mp4"
  echo "Converting: $gif -> $mp4"
  ffmpeg -y -i "$gif" \
    -c:v libx264 -crf 23 -preset slow \
    -pix_fmt yuv420p -movflags +faststart \
    -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" \
    -an "$mp4"
done

echo "Done. Size comparison:"
du -sh "$SRC_DIR" "$DST_DIR"
