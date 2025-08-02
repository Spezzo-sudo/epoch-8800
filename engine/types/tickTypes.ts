/** Backend Cluster - Tick system contracts */

export interface ResourceState {
  stronix: number;
  crysalis: number;
  pyronis: number;
  voltaris: number;
}

export interface BuildingState {
  level: number;
  baseProduction: ResourceState;
  baseRate: number;
  maintFactor: number;
  energyRequired?: number;
}

export interface PlayerData {
  id: string;
  resources: ResourceState;
  buildings: Record<string, BuildingState>;
  lastTick: number; // unix timestamp ms
}
