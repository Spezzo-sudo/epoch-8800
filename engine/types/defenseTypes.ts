/** Game Engine Logic Cluster - Defense contracts */

export interface DefenseStructure {
  id: string;
  name: string;
  description: string;
  tags: string[];
  energyRequired?: number;
  faction?: string;
}
