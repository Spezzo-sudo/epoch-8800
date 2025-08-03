/** Game Engine Logic Cluster - PvE mission contracts */

export interface MissionWave {
  enemies: { unitId: string; count: number }[];
  spawnDelay: number;
}

export interface PveMission {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'defense' | 'rescue' | 'endless';
  waves: MissionWave[];
  buildPhaseDuration: number;
  rewards: { stronix: number; crysalis: number; voltaris: number; pyronis: number; xp: number; respecTokens?: number };
  prerequisites?: { researchNodeIds: string[]; buildingLevels: Record<string, number> };
}
