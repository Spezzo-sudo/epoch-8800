# Research System

Epoch 8800 divides research into three tiers. Nodes have explicit prerequisites and may unlock units, buildings or further research.

## Tier 1 – Global Efficiencies
- Generic upgrades available to all factions.
- Example nodes: `Plasmataktik 1`, `Baukoordinatoren`.

## Tier 2 – Strategic Unlocks
- Require Tier 1 nodes and specific building levels.
- Often faction restricted.
- Unlock mid level units or defenses. Examples: `EMP-Resonanzanalyse`, `Schildmatrix-Technik`.

## Tier 3 – Philosophy Paths
- Mutually exclusive and irreversible without a PvE respec token.
- Grant access to legendary units and strong global effects.
- Example path: `Technotheismus` leading to `Quantenkohärenz`.

Unlock conditions are checked in `engine/researchSystem.ts` using the schema defined in `schemas/research_tree.json`.
