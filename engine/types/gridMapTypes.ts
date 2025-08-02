/** Game Engine Logic Cluster - Grid map contracts */

export interface GridTile {
  q: number;
  r: number;
  id: string;
  type: string;
  ownerFaction?: string;
  resourceYields?: { stronix: number; crysalis: number; pyronis: number; voltaris: number };
  hasDefense?: boolean;
  allianceId?: string;
}

export type TileMatrix = GridTile[][];
