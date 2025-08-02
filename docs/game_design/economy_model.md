# Economy Model

## Resources

- **Stronix** – foundational metal for hulls and structures.
- **Crysalis** – refined crystal for optics, sensors and research catalysts.
- **Voltaris** – core energy medium for power grids and reactors.
- **Pyronis** – volatile plasma for weapons and special systems.

## Production & Storage

Production formulas use building `baseRate` multiplied by level and modified by upgrades. Storage capacity grows via vault structures with `growthFactor` per level. Buildings only operate when sufficient Voltaris is available. Lack of Voltaris triggers automated "Sparmodus" which disables high-cost facilities.

## Maintenance & Transport

Each tick deducts maintenance based on `maintFactor`. Resource transfers apply `transportRate` and lose a percentage defined by `lossFactor`. Upgrades such as Automated Logistics reduce these losses.

## NPC Market

A dynamic market buys and sells resources. Prices follow `basePrice × (1 + demandIndex – supplyIndex)` clamped by `demandClamp` and `supplyClamp`. All trades include a `transactionFee`.

## Economy Upgrades

Upgrades improve efficiency or reduce losses. Example: **Automated Logistics** cuts transport loss by 50% after paying Stronix, Crysalis, Voltaris and Pyronis costs.

