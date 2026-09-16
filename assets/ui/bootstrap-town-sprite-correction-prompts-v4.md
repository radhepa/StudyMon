# Bootstrap Town sprite correction — v4

Generation mode: OpenAI built-in image generation, editing the existing v3
character sheet as the visual reference. The ten untouched model outputs are
archived as `assets/humans/overworld/*-walk-sheet-v4-generated.png`. The playable
`*-walk-sheet-v4.png` files are deterministic safe-gutter repacks made by
`tools/build-overworld-sprites-v4.py`.

## Shared production prompt

> Use case: background-extraction
>
> Asset type: corrected production 12-frame overworld walk sheet for Bootstrap Town
>
> Primary request: Repack and correct {NAME}'s sprite sheet from Image 1 as an exact 3-column by 4-row transparent atlas. Preserve {NAME}'s identity, face, hair, hat, clothes, colours, age, and proportions. {AGE}
>
> Grid contract: columns are step A, neutral idle, step B. Rows are facing down, facing up, facing left, facing right. Exactly 12 full-body sprites total.
>
> CRITICAL VERTICAL ANIMATION LOCK: In the DOWN row and the UP row, the head, hair, hat, face/back of head, neck, shoulders, torso, jacket/shirt, waist, backpack and all carried clothing details must remain perfectly stationary and centered across all three columns. Copy that upper body from the neutral middle frame without shifting, redrawing, leaning, rotating, bobbing, widening, or changing its silhouette. Only the legs, feet, and optionally the forearms below the elbows may change between step A and step B. The standing foot remains on one identical baseline. Top of head remains on one identical y-coordinate. Torso center remains on one identical x-coordinate. There must be absolutely no side-to-side body swing in the up/down rows.
>
> Cropping and gutters: center every sprite inside its own equal cell. Reserve at least 12 percent transparent padding on all four sides of every cell. No visible or semitransparent pixel may touch or cross a cell boundary. Nothing may be cut off: preserve every hair tip, hat edge, hand, bag, coat hem, leg, and shoe.
>
> Side rows: use a conventional three-frame left/right walk cycle with a stable head and torso and alternating limbs. Keep each figure fully inside its cell with the same safe padding.
>
> Style/medium: crisp handcrafted 32-bit pixel art matching Image 1 exactly, nearest-neighbour hard edges, limited palette.
>
> Constraints: truly transparent background; no black or checkerboard backing; no grid lines, labels, text, numbers, shadows, scenery, props, borders, or watermark. Exactly one figure per cell and exactly 12 figures. Do not change character design or scale.
>
> Avoid: whole-body sway, lateral translation, head movement, torso movement, bouncing, leaning, cropped pixels, art touching cell seams, inconsistent faces, anti-aliased illustration, 3D.

## Character substitutions

- Player: teenage player; shorter than adults and taller than children.
- Ren: young child at about 78 percent of adult height.
- Opal: child at about 80 percent of adult height.
- Rowan: teenager at about 90 percent of adult height.
- Bell: young adult at about 96 percent of adult height.
- Wren, Nurse Ada, Kern, and Tam: standard-height adults.
- Gus: older adult at about 102 percent of standard adult height.

## Runtime enforcement

The model provided redesigned limb poses and cleaner separation, but models do
not reliably honor pixel-exact grid geometry. The v4 builder therefore detects
the real pose bands, removes faint alpha specks, scales each pose into a cell
with a 12% gutter, and exports a shared 140×120 runtime canvas. For the down and
up rows, the neutral frame's upper 70% is copied byte-for-byte into both step
frames. `tools/check-human-sprites.py` verifies all 120 exports, age heights,
baseline, crop margins, unchanged upper bodies, and changing lower bodies.
