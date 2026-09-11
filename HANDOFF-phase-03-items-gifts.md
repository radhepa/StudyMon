# Phase 3 handoff — Items, economy, distribution and gifts

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Turn the Phase 1 catalog into a coherent item economy that rewards exploration
and supports balanced gift-giving through existing inventory and currency.

## Dependencies and entry criteria

- Phases 1 and 2 are complete.
- The central item registry and cast metadata/preferences interfaces are stable.
- The active save schema and migration instructions are recorded here at activation.

## In scope

- Healing, battle utility, training, supported evolution, exploration, key,
  collectible, gift and flavor items with distinct roles.
- Rarity/value metadata, clear mechanical descriptions and world flavor.
- Location-specific inventories and acquisition through existing world systems.
- Loved, liked, neutral, disliked and hated gift preferences.
- Frequency limits, diminishing returns and discoverable preferences.

## Explicitly out of scope

- Dozens of nearly identical numeric upgrades or meaningless collectibles.
- Unsupported battle mechanics added merely to justify an item.
- Selling or consuming key items, loot boxes or real-money mechanics.
- Character-specific gift reaction prose before its bounded content batch.

## Planned slices

1. Economy and item-role audit with target catalog boundaries.
2. Registry metadata, rarity, key-item safety and validation.
3. Healing/recovery and supported battle/training/evolution items.
4. Exploration, collectible and flavor items.
5. Location-specific shops and non-shop distribution.
6. Gift preference, discovery, limits and friendship integration.
7. Character-reaction content batches and UI polish.
8. Economy simulation, save tests, full regression and Phase 4 activation.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run.

## Save compatibility

Preserve existing item keys and quantities. New unique-item receipts must
reconcile ownership without duplicating rewards. Unknown item keys from newer
saves must not cause destructive normalization.

## Known risks

- Item definitions were historically split across shop and side-quest code.
- Overabundant healing or EXP effects can flatten battle progression.
- Gifts must not convert money directly into maximum friendship.

## Next slice

None while inactive. Do not implement Phase 3 until the roadmap marks it active.

