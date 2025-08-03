#!/usr/bin/env ts-node
export {};
import { createAlliance, joinAlliance, increaseMemberLimit, postForumMessage, postEspionageReport, getAllianceMapOverlay, _resetAlliances } from './allianceSystem';

// basic create and join limit
const a = createAlliance('Testers','TST','#00FF00','U1');
for(let i=0;i<6;i++) joinAlliance(a.allianceId, 'P'+i);
const blocked = joinAlliance(a.allianceId,'PX');
if(blocked) throw new Error('should block join beyond limit');

increaseMemberLimit(a.allianceId, 25);
for(let i=6;i<30;i++) if(!joinAlliance(a.allianceId, 'P'+i)) throw new Error('join failed after limit increase');

// forum post
const post = postForumMessage(a.allianceId,'U1','hello');
if(!post || post.content!=='hello') throw new Error('forum post missing');

// espionage
const rep = postEspionageReport(a.allianceId,'U1',{ target:'A1' });
if(!rep || rep.details.target!=='A1') throw new Error('report missing');

// overlay
const ov = getAllianceMapOverlay(a.allianceId);
if(!ov || ov.tag!=='TST') throw new Error('overlay tag');

_resetAlliances();
