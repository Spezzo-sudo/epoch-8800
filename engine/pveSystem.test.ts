#!/usr/bin/env ts-node
export {}
import { PveSystem } from './pveSystem';
import missionsData from '../schemas/pve_missions.json';
import { GameState, initialState } from './persistence';
import { EventBus } from './eventBus';

async function run() {
  const sys = new PveSystem();
  const state: GameState = JSON.parse(JSON.stringify(initialState));
  let spawned = 0;
  EventBus.on('spawn_unit', () => { spawned++; });
  await sys.startMission(state, 'mission_attack_alpha');
  await sys.advance(5);
  if (sys.checkMissionStatus() !== 'inProgress') throw new Error('Status mismatch');
  await sys.advance(20);
  await sys.advance(1);
  if (spawned === 0) throw new Error('Wave not spawned');
  for (let i=0;i<100;i++) await sys.advance(60);
  if (sys.checkMissionStatus() !== 'completed') throw new Error('Mission not completed');

  const sys2 = new PveSystem();
  await sys2.startMission(state, 'mission_attack_alpha');
  const loaded = (sys2 as any).state;
  if (!loaded.missionCompleted) throw new Error('State not saved');
  if (loaded.waveIndex !== missionsData['mission_attack_alpha'].waves.length) throw new Error('Wave index mismatch');

  console.log('pveSystem tests passed');
}

run();
