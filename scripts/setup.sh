#!/usr/bin/env bash
set -euo pipefail

echo "⟳ Cleaning workspace…"
rm -rf dist/

echo "⟳ Installing dependencies…"
npm ci

echo "⟳ Building project…"
npm run build

echo "⟳ Running tests…"
npm test

echo "✅ setup.sh complete"
