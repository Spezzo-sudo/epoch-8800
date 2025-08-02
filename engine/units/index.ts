/** Game Engine Logic Cluster - Canonical units */
import { FactionId } from '../factions';

export interface UnitData {
  id: string;
  name: string;
  role: string;
  abilities: string[];
  faction: FactionId | 'All';
  tags: string[]; // combat tags used in counter matrix
  counteredBy?: string; // id of counter unit
}

export const Units: Record<string, UnitData> = {
  SPAEHERDRONE: {
    id: 'SPAEHERDRONE',
    name: 'Späherdrohne',
    role: 'Light Scout',
    abilities: ['Early warning', 'Detects stealth units'],
    faction: 'All',
    tags: ['scout', 'light'],
    counteredBy: 'EMP_FALKE'
  },
  EMP_FALKE: {
    id: 'EMP_FALKE',
    name: 'EMP-Falke',
    role: 'Anti-tech interceptor',
    abilities: ['Disables enemy shields for 5 seconds'],
    faction: FactionId.VorrTech,
    tags: ['emp', 'interceptor'],
  },
  PLASMARAUCHGLEITER: {
    id: 'PLASMARAUCHGLEITER',
    name: 'Plasmaraumgleiter',
    role: 'Mid-class combat unit',
    abilities: ['Plasma overload (ignores 30% of shield)', 'Slow fire rate'],
    faction: FactionId.Thermoclan,
    tags: ['pyronis', 'medium'],
  },
  ORBITALSCHLEIER: {
    id: 'ORBITALSCHLEIER',
    name: 'Orbitalschleier',
    role: 'Stealth bomber',
    abilities: ['Cloaking', 'Bonus damage against defense structures'],
    faction: FactionId.VorrTech,
    tags: ['stealth', 'bomber'],
  },
  AETHERION_SCHILDTRAEGER: {
    id: 'AETHERION_SCHILDTRAEGER',
    name: 'Aetherion-Schildträger',
    role: 'Heavy tank with shield matrix',
    abilities: ['Passive AoE shield for nearby units'],
    faction: FactionId.Aetherion,
    tags: ['heavy', 'shield'],
  },
  NOVARKH_KODEX: {
    id: 'NOVARKH_KODEX',
    name: 'Novarkh-Kodex',
    role: 'Support unit',
    abilities: ['Grants +10% research speed when present at base'],
    faction: FactionId.Novarkh,
    tags: ['support'],
  }
};
