#!/usr/bin/env ts-node
export {};
import { GridMapScene } from './gridMapScene';
import Phaser from 'phaser';
import { createAlliance } from '../engine/allianceSystem';

createAlliance('Overlay','OV','#123456','U1');
const game = new Phaser.Game({ type: Phaser.HEADLESS, width: 800, height: 600, scene: [GridMapScene] });
setTimeout(()=>{ game.destroy(true); console.log('✔ grid map overlay'); }, 100);
