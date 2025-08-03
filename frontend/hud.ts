/** Frontend Cluster - HUD */
import Phaser from 'phaser';
import { ResourceState } from '../engine/types/tickTypes';
import { BuildingPanel } from './buildingPanel';
import { ResearchPanel } from './researchPanel';
import { GridMapScene } from './gridMapScene';
import { PvePanel } from './pvePanel';
import { mockPlayer } from './mockPlayerData';
import { FactionColors } from './designTokens';
import { registerToastScene, showToast } from './toastService';
import { EventBus } from '../engine/eventBus';

export class ResourceHUD extends Phaser.Scene {
  private resourceText?: Phaser.GameObjects.Text;
  resources: ResourceState = mockPlayer.resources;

  private buttons: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('ResourceHUD');
  }

  create() {
    const factionColor = FactionColors[mockPlayer.faction];
    this.resourceText = this.add.text(10, 10, this.formatResources(), {
      fontSize: '16px',
      color: '#ffffff',
      stroke: factionColor,
      strokeThickness: 2
    });
    registerToastScene(this);
    EventBus.on('task_complete', p => showToast('Task completed: ' + p.taskId));
    EventBus.on('research_complete' as any, p => showToast('Research done: ' + p.nodeId));
    this.time.addEvent({ delay: 15000, loop: true, callback: this.updateTick, callbackScope: this });

    // create menu buttons
    this.createButton(10, 40, 'Buildings', () => {
      if (this.scene.isActive('BuildingPanel')) {
        this.scene.stop('BuildingPanel');
      } else {
        this.scene.launch('BuildingPanel');
      }
    });
    this.createButton(110, 40, 'Research', () => {
      if (this.scene.isActive('ResearchPanel')) {
        this.scene.stop('ResearchPanel');
      } else {
        this.scene.launch('ResearchPanel');
      }
    });
    this.createButton(210, 40, 'Map', () => {
      if (this.scene.isActive('GridMap')) {
        this.scene.stop('GridMap');
      } else {
        this.scene.launch('GridMap');
      }
    });
    this.createButton(280, 40, 'PvE', () => {
      if (this.scene.isActive('PvePanel')) {
        this.scene.stop('PvePanel');
      } else {
        this.scene.launch('PvePanel');
      }
    });
    this.createButton(330, 40, 'Queue', () => {
      if (this.scene.isActive('QueuePanel')) {
        this.scene.stop('QueuePanel');
      } else {
        this.scene.launch('QueuePanel');
      }
    });
    this.createButton(400, 40, 'Preview', () => {
      if (this.scene.isActive('AssetPreview')) {
        this.scene.stop('AssetPreview');
      } else {
        this.scene.launch('AssetPreview');
      }
    });
    this.createButton(480, 40, 'Analytics', () => {
      if (this.scene.isActive('BalancingDashboard')) {
        this.scene.stop('BalancingDashboard');
      } else {
        this.scene.launch('BalancingDashboard');
      }
    });
  }

  updateTick() {
    if (this.resourceText) {
      this.resourceText.setText(this.formatResources());
    }
  }

  private createButton(x: number, y: number, label: string, cb: () => void): void {
    const btn = this.add.text(x, y, label, {
      fontSize: '14px',
      backgroundColor: '#222',
      color: '#fff',
      padding: { left: 4, right: 4, top: 2, bottom: 2 }
    }).setInteractive({ useHandCursor: true });
    btn.on('pointerup', cb);
    this.buttons.push(btn);
  }

  private formatResources(): string {
    const { stronix, crysalis, pyronis, voltaris } = this.resources;
    return `Stronix: ${stronix}  Crysalis: ${crysalis}  Pyronis: ${pyronis}  Voltaris: ${voltaris}`;
  }
}
