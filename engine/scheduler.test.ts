#!/usr/bin/env ts-node
export {};
import { subscribeToEvents } from './scheduler';
import { EventBus } from './eventBus';

let intervalCalled = 0;
(global as any).setInterval = (fn: () => void, ms: number) => {
  intervalCalled++;
  return 0;
};

class FailingES {
  onmessage: any; onerror: any; close(){}
  constructor(url: string) { throw new Error('nope'); }
}
(global as any).EventSource = FailingES;
subscribeToEvents('p');
if (intervalCalled === 0) throw new Error('fallback not triggered');

intervalCalled = 0;
let emitted: any = null;
EventBus.on('task_complete', p => emitted = p);
class MockES { onmessage: any = () => {}; onerror: any = () => {}; close(){} constructor(url:string) { (global as any).lastES = this; } }
(global as any).EventSource = MockES;
subscribeToEvents('p');
(global as any).lastES.onmessage({ data: '{"taskId":"T1"}' });
if (!emitted || emitted.taskId !== 'T1') throw new Error('event not emitted');
console.log('scheduler tests passed');
