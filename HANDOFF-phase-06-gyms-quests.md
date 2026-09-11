# Phase 6 handoff — Gym leaders and quest reactivity

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Make gym leaders persistent people with evolving lives and optional rematches,
and give substantial labs/quests narrative framing without weakening grading.

## Dependencies and entry criteria

- Gym leaders have assigned tiers and contextual dialogue support.
- The item, rumor-ready world state and friendship systems are stable enough to integrate.
- Existing gym, curriculum and autograder suites are green.

## In scope

- Continued leader interaction after first defeat.
- Post-match and later-progress dialogue plus occasional alternate locations.
- Optional rematches scaling by progression, teams and prior victories.
- Pre/post narrative framing for substantial C labs and side quests.
- Respectful reactions to independent completion, mistakes and hint usage.

## Explicitly out of scope

- Mandatory rematches or mere numeric stat inflation.
- Rewriting verified question banks, lab contracts or expected outputs.
- Humiliating dialogue for struggling players.
- Elaborate framing for every minor exercise.

## Planned slices

1. Gym-leader persistence and availability audit.
2. Post-defeat interaction and location-state infrastructure.
3. Rematch state, scaling policy and battle integration.
4. Leader team/strategy progression in bounded leader batches.
5. Substantial quest/lab framing state and UI integration.
6. Performance-reactive post-quest dialogue batches.
7. Gym/autograder regression, balance pass and Phase 7 activation.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run.

## Save compatibility

Persist rematch tiers and victories independently from original badge ownership.
Old badge holders must gain post-defeat availability without replaying first-win
rewards. Existing quest rewards and submissions must never be reissued.

## Known risks

- Gym access, exam gating and subject binding already have coupled checks.
- Rematch rewards can distort currency and EXP pacing.
- Autograder expected outputs are reviewed artifacts and must remain untouched.

## Next slice

None while inactive. Do not implement Phase 6 until the roadmap marks it active.

