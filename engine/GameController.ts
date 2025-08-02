/** Game Engine Logic Cluster - GameController */
import { applyTick } from '../backend/tickSystem';
import { calculateProduction, applyMaintenance } from './economySystem';
import { applyResearch } from './researchSystem';
import { simulateBattle } from './combatSimulator';
import { buildDefense } from './defenseLogic';
import { EventBus } from './eventBus';
import { saveState, loadState, GameState, initialState } from './persistence';
import { subscribeToEvents } from './scheduler';
import { verifyToken } from './authService';

export class GameController {
  private state: GameState = initialState;

  async start(playerId?: string, token?: string): Promise<void> {
    if (token) {
      playerId = await verifyToken(token);
    }
    if (!playerId) throw new Error('missing auth');
    this.state = await loadState(playerId);
    subscribeToEvents(playerId);
    EventBus.on('tick', () => {
      applyTick(this.state);
      const prod = calculateProduction(this.state);
      this.state.resources.stronix += prod.stronix;
      this.state.resources.crysalis += prod.crysalis;
      this.state.resources.pyronis += prod.pyronis;
      this.state.resources.voltaris += prod.voltaris;
      applyMaintenance(this.state);
      EventBus.emit('resource_change', { playerId });
    });
    EventBus.on('research_unlock', p => {
      applyResearch(p.nodeId, {
        faction: this.state.faction as any,
        buildings: Object.fromEntries(Object.entries(this.state.buildings).map(([k,v])=>[k,v.level])),
        voltaris: this.state.resources.voltaris,
        research: this.state.research.completed
      }, this.state.research);
    });
    EventBus.on('combat_request', p => {
      simulateBattle([], []);
      EventBus.emit('combat_resolution', { result: 'win' });
    });
    EventBus.on('defense_build', p => {
      buildDefense(p.structureId, {
        faction: this.state.faction as any,
        buildings: Object.fromEntries(Object.entries(this.state.buildings).map(([k,v])=>[k,v.level])),
        voltaris: this.state.resources.voltaris,
        research: this.state.research.completed
      }, this.state.research);
      EventBus.emit('defense_constructed', { structureId: p.structureId, playerId });
    });
    EventBus.emit('tick', undefined);
    await saveState(playerId, this.state);
  }

  async simulateSession(): Promise<void> {
    await this.start('test');
    EventBus.emit('tick', undefined);
    EventBus.emit('research_unlock', { nodeId: 'plasmataktik_1', playerId: 'test' });
    EventBus.emit('defense_build', { structureId: 'NANOPARTIKEL_KANONE' });
    EventBus.emit('combat_request', { attacker: 'a', defender: 'd' });
    EventBus.emit('tick', undefined);
    await saveState('test', this.state);
    console.log('Final state', this.state.resources);
  }
}
