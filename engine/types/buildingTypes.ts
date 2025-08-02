/** Game Engine Logic Cluster - Building types */
import { ResourceState } from './tickTypes';

export interface BuildingLevel {
  level: number;
  baseProduction: ResourceState;
  baseRate: number;
  maintFactor: number; // percent maintenance cost per tick
  energyRequired?: number;
}
