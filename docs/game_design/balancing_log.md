# Balancing Log

The balancing log records important events for later tuning and analytics.
Each entry follows a structured interface defined in `engine/types/logTypes.ts`.

## Events
- **research_unlock** – when a research node is attempted
- **combat_resolution** – result of a battle
- **resource_change** – gain or spend of resources
- **defense_constructed** – building of a defense structure

All events share the fields `timestamp`, `playerId` and `faction`.

## Integration
Use `logEvent` from `engine/balancingLog` after applying research, spending or gaining resources, completing combat, or constructing defenses.

### Example
```ts
logEvent({
  event: 'resource_change',
  playerId: player.id,
  faction: player.faction,
  resourceType: 'stronix',
  amount: -500,
  newTotal: player.resources.stronix,
  reason: 'upgrade_cost',
  timestamp: ''
});
```

Retrieve logs with `getLogs()` for debugging or analytics.
