#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const prompts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/prompts.json'), 'utf8'));

function readPngSize(file) {
  const buf = fs.readFileSync(file);
  if (buf.toString('ascii', 12, 16) !== 'IHDR') {
    throw new Error('Invalid PNG');
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}
let failures = 0;

for (const item of prompts) {
  const [w, h] = item.size.split('x').map(Number);
  const dirMap = {
    sprite: 'assets/sprites/units',
    icon: 'assets/icons/ui',
    tile: 'assets/tiles',
    animation: 'assets/animations'
  };
  const folder = dirMap[item.type] || 'assets';
  const file = path.resolve(folder, `${item.id}.png`);
  if (!fs.existsSync(file)) {
    console.error('Missing asset', file);
    failures++;
    continue;
  }
  try {
    const info = readPngSize(file);
    if (info.width !== w || info.height !== h) {
      console.error(`Size mismatch for ${file}: ${info.width}x${info.height} != ${w}x${h}`);
      failures++;
    }
  } catch (err) {
    console.error('Failed to inspect', file, err);
    failures++;
  }
}
if (failures > 0) {
  console.error(`${failures} asset problems detected`);
  process.exit(1);
} else {
  console.log('All assets valid');
}
