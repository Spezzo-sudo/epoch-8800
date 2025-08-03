#!/usr/bin/env ts-node
export {};
import { AlliancePanel } from './alliancePanel';
import Phaser from 'phaser';
import { FactionColors } from './designTokens';

const game = new Phaser.Game({ type: Phaser.HEADLESS, width: 800, height: 600, scene: [AlliancePanel] });
setTimeout(()=>{
  const scene = game.scene.keys['AlliancePanel'] as AlliancePanel;
  const text = scene.children.list[0] as Phaser.GameObjects.Text;
  if(text.style.color !== FactionColors.Aetherion){
    console.error('color mismatch'); process.exit(1);
  }
  game.destroy(true);
  console.log('✔ alliance panel color test passed');
}, 100);
