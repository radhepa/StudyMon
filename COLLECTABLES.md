# The Collectables System

**Status:** phase 1 shipped, 2026-09-15. Catalog, chest, both display cases and the
keepsake sources are live. Fishing and searching (the two categories that fill
the aquarium and the terrarium) are designed here but not yet built.

This document is the whole system: what it is for, how a player fills it, how
the code is laid out, what the art has to do, and what the next phases add. If
you are adding a category, an item, or a source, read this first — the data
files are deliberately thin because the design lives here.

---

## 1. Why this exists

The house in Bootstrap Town had a bed and a desk. You slept in it, you studied
at it, and there was no reason to be there otherwise. The collection is what
gives the room a purpose: it is the place where the run accumulates into
something you can look at.

Three design rules, in priority order:

1. **Nothing here gates study.** Not a single collectable blocks a chapter, a
   gym, a question or a crossing. StudyMon is a study tool with real exam dates
   attached; a collection that makes you fish before you can revise would be a
   bug. Collectables reward time you choose to spend, never time you have to.
2. **The list is the quest.** A locked item shows *where to look*, not a
   question mark. An unfilled collection should read as a to-do list of nice
   afternoons, not as a wall of mystery.
3. **Displays beat percentages.** Two of the three categories live in furniture
   you look at — the aquarium and the terrarium — because "my tank is filling
   up" is a better feeling than "68% complete".

---

## 2. The shape of it

```
                          ┌──────────────────────────────┐
  the chest  ─────────────│  every category, every item  │
  (in your house)         │  found or not, all in one    │
                          └───────────┬──────────────────┘
                                      │ two categories also display as scenes
                    ┌─────────────────┴──────────────────┐
                    ▼                                    ▼
          ┌───────────────────┐               ┌────────────────────┐
          │    AQUARIUM       │               │    TERRARIUM       │
          │  River Catch      │               │  Hollow & Meadow   │
          └───────────────────┘               └────────────────────┘
```

- **The chest** is the index. It opens on the category list, each with a
  progress meter; picking one shows that category's full shelf.
- **The aquarium** and **the terrarium** are display cases. Each renders one
  category as a scene: the things you have found are arranged in the glass, the
  things you have not are simply absent. Clicking a resident opens its card.
- **Bootstrap Keepsakes** has no case of its own — it is kept on the shelf in
  the chest, which is thematically right for paper and ribbon.

All four (chest, aquarium, terrarium, and the journal notebook on the desk) are
furniture in the `home` scene. You walk up and press **E**.

---

## 3. The three categories

Three is the starting set. The system takes any number; see §8 for the ones
queued up next.

### River Catch → the aquarium (10 items)

Everything that lives in the water the town was built beside. Riverside Pier,
the meadow brook, the Riverside Row washhouse pool.

| Item | Rarity | Where |
|---|---|---|
| Silverdart | common | anywhere on the river, any hour |
| Pebblefish | common | the shallows below the pier |
| Glass Shrimp | common | the washhouse pool |
| Ribbon Loach | uncommon | slow water, early morning |
| Lantern Carp | uncommon | off the pier head at dusk |
| Bootstrap Eel | uncommon | under the pilings after dark |
| Mirror Trout | rare | clear weather, midday |
| Stack Sturgeon | rare | the deep channel |
| Null Catfish | rare | where the cavern water meets the river |
| **Heap Koi** | **prize** | nobody agrees; fish long enough |

### Hollow & Meadow → the terrarium (10 items)

Small things found under leaves, on warm stone and around the cavern lamps.
Meadow Route, Linden Research Grounds, Hillcrest Terrace, Null Cavern.

| Item | Rarity | Where |
|---|---|---|
| Meadow Flit | common | the meadow, daylight |
| Brass Beetle | common | under logs on the meadow path |
| Dewshell Snail | common | Linden grounds, early morning |
| Linden Mantis | uncommon | the greenhouses, warm afternoons |
| Lantern Moth | uncommon | Cavern Hollow lamp posts, after dark |
| Cavern Glowfly | uncommon | Null Cavern, night |
| Terrace Skink | rare | Hillcrest walls, mid-afternoon |
| Riverside Rain Frog | rare | Riverside Row, in the rain |
| Pointer Cricket | rare | the meadow at night, tall grass |
| **Nullfly** | **prize** | the deep cavern; bring a lamp |

### Bootstrap Keepsakes → the shelf in the chest (10 items) — **live now**

Paper, ribbon and metal from things you actually did. Every one marks a first.
This is the category that is wired up today, so the chest is never empty.

| Item | Rarity | Source | Wired? |
|---|---|---|---|
| Enrolment Slip | common | opening the chest for the first time | ✅ |
| First Badge Ribbon | common | winning your first gym | ✅ |
| First Catch Tag | common | catching your first Pokémon | ✅ |
| Wren's Stamped Receipt | common | buying anything at the Mart | ✅ |
| Pressed Linden Leaf | uncommon | the Linden grounds in autumn light | phase 2 |
| Pier Rope Knot | uncommon | time with the pier crew | phase 2 |
| Cracked Compiler Pin | uncommon | finishing a quest-board job | phase 2 |
| Stamped Ferry Ticket | rare | sailing between regions | ✅ |
| Lamplighter's Taper | rare | befriending the Hollow lamplighter | phase 2 |
| **Champion's Laurel** | **prize** | beating the Champion | ✅ |

### Rarity

`common` → `uncommon` → `rare` → `prize`. Rarity does four things: it orders
the shelf, it colours the token ring, it will set drop weights when the
gathering minigames land, and `prize` is the one-per-category showpiece.

---

## 4. Code layout

| File | Owns |
|---|---|
| `js/data/collectables.js` | the catalog: rarities, categories, items. **Data only.** |
| `js/engine/collectables.js` | state, `collectFind()`, the chest UI, both display cases |
| `css/collectables.css` | chest, shelf, item cards, tank and vivarium skins |
| `js/data/human-world.js` | the three hotspots in the `home` scene |
| `js/engine/human-world.js` | dispatches `chest` / `aquarium` / `terrarium` actions |
| `tools/check-house.cjs` | proves all of the above through the real hotspots |

### State

Lives in the save as `S.collection`:

```js
S.collection = {
  version: 1,
  found: {
    'silverdart': { n: 3, day: 4, date: '2026-09-15', at: 1789... }
    //             ^ times found    ^ in-world day   ^ real date  ^ timestamp
  }
}
```

`ensureCollection()` creates it lazily and drops any id the catalog no longer
knows about, so renaming an item cannot leave a ghost counting toward a total.

### The one way in

```js
collectFind(id)                  // toasts, journals, saves. Returns true on a first find.
collectFind(id, { quiet: true }) // same, no toast — for things handed over silently
```

**Nothing else may write to `S.collection`.** `collectFind` is the only function
that does, it is idempotent for the "first found" record, it counts duplicates,
it writes a line into the journal, and it swallows its own errors so a bad item
id can never break the moment that granted it.

Reading:

```js
collectHas(id)          // boolean
collectRecord(id)       // { n, day, date, at } or null
collectStats()          // { found, total, pct } across everything
collectStats('river')   // …for one category
collectComplete('river')
```

### Adding an item

1. Add the object to `COLLECT_ITEMS` in `js/data/collectables.js`. Required:
   `id`, `cat`, `name`, `rarity`, `icon`, `blurb`, `found`. Optional: `art`.
2. Call `collectFind('your-id')` from wherever it is earned.
3. That is all. The chest, the shelf, the display case and the counters pick it
   up automatically.

### Adding a category

1. Add it to `COLLECT_CATEGORIES` with `id`, `name`, `icon`, `display`
   (`'chest' | 'aquarium' | 'terrarium'`), `where`, `blurb`, `how`, `live`.
2. Set `live: false` until its source exists — that is what puts the honest
   "not yet collectable" note on the shelf instead of a dead list.
3. A category with a **new** kind of display case needs a skin in
   `css/collectables.css` and a branch in `openDisplayCase()`. A category that
   reuses the chest needs nothing.

---

## 5. The aquarium and the terrarium

Both are the same component (`openDisplayCase`) with a different skin and a
different category, because they are the same idea.

**How a resident is placed.** Deterministically, from its index in the found
list: the same collection always looks the same, and nothing jumps when the
panel re-renders. Residents spread over the whole pane rather than a fixed grid,
so a tank holding three does not huddle in one corner. A gentle 6–8 second drift
animation makes the glass feel alive; it is disabled under
`prefers-reduced-motion`.

**Art is optional.** A resident renders from its `icon` glyph. Set `art` on the
item to a PNG path and it renders that instead — no other change needed. This
is deliberate: the system had to be playable the day it was written.

### Art brief — what needs drawing

Two separate jobs. **Neither blocks the system**; both make it better.

#### Job A — the props, in the room art (required for the room to look right)

`assets/ui/bootstrap-town-interiors-v2.png` is a 2×2 sheet; **Your Home** is the
bottom-right quadrant. Three pieces of furniture need to exist in it, and the
interaction hotspots are already placed to match:

| Prop | Where in the room | Player stands at | Status |
|---|---|---|---|
| Collection chest | back wall, right of the bookshelf | 77.5 %, 41 % | **already in the art** ✅ |
| Aquarium | left wall, on a stand between the bed and the desk (the small flower table's spot) | 29 %, 41 % | to draw |
| Terrarium | right wall, on top of the low cabinet | 87 %, 50 % | to draw |

Coordinates are percentages of the scene, measured to where the player's **feet**
go — the prop itself is painted above that point, against the wall.

Prompt notes for generation, to stay in the existing style: warm hand-painted
top-down-ish RPG interior, same wood tones and lamp light as the rest of the
room, chunky readable shapes, no text.

- **Aquarium** — a rectangular glass tank on a low wooden stand, water lit from
  a small hood lamp, gravel and two or three plants, mostly empty so the
  residents the game draws on top have somewhere to be. Roughly as tall as the
  bed is wide.
- **Terrarium** — a glass vivarium on the cabinet top, cork bark and moss,
  a warm little lamp, one flat basking stone. Same visual weight as the aquarium
  so the two read as a matched pair across the room.

**After regenerating the sheet:** re-run `python tools/build-human-nav.py` only if
the new furniture blocks floor that used to be walkable, then
`node tools/check-all.cjs House` to confirm the hotspots still sit on open ground.

#### Job B — painted item tokens (optional, per item)

Drop 96×96 transparent PNGs at `assets/collect/<category>/<item-id>.png` and set
`art: 'assets/collect/river/silverdart.png'` on the item. Side-on for fish,
three-quarter for critters, centred with a little padding. Do these a few at a
time; every item without one keeps its glyph and nothing breaks.

---

## 6. How the collection is filled — the source model

A **source** is any moment that calls `collectFind`. There are three kinds, and
each category should lean on one of them:

| Kind | Feels like | Used by |
|---|---|---|
| **Gathered** | you went somewhere and did a thing | River Catch, Hollow & Meadow |
| **Awarded** | the game noticed something you did | Bootstrap Keepsakes |
| **Given** | somebody handed it to you | friendship milestones, quest rewards |

**Awarded** sources are live today because they need no new UI — they are
one-line hooks at the moment the thing actually happens:

```
js/engine/battle.js   first badge  → collectFirstBadge()
js/engine/battle.js   first catch  → collectFirstCatch()
js/engine/battle.js   champion     → collectChampion()
js/engine/shop.js     first buy    → collectFirstPurchase()
js/engine/ferry.js    first sail   → collectFirstCrossing()
js/engine/collectables.js  first chest open → the enrolment slip
```

**Gathered** sources are phase 2 and are the real work; see below.

---

## 7. Phase 2 — fishing and searching

Both are the same loop with different dressing, and both should cost in-world
minutes rather than money or items, so that collecting is something you spend an
afternoon on.

### The loop

1. A **spot** hotspot in an outdoor scene (`action: 'fish'` / `action: 'search'`)
   with a `pool` naming which items it can yield.
2. Pressing E starts a short attempt: `humanAdvance(15)` for the time, a brief
   wait, then a roll.
3. The roll filters the pool by the current **hour** and **weather**
   (`S.humanWorld.minute`, `S.humanWorld.weather`), then picks by rarity weight
   — suggested `common 60 / uncommon 27 / rare 11 / prize 2`, with the prize
   further gated on having found everything else in its category.
4. On a hit, `collectFind(id)`. On a miss, a line of flavour and the 15 minutes
   are gone. Misses should be common enough to make a hit feel earned and rare
   enough to never feel like a slot machine — aim for roughly one in three.

### Data this needs

```js
// in js/data/collectables.js, alongside the items
window.COLLECT_SPOTS = {
  pierHead: { scene: 'pier', kind: 'fish', x: 62, y: 44,
              pool: ['silverdart','pebblefish','lantern-carp','stack-sturgeon','heap-koi'] },
  // …
};
```

…and per-item conditions, which the catalog already has room for:

```js
{ id: 'mirror-trout', …, when: { weather: 'clear', from: 660, to: 900 } }
{ id: 'rain-frog',    …, when: { weather: 'rain' } }
{ id: 'glowfly',      …, when: { from: 1230, to: 1439 } }
```

The `found:` copy on every item already states these conditions in prose, so the
data and the player-facing hint were written from the same sentence and cannot
drift apart.

### What phase 2 must not do

- Not consume balls, potions or money. Fishing costs time.
- Not interrupt a battle, a quiz or a gym.
- Not be required for any badge, chapter, quest or crossing.

---

## 8. Later categories (sketched, not built)

Each would follow the same pattern: ten items, one prize, one display surface.

- **Cavern Minerals** → a display case on the shelf. Null Cavern, mining or
  simply spotting them on the walls.
- **Field Recipes** → the kitchen. Given by townsfolk at friendship
  milestones; this is the "Given" source kind doing real work.
- **Sheet Music** → the Kingdom, or a stand in the house; each one unlocks a
  track for the Bootstrap Town music toggle, which makes the reward audible.
- **Pressed Flora** → the journal itself, as extra pages, tying the two house
  systems together.

The reason to hold at three is that the two gathered categories need their
minigame before a fourth category is worth adding. Breadth without a source is
just a longer list of locked tiles.

---

## 9. Related systems

- **The journal** (`js/engine/journal.js`, the notebook on the desk) writes a
  line every time `collectFind` grants a first find, so the day a collection
  grew is recorded next to everything else that happened that day.
- **The temporary warp chip** (`js/engine/temp-calc-warp.js`) is unrelated to
  all of this and is meant to be deleted; its own header says how.

## 10. Checks

`node tools/check-house.cjs` (also in `tools/check-all.cjs` as *House systems*)
proves, through the real hotspots rather than by calling the openers:

- every piece of house furniture stands on walkable floor and is the nearest
  interactive thing to its own standing spot;
- the desk offers both the journal and the study notes;
- the chest opens on three categories and counts the whole catalogue;
- a locked shelf hides names but never hints;
- each display case shows exactly what has been found, says so when empty, and
  keeps every resident inside the glass;
- the journal and the collection both survive a save and reload.

Run the server first: `node tools/serve.js 8780`.
