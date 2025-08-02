# AGENTS Instructions

This repository hosts the code for **Epoch 8800**, a lightweight RTS browser game. The project is divided into multiple clusters, each responsible for specific subsystems. All contributors must follow these rules:

## Global Rules
- No pay-to-win mechanics. Only cosmetic skins are monetized.
- Code must be modular, testable, and designed for expansion.
- Keep all code lightweight and energy‑efficient.
- Utilize autosleep and lazy-loading when possible.
- Visual assets are low‑poly isometric sprites generated with DALL·E using a consistent style.
- Core tick system updates every 15 seconds while online. When offline, ticks accumulate and apply on login.
- Resources: **stronix**, **crysalis**, **pyronis**, **voltaris**. Plasma represents assignable energy.
- Building names are in German with English UI. Maximum building level is 30.
- Tech tree strictly controls unlocks.

## Cluster Responsibilities

### Frontend Cluster
- Phaser + TypeScript UI components.
- HUD showing resources and tick updates.
- GridMap interactions and animations.
- Panels for buildings, missions, and cosmetic skins.

### Backend Cluster
- Tick system (online/offline) and resource calculations.
- Research and unlock logic.
- Plasma energy allocation mechanics.
- Alliance data structures and persistence.

### Game Engine Logic Cluster
- Tech tree schema and unlock checks.
- Unit classes, counters, and PvE mission logic.
- Legendary unit rules.

### Support & Infrastructure
- Authentication flow.
- Settings and mobile optimizations.

## Development Notes
- All subsystems should be contained in their own folders.
- Each file must clearly state which cluster it belongs to.
- Tests or linting scripts should be run before committing when available.
- Use lightweight dependencies and prefer TypeScript for shared logic.

