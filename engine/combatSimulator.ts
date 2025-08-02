/** Game Engine Logic Cluster - Combat Simulator */
import { UnitData, Units } from './units';
import { counterMatrix, CombatTag } from './combatSystem/core';

export interface BattleSideResult {
  survivors: UnitData[];
  losses: UnitData[];
}

export interface BattleResult {
  attacker: BattleSideResult;
  defender: BattleSideResult;
  efficiency: number; // percent damage dealt to defender
  shieldBreak: boolean;
}

function hasAdvantage(att: UnitData, def: UnitData): boolean {
  for (const tag of att.tags) {
    const counters = counterMatrix[tag as CombatTag];
    if (!counters) continue;
    if (def.tags.some(t => counters.includes(t as CombatTag))) {
      return true;
    }
  }
  return false;
}

export function simulateBattle(attacker: UnitData[], defender: UnitData[]): BattleResult {
  const atk = [...attacker];
  const def = [...defender];
  const atkLoss: UnitData[] = [];
  const defLoss: UnitData[] = [];
  let shieldBreak = false;

  while (atk.length && def.length) {
    const a = atk[0];
    const d = def[0];
    const aAdv = hasAdvantage(a, d);
    const dAdv = hasAdvantage(d, a);
    if (a.tags.includes('pyronis') && d.tags.includes('shield')) {
      shieldBreak = true;
    }

    if (aAdv && !dAdv) {
      defLoss.push(d);
      def.shift();
    } else if (dAdv && !aAdv) {
      atkLoss.push(a);
      atk.shift();
    } else {
      atkLoss.push(a);
      defLoss.push(d);
      atk.shift();
      def.shift();
    }
  }

  const result: BattleResult = {
    attacker: { survivors: atk, losses: atkLoss },
    defender: { survivors: def, losses: defLoss },
    efficiency: defLoss.length / (defLoss.length + def.length) * 100,
    shieldBreak
  };
  return result;
}
