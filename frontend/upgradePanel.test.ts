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
const { UpgradePanel } = require('./upgradePanel');
Module._resolveFilename = original;
const scene = new UpgradePanel();
if (!scene) throw new Error('Scene not created');
console.log('upgradePanel tests passed');
