/** Game Engine Logic Cluster - Economy calculations */
import { PlayerData, ResourceState } from './types/tickTypes';
import { logEvent } from './balancingLog';

export interface ResourceDelta extends ResourceState {}

export interface TransferResult {
  loss: ResourceDelta;
  received: ResourceDelta;
}

export interface ScarcityReport {
  shortage: boolean;
  lacking: (keyof ResourceState)[];
}

export function calculateProduction(player: PlayerData): ResourceDelta {
  const delta: ResourceDelta = { stronix: 0, crysalis: 0, pyronis: 0, voltaris: 0 };
  for (const b of Object.values(player.buildings)) {
    if ((b.energyRequired || 0) * b.level > player.resources.voltaris) continue;
    delta.stronix += b.baseProduction.stronix * b.level;
    delta.crysalis += b.baseProduction.crysalis * b.level;
    delta.pyronis += b.baseProduction.pyronis * b.level;
    delta.voltaris += b.baseProduction.voltaris * b.level;
  }
  return delta;
}

export function applyMaintenance(player: PlayerData): ResourceDelta {
  const delta: ResourceDelta = { stronix: 0, crysalis: 0, pyronis: 0, voltaris: 0 };
  for (const b of Object.values(player.buildings)) {
    if (b.maintFactor) {
      const maintenance = b.maintFactor * b.baseRate;
      delta.stronix -= maintenance;
      player.resources.stronix += delta.stronix;
    }
  }
  if (delta.stronix !== 0) {
    logEvent({
      event: 'resource_change',
      playerId: player.id,
      faction: player.id,
      resourceType: 'stronix',
      amount: delta.stronix,
      newTotal: player.resources.stronix,
      reason: 'maintenance',
      timestamp: ''
    });
  }
  return delta;
}

export function transferResources(from: PlayerData, to: PlayerData, amounts: ResourceState, rate = 1, lossFactor = 0): TransferResult {
  const sent: ResourceDelta = { stronix: 0, crysalis: 0, pyronis: 0, voltaris: 0 };
  const loss: ResourceDelta = { stronix: 0, crysalis: 0, pyronis: 0, voltaris: 0 };

  for (const key of Object.keys(sent) as (keyof ResourceState)[]) {
    const avail = from.resources[key];
    const want = Math.min(avail, amounts[key]);
    const afterRate = want * rate;
    const lost = afterRate * lossFactor;
    from.resources[key] -= want;
    sent[key] = afterRate - lost;
    to.resources[key] += sent[key];
    loss[key] = lost;
  }

  return { loss, received: sent };
}

export function evaluateScarcity(player: PlayerData): ScarcityReport {
  const lacking: (keyof ResourceState)[] = [];
  if (player.resources.voltaris <= 0) lacking.push('voltaris');
  if (player.resources.stronix < 0) lacking.push('stronix');
  if (player.resources.crysalis < 0) lacking.push('crysalis');
  if (player.resources.pyronis < 0) lacking.push('pyronis');
  return { shortage: lacking.length > 0, lacking };
}
