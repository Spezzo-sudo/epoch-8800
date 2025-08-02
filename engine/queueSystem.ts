import { PlayerQueue, BuildTask } from './types/queueTypes';

/** Backend Cluster - Queue system for construction and production */
export class QueueSystem {
  private queues: Record<string, PlayerQueue> = {};

  getQueue(playerId: string): PlayerQueue {
    if (!this.queues[playerId]) {
      this.queues[playerId] = { playerId, buildQueue: [] };
    }
    return this.queues[playerId];
  }

  enqueueTask(playerId: string, task: BuildTask): boolean {
    const queue = this.getQueue(playerId);
    if (task.taskCategory === 'building' || task.taskCategory === 'research') {
      const count = queue.buildQueue.filter(
        t => t.taskCategory === task.taskCategory
      ).length;
      if (count >= 2) return false;
    }
    queue.buildQueue.push(task);
    return true;
  }

  dequeueTask(playerId: string): BuildTask | undefined {
    const queue = this.getQueue(playerId);
    return queue.buildQueue.shift();
  }

  peekQueue(playerId: string): BuildTask[] {
    return this.getQueue(playerId).buildQueue;
  }

  processQueue(playerId: string, now: number): BuildTask[] {
    const queue = this.getQueue(playerId);
    const finished: BuildTask[] = [];
    queue.buildQueue = queue.buildQueue.filter(task => {
      if (now >= task.startTime + task.duration) {
        finished.push(task);
        return false;
      }
      return true;
    });
    return finished;
  }
}

export const queueSystem = new QueueSystem();
