/** Game Engine Logic Cluster - Tech Tree handling */
import techTreeData from '../schemas/tech_tree.json';

export interface TechTreeNode {
  maxLevel: number;
  requires: Record<string, number>;
  unlocks: string[];
}

export type TechTree = Record<string, TechTreeNode>;

export const techTree: TechTree = techTreeData;

export function canUnlock(name: string, levels: Record<string, number>): boolean {
  const node = techTree[name];
  if (!node) return false;
  for (const [dep, lvl] of Object.entries(node.requires)) {
    if ((levels[dep] || 0) < lvl) {
      return false;
    }
  }
  return true;
}
