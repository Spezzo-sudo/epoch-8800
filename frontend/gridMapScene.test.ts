#!/usr/bin/env ts-node
export {}
declare const require: any;
const Module = require('module');
const path = require('path');
declare const __dirname: string;
const original = Module._resolveFilename;
Module._resolveFilename = function(request: string, parent: any, isMain: boolean, options: any) {
  if (request === 'phaser') {
    return path.join(__dirname, '../../phaser-runtime.js');
  }
  return original.call(this, request, parent, isMain, options);
};
const { GridMapScene } = require('./gridMapScene');
Module._resolveFilename = original;
const { emit, on } = require('../engine/gridMap');

let triggered = false;
on('tileHover', () => { triggered = true; });
emit('tileHover', { id: 'x', q:0, r:0, type:'plain' });
if (!triggered) throw new Error('Event emitter failed');

const scene = new GridMapScene();
if (typeof (scene as any).axialToPixelX !== 'function') {
  throw new Error('Scene method missing');
}
console.log('gridMapScene tests passed');
