/** Frontend Cluster - Building Panel UI */
import Phaser from 'phaser';
import { ResourceState } from '../engine/types/tickTypes';
import { mockPlayer, PlayerBuilding, PlayerData } from './mockPlayerData';
import { FactionColors } from './designTokens';
import { logEvent } from '../engine/balancingLog';

export class BuildingPanel extends Phaser.Scene {
  private player: PlayerData = mockPlayer;
  private resourceText?: Phaser.GameObjects.Text;
  private buildingTexts: Record<string, Phaser.GameObjects.Text> = {};
  private upgradeButtons: Record<string, Phaser.GameObjects.Text> = {};

  constructor() {
    super('BuildingPanel');
  }

  create() {
    const factionColor = FactionColors[this.player.faction];
    this.add.text(10, 10, 'Buildings', { fontSize: '18px', color: '#ffffff', stroke: factionColor, strokeThickness: 2 });
    this.resourceText = this.add.text(10, 30, this.formatResources(), { fontSize: '14px', color: '#ffffff' });

    const buildings = this.player.buildings;

    let y = 60;
    for (const [id, b] of Object.entries(buildings)) {
      const active = this.hasEnergy(b);
      this.buildingTexts[id] = this.add.text(10, y, this.formatBuilding(b), {
        fontSize: '14px',
        color: active ? '#ffffff' : '#ff0000'
      });
      const btn = this.add.text(300, y, 'Upgrade', {
        fontSize: '14px',
        backgroundColor: '#222',
        color: '#fff',
        padding: { left: 4, right: 4, top: 2, bottom: 2 }
      }).setInteractive({ useHandCursor: true });
      btn.on('pointerup', () => this.handleUpgrade(id));
      this.upgradeButtons[id] = btn;
      this.updateButtonState(id);
      y += 30;
    }
  }

  private handleUpgrade(id: string) {
    const b = this.player.buildings[id];
    const cost = this.getUpgradeCost(b.level + 1);
    if (!this.canAfford(cost)) {
      this.add.text(10, 200, 'Not enough resources!', { fontSize: '14px', color: '#ff0000' });
      return;
    }
    this.spendResources(cost);
    b.level += 1;
    if (this.resourceText) this.resourceText.setText(this.formatResources());
    const active = this.hasEnergy(b);
    const textObj = this.buildingTexts[id];
    textObj.setText(this.formatBuilding(b));
    textObj.setColor(active ? '#ffffff' : '#ff0000');
    for (const key of Object.keys(this.player.buildings)) {
      this.updateButtonState(key);
    }
  }

  private getUpgradeCost(level: number): ResourceState {
    return {
      stronix: level * 1000,
      crysalis: level * 500,
      pyronis: level * 200,
      voltaris: 0
    };
  }

  private canAfford(cost: ResourceState): boolean {
    const res = this.player.resources;
    return res.stronix >= cost.stronix &&
      res.crysalis >= cost.crysalis &&
      res.pyronis >= cost.pyronis;
  }

  private spendResources(cost: ResourceState): void {
    const res = this.player.resources;
    res.stronix -= cost.stronix;
    logEvent({
      event: 'resource_change',
      playerId: this.player.id,
      faction: this.player.faction,
      resourceType: 'stronix',
      amount: -cost.stronix,
      newTotal: res.stronix,
      reason: 'upgrade_cost',
      timestamp: ''
    });
    res.crysalis -= cost.crysalis;
    logEvent({
      event: 'resource_change',
      playerId: this.player.id,
      faction: this.player.faction,
      resourceType: 'crysalis',
      amount: -cost.crysalis,
      newTotal: res.crysalis,
      reason: 'upgrade_cost',
      timestamp: ''
    });
    res.pyronis -= cost.pyronis;
    logEvent({
      event: 'resource_change',
      playerId: this.player.id,
      faction: this.player.faction,
      resourceType: 'pyronis',
      amount: -cost.pyronis,
      newTotal: res.pyronis,
      reason: 'upgrade_cost',
      timestamp: ''
    });
  }

  private updateButtonState(id: string) {
    const b = this.player.buildings[id];
    const cost = this.getUpgradeCost(b.level + 1);
    const button = this.upgradeButtons[id];
    if (!button) return;
    if (this.canAfford(cost)) {
      button.setAlpha(1).setInteractive({ useHandCursor: true });
    } else {
      button.setAlpha(0.5).disableInteractive();
    }
  }

  private formatBuilding(b: PlayerBuilding): string {
    const prod = {
      stronix: b.baseProduction.stronix * b.level,
      crysalis: b.baseProduction.crysalis * b.level,
      pyronis: b.baseProduction.pyronis * b.level,
      voltaris: b.baseProduction.voltaris * b.level
    };
    const required = (b.energyRequired || 0) * b.level;
    const current = this.player.resources.voltaris;
    const active = current >= required;
    const icon = active ? '✅' : '❌';
    const energyText = required > 0 ? `${current}/${required}E` : '0/0E';
    return `${icon} ${b.name} L${b.level} - ${energyText} +${prod.stronix}S +${prod.crysalis}C +${prod.pyronis}P +${prod.voltaris}V`;
  }

  private hasEnergy(b: PlayerBuilding): boolean {
    const required = (b.energyRequired || 0) * b.level;
    return this.player.resources.voltaris >= required;
  }

  private formatResources(): string {
    const { stronix, crysalis, pyronis, voltaris } = this.player.resources;
    return `Stronix: ${stronix}  Crysalis: ${crysalis}  Pyronis: ${pyronis}  Voltaris: ${voltaris}`;
  }
}

