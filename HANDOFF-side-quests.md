# Side Quests, autograded

## Live feature, 6 September 2026
All 30 C Side Quests are playable and automatically graded. Entry points: bottom
navigation (available in either region), C-region map and C Notes. Opening a
quest does not change the active subject. Chapter guide links explicitly switch
to C when needed. Quest IDs c-lab-01 through c-lab-30 are unchanged;
recommendedOrder controls browsing. No weekly time lock or missed-week penalty.

Ten easy, ten medium, ten hard. Bounded briefs, an exact implementation
contract, source starters, three hints, chapter metadata and per-case fixtures.
Source of alignment: the verified in-game fourth-edition map, ISBN
9780357506134. No claim of reproducing unavailable textbook exercises.

## How grading works
You write C in C-MON, press Run to try it against one editable fixture, and
press Submit to be graded. Submit compiles the program with Clang and links it
with LLD, both compiled to WebAssembly and bundled under `assets/compiler`, then
runs it against every test for that lab inside an in-memory WASI sandbox.
Nothing is uploaded, no compiler is installed, and no other tool is involved.

Compilation is C11 with `-Wall -Wextra -Werror -pedantic-errors -O0`. Limits:
45s compile watchdog, 3s per test, 64 MB program memory, 1 MB per sandbox file,
16 KB output. Comparison is exact: every byte of stdout, including spaces and
the final newline. A test passes only on exit code 0 with empty stderr. The
reward is granted only when every test passes.

Labs come in two shapes. `grading.mode === 'program'` compiles the learner's
whole program including `main`. `grading.mode === 'functions'` compiles a
fixed driver (`grading.harness`) that `#include`s the learner's code as
`quest.c` and calls the required functions, so the contract fixes the
signatures but not the implementation.

Honest limits: this is a local, trusted, personal study game. Tests are bounded
and chosen per lab. Passing them means the program satisfied that contract on
those inputs under a WASI C11 target. It is not proof that a C program is free
of every possible error, and the UI says so.

## Expected outputs are a reviewed artifact
Every case's expected stdout is produced by compiling and running a reference
implementation (`tools/quest-reference-fixtures.json`), then reviewed by hand
against the written contract before use. This ordering matters: a reference
that is subtly wrong yields a confidently wrong expectation, and the autograder
would then mark correct student code as wrong.

Each stored expectation carries a hash of the inputs that determine it
(harness + reference source + case input + case files). If any of those change,
the hash stops matching and `tools/apply-expected-outputs.cjs` DROPS the
expectation instead of keeping it. A case with no expectation can never pass, so
the failure mode is a lab that cannot be completed until it is re-verified,
never a lab graded against a stale answer.

Pipeline:
1. `python tools/build-quest-grader.py` rebuilds contracts, drivers, starters
   and cases, then re-applies any expectations that are still valid.
2. `node tools/build-expected-outputs.cjs` (needs the local server) recompiles
   every reference, reruns every case and rewrites
   `tools/quest-expected-outputs.json`. Review its output before trusting it.
3. `node tools/apply-expected-outputs.cjs` injects them into the live data.

## Verification
- `node tools/check-side-quests.cjs` static: 30 labs, 169 cases, every case
  carrying a verified expectation that still matches its contract.
- `node tools/check-autograder.cjs` end to end against an isolated save, never
  the real one: the reference passes and pays once, resubmitting cannot pay
  twice, a trailing space fails, a compiler error and an infinite loop pay
  nothing, edited drafts mark old results stale, and no self-review or
  import/export controls remain.
- `tools/check-side-quests-browser.cjs.superseded` tested the removed
  self-review flow and is kept only for reference.

## State
Progress under `S.sideQuests`, version 3, records keyed by stable quest ID.
Status is not-started, in-progress, needs-revision or completed. `submission`
holds the graded snapshot; `rewardReceipt` holds the one-time reward record.
`lastGrade` records the source it graded, so results are labelled once the draft
moves on. Completions from the superseded self-review system are set to
needs-revision and must be regraded; their old rewards are never granted twice,
and a valid autograder submission is preserved by the migration.

Claim checks completed/unclaimed, then writes money, items, Pokemon and receipt
together into the existing save key. A failed localStorage write rolls back the
in-memory claim and rebinds subject progress. Duplicate clicks cannot grant
twice. New Pokemon route to party if fewer than six, otherwise box.

## Rewards and berries
Easy: 600 money + 3 Oran Berries. Medium: 1,400 + 2 Sitrus. Hard: 3,000 + 4
Sitrus, with selected hard quests also granting a specified Pokemon at a fixed
level. Rewards preview before starting. Oran and Sitrus are in ITEMS but not
shop stock. Party screen has a Berry pouch: Oran restores 10 HP, Sitrus
floor(maxHP/4) minimum 1. Cannot revive, feed at full HP, or feed during battle.

## Files
- `js/data/side-quests.js` 30 schemaVersion 4 contracts, cases and rewards.
- `js/engine/side-quests.js` board, filters, editor, Run/Submit, results, claims, berries.
- `js/engine/c-worker.js` Clang/LLD compilation and sandboxed WASI execution.
- `assets/compiler/` bundled toolchain and WASI shim, with licences.
- `css/side-quests.css`, `index.html`, `js/engine/ui.js`, `js/engine/state.js`.

## Known edge, deliberately left
`shop_load` in lab 30 parses revenue with `%lu`, which also accepts a negative
literal and wraps it. No test covers a negative revenue, so no implementation
can disagree with another over it. Adding such a test would impose a rule the
written contract does not state and could fail legitimately correct work, so the
contract and the tests were left alone. Tighten the contract wording first if
this is ever worth testing.

## Prior branching evolution work
Branching families wait for a Party-screen choice, including Pokemon in storage.
Uses existing level thresholds (special methods default to 32). Single-path
evolution automatic. Already evolved Pokemon are not reverted. Choice preserves
nickname, shiny, EXP and level, updates caught/seen, and refuses during battles.
