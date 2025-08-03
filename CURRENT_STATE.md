# Current State of Epoch 8800

## A. Summary
Epoch 8800 is a browser-based sci-fi real-time strategy game featuring four distinct factions competing across a hexagonal grid map. The game emphasizes modular systems, research-driven progression, and a 15-second tick-based resource economy. Frontend scenes are built with TypeScript and Phaser, while backend logic and persistence are implemented in TypeScript with a Firebase-compatible interface.

## B. Directory Overview
```
assets/             - Design tokens and DALL·E prompt definitions
backend/            - Tick system and server-side utilities
docs/               - Project documentation and design notes
engine/             - Core game logic modules and TypeScript tests
frontend/           - Phaser UI scenes, panels, and mock data
schemas/            - JSON schemas for contracts (economy, combat, research, etc.)
scripts/            - Build, test, and asset pipeline scripts
server/             - Express-based server and authentication routes
src/                - Entry point
```

## C. Roadmap & Milestones
Project phases and goals are tracked in `OPEN_TASKS.md` and span closed alpha through open beta:
- **Phase 0 – Closed Alpha QA, UX feedback, critical bugfixes**
- **Phase 1 – Asset review, sound integration, interactive tutorial**
- **Phase 2 – Alliance systems, community setup, beta registration**
- **Phase 3 – Asynchronous PvP with seasons and cosmetics**
- **Phase 4 – Marketplace, escrow trades, abuse protection**
- **Phase 5 – Open beta, localization, mobile optimization**

## D. Task Status
Open and archived tasks are maintained in [`OPEN_TASKS.md`](OPEN_TASKS.md). Current open items cover phase deliverables for phases 0–5. Archived tasks record completed fixes such as grid pathfinding, PvE persistence, asset pipeline dependencies, and more.

## E. Known Issues & Technical Debt
- Official typings and packages for React, Phaser, Recharts, Supertest, Jest, and Firebase Admin are installed.
- Full Firestore integration and end-to-end event bus tests are not yet validated.
- Alliance, PvP, marketplace, and localization features remain unimplemented.

## F. Unimplemented Features
Major systems still to build include asynchronous PvP with leaderboards, marketplace and escrow trading, season dashboards, localization, low-bandwidth mode, and full alliance chat/forum support.

## G. Architecture Notes
- Resources **Stronix**, **Crysalis**, **Voltaris**, and **Pyronis** power the economy and market systems.
- Factions Aetherion, Thermoclan, VorrTech, and Novarkh each grant unique unit access and glow colors.
- The grid map uses axial coordinates with layered rendering and performance-conscious culling.
- The tick system applies 15-second online updates and retroactive offline accumulation.

## H. Unique Game Design Choices
- Hex-based world with faction-colored overlays and low‑poly isometric art style.
- Research tiers culminate in mutually exclusive philosophy paths.
- PvE missions supply respec tokens, enabling limited tech tree resets.
- No pay-to-win mechanics; only cosmetic skins are monetized.

