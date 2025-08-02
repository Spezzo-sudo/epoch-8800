#!/usr/bin/env node
// Build script using global tsc binary to avoid local TypeScript dependency
const { spawnSync } = require('child_process');

const result = spawnSync('tsc', ['--project', 'tsconfig.json', '--noEmitOnError', 'false'], {
  stdio: 'inherit',
});

if (result.status !== 0) {
  console.warn('TypeScript reported errors; output emitted for testing.');
} else {
  console.log('Build succeeded.');
}
