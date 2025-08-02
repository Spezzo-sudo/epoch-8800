/** Game Engine Logic Cluster - Research Respec System */
import { PlayerResearchState, researchTree } from './researchSystem';
import { logEvent } from './balancingLog';
import { mockPlayer } from '../frontend/mockPlayerData';

export interface RespecState {
  tokens: number;
  lastRespec: number; // unix timestamp
}

const COOLDOWN_MS = 72 * 60 * 60 * 1000; // 72 hours

export function respecTier3(respec: RespecState, research: PlayerResearchState, now = Date.now()): boolean {
  if (respec.tokens <= 0 || now - respec.lastRespec < COOLDOWN_MS) {
    logEvent({
      event: 'research_unlock',
      playerId: mockPlayer.id,
      faction: mockPlayer.faction,
      nodeId: 'tier3_respec',
      tier: 3,
      cost: { stronix: 0, crysalis: 0, pyronis: 0 },
      requirementsMet: false,
      result: 'failure',
      timestamp: ''
    });
    return false;
  }

  for (const [id, node] of Object.entries(researchTree)) {
    if (node.tier === 3 && research.completed[id]) {
      delete research.completed[id];
    }
  }
  respec.tokens -= 1;
  respec.lastRespec = now;
  logEvent({
    event: 'research_unlock',
    playerId: mockPlayer.id,
    faction: mockPlayer.faction,
    nodeId: 'tier3_respec',
    tier: 3,
    cost: { stronix: 0, crysalis: 0, pyronis: 0 },
    requirementsMet: true,
    result: 'success',
    timestamp: ''
  });
  return true;
}
