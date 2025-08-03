# Epoch 8800
<!-- Cluster: Support & Infrastructure -->

Early prototype of a browser-based RTS game.

- Frontend uses Phaser + TypeScript.
- Backend logic designed for serverless hosting (Firebase/Render).
- Tick interval: 15 seconds with offline catch-up.

## Setup
Run `npm run setup` to clean install dependencies, build, and test the project deterministically using `npm ci`.

See `AGENTS.md` for contribution guidelines.

## Testing
Run `npm test` to execute the Jest suite. The configuration uses `ts-jest` so TypeScript
tests run without a manual compile step.
