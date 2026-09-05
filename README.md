# Starter selection and visual refresh

Choose from 29 unique starters: the nine regional trios from Kanto through Paldea, plus Pikachu and Eevee. Region filters include the Hisui and Legends Z-A selections. Those filters select base species; regional evolution forms are not implemented. Preview a partner before confirming.

The interface uses offline system fonts, a green-and-cream field-journal theme, responsive starter cards, larger study text, keyboard focus indicators and reduced-motion support. Existing saves remain compatible.

---

# Full National Pokédex update

The roster now imports all species returned by PokéAPI (1,025 at this update), using each species’ default form. Regional forms, Mega Evolutions and other alternate forms are not separate entries. Existing save IDs and all 774 study questions remain unchanged.

All species have local front, back, shiny and artwork image paths. Where PokéAPI lacks a back or shiny sprite, the regular front image is used as a fallback. Cries play only when an audio file was successfully downloaded.

Twenty percent of ordinary encounters draw from all types, allowing Fire and Dark visitors on any route. The strength cap expands with badges; legendary encounters still begin after five badges. Special evolution requirements continue to use the game’s simplified level rules. Branch evolutions follow the first eligible branch; other branches can be caught directly.

Run `node tools/fetch-pokeapi.mjs` followed by `node tools/build-data.mjs` to refresh the roster.

---

# C-MON — a C study RPG

A Pokémon-style game built on top of **Forouzan & Gilberg, *Computer Science: A
Structured Programming Approach in C***. Fifteen routes, one per chapter. Every
attack costs you a C question, and the stronger the move, the harder the question.

Personal study tool. Nothing is published or shared anywhere.

---

## How to start it

Double-click **`Play C-MON.bat`**. It starts a tiny local server and opens your
browser. Leave the black window open while you play; close it when you're done.

You can also just double-click `index.html` — but some browsers refuse to save
progress for pages opened straight off the disk, so the launcher is the safe
route. The game tells you if that's happening.

Everything runs offline. All 257 Pokémon — Kanto (1-151), Johto (152-251), plus
Torchic/Combusken/Blaziken, Makuhita/Hariyama and Latias from Hoenn — with their
sprites, cries and stats, were pulled from [PokéAPI](https://pokeapi.co) once and
live in `assets/`.

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
Play C-MON.bat        launcher (starts a local server, opens the browser)
css/style.css         all styling
js/data/pokedex.js    257 species: stats, types, moves, evolutions  (generated)
js/data/world.js      chapters, gyms, leaders, Elite Four, chapter notes
js/data/questions/    the question bank: ch01-03.js etc, plus -b.js second
                      batches and topup.js — all merged at load time
js/engine/            state, mons, quiz/SRS, battle, ui
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
