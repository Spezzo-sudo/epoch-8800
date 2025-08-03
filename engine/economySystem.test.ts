#!/usr/bin/env ts-node
export {}
import { calculateProduction, transferResources, applyMaintenance, evaluateScarcity } from './economySystem';
import { PlayerData } from './types/tickTypes';

const player: PlayerData = {
  id: 't',
  resources: { stronix: 100, crysalis: 50, pyronis: 0, voltaris: 10 },
  buildings: {
    Mine: { level: 2, baseProduction: { stronix: 1, crysalis: 0, pyronis: 0, voltaris: 0 }, baseRate: 1, maintFactor: 0.1, energyRequired: 0 }
  },
  lastTick: 0
};

const prod = calculateProduction(player);
if (prod.stronix !== 2) throw new Error('Production failed');

const maint = applyMaintenance(player);
if (maint.stronix !== -0.1) throw new Error('Maintenance calc failed');

player.resources.stronix += prod.stronix + maint.stronix;

const target: PlayerData = { ...player, resources: { stronix: 0, crysalis: 0, pyronis: 0, voltaris: 0 } };
const res = transferResources(player, target, { stronix: 10, crysalis: 0, pyronis: 0, voltaris: 0 }, 1, 0.1);
if (res.loss.stronix !== 1) throw new Error('Transfer loss not applied');
if (res.received.stronix !== 9) throw new Error('Transfer amount wrong');

const scarcity = evaluateScarcity({ ...target, resources: { stronix: -1, crysalis: 0, pyronis: 0, voltaris: 0 } });
if (!scarcity.shortage || !scarcity.lacking.includes('stronix')) throw new Error('Scarcity check failed');

console.log('economySystem tests passed');
