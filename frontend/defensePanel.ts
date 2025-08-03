/** Frontend Cluster - Defense Panel UI */
import Phaser from 'phaser';
import { mockPlayer } from './mockPlayerData';
import { Defenses, DefenseStructure, buildDefense } from '../engine/defenseLogic';
import { logEvent } from '../engine/balancingLog';

export class DefensePanel extends Phaser.Scene {
  constructor() {
    super('DefensePanel');
  }

  create() {
    this.add.text(10, 10, 'Defenses', { fontSize: '18px', color: '#ffffff' });
    let y = 40;
    for (const def of Object.values(Defenses)) {
      const canBuild = this.requirementsMet(def);
      const textColor = canBuild ? '#ffffff' : '#888888';
      this.add.text(10, y, `${def.name} (E${def.energyCost})`, { color: textColor, fontSize: '14px' });
      const btn = this.add.text(250, y, 'Build', {
        fontSize: '14px',
        backgroundColor: '#222',
        color: '#fff',
        padding: { left: 4, right: 4, top: 2, bottom: 2 }
      }).setInteractive({ useHandCursor: true });
      btn.on('pointerup', () => this.handleBuild(def));
      if (!canBuild) btn.setAlpha(0.5).disableInteractive();
      y += 30;
    }
  }

  private requirementsMet(def: DefenseStructure): boolean {
    for (const [b, lvl] of Object.entries(def.requires_buildings)) {
      if ((mockPlayer.buildings[b]?.level || 0) < lvl) return false;
    }
    return mockPlayer.resources.voltaris >= def.energyCost;
  }

  private handleBuild(def: DefenseStructure) {
    const ctx = {
      buildings: Object.fromEntries(Object.entries(mockPlayer.buildings).map(([k,v]) => [k, v.level])),
      faction: mockPlayer.faction,
      voltaris: mockPlayer.resources.voltaris,
      research: mockPlayer.research.completed
    };
    const success = buildDefense(def.id, ctx, mockPlayer.research);
    if (success) {
      mockPlayer.resources.voltaris -= def.energyCost;
    }
    logEvent({
      event: 'resource_change',
      playerId: mockPlayer.id,
      faction: mockPlayer.faction,
      resourceType: 'voltaris',
      amount: -def.energyCost,
      newTotal: mockPlayer.resources.voltaris,
      reason: 'defense_build',
      timestamp: ''
    });
  }
}
