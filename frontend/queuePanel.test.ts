#!/usr/bin/env ts-node
export {};
import { queueSystem } from '../engine/queueSystem';
import { EventBus } from '../engine/eventBus';
import { showToast } from './toastService';

(showToast as any) = (msg: string) => { (global as any).lastToast = msg; };

queueSystem.enqueueTask('p', {taskId:'b1',taskCategory:'building',targetId:'a',startTime:0,duration:1});
queueSystem.enqueueTask('p', {taskId:'b2',taskCategory:'building',targetId:'a',startTime:0,duration:1});
const success = queueSystem.enqueueTask('p', {taskId:'b3',taskCategory:'building',targetId:'a',startTime:0,duration:1});
if (success) throw new Error('allowed third task');

for(let i=0;i<5;i++){
  const ok=queueSystem.enqueueTask('p2',{taskId:'d'+i,taskCategory:'defense',targetId:'x',startTime:0,duration:1});
  if(!ok) throw new Error('defense task rejected');
}

EventBus.emit('task_complete', { taskId: 'T1' });
if ((global as any).lastToast !== 'Task completed: T1') throw new Error('toast not shown');
