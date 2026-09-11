# Phase 7 handoff — Living-world reactivity

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Make the region appear to continue existing away from the player by connecting
rumors, mail, objects, NPC relationships and changing locations.

## Dependencies and entry criteria

- Cast relationships, items, gifts, contextual dialogue and rematches are stable.
- Persistent world flags and unique-reward receipts have tested migration paths.

## In scope

- Rumors/gossip, including reliable hints and biased or flavor-only variants.
- Letters, postcards, invitations and occasional safe one-time attachments.
- Selective notable-item vignettes.
- NPC walk-in scenes and evolving NPC-to-NPC relationship threads.
- A progressively revealed relationship-web screen.
- Cross-system consequences and acknowledgments.

## Explicitly out of scope

- Turning every rumor into a quest marker.
- Guilt trips, missed-day penalties, real-time streaks or waiting timers.
- Revealing undiscovered secrets in the relationship web.
- Giving every acquired item a vignette.

## Planned slices

1. Compact world-flag and discovery-state registry.
2. Rumor selection, reliability and resolution infrastructure.
3. Letter queue, delivery and attachment receipts.
4. Item-vignette triggers and one-off persistence.
5. Walk-in scene and NPC relationship-thread infrastructure.
6. Progressive relationship-web UI.
7. Content batches connecting existing characters, items and rematches.
8. Cross-system regression and Phase 8 activation.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run.

## Save compatibility

Use stable rumor, letter, vignette, relationship and world-event IDs. Maintain
separate known, completed/resolved and reward-receipt state so content discovery
cannot duplicate items or lose history.

## Known risks

- Cross-system triggers can form loops or fire twice during load/render.
- Random selection can make important reliable hints inaccessible.
- Relationship-web data must distinguish player knowledge from world truth.

## Next slice

None while inactive. Do not implement Phase 7 until the roadmap marks it active.

