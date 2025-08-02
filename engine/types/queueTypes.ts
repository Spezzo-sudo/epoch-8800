/** Backend Cluster - Queue contracts */

export interface BuildTask {
  taskId: string;
  taskCategory: 'building' | 'research' | 'defense' | 'unit';
  targetId: string;
  startTime: number;
  duration: number;
}

export interface PlayerQueue {
  playerId: string;
  buildQueue: BuildTask[];
}
