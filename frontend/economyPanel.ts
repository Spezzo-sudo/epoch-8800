/** Frontend Cluster - Economy Panel UI */
import Phaser from 'phaser';
import { mockPlayer, PlayerData } from './mockPlayerData';
import { transferResources } from '../engine/economySystem';

export class EconomyPanel extends Phaser.Scene {
  private player: PlayerData = mockPlayer;
  private resourceText?: Phaser.GameObjects.Text;

  constructor() {
    super('EconomyPanel');
  }

  create() {
    this.add.text(10, 10, 'Economy', { color: '#fff', fontSize: '18px' });
    this.resourceText = this.add.text(10, 30, this.formatResources(), { color: '#fff', fontSize: '14px' });
    const btn = this.add.text(10, 60, 'Send 10 Stronix to Ally', { backgroundColor: '#333', color: '#fff', padding: { left: 4, right: 4 } }).setInteractive({ useHandCursor: true });
    btn.on('pointerup', () => {
      transferResources(this.player, this.player, { stronix: 10, crysalis: 0, pyronis: 0, voltaris: 0 });
      this.updateDisplay();
    });
  }

  private updateDisplay() {
    if (this.resourceText) this.resourceText.setText(this.formatResources());
  }

  private formatResources(): string {
    const r = this.player.resources;
    return `Stronix: ${r.stronix}  Crysalis: ${r.crysalis}  Pyronis: ${r.pyronis}  Voltaris: ${r.voltaris}`;
  }
}
