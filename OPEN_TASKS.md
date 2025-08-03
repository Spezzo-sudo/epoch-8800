# Open Tasks

- [ ] **Replace stub typings** – Install official `@types/*` and real packages for React, Phaser, Recharts, Supertest, Jest, and Firebase Admin (file: `src/types/*`)

## Phase 0 – Closed Alpha QA, UX-Feedback, kritische Bugfixes
- [ ] **Phase 0 – Closed Alpha QA** – Interne Tester prüfen alle Kern-Mechaniken und dokumentieren kritische Bugs.
- [ ] **Phase 0 – UX-Report Top-5** – Wichtigste UX-Probleme der Tester sammeln und priorisieren.
- [ ] **Phase 0 – Bug Tracker ≤10** – Kritische Issues im Bug-Tracker auf zehn oder weniger reduzieren.

## Phase 1 – Art-Review & Asset-Finalisierung, Sound-Integration, interaktives Tutorial
- [ ] **Phase 1 – Asset Review** – Finales Asset-Pack prüfen und freigeben.
- [ ] **Phase 1 – Sound Integration** – Soundeffekte und Musik ins Spiel integrieren.
- [ ] **Phase 1 – Tutorial Level** – Interaktives Tutorial-Level fertigstellen.

## Phase 2 – Allianz-Chat/Forum, Discord-Server, Beta-Registrierung & Social-Media-Launch
- [ ] **Phase 2 – Alliance Chat** – Ingame-Allianz-Chat und Forum implementieren.
- [ ] **Phase 2 – Discord Community** – Discord-Server einrichten und 100+ Mitglieder gewinnen.
- [ ] **Phase 2 – Beta Registration** – Beta-Anmeldung und Social-Media-Kampagne starten mit 500+ Signups.
- [ ] **Phase 2 – Alliance Backend** – Alliance-Gründung, -Beitritt, Kapazitäts-Upgrades und gemeinsame Spionageberichte umsetzen.
- [ ] **Phase 2 – Alliance UI** – Management-Panel mit Chat, Forum und Banner-Overlay erstellen.

## Phase 3 – Asynchrones PvP mit ELO, Saison-System, kosmetische Belohnungen
- [ ] **Phase 3 – Async PvP Loop** – Asynchrones PvP mit ELO-Bewertung und Ranglisten implementieren.
- [ ] **Phase 3 – Season Dashboard** – Saison-System mit Fortschrittsanzeige bauen.
- [ ] **Phase 3 – Cosmetic Skins** – Drei freischaltbare kosmetische Skins hinzufügen.
- [ ] **Phase 3 – PvP Backend** – Kampfauflösung mit ELO und Ranking-Daten entwickeln.
- [ ] **Phase 3 – Leaderboards UI** – Spieler- und Allianz-Ranglisten mit Saisonresets anzeigen.
- [ ] **Phase 3 – PvP Notifications** – Angriff/Verteidigung-Toastmeldungen und Zusammenfassungen einbauen.

## Phase 4 – Marktplatz & Auktionen, Direkttausch mit Escrow, Abuse-Schutz
- [ ] **Phase 4 – Marketplace Launch** – Marktplatz und Auktionssystem bereitstellen.
- [ ] **Phase 4 – Escrow Trades** – Direkttausch mit Escrow-Funktion implementieren.
- [ ] **Phase 4 – Abuse Protection** – Transaktionslog und Abuse-Tests durchführen.

## Phase 5 – Open Beta & Stress-Test, Lokalisierung, Mobile-Optimierung, langfristige Roadmap
- [ ] **Phase 5 – Stress Test** – Offene Beta mit 99,9% Uptime durchführen.
- [ ] **Phase 5 – Localization** – UI in drei Sprachen bereitstellen.
- [ ] **Phase 5 – Low-Bandwidth Mode** – Mobile-optimierten Low-Bandwidth-Modus entwickeln.
- [ ] **Phase 5 – Long-term Roadmap** – Langfristige Feature-Roadmap veröffentlichen.

### Archived Tasks
- [x] **Phaser typings** – TypeScript compilation fails because Phaser module typings are missing (file: `frontend/*`)
- [x] **Research faction type mismatch** – `faction` fields in `research_tree.json` cause type errors with `FactionId` union (file: `engine/researchSystem.ts`)
- [x] **ES2019 lib for Object.fromEntries** – `Object.fromEntries` used but tsconfig only targets es2017 (file: `tsconfig.json`)
- [x] **HUD scene property typing** – Phaser Scene properties like `add` and `time` not recognized due to incorrect class extension or typings (file: `frontend/hud.ts`)
- [x] **BuildingPanel scene typing** – Phaser Scene methods not recognized, likely due to typings (file: `frontend/buildingPanel.ts`)
- [x] **Grid pathfinding** – A* algorithm only stubbed out (file: `engine/gridMap.ts`)
- [x] **Phaser runtime stub** – Placeholder runtime module for tests; lacks real rendering (file: `phaser-runtime.js`)
- [x] **Building maintFactor typing** – `BuildingLevel` missing `maintFactor` field causing compile errors (file: `engine/economySystem.ts`)
- [x] **PlayerData mismatch** – mockPlayerData lacks `lastTick` compared to backend definition (file: `frontend/mockPlayerData.ts`)
- [x] **Duplicate scene variables** – multiple test files redeclare `scene` leading to TS2451 errors (file: `frontend/*`)
- [x] **Build script dependency** – Node build script fails due to missing 'typescript' module (file: `scripts/build.js`)
- [x] **Test script dependency** – Node test script fails due to missing 'ts-node' module (file: `scripts/test.js`)
- [x] **Playwright dependency missing** – '@playwright/test' package not available causing e2e tests to fail (file: `tests/auth.e2e.ts`)
- [x] **EconomySystem test errors** – resource transfer tests fail due to logic mismatch (file: `engine/economySystem.test.ts`)
- [x] **Phaser runtime path** – compiled tests cannot locate phaser-runtime.js (file: `scripts/test.js`)
- [x] **PvE persistence** – mission progress not persisted across sessions (file: `engine/pveSystem.ts`)
- [x] **PvE panel result display** – completion state not shown to player (file: `frontend/pvePanel.ts`)
- [x] **Asset generation script dependency** – 'crc' module missing causes generateAssets.js to fail (file: `scripts/generateAssets.js`)
- [x] **Asset validation dependency** – 'sharp' module missing causes validateAssets.js to fail (file: `scripts/validateAssets.js`)
- [x] **Queue limits** – building/research tasks limited to two; defense and unit tasks unlimited (file: `engine/queueSystem.ts`)
- [x] **Firebase-admin missing** – Firestore persistence falls back to memory store because 'firebase-admin' module is unavailable (file: `engine/dbService.ts`)
- [x] **Dashboard charts** – Balancing dashboard uses placeholder text instead of Recharts graphs (file: `frontend/balancingDashboard.tsx`)
- [x] **React typings missing** – react, react-dom, and recharts types not installed causing build errors (file: `frontend/balancingDashboard.tsx`)
- [x] **Firebase-admin not installed** – build fails because firebase-admin module cannot be resolved (file: `engine/dbService.ts`)
- [x] **Client polling & SSE push notifications** – implement polling fallback and SSE endpoint for task completion (file: `server/index.ts`)
- [x] **Build errors from missing dependencies** – React, Recharts, Express, and Supertest typings not installed causing tsc errors (file: package.json)
- [x] **Test failures due to missing firebase-admin** – auth-related tests fail because firebase-admin module is absent (file: `engine/authService.test.ts`)
- [x] **Alliances & PvP & Leaderboards** – alliance system with forum, member limits, map overlay (file: `engine/allianceSystem.ts`)
- [x] **TypeScript build errors** – missing typings or modules cause compilation failures (files: frontend/*, server/index.ts`)

### Next Steps
- Choose which phase to implement next, or focus on a specific cluster (e.g. Alliance backend, PvP logic, UI polish).
- Review HEALTHCHECK.md before pushing major changes.
- If multiple agents are needed (due to parallel work or domain complexity), fork or extend them as required.
