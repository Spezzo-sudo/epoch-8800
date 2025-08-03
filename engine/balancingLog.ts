/** Game Engine Logic Cluster - Balancing Log */
import { GameLog } from './types/logTypes';

const logs: GameLog[] = [];

export function logEvent(log: GameLog): void {
  log.timestamp = new Date().toISOString();
  logs.push({ ...log });
  if (typeof console !== 'undefined' && console.debug) {
    console.debug(log);
  }
}

export function getLogs(): GameLog[] {
  return logs;
}
