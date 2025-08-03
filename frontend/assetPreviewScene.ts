import Phaser from 'phaser';
import prompts from '../assets/prompts.json';

export default class AssetPreviewScene extends Phaser.Scene {
  constructor() {
    super('AssetPreview');
  }

  preload() {
    const dirMap: Record<string, string> = {
      sprite: 'assets/sprites/units',
      icon: 'assets/icons/ui',
      tile: 'assets/tiles',
      animation: 'assets/animations'
    };
    prompts.forEach(p => {
      const folder = dirMap[p.type] || 'assets';
      this.load.image(p.id, `${folder}/${p.id}.png`);
    });
  }

  create() {
    const cols = 8;
    const size = 70;
    prompts.forEach((p, i) => {
      const x = (i % cols) * size + 40;
      const y = Math.floor(i / cols) * size + 40;
      this.add.image(x, y, p.id).setOrigin(0);
      this.add.text(x, y + 50, p.id, { fontSize: '8px' });
    });
  }
}
