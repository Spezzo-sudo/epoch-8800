/** Frontend Cluster - Alliance Panel */
import Phaser from 'phaser';
import { Alliance } from '../engine/types/allianceTypes';
import { EventBus } from '../engine/eventBus';
import { createAlliance, joinAlliance, increaseMemberLimit, postForumMessage, postEspionageReport } from '../engine/allianceSystem';
import { FactionColors } from './designTokens';

function getAllianceColor(tag: string): string {
  return FactionColors[tag as keyof typeof FactionColors] || '#FFFFFF';
}

const mockAlliance: Alliance = createAlliance('Alpha','Aetherion',getAllianceColor('Aetherion'),'U1');

export class AlliancePanel extends Phaser.Scene {
  constructor(){ super('AlliancePanel'); }
  create(){
    this.add.text(10,10,`Alliance: ${mockAlliance.name} [${mockAlliance.tag}]`,{color:getAllianceColor(mockAlliance.tag)});
    const memberText=this.add.text(10,30,`Members: ${mockAlliance.members.length}/${mockAlliance.memberLimit}`);
    const postInput=this.add.text(10,220,'post...', {backgroundColor:'#222', color:'#fff'}).setInteractive();
    postInput.on('pointerup',()=>{ const p=postForumMessage(mockAlliance.allianceId,'U1','hello'); memberText.setText(`Members: ${mockAlliance.members.length}/${mockAlliance.memberLimit}`); });
  }
}
