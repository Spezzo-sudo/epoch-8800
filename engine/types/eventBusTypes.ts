/** Game Engine Logic Cluster - Event bus contracts */

export interface GameEventMap {
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
}
