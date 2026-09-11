# Phase 8 handoff — Side-story framework

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Build a reusable optional-story framework and deliver two or three polished
examples connected to the established world without generating the eventual
library all at once.

## Dependencies and entry criteria

- Character, item, rumor, mail and world-state systems are stable.
- The question-point source and conversion rules are identified and tested.
- Existing educational side quests remain separately represented.

## In scope

- Separate story currency earned by converting accumulated question points.
- Fixed chapter costs, unlock/completion state and approximate-length metadata.
- Clearly distinguished `PLAY A PART` and `WATCH` modes.
- Architecture for roughly ten to twelve eventual stories.
- Two or three initial polished, interconnected stories.

## Explicitly out of scope

- Real money, loot boxes, artificial waiting or excessive grinding.
- Generating all ten to twelve stories in this phase.
- Treating heart events and side stories as the same progression system.
- Charging again for an already unlocked chapter.

## Planned slices

1. Question-point audit and story-currency conversion contract.
2. Story/chapter registry, validation and save schema.
3. Unlock, completion and navigation UI.
4. `PLAY A PART` scene execution.
5. `WATCH` scene execution.
6. First polished story vertical slice.
7. Second and optional third story batches.
8. Economy, interruption, migration and integration regression.
9. Phase 9 activation.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run.

## Save compatibility

Persist stable story/chapter IDs, unlocked/completed state, meaningful choices
and payment receipts. Conversion and purchase operations must be atomic and
idempotent across reloads.

## Known risks

- Story currency must not damage existing SRS or score semantics.
- Interrupted chapters need explicit resume/restart behavior.
- `WATCH` mode must not incorrectly grant player-presence choices or rewards.

## Next slice

None while inactive. Do not implement Phase 8 until the roadmap marks it active.

