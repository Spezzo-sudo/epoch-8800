/** Backend Cluster - Tick System Test Scenario */
import { applyTick, PlayerData, ResourceState } from './tickSystem';

const player: PlayerData = {
  id: 'player1',
  resources: { stronix: 0, crysalis: 0, pyronis: 5, voltaris: 5 },
  buildings: {
    Energiekern: {
      level: 2,
      baseProduction: { stronix: 2, crysalis: 1, pyronis: 0, voltaris: 3 },
      baseRate: 2,
      maintFactor: 0.1,
      energyRequired: 0
    },
    Plasmakammer: {
      level: 1,
      baseProduction: { stronix: 1, crysalis: 2, pyronis: 1, voltaris: 0 },
      baseRate: 1,
      maintFactor: 0.05,
      energyRequired: 3
    }
  },
  lastTick: Date.now() - 30000 // two ticks ago
};

console.log('Before', player.resources);
applyTick(player);
console.log('After', player.resources);

