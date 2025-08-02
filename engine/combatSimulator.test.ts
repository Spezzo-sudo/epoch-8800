#!/usr/bin/env ts-node
export {}
import { simulateBattle } from './combatSimulator';
import { Units } from './units';

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

// Scenario 1: EMP-Falke counters Orbitalschleier (stealth)
let res = simulateBattle([Units.EMP_FALKE], [Units.ORBITALSCHLEIER]);
assert(res.defender.losses.length === 1, 'EMP-Falke should defeat stealth bomber');

// Scenario 2: Späherdrohne loses to Aetherion-Schildträger
res = simulateBattle([Units.SPAEHERDRONE], [Units.AETHERION_SCHILDTRAEGER]);
assert(res.attacker.losses.length === 1, 'Scout should lose against heavy tank');

// Scenario 3: Mixed forces
res = simulateBattle(
  [Units.SPAEHERDRONE, Units.EMP_FALKE],
  [Units.ORBITALSCHLEIER, Units.AETHERION_SCHILDTRAEGER]
);
assert(res.attacker.losses.length + res.defender.losses.length > 0, 'Mixed battle should have losses');

console.log('combatSimulator tests passed');
