/** Game Engine Logic Cluster - Research System */
import { FactionId } from './factions';
import { logEvent } from './balancingLog';
import { mockPlayer } from '../frontend/mockPlayerData';
import researchData from '../schemas/research_tree.json';

export interface ResearchNode {
  name: string;
  tier: number;
  requires: string[];
  requires_buildings?: Record<string, number>;
  energy_required?: number;
  faction?: FactionId | 'All';
  unlocks?: string[];
}

export type ResearchTree = Record<string, ResearchNode>;
export const researchTree: ResearchTree = researchData as ResearchTree;

export interface PlayerResearchState {
  completed: Record<string, boolean>;
}

export interface UnlockContext {
  faction: FactionId;
  buildings: Record<string, number>;
  voltaris: number;
  research: Record<string, boolean>;
}

export function canResearch(id: string, ctx: UnlockContext): boolean {
  const node = researchTree[id];
  if (!node) return false;
  if (node.faction && node.faction !== 'All' && node.faction !== ctx.faction) {
    return false;
  }
  if ((node.energy_required || 0) > ctx.voltaris) return false;
  for (const dep of node.requires) {
    if (!ctx.research[dep]) return false;
  }
  if (node.requires_buildings) {
    for (const [b, lvl] of Object.entries(node.requires_buildings)) {
      if ((ctx.buildings[b] || 0) < lvl) return false;
    }
  }
  return true;
}

export function applyResearch(id: string, ctx: UnlockContext, state: PlayerResearchState): boolean {
  if (!canResearch(id, ctx)) return false;
  state.completed[id] = true;
  const node = researchTree[id];
  logEvent({
    event: 'research_unlock',
    playerId: mockPlayer.id,
    faction: mockPlayer.faction,
    nodeId: id,
    tier: node.tier,
    cost: { stronix: 0, crysalis: 0, pyronis: 0 },
    requirementsMet: true,
    result: 'success',
    timestamp: ''
  });
  return true;
}

export function hasResearch(id: string, state: PlayerResearchState): boolean {
  return !!state.completed[id];
}
