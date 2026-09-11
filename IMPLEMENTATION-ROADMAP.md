# C-MON implementation roadmap

This document is the durable source of truth for the multi-chat expansion of
the existing C-MON educational RPG. Future chats must not rely on conversation
history. Read this file, then read only the active phase handoff named below.

## Current pointer

- Current phase: 1 — Technical foundation
- Current slice: Persistence foundation
- Active handoff: `HANDOFF-phase-01-foundation.md`
- Repository: `C:\Users\minal\Cmon`

Do not load inactive handoffs unless closing the current phase or preparing the
next one. This keeps context and usage focused.

## Product direction

C-MON is already a functioning Pokémon-inspired RPG that teaches C programming
and Calculus. Extend the existing game; do not prototype a replacement or
perform a giant rewrite.

The target experience is a real RPG first and an educational game second. The
player should want to explore, collect, battle, revisit places and talk to
characters even when no educational reward is attached. Social and narrative
content must focus overwhelmingly on personalities, relationships, ordinary
life, ambitions, problems, hobbies, local culture, Pokémon and the world—not on
studying, questions, programming or Calculus.

Preserve useful existing characters, routes, regions, questions, gyms, quests,
battles, progression, friendship records, inventory, currency and saves.
Improve existing systems before replacing them.

## Non-negotiable constraints

- Preserve backward compatibility with the installed and exported save format
  wherever reasonably possible. Never grant an earned reward twice.
- Use compact stable IDs for persistent state. Do not persist array positions
  for content that may later be reordered.
- Do not generate filler merely to reach dialogue or item-count targets.
- Do not contaminate unrelated social content with educational references.
- Do not copy copyrighted characters, plots, scenes or dialogue.
- There is no Pokedoro feature. Never add a Pomodoro timer, focus timer,
  study-hour tracker or equivalent.
- Remove educational battle-question countdowns without removing animation,
  compiler watchdog or elapsed-time behavior used elsewhere.
- Key items must not be sellable or consumable. The EXP Share is guaranteed
  early through ordinary conversation with the existing aide Kern.
- Architect the side-story system for a larger library, but initially deliver
  only two or three polished stories.
- The project is connected to `https://github.com/radhepa/C-Mon.git` on `main`.
  Every handoff must still enumerate every file it changed so cross-chat work
  remains reviewable.

## Existing architecture and baseline

- The application is an offline, global-script SPA loaded by `index.html`.
- The local project follows the GitHub repository's existing `main` history;
  generated `output/`, `tmp/` and local agent configuration are ignored.
- The live save object is `S` in `js/engine/state.js`.
- The installed save key is `cmon.save.v1` with external `v: 1`.
- Subject-specific progress is bound through `js/engine/subjects.js`; party,
  money, items, town and friends are shared.
- Friendship is implemented in `js/engine/friends.js`; current scenes and
  history depend on numeric array indexes and need stable identities.
- Items are currently split between `js/engine/shop.js` and runtime additions
  in `js/engine/side-quests.js`.
- Battle EXP is awarded only to `B.you` in `foeFainted()`.
- Battle question countdowns live primarily in `js/engine/battle.js`.
- At the initial audit, `node tools/check-all.cjs` passed all registered suites.

## Multi-chat execution protocol

One action means one bounded implementation slice, including its targeted
tests. Each chat must:

1. Read this roadmap and the active handoff.
2. Confirm the roadmap pointer matches the handoff.
3. Execute only `Next slice` from the active handoff.
4. Run the named targeted checks; run the full suite only when the handoff asks.
5. Update the active handoff even if blocked or tests fail.
6. Make the handoff the final repository mutation, read it back, then stop.

Changing chats does not restore the shared Work/Codex allowance. Small bounded
tasks, appropriate models and lower reasoning settings are the useful controls:
https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex

## Phase status

| Phase | Handoff | Status | Outcome |
|---|---|---|---|
| 1 | `HANDOFF-phase-01-foundation.md` | ACTIVE | Save, timer, item and EXP foundations |
| 2 | `HANDOFF-phase-02-cast-friendship.md` | NOT STARTED | Cast registry and earned friendship |
| 3 | `HANDOFF-phase-03-items-gifts.md` | NOT STARTED | Expanded economy, distribution and gifts |
| 4 | `HANDOFF-phase-04-core-cast.md` | NOT STARTED | Tier 1 bibles, dialogue, arcs and events |
| 5 | `HANDOFF-phase-05-supporting-world-cast.md` | NOT STARTED | Tier 2/3 cast and contextual dialogue |
| 6 | `HANDOFF-phase-06-gyms-quests.md` | NOT STARTED | Persistent gym leaders, rematches and quest framing |
| 7 | `HANDOFF-phase-07-world-reactivity.md` | NOT STARTED | Rumors, mail, vignettes and relationship web |
| 8 | `HANDOFF-phase-08-side-stories.md` | NOT STARTED | Story currency, framework and initial stories |
| 9 | `HANDOFF-phase-09-integration.md` | NOT STARTED | Migration, balance, visual QA and release audit |

## Phase summaries

### Phase 1 — Technical foundation

Install save normalization and internal migrations; create a global friendship
activity clock and per-subject badge bookkeeping; give friendship scenes stable
IDs; remove battle-question timers; centralize items; grant Kern's EXP Share;
and implement participant-aware party EXP. Do not create dialogue or story
content in this phase.

### Phase 2 — Cast model and friendship rebalance

Create the authoritative cast metadata layer, assign tiers and befriendability,
select approximately ten core characters, ensure at least half of the meaningful
recurring cast is befriendable, and replace repeat-click farming with staged,
diminishing and event-gated relationship growth. Establish structural character
bibles and contextual state selectors without bulk-writing dialogue.

### Phase 3 — Items, economy, distribution and gifts

Expand the Phase 1 item registry across useful categories, add rarity and safe
key-item behavior, create location-specific stock and natural acquisition, and
connect character preferences to a limited, diminishing gift system. Only add
battle mechanics the current engine can support cleanly.

### Phase 4 — Tier 1 core cast

Complete character bibles and continuing arcs for approximately ten core
characters. Produce contextual dialogue toward 250 meaningful lines each and
four substantial stateful heart events each, one reviewed character batch per
chat. Fully validate one vertical-slice character before scaling.

### Phase 5 — Supporting and world cast

Complete Tier 2 characters toward 150 meaningful contextual lines and two heart
events each. Complete Tier 3 characters toward 100 contextual lines without
friendship. Preserve the meaningful-cast friendship quota and reject padding,
homogeneous voices and educational contamination.

### Phase 6 — Gym leaders and quest reactivity

Keep gym leaders available after defeat, integrate their assigned tiers, add
evolving conversations and optional scaled rematches, and provide respectful
pre/post narrative framing for substantial labs and quests without altering
their verified educational or grading behavior.

### Phase 7 — Living-world reactivity

Connect rumors, mail, item vignettes, walk-in scenes, NPC relationship threads
and a progressively revealed relationship web through compact world state.
Some rumors remain biased or flavor-only; actionable mechanical hints must be
reliable enough to use.

### Phase 8 — Side-story framework

Convert accumulated question points into separate story currency, support fixed
chapter unlocks and `PLAY A PART`/`WATCH` modes, and connect two or three initial
polished stories to existing people, locations, items and rumors. Architect for
roughly ten to twelve eventual stories without generating them all now.

### Phase 9 — Integration, balance and release audit

Exercise every migration path and cross-system interaction, rebalance pacing
and economy, audit content quality and counts, run automated and human visual
passes, and update user/testing documentation plus the final project handoff.

## Phase transition rule

The final slice of a phase must run that phase's acceptance checks. If they
pass, update this roadmap first, changing the completed phase to `COMPLETE` and
the next phase to `ACTIVE`. Then populate the next phase handoff with current
repository facts and its first bounded slice. The next phase handoff must be the
final repository mutation. Read it back and stop.
