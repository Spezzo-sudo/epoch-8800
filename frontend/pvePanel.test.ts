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
const { PvePanel } = require('./pvePanel');
const { EventBus } = require('../engine/eventBus');
Module._resolveFilename = original;
const scene = new PvePanel();
scene.add = {
  text: () => ({ setInteractive: () => ({ on(){} }), on(){} }),
  rectangle: () => ({}),
  container: () => ({ destroy(){} })
};
scene.create();
EventBus.emit('mission_complete', { missionId: 'mission_attack_alpha', result: 'success', rewards: { stronix:1, crysalis:1, voltaris:1, pyronis:1, xp:0 }});
if (!(scene).resultModal) throw new Error('Result modal not shown');
console.log('pvePanel tests passed');
