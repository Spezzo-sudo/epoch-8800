# Tech Tree

Buildings and research items are defined in a tree structure with prerequisites and maximum levels. See `schemas/tech_tree.json` for the data format.

Unlock checks are performed in `engine/techTree.ts` using the `canUnlock` helper.
