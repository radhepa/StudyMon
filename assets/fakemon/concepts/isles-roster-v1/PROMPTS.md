# Converging Isles originals (1032-1046)

The fifteen concepts from `ten-new-roster-v1` and `five-new-lines-v1`, made
playable. Fronts come from the approved source images in those folders.
Nothing new was generated for the fronts.

## Roster

| ID | Species | Type | Evolves | BST | Wild home | Size matched to |
|---|---|---|---|---|---|---|
| 1032 | Budloth | Grass | Lv 16 | 318 | Calc Route 9 | Turtwig |
| 1033 | Bromelaze | Grass/Ground | Lv 36 | 405 | - | Grotle / Monferno |
| 1034 | Canopodon | Grass/Ground | - | 530 | - | Torterra |
| 1035 | Cryoad | Ice/Poison | Lv 30 | 300 | Calc Route 5 | Croagunk |
| 1036 | Rimecroak | Ice/Poison | - | 490 | - | Toxicroak |
| 1037 | Tallybara | Normal/Psychic | - | 460 | Calc Route 6 | Bidoof / Shinx |
| 1038 | Kilnscarab | Fire/Bug | - | 500 | Calc Route 8 | Heracross |
| 1039 | Drenchic | Water/Electric | Lv 16 | 310 | Calc Route 4 | Torchic |
| 1040 | Condusken | Water/Electric | Lv 36 | 405 | - | Combusken |
| 1041 | Blitziken | Water/Electric | - | 530 | - | Blaziken |
| 1042 | Fernip | Bug/Grass | Lv 22 | 290 | Calc Route 7 | Sewaddle |
| 1043 | Brackenwing | Bug/Grass | - | 475 | - | Volcarona |
| 1044 | Cairnkid | Rock/Fairy | Lv 32 | 320 | Calc Route 10 | Skiddo |
| 1045 | Cragibex | Rock/Fairy | - | 480 | - | Gogoat |
| 1046 | Tumblerook | Steel/Flying | - | 470 | Calc Route 6 | Skarmory |

Only first stages are wild, all uncommon, and only on Calc routes 4-10. Those
routes stay shut until Evening Exam I (Elara Slate) is beaten, so none of these
species can appear before the exam.

## The regional Torchic names

The concept files still say `c-region-torchic` and so on. In the game the line
is renamed so each name still sounds like the original:

- **Drenchic** (Torchic): a drenched chick. Its down is always storm-soaked.
- **Condusken** (Combusken): from conduct, because the seawater in its feathers
  carries current.
- **Blitziken** (Blaziken): from blitz, as in lightning. It fights at the edge of
  a storm front.

The line goes from soaked, to carrying current, to full storm.

## Size

The concept fronts were cut 20-40% larger than their official counterparts.
For example, C-Region Blaziken was 74x88 against Blaziken's 59x75, so they
looked oversized in battle and in the Kingdom. `prepare_assets.py` re-cuts
each one from the full-resolution source to the footprint of the official
sprite in the table above. The accent colours (flower centres, eyes, bolts,
abacus beads) get reserved palette slots so they survive the reduction. All
fifteen pass `audit_sprites.py`.

## Cries

`make_cries.py` synthesizes every cry. Each family shares one motif that gets
lower and heavier with each stage:

- **Budloth line:** a sleepy rising yawn that gains a leafy rustle.
- **Cryoad line:** a pulsed croak with glassy ice pings. Rimecroak's three
  pings are its three spine plates.
- **Tallybara:** a calm purr, then three bead clicks.
- **Kilnscarab:** a heavy wing drone with ember crackle.
- **Drenchic line:** chick cheeps that pick up static, ending in thunder.
- **Fernip line:** a tiny trill that becomes four-winged flutter.
- **Cairnkid line:** a kid's bleat and a struck-quartz ring from the horns.
- **Tumblerook:** magpie chatter and a jingle of keys.

## Rear sprites (still to do)

The rears are currently mirrored fronts, so each species shows its face from
the player's side of a battle. To replace one:

1. Generate the rear with the template below. Image 1 is
   `<name>-front-96.png` from this folder. Image 2 is the official rear listed.
2. Save the result here as `<name>-back-source.png`.
3. Run `python assets/fakemon/concepts/isles-roster-v1/prepare_assets.py`,
   then `python tools/measure-sprites.py`.

```text
Use case: precise-object-edit
Asset type: 96x96 rear battle sprite for the StudyMon game
Input images: Image 1 is the approved [SPECIES] front sprite and defines exact identity, proportions, palette, and pixel construction. Image 2 ([REFERENCE] rear, assets/sprites/back/[REF ID].png) is ONLY a technical reference for stage-appropriate pixel density, occupied scale, clustering, and outline weight.
Primary request: Create [SPECIES]'s matching rear three-quarter battle sprite, facing upper right. Preserve [REAR MOTIFS]. Match Image 1's simplified construction exactly.
Style/medium: crisp late-2000s handheld creature-battler pixel art; 12-15 opaque colors; hard one-pixel edges and large deliberate clusters.
Composition/framing: one full creature centered on a genuinely transparent canvas, with the same visual mass as the front.
Constraints: rear view with the face turned away (at most one eye edge visible); no shadow, backdrop, checkerboard, anti-aliasing, semi-transparent edges, blur, gradients, dithering, scattered micro-texture, text, or watermark. Do not copy the reference species' anatomy, markings, or colors.
```

| Species | Reference rear | Rear motifs to keep |
|---|---|---|
| Budloth | Turtwig (387) | closed coral bud and three leaf blades between the shoulders, brow tuft, three ivory foreclaws |
| Bromelaze | Grotle (388) | five-leaf rosette across the shoulders with coral centre, swept brow crest, long forearms |
| Canopodon | Torterra (389) | seven-leaf mantle and coral flower over the back, short tail touching the ground |
| Cryoad | Croagunk (453) | single ice shard on the back, violet flank spots, icicle toe pads |
| Rimecroak | Toxicroak (454) | three swept-back ice plates along the spine, violet flank patches |
| Tallybara | Bidoof (399) | bead tail (teal, gold, coral) curving up from the rump, forelock |
| Kilnscarab | Heracross (214) | domed terracotta wing cases with the glowing seam and kiln-brick bands, vent horn |
| Drenchic | Torchic (255) | curled wave crest, yellow zigzag feather marks, navy feet |
| Condusken | Combusken (256) | two wave crests, paddle arm feathers, three splash tail feathers |
| Blitziken | Blaziken (257) | two cresting-wave plumes, fin-feather cuffs with yellow bolts, three splash back feathers |
| Fernip | Sewaddle (540) | three body segments, fern-tip tail curl, leaf collar, fiddlehead antennae |
| Brackenwing | Volcarona (637) | four frond wings with spiral marks seen from above, fiddlehead antennae |
| Cairnkid | Skiddo (672) | three-slab stone ruff, crystal horn buds, short tail |
| Cragibex | Gogoat (673) | three-tier cairn mantle, rose-quartz crescent horns |
| Tumblerook | Skarmory (227) | lock-plate wings, split key-tipped tail, crown feather |
