/** Frontend Cluster - Mock player data */
import { ResourceState, BuildingState as BuildingLevel } from '../engine/types/tickTypes';
import { FactionId } from '../engine/factions';
import { PlayerResearchState } from '../engine/researchSystem';

export interface PlayerResources extends ResourceState {}

export interface PlayerBuilding extends BuildingLevel {
  name: string;
}

export interface PlayerData {
  id: string;
  faction: FactionId;
  resources: PlayerResources;
  buildings: Record<string, PlayerBuilding>;
  research: PlayerResearchState;
  lastTick: number; // timestamp of last resource tick
}

export const mockPlayer: PlayerData = {
  id: 'player1',
  faction: FactionId.Aetherion,
  resources: {
    stronix: 5000,
    crysalis: 3000,
    pyronis: 1000,
    voltaris: 50
  },
  buildings: {
    Energiekern: {
      name: 'Energiekern',
      level: 2,
      baseProduction: { stronix: 2, crysalis: 1, pyronis: 0, voltaris: 3 },
      baseRate: 2,
      maintFactor: 0.1,
      energyRequired: 0
    },
    Plasmakammer: {
      name: 'Plasmakammer',
      level: 1,
      baseProduction: { stronix: 1, crysalis: 2, pyronis: 1, voltaris: 0 },
      baseRate: 1,
      maintFactor: 0.05,
      energyRequired: 3
    }
  },
  research: { completed: {} },
  lastTick: Date.now() - 15000
};
