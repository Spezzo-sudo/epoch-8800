#!/usr/bin/env ts-node
export {}
import { recordEvent, fetchMetrics } from './telemetrySystem';
process.env.TEST_ENV = 'true';
(async () => {
  await recordEvent({ timestamp: Date.now(), eventType: 'unitWin', payload: { unit: 'drone' }});
  const events = await fetchMetrics('unitWin', Date.now() - 1000);
  if (events.length !== 1) throw new Error('fetchMetrics failed');
})();
