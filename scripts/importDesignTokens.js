#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const tokensPath = path.resolve(__dirname, '../assets/style_tokens.json');
const outPath = path.resolve(__dirname, '../frontend/designTokens.ts');

if (!fs.existsSync(tokensPath)) {
  console.error('style_tokens.json not found');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

const lines = [];
lines.push('export const colors = ' + JSON.stringify(data.colors, null, 2) + ' as const;');
lines.push('export const spacing = ' + JSON.stringify(data.spacing, null, 2) + ' as const;');
lines.push('export const fontSizes = ' + JSON.stringify(data.fontSizes, null, 2) + ' as const;');
fs.writeFileSync(outPath, lines.join('\n') + '\n');
console.log('Design tokens written to', outPath);
