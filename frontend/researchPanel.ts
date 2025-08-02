/** Frontend Cluster - Research Panel UI */
import Phaser from 'phaser';
import { researchTree, canResearch, applyResearch, PlayerResearchState } from '../engine/researchSystem';
import { mockPlayer, PlayerData } from './mockPlayerData';

export class ResearchPanel extends Phaser.Scene {
  private player: PlayerData = mockPlayer;
  private research: PlayerResearchState = this.player.research;
  private nodes = Object.entries(researchTree);
  private nodeTexts: Record<string, Phaser.GameObjects.Text> = {};
  private buttons: Record<string, Phaser.GameObjects.Text> = {};

  constructor() {
    super('ResearchPanel');
  }

  create() {
    let y = 10;
    for (const [id, node] of this.nodes) {
      this.nodeTexts[id] = this.add.text(10, y, '', { fontSize: '14px', color: '#ffffff' });
      const btn = this.add.text(260, y, 'Unlock', {
        fontSize: '14px',
        backgroundColor: '#222',
        color: '#fff',
        padding: { left: 4, right: 4, top: 2, bottom: 2 }
      }).setInteractive({ useHandCursor: true });
      btn.on('pointerup', () => this.tryUnlock(id));
      this.buttons[id] = btn;
      y += 30;
    }
    this.refresh();
  }

  private ctx() {
    return {
      faction: this.player.faction,
      buildings: Object.fromEntries(Object.entries(this.player.buildings).map(([k,v]) => [k, v.level])),
      voltaris: this.player.resources.voltaris,
      research: this.research.completed
    } as const;
  }

  private tryUnlock(id: string) {
    if (applyResearch(id, this.ctx(), this.research)) {
      this.refresh();
    } else {
      this.add.text(10, 300, 'Unlock requirements not met', { fontSize: '14px', color: '#ff0000' });
    }
  }

  private refresh() {
    const ctx = this.ctx();
    for (const [id, node] of this.nodes) {
      const status = this.research.completed[id] ? '✅' : '❌';
      const text = `${status} ${node.name} (T${node.tier})`;
      this.nodeTexts[id].setText(text);
      if (canResearch(id, ctx)) {
        this.buttons[id].setAlpha(1).setInteractive({ useHandCursor: true });
      } else {
        this.buttons[id].setAlpha(0.5).disableInteractive();
      }
    }
  }
}
