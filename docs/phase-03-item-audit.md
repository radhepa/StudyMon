# Phase 3 item economy audit

This is the approved Slice 1 baseline. It records the runtime as it existed
before Phase 3 added any items or changed their effects.

## Catalog contract

- Stable IDs use lower camel case and are never repurposed.
- Categories are `capture`, `medicine`, `battle-utility`, `training`,
  `evolution`, `exploration`, `key`, `collectible`, `gift`, and `flavor`.
- Rarity is `common`, `uncommon`, `rare`, `very-rare`, or `unique`. Rarity
  describes distribution, not raw power.
- Value bands are free (0), low (1–299), standard (300–699), high (700–1499),
  and premium (1500+). `value` is the canonical economy value. The current
  shop `price` remains the purchase price until regional stock lands.
- Ordinary inventory stacks to 99. Unique inventory stacks to one. Key items
  must be unique, non-consumable, and unsellable. Unknown keys are retained in
  the save without being exposed as usable inventory. Grants clamp excess at
  the cap; purchases that would exceed it are refused before money is debited.
- The target Phase 3 catalog ceiling is 36 registered items: enough for roughly
  8 mechanical items, 6 exploration/key items, 6 collectibles, and 16 gift or
  flavor objects without encouraging numeric or palette-swapped filler. This is
  a ceiling, not a quota; every addition still needs a distinct role and source.

## Existing item ledger

| ID | Role and current effect | Rarity / value | Stack and safety | Existing acquisition |
|---|---|---|---|---|
| `great` | Capture; 1.5× multiplier | uncommon / 600 standard | consumable, sellable, 99 | every shop; one per gym win; Quill ×1, Wade ×2, Ilse ×2; up to 20 converted from legacy `balls` |
| `ultra` | Capture; 2× multiplier | rare / 1400 high | consumable, sellable, 99 | every shop; one per Elite win; Wick ×1, Tovah ×1 |
| `potion` | Battle medicine; restores 50% max HP | common / 250 low | consumable, sellable, 99 | three in a new save; every shop; two per gym win; 18% wild-win drop; Tam ×2, Kip ×1, Odell ×2, Piet ×1; up to 20 converted from legacy `potions` |
| `superpotion` | Battle medicine; restores 100% max HP | uncommon / 650 standard | consumable, sellable, 99 | every shop; two per Elite win; Moss ×1 |
| `oran` | Party medicine; restores 10 HP between battles | common / 200 low | consumable, sellable, 99 | ten early C side quests award 3 each (30 total) |
| `sitrus` | Party medicine; restores 25% max HP between battles | uncommon / 500 standard | consumable, sellable, 99 | twenty C side quests award either 2 or 4 (60 total) |
| `expShare` | Key item; passively gives eligible nonparticipants 50% EXP | unique / 0 free | non-consumable, unsellable, unique | Kern conversation in Bootstrap Town; receipt `aide-exp-share` |
| `poke` | Compatibility-only capture supply; 1× multiplier | common / 0 free | unlimited and not stored | always available from the battle/shop compatibility view |

The C side-quest board also awards ₵50,000 and ten Pokémon across its 30
one-time autograded rewards. Those are economy inputs but not item IDs.

## Acquisition matrix

| Activity / subject and place | Item classes supplied | Gate and duplication behavior |
|---|---|---|
| Shared shop stock | capture, battle medicine | C: Wren/town, Nemo/pier, Fitz/archive, Petra/lab, Hale/quarter. Calculus: Tobin/harbour, Mirit/lathe, Solveig/observatory, Odalys/hall. Location badge gates apply; stock is otherwise identical and unlimited. |
| C town gifts | battle medicine, capture | Tam/town, Kip/cafe, Quill/meadow, Wade/pier, Moss/ridge, Wick/cavern. Each person is guarded by `S.town.gifts[personId]`. |
| Calculus town gifts | battle medicine, capture | Odell/harbour, Piet/sliderule, Ilse/flats, Tovah/helix. Each person uses the same stable gift receipt map. |
| Kern conversation | key | Bootstrap Town, no badge gate. `S.town.receipts['aide-exp-share']` and ownership reconcile in either direction; quantity clamps to one. |
| Gym victories | capture, battle medicine, money | Every win currently grants Great Ball ×1 and Potion ×2, including rematches. Badge ownership prevents duplicate badges but **does not** prevent duplicate item rewards. |
| Elite victories | capture, battle medicine, money | Every win currently grants Ultra Ball ×1 and Super Potion ×2. `S.elite[id]` records victory but **does not** prevent repeat item rewards. |
| Wild victories | battle medicine, money | Every win pays level-scaled money and independently has an 18% Potion drop; intentionally repeatable. |
| C side quests | party medicine, money, Pokémon | All 30 are available from the quest board. `rewardClaimed`, an autograder-version proof, and an atomic save/rollback path guard each reward. Total berries: Oran ×30 and Sitrus ×60. |
| Legacy save migration | capture, battle medicine | Old `balls` become up to 20 Great Balls and old `potions` become up to 20 Potions, then the legacy fields are deleted so conversion is idempotent. |

There is no existing exploration, training, evolution, collectible, player-to-
character gift, or flavor-item source. Tier 1 favorite and avoided item-ID lists
remain intentionally empty until later slices.

## Held-item decision

Held items are intentionally unsupported in Phase 3. The battle engine has no
per-Pokémon equipped-item save field, equip/unequip transaction, switch-in or
turn-start/end item hook, durable status lifecycle, opponent inventory parity,
or post-battle restoration contract. Adding held effects now would create a
parallel mechanic rather than use an existing battle seam. A future phase may
reconsider only after those hooks exist in `makeMon`/save normalization,
`startBattle`, `doSwitch`, move resolution, `foeTurn`, faint handling, and
`winBattle`/`loseBattle` cleanup.
