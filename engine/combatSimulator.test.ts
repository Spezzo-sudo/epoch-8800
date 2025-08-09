#!/usr/bin/env ts-node
export {};
import { simulateBattle, ATTACK_PER_UNIT, HP_PER_UNIT, ADVANTAGE_MULTIPLIERS, SHIELD_BYPASS, Fleet } from './combatSimulator';
import { Units, UnitData } from './units';

function assert(condition: boolean, msg: string): void {
  if (!condition) throw new Error(msg);
}

const fleet = (units: UnitData[], shield = 0): Fleet => ({ units, shield });

// Pyronis shield bypass
const pyroAtk = fleet([Units.PLASMARAUCHGLEITER, Units.PLASMARAUCHGLEITER, Units.PLASMARAUCHGLEITER]);
const initialShield = 20;
const shieldedDef = fleet([Units.AETHERION_SCHILDTRAEGER], initialShield);
const controlAtk = fleet([Units.EMP_FALKE, Units.EMP_FALKE, Units.EMP_FALKE]);

const pyroRes = simulateBattle(pyroAtk, shieldedDef, 20);
const ctrlRes = simulateBattle(controlAtk, fleet([Units.AETHERION_SCHILDTRAEGER], initialShield), 20);
assert(pyroRes.survivors.defender.length === 0, 'Pyronis should breach shielded defender');
assert(pyroRes.rounds <= 12, 'Pyronis should win within 12 rounds');
const expectedShield = initialShield - pyroRes.logs[0].attackerDamage * (1 - SHIELD_BYPASS);
assert(Math.abs(pyroRes.logs[0].defenderShield - expectedShield) < 1e-6, 'Shield reduction should follow bypass rule');
assert(pyroRes.logs[0].defenderShield < ctrlRes.logs[0].defenderShield, 'Pyronis should drain shield faster');

// Medium vs medium attrition
const attrition = simulateBattle(fleet([Units.PLASMARAUCHGLEITER]), fleet([Units.PLASMARAUCHGLEITER]), 3);
assert(attrition.survivors.attacker.length > 0 && attrition.survivors.defender.length > 0, 'Medium attrition should leave survivors');
assert(attrition.rounds === 3 && attrition.logs.length === attrition.rounds, 'Rounds should cap and logs match');

// Mixed tags advantage
const mixed = simulateBattle(
  fleet([Units.EMP_FALKE, Units.EMP_FALKE]),
  fleet([Units.ORBITALSCHLEIER, Units.ORBITALSCHLEIER]),
  20
);
assert(mixed.survivors.attacker.length > mixed.survivors.defender.length, 'Advantaged attacker should have more survivors');

// Empty attacker edge case
const empty = simulateBattle(fleet([]), fleet([Units.SPAEHERDRONE]), 5);
assert(empty.rounds === 0 && empty.logs.length === 0, 'Empty attacker should end immediately');
assert(empty.survivors.attacker.length === 0 && empty.survivors.defender.length > 0, 'Defender should remain when attacker empty');

// Constant tables immutability
assert(Object.isFrozen(ATTACK_PER_UNIT), 'ATTACK_PER_UNIT must be frozen');
assert(ATTACK_PER_UNIT.pyronis === 2.0 && ATTACK_PER_UNIT.interceptor === 1.5, 'ATTACK_PER_UNIT values changed');
assert(Object.isFrozen(HP_PER_UNIT), 'HP_PER_UNIT must be frozen');
assert(HP_PER_UNIT.pyronis === 8 && HP_PER_UNIT.bomber === 10, 'HP_PER_UNIT values changed');
assert(Object.isFrozen(ADVANTAGE_MULTIPLIERS), 'ADVANTAGE_MULTIPLIERS must be frozen');
assert(
  ADVANTAGE_MULTIPLIERS.counters === 1.25 &&
    ADVANTAGE_MULTIPLIERS.countered === 0.75 &&
    ADVANTAGE_MULTIPLIERS.neutral === 1.0,
  'Advantage multipliers changed'
);
assert(SHIELD_BYPASS === 0.30, 'SHIELD_BYPASS changed');

console.log('combatSimulator tests passed');

