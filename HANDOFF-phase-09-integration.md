# Phase 9 handoff — Integration, balance and release audit

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Prove the combined expansion safe, coherent, balanced and usable, then leave a
complete final project handoff rather than adding new feature scope.

## Dependencies and entry criteria

- Phases 1–8 are complete with green phase-specific checks.
- Every active save schema and persistent content ID is documented.
- The initial side stories and all planned content batches are complete.

## In scope

- Old/exported-save migration matrix and duplicate-reward testing.
- Friendship, EXP, item, currency, gift, rematch and story-cost balance.
- Dialogue/event count, diversity, voice and educational-contamination audits.
- Cross-region and cross-system scenario testing.
- Desktop/mobile visual and interaction passes.
- README, testing documentation and final handoff updates.

## Explicitly out of scope

- New major systems, characters, regions or story arcs.
- Padding content counts during the audit.
- Silently accepting known data loss or duplicate rewards.

## Planned slices

1. Save-version/migration matrix and import/export recovery testing.
2. Cross-system automated scenario expansion.
3. Friendship/EXP/economy/story-currency simulations and tuning.
4. Content count, duplication, voice and contamination audit.
5. Desktop interaction and visual QA.
6. Mobile interaction and visual QA.
7. Accessibility, failure-state and performance pass.
8. Full regression, documentation and final project handoff.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run.

## Save compatibility

This phase must test every migration from the pre-roadmap `v: 1` save through
the final internal schema. Keep original raw backups recoverable and reject
future schemas non-destructively.

## Known risks

- Passing isolated subsystem tests does not prove cross-system idempotency.
- Content scale can hide unreachable states and priority conflicts.
- The repository includes large runtime assets, so final Git status, object-size
  and ignored-artifact checks are required before release.

## Next slice

None while inactive. Do not implement Phase 9 until the roadmap marks it active.
