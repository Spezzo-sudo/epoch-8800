/** Game Engine Logic Cluster - Combat Simulator */
import { UnitData } from './units';
import { counterMatrix, CombatTag } from './combatSystem/core';

export const ATTACK_PER_UNIT = Object.freeze({
  pyronis: 2.0,
  interceptor: 1.5,
  emp: 1.2,
  bomber: 1.8,
  stealth: 1.4,
  medium: 1.0,
} as const);

export const HP_PER_UNIT = Object.freeze({
  pyronis: 8,
  interceptor: 7,
  emp: 6,
  bomber: 10,
  stealth: 7,
  medium: 6,
} as const);

export const ADVANTAGE_MULTIPLIERS = Object.freeze({
  counters: 1.25,
  countered: 0.75,
  neutral: 1.0,
} as const);

export const SHIELD_BYPASS = 0.30;

export interface Fleet {
  units: UnitData[];
  shield: number;
}

interface FleetState {
  units: UnitData[];
  hp: number[];
  shield: number;
}

export interface BattleLog {
  round: number;
  attackerDamage: number;
  defenderDamage: number;
  attackerShield: number;
  defenderShield: number;
}

export interface BattleOutcome {
  rounds: number;
  survivors: { attacker: UnitData[]; defender: UnitData[] };
  logs: BattleLog[];
}

function primaryTag(unit: UnitData): keyof typeof ATTACK_PER_UNIT {
  for (const tag of unit.tags) {
    if (tag in ATTACK_PER_UNIT) return tag as keyof typeof ATTACK_PER_UNIT;
  }
  return 'medium';
}

function counters(att: UnitData, def: UnitData): boolean {
  return att.tags.some(tag => {
    const list = counterMatrix[tag as CombatTag] || [];
    return def.tags.some(t => list.includes(t as CombatTag));
  });
}

function damageMultiplier(unit: UnitData, opponents: UnitData[]): number {
  if (!opponents.length) return ADVANTAGE_MULTIPLIERS.neutral;
  let total = 0;
  for (const o of opponents) {
    const attAdv = counters(unit, o);
    const defAdv = counters(o, unit);
    if (attAdv && !defAdv) total += ADVANTAGE_MULTIPLIERS.counters;
    else if (defAdv && !attAdv) total += ADVANTAGE_MULTIPLIERS.countered;
    else total += ADVANTAGE_MULTIPLIERS.neutral;
  }
  return total / opponents.length;
}

function computeDamage(side: UnitData[], opponents: UnitData[]): number {
  return side.reduce((total, u) => {
    const tag = primaryTag(u);
    const base = ATTACK_PER_UNIT[tag];
    const mult = damageMultiplier(u, opponents);
    return total + base * mult;
  }, 0);
}

function applyDamage(target: FleetState, damage: number, attackers: UnitData[]): void {
  const hasPyronis = attackers.some(u => u.tags.includes('pyronis'));
  const bypass = hasPyronis && target.shield > 0 ? SHIELD_BYPASS : 0;
  let shieldDamage = damage * (1 - bypass);
  let hpDamage = damage * bypass;
  if (target.shield >= shieldDamage) {
    target.shield -= shieldDamage;
  } else {
    hpDamage += shieldDamage - target.shield;
    target.shield = 0;
  }
  let remaining = hpDamage;
  for (let i = 0; i < target.units.length && remaining > 0; ) {
    const hp = target.hp[i];
    if (remaining >= hp) {
      remaining -= hp;
      target.units.splice(i, 1);
      target.hp.splice(i, 1);
    } else {
      target.hp[i] -= remaining;
      remaining = 0;
    }
  }
}

function initFleet(fleet: Fleet): FleetState {
  return {
    units: [...fleet.units],
    hp: fleet.units.map(u => HP_PER_UNIT[primaryTag(u)]),
    shield: fleet.shield,
  };
}

export function simulateBattle(att: UnitData[], def: UnitData[], maxRounds?: number): BattleOutcome;
export function simulateBattle(att: Fleet, def: Fleet, maxRounds?: number): BattleOutcome;
export function simulateBattle(
  att: Fleet | UnitData[],
  def: Fleet | UnitData[],
  maxRounds = 20,
): BattleOutcome {
  const attacker = initFleet(Array.isArray(att) ? { units: att, shield: 0 } : att);
  const defender = initFleet(Array.isArray(def) ? { units: def, shield: 0 } : def);
  const logs: BattleLog[] = [];
  let round = 0;
  while (attacker.units.length && defender.units.length && round < maxRounds) {
    round++;
    const atkDamage = computeDamage(attacker.units, defender.units);
    const defDamage = computeDamage(defender.units, attacker.units);
    applyDamage(defender, atkDamage, attacker.units);
    applyDamage(attacker, defDamage, defender.units);
    logs.push({
      round,
      attackerDamage: atkDamage,
      defenderDamage: defDamage,
      attackerShield: attacker.shield,
      defenderShield: defender.shield,
    });
  }
  return {
    rounds: round,
    survivors: { attacker: [...attacker.units], defender: [...defender.units] },
    logs,
  };
}

