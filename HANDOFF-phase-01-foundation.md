# Phase 1 handoff — Technical foundation

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

Future chats must not reconstruct the full plan from conversation history. The
master roadmap is authoritative. During this phase, read only that roadmap and
this handoff unless a listed source or test file is needed for the active slice.

## Phase goal

Install the save-safe technical foundations required by all later social,
narrative and item work:

- central save normalization and ordered internal migrations;
- a global friendship activity clock plus per-subject badge bookkeeping;
- stable friendship event, outing, beat and choice IDs;
- removal of educational battle-question countdowns;
- a central item registry and generic Party inventory summary;
- a guaranteed one-time EXP Share from Kern;
- participant-aware full/half party EXP distribution; and
- a final regression and save-compatibility audit.

Do this by extending the existing global-script architecture. Do not rebuild
the game or introduce a parallel framework.

## Dependencies and entry criteria

- Project root: `C:\Users\minal\Cmon`.
- The app is an offline global-script SPA loaded by `index.html`.
- The installed save key is `cmon.save.v1`; the external save marker is `v: 1`.
- The live save object and persistence functions are in `js/engine/state.js`.
- At the initial repository audit, `node tools/check-all.cjs` passed.
- The project is connected to `https://github.com/radhepa/C-Mon.git` on `main`.
  Record every changed file in each handoff even though Git recovery is now
  available.
- The documentation bootstrap is complete and no game source was changed by it.

## In scope

- Save-format hardening and backward-compatible migration infrastructure.
- Friendship bookkeeping corrections needed before future content grows.
- Stable persistent IDs for existing friendship content without rewriting prose.
- Removal of only the educational battle-question countdown mechanic.
- Consolidation of the six current item definitions and addition of EXP Share.
- Kern's immediate ordinary-interaction grant and idempotent ownership receipt.
- Party EXP distribution integrated with current leveling and evolution.
- Targeted automated checks per slice and a full suite at phase close.

## Explicitly out of scope

- New or rewritten dialogue, character bibles, heart-event prose or side stories.
- New quests, routes, characters or regions.
- The large item expansion, gifting, rarity economy or location-specific shops.
- Friendship pacing rebalance beyond correcting cross-subject bookkeeping.
- Held-item systems or unsupported battle mechanics.
- Any Pomodoro, focus, study-hour or Pokedoro timer.
- Changes to mock-exam elapsed time, battle animation scheduling, compiler
  watchdogs, Web Worker limits or side-quest execution timeouts.

## Planned slices

0. **Documentation bootstrap — COMPLETE.** Create the master roadmap and all
   nine phase handoffs. Activate this phase and point to persistence foundation.
1. **Persistence foundation.** Centralize normalization for installed and
   imported saves, introduce ordered internal schema revisions, back up the raw
   legacy save once, and extend persistence tests.
2. **Cross-subject friendship bookkeeping.** Add `S.activityClock`, preserve
   per-subject SRS clocks, rebase existing friendship cooldowns and track badge
   credit separately per subject.
3. **Stable friendship scene identity.** Replace persistent array positions
   with immutable event/outing/beat/choice IDs, migrate valid legacy records and
   correct the scene enumeration test.
4. **Remove battle question timers.** Remove timer UI, automatic timeout failure,
   fast-answer damage and obsolete timer settings while preserving unrelated
   timing behavior.
5. **Central item registry and Party inventory.** Move the existing item
   definitions into `js/data/items.js`, preserve current item APIs and replace
   the quest-specific pouch appendage with a generic inventory summary.
6. **Kern grants EXP Share.** Add unique key item `expShare`, a one-time
   `aide-exp-share` receipt and mismatch reconciliation without new dialogue.
7. **Party EXP distribution.** Track per-foe participants, give living
   participants full EXP and living nonparticipants half EXP when EXP Share is
   owned, with recipient-aware level/evolution handling.
8. **Phase closeout.** Run the complete regression and migration matrix, update
   the roadmap, prepare Phase 2's first exact slice and activate its handoff.

## Current status

Status: ACTIVE

Current slice: Persistence foundation.

The documentation bootstrap was completed on 10 September 2026. No game source
files were modified and no automated game suites were rerun during that
documentation-only slice.

Operational repository setup was completed afterward on 10 September 2026.
It did not advance the implementation slice: persistence foundation remains
the next bounded feature task.

## Completed slices

### Slice 0 — Documentation bootstrap

- Created `IMPLEMENTATION-ROADMAP.md` as the permanent cross-chat source of truth.
- Created this active Phase 1 handoff.
- Created Phase 2 through Phase 9 inactive handoffs with goals, boundaries,
  planned slices, compatibility rules and activation guards.
- Marked Phase 1 active and all later phases not started.
- Set the roadmap pointer and this handoff to persistence foundation.
- Validated that every inactive handoff contains all required headings and
  `Status: NOT STARTED`.

### Operational setup — GitHub connection

- Initialized the local project from the existing GitHub `main` history rather
  than replacing that history.
- Configured `origin` as `https://github.com/radhepa/C-Mon.git`.
- Staged the current complete project as the successor to the older remote
  snapshot.
- Added `.gitignore` rules for local agent configuration, generated QA/audit
  output, temporary files, Python caches, dependencies and the generated
  `tools/c-worker-lax.js` file.
- Kept runtime assets, the bundled offline compiler, source, tests, previews,
  documentation and phase handoffs in the repository.

## Files and interfaces changed

Documentation added:

- `IMPLEMENTATION-ROADMAP.md`
- `HANDOFF-phase-01-foundation.md`
- `HANDOFF-phase-02-cast-friendship.md`
- `HANDOFF-phase-03-items-gifts.md`
- `HANDOFF-phase-04-core-cast.md`
- `HANDOFF-phase-05-supporting-world-cast.md`
- `HANDOFF-phase-06-gyms-quests.md`
- `HANDOFF-phase-07-world-reactivity.md`
- `HANDOFF-phase-08-side-stories.md`
- `HANDOFF-phase-09-integration.md`

Operational GitHub setup also changed:

- `.gitignore`
- `IMPLEMENTATION-ROADMAP.md` Git repository status
- `HANDOFF-phase-09-integration.md` final Git-audit risk note
- this handoff's repository status and operational record

No JavaScript, CSS, HTML, data, assets, tests or save interfaces changed.

## Verification

Documentation bootstrap verification:

- Confirmed all ten planned documentation files exist.
- Confirmed Phase 2–9 handoffs contain every required heading.
- Confirmed Phase 2–9 handoffs contain `Status: NOT STARTED`.
- Read the beginning of the master roadmap and confirmed its Phase 1 pointer.
- No game tests were required because no game source or data changed.

GitHub setup verification:

- Preserved remote commit `b9303f4dbea3764f3328324e4d7c7dd6ff736b80`
  as the parent history on `main`.
- Confirmed `origin` fetch and push URLs point to the requested repository.
- Staged 5,500 paths; Git object storage before packing was about 228.80 MiB.
- Confirmed no tracked file exceeds 90 MB, below GitHub's 100 MB single-file
  limit.
- Scanned staged text for common private-key, GitHub-token, OpenAI-key and AWS
  access-key signatures; no matches were found.
- Confirmed `.claude/`, `output/`, `tmp/`, Python caches and
  `tools/c-worker-lax.js` are ignored.

Existing baseline carried from the repository audit:

- `node tools/check-all.cjs` passed before this roadmap bootstrap.

The persistence slice must rerun `node tools/check-persistence.cjs` and
`node tools/check-all.cjs`; do not assume the carried baseline is sufficient
after changing save code.

## Save compatibility

The documentation bootstrap did not read, write, migrate or delete any player
save. `cmon.save.v1`, external `v: 1`, localStorage contents and exported saves
are unchanged.

Phase 1 compatibility rules:

- Keep the external save key and `v: 1` marker unchanged.
- Add a separate ordered internal schema revision.
- Preserve unknown fields when hydrating required defaults.
- Back up exact raw legacy JSON before the first installed-save migration.
- Reject future internal schemas without overwriting them.
- Do not duplicate badges, items, Pokémon, quest rewards, friendship points or
  completed memories.

## Known risks

- `loadGame()` and `importSave()` currently have duplicated shallow hydration;
  changing only one would create inconsistent behavior.
- `loadGame()` currently saves immediately after migration, so the exact raw
  legacy value must be backed up before normalization is persisted.
- Subject-specific `S.clock` values drive SRS and must not be replaced by the
  later global friendship activity clock.
- Existing friendship records use numeric indexes for events, pending scenes
  and choices; content reordering can corrupt meaning until Slice 3 completes.
- Timer references appear outside `battle.js` in screen cleanup, subject
  switching, friendship battles, CSS and tests.
- Item definitions are split between `shop.js` and runtime berry additions in
  `side-quests.js`.
- `foeFainted()` currently awards EXP only to `B.you`; Pokémon instances do not
  have a separate persistent instance UUID, so runtime participation should use
  object identity rather than species ID.
- `tools/check-scenes.cjs` currently double-counts townsfolk and misses
  companions. The corrected target from the audit is 130 unique social
  identities, 425 scenes including outings and 870 beats.
- The initial Git snapshot contains roughly 228.80 MiB of loose objects and
  5,500 staged paths, primarily sprites and the bundled compiler. Initial clone
  and push operations will therefore be slower than a source-only repository.

## Next slice

Implement **Slice 1 — Persistence foundation only**.

Required behavior:

1. In `js/engine/state.js`, retain `SAVE_KEY = 'cmon.save.v1'` and external
   `v: 1`.
2. Add `CURRENT_SAVE_SCHEMA = 1` and `schemaVersion: 1` to `freshSave()`.
   Treat a missing internal version as schema 0.
3. Add one `normalizeSave()` path used by both `loadGame()` and `importSave()`.
   It must run ordered migrations, deeply hydrate required nested objects and
   arrays, preserve unknown fields, and leave subject binding plus
   `ensureFriends()`, `ensureBag()` and `ensureTown()` in a valid order.
4. Before migrating an installed schema-0 save, copy its exact raw JSON once to
   localStorage key `cmon.save.v1.backup.pre-schema-1`. Do not overwrite an
   existing backup.
5. Reject `schemaVersion > CURRENT_SAVE_SCHEMA` non-destructively. A parse,
   validation or migration failure must not overwrite the main installed save.
6. Preserve the existing import contract: invalid/future files call the
   callback with an error; a valid imported save becomes active and persists
   only after successful normalization.
7. Extend `tools/check-persistence.cjs` for:
   - legacy installed-save migration and exact one-time backup;
   - legacy imported-save migration;
   - idempotent normalization;
   - nested default hydration;
   - unknown-field preservation;
   - malformed data rejection;
   - future-schema rejection without overwrite; and
   - existing side-quest migration/reward behavior.
8. Run `node tools/check-persistence.cjs`, then `node tools/check-all.cjs`.
9. Do not modify friendship clocks, scene IDs, timers, item definitions, Kern,
   EXP distribution, dialogue or content in this slice.
10. Update this handoff with exact changes and results. If green, set `Next
    slice` to cross-subject friendship bookkeeping. Make this file the final
    repository mutation, read it back, and stop.
