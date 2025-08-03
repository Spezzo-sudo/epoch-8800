/** Game Engine Logic Cluster - Combat contracts */

export interface UnitData {
  id: string;
  name: string;
  role: string;
  abilities: string[];
  faction: string;
  tags: string[];
}

export interface BattleSideResult {
  survivors: UnitData[];
  losses: UnitData[];
}

export interface BattleResult {
  attacker: BattleSideResult;
  defender: BattleSideResult;
  efficiency: number;
  shieldBreak: boolean;
}
