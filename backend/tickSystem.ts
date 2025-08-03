/** Backend Cluster - Tick System */
import { logEvent } from '../engine/balancingLog';
import { mockPlayer } from '../frontend/mockPlayerData';
import { ResourceState, BuildingState as BuildingLevel, PlayerData } from '../engine/types/tickTypes';

const TICK_INTERVAL_MS = 15 * 1000;

/**
 * Apply resource production for any elapsed ticks.
 * Buildings only operate when the player's stored voltaris meets their requirement.
 */
export function applyTick(player: PlayerData): void {
  const now = Date.now();
  const elapsed = now - player.lastTick;
  const ticks = Math.floor(elapsed / TICK_INTERVAL_MS);
  if (ticks <= 0) return;

  produceResources(player, ticks);
  player.lastTick += ticks * TICK_INTERVAL_MS;
}

function produceResources(player: PlayerData, ticks: number): void {
  for (const b of Object.values(player.buildings)) {
    const requiredEnergy = (b.energyRequired || 0) * b.level;
    if (requiredEnergy > 0 && player.resources.voltaris < requiredEnergy) {
      continue; // not enough voltaris to run this building
    }

    const { stronix, crysalis, pyronis, voltaris } = b.baseProduction;
    const factor = b.level * ticks;
    player.resources.stronix += stronix * factor;
    logEvent({
      event: 'resource_change',
      playerId: player.id,
      faction: mockPlayer.faction,
      resourceType: 'stronix',
      amount: stronix * factor,
      newTotal: player.resources.stronix,
      reason: 'tick_income',
      timestamp: ''
    });
    player.resources.crysalis += crysalis * factor;
    logEvent({
      event: 'resource_change',
      playerId: player.id,
      faction: mockPlayer.faction,
      resourceType: 'crysalis',
      amount: crysalis * factor,
      newTotal: player.resources.crysalis,
      reason: 'tick_income',
      timestamp: ''
    });
    player.resources.pyronis += pyronis * factor;
    logEvent({
      event: 'resource_change',
      playerId: player.id,
      faction: mockPlayer.faction,
      resourceType: 'pyronis',
      amount: pyronis * factor,
      newTotal: player.resources.pyronis,
      reason: 'tick_income',
      timestamp: ''
    });
    player.resources.voltaris += voltaris * factor;
    logEvent({
      event: 'resource_change',
      playerId: player.id,
      faction: mockPlayer.faction,
      resourceType: 'voltaris',
      amount: voltaris * factor,
      newTotal: player.resources.voltaris,
      reason: 'tick_income',
      timestamp: ''
    });
  }
}
