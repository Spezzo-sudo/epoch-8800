/** Game Engine Logic Cluster - Defense Structures */
import { FactionId } from './factions';
import { PlayerResearchState, UnlockContext } from './researchSystem';
import { logEvent } from './balancingLog';
import { mockPlayer } from '../frontend/mockPlayerData';

export interface DefenseStructure {
  id: string;
  name: string;
  tags: string[];
  description: string;
  energyCost: number;
  requiresResearch: string;
  requires_buildings: Record<string, number>;
  faction?: FactionId | 'All';
}

export const Defenses: Record<string, DefenseStructure> = {
  NANOPARTIKEL_KANONE: {
    id: 'NANOPARTIKEL_KANONE',
    name: 'Nanopartikel-Kanone',
    tags: ['dot', 'anti-light'],
    description: 'Corrosive damage over time against light units',
    energyCost: 5,
    requiresResearch: 'molekulardisruptoren',
    requires_buildings: { defense_platform: 3 },
    faction: FactionId.VorrTech
  },
  EMP_RESONATOR: {
    id: 'EMP_RESONATOR',
    name: 'EMP-Resonator',
    tags: ['disrupt', 'aoe'],
    description: 'Area EMP disables units temporarily',
    energyCost: 6,
    requiresResearch: 'neuroentkopplung',
    requires_buildings: { emp_tower: 2 },
    faction: 'All'
},
  PLASMATURM: {
    id: 'PLASMATURM',
    name: 'Plasmaturm',
    tags: ['aoe', 'pyronis'],
    description: 'Heavy pyronis tower with splash damage',
    energyCost: 8,
    requiresResearch: 'plasma_overload',
    requires_buildings: { defense_platform: 4 },
    faction: FactionId.Thermoclan
  },
  SCHILDWALL_EMITTER: {
    id: 'SCHILDWALL_EMITTER',
    name: 'Schildwall-Emitter',
    tags: ['shield'],
    description: 'Projects a defensive shield wall',
    energyCost: 7,
    requiresResearch: 'schildmatrix_tech',
    requires_buildings: { defense_platform: 5 },
    faction: FactionId.Aetherion
  },
  REPLIKATOR_BLOCKER: {
    id: 'REPLIKATOR_BLOCKER',
    name: 'Replikator-Blocker',
    tags: ['disrupt'],
    description: 'Prevents enemy replication abilities',
    energyCost: 4,
    requiresResearch: 'quantenbegrenzung',
    requires_buildings: { defense_platform: 2 },
    faction: FactionId.Novarkh
  }
};

export function canBuildDefense(id: string, ctx: UnlockContext, research: PlayerResearchState): boolean {
  const def = Defenses[id];
  if (!def) return false;
  if (def.faction && def.faction !== 'All' && def.faction !== ctx.faction) {
    return false;
  }
  if (!research.completed[def.requiresResearch]) return false;
  for (const [b, lvl] of Object.entries(def.requires_buildings)) {
    if ((ctx.buildings[b] || 0) < lvl) return false;
  }
  return true;
}

export function buildDefense(id: string, ctx: UnlockContext, research: PlayerResearchState): boolean {
  const success = canBuildDefense(id, ctx, research);
  logEvent({
    event: 'defense_constructed',
    playerId: mockPlayer.id,
    faction: mockPlayer.faction,
    structureId: id,
    location: 'base',
    requirementsMet: success,
    result: success ? 'success' : 'failure',
    timestamp: ''
  });
  return success;
}
