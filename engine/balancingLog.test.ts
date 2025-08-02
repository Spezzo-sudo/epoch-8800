#!/usr/bin/env ts-node
export {}
import { logEvent, getLogs } from './balancingLog';

logEvent({
  event: 'resource_change',
  playerId: 'test',
  faction: 'Test',
  resourceType: 'stronix',
  amount: 5,
  newTotal: 5,
  reason: 'test',
  timestamp: ''
});

const logs = getLogs();
if (logs.length !== 1 || logs[0].playerId !== 'test') {
  throw new Error('Logging system failed');
}

console.log('balancingLog test passed');
