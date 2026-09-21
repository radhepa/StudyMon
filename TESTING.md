# Checking StudyMon

Start the local server first. Everything below drives a real browser against
`http://127.0.0.1:8780/` in a throwaway context, so **your save is never
touched** — each run seeds its own `freshSave()` in isolated storage.

```
node tools/check-all.cjs
```

Run one suite by name or path:

```
node tools/check-all.cjs battles
node tools/check-maths.cjs
```

## The suites

| suite | what it proves |
| --- | --- |
| `check-side-quests.cjs` | 30 labs, 169 cases, every case carrying a verified expected output that still matches the contract that produced it |
| `check-handlers.cjs` | every function named in an `onclick` exists, so no button is silently dead |
| `check-typechart.cjs` | all 18 attacking types match the canonical Gen VI+ matchups, in all three relations |
| `check-maths.cjs` | damage responds to type, STAB, level and power; catch rates are ordered from common to legendary, improve when wounded, worsen on a wrong answer |
| `check-integrity.cjs` | every species, team, ace, reward and question referenced anywhere exists and is usable; no duplicate question ids; no evolution chain loops |
| `check-gameplay.cjs` | shop arithmetic, healing, battle entry, boss gating, save round trip, region separation, every location, every quest, route info |
| `check-systems.cjs` | spaced review boxes and due times, the drill screen, friendship bounds, the ferry, PC box moves |
| `check-scenes.cjs` | all 750 friend scenes across 250 cast members are well formed, with no unreplaced `{name}` tokens |
| `check-battle.cjs` | wild and gym battles played to completion through the real DOM, plus every berry rule |
| `check-calc-review.cjs` | Calculus II: every question reachable from a Wild Battle, right answers due in about 50 questions and wrong ones in about 25, three right in a row hides a question (and `unhideQuestions` restores it), the C region keeps the original boxes |
| `check-progression.cjs` | catching, dex recording, experience, and reward routing to the box when the party is full |
| `check-evolution.cjs` | branching choices, refusal mid battle and below level, chain walking |
| `check-autograder.cjs` | a correct submission passes and pays once, a one byte difference fails, errors and timeouts pay nothing |

## Writing more

Two things cost the most time when these were written, both worth knowing.

**Check the real API before asserting on it.** Several early failures were the
test being wrong, not the game: party Pokemon have `hp` and `maxHp(m)`, not
`stats.hp`; `gymTeam` takes a chapter object, not a number; in the question bank
`c` is the choice list and `a` is the answer index, not the reverse.

**Drive the DOM, not the internals.** Battles are the clearest case. Answering a
question only shows the explanation card; damage lands when the player presses
**Continue**, and `B.q` is never cleared, so a driver that watches `B.q` alone
loops forever. `B.turnResolving` stays true until the next question, so it
cannot gate the next move either. Query the buttons and click them, and skip
disabled ones: fainted and active Pokemon are correctly disabled in the switch
menu, and clicking them does nothing.

## Portraits

`node tools/check-all.cjs` does not cover the artwork. Judge it by eye.

### Portrait Studio

With the server running, open:

    http://127.0.0.1:8780/tools/portrait-studio.html

Pick a character on the left. The preview shows the finished portrait with the
target lines on it: hair top on the upper line, chin on the lower one, shoulders
below. Kip is the reference and sits at the top of the list.

- **Zoom / Across / Down** reframe. Arrow keys nudge, shift for ten at a time,
  `+` and `-` zoom, `[` and `]` walk the cast.
- **Find leftover white** marks opaque white the background flood could not
  reach, in red, on the source image. These are candidates only: enclosed
  background and white clothing are the same pure white in this art, so nothing
  can tell them apart automatically. You decide which are background.
- **Erase background** then click a marked spot to clear it. Click it again to
  put it back. Nothing is destroyed: the click point is recorded, not the pixels.
- **Save all edits** writes `tools/portrait-edits.json` and nothing more. The
  game keeps showing the old crops until the files are rebuilt.
- **Save and apply to game** saves and then rebuilds the portrait files the game
  actually loads. This is the one to press. Reload StudyMon afterwards.

Saving alone never changes what StudyMon shows. That is the whole difference
between the two buttons.

**Save and apply** runs this for you. To do it by hand instead:

```
python tools/import-portraits.py "<folder of full-body art>" <names that erase>
python tools/reframe-portraits.py
```

The import applies your erase points; the reframe applies your framing. Both
take the studio's values over anything in their own tables, so an edit you make
by hand always wins.

Leave off `--remeasure` when applying studio edits. The studio previews using
the landmarks in `tools/portrait-landmarks.json`, so re-measuring would shift
the result away from what you approved on screen. Use `--remeasure` only after
importing brand new characters.

### Removing the studio when the portraits are done

Delete `tools/portrait-studio.html`, delete `tools/portrait-edits.json` after
folding its values into the `TUNE` and `ENCLOSED` tables, drop the "portrait
studio save hook" block and the `applyPortraits` function plus its two POST
routes from `tools/serve.js`, and drop the `EDITS` lines from
`tools/import-portraits.py` and `tools/reframe-portraits.py`. Nothing else
refers to it, and the game never loads it.

### The framing contract

Every portrait is a 460px square with the head top at y=35, the chin at y=285
and the face centred at x=230. `tools/normalize-portraits.py` is superseded and
refuses to run.
