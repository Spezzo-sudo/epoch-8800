/** Game Engine Logic Cluster - PvE System */
import missionsData from '../schemas/pve_missions.json';
import { GameState, loadState, saveState } from './persistence';
import { EventBus } from './eventBus';

export interface MissionWave {
  enemies: { unitId?: string; defenseId?: string; count: number }[];
  spawnDelay: number;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'defense' | 'rescue' | 'endless';
  waves: MissionWave[];
  buildPhaseDuration: number;
  rewards: { stronix: number; crysalis: number; voltaris: number; pyronis: number; xp: number; respecTokens?: number };
  prerequisites?: { researchNodeIds: string[]; buildingLevels: Record<string, number> };
  story?: { trigger: 'start' | 'waveComplete' | 'missionComplete'; text: string }[];
}

export const missions: Record<string, Mission> = missionsData as Record<string, Mission>;

interface ActiveMission {
  mission: Mission;
  buildTimer: number;
  waveTimers: number[];
  currentWave: number;
  completed: boolean;
}

export class PveSystem {
  private active?: ActiveMission;
  private state?: GameState;

  loadMission(id: string): Mission {
    return missions[id];
  }

  async startMission(state: GameState, missionId: string): Promise<void> {
    const mission = this.loadMission(missionId);
    if (!mission) throw new Error('Mission not found');
    const saved = await loadState(state.id);
    this.state = { ...state, ...saved };
    if (saved.currentMissionId === missionId) {
      this.active = {
        mission,
        buildTimer: saved.buildPhaseRemaining,
        waveTimers: mission.waves.map(w => w.spawnDelay),
        currentWave: saved.waveIndex,
        completed: saved.missionCompleted
      };
    } else {
      this.active = {
        mission,
        buildTimer: mission.buildPhaseDuration,
        waveTimers: mission.waves.map(w => w.spawnDelay),
        currentWave: 0,
        completed: false
      };
      this.state.currentMissionId = missionId;
      this.state.waveIndex = 0;
      this.state.buildPhaseRemaining = mission.buildPhaseDuration;
      this.state.missionCompleted = false;
      await saveState(this.state.id, this.state);
    }
    EventBus.emit('mission_start', { missionId });
  }

  async advance(dt: number): Promise<void> {
    if (!this.active) return;
    if (this.active.buildTimer > 0) {
      this.active.buildTimer -= dt;
      if (this.state) this.state.buildPhaseRemaining = this.active.buildTimer;
      if (this.active.buildTimer <= 0) {
        this.active.buildTimer = 0;
      }
      return;
    }
    const wave = this.active.mission.waves[this.active.currentWave];
    if (!wave) return;
    this.active.waveTimers[this.active.currentWave] -= dt;
    if (this.active.waveTimers[this.active.currentWave] <= 0) {
      this.handleWave(this.active.currentWave);
      this.active.currentWave++;
      if (this.state) this.state.waveIndex = this.active.currentWave;
      if (this.active.currentWave >= this.active.mission.waves.length) {
        await this.completeMission();
      } else if (this.state) {
        await saveState(this.state.id, this.state);
      }
    }
  }

  handleWave(index: number): void {
    const wave = this.active?.mission.waves[index];
    if (!wave) return;
    EventBus.emit('spawn_unit', { enemies: wave.enemies, wave: index });
  }

  checkMissionStatus(): 'inProgress' | 'failed' | 'completed' {
    if (!this.active) return 'completed';
    return this.active.completed ? 'completed' : 'inProgress';
  }

  async completeMission(): Promise<void> {
    if (!this.active || !this.state) return;
    const { rewards, id } = this.active.mission;
    this.state.resources.stronix += rewards.stronix;
    this.state.resources.crysalis += rewards.crysalis;
    this.state.resources.voltaris += rewards.voltaris;
    this.state.resources.pyronis += rewards.pyronis;
    this.active.completed = true;
    this.state.missionCompleted = true;
    await saveState(this.state.id, this.state);
    EventBus.emit('mission_complete', { missionId: id, result: 'success', rewards });
  }
}
