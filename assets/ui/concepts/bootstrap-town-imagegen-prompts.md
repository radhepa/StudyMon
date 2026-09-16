# Bootstrap Town concept image prompts

These are the final prompts used with the built-in image-generation workflow. The referenced source art remains in this repository.

## Living-world gameplay mockup

Referenced inputs:

1. `assets/ui/kingdom-lantern-square.png`
2. `assets/trainers/wren-full.png`
3. `assets/trainers/ada-full.png`

```text
Use case: ui-mockup
Asset type: production concept mockup for the StudyMon browser game's Bootstrap Town vertical slice
Primary request: Create one polished 16:9 gameplay mockup showing Bootstrap Town as a genuinely playable top-down pixel-art RPG town, with small human sprites walking around and an active interaction with the Mart clerk Wren.
Input images: Image 1 is the exact environmental pixel-art visual language and rendering-density reference; Image 2 is Wren's canonical character design; Image 3 is Nurse Ada's canonical character design.
Scene/backdrop: a cozy, verdant woodland town square connected by readable paths. Clearly include a Poké Centre with a red roof and medical sign, a blue-roof Mart, Professor's small field lab, a fenced practice field, four modest homes, a central noticeboard, benches, flowerbeds, and exits toward the meadow and river. Make the routes and doorways visually legible for play. Do not copy the exact layout of Image 1.
Subject: the player character is a tiny readable pixel sprite facing Wren near the Mart doorway. Several other small human NPC sprites are visibly following routines: Nurse Ada outside the Centre, a post runner crossing the square, and a rival practicing by the fenced field. Their silhouettes and colors should be distinct at gameplay scale.
UI state: show a large cream dialogue box docked across the bottom quarter of the screen with a dark forest-green border and warm gold accent. Wren's clean anime portrait appears cropped at the left of the dialogue box; the right side contains only simple dark placeholder dialogue lines with no readable words. A small interaction indicator appears above Wren's overworld sprite. Include a compact top-right HUD with small icon placeholders for time, weather, and current objective, but no readable text.
Style/medium: cohesive hand-painted 16-bit/32-bit pixel art environment matching Image 1's lush forest-town palette and warm lighting; crisp pixel character sprites; portrait retains Image 2's clean anime character identity.
Composition/framing: elevated top-down game camera, full gameplay viewport, strong navigational clarity, town square centered, buildings around edges, dialogue overlay visibly part of the game.
Lighting/mood: warm late-morning light, cozy and lively, gentle shadows, optimistic adventure.
Color palette: forest green, cream, warm honey gold, terracotta red, weathered blue.
Constraints: no copyrighted franchise logos or recognizable official Pokémon characters; no watermark; no illegible fake prose; keep overworld people clearly tiny pixel sprites while the interaction portrait is polished painted anime art; Wren must retain teal hair, navy-and-white cap, navy Mart shirt with orange collar and tan apron; Nurse Ada must retain green bob haircut and pink-and-white nurse uniform; gameplay layout must feel traversable and collision-friendly.
Avoid: card-grid UI, isometric camera, photorealism, 3D rendering, giant chibi characters, empty decorative concept art, combat scene, menu screen.
```

## Human sprite direction sheet

Referenced inputs:

1. `assets/trainers/wren-full.png`
2. `assets/trainers/ada-full.png`
3. `assets/trainers/bell-full.png`
4. `assets/trainers/rowan-full.png`

```text
Use case: stylized-concept
Asset type: human overworld sprite direction sheet for the StudyMon Bootstrap Town design handoff; concept reference, not a production-packed atlas
Primary request: Create a clean pixel-art character sheet for four canonical StudyMon humans. For each character, show a consistent tiny top-down RPG overworld sprite in four views: front idle, back idle, left-facing walk, right-facing walk. Arrange as four horizontal character rows and four evenly spaced columns. No labels or text.
Input images: Image 1 is Wren canonical design; Image 2 is Nurse Ada canonical design; Image 3 is Bell canonical design; Image 4 is Rowan canonical design. Preserve each person's most recognizable hair, hat, outfit color, and silhouette.
Style/medium: crisp handcrafted 32-bit pixel art, Stardew-like readability and warmth but original StudyMon visual language, limited palette, single-pixel highlights, dark selective outlines, slightly oversized heads for recognition.
Composition/framing: orthographic sprite-sheet grid, every figure fully visible, identical footprint and baseline, generous transparent spacing around every sprite. Each sprite should visually fit a nominal 32 by 48 pixel game footprint, presented enlarged with hard nearest-neighbor edges.
Lighting/mood: neutral game-asset lighting.
Constraints: truly transparent background; exactly four people and exactly four views per person; consistent scale; no shadows extending outside footprint; no props except those inseparable from the character silhouette; no readable lettering; no logos; no watermark. Wren retains teal hair, navy-white cap, navy shirt/orange collar, tan apron. Ada retains green bob, white nurse cap, pink-white uniform. Bell must follow Image 3. Rowan must follow Image 4.
Avoid: painted anime portraits, anti-aliased vector art, 3D, isometric perspective, huge sprite bodies, mixed scales, scenery, tiles, captions, decorative border.
```
