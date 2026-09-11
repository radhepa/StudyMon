# Handoff: the Calculus II region

## Update - 10 September 2026

The live calculus bank is now **1,607 questions**, of which **1,199 are guided
problems** with three progressive hints and a worked explanation. Every lesson
1-35 has at least ten guided problems in its proper gym or exam-only revision
route.

`calc-questions-quiz2.js` supplies 19 area/volume families and
`calc-questions-tenfold.js` supplies 66 families across every other lesson.
Each of the resulting 85 atomic pencil-and-paper families contains exactly ten
variations, for 850 tenfold family variants. `calc-questions-thomas-topup.js`
also adds 42 original variations aligned to the supplied Thomas PDF. The
supplied PDF is the 13th edition, so provenance says "13e (accessible
reference)" even though the target course uses the 15th edition.
`tools/check-calc-problems.cjs` enforces the family counts, ten-variant rule,
hint/explanation metadata, and gym/exam routing.

Written 2026-09-05 for whoever picks this up next (Codex). Everything below is
on disk and verified running unless a section says otherwise.

---

## What this is

C-MON now holds two subjects instead of one. The C region is unchanged. A second
region, **the Converging Isles**, covers Purdue MA 16200 (Calculus II), built
from `Downloads/Calculus-II-Field-Manual.html`.

The organising idea, which differs from the C region and should not be
"corrected" back: **a gym is a quiz, not a chapter.** A calculus course is shaped
like a calendar, not a table of contents — the manual's own drill script says
*thirty-five lessons, ten quizzes, three evening exams, one final.* So there are
ten gyms (one per quiz) and four boss battles (the exams) that interrupt the run
rather than waiting at the end.

The structure pays for itself: **lessons 10, 11, 20, 27 and 35 appear on no quiz
at all.** The only place the course tests them is an exam. That is what makes the
bosses mandatory content rather than optional review, and it is why each exam
owns a revision route. Do not fold those five lessons into a neighbouring gym.

---

## Architecture: how two subjects share one engine

`js/engine/subjects.js` is the whole mechanism, and it was designed so **no
existing engine file had to change to see the second region**.

Every data file still writes its globals exactly as before. `installSubjects()`
(called from `main.js` on DOMContentLoaded, before anything reads them) captures
`CHAPTERS`, `QBANK`, `GYM_DIALOGUE`, `ELITE`, `LOCATIONS` and `TOWNSFOLK` into
the registry as subject `c`, registers `CALC_SUBJECT` as subject `calc`, then
replaces each of those six globals with an accessor that reads whichever subject
is active. All 23 pre-existing call sites keep working untouched.

**Shared vs per-subject.** The rule is that your Pokémon belong to *you* and your
badges belong to the *subject*:

| Shared across regions | Per subject (`S.progress[id]`) |
|---|---|
| `party`, `box`, `seen`, `caught` | `badges` |
| `money`, `items` | `elite` |
| `friends`, `town` | `chapterStats` |
| `totals`, `settings`, `trainer` | `srs`, `clock` |

`bindProgress(id)` points the flat `S.badges` / `S.srs` / etc. at the active
subject's bucket, so everything that already reads `S.badges` keeps working and
is simply reading a different bucket. `stashProgress()` runs inside `saveGame()`.
`switchSubject(id)` does both and resets `TOWN_LOC`.

**Save migration v4 → v5** is `migrateSubjectSave()` in `subjects.js`, called
from `loadGame()` and `importSave()` *after* `migrateCurriculumSave()` (which
still expects the flat fourth-edition shape). It moves the five flat fields into
`progress.c` and sets `subject:'c'`. It is idempotent. Save key is unchanged
(`cmon.save.v1`) and `v` stays `1`.

---

## Files added

| File | What it is |
|---|---|
| `js/engine/subjects.js` | Registry, progress bucketing, `switchSubject`, `chapterByNumber`, v5 migration |
| `js/engine/ferry.js` | The crossing: berth card, destination modal, `sailTo()`, topbar region chip |
| `js/data/calc/calc-world.js` | 35 lesson titles, 4 units, **10 gyms**, **4 exams**, 9 isles, gym dialogue |
| `js/data/calc/calc-townsfolk.js` | 46 locals across the nine isles |
| `js/data/calc/calc-questions-manual.js` | **GENERATED — do not hand-edit.** 77 questions lifted from the manual |
| `js/data/calc/calc-questions-extra.js` | 136 hand-written questions |
| `tools/calc/extract-manual.cjs` | Pulls the manual's `AUTH` bank out of its `<script id="drill-js">` |
| `tools/calc/build-questions.cjs` | Maps lessons → gyms, entities → Unicode, emits the generated file |
| `output/calc/manual-auth.json` | Raw extraction |
| `output/calc/converted.json` | After mapping, for inspection |

## Files modified

- `index.html` — four calc data files after `curriculum-notes.js`; `subjects.js` after `state.js`
- `js/main.js` — calls `installSubjects()` before the data sanity check; boot log now covers every subject
- `js/engine/state.js` — `freshSave` gains `subject`/`progress`; both load paths migrate and bind; `saveGame` stashes
- `js/engine/ui.js` — `newGame` binds progress; badge counts read `CHAPTERS.length` instead of a hardcoded 15; starter blurb names the active subject
- `js/engine/town.js` — region eyebrow reads `subjectDef().region`
- `js/engine/friends.js` — roster spans `everyPerson()` so friendships survive crossing regions
- `js/engine/town.js` — renders the ferry berth at a region's port; count line mentions it
- `css/ui.css` — ferry berth card, region chip and destination-list styles appended

---

## Notation: no KaTeX, and none is needed

The original plan called for vendoring KaTeX. **That step is cancelled.** The
field manual writes maths in pure Unicode — `∫ₐᵇ (f − g) dx`, `π∫ (f² − g²) dx`,
`∫ₐᵇ √(1 + f′(x)²) dx`, `Σ`, `θ`, `→`, `∞` — and it reads well in the existing
`.qtext` styling.

**Question text is still `esc()`d, so no HTML may appear in a question.** The
converter turns the manual's `<sub>`/`<sup>` tags and `&lt;` entities into
Unicode. Keep authoring that way; a `<` in a question renders as a literal `<`,
which is correct for vectors like `<3, 4>` but means you cannot use markup.

---

## Content status

**408 questions.** Verified: every gym has all four tiers populated, all 35
lessons are reachable, no duplicate IDs, no invalid answer indices, no empty
fields, no HTML leaks.

```
gym:  1:32  2:32  3:33  4:33  5:33  6:33  7:33  8:36  9:34  10:33
exam-only chapters:  91:24  92:18  93:16  94:18
tiers: t1 88 · t2 103 · t3 118 · t4 99
```

Three source files, and they must stay separate:

| File | Prefix | Provenance |
|---|---|---|
| `calc-questions-manual.js` | `k<ch>-m-` | **GENERATED** from the field manual's own drill bank |
| `calc-questions-extra.js` | `k<ch>-x-` | Hand-written, first batch — mostly definitions and method |
| `calc-questions-more.js` | `k<ch>-y-` | Hand-written, second batch — weighted to computation, tiers 3-4 |

Add new work to a **new** file with a fresh prefix rather than growing these, and
never hand-edit the generated one.

Chapters **91–94** hold the exam-only lessons (91 → L10+L11, 92 → L20, 93 → L27,
94 → L35). They are keys in `QBANK` with no `CHAPTERS` entry, which the engine
accepts. Exams should pull `chapters: [...gyms, ...its own 9x]`.

### The gyms

| # | Quiz | Lessons | Topic | Leader | Badge | Type | Ace |
|---|---|---|---|---|---|---|---|
| 1 | Q1 | 1–4 | Vectors | Rhea Dexter | Arrow | flying/fighting | Machamp |
| 2 | Q2 | 5–6 | Areas and Slices | Della Twain | Between | grass/steel | Leafeon |
| 3 | Q3 | 7–9 | Shells, Arc Length, Work | Axel Turner | Revolution | steel/bug | Klinklang |
| 4 | Q4 | 12–14 | Trigonometric Integrals | Cosima Wave | Identity | electric/fairy | Ampharos |
| 5 | Q5 | 15–17 | Substitution & Partial Fractions | Thea Sinclair | Triangle | ghost/ice | Mimikyu |
| 6 | Q6 | 18–19 | Improper Integrals & Sequences | Lim Everard | Infinity | dragon/normal | Rayquaza |
| 7 | Q7 | 21–23 | Series & the First Tests | Cora Verge | Convergence | poison/water | Toxapex |
| 8 | Q8 | 24–26 | Alternating & Choosing a Test | Alta Rennick | Alternating | dark/poison | Crobat |
| 9 | Q9 | 28–31 | Power & Taylor Series | Rae Diuss | Radius | psychic | Alakazam |
| 10 | Q10 | 32–34 | Taylor at Work & Polar | Rose Kardia | Rose | fairy/psychic | Florges |

### The exams

| id | Name | Fought after gym | Lessons | Only here |
|---|---|---|---|---|
| `x1` | Elara Slate | 3 | 1–11 | 10, 11 |
| `x2` | Otto Graff | 6 | 12–20 | 20 |
| `x3` | Sera Conn | 8 | 21–27 | 27 |
| `final` | Dean Aster (Champion) | 10 | all 35 | 35 |

---

## What is NOT done — pick up here

Ordered by what blocks play.

1. ~~Nothing exposes `switchSubject()` in the UI.~~ **DONE** — see the ferry
   section below. `S.subjectNotice` is still set by the migration and still
   unread; it was meant to drive a one-time "the Isles have opened" panel and
   could be deleted instead.

2. ~~The exams are data only.~~ **DONE** — see "Boss placement" below.

3. **Exam revision routes.** Each exam has a `route` string and no wild-battle
   entry point. The exam itself now draws from the 9x chapter, so the exam-only
   lessons are *tested*, but there is still nowhere to *practise* them before
   sitting the paper. A "Revision route" button on the boss row would fix it.

4. **The question bank is usable but not full.** 408 against the C region's 894.
   ~33 per gym is enough that spaced repetition has room to work; ~55 would match
   the C region. Add a new file with a fresh ID prefix (see the table above). The
   `mc()` helper rotates the correct answer's position automatically.

   Two things to watch when authoring: an integrity sweep that greps for `<`
   will flag vector notation like `<a, b>` and `<3, 4>` as an HTML leak — it is
   not, question text is escaped and renders verbatim. And a duplicate-stem check
   that strips non-alphanumerics will collapse `√(a² − x²)` and `√(a² + x²)` into
   the same string and report deliberate contrast pairs as duplicates.

5. **The ten quizzes are unmapped.** The manual has `QUIZ_DATE` (Sep 3 … Dec 3).
   Idea from the plan, not yet built: surface them on the Drill screen as ten
   dated checkpoints.

6. **No portraits.** `CALC_FOLK_PORTRAITS` is an empty object. The pipeline is
   `tools/normalize-portraits.py` — hand-measure face landmarks, output 460×460.

7. **Notes for the exam-only lessons.** `CHAPTERS` entries carry `notes[]` and
   the ten gyms have them. Chapters 91–94 have questions but no notes, so the
   Study screen shows nothing for L10, L11, L20, L27, L35.

8. **`js/data/calc/calc-townsfolk.js` sets `CALC_LOCATIONS_READY`** and it is
   never read. Harmless; delete it or use it.

### Known cosmetic leaks not yet chased

Hardcoded C strings may still surface elsewhere in `ui.js`. The four found so far
are fixed (region eyebrow, topbar badge denominator, trainer card badges, starter
blurb). The title screen still says "A FIELD GUIDE TO C" and "Fifteen routes",
which is correct while the C region is the entry point but will read wrong once
subject switching ships.

---

## Boss placement

There is **no Elite Four on the Isles.** The three evening exams are scattered
through the run at the point the real course sits them, and only the Final is
last. The C region is unchanged: its five bosses still bunch at the end under a
"Victory Road" heading.

Both are the same data with a different `after` number, and one code path in
`renderMap()` draws both. `after` is the gym number a boss stands immediately
behind; `bossAfter(e)` defaults it to `CHAPTERS.length`, which is why the C elite
need no `after` at all and land at the end automatically.

The helpers live in `subjects.js`:

| Function | What it answers |
|---|---|
| `mapStops()` | Gyms and bosses in the order you meet them |
| `bossAfter(e)` | Which gym a boss stands behind |
| `bossOpen(e)` | Do you have the badges to challenge it |
| `bossBeaten(e)` | Have you cleared it |
| `gymBlockedBy(n)` | The unbeaten boss standing in front of gym n, if any |
| `isChampion(e)` | Replaces three hardcoded `id === 'champ'` checks |

**A boss gates everything behind it.** `goGym` and `goWild` refuse, and the map
dims the row and disables its buttons. The Isles therefore run:

```
g1 g2 g3 [Elara Slate @3] g4 g5 g6 [Otto Graff @6] g7 g8 [Sera Conn @8] g9 g10 [Dean Aster @10]
```

This is deliberately more linear than the C region, where no gym is ever blocked.

Each exam pulls its own exam-only chapter — `x1` draws `[1, 2, 3, 91]`, and the
Final draws every chapter including all four 9x. Verified: 200 sampled draws from
Exam I spanned lessons 1 through 11, lessons 10 and 11 included.

`subjectDef().bossTitle` drives the "Victory Road" heading. The Isles deliberately
do not set one, so their exams render inline with no section break. If you add a
third subject and want an end-game wing, set `bossTitle`; leave it off for a
course whose exams are just the next thing on the calendar.

---

## Levels

Before this pass every opponent level was `playerLevel()` with a small offset and
nothing else, so the fifteenth gym leader opened with a level 7 against a fresh
level 5 starter and a level 50 Blaziken ended any gym in one question. Levels
were decoration.

Gyms and bosses now have a **positional floor**, and player-scaling may only push
them up from it:

    level = max(floor for this gym's place in the region, your level - 3)
    ace   = that + 3

Calibrated against the real games, not invented. Averaging ace levels across
Kanto, Hoenn and Sinnoh gives about 14, 21, 25, 30, 34, 40, 45, 50 for the eight
gyms, which is very nearly a straight line — so a linear floor over however many
gyms a region has reproduces the real shape. `LEVEL_FLOOR_MIN` 12 and
`LEVEL_FLOOR_MAX` 47 plus `ACE_BONUS` 3 land the first ace on 15 (Brock's Onix is
14) and the last on 50 (Giovanni's Rhydon is 50).

The scale-up aims **below** your best (`SCALE_UNDERCUT` 3), because in a real
playthrough you arrive at a gym slightly over-levelled and win. Sitting the gym
permanently above the player would punish exactly the heavy repeated play this
game is built for.

Bosses step above the gym they follow rather than continuing the slope: +4 for an
ordinary boss, +13 for a champion, and bosses sharing a slot ramp +2 against each
other so an Elite Four reads 51/53/55/57 rather than four identical teams.

Team size is positional (`gymTeamSize`), two early and three later. Four would
make a gym a fifty-question sitting, since every attack costs a question.

```
C region   12/15 15/18 17/20 20/23 22/25 25/26/28 ... 47/48/50   E4 51-61, Champion 60-66
Isles      12/15 16/19 20/23 24/27 28/29/31 ... 47/48/50
           exams: Vera 24-28, Otto 35-39, Sera 43-47, Final 60-66
```

**Wild routes are deliberately excluded from the floor.** They still track your
party exactly, which is what keeps every chapter studiable tonight even when its
gym is far beyond you. The study function lives on the routes and the Drill
screen; the gym is the part you have to earn.

Map rows carry a `Lv ~n · k Pokémon` hint, amber when the fight is more than six
levels above your strongest. `gymExpectedLevel()` / `bossExpectedLevel()` must
keep matching what `gymTeam()` / `eliteTeam()` build — change one, change the
other.

---

## Route encounters

`js/data/encounters.js` is **generated** by `tools/build-encounters.cjs`. Each
route has a fixed table of 12 species banded common (5) / uncommon (4) / rare (3),
drawn at a 10 / 4 / 1 weighting. Before this, wild encounters were picked live
from "anything of the right type under a BST cap", so a route had no identity and
there was nothing stable to show the player.

271 distinct species across the 25 routes, of 1025. That is deliberate — there is
room left for the subjects still to come. Legendaries are excluded from the
tables and still roam at 3% from five badges.

Re-run after adding a region:

```bash
node tools/build-encounters.cjs
```

The generator is seeded, so re-running gives identical tables. Species are banded
by route position (unevolved early, evolved late) and, where the type lists allow,
not repeated within a region.

**Route info** (`openRouteInfo` in `ui.js`) shows that table as a grid with three
states, the way the games do it: unseen is a black silhouette with `???`, seen is
a silhouette *with* the name, caught is the sprite in full colour. Note the grid
uses `.routegrid` / `.routecell` — **not** `.dexcell`, which the Pokédex screen
has used since long before this and would be restyled by a collision.

---

## The ferry

`js/engine/ferry.js`. Two ways to reach it: a **berth card** that renders first in
the region grid at each subject's departure location (`FERRY_PORT = { c: 'town',
calc: 'harbour' }`), and an **anchor chip in the topbar** naming the region you
are standing in. Both open the same modal, which lists every other registered
subject with its book, gym count and how many badges you have earned there.
`sailTo(id)` switches subject, lands you at that region's port, records
`S.visited[id]`, saves, and re-renders.

**It is deliberately ungated, and should stay that way.** C-MON is a study tool
for real classes with real exam dates; gating the calculus region behind C badges
would mean that in the week before a calculus midterm the game refuses to teach
calculus. The content *inside* each region is gated by that region's own badges.
Getting to the region is not.

Adding a third subject needs only a `FERRY_PORT` entry — the modal builds itself
from the registry.

---

## How to verify a change

```bash
node tools/calc/build-questions.cjs
```

Regenerates the manual half and prints per-chapter tier coverage plus any empty
tiers. Then in the browser console:

```js
switchSubject('calc');
Object.keys(QBANK).map(k => k + ':' + QBANK[k].length).join(' ');
```

The full audit used during the build checked: tier coverage, all 35 lessons
reachable, duplicate IDs, answer indices in range, empty fields, HTML leakage.
Beware a naive duplicate check that strips non-alphanumerics — it collapses
`√(a² − x²)` and `√(a² + x²)` into the same string and reports four false
positives that are actually deliberate contrast pairs.

## What was verified working

Both subjects register at boot. Switching flips chapters (15↔10), locations,
townsfolk, elite and the question bank. Badges are per-subject and survive a
round trip in both directions. Party and money cross unchanged. A gym battle on
the Isles runs end to end, draws a correctly-attributed question and renders
Unicode notation. A pre-subjects v4 save migrates with badges, elite, SRS counts,
clock, chapter stats, money, party and friendship points all intact, and both
progress buckets survive a save/reload from disk. No console errors.

---

## Audit, 5 September 2026

A full pass over both regions after the Calculus II work landed. Everything below
was found by testing, fixed, and re-verified. Final state: **0 errors** across
every screen, every chapter, every route, every gym and boss team, every
location, both regions, and all 1107 questions.

### Fixed — would have broken play

1. **`renderQuestion` crashed on every exam-only question.** `CHAPTERS[chNum - 1]`
   with `chNum` of 91–94 indexed off the end of the array. About a quarter of
   Exam I's draws come from chapter 91, so the exams — the whole point of the
   boss structure — would have died the first time you fought one. Fixed by
   routing every chapter lookup through `chapterByNumber()`.

2. **Six more `CHAPTERS[n - 1]` lookups** in battle.js, ui.js (×3), town.js and
   friends.js. Latent for now because both regions happen to number chapters
   1..N in array order — but exactly the same bug waiting for the next region.
   All replaced. There are none left; keep it that way.

3. **Cross-region friendships were invisible.** `townsfolkById()` searched only
   the active region's cast, so someone befriended on the Isles vanished from the
   Friends screen the moment you sailed home — the precise opposite of the shared
   -friendship rule this document promises. It now falls back to `everyPerson()`.

4. **Switching region mid-battle left the battle live**, holding chapter numbers
   from the region you had just left, so its next question would be drawn from
   the wrong bank entirely. `switchSubject()` now ends any live battle first.

5. **`goStudy()` crashed on exam-only chapters** — `CURRICULUM_PRACTICE[91]` is
   undefined and the code indexed it without a guard.

### Fixed — wrong content, not crashes

6. **Calculus chapters showed C coding exercises.** The Notes screen printed
   "Write some C" with a C exercise over a calculus chapter, because
   `CURRICULUM_PRACTICE` is keyed by bare chapter number and calc chapters 1–10
   collided with C chapters 1–10. The practice panel is now C-only.

7. **The fourth-edition textbook note** (ISBN, C99/C11, publisher links) rendered
   over calculus chapters. Now subject-scoped, with the Isles getting their own.

8. **The curriculum-migration notice** appeared on the Isles' map. Now C-only.

9. **The mock exam** said "drawn from all fifteen chapters" in both regions.

10. **The drill header** read "Drill, Chapter 91" for exam-only chapters.

11. **`renderStudy` could not reach exam-only chapters at all** — the chapter
    picker only listed `CHAPTERS`. It now lists `studiableChapters()`, with the
    four exam chapters marked ✦, and offers "Sit Evening Exam I" instead of a
    gym button.

### Fixed — smaller

12. **Bottom nav had six grid columns for seven buttons**, leaving Friends alone
    on a second row at mobile widths. Now a deliberate 4 + 3. Pre-existing.

13. **`buyItem` corrupted money on a non-numeric quantity** — `NaN` slipped past
    the affordability check and was written to the save. Unreachable from the UI,
    which always passes a literal, but money corruption is worth a guard.

14. **`S.visited` was only ever created lazily** inside `sailTo`. Now declared in
    `freshSave()`.

15. Earlier the same day: a `.dexcell` class collision that would have restyled
    all 1025 cells of the Pokédex screen (route info now uses `.routecell`), and
    route sprites sized wrong because `#modal .box img` in two older stylesheets
    outranked the new rule.

### Checked and correct — no change needed

- `partyAlive()`, shiny odds (measured 1 in ~1300 over 20,000 rolls against a
  1/1000 target — within noise), the catch formula, PC deposit/withdraw, shop
  purchase, heart events and outings in both regions, town interactions, mock
  exam in both regions, fainted-party refusals, and the title→Continue path.
- Save integrity: a fully populated two-region save survives export → wipe →
  import → disk reload with badges, elite, SRS, clocks, chapter stats, money,
  party, box, caught, seen and friendship points all intact. (`S.friends` grows
  as `ensureFriends` seeds blank records for the active cast — expected, and
  those records have `met:false` so they never show.)
- Full C-region regression: 15/15 gyms winnable, 5/5 Elite Four start, 15/15
  routes give encounters, 15/15 route panels render, 894 questions well-formed.
- Full Isles progression: gyms 1–3 → gym 4 refused with the right message →
  Exam I opens at 3 badges and draws chapter 91 → gym 4 opens → gym 7 gated by
  Otto Graff.

### Traps for whoever works on this next

- **Never index `CHAPTERS` by `n - 1`.** Use `chapterByNumber(n)` or
  `chapterTitle(n)`. Chapters 91–94 exist in `QBANK` and in `EXAM_CHAPTERS` but
  not in `CHAPTERS`, and a third subject may not start at 1 either.
- **Anything keyed by bare chapter number collides across subjects.**
  `CURRICULUM_PRACTICE[1]` is C chapter 1 and there is nothing stopping calc
  chapter 1 from reading it. Scope by subject before using such a table.
- **`log` is a bare global function** in battle.js. Declaring `var log` in a
  console snippet clobbers it for the rest of the page's life.
- **Party Pokémon have no `maxhp` field.** Max HP is derived; `p.hp = p.maxhp`
  silently sets `undefined`.
- **`goGym(n)` opens the leader's dialogue modal, it does not start a battle.**
  `beginGymBattle(n)` is the second step. Any test that calls only `goGym` will
  wrongly conclude the gym is blocked.


## Character names, 6 September 2026

Overlapping Isles names were changed; original C-region names are untouched.
- Quill -> Tobin
- Bram -> Leif
- Nurse Wren -> Nurse Nessa
- Hollis -> Celia
- Fen -> Ludo
- Pim -> Ivo
- Vera Slate -> Elara Slate
- Dean Sorrel -> Dean Aster

Internal character IDs remain unchanged to preserve saved friendships and progression.
