/** Support Cluster - In-memory persistence stub */
import { PlayerData as BackendPlayerData } from './types/tickTypes';
import { PlayerResearchState } from './researchSystem';
import { FactionId } from './factions';

export interface GameState extends BackendPlayerData {
  faction: FactionId;
  research: PlayerResearchState;
  currentMissionId: string | null;
  waveIndex: number;
  buildPhaseRemaining: number;
  missionCompleted: boolean;
}

const store: Record<string, GameState> = {};

export const initialState: GameState = {
  id: 'player',
  faction: FactionId.Aetherion,
  resources: { stronix: 0, crysalis: 0, pyronis: 0, voltaris: 0 },
  buildings: {},
  research: { completed: {} },
  lastTick: Date.now(),
  currentMissionId: null,
  waveIndex: 0,
  buildPhaseRemaining: 0,
  missionCompleted: false
};

export async function saveState(playerId: string, state: GameState): Promise<void> {
  store[playerId] = JSON.parse(JSON.stringify(state));
}

export async function loadState(playerId: string): Promise<GameState> {
  return store[playerId] ? JSON.parse(JSON.stringify(store[playerId])) : JSON.parse(JSON.stringify(initialState));
}
