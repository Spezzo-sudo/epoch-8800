/** Frontend Cluster - Economy Upgrade UI */
import Phaser from 'phaser';
import { mockPlayer, PlayerData } from './mockPlayerData';
import economy from '../schemas/economy.json';
import { applyUpgrade } from '../engine/economyUpgrades';
import { logEvent } from '../engine/balancingLog';

export class UpgradePanel extends Phaser.Scene {
  private player: PlayerData = mockPlayer;

  constructor() {
    super('UpgradePanel');
  }

  create() {
    this.add.text(10, 10, 'Economy Upgrades', { color: '#fff', fontSize: '18px' });
    let y = 40;
    for (const up of (economy as any).upgrades) {
      const text = this.add.text(10, y, `${up.name} (${up.costs.stronix}S)`, { color: '#fff', backgroundColor: '#222', padding: { left: 4, right: 4 } }).setInteractive({ useHandCursor: true });
      text.on('pointerup', () => {
        applyUpgrade(this.player as any, up.id);
        logEvent({
          event: 'resource_change',
          playerId: this.player.id,
          faction: this.player.faction,
          resourceType: 'stronix',
          amount: -up.costs.stronix,
          newTotal: this.player.resources.stronix,
          reason: 'upgrade_cost',
          timestamp: ''
        });
      });
      y += 30;
    }
  }
}
