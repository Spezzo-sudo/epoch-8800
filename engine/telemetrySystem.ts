/** Game Engine Logic Cluster - Telemetry System */
import { readFileSync } from 'fs';
import { TelemetryEvent } from './types/telemetryTypes';

let store: TelemetryEvent[] = [];
let firestore: any = null;

if (process.env.TEST_ENV !== 'true') {
  try {
    const admin = require('firebase-admin');
    const config = JSON.parse(readFileSync('config/firebaseConfig.json', 'utf8'));
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(config)
      });
    }
    firestore = admin.firestore();
  } catch (err) {
    console.warn('Firestore telemetry init failed, using memory store', err);
  }
}

export async function recordEvent(event: TelemetryEvent): Promise<void> {
  if (!event.timestamp) event.timestamp = Date.now();
  if (firestore) {
    await firestore.collection('telemetry').doc(event.eventType).collection('events').add(event);
  } else {
    store.push(JSON.parse(JSON.stringify(event)));
  }
}

export async function fetchMetrics(eventType: string, since: number): Promise<TelemetryEvent[]> {
  if (firestore) {
    const snap = await firestore
      .collection('telemetry')
      .doc(eventType)
      .collection('events')
      .where('timestamp', '>=', since)
      .get();
    return snap.docs.map((d: any) => d.data() as TelemetryEvent);
  }
  return store.filter(e => e.eventType === eventType && e.timestamp >= since);
}
