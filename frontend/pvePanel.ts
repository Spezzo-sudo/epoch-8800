/** Frontend Cluster - PvE Panel */
import Phaser from 'phaser';
import missionsData from '../schemas/pve_missions.json';
import { EventBus } from '../engine/eventBus';

interface MissionEntry {
  id: string; name: string; description: string;
}

export class PvePanel extends Phaser.Scene {
  private list?: Phaser.GameObjects.Text;
  resultModal?: Phaser.GameObjects.Container;

  constructor() {
    super('PvePanel');
  }

  preload(): void {}

  create(): void {
    const entries = Object.values(missionsData as Record<string, MissionEntry>);
    let y = 20;
    entries.forEach(m => {
      const txt = this.add.text(20, y, `${m.name}: ${m.description}`);
      const btn = this.add.text(300, y, 'Start').setInteractive();
      btn.on('pointerdown', () => {
        console.log('start', m.id);
      });
      y += 20;
    });

    EventBus.on('mission_complete', ({ missionId, result, rewards }) => {
      this.showResultModal(missionId, result, rewards);
    });
  }

  private showResultModal(missionId: string, result: string, rewards: any): void {
    if (this.resultModal) this.resultModal.destroy();
    const story = (missionsData as any)[missionId].story || [];
    const storyText = story.filter((s: any) => s.trigger === 'missionComplete').map((s: any) => s.text).join('\n');
    const bg = this.add.rectangle(200, 150, 300, 200, 0x000000, 0.7);
    const text = this.add.text(60, 100, `Mission ${result}\n${storyText}\nRewards:\n` +
      `S:${rewards.stronix} C:${rewards.crysalis} V:${rewards.voltaris} P:${rewards.pyronis}`);
    const btn = this.add.text(200, 220, 'Back to Map').setInteractive();
    btn.on('pointerdown', () => {
      this.resultModal?.destroy();
      this.resultModal = undefined;
    });
    this.resultModal = this.add.container(0, 0, [bg, text, btn]);
  }
}
