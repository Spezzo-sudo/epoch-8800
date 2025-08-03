import Phaser from 'phaser';
import { queueSystem } from '../engine/queueSystem';
import { BuildTask } from '../engine/types/queueTypes';

export class QueuePanel extends Phaser.Scene {
  constructor() {
    super('QueuePanel');
  }

  private listGroup!: Phaser.GameObjects.Container;

  create() {
    const addBtn = (
      x: number,
      y: number,
      label: string,
      taskFactory: () => BuildTask,
      limitCategory?: 'building' | 'research'
    ) => {
      const btn = this.add.text(x, y, label, { backgroundColor: '#333', color: '#fff' }).setInteractive();
      btn.on('pointerdown', () => {
        const task = taskFactory();
        const success = queueSystem.enqueueTask('player1', task);
        if (!success) {
          btn.setTint(0xff0000);
        }
        this.renderQueue();
        updateState();
      });
      const updateState = () => {
        if (limitCategory) {
          const count = queueSystem.peekQueue('player1').filter(q => q.taskCategory === limitCategory).length;
          btn.setAlpha(count >= 2 ? 0.5 : 1);
          (btn as any).disabled = count >= 2;
        }
      };
      updateState();
      return btn;
    };

    addBtn(10, 10, 'Add Building', () => ({
      taskId: 'b' + Date.now(),
      taskCategory: 'building',
      targetId: 'hq',
      startTime: Date.now(),
      duration: 1000
    }), 'building');

    addBtn(10, 30, 'Add Research', () => ({
      taskId: 'r' + Date.now(),
      taskCategory: 'research',
      targetId: 'tech',
      startTime: Date.now(),
      duration: 1000
    }), 'research');

    addBtn(10, 50, 'Add Defense', () => ({
      taskId: 'd' + Date.now(),
      taskCategory: 'defense',
      targetId: 'turret',
      startTime: Date.now(),
      duration: 1000
    }));

    addBtn(10, 70, 'Add Unit', () => ({
      taskId: 'u' + Date.now(),
      taskCategory: 'unit',
      targetId: 'fighter',
      startTime: Date.now(),
      duration: 1000
    }));

    this.listGroup = this.add.container();
    this.renderQueue();
  }

  renderQueue() {
    this.listGroup.destroy();
    this.listGroup = this.add.container();
    const tasks = queueSystem.peekQueue('player1');
    tasks.forEach((t, i) => {
      const txt = this.add.text(200, 120 + 20 * i, `${t.taskCategory} -> ${t.targetId}`);
      this.listGroup.add(txt);
    });
  }
}
