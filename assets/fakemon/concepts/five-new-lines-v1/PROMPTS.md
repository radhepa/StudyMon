# Five new Fakemon front concepts

Built-in image generation was used in reference/edit mode. The local StudyMon
sprite library supplied technical references for occupied scale, pixel economy,
color clustering, pose readability, and outline weight only.

## House-style analysis

- The approved StudyMon originals use a readable single-mass silhouette, dark
  chromatic outlines, large flat pixel clusters, and only a few stepped highlight
  bands.
- Early stages carry large, open eyes and compact proportions. Evolved stages
  narrow the eyes, lengthen the face, shift the posture, and promote one line
  motif into the dominant silhouette.
- A line keeps three or four unmistakable identifiers while avoiding the look of
  a scaled-up first stage.
- Accent colors are sparse and repeated at high-value identity points: eyes,
  ribbon/lure equivalents, and one large marking rather than micro-texture.
- Final 96x96 fronts are binary-alpha images with 15 opaque colors, no shadow,
  no backdrop, no gradients, no dithering, and no disconnected pixels.

## Roster

| Line | Species | Type | Role |
|---|---|---|---|
| Fern line | Fernip | Bug/Grass | First stage |
| Fern line | Brackenwing | Bug/Grass | Final stage |
| Cairn line | Cairnkid | Rock/Fairy | First stage |
| Cairn line | Cragibex | Rock/Fairy | Final stage |
| Standalone | Tumblerook | Steel/Flying | Standalone |

## Fernip

Technical reference: Sewaddle front (#540).

```text
Use case: precise-object-edit
Asset type: front battle sprite concept for the StudyMon game
Input images: Image 1 (Sewaddle) is ONLY a technical reference for authentic first-stage late-2000s handheld creature-battler pixel economy, compact occupied scale, solid color clustering, restrained palette, pose readability, and dark colored outline weight. It must not influence anatomy, markings, facial design, leaf wrapping, or colors.
Primary request: Design and draw FERNIP, a brand-new original first-stage Bug/Grass creature, as true low-resolution pixel art. Fernip is a plump low-to-the-ground caterpillar with six tiny feet, three rounded body segments, a cream face plate shaped like a soft downward point, two short curled fiddlehead antennae, a single serrated leaf collar behind the head, and one tightly curled fern-tip tail. Its large copper-orange eyes are set wide and read as shy, observant, and young. Keep the anatomy simple and mascot-readable.
Persistent evolution motifs: exactly two curled fiddlehead antennae, cream face plate, copper-orange eyes, and one bold spiral fern marking on the visible flank. These identifiers must be clear and uncluttered.
Color palette: main moss green, secondary cream face/collar underside, outline near-black forest green, eye copper orange with one pale highlight, accent muted rust-red spiral marking. Keep the complete sprite to 11-14 opaque colors.
Style/medium: crisp late-2000s handheld creature-battler sprite matching StudyMon's Papyrunt and Abyssqueak house style; roughly 40x34 logical-pixel construction; hard one-pixel stair-step edges; large deliberate pixel clusters; flat stepped highlights; readable black silhouette.
Composition/framing: one full creature centered on a genuinely transparent 96x96 canvas, compact first-stage visual mass, three-quarter front view facing lower left, feet near y=90.
Constraints: no shadow, backdrop, checkerboard, anti-aliasing, semi-transparent edges, blur, smooth gradients, dithering, scattered single-pixel texture, text, watermark, extra wings, extra horns, leaf cocoon, clothing, or extra anatomy. Do not copy Sewaddle's anatomy, leaf hood, markings, face, pose, or colors. This is an original creature and must not resemble any existing Pokémon species.
```

## Brackenwing

Identity reference: generated Fernip source. Technical reference: Mothim front
(#414).

```text
Use case: precise-object-edit
Asset type: front battle sprite concept for the StudyMon game
Input images: Image 1 is the approved Fernip identity and defines the evolution line's exact moss-green, cream, rust-red, near-black forest outline, copper eyes, curled fiddlehead shapes, spiral motif, and pixel construction. Image 2 (Mothim) is ONLY a technical reference for authentic final-stage late-2000s handheld creature-battler pixel economy, broad airborne occupied scale, solid color clustering, restrained palette, pose readability, and outline weight. It must not influence anatomy, wing layout, markings, pose, face, or colors.
Primary request: Design and draw BRACKENWING, Fernip's mature two-stage evolution, as true low-resolution pixel art. Brackenwing is a broad four-winged fern moth hovering in a controlled three-quarter front battle pose. It has a small tapered moth body, a longer angular cream face plate, exactly two large curled fiddlehead antennae, a layered cream serrated-leaf collar, two powerful upper wings shaped as sweeping fern fronds, two shorter rounded lower wings, and six small legs tucked beneath the body. The upper wings must be strongly leaf-frond shaped with three large simple lobe cutouts each, not ordinary butterfly triangles.
Identity preservation: keep Fernip's exact moss-green family, cream face/collar, near-black forest-green outline, copper-orange eyes, and muted rust-red spiral motif. Place exactly one bold rust-red spiral marking on each visible upper wing. Preserve the double-curled antenna silhouette. Do not preserve Fernip's baby proportions or identical face.
Evolution change: Brackenwing's face is longer and narrower than Fernip's, its copper eyes are half-lidded and sharply angled rather than huge and round, its posture is calm and elevated rather than low and timid, and its visual hierarchy is dominated by the two fern-frond upper wings. It should read as poised, watchful, and fully mature.
Color palette: main deep moss green, secondary cream face/collar/wing lobes, outline near-black forest green, eye copper orange with one pale highlight, accent muted rust-red spiral markings. Keep the complete sprite to 13-15 opaque colors.
Style/medium: crisp late-2000s handheld creature-battler sprite matching StudyMon's evolved-form house style; roughly 68x60 logical-pixel construction; hard one-pixel stair-step edges; large deliberate color clusters; flat stepped highlights; readable black silhouette.
Composition/framing: one full creature centered on a genuinely transparent 96x96 canvas, imposing two-stage final-evolution visual mass, three-quarter front view facing lower left, wings spread asymmetrically for depth but fully inside frame.
Constraints: no shadow, backdrop, checkerboard, anti-aliasing, semi-transparent edges, blur, smooth gradients, dithering, scattered single-pixel texture, text, watermark, leaf cocoon, flower motifs, eye spots, extra antennae, extra wings, or extra anatomy. Do not copy Mothim's anatomy, wing geometry, face, markings, pose, or colors. Preserve Fernip's line identity exactly while making the evolution structurally distinct.
```

## Cairnkid

Technical reference: Deerling front (#585).

```text
Use case: precise-object-edit
Asset type: front battle sprite concept for the StudyMon game
Input images: Image 1 (Deerling) is ONLY a technical reference for authentic first-stage late-2000s handheld creature-battler pixel economy, compact quadruped occupied scale, solid color clustering, restrained palette, pose readability, and dark colored outline weight. It must not influence anatomy, markings, floral features, pose, or colors.
Primary request: Design and draw CAIRNKID, a brand-new original first-stage Rock/Fairy creature, as true low-resolution pixel art. Cairnkid is a compact mountain-goat kid with a sturdy barrel chest, four short cloven legs, a small wedge muzzle, two low triangular ears, and exactly two blunt translucent crystal horn buds. A small layered stone ruff circles the neck like three overlapping cairn slabs. Its large turquoise eyes sit under a gentle brow and read as curious, stubborn, and young.
Persistent evolution motifs: exactly two rose-quartz horn buds, a pale quartz diamond blaze centered on the forehead, the three-slab stone neck ruff, turquoise eyes, and dark slate hooves. Keep these identifiers bold and sparse.
Color palette: main warm charcoal-grey coat, secondary pale quartz face blaze and chest, outline near-black blue-grey, eye turquoise with one pale highlight, accent dusty rose-pink crystal horns. Keep the complete sprite to 11-14 opaque colors.
Style/medium: crisp late-2000s handheld creature-battler sprite matching StudyMon's Papyrunt and Abyssqueak house style; roughly 40x40 logical-pixel construction; hard one-pixel stair-step edges; large deliberate pixel clusters; flat stepped highlights; readable black silhouette.
Composition/framing: one full creature centered on a genuinely transparent 96x96 canvas, compact first-stage visual mass, three-quarter front view facing lower left, hooves near y=90.
Constraints: no shadow, backdrop, checkerboard, anti-aliasing, semi-transparent edges, blur, smooth gradients, dithering, scattered single-pixel texture, text, watermark, antlers, flowers, wool, beard, armor covering the body, extra horns, or extra anatomy. Do not copy Deerling's anatomy, markings, face, pose, or colors. This is an original creature and must not resemble any existing Pokémon species.
```

## Cragibex

Identity reference: generated Cairnkid source. Technical reference: Stantler front
(#234).

```text
Use case: precise-object-edit
Asset type: front battle sprite concept for the StudyMon game
Input images: Image 1 is the approved Cairnkid identity and defines the evolution line's exact charcoal-grey coat, pale quartz markings, near-black blue-grey outline, turquoise eyes, rose crystal, three-slab neck ruff, cloven hooves, and pixel construction. Image 2 (Stantler) is ONLY a technical reference for authentic final-stage late-2000s handheld creature-battler pixel economy, large horned-quadruped occupied scale, solid color clustering, restrained palette, grounded pose readability, and outline weight. It must not influence anatomy, antler design, markings, tail, face, pose, or colors.
Primary request: Design and draw CRAGIBEX, Cairnkid's mature two-stage evolution, as true low-resolution pixel art. Cragibex is a muscular mountain ibex with a low forward-braced quadruped stance, deep chest, strong compact legs, split slate hooves, a longer wedge muzzle, small swept-back ears, and exactly two massive rose-quartz horns that rise straight from the brow then arc backward in one clean crescent each. The horns are thick faceted crystal, not branching antlers. Cairnkid's three small neck slabs have grown into a broad three-tier cairn mantle around the shoulders, each tier a single large pale-grey rock plate.
Identity preservation: keep Cairnkid's exact warm charcoal-grey coat, pale quartz diamond blaze centered on the forehead, turquoise eyes, rose-pink crystal horns, near-black blue-grey outline, three-tier stone ruff, and dark slate hooves. Do not preserve Cairnkid's baby proportions or identical face.
Evolution change: Cragibex's muzzle is longer and more angular, its turquoise eyes are smaller and sharply focused beneath a heavy brow rather than large and round, its torso is deep and powerful, its tail is a short stone-tipped wedge, and its visual hierarchy is dominated by the paired backward crystal crescents and broad cairn mantle. It should read as stoic, protective, and fully mature.
Color palette: main warm charcoal-grey coat, secondary pale quartz blaze/chest/cairn plates, outline near-black blue-grey, eye turquoise with one pale highlight, accent dusty rose-pink crystal horns. Keep the complete sprite to 13-15 opaque colors.
Style/medium: crisp late-2000s handheld creature-battler sprite matching StudyMon's evolved-form house style; roughly 72x66 logical-pixel construction; hard one-pixel stair-step edges; large deliberate color clusters; flat stepped highlights; readable black silhouette.
Composition/framing: one full creature centered on a genuinely transparent 96x96 canvas, imposing two-stage final-evolution visual mass, three-quarter front view facing lower left, all four hooves grounded near y=91, horns fully inside frame.
Constraints: no shadow, backdrop, checkerboard, anti-aliasing, semi-transparent edges, blur, smooth gradients, dithering, scattered single-pixel texture, text, watermark, branching antlers, flowers, wool, beard, body armor, extra horns, or extra anatomy. Do not copy Stantler's anatomy, antlers, tail, face, markings, pose, or colors. Preserve Cairnkid's line identity exactly while making the evolution structurally distinct.
```

## Tumblerook

Technical reference: Braviary front (#628).

```text
Use case: precise-object-edit
Asset type: front battle sprite concept for the StudyMon game
Input images: Image 1 (Braviary) is ONLY a technical reference for authentic standalone late-2000s handheld creature-battler pixel economy, medium-large flying creature occupied scale, solid color clustering, restrained palette, dynamic pose readability, and dark colored outline weight. It must not influence anatomy, plumage arrangement, face, colors, pose, or patriotic motifs.
Primary request: Design and draw TUMBLEROOK, a brand-new original standalone Steel/Flying creature, as true low-resolution pixel art. Tumblerook is a sleek magpie-like bird standing in a forward-leaning three-quarter battle pose on two visible feet. It has a narrow clever face, short wedge beak, swept-back crown feather, compact folded wings shaped like overlapping metal lock plates, and a long split tail whose two outer feathers end in simple antique-key silhouettes: one round bow and one single tooth each. Its turquoise eye is narrow and reads as calculating, mischievous, and mature.
Signature motifs: exactly two key-ended outer tail feathers, a small round keyhole marking centered on the breast, three large overlapping lock-plate shapes on each folded wing, and a single oxidized-teal crown feather. Keep the concept bold, sparse, and instantly readable.
Color palette: main pale silver-grey plumage, secondary charcoal wing plates and tail, outline near-black navy, eye bright turquoise, accent muted antique brass on beak, talons, key-tail tips, and breast keyhole. Keep the complete sprite to 12-15 opaque colors.
Style/medium: crisp late-2000s handheld creature-battler sprite matching StudyMon's Codexal and Trenchmaw house style; roughly 60x56 logical-pixel construction; hard one-pixel stair-step edges; large deliberate pixel clusters; flat stepped highlights; readable black silhouette.
Composition/framing: one full creature centered on a genuinely transparent 96x96 canvas, medium-large standalone visual mass, three-quarter front view facing lower left, both talons visible near y=90, tail sweeping upward right.
Constraints: no shadow, backdrop, checkerboard, anti-aliasing, semi-transparent edges, blur, smooth gradients, dithering, scattered single-pixel texture, text, watermark, floating keys, key ring, chains, armor helmet, extra wings, spread eagle wings, or extra anatomy. Do not copy Braviary's anatomy, plumage, face, pose, markings, or colors. This is an original creature and must not resemble any existing Pokémon species.
```
