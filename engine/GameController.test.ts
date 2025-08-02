#!/usr/bin/env ts-node
export {}
import { GameController } from './GameController';
import { saveState, loadState } from './persistence';
import * as authService from './authService';
authService.verifyToken = async (t: string) => t.split('-')[1];

async function run() {
  const controller = new GameController();
  await controller.simulateSession();
  console.log('GameController session completed');
}

async function testPersistence() {
  const controller = new GameController();
  await controller.start('persist', 'token-persist');
  controller['state'].resources.stronix += 42;
  await saveState('persist', controller['state']);
  await controller.start('persist', 'token-persist');
  const state = await loadState('persist');
  if (state.resources.stronix !== controller['state'].resources.stronix) {
    throw new Error('Persistence mismatch');
  }
  console.log('Persistence test succeeded');
}

run().then(testPersistence).catch(err => { console.error(err); throw err; });
