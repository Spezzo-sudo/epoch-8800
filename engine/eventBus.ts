/** Game Engine Logic Cluster - Event Bus */

export type GameEventMap = {
  tick: void;
  resource_change: { playerId: string };
  research_unlock: { nodeId: string; playerId: string };
  combat_resolution: { result: string };
  defense_constructed: { structureId: string; playerId: string };
  combat_request: { attacker: string; defender: string };
  defense_build: { structureId: string };
  mission_start: { missionId: string };
  spawn_unit: { enemies: any; wave: number };
  mission_complete: { missionId: string; result: string; rewards: any };
  task_complete: { taskId: string };
  alliance_updated: { allianceId: string };
  forum_posted: { allianceId: string; postId: string };
  espionage_reported: { allianceId: string; reportId: string };
};

type Handler = (payload: any) => void;

class TypedEventBus {
  private handlers: Record<string, Handler[]> = {};

  on<K extends keyof GameEventMap>(event: K, handler: (payload: GameEventMap[K]) => void): void {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler as Handler);
  }

  emit<K extends keyof GameEventMap>(event: K, payload: GameEventMap[K]): void {
    const hs = this.handlers[event];
    hs?.forEach(h => h(payload));
  }

  off<K extends keyof GameEventMap>(event: K, handler: (payload: GameEventMap[K]) => void): void {
    const hs = this.handlers[event];
    if (!hs) return;
    const idx = hs.indexOf(handler as Handler);
    if (idx !== -1) hs.splice(idx, 1);
  }
}

export const EventBus = new TypedEventBus();
