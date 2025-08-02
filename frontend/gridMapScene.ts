/** Frontend Cluster - Grid Map Scene */
import Phaser from 'phaser';
import { GridTile, TileMatrix, loadGrid, getTile, emit, on } from '../engine/gridMap';
import gridData from '../schemas/grid_map.json';
import { getAllianceMapOverlay } from '../engine/allianceSystem';
import { EventBus } from '../engine/eventBus';
import { FactionColors } from './designTokens';

function getAllianceColor(tag: string): string {
  return FactionColors[tag as keyof typeof FactionColors] || '#FFFFFF';
}

export class GridMapScene extends Phaser.Scene {
  private matrix!: TileMatrix;
  private container!: Phaser.GameObjects.Container;
  private cam!: Phaser.Cameras.Scene2D.Camera;
  private tileSize = (gridData as any).tileSize || 64;

  constructor() {
    super('GridMap');
  }

  preload() {
    // no external assets needed for placeholder
  }

  create() {
    this.cam = this.cameras.main;
    this.cam.setZoom(1);
    this.container = this.add.container();
    this.matrix = loadGrid((gridData as any).tiles as GridTile[]);

    for (const tile of this.matrix.values()) {
      const x = this.axialToPixelX(tile.q, tile.r);
      const y = this.axialToPixelY(tile.q, tile.r);
      const graphics = this.add.graphics({ x, y });
      graphics.fillStyle(0x444444, 1);
      graphics.lineStyle(1, 0x888888);
      this.drawHex(graphics, this.tileSize / 2);
      graphics.setInteractive(new Phaser.Geom.Polygon(graphics.getPath()), Phaser.Geom.Polygon.Contains);
      const spr = graphics;
      spr.on('pointerover', () => {
        emit('tileHover', tile);
        this.tweens.add({ targets: spr, scale: 1.1, duration: 200, yoyo: true });
      });
      spr.on('pointerout', () => spr.setScale(1));
      spr.on('pointerdown', () => emit('tileClick', tile));
      this.container.add(spr);
    }

    const updateOverlay = () => {
      const overlay = getAllianceMapOverlay('A1');
      if (!overlay) return;
      this.container.removeAll(true);
      for (const tile of this.matrix.values()) {
        const x = this.axialToPixelX(tile.q, tile.r);
        const y = this.axialToPixelY(tile.q, tile.r);
        const graphics = this.add.graphics({ x, y });
        const owned = overlay.memberTerritories.includes(`${tile.q},${tile.r}`);
        const col = getAllianceColor(overlay.tag);
        const color = owned ? parseInt(col.slice(1), 16) : 0x444444;
        graphics.fillStyle(color, owned ? 0.5 : 1);
        graphics.lineStyle(1, 0x888888);
        this.drawHex(graphics, this.tileSize / 2);
        this.container.add(graphics);
      }
    };

    updateOverlay();
    EventBus.on('alliance_updated', () => updateOverlay());

    this.input.on('wheel', (p: any, dX: number, dY: number) => {
      const zoom = Phaser.Math.Clamp(this.cam.zoom - dY * 0.001, 0.5, 2);
      this.cam.setZoom(zoom);
      emit('viewportChanged', { zoom });
    });
    this.input.on('pointermove', (p: any) => {
      if (!p.isDown) return;
      this.cam.scrollX -= p.velocity.x / this.cam.zoom;
      this.cam.scrollY -= p.velocity.y / this.cam.zoom;
      emit('viewportChanged', { x: this.cam.scrollX, y: this.cam.scrollY });
    });
  }

  axialToPixelX(q: number, r: number): number {
    return (q + r / 2) * this.tileSize;
  }

  axialToPixelY(q: number, r: number): number {
    return r * this.tileSize * 0.866; // sqrt(3)/2
  }

  private drawHex(g: Phaser.GameObjects.Graphics, size: number) {
    const points: Phaser.Math.Vector2[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = Phaser.Math.DegToRad(60 * i - 30);
      points.push(new Phaser.Math.Vector2(Math.cos(angle) * size, Math.sin(angle) * size));
    }
    g.beginPath();
    g.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      g.lineTo(points[i].x, points[i].y);
    }
    g.closePath();
    g.fillPath();
    g.strokePath();
  }
}
