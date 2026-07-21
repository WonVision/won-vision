#!/usr/bin/env bash
# Push public/video/*.mp4 to the Vercel Blob store. Videos are NOT in git —
# they're served via the /video/:file redirect in next.config.ts.
#
#   vercel env pull .env.blob --environment=development   # once, for the token
#   npm run blob:push                                     # after adding a video
#
# Safe to re-run: --allow-overwrite makes it idempotent.
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env.blob ] && set -a && . ./.env.blob && set +a
: "${BLOB_READ_WRITE_TOKEN:?run: vercel env pull .env.blob --environment=development}"

for f in public/video/*.mp4; do
  echo "--> $(basename "$f")"
  vercel blob put "$f" \
    --pathname "video/$(basename "$f")" \
    --access public \
    --allow-overwrite \
    --rw-token "$BLOB_READ_WRITE_TOKEN" 2>&1 | grep -E 'Success|Error'
done
