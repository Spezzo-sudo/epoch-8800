/** Support Cluster - Firestore persistence */
import { GameState, initialState } from './persistence';
import { readFileSync } from 'fs';
import admin, { ServiceAccount } from 'firebase-admin';
import { FirestoreConfig } from './types/dbTypes';

let store: Record<string, GameState> = {};
let firestore: admin.firestore.Firestore | null = null;

if (process.env.TEST_ENV !== 'true') {
  try {
    const config = JSON.parse(readFileSync('config/firebaseConfig.json', 'utf8')) as FirestoreConfig;
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(config as ServiceAccount),
        databaseURL: `https://${config.projectId}.firebaseio.com`
      });
    }
    firestore = admin.firestore();
  } catch (err) {
    console.warn('Firestore init failed, falling back to memory store', err);
  }
}

export async function saveState(playerId: string, state: GameState): Promise<void> {
  if (firestore) {
    await firestore.collection('players').doc(playerId).set({ state });
  } else {
    store[playerId] = JSON.parse(JSON.stringify(state));
  }
}

export async function loadState(playerId: string): Promise<GameState> {
  if (firestore) {
    const doc = await firestore.collection('players').doc(playerId).get();
    return doc.exists ? (doc.data()!.state as GameState) : JSON.parse(JSON.stringify(initialState));
  }
  return store[playerId] ? JSON.parse(JSON.stringify(store[playerId])) : JSON.parse(JSON.stringify(initialState));
}
