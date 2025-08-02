#!/usr/bin/env node
// Compile tests with the global tsc and run the resulting JS files
const { spawnSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const outDir = path.join(os.tmpdir(), 'epoch-tests');
fs.rmSync(outDir, { recursive: true, force: true });

// ensure phaser runtime stub is available for compiled tests
const phaserStubSrc = path.join(__dirname, '../phaser-runtime.js');
const phaserStubDest = path.join(path.dirname(outDir), 'phaser-runtime.js');
fs.copyFileSync(phaserStubSrc, phaserStubDest);

const compile = spawnSync('tsc', ['--project', 'tsconfig.json', '--outDir', outDir, '--noEmitOnError', 'false'], {
  stdio: 'inherit',
});
if (compile.status !== 0) {
  console.error('TypeScript compilation failed');
}

function collectTests(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) files.push(...collectTests(full));
    else if (ent.name.endsWith('.test.js')) files.push(full);
  }
  return files;
}

const tests = collectTests(outDir);
let failures = 0;
for (const file of tests) {
  try {
    require(file);
    console.log(`\u2714 ${file}`);
  } catch (err) {
    console.error(`\u2716 ${file}`);
    console.error(err);
    failures++;
  }
}

if (failures > 0) process.exit(1);
console.log('All tests passed.');
