/** Game Engine Logic Cluster - Research system contracts */
import { ResourceState } from './tickTypes';

export interface ResearchNode {
  id: string;
  name: string;
  tier: number;
  requires: string[];
  requiresBuildings: Record<string, number>;
  energyRequired?: number;
  faction?: string;
  unlocks: string[];
  cost: ResourceState;
}

export interface PlayerResearchState {
  completed: Record<string, boolean>;
}
