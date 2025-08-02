#!/usr/bin/env ts-node
export {}
import { loadGrid, getTile, getNeighbors, findPath } from './gridMap';
import { createAlliance, getAllianceMapOverlay, _resetAlliances } from './allianceSystem';
import { FactionColors } from '../frontend/designTokens';

type Tile = { id: string; q: number; r: number; type: string };
const tiles: Tile[] = [];
for (let q = 0; q < 5; q++) {
  for (let r = 0; r < 5; r++) {
    tiles.push({ id: `${q},${r}`, q, r, type: 'plain' });
  }
}
const matrix = loadGrid(tiles);

const center = getTile(matrix, 2, 2)!;
const neighbors = getNeighbors(matrix, 2, 2);
if (neighbors.length !== 6) {
  throw new Error('Center tile should have 6 neighbors');
}
if (!getTile(matrix, 0, 0)) {
  throw new Error('Tile lookup failed');
}

// Insert obstacle
matrix.set('2,1', { id: '2,1', q: 2, r: 1, type: 'obstacle' });

const start = getTile(matrix, 0, 0)!;
const goal = getTile(matrix, 4, 4)!;
const path = findPath(matrix, start, goal);
if (path.length === 0) {
  throw new Error('Expected a valid path');
}
if (path.some(t => t.q === 2 && t.r === 1)) {
  throw new Error('Path should avoid obstacles');
}

console.log('gridMap engine tests passed');

const a = createAlliance('Alpha','Aetherion',FactionColors.Aetherion,'U1');
const ov = getAllianceMapOverlay(a.allianceId);
if(!ov || FactionColors[ov.tag as keyof typeof FactionColors] !== FactionColors.Aetherion){
  throw new Error('overlay color mismatch');
}
_resetAlliances();
