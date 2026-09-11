# Phase 5 handoff — Supporting and world cast

## Continuation contract

> Read `IMPLEMENTATION-ROADMAP.md` and this handoff before doing anything. Execute only the item under `Next slice`. At the end of the chat—even if blocked or tests fail—update this handoff for the next chat. Include exact files/functions changed, tests and results, save implications, unfinished work, and the next bounded slice. The handoff must be the final repository mutation; read it back, then stop.

## Phase goal

Develop the supporting cast and ambient world without diluting character voices
or promoting incidental NPCs solely to meet a numerical quota.

## Dependencies and entry criteria

- Tier assignments and the meaningful-cast denominator are fixed in Phase 2.
- Tier 1 patterns and validators are proven in Phase 4.
- Shared dialogue/event state interfaces are stable.

## In scope

- Tier 2 bibles, contextual dialogue and two substantial events each.
- Tier 3 contextual dialogue without friendship or required heart events.
- Location, story, gym, event, item, relationship and rare-dialogue conditions.
- Verification that at least 50% of meaningful recurring cast is befriendable.

## Explicitly out of scope

- Promoting random shopkeepers or single-use NPCs to satisfy the quota.
- One giant random dialogue pool or cosmetic paraphrases.
- Giving Tier 3 characters friendship state they do not need.

## Planned slices

1. Reconfirm Tier 2/3 roster and group batches by location/relationships.
2. Implement one Tier 2 vertical slice and validate its two-event pattern.
3. Complete Tier 2 characters in bounded relationship/location batches.
4. Implement Tier 3 contextual dialogue in bounded location batches.
5. Add cross-cast references and later-state acknowledgments.
6. Quota, count, duplication, voice and contamination audit.
7. Full regression and Phase 6 activation.

## Current status

Status: NOT STARTED

## Completed slices

None.

## Files and interfaces changed

None.

## Verification

Not run.

## Save compatibility

Tier changes must not erase existing friendship records. Newly non-befriendable
presentation must preserve legacy records non-destructively in case of rollback
or later reclassification.

## Known risks

- The source cast spans both subjects and several data shapes.
- Line-count goals can mask repeated content.
- Context priority must remain deterministic when several conditions match.

## Next slice

None while inactive. Do not implement Phase 5 until the roadmap marks it active.

