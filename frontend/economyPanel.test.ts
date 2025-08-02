#!/usr/bin/env ts-node
export {}
declare const __dirname: string;
const Module = require('module');
const path = require('path');
const original = Module._resolveFilename;
Module._resolveFilename = function(request: string, parent: any, isMain: boolean, options: any) {
  if (request === 'phaser') {
    return path.join(__dirname, '../../phaser-runtime.js');
  }
  return original.call(this, request, parent, isMain, options);
};
const { EconomyPanel } = require('./economyPanel');
Module._resolveFilename = original;
const scene = new EconomyPanel();
if (typeof scene.formatResources !== 'function') throw new Error('Method missing');
console.log('economyPanel tests passed');
