# Bootstrap Town proportional production prompts

All assets in this set were created with the built-in image-generation tool, then copied into the repository. No CLI/API fallback was used.

## Proportional interior atlas

Edit target: `assets/ui/bootstrap-town-interiors-v1.png`  
Final asset: `assets/ui/bootstrap-town-interiors-v2.png`

```text
Use case: precise-object-edit
Asset type: revised production interior atlas for Bootstrap Town gameplay
Primary request: Redraw the four empty top-down pixel-art rooms from Image 1 at believable classic farming-RPG scale relative to a character who occupies one 32-by-48-pixel footprint. Keep the same strict 2-by-2 atlas and room identities: Mart top-left, healing Centre top-right, research lab bottom-left, player home bottom-right.
Input images: Image 1 is the current atlas and edit target.
Scale corrections: Every floor tile represents roughly one character-width. Doors should be about 1.25 character-widths. Counters and desks should be waist-high, about one character-width deep. Shelf bays should be about one character-width wide. A bed should be about one character-width wide and two character-heights long. Chairs, crates, machines, plants, rugs, display tables, benches, lamps, and wall decorations must all use that same small in-world scale. Reduce every oversized furnishing from Image 1 by roughly 40 percent while keeping it recognizable.
Layout: compact rooms with short, useful walking distances and clear 2-to-3-character-wide aisles. Put most furniture against walls. Mart has one compact counter, two wall shelves, two small display stands, and three small crates. Centre has one compact nurse counter, two short benches, one healing machine. Lab has narrow research benches and one small starter display. Home has one properly scaled single bed, narrow desk, chair, small bookcase, chest, and rug. Bottom-center exits stay clear.
Style/medium: crisp handcrafted 32-bit top-down pixel art matching the source's warm wood and forest-town palette, hard pixel edges, strict orthographic perspective.
Composition/framing: exactly four equal quadrants, same camera and room footprint in every quadrant, clean dark gutters, no art crossing quadrants.
Constraints: EMPTY ROOM BACKGROUNDS ONLY. No people, creatures, player, HUD, text, labels, readable logos, interaction markers, watermark, giant furniture, or cinematic perspective. Preserve the four-room arrangement, overall palette, and bottom-center exits. Furniture proportions and compact walking scale are the only major change.
Avoid: huge beds, counters taller than a person, enormous shelves, cavernous empty floors, isometric view, 3D, antialiasing, baked characters.
```

## Animated player sheet

Reference: `assets/humans/overworld/player-down-v2.png`  
Final asset: `assets/humans/overworld/player-walk-sheet-v3.png`

```text
Use case: background-extraction
Asset type: production animated overworld sprite sheet for Bootstrap Town
Primary request: Turn the trainer in Image 1 into a clean 12-frame walking sheet in a strict 3-column by 4-row grid.
Input images: Image 1 is the canonical identity, outfit, palette, and pixel-style reference.
Grid contract: columns are left-foot step, neutral/idle, right-foot step. Rows are facing down, facing up, facing left, facing right. Exactly one full-body character in every cell, exactly 12 figures total. Walking frames must visibly alternate arms and legs by 2 to 4 hard pixels while preserving head, face, cap, jacket, backpack, colors, proportions, and baseline. Side rows must genuinely face their named direction.
Age/proportion: teenage player character, medium height and slightly shorter than a typical adult NPC, about 5.5 heads tall in this chibi RPG style.
Style/medium: crisp handcrafted 32-bit pixel art, cozy top-down farming-RPG readability, limited palette, selective dark outline, nearest-neighbor hard edges.
Composition/framing: equal cells, identical character scale, feet aligned to one baseline within each row, generous transparent padding, no guides or dividers.
Constraints: truly transparent background; exactly 12 character figures; no text, labels, numbers, scenery, shadows, props, borders, watermark, checkerboard, or black background. Each pose must remain readable at a nominal 32-by-48-pixel gameplay footprint.
Avoid: merely translating the same pose, bobbing without limb changes, painted portrait, antialiasing, 3D, isometric scene, inconsistent clothing.
```

## Animated NPC sheets

Final source sheets are `assets/humans/overworld/<name>-walk-sheet-v3.png`. Each used the character's `<name>-down-v2.png` as Image 1 and the exact template below, with the listed identity and age substitutions.

```text
Use case: background-extraction
Asset type: production animated overworld NPC sprite sheet for Bootstrap Town
Primary request: Turn {NAME} in Image 1 into a clean 12-frame walking sheet in a strict 3-column by 4-row grid.
Input images: Image 1 is {NAME}'s canonical identity, outfit, palette, and pixel-style reference.
Grid contract: columns are left-foot step, neutral/idle, right-foot step. Rows are facing down, facing up, facing left, facing right. Exactly one full-body {NAME} in every cell, exactly 12 figures total. Walking frames must visibly alternate arms and legs by 2 to 4 hard pixels. {IDENTITY} Side rows must genuinely face their named direction and the back row must genuinely face away.
Age/proportion: {AGE}
Style/medium: crisp handcrafted 32-bit pixel art, cozy top-down farming-RPG readability, limited palette, selective dark outline, nearest-neighbor hard edges.
Composition/framing: equal cells, identical character scale, feet aligned to one baseline within each row, generous transparent padding, no guides or dividers.
Constraints: truly transparent background; exactly 12 {NAME} figures; no text, labels, numbers, scenery, shadows, props, borders, watermark, checkerboard, or black background. Each pose must remain readable at a nominal 32-by-48-pixel gameplay footprint.
Avoid: merely translating the same pose, bobbing without limb changes, painted portrait, antialiasing, 3D, isometric scene, inconsistent clothing or facial identity.
```

| Name | Identity substitution | Age/proportion substitution |
| --- | --- | --- |
| Wren | Preserve the blue hair, white shop cap with blue mark, brown apron, cream shirt, boots, friendly adult face, colors, and silhouette. | Wren is a full-grown adult at the standard adult height and width; do not make Wren childlike or giant. |
| Nurse Ada | Preserve the green hair, white nurse cap with red-blue accent, cream-and-red nurse uniform, boots, calm adult face, colors, and silhouette. | Ada is a full-grown adult at the standard adult height and width; do not make Ada childlike or giant. |
| Kern | Preserve the brown hair, glasses, green lab coat, dark trousers, mature adult face, colors, and silhouette. | Kern is a full-grown adult at the standard adult height and width; do not make Kern childlike or giant. |
| Bell | Preserve the long brown hair, navy post cap and coat with gold trim, satchel, boots, energetic face, colors, and silhouette. | Bell is a young adult, about 96 percent of standard adult height: clearly taller than children and slightly taller than the teenage player. |
| Ren | Preserve teal hair, white shirt, tan shorts, blue shoes, childlike face, colors, and silhouette. | Ren is a young child and must be visibly shorter, smaller-headed-in-frame, and narrower than teenage and adult characters—about 78 percent of adult standing height, with childlike chibi proportions. |
| Opal | Preserve curly red hair, warm layered school outfit, shoulder bag, childlike face, colors, and silhouette. | Opal is a child and must be visibly shorter and narrower than teenage and adult characters—about 80 percent of adult standing height, with childlike chibi proportions. |
| Tam | Preserve the brown swept hair, blue shirt, tan shop apron, dark trousers, boots, friendly adult face, colors, and silhouette. | Tam is a full-grown adult at the standard adult height and width; do not make Tam childlike or giant. |
| Gus | Preserve the gray hair, full dark-gray beard, black formal coat, white shirt, tie, mature face, colors, and silhouette. | Gus is an older full-grown adult, about 102 percent of standard adult height with slightly broader shoulders; still within the same believable human scale. |
| Rowan | Preserve the dark skin, glasses, rust knit cap, rust-and-tan field jacket, shorts, boots, backpack, thoughtful face, colors, and silhouette. | Rowan is a teenager, the same age band as the player and about 90 percent of adult standing height; clearly taller than the children Ren and Opal. |

The generated sheets are authoring sources. Runtime frames are produced non-destructively by `tools/build-overworld-sprites-v3.py` as `<name>-<direction>-<0|1|2>-v3.png`, with a shared 120×112 canvas and fixed foot baseline. The extra transparent width prevents wide side-step frames from being scaled shorter than idle frames.
