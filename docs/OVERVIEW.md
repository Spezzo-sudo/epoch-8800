# Codebase Overview

This document describes each file in the repository and links it to the subsystem it belongs to.

- `README.md` – Short project description. *(Support & Infrastructure)*
- `AGENTS.md` – Collaboration and contribution rules. *(Support & Infrastructure)*

## Directories

- `backend/` – Backend Cluster implementation (tick system, resource logic, etc.).
 - `frontend/` – Frontend Cluster implementation (Phaser UI components).
 - `engine/` – Game Engine Logic Cluster (tech tree, factions, combat and unit data).
 - `schemas/` – JSON schemas and data structures for the Game Engine Logic Cluster.
- `docs/` – Documentation files.
 - `docs/game_design/` – Permanent design documentation (factions, units, combat).

Each TypeScript/JavaScript file begins with a comment indicating its cluster.

