# Phase 2 handoff — Cast model and friendship rebalance

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Create one authoritative view of the recurring cast and make friendship slow,
meaningful and resistant to repeat-click farming. Establish structural state
needed by later writing without generating bulk dialogue.

## Dependencies and entry criteria

- Phase 1 is marked `COMPLETE` in `IMPLEMENTATION-ROADMAP.md`.
- Save migrations, stable scene IDs and the global activity clock pass tests.
- The Phase 1 handoff records the final save schema and relevant interfaces.

## In scope

- Metadata overlay for trainers, townsfolk and gym leaders using their existing IDs.
- Tier, befriendability, narrative importance, recurring locations and relationships.
- Approximately ten justified Tier 1 characters.
- At least 50% of meaningful recurring named characters marked befriendable.
- Diminishing returns, activity limits, friendship stages and event gates.
- Structural character-bible fields and contextual state selectors.

## Explicitly out of scope

- Bulk dialogue, rewritten heart-event prose, gifts, letters, rumors or side stories.
- Promoting incidental one-line characters solely to satisfy the percentage.
- Replacing the existing friendship UI or scene engine wholesale.

## Planned slices

1. Re-audit and classify the meaningful recurring cast by stable ID.
2. Add the cast metadata registry and compatibility adapters.
3. Add friendship stages and rebalance repeatable gains.
4. Add diminishing returns and meaningful activity/event gates.
5. Add structural character-bible and relationship metadata.
6. Add contextual character/world-state selector interfaces.
7. Migration, pacing simulation, full regression and Phase 3 activation.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run. Activation must begin from the Phase 1 green baseline.

## Save compatibility

Do not store duplicated character definitions in saves. Persist compact IDs,
friendship stage inputs and required receipts/flags only. Existing points,
meetings, events and history must survive classification changes.

## Known risks

- Current companions and townsfolk have different source shapes.
- The 50% requirement applies to meaningful recurring cast, not every named row.
- Overly generous badge and repeatable-action gains can bypass intended stages.

## Next slice

None while inactive. Do not implement Phase 2 until the roadmap marks it active.

