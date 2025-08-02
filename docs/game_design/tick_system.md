# Tick System

Resource production updates every 15 seconds while the player is online. Offline time accumulates and is applied retroactively on login.

Buildings will only operate if the player's stored voltaris meets each building's `energyRequired` value. Energy is not consumed each tick but acts as a threshold.

Plasma is stored as an assignable voltaris type for future features; it no longer provides any production bonus.
