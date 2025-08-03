#!/usr/bin/env ts-node
export {};
import { queueSystem } from './queueSystem';

// building limit
queueSystem.enqueueTask('p1', { taskId:'b1', taskCategory:'building', targetId:'a', startTime:0, duration:1 });
queueSystem.enqueueTask('p1', { taskId:'b2', taskCategory:'building', targetId:'a', startTime:0, duration:1 });
const okBuild = queueSystem.enqueueTask('p1', { taskId:'b3', taskCategory:'building', targetId:'a', startTime:0, duration:1 });
if (okBuild) throw new Error('should block third building task');

// research limit
queueSystem.enqueueTask('p2', { taskId:'r1', taskCategory:'research', targetId:'a', startTime:0, duration:1 });
queueSystem.enqueueTask('p2', { taskId:'r2', taskCategory:'research', targetId:'a', startTime:0, duration:1 });
const okResearch = queueSystem.enqueueTask('p2', { taskId:'r3', taskCategory:'research', targetId:'a', startTime:0, duration:1 });
if (okResearch) throw new Error('should block third research task');

// defense unlimited
for(let i=0;i<100;i++){
  const ok = queueSystem.enqueueTask('p3', { taskId:'d'+i, taskCategory:'defense', targetId:'t', startTime:0, duration:1 });
  if(!ok) throw new Error('defense task rejected');
}

// unit unlimited
for(let i=0;i<100;i++){
  const ok = queueSystem.enqueueTask('p4', { taskId:'u'+i, taskCategory:'unit', targetId:'u', startTime:0, duration:1 });
  if(!ok) throw new Error('unit task rejected');
}
