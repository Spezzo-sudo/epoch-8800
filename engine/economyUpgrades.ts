/** Game Engine Logic Cluster - Economy upgrades */
import economy from '../schemas/economy.json';
import { GameState } from './persistence';
import { logEvent } from './balancingLog';

export function applyUpgrade(player: GameState, upgradeId: string): void {
  const up = (economy as any).upgrades.find((u: any) => u.id === upgradeId);
  if (!up) return;
  for (const req of up.requires) {
    const [id, level] = req.split(':');
    if ((player.buildings[id]?.level || 0) < Number(level)) return;
  }
  const costs = up.costs;
  const res = player.resources as any;
  if (res.stronix < costs.stronix || res.crysalis < costs.crysalis || res.voltaris < costs.voltaris || res.pyronis < costs.pyronis) return;
  res.stronix -= costs.stronix;
  res.crysalis -= costs.crysalis;
  res.voltaris -= costs.voltaris;
  res.pyronis -= costs.pyronis;
  logEvent({
    event: 'resource_change',
    playerId: player.id,
    faction: player.faction,
    resourceType: 'stronix',
    amount: -costs.stronix,
    newTotal: res.stronix,
    reason: 'upgrade_cost',
    timestamp: ''
  });
  // further effects omitted
}
