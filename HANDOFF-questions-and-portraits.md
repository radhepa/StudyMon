# Session handoff: prompt list, question audit, bug fixing

Written 6 September 2026. Project: C:\Users\minal\Cmon
Companion to CLAUDE-HANDOFF-AUTOGRADER.md and HANDOFF-side-quests.md, which are
still current for the autograder and Side Quests.

The session was asked for four things: prune the character prompt list, make
sure every question is correct, fix bugs generally, then write this file. The
first two are finished. The third was in progress when the session ended.

---

## 1. Character prompt list - DONE

`output/Remaining NPC Portrait Prompts.txt` held 147 prompts, 61 of them for
characters that already have portraits. Those 61 are deleted, the remaining 86
are renumbered 01-86, sections that emptied are gone, and the header count is
updated. The `CONVERGING ISLES: CALCULUS II` banner is a region divider with no
entries of its own; the pruning script dropped it and it was put back by hand.

The identical copy in `C:\Users\minal\Downloads\Pokemon Characters\` was
overwritten with the pruned version, so the two are in sync. Check they still
match before editing either.

**One piece of art had never been imported.** `Holt.jfif` was sitting in the
download folder with no `holt-portrait.png`. Holt is now imported, reframed and
wired into `FOLK_PORTRAITS` under the folk id `holt`. Every other file in that
folder already had a portrait: 78 art files, 78 portraits, no gaps left.

Remaining unpainted: 86 characters, all still in the list. The Converging Isles
is the thin one - 4 evening/final examiners, 8 of 10 quiz gym leaders, and most
of the 46 locals.

### A trap that cost time here

`python tools/reframe-portraits.py --remeasure` used to re-measure EVERY
character, not just the named one. Erasing background changes a figure's
silhouette, so re-measuring moves framing the owner approved in the portrait
studio. Running it bare shifted `fee-seeker` (chin 197 -> 203). Her original
landmarks were recovered by re-importing her with `portrait-edits.json`
temporarily emptied, measuring that, and writing the value back.

`--remeasure` now **requires** the names to re-measure and exits with an
explanation if given none. Use `--remeasure holt`, never `--remeasure` alone.

Verified afterwards: all 78 portraits render byte-identical to what is on disk,
so nothing drifted.

---

## 2. Question banks - DONE, all 1302 correct

894 C questions across 15 chapters, 408 calculus across 14. **No wrong answers
were found.** Two real defects were fixed; both were about how questions are
presented, not about what they claim.

### How the C answers were checked: by running them

`tools/verify-c-answers.cjs` finds every "what is printed" question, wraps the
snippet into a program, compiles it with the game's own bundled Clang and runs
it in the WASI sandbox, then compares the real output against the answer the
bank claims. `tools/compare-c-answers.cjs` judges the results, because a choice
is often the output plus an explanation ("90 - it rounds down") and an exact
string test is too strict.

Result on 211 questions: **204 verified by running**, 3 correct on a human read
(`c2-48` uninitialized read, `c5-10` which also asks the value of x, `c11-38`
which prints trailing garbage), and 4 that cannot be built because they are
abstract stack and queue questions with no implementation given (`c15-14`,
`c15-15`, `c15-46`, `c15-47`) - all four correct by LIFO/FIFO semantics.

The harness writes `tools/c-worker-lax.js`, **generated at run time** from
`js/engine/c-worker.js` with the strict warning flags replaced by `-w`. The bank
contains snippets that deliberately read an uninitialized variable or leave one
unused, and those must still run so their real output can be compared. It is
generated so the two cannot drift apart. **Do not edit it and do not ship it.**

### The other 1091 were read

Every remaining C question and all 408 calculus questions were read against
their marked answers, including working the arithmetic on the computational
ones: arc lengths, series sums, BST traversals, bit masks, binary search bounds,
polar areas, ratio and root test limits. All correct.

### Defect 1: two questions, one stem, different answers - FIXED

`k94-m-L35-3` and `k94-y-003` both read "The area of one petal of r = cos 2θ
is:". One wants the integral setup, the other wants π/8. Both are right, but a
student who learns one meets the other and cannot find their answer among the
choices. The setup one now reads "...is given by which integral:".

### Defect 2: three quarters of C answers were choice B - FIXED

This was the serious one. In the hand-written C files the correct answer sat at
index 1 in **75%** of 746 four-choice questions. Guessing B scored about 75%
without knowing any C, which defeats the point of a study tool. `edition4.js`
was always fine - it rotates its answers with `a = n % 4`.

`tools/balance-answers.cjs` fixes it by **swapping** the correct choice with
whichever choice already sits at a target position, assigned round-robin per
chapter. A swap preserves the choice list exactly and cannot alter the correct
text. Choices that only make sense in one place ("all of the above") are pinned.
`edition4.js` is left alone. Run it with `--write`; without that flag it is a
dry run. 553 questions were swapped.

Distribution went from **13/69/14/4** to **24/26/25/25** across all 850
four-choice C questions.

Proved safe three ways. A before-and-after snapshot showed every question keeps
its text, its explanation, the same set of choices and the same correct answer
string. Re-running the compiler verification afterwards gave an identical
204/3/4. And saves are keyed by question id (`S.srs[qid]`), never by choice
index, so existing progress is untouched.

### Things deliberately left alone

- **The correct choice is the longest one in 50% of C questions**, where chance
  is 25%. A separate giveaway, reported as a warning. Fixing it means rewriting
  distractors, which risks correctness for a smaller gain - a judgement call for
  the owner, not something to change silently.
- **Calculus sits at 20/35/26/19.** Above chance but within normal exam
  variation, so not touched.
- `c9-ed4-002` and `c10-33` both ask what `free(NULL)` does and both answer
  "nothing". A duplicate across chapters 9 and 10, not a contradiction.
- Four fill questions list the same accepted answer twice (`c2-21`, `c7-49`,
  `c14-19`, `c15-48`). The matcher is case-insensitive, so this is redundant
  rather than wrong.

### New tools

- `tools/dump-questions.cjs` - loads every bank the way index.html does.
- `tools/check-questions.cjs` - structural audit, now part of the suite.
- `tools/list-questions.cjs` and `tools/list-unverified.cjs` - compact dumps for
  reading a bank end to end.
- `tools/check-why-agrees.cjs` - flags questions whose explanation reads closer
  to a different choice than the one marked correct. **Advisory only: it
  produced 71 hits and every single one was a false positive**, because a good
  explanation names the distractors. Kept as a review aid and deliberately left
  out of the suite.

One note on `check-questions.cjs`: choices are compared **byte for byte**. Case
and padding are the whole point of a trace question - "a" against "A", or "42|"
against "   42|" - and an earlier, looser comparison reported seven of those as
duplicate choices. Do not "fix" that back.

---

## 3. Bug fixing - IN PROGRESS, this is where to pick up

No crashes or logic bugs were found in what was covered. Two test suites were
written to close documented coverage gaps, and both pass.

### Written and passing

- **`tools/check-persistence.cjs`** (16 checks) covers the four scenarios that
  CLAUDE-HANDOFF-AUTOGRADER.md lists as untested since the browser test was
  retired: a reward Pokemon routing to a box when the party is full, a full
  rollback when localStorage throws, a draft surviving a reload, and the
  version-2 to version-3 save migration keeping earned autograder submissions
  while clearing self-review ones. **That "Not done" bullet in the autograder
  handoff can now be struck.**
- **`tools/check-calc-region.cjs`** (19 checks). The Converging Isles had almost
  no coverage. It now tests exam gating (gyms 4-6 shut until x1 is beaten, 7 and
  up until x2), boss opening by badge count, the four exam-only revision routes,
  and a real gym battle fought through to a badge with questions drawn from the
  calculus bank.

Both are registered in `tools/check-all.cjs`. **All 14 suites pass.**

### Where the session stopped

About to fuzz the UI: click every button on every screen and watch for thrown
errors. Nothing was written for it yet. That is the obvious next step.

### Open items found but not fixed

1. **`beginGymBattle(n)` does not re-check `gymBlockedBy(n)`.** `goGym(n)` gates
   correctly and is the only route to it through the UI, so a player cannot
   exploit this - but the function that actually starts the battle should repeat
   the check. `js/engine/ui.js:389`.
2. **`favicon.ico` 404s on every load.** Cosmetic. The tab shows a generic icon
   and the console logs an error on every start. An inline SVG data URI in
   `index.html` would settle it.
3. Sweeping all 45 `open*` / `show*` / `render*` functions with no arguments
   made 9 of them throw. All 9 need battle or selection state that did not exist
   at the time. **These are not bugs** - listed so nobody re-investigates:
   `showEvolve`, `showCaught`, `renderDrill`, `showExamReport`, `showMoveMenu`,
   `renderQuestion`, `openPotionMenu`, `openBallMenu`, `showFriendOutcome`.
4. Still untouched from the older handoffs: no mobile visual pass since the
   quest workspace changed, and `sideQuestProgress` still seeds dead
   self-review fields (`buildCommand`, `compiler`, `reflection`, `tests`,
   `compiled`, `attested`) into every record.

---

## Environment and traps

Server `http://127.0.0.1:8780/` (`node tools/serve.js`). Playwright driving Edge
at `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`. Python 3.10.
No git repository, so there is nothing to revert to - snapshot before bulk edits.

**The backslash trap is worse than the older handoff says.** A literal backslash
collapses inside heredocs *even with a quoted delimiter*. It broke four separate
edits this session. What survives and what does not:

- Regex **literals** are fine: a pattern written directly between slashes works.
- A backslash inside a **string** does not. A doubled backslash arrives as a
  single one, so a regex built from a string literal ends up containing a
  backspace character and silently never matches. This one cost the most time
  because it fails quietly rather than erroring.
- In Python heredocs use raw strings, or build the character with `chr(92)`, or
  edit by line index.
- In JS use `String.fromCharCode(92)` for a literal backslash - see the `BS`
  constant in `tools/balance-answers.cjs`.

Always re-read the file after a heredoc edit and assert the match succeeded.
Long prose files are safer written with an editor tool than a shell heredoc;
apostrophes and quotes in the text will break the shell parse.

## Preserve

Personal use only; never distribute. Pokemon assets come from PokeAPI for a
private study tool. Original C-MON names, the Converging Isles region, branching
evolutions, berries, trainer portraits and events, gym dialogue and story must
stay intact. Rewards claimed under the old system must never be granted twice.
Regression sweep after any change: `node tools/check-all.cjs` - C 894 questions
/ 15 gyms / 5 bosses, Calculus 408 / 10 gyms / 4 bosses, both regions error free.
