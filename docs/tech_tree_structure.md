# Tech Tree Structure

This JSON format outlines how buildings and technologies unlock each other.

- `maxLevel` – Maximum allowed level (max 30).
- `requires` – Object mapping prerequisite buildings to the level needed.
- `unlocks` – Array of items unlocked after reaching the required level.

Stored either in Firestore documents or served as a static JSON file.

TypeScript interfaces are defined in `engine/techTree.ts` for runtime loading and unlock checks.

