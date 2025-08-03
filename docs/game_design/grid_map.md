# Grid Map

Epoch 8800 uses a **hexagonal grid** for planets and space sectors. Each tile is addressed by axial coordinates `q` and `r`.

## Tile Metadata
- `id` – unique identifier
- `type` – terrain or space type
- `ownerFaction` – faction id if claimed
- `resourceYields` – per tick production `{ stronix, crysalis, pyronis, voltaris }`
- `hasDefense` – boolean flag for defense structures
- `allianceId` – optional owner alliance

## Rendering Layers
1. Base tile sprite
2. Faction glow overlay
3. Defense and structure icons
4. UI highlights

Interaction flows include drag to pan, wheel to zoom, and pointer hover/click events.

### Filtering & Performance
- Culling tiles outside the viewport
- Object pooling for sprites
- Optional alliance overlay outlines

### Style Guidelines
- Low-poly isometric sprites
- Harmonious faction glow colors
- Soft shadows and subtle rounding

