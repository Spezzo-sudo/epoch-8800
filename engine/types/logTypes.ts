/** Game Engine Logic Cluster - Logging types */
export interface BaseLog {
  timestamp: string; // ISO8601
  playerId?: string;
  faction?: string;
}

export interface ResearchLog extends BaseLog {
  event: "research_unlock";
  nodeId: string;
  tier: number;
  cost: { stronix: number; crysalis: number; pyronis: number };
  requirementsMet: boolean;
  result: "success" | "failure";
}

export interface CombatLog extends BaseLog {
  event: "combat_resolution";
  attackerId: string;
  defenderId: string;
  counterUsed: string;
  result: "win" | "loss";
  efficiency: number; // percent
  shieldBreak: boolean;
}

export interface ResourceLog extends BaseLog {
  event: "resource_change";
  resourceType: "stronix" | "crysalis" | "pyronis" | "voltaris";
  amount: number;
  newTotal: number;
  reason: string; // e.g. "tick_income", "upgrade_cost"
}

export interface DefenseLog extends BaseLog {
  event: "defense_constructed";
  structureId: string;
  location: string;
  requirementsMet: boolean;
  result: "success" | "failure";
}

export type GameLog = ResearchLog | CombatLog | ResourceLog | DefenseLog;
