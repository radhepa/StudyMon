/* Original StudyMon species. These extend the generated PokeAPI roster without
   changing its source data, so rebuilding the official dex remains safe. */
(function () {
  if (!window.DEX) return;

  window.DEX.push(
    {
      id: 1026,
      name: 'papyrunt',
      types: ['psychic'],
      bst: 310,
      stats: { hp: 46, atk: 42, def: 45, spa: 68, spd: 58, spe: 51 },
      height: 4,
      weight: 42,
      genus: 'Bookmark StudyMon',
      flavor: 'It chews discarded notes into soft paper scales. Each new idea makes the red ribbon on its tail curl with excitement.',
      rate: 90,
      legendary: false,
      cry: false,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ink-flick', label: 'Ink Flick', type: 'psychic', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'ribbon-snap', label: 'Ribbon Snap', type: 'normal', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'mind-draft', label: 'Mind Draft', type: 'psychic', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'codex-burst', label: 'Codex Burst', type: 'dragon', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1027, level: 30, how: 'level-up' }]
    },
    {
      id: 1027,
      name: 'codexal',
      types: ['psychic', 'dragon'],
      bst: 420,
      stats: { hp: 62, atk: 54, def: 58, spa: 94, spd: 78, spe: 74 },
      height: 11,
      weight: 286,
      genus: 'Margin StudyMon',
      flavor: 'It stands upright to keep its foreclaws free. The ink-like marks on its hide rearrange whenever it solves a difficult problem.',
      rate: 60,
      legendary: false,
      cry: false,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ink-flick', label: 'Ink Flick', type: 'psychic', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'page-rush', label: 'Page Rush', type: 'dragon', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'mind-draft', label: 'Mind Draft', type: 'psychic', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'codex-burst', label: 'Codex Burst', type: 'dragon', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1028, level: 55, how: 'level-up' }]
    },
    {
      id: 1028,
      name: 'lexidrake',
      types: ['psychic', 'dragon'],
      bst: 540,
      stats: { hp: 84, atk: 68, def: 82, spa: 126, spd: 104, spe: 76 },
      height: 21,
      weight: 910,
      genus: 'Archive StudyMon',
      flavor: 'Its wings preserve every lesson it has mastered. Lost travelers follow the red ribbon trailing behind it to find their way home.',
      rate: 45,
      legendary: false,
      cry: false,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ink-flick', label: 'Ink Flick', type: 'psychic', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'page-rush', label: 'Page Rush', type: 'dragon', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'archive-beam', label: 'Archive Beam', type: 'psychic', power: 90, acc: 100, pp: 10, tier: 3 },
        { id: 'final-chapter', label: 'Final Chapter', type: 'dragon', power: 130, acc: 90, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1029,
      name: 'abyssqueak',
      types: ['water', 'dark'],
      bst: 310,
      stats: { hp: 55, atk: 35, def: 50, spa: 65, spd: 70, spe: 35 },
      height: 3,
      weight: 18,
      genus: 'Stillwater StudyMon',
      flavor: 'It drifts without moving, letting its faint lure pulse only when the water grows completely still. Trainers earn its trust by sharing the silence.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'lure-flick', label: 'Lure Flick', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'shadow-current', label: 'Shadow Current', type: 'dark', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'pressure-wave', label: 'Pressure Wave', type: 'water', power: 85, acc: 95, pp: 15, tier: 3 },
        { id: 'blackwater-maw', label: 'Blackwater Maw', type: 'dark', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1030, level: 16, how: 'level-up' }]
    },
    {
      id: 1030,
      name: 'trenchmaw',
      types: ['water', 'dark'],
      bst: 420,
      stats: { hp: 72, atk: 60, def: 72, spa: 90, spd: 76, spe: 50 },
      height: 14,
      weight: 350,
      genus: 'Trench Hunter StudyMon',
      flavor: 'Its three crown lights measure pressure changes before prey can move. One precise body pulse can shove an intruder away from the trench it guards.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'lure-flick', label: 'Lure Flick', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'trench-bite', label: 'Trench Bite', type: 'dark', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'pressure-wave', label: 'Pressure Wave', type: 'water', power: 85, acc: 95, pp: 15, tier: 3 },
        { id: 'midnight-surge', label: 'Midnight Surge', type: 'dark', power: 115, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1031, level: 36, how: 'level-up' }]
    },
    {
      id: 1031,
      name: 'leviathorn',
      types: ['water', 'dragon'],
      bst: 540,
      stats: { hp: 105, atk: 85, def: 100, spa: 120, spd: 100, spe: 30 },
      height: 120,
      weight: 7800,
      genus: 'Abyss Crown StudyMon',
      flavor: 'Constellation-like lights travel along its body as it bends the pressure of an entire bay. It can crush stone or cradle its trainer in the same current.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'deep-current', label: 'Deep Current', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'dragon-breath', label: 'Dragon Breath', type: 'dragon', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'pressure-dominion', label: 'Pressure Dominion', type: 'water', power: 95, acc: 95, pp: 10, tier: 3 },
        { id: 'leviathan-crush', label: 'Leviathan Crush', type: 'dragon', power: 130, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    }
  );

  /* The Converging Isles originals (1032-1046). Only the first stages are wild,
     and only on Calc routes 4-10 - the routes past Evening Exam I. Sprites are
     cut to the footprint of a stage-matched official sprite by
     assets/fakemon/concepts/isles-roster-v1/prepare_assets.py; cries come from
     make_cries.py beside it. Drenchic's line is the Isles' regional Torchic. */
  window.DEX.push(
    {
      id: 1032,
      name: 'budloth',
      types: ['grass'],
      bst: 318,
      stats: { hp: 50, atk: 60, def: 58, spa: 45, spd: 55, spe: 50 },
      height: 4,
      weight: 88,
      genus: 'Bud Sloth StudyMon',
      flavor: 'It naps in one spot for so long that the bud on its back takes root in the air. The bud stays shut until Budloth finally trusts someone.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'leaf-swipe', label: 'Leaf Swipe', type: 'grass', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'mud-paw', label: 'Mud Paw', type: 'ground', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'bromeliad-burst', label: 'Bromeliad Burst', type: 'grass', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'canopy-crash', label: 'Canopy Crash', type: 'grass', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1033, level: 16, how: 'level-up' }]
    },
    {
      id: 1033,
      name: 'bromelaze',
      types: ['grass', 'ground'],
      bst: 405,
      stats: { hp: 65, atk: 82, def: 72, spa: 55, spd: 66, spe: 65 },
      height: 11,
      weight: 395,
      genus: 'Rosette StudyMon',
      flavor: 'It knuckle-walks everywhere to keep its claws sharp. Rainwater pools in the rosette on its shoulders, and small birds come to drink from it.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'leaf-swipe', label: 'Leaf Swipe', type: 'grass', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'root-rake', label: 'Root Rake', type: 'ground', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'bromeliad-burst', label: 'Bromeliad Burst', type: 'grass', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'earthen-bloom', label: 'Earthen Bloom', type: 'ground', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1034, level: 36, how: 'level-up' }]
    },
    {
      id: 1034,
      name: 'canopodon',
      types: ['grass', 'ground'],
      bst: 530,
      stats: { hp: 95, atk: 115, def: 100, spa: 65, spd: 85, spe: 70 },
      height: 24,
      weight: 2100,
      genus: 'Canopy StudyMon',
      flavor: 'The seven leaves on its back shade a whole clearing. Where it stops to rest for a season, the forest floor grows back thicker than before.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'leaf-swipe', label: 'Leaf Swipe', type: 'grass', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'root-rake', label: 'Root Rake', type: 'ground', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'canopy-crash', label: 'Canopy Crash', type: 'grass', power: 90, acc: 100, pp: 10, tier: 3 },
        { id: 'old-growth-quake', label: 'Old-Growth Quake', type: 'ground', power: 130, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1035,
      name: 'cryoad',
      types: ['ice', 'poison'],
      bst: 300,
      stats: { hp: 48, atk: 44, def: 40, spa: 62, spd: 46, spe: 60 },
      height: 3,
      weight: 21,
      genus: 'Frost Toad StudyMon',
      flavor: 'Its skin is so cold that dew freezes on it into a mild poison. It sits perfectly still on icy stones and blinks only when something gets too close.',
      rate: 140,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'frost-lick', label: 'Frost Lick', type: 'ice', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'toxic-dew', label: 'Toxic Dew', type: 'poison', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'hoarfrost-call', label: 'Hoarfrost Call', type: 'ice', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'venom-glacier', label: 'Venom Glacier', type: 'poison', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1036, level: 30, how: 'level-up' }]
    },
    {
      id: 1036,
      name: 'rimecroak',
      types: ['ice', 'poison'],
      bst: 490,
      stats: { hp: 83, atk: 75, def: 70, spa: 100, spd: 72, spe: 90 },
      height: 13,
      weight: 420,
      genus: 'Rime Frog StudyMon',
      flavor: 'One croak from its violet throat frosts a pond over in seconds. The three plates on its spine grow a new layer every winter it survives.',
      rate: 60,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'frost-lick', label: 'Frost Lick', type: 'ice', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'acid-frost', label: 'Acid Frost', type: 'poison', power: 65, acc: 100, pp: 20, tier: 2 },
        { id: 'hoarfrost-call', label: 'Hoarfrost Call', type: 'ice', power: 90, acc: 100, pp: 10, tier: 3 },
        { id: 'permafrost-venom', label: 'Permafrost Venom', type: 'poison', power: 120, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1037,
      name: 'tallybara',
      types: ['normal', 'psychic'],
      bst: 460,
      stats: { hp: 100, atk: 55, def: 80, spa: 90, spd: 90, spe: 45 },
      height: 9,
      weight: 480,
      genus: 'Abacus StudyMon',
      flavor: 'It slides the beads on its tail to keep count of everything around it. Other creatures settle down beside it, as if its calm is catching.',
      rate: 120,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'tally-tap', label: 'Tally Tap', type: 'normal', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'bead-count', label: 'Bead Count', type: 'psychic', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'abacus-slam', label: 'Abacus Slam', type: 'normal', power: 85, acc: 100, pp: 10, tier: 3 },
        { id: 'sum-of-all', label: 'Sum of All', type: 'psychic', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1038,
      name: 'kilnscarab',
      types: ['fire', 'bug'],
      bst: 500,
      stats: { hp: 80, atk: 110, def: 120, spa: 70, spd: 80, spe: 40 },
      height: 8,
      weight: 910,
      genus: 'Kiln Beetle StudyMon',
      flavor: 'The seam down its back glows like a kiln door. It rolls wet clay under its shell and brings it back out fired hard enough to build with.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ember-nip', label: 'Ember Nip', type: 'fire', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'carapace-ram', label: 'Carapace Ram', type: 'bug', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'kiln-seam', label: 'Kiln Seam', type: 'fire', power: 85, acc: 100, pp: 10, tier: 3 },
        { id: 'terracotta-rampage', label: 'Terracotta Rampage', type: 'bug', power: 115, acc: 90, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1039,
      name: 'drenchic',
      types: ['water', 'electric'],
      bst: 310,
      stats: { hp: 45, atk: 50, def: 40, spa: 75, spd: 55, spe: 45 },
      height: 4,
      weight: 24,
      genus: 'Squall Chick StudyMon',
      flavor: 'The Isles form of Torchic hatches in storm-soaked nests on the sea cliffs. Its down is always damp, and a stray spark snaps off it when it shakes dry.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'spray-peck', label: 'Spray Peck', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'static-down', label: 'Static Down', type: 'electric', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'crest-wave', label: 'Crest Wave', type: 'water', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'squall-kick', label: 'Squall Kick', type: 'electric', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1040, level: 16, how: 'level-up' }]
    },
    {
      id: 1040,
      name: 'condusken',
      types: ['water', 'electric'],
      bst: 405,
      stats: { hp: 60, atk: 70, def: 60, spa: 95, spd: 60, spe: 60 },
      height: 9,
      weight: 190,
      genus: 'Conductor StudyMon',
      flavor: 'Seawater soaked into its feathers carries current from its legs to its wing paddles. It drills its kicks in the surf until the waves spark.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'spray-peck', label: 'Spray Peck', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'current-kick', label: 'Current Kick', type: 'electric', power: 65, acc: 100, pp: 20, tier: 2 },
        { id: 'crest-wave', label: 'Crest Wave', type: 'water', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'riptide-blitz', label: 'Riptide Blitz', type: 'water', power: 115, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1041, level: 36, how: 'level-up' }]
    },
    {
      id: 1041,
      name: 'blitziken',
      types: ['water', 'electric'],
      bst: 530,
      stats: { hp: 80, atk: 90, def: 70, spa: 125, spd: 75, spe: 90 },
      height: 19,
      weight: 510,
      genus: 'Thunderhead StudyMon',
      flavor: 'It fights at the edge of a storm front, and its crest plumes crackle before lightning strikes nearby. A single kick throws spray higher than the sea wall.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'sea-spark', label: 'Sea Spark', type: 'electric', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'current-kick', label: 'Current Kick', type: 'electric', power: 65, acc: 100, pp: 20, tier: 2 },
        { id: 'thunderhead-kick', label: 'Thunderhead Kick', type: 'electric', power: 90, acc: 100, pp: 10, tier: 3 },
        { id: 'maelstrom-blitz', label: 'Maelstrom Blitz', type: 'water', power: 130, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1042,
      name: 'fernip',
      types: ['bug', 'grass'],
      bst: 290,
      stats: { hp: 45, atk: 45, def: 55, spa: 50, spd: 55, spe: 40 },
      height: 3,
      weight: 30,
      genus: 'Fiddlehead StudyMon',
      flavor: 'It curls up so tightly that it passes for an unopened fern. It only uncurls its antennae once it is sure the shadow overhead is a cloud.',
      rate: 190,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'frond-nibble', label: 'Frond Nibble', type: 'grass', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'silk-curl', label: 'Silk Curl', type: 'bug', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'fiddlehead-lash', label: 'Fiddlehead Lash', type: 'grass', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'spore-spiral', label: 'Spore Spiral', type: 'bug', power: 105, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1043, level: 22, how: 'level-up' }]
    },
    {
      id: 1043,
      name: 'brackenwing',
      types: ['bug', 'grass'],
      bst: 475,
      stats: { hp: 70, atk: 60, def: 70, spa: 105, spd: 90, spe: 80 },
      height: 12,
      weight: 160,
      genus: 'Fern Moth StudyMon',
      flavor: 'Its four frond wings let it hover without a sound. The spirals on its wings match the pattern of the fern it hatched under.',
      rate: 75,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'frond-nibble', label: 'Frond Nibble', type: 'grass', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'wing-frond', label: 'Wing Frond', type: 'bug', power: 65, acc: 100, pp: 20, tier: 2 },
        { id: 'bracken-gale', label: 'Bracken Gale', type: 'grass', power: 90, acc: 100, pp: 10, tier: 3 },
        { id: 'canopy-swarm', label: 'Canopy Swarm', type: 'bug', power: 120, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1044,
      name: 'cairnkid',
      types: ['rock', 'fairy'],
      bst: 320,
      stats: { hp: 60, atk: 60, def: 65, spa: 35, spd: 60, spe: 40 },
      height: 5,
      weight: 140,
      genus: 'Cairn Kid StudyMon',
      flavor: 'It stacks pebbles into little towers along mountain trails. Hikers who follow its cairns always find the way back down.',
      rate: 190,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'pebble-butt', label: 'Pebble Butt', type: 'rock', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'quartz-glint', label: 'Quartz Glint', type: 'fairy', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'cairn-charge', label: 'Cairn Charge', type: 'rock', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'crystal-crescent', label: 'Crystal Crescent', type: 'fairy', power: 105, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1045, level: 32, how: 'level-up' }]
    },
    {
      id: 1045,
      name: 'cragibex',
      types: ['rock', 'fairy'],
      bst: 480,
      stats: { hp: 90, atk: 110, def: 100, spa: 50, spd: 80, spe: 50 },
      height: 15,
      weight: 1050,
      genus: 'Summit StudyMon',
      flavor: 'Its rose-quartz horns ring like a bell when it charges. The herd follows whichever Cragibex has the tallest cairn mantle.',
      rate: 75,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'pebble-butt', label: 'Pebble Butt', type: 'rock', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'rose-quartz-ram', label: 'Rose Quartz Ram', type: 'fairy', power: 70, acc: 100, pp: 20, tier: 2 },
        { id: 'slab-slide', label: 'Slab Slide', type: 'rock', power: 95, acc: 95, pp: 10, tier: 3 },
        { id: 'summit-crescent', label: 'Summit Crescent', type: 'fairy', power: 125, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1046,
      name: 'tumblerook',
      types: ['steel', 'flying'],
      bst: 470,
      stats: { hp: 65, atk: 90, def: 110, spa: 45, spd: 70, spe: 90 },
      height: 8,
      weight: 330,
      genus: 'Lockpick StudyMon',
      flavor: 'The two feathers on its tail are shaped like old keys, and it tests them on every lock it finds. It keeps whatever it opens.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'lock-peck', label: 'Lock Peck', type: 'steel', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'keen-swoop', label: 'Keen Swoop', type: 'flying', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'tumbler-strike', label: 'Tumbler Strike', type: 'steel', power: 85, acc: 100, pp: 10, tier: 3 },
        { id: 'master-key-dive', label: 'Master Key Dive', type: 'flying', power: 115, acc: 90, pp: 5, tier: 4 }
      ],
      evo: []
    }
  );
})();
