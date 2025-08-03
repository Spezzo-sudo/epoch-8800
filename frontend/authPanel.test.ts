#!/usr/bin/env ts-node
import AuthPanel from './authPanel';
import { EventBus } from '../engine/eventBus';

(global as any).fetch = async () => ({ json: async () => ({ token: 't', userId: 'u' }) });

const scene = new AuthPanel();
const emitted: any[] = [];
EventBus.on('auth_success', (p) => emitted.push(p));
scene.create();
const reg = scene.children.getByName('Register') as any;
reg.emit('pointerdown');
await Promise.resolve();
if (!emitted.length || emitted[0].userId !== 'u') {
  throw new Error('auth panel did not emit');
}
console.log('authPanel test passed');
