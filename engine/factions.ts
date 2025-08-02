/** Game Engine Logic Cluster - Faction definitions */

export interface Faction {
  name: string;
  colors: string[]; // hex color codes for glow
  traits: string[];
  exclusiveUnits: string[]; // unit ids
  techBranches: string[]; // placeholder for tech tree access
}

export enum FactionId {
  Aetherion = 'Aetherion',
  Thermoclan = 'Thermoclan',
  VorrTech = 'VorrTech',
  Novarkh = 'Novarkh'
}

export const factions: Record<FactionId, Faction> = {
  [FactionId.Aetherion]: {
    name: 'Aetherion',
    colors: ['#00E5FF', '#50c878'],
    traits: ['voltaris-optimized', 'shield-focused'],
    exclusiveUnits: ['AETHERION_SCHILDTRAEGER'],
    techBranches: []
  },
  [FactionId.Thermoclan]: {
    name: 'Thermoclan',
    colors: ['#FF3D00', '#ff7f00'],
    traits: ['brutal pyronis industries', 'tank units'],
    exclusiveUnits: ['PLASMARAUCHGLEITER'],
    techBranches: []
  },
  [FactionId.VorrTech]: {
    name: 'VorrTech',
    colors: ['#D500F9'],
    traits: ['technocratic', 'stealth units'],
    exclusiveUnits: ['EMP_FALKE', 'ORBITALSCHLEIER'],
    techBranches: []
  },
  [FactionId.Novarkh]: {
    name: 'Novarkh',
    colors: ['#FFD600', '#cd7f32'],
    traits: ['adaptive', 'pve bonus'],
    exclusiveUnits: ['NOVARKH_KODEX'],
    techBranches: []
  }
};
