# Checking the game

`node tools/check-all.cjs` runs twelve suites against a real browser: the type
chart against the canonical matchups, the damage and catch formulas, every
species and question referenced anywhere, real wild and gym battles played to
completion, catching, evolution, the ferry, the PC, the spaced review boxes, all
750 friend scenes, and the Side Quest autograder. Every run seeds its own save
in throwaway storage, so your own save is never touched. See TESTING.md.

Portraits are not covered there. After importing art, rebuild the contact sheets
and look at them; tools/reframe-portraits.py holds the per-character framing
corrections.

# Your house has a purpose now

Three pieces of furniture in **Your Home** (Bootstrap Town) do something. Walk up
and press **E**.

**The notebook on the study desk — your journal.** One page per in-world day,
stamped with the real date. It counts the questions you answered and your
accuracy, which chapters you practised, who you talked to and how often (with a
bar chart, so "who did I spend the day with" has an answer), battles, catches,
money in and out, where you went, and a short list of the day's headlines. Sixty
days of pages are kept; earlier ones are one click away.

**The chest — your collection.** Three categories, thirty items: *River Catch*,
*Hollow & Meadow* and *Bootstrap Keepsakes*. A locked item shows where to look
rather than a question mark, so the list doubles as a to-do list. The keepsakes
are live today — each one marks a first, like your first badge, first catch or
first crossing. Fishing and searching, which fill the other two, are designed
but not yet built.

**The aquarium and the terrarium** display *River Catch* and *Hollow & Meadow* as
scenes rather than grids. They work from glyphs today; painted tokens and the
props in the room art are the next pass.

See [COLLECTABLES.md](COLLECTABLES.md) for the full design, the source model and
the art brief. `node tools/check-house.cjs` proves all of it through the real
hotspots.

### Temporary: one-click crossing to the Converging Isles

While the Riverside Pier is rebuilt, a dashed orange chip sits beside the
StudyMon logo and sails you straight to the other region (and back). It is meant
to be deleted: `js/engine/temp-calc-warp.js` says how, in three steps.

---

# Side Quests are live

Thirty Pokemon-themed C programming labs are available from **Side Quests** in the bottom navigation. Ten easy, ten medium, ten hard. Each has a saved source workspace, lab brief, chapter guide, hints and a one-time reward. You write the C in StudyMon, press Run to try it, and press Submit to have it graded. Submitting compiles your program with Clang inside the app and runs it against every test for that lab; the reward is granted only when all of them pass. Nothing leaves your machine and no other tools are needed. Reward berries can be used from the Party screen.

See [the Side Quest handoff](HANDOFF-side-quests.md) and [lab catalog](output/Side%20Quest%20Curriculum.md).

---

# Calculus II practice coverage

The Converging Isles now has **1,607 questions**, including **1,199 guided
problems**. Every one of the 35 lessons has at least ten guided problems in its
own gym or exam revision route. Guided problems reveal three progressively
stronger hints and then a complete worked explanation, so the study loop does
not depend on an external AI tutor.

All ten gyms and the exam-only revision routes now share the same tenfold rule:
**85 explicit pencil-and-paper problem families each contain exactly 10
variations** (850 family variants total). Quiz 2 contributes 19 area-and-volume
families; the other lessons contribute 66 families covering vectors, integration
methods and applications, sequences and series, Taylor work, and polar calculus.
The added Thomas-aligned questions are original variations. The supplied PDF
identifies itself as the 13th edition, so its provenance is labeled as the
accessible 13th edition even though the target course uses the 15th edition.

# Fourth-edition curriculum alignment

The current game has 894 questions and follows the fourth-edition ISBN 9780357506134 chapter order, including Chapter 15: Recursion. All old question IDs remain available. Notes and self-check coding tasks cover every chapter.

See [the curriculum review](output/curriculum/Curriculum-review.md) for sources, coverage, save migration details and validation limits. The older entries below describe earlier versions.

---

# Catch rates, a Centre everywhere, and befriending the region

## Catching now uses the real formula

Catch odds are the Gen III/IV calculation, not an invented one:

    a = (3 × maxHP − 2 × curHP) × catchRate × ballBonus / (3 × maxHP) × status
    b = 1048560 / √√(16711680 / a)

then four 16-bit shake checks, exactly as the games do it. Every species carries
its real `catchRate` from PokéAPI, so a Caterpie (255) and a Lugia (3) are as far
apart here as they are there. Critical captures scale with how much of the
Pokédex you have filled.

The study layer replaces the status condition. Answering the question wrong is
the penalty (0.6×), answering it right is roughly a Sleep-grade bonus (1.5×), and
three correct in a row is "focus" (2.0×). So the way to catch something rare is
to be answering well when you throw.

Measured over 60,000 throws each, and cross-checked against the game's own
`catchChanceOf()`:

| Species  | Rate | Full HP, Poké Ball, correct | Same but wrong | 1 HP, Ultra Ball, focus run |
|----------|-----:|----------------------------:|---------------:|----------------------------:|
| Caterpie |  255 |                       50.0% |          19.6% |                        100% |
| Pikachu  |  190 |                       37.1% |          15.0% |                        100% |
| Snorlax  |   25 |                        4.9% |           1.9% |                       39.2% |
| Lugia    |    3 |                        0.6% |           0.2% |                        4.9% |

Worth knowing before you go legendary hunting: 4.9% is the *best* case for a
rate-3 Pokémon — worn to 1 HP, Ultra Ball, three correct answers running. That is
about 20 throws, and every throw costs a question while it attacks back. The
figure is accurate to the real games; it just lands differently when each ball is
a quiz. If it feels too steep, the two numbers to turn are `catchStatusBonus()`
and `BALLS[].mult` in `js/engine/battle.js`.

## A Poké Centre in every location

All nine locations have one, staffed by their own nurse. Resting is free, and
it nudges your friendship with the nurse.

## The whole region can be befriended

Anyone in the cast can become a friend, not just the five companions. The two
tiers share one system:

- **Companions** (`js/data/trainers.js`) — portrait, partner Pokémon, seven
  bespoke heart events, outings.
- **Townsfolk** (`js/data/townsfolk.js`) — three heart events drawn from their
  profession's arc in `js/data/folk-events.js`, with their own name written in.

`castMember()` in `friends.js` flattens both into one shape. Cross 100 friendship
points and someone moves out of the region screen and into Friends, with their
own lettered disc, team and rematch button.

Badges drift you closer to anyone you have met, but only companions drift fast
(12 points a badge). Townsfolk drift at 4, so all fifteen badges are worth 60 —
never the 100 a friendship needs. Meeting someone and then ignoring them for the
whole game leaves them at 80 and still not a friend. Badges open the door; you
have to walk through it.

## Befriending is gated, in two ways

Locations open on badges — Bootstrap Town, the Café and Meadow Route from the
first day; Riverside Pier at 2, Stack Ridge at 4, the Archive at 5, the Lab at 7,
Null Cavern at 9, Gym Quarter at 11.

Sixteen individuals then want more badges than their location does, and refuse
you in their own words until you have them. Gus wants three before he will spar;
Odile wants fourteen. Their cards dim and carry a ✦ until you qualify. No nurse
or shopkeeper is ever gated.

The cast opens up like this: 23 of 79 reachable at zero badges, 34 at three, 50
at six, 68 at nine, all 79 by fifteen.

## A lab, and a professor named after a tree

Linden Research Lab opens at seven badges: Professor Linden and six researchers
(Ashling, Hollis, Yewell, Birkin, Nimue and Oakes), a requisitions counter and
Nurse Sorrel. The cast is now 84 — 79 townsfolk and 5 companions.

---

# A cast, an economy and a shop

Sixty-three townspeople across eight locations, plus the five companions: 68
characters. They live in `js/data/townsfolk.js` and each does exactly one thing:
battle you, run a counter, heal your party, hand over an item once, or say
something worth hearing. Thirty-nine will battle, and their teams grow with your
badges the same way the companions' do.

Their battles are deliberately chapter-agnostic. Each character suggests a chapter
that suits them, but you choose what to revise before the match, so the cast
survives StudyMon growing past C. Swap the curriculum and Ari the Bug Catcher still
wants to fight you about whatever you are revising this week.

Poké Balls are free and unlimited. Running out of them was never the interesting
constraint, and being unable to catch something because you were short a
consumable is an errand rather than a decision. What money buys is a BETTER ball:
Great Balls are 1.6x and Ultra Balls 2.4x on the catch roll, so the question
becomes "is this one worth an Ultra Ball", which is a real decision. Mid-battle
you pick which ball to throw and the menu shows the actual odds for each.

Prize money comes from battles: wild Pokémon pay a little, the region's trainers
pay more, gym leaders and the Elite Four pay best, and a run of five correct
answers pays a bonus. The shop also stocks Potions and Super Potions.

A save from before the shop is migrated on load: the old ball count becomes Great
Balls rather than vanishing, since basic balls are free now. The migration keys off
the presence of the old fields and then deletes them, not off a flag, because
loadGame backfills any key missing from freshSave and would have marked a legacy
save "already migrated" before the migration ever ran.

---

# Scenes, growing rivals, shinies, new clearing

Heart events play as short scenes rather than a single choice. Each one now runs
three beats with two choices at every beat, and the scene keeps what already
happened on screen so it reads as one continuous story. Beat one still comes from
`trainers.js`; beats two and three live in `js/data/event-beats.js`, 70 new beats
and 140 choices across the 35 events. Leaving mid-scene is safe: the beat and the
choices so far are saved, and the resume banner says which part you are on. A save
that already completed an event keeps it completed, and a history entry written by
the old single-choice version still replays.

The trainers keep pace with you. Each has a roster of six now, bringing one more
Pokemon every three badges and evolving the whole team a stage every five, so
Rowan opens with Riolu alone and finishes with Lucario, Staraptor, Luxray,
Machamp, Ursaluna and Tyranitar. The partner on their card evolves too, and their
page lists the current team with a note about what the next badge brings.
`scaleSpecies` still trims anything that would badly outclass your own party.

Shiny Pokemon are 1 in 1000. A shiny wild encounter announces itself in the battle
log and in a toast, because at those odds it should be an event.

The battle scene uses a new forest clearing. It has no platforms, so the standing
spots were chosen by sampling the artwork for open ground: both are about 70% bare
earth with under 10% tree root, clear of the pond and the trunks, and the contact
shadow was strengthened to do the grounding the platforms used to do.

---

# Trainer headshots

The cards show head-and-shoulders portraits, cut from the full-body artwork by
`tools/make-trainer-heads.py`. They inherit the transparent cut-out from
`make-trainer-art.py`, so there is no white box behind them.

The crop is found from the drawing rather than guessed. Width thresholds do not
work on these designs, because a ponytail or a wide fringe makes a head as broad
as a pair of shoulders; the neck is used instead, being the narrowest point
between hair and shoulders, and it sits directly under the face. Each row is
measured by its longest unbroken run rather than its extent, so Ellis's floating
paint spatter and raised brush are not mistaken for part of her. Every portrait
is framed from just above the hair to a little past the shoulders, giving five
faces at the same size and height in a uniform 0.86 frame.

The leftover offsets in `TRAINER_HEAD_SHIFT` are measured by skin tone, because a
silhouette measure is dragged sideways by hair: June's outline reads 6% off centre
while her face is 0.7% off. All five faces now land on the card centre line.

---


# Portrait centring and sprite seating

Trainer portraits are now centred on the trainer's HEAD rather than on the image's
bounding box. Each figure is drawn off-centre in its own file, by as much as 16% of
the image width, so centring the file left the faces visibly off to one side. The
head position of each portrait was measured from the alpha channel across the face
band and stored in `TRAINER_HEAD_SHIFT` (js/data/trainers.js); the CSS shifts each
portrait by the negative of that. All five heads now land on the card centre line.

Battle sprites sit on their platform properly. Two things were wrong. The scene had
a `max-height` cap, which clamped the height while leaving the width alone, breaking
the aspect ratio so `background-size: cover` cropped the artwork and the platform
anchors no longer matched what was on screen; the cap is applied to the width now, so
the ratio always holds. And the per-sprite offset was a single averaged guess, while
the transparent gap below a creature in its 96x96 frame actually ranges from 8% to
34%. `tools/measure-sprites.py` now measures every sprite's opaque bounds at build
time into `js/data/sprite-seat.js`, so each Pokemon is seated exactly. Worst case
across the roster is 0.13% of the scene height, and it works when the game is opened
straight off the disk, where reading pixels back from a canvas is not permitted.

---

# Battle scene, PC storage and a UI pass

Wild battles now use an illustrated forest clearing (`assets/ui/battle-forest.png`).
The two stone platforms were measured from the artwork, so sprites are anchored in
percentages and stay on their platform at any window size. Gym, Elite Four and
practice matches reuse the same clearing with a different light so each battle type
still reads differently.

The party screen is now a Pokemon storage system: your party down the left, a paged
box grid of thirty slots in the middle, and a detail panel on the right. Click a
Pokemon to select it, then use the panel or click an empty slot to move it. Nicknames
open a proper dialog. The old Nickname button called `prompt()`, which browsers block,
so it appeared to do nothing.

The Pokemon Kingdom gives that same roster a life outside storage. Party and PC
Pokemon wander a six-district, top-down pixel-art forest town, greet nearby friends
and can be selected for a closer look. Kingdom Green, Lantern Square, Berry Market,
Riverside Walk, Hearthside Lane and Moonbell Hill are joined by walkable paths and
share one visual language. Every owned Pokemon is assigned to exactly one district,
the population grows with the collection, and everyone changes district at the top
of each real-world hour. The assignment is derived from the roster and clock, so it
needs no save change. The town also follows Indianapolis Eastern Time through dawn,
day, dusk and night. Rain combines layered falling streaks, ground-impact splashes,
mist and a three-layer procedural audio bed with its own mute control. Twenty painted
lanterns across four districts gain hand-placed, softly flickering light at night.
Hand-authored walkable polygons and padded scenery colliders keep residents on open
ground and off buildings, water, stalls, rocks, bridges, fountains, benches and lamp
fixtures. Pokemon remain non-solid, so friends can still bunch up naturally. Each
district also has an original, low-fatigue procedural score with its own tempo,
meter, harmony and lead voice; moving between districts crossfades their themes.

Bootstrap Town has its own original procedural theme, **Sunlit Steps**. Its calm
16-bar melody, soft pizzicato walking pulse, warm sustained harmony, bass and
occasional bell flourish share the inviting feel of a classic creature-adventure
town without borrowing an existing game melody. The arrangement softens indoors
and at night, continues cleanly between town scenes, and fades out when the player
leaves Bootstrap Town. A labeled music toggle in the town HUD controls it.

The human community now has a connected 18-scene foundation. The original square
links to the Compiler Café district, Meadow Route, Riverside Pier, Stack Ridge,
the Archive, Linden Research Grounds, Null Cavern settlement, the Upper Quarter,
Cottage Row, Meadow Homesteads, Riverside Row, Hillcrest Terrace and Cavern
Hollow, alongside the original interiors. Forty-five registered homes account for all 84 existing
community members. Every visible home marker has a doorstep that both player and
NPC navigation can reach; the nine nurses share the large Nurse House in Cottage
Row. This pass deliberately adds locations and housing only, not the full 84-person
schedule simulation.

The in-game Town Map presents all fourteen outdoor districts as one continuous
landscape and draws only connections that exist as bidirectional gameplay portals.
Seventeen public buildings and work sites now have the same reachable, interactive
approach contract as homes. Navigation tests flood-fill every player and NPC walk
cell and require exact portal coordinates, preventing nearest-path snapping from
hiding a blocked entrance. Riverside Pier now has continuous boardwalk access to
the watermill, kiosk, ferryman hut, central dock, and every scene exit.

Trainer portraits are shown whole on a shared baseline instead of being cropped by a
fixed frame, and each partner Pokemon sits in its own corner badge rather than over the
trainer. Card heights, route buttons and grid rows were levelled across every screen,
checked at 390, 768, 900 and 1180 pixels wide.

Both local servers now send no-cache headers and `index.html` version-stamps its own
CSS and JS, so an updated game file is never served from a stale browser cache.

---

# Starter selection and visual refresh

Choose from 29 unique starters: the nine regional trios from Kanto through Paldea, plus Pikachu and Eevee. Region filters include the Hisui and Legends Z-A selections. Those filters select base species; regional evolution forms are not implemented. Preview a partner before confirming.

The interface uses offline system fonts, a green-and-cream field-journal theme, responsive starter cards, larger study text, keyboard focus indicators and reduced-motion support. Existing saves remain compatible.

---

# Full National Pokédex update

The roster imports all species returned by PokéAPI (1,025 at this update), using each species’ default form, then adds the original Papyrunt → Codexal → Lexidrake StudyMon line as IDs 1026–1028. Regional forms, Mega Evolutions and other alternate forms are not separate entries. Existing save IDs and all 774 study questions remain unchanged.

All species have local front, back, shiny and artwork image paths. Where PokéAPI lacks a back or shiny sprite, the regular front image is used as a fallback. Cries play only when an audio file was successfully downloaded.

Twenty percent of ordinary encounters draw from all types, allowing Fire and Dark visitors on any route. The strength cap expands with badges; legendary encounters still begin after five badges. Special evolution requirements continue to use the game’s simplified level rules. Branch evolutions follow the first eligible branch; other branches can be caught directly.

Run `node tools/fetch-pokeapi.mjs` followed by `node tools/build-data.mjs` to refresh the roster.

---

# StudyMon — a C study RPG

A Pokémon-style game built on top of **Forouzan & Gilberg, *Computer Science: A
Structured Programming Approach in C***. Fifteen routes, one per chapter. Every
attack costs you a C question, and the stronger the move, the harder the question.

Personal study tool. Nothing is published or shared anywhere.

---

## How to start it

Double-click **`Play StudyMon.bat`**. It starts a tiny local server and opens your
browser. Leave the black window open while you play; close it when you're done.

You can also just double-click `index.html` — but some browsers refuse to save
progress for pages opened straight off the disk, so the launcher is the safe
route. The game tells you if that's happening.

Everything runs offline. The full National Pokédex — all 1025 official species —
was pulled from [PokéAPI](https://pokeapi.co) once and lives in `assets/`. Three
original StudyMon extend that roster, bringing the playable total to 1028.

---

## How the game works

**Battles are the quiz.** You pick a move; the game asks a C question whose
difficulty matches that move's power:

| Move tier | Unlocks at | Question type |
|---|---|---|
| ★☆☆☆ | Lv 1 | Recall — definitions, syntax, "which header" |
| ★★☆☆ | Lv 8 | Apply — short traces, single-concept output |
| ★★★☆ | Lv 18 | Analyse — multi-step traces, bug hunts |
| ★★★★ | Lv 30 | Synthesis — undefined behaviour, subtle gotchas |

- **Right answer** → your move lands, and the counter-attack only does 35% damage.
- **Wrong answer** → your move fizzles and the opponent hits for 150%.
- Answer fast for a damage bonus; build a streak for another. Five in a row earns
  a Poké Ball.

Knowing the material is what wins battles — the numbers were tuned by simulation
so a gym win runs about 85% at near-perfect accuracy, ~55% at 70%, and under 10%
at 45%. You cannot grind your way past not knowing chapter 9.

**Seven starters.** The Kanto trio, the Johto trio, and Torchic — whose Fire/Fighting
line mauls the Steel of Chapter 12 and the Rock of Chapter 8.

**Legendaries roam.** Once you hold five badges, about 3% of wild encounters turn up
something that should not be there — all twelve legendaries and mythicals are
findable and catchable, Latias included. They arrive above your level and resist
the ball hard.

**Levels scale to you.** Wild Pokémon and gym leaders are always near your own
party's level and evolution tier, so route 14 is playable on the night you're
actually studying bitwise operators. Every route is open from the start.

**Chapters map to types** as a mnemonic:

| Ch | Topic | Type | Gym Leader |
|---|---|---|---|
| 1 | Introduction to Computers | Normal | Byte |
| 2 | Introduction to the C Language | Grass | Vera Bell |
| 3 | Structure of a C Program | Electric | Ohma |
| 4 | Functions | Fighting | Callum |
| 5 | Selection — Making Decisions | Psychic | Elsie Fitz |
| 6 | Repetition | Flying | Willa Doo |
| 7 | Text Input/Output | Water — *a stream* | Scanlon Prince |
| 8 | Arrays | Rock — *one contiguous block* | Indira Bounds |
| 9 | Pointers | Ghost — *indirection* | Astrid Starr |
| 10 | Pointer Applications | Poison — *leaks* | Mal Locke |
| 11 | Strings | Fairy | Nula Terminel |
| 12 | Enum, Structure, Union | Steel — *padding* | Padma Align |
| 13 | Binary Input/Output | Ice — *raw bytes* | Fee Seeker |
| 14 | Bitwise Operators | Bug — *bits* | Xora Mask |
| 15 | Lists | Dragon — *long chains* | Linka Head |

Gym aces use the wider roster where it fits the theme: Chapter 12's Steel gym is led
by Steelix and Chapter 14's Bug gym by Heracross. Opponents de-evolve to match your
team, so a Chapter 1 leader will not open with a full Snorlax against your starter.

All fifteen badges open the **Elite Four**: Seg Fault, Ida Overflow,
Fee Seeker II, Uma Bee (undefined behaviour), and Champion ANSI.

---

## The study features

These are the parts that actually move an exam grade:

- **Move Tutor (Notes tab)** — a condensed, exam-focused summary sheet for each
  chapter. Eight to nine points covering exactly what gets tested.
- **Spaced repetition** — a Leitner box system runs under everything. A question
  you miss drops to box 1 and comes back in two questions; one you keep getting
  right climbs to box 5 and won't reappear for a hundred. It works across battles,
  drills and exams alike. The topbar shows how many are due.
- **Review Center** — drill only what's due, no battle.
- **Drill a chapter** — from the Notes screen, pure Q&A on one chapter.
- **Mock Exam** — 25 or 50 questions shuffled across all fifteen chapters, timed,
  with no feedback as you go. At the end: score, per-chapter breakdown sorted
  weakest-first, and every missed question with a worked explanation.
- **Trainer Card** — overall accuracy, accuracy per chapter ranked weakest-first,
  how much of the bank you've seen, and which chapters you haven't touched. This
  is the list to study from.

**774 questions** across the fifteen chapters — 48 to 56 per chapter, spread over
four difficulty tiers — each with an explanation of *why*, not just which letter
was right. The bank is deliberately larger than any one exam needs: the point is to
overstudy, and for the spaced-repetition schedule to have enough material that you
are recalling the concept rather than remembering the question.

Keyboard: `1`–`4` or `A`–`D` to answer, `Enter` to continue.

---

## Files

```
index.html            the game
Play StudyMon.bat        launcher (starts a local server, opens the browser)
css/style.css         all styling
js/data/pokedex.js    1025 official species: stats, types, moves, evolutions,
                      catch rates                                  (generated)
js/data/fakemon.js    original StudyMon species and evolution data
js/data/world.js      chapters, gyms, leaders, Elite Four, chapter notes
js/data/questions/    the question bank: ch01-03.js etc, plus -b.js second
                      batches and topup.js — all merged at load time
js/data/collectables.js  the collection catalog: categories, items, rarities
js/engine/            state, mons, quiz/SRS, battle, ui, journal, collectables
assets/               sprites (front/back/shiny/artwork) + cries
tools/                the PokéAPI fetch + build scripts, and a fallback server
```

### Adding your own questions

Open the file for the chapter group and add an entry. That's the whole process —
the game picks it up on reload.

```js
{ id: 'c9-24', t: 2, k: 'mcq', tag: 'Trace',
  q: 'What is printed?',
  code: 'int x = 5;\nint *p = &x;\nprintf("%d", *p);',
  c: ['5', 'The address of x', 'Garbage', '0'], a: 0,
  why: 'p holds the address of x, so *p reads the value stored there.' },
```

- `id` — must be `c<chapter>-<number>` and unique; the chapter number in the id is
  what files the question. Numbers above 60 are free in every chapter.
- `t` — tier 1-4 (which moves can ask it).
- `k` — `'mcq'` (`c` = choices, `a` = index of the right one) or `'fill'`
  (`a` = array of accepted answers; matching ignores case, spacing and trailing
  punctuation).
- `tag` — the little label on the card: Recall, Trace, Output, Bug Hunt, Concept…
- `why` — always fill this in. It's the part that teaches.

### Regenerating the Pokémon data

Only needed if you want to change the roster or move pool:

```bash
node tools/fetch-pokeapi.mjs && node tools/build-data.mjs
```

---

## Notes

Pokémon is © Nintendo / Creatures Inc. / GAME FREAK. Sprites, names and cries come
from PokéAPI and are used here for a private, personal study tool that isn't
distributed. The textbook questions are original, written to match the topics and
style of the Forouzan & Gilberg chapters.
