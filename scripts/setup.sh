#!/usr/bin/env bash
# Cluster: Support & Infrastructure
set -euo pipefail

echo "🔄 Cleaning install"
rm -rf node_modules dist
npm ci

echo "🔨 Building project"
npm run build

echo "✅ Running tests"
npm test

echo "🎉 Setup complete"
