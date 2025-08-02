#!/usr/bin/env ts-node
export {}
import { getMarketPrice, executeTrade } from './marketSystem';
import { PlayerData } from './types/tickTypes';
const econ = require('../schemas/economy.json');
econ.market = { basePrice: { stronix: 1, crysalis: 1, voltaris: 1, pyronis: 1 }, demandClamp: 1, supplyClamp: 1, transactionFee: 0.1 };

const player: PlayerData = { id: 'p', resources: { stronix: 100, crysalis: 0, pyronis: 0, voltaris: 0 }, buildings: {}, lastTick: 0 };
const price = getMarketPrice('stronix');
const trade = executeTrade(player, 'stronix', 10, 'sell');
if (trade.price <= 0) throw new Error('Price invalid');
console.log('marketSystem tests passed');
