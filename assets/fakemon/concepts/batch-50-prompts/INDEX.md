# Batch 50 — new StudyMon concepts

50 brand-new, standalone Fakemon concepts (not evolution lines — each is its own creature). Built to match the exact house style established by the Papyrunt/Codexal/Lexidrake and Abyssqueak/Trenchmaw/Leviathorn lines, per `.codex/skills/studymon-fakemon/SKILL.md` and the battle-tested prompts in `abyssqueak-line-v2/PROMPTS.md`.

None of these were assigned real dex IDs or game data (stats/moves/evo) — they are visual concepts only, as requested. Type/BST-style integration can come later, per creature, once art is approved.

Deliberately avoided: paper/archive/scholarly themes (Papyrunt line) and deep-sea/pressure/silence themes (Abyssqueak line).

## How to use these prompts

1. Open the file for the creature you want (grouped 10-per-file below).
2. Copy the **Front-sprite prompt** block into the image generator (built-in `imagegen`, per the skill).
3. Use the named reference species' official sprite as the technical-reference input image — silhouette/scale/pixel-density only. Never let it influence anatomy, markings, or color.
4. Normalize the result: crop to the stated logical-pixel box, place on a genuine transparent 96×96 canvas, feet near y=91, hard-threshold alpha, quantize to the stated color count with no dithering.
5. Run `python .codex/skills/studymon-fakemon/scripts/audit_sprites.py` before treating anything as final.
6. Only after a front is approved, derive a rear three-quarter prompt from it (see `abyssqueak-line-v2/PROMPTS.md` for the exact rear-prompt pattern) — these 50 prompts cover fronts only.

## Roster

| # | Name | Type(s) | Size class | File |
|---|---|---|---|---|
| 1 | Sparkwick | Electric | Small | prompts-01-10.md |
| 2 | Cinderquill | Fire | Small | prompts-01-10.md |
| 3 | Frostmuzzle | Ice | Small | prompts-01-10.md |
| 4 | Loamgrub | Ground | Small | prompts-01-10.md |
| 5 | Petalmoth | Bug/Grass | Small | prompts-01-10.md |
| 6 | Rustbolt | Steel | Small | prompts-01-10.md |
| 7 | Bramblecoil | Grass | Medium | prompts-01-10.md |
| 8 | Tidalpup | Water | Small | prompts-01-10.md |
| 9 | Duskwhisper | Ghost | Small | prompts-01-10.md |
| 10 | Graniteknuckle | Rock/Fighting | Medium | prompts-01-10.md |
| 11 | Gustling | Flying | Small | prompts-11-20.md |
| 12 | Venomquill | Poison | Small | prompts-11-20.md |
| 13 | Emberfawn | Fire | Small | prompts-11-20.md |
| 14 | Coralpounce | Water | Small | prompts-11-20.md |
| 15 | Thornhide | Grass/Ground | Medium | prompts-11-20.md |
| 16 | Voltkit | Electric | Small | prompts-11-20.md |
| 17 | Mirrorwing | Psychic/Flying | Medium | prompts-11-20.md |
| 18 | Clatterbone | Ghost/Rock | Medium | prompts-11-20.md |
| 19 | Doughmite | Normal | Small | prompts-11-20.md |
| 20 | Ironbristle | Steel | Small | prompts-11-20.md |
| 21 | Mosswhelp | Grass | Small | prompts-21-30.md |
| 22 | Sandurchin | Ground | Small | prompts-21-30.md |
| 23 | Glimmerkoi | Water | Medium | prompts-21-30.md |
| 24 | Talonperch | Flying | Small | prompts-21-30.md |
| 25 | Cragtortoise | Rock | Large | prompts-21-30.md |
| 26 | Witherleaf | Grass/Dark | Small | prompts-21-30.md |
| 27 | Pouncejack | Normal/Fighting | Medium | prompts-21-30.md |
| 28 | Steamkettle | Fire/Water | Small | prompts-21-30.md |
| 29 | Quartzfin | Water/Rock | Small | prompts-21-30.md |
| 30 | Batwix | Flying/Dark | Small | prompts-21-30.md |
| 31 | Chitinlash | Bug | Small | prompts-31-40.md |
| 32 | Frillneck | Electric | Medium | prompts-31-40.md |
| 33 | Puddlestep | Water/Ground | Small | prompts-31-40.md |
| 34 | Larkspur | Fairy/Grass | Small | prompts-31-40.md |
| 35 | Ashenmane | Fire | Medium | prompts-31-40.md |
| 36 | Barnaclaw | Water/Rock | Small | prompts-31-40.md |
| 37 | Pinionshard | Flying/Steel | Large | prompts-31-40.md |
| 38 | Slatehorn | Rock/Ground | Medium | prompts-31-40.md |
| 39 | Gildmoth | Bug/Fairy | Small | prompts-31-40.md |
| 40 | Bristlefang | Dark | Medium | prompts-31-40.md |
| 41 | Cobblehop | Ground/Rock | Small | prompts-41-50.md |
| 42 | Windlecap | Grass/Flying | Small | prompts-41-50.md |
| 43 | Emberling | Fire | Small | prompts-41-50.md |
| 44 | Grottoback | Rock/Water | Large | prompts-41-50.md |
| 45 | Thistledash | Grass/Normal | Small | prompts-41-50.md |
| 46 | Cindermole | Ground/Fire | Small | prompts-41-50.md |
| 47 | Verdantail | Grass | Small | prompts-41-50.md |
| 48 | Chimeplume | Flying/Psychic | Medium | prompts-41-50.md |
| 49 | Ironshell | Steel/Bug | Small | prompts-41-50.md |
| 50 | Duneflicker | Ground/Fire | Small | prompts-41-50.md |

Size-class pixel budget (from the skill):

| Size class | Occupied box | Opaque colors |
|---|---:|---:|
| Small | ~30-42 × 26-42 px | 11-15 |
| Medium | ~48-58 × 42-56 px | 12-15 |
| Large | ~62-70 × 54-60 px | 13-15 |
