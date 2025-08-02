#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const promptsPath = path.resolve(__dirname, '../assets/prompts.json');
if (!fs.existsSync(promptsPath)) {
  console.error('prompts.json not found');
  process.exit(1);
}
const prompts = JSON.parse(fs.readFileSync(promptsPath, 'utf8'));

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const crcTable = (() => {
  const table = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function placeholderPng(width, height) {
  const header = Buffer.from('89504E470D0A1A0A0000000D49484452', 'hex');
  const IHDR = Buffer.alloc(13);
  IHDR.writeUInt32BE(width, 0);
  IHDR.writeUInt32BE(height, 4);
  IHDR.writeUInt8(8, 8); // bit depth
  IHDR.writeUInt8(6, 9); // color type RGBA
  IHDR.writeUInt8(0, 10); // compression
  IHDR.writeUInt8(0, 11); // filter
  IHDR.writeUInt8(0, 12); // interlace
  const IHDRChunk = createChunk('IHDR', IHDR);
  const IDATChunk = createChunk('IDAT', Buffer.from([]));
  const IENDChunk = createChunk('IEND', Buffer.from([]));
  return Buffer.concat([header, IHDRChunk, IDATChunk, IENDChunk]);
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

for (const item of prompts) {
  const [w, h] = item.size.split('x').map(Number);
  const dirMap = {
    sprite: 'assets/sprites/units',
    icon: 'assets/icons/ui',
    tile: 'assets/tiles',
    animation: 'assets/animations'
  };
  const folder = dirMap[item.type] || 'assets';
  ensureDir(folder);
  const outFile = path.join(folder, `${item.id}.png`);
  fs.writeFileSync(outFile, placeholderPng(w, h));
  console.log('Generated', outFile);
}
