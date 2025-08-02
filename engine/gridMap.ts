/** Game Engine Logic Cluster - Grid Map */
type Listener = (data: any) => void;
const listeners: Record<string, Listener[]> = {};

export interface ResourceYield {
  stronix: number;
  crysalis: number;
  pyronis: number;
  voltaris: number;
}

export interface GridTile {
  id: string;
  q: number;
  r: number;
  type: string;
  ownerFaction?: string | null;
  resourceYields?: ResourceYield;
  hasDefense?: boolean;
  allianceId?: string | null;
}

export type TileMatrix = Map<string, GridTile>;

export function on(event: 'tileHover' | 'tileClick' | 'viewportChanged', cb: Listener) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(cb);
}

export function emit(event: 'tileHover' | 'tileClick' | 'viewportChanged', data: any) {
  (listeners[event] || []).forEach(l => l(data));
}

export function loadGrid(data: GridTile[]): TileMatrix {
  const matrix: TileMatrix = new Map();
  for (const t of data) {
    matrix.set(key(t.q, t.r), t);
  }
  return matrix;
}

export function getTile(matrix: TileMatrix, q: number, r: number): GridTile | undefined {
  return matrix.get(key(q, r));
}

function key(q: number, r: number): string {
  return `${q},${r}`;
}

export function getNeighbors(matrix: TileMatrix, q: number, r: number): GridTile[] {
  const dirs = [
    [1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]
  ];
  const res: GridTile[] = [];
  for (const [dq, dr] of dirs) {
    const tile = getTile(matrix, q + dq, r + dr);
    if (tile) res.push(tile);
  }
  return res;
}

// Placeholder A* pathfinding
export function findPath(matrix: TileMatrix, start: GridTile, goal: GridTile): GridTile[] {
  const startKey = key(start.q, start.r);
  const goalKey = key(goal.q, goal.r);

  const open = new Set<string>([startKey]);
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(start, goal));

  while (open.size > 0) {
    let currentKey: string | null = null;
    let currentScore = Infinity;
    for (const k of open) {
      const score = fScore.get(k) ?? Infinity;
      if (score < currentScore) {
        currentScore = score;
        currentKey = k;
      }
    }
    if (!currentKey) break;
    if (currentKey === goalKey) {
      return reconstructPath(cameFrom, currentKey, matrix);
    }
    open.delete(currentKey);
    const [cq, cr] = currentKey.split(',').map(Number);
    const currentTile = getTile(matrix, cq, cr);
    if (!currentTile) continue;
    for (const neighbor of getNeighbors(matrix, cq, cr)) {
      if (neighbor.type === 'obstacle') continue;
      const nKey = key(neighbor.q, neighbor.r);
      const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1;
      if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
        cameFrom.set(nKey, currentKey);
        gScore.set(nKey, tentativeG);
        fScore.set(nKey, tentativeG + heuristic(neighbor, goal));
        open.add(nKey);
      }
    }
  }
  return [];
}

function heuristic(a: GridTile, b: GridTile): number {
  const dq = Math.abs(a.q - b.q);
  const dr = Math.abs(a.r - b.r);
  const ds = Math.abs(-a.q - a.r - (-b.q - b.r));
  return (dq + dr + ds) / 2;
}

function reconstructPath(cameFrom: Map<string, string>, currentKey: string, matrix: TileMatrix): GridTile[] {
  const path: GridTile[] = [];
  let keyCursor: string | undefined = currentKey;
  while (keyCursor) {
    const [q, r] = keyCursor.split(',').map(Number);
    const tile = getTile(matrix, q, r);
    if (tile) path.unshift(tile);
    keyCursor = cameFrom.get(keyCursor);
  }
  return path;
}
