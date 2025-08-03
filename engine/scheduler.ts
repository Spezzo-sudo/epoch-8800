import { queueSystem } from './queueSystem';
import { EventBus } from './eventBus';

export function tickScheduler(playerId: string): void {
  const finished = queueSystem.processQueue(playerId, Date.now());
  finished.forEach(task => EventBus.emit('task_complete', { taskId: task.taskId }));
}

export function subscribeToEvents(playerId: string): void {
  if (typeof (globalThis as any).EventSource !== 'undefined') {
    try {
      const es = new (globalThis as any).EventSource('/events');
      es.onmessage = (ev: MessageEvent) => {
        try {
          const data = JSON.parse(ev.data);
          EventBus.emit('task_complete', data);
        } catch {}
      };
      es.onerror = () => {
        es.close();
        setInterval(() => tickScheduler(playerId), 15000);
      };
      return;
    } catch {
      // fall through to polling
    }
  }
  setInterval(() => tickScheduler(playerId), 15000);
}
