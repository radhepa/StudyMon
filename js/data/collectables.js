/* The collectables catalog.

   Data only. js/engine/collectables.js owns the chest, the display cases and
   everything that writes to the save. The full design - how each category is
   meant to be filled, which sources are live and which are still planned - is
   in COLLECTABLES.md at the repo root; read that before adding a category.

   Three rules this file follows, so the engine never has to special-case
   anything:

     1. Every item belongs to exactly one category, and every category names the
        piece of furniture that displays it ('chest', 'aquarium', 'terrarium').
     2. Every item carries a `found` line: where to look and what it takes. That
        line is shown on the locked tile, so an unfilled collection still tells
        you what to do next instead of just showing a row of question marks.
     3. `art` is optional. Everything renders from `icon` alone, so a category
        is playable the day it is written and only gets prettier when the
        painted tokens land in assets/collect/. */

window.COLLECT_RARITY = {
  common:   { name: 'Common',   order: 1 },
  uncommon: { name: 'Uncommon', order: 2 },
  rare:     { name: 'Rare',     order: 3 },
  prize:    { name: 'Prize',    order: 4 }
};

window.COLLECT_CATEGORIES = [
  {
    id: 'river',
    name: 'River Catch',
    icon: '🐟',
    display: 'aquarium',
    where: 'Riverside Pier, the meadow brook, the Riverside Row washhouse pool',
    blurb: 'Everything that lives in the water the town was built beside.',
    how: 'Cast a line from the pier or either bank. Weather and the hour of ' +
         'the day change what is biting.',
    live: false
  },
  {
    id: 'critters',
    name: 'Hollow & Meadow',
    icon: '🦋',
    display: 'terrarium',
    where: 'Meadow Route, Linden Research Grounds, Hillcrest Terrace, Null Cavern',
    blurb: 'Small things found under leaves, on warm stone and around the ' +
           'cavern lamps.',
    how: 'Search the grass, the stone walls and the lantern posts. Several ' +
         'only come out at night or in the rain.',
    live: false
  },
  {
    id: 'keepsakes',
    name: 'Bootstrap Keepsakes',
    icon: '🎗',
    display: 'chest',
    where: 'The run itself',
    blurb: 'Paper, ribbon and metal from the things you actually did.',
    how: 'These arrive on their own. Every one marks a first: a first badge, ' +
         'a first catch, the first time you sailed.',
    live: true
  }
];

/* ---------------------------------------------------------------------------
   The catalog. `found` is player-facing copy, not a rule the engine reads -
   the rules live with the sources in js/engine/collectables.js and in the
   phase-2 table in COLLECTABLES.md.
   --------------------------------------------------------------------------- */
window.COLLECT_ITEMS = [

  /* ---- River Catch - the aquarium -------------------------------------- */
  { id: 'silverdart', cat: 'river', name: 'Silverdart', rarity: 'common', icon: '🐟',
    blurb: 'A finger-long minnow. The whole shoal turns at once, as if one of ' +
           'them were holding the pointer.',
    found: 'Anywhere on the river, any hour.' },
  { id: 'pebblefish', cat: 'river', name: 'Pebblefish', rarity: 'common', icon: '🐠',
    blurb: 'Patterned exactly like the gravel it sits on, which works until it moves.',
    found: 'The shallows below the pier.' },
  { id: 'glass-shrimp', cat: 'river', name: 'Glass Shrimp', rarity: 'common', icon: '🦐',
    blurb: 'You can watch it eat from the outside. The children at the ' +
           'washhouse find this funnier than the adults do.',
    found: 'The Riverside Row washhouse pool.' },
  { id: 'ribbon-loach', cat: 'river', name: 'Ribbon Loach', rarity: 'uncommon', icon: '🪱',
    blurb: 'Lies along the bottom in a long slow curve and objects to being measured.',
    found: 'Slow water, early morning.' },
  { id: 'lantern-carp', cat: 'river', name: 'Lantern Carp', rarity: 'uncommon', icon: '🎏',
    blurb: 'Pale gold. It rises to the pier lamps at dusk and hangs there ' +
           'like something left on.',
    found: 'Off the pier head at dusk.' },
  { id: 'bootstrap-eel', cat: 'river', name: 'Bootstrap Eel', rarity: 'uncommon', icon: '🐍',
    blurb: 'Loops back through itself to rest. The pier crew named it after ' +
           'something that would not stop compiling.',
    found: 'Under the pier pilings after dark.' },
  { id: 'mirror-trout', cat: 'river', name: 'Mirror Trout', rarity: 'rare', icon: '🐡',
    blurb: 'Only shows itself on a still, bright day, and then only once.',
    found: 'Clear weather, the middle of the day.' },
  { id: 'stack-sturgeon', cat: 'river', name: 'Stack Sturgeon', rarity: 'rare', icon: '🦈',
    blurb: 'Old, plated and enormous. It has been in the deep channel longer ' +
           'than the pier has.',
    found: 'The deep channel off the pier head.' },
  { id: 'null-catfish', cat: 'river', name: 'Null Catfish', rarity: 'rare', icon: '🐋',
    blurb: 'Comes down on the cavern outflow. No eyes at all; it points nowhere ' +
           'and gets there anyway.',
    found: 'Where the Null Cavern water meets the river.' },
  { id: 'heap-koi', cat: 'river', name: 'Heap Koi', rarity: 'prize', icon: '🐳',
    blurb: 'Everyone at the pier has seen it once and nobody twice. It is ' +
           'reportedly the size of a rowing boat and reportedly orange.',
    found: 'Nobody agrees. Fish the river long enough.' },

  /* ---- Hollow & Meadow - the terrarium --------------------------------- */
  { id: 'meadow-flit', cat: 'critters', name: 'Meadow Flit', rarity: 'common', icon: '🦋',
    blurb: 'A small white moth that will not settle while you are watching it.',
    found: 'The Meadow Route, daylight.' },
  { id: 'brass-beetle', cat: 'critters', name: 'Brass Beetle', rarity: 'common', icon: '🪲',
    blurb: 'Polished enough that Tam once tried to sell one as hardware.',
    found: 'Under logs along the meadow path.' },
  { id: 'dew-snail', cat: 'critters', name: 'Dewshell Snail', rarity: 'common', icon: '🐌',
    blurb: 'Carries a shell the colour of wet glass and is in no hurry about it.',
    found: 'Linden Research Grounds, early morning.' },
  { id: 'linden-mantis', cat: 'critters', name: 'Linden Mantis', rarity: 'uncommon', icon: '🐛',
    blurb: 'Holds perfectly still on a greenhouse frame until it decides not to.',
    found: 'The Linden greenhouses, warm afternoons.' },
  { id: 'lantern-moth', cat: 'critters', name: 'Lantern Moth', rarity: 'uncommon', icon: '🦟',
    blurb: 'Comes to the Hollow lamps in numbers. The lamplighter works around them.',
    found: 'Cavern Hollow lamp posts, after dark.' },
  { id: 'glowfly', cat: 'critters', name: 'Cavern Glowfly', rarity: 'uncommon', icon: '✨',
    blurb: 'Gives off just enough light to read one line by.',
    found: 'Null Cavern settlement, night.' },
  { id: 'terrace-skink', cat: 'critters', name: 'Terrace Skink', rarity: 'rare', icon: '🦎',
    blurb: 'Lives in the dry stone walls and comes out for the hour the sun ' +
           'hits them straight on.',
    found: 'Hillcrest Terrace walls, mid-afternoon.' },
  { id: 'rain-frog', cat: 'critters', name: 'Riverside Rain Frog', rarity: 'rare', icon: '🐸',
    blurb: 'Only audible in the rain, and only findable while it is still singing.',
    found: 'Riverside Row, in the rain.' },
  { id: 'pointer-cricket', cat: 'critters', name: 'Pointer Cricket', rarity: 'rare', icon: '🦗',
    blurb: 'Always facing away from whatever you are looking at. Named by ' +
           'somebody who had had a long week.',
    found: 'The meadow at night, in the tall grass.' },
  { id: 'nullfly', cat: 'critters', name: 'Nullfly', rarity: 'prize', icon: '🌑',
    blurb: 'Deep in the cavern. The guides say it casts no shadow, and the ' +
           'guides have had a long week too.',
    found: 'The deep cavern. Bring a lamp.' },

  /* ---- Bootstrap Keepsakes - the shelf in the chest --------------------- */
  { id: 'enrolment-slip', cat: 'keepsakes', name: 'Enrolment Slip', rarity: 'common', icon: '📜',
    blurb: 'Your name, the date, and a box ticked for a textbook you had not ' +
           'opened yet.',
    found: 'In the chest from the first day.' },
  { id: 'first-badge-ribbon', cat: 'keepsakes', name: 'First Badge Ribbon', rarity: 'common', icon: '🎗',
    blurb: 'The ribbon the first badge came pinned to. The badge went on the ' +
           'case; this went in here.',
    found: 'Win your first gym.' },
  { id: 'first-catch-tag', cat: 'keepsakes', name: 'First Catch Tag', rarity: 'common', icon: '🏷',
    blurb: 'The paper tag off the ball. Somebody at the Mart writes the date ' +
           'on these by hand.',
    found: 'Catch your first Pokémon.' },
  { id: 'mart-receipt', cat: 'keepsakes', name: 'Wren’s Stamped Receipt', rarity: 'common', icon: '🧾',
    blurb: 'Stamped twice, because Wren stamps everything twice.',
    found: 'Buy something at the Poké Mart.' },
  { id: 'pressed-linden', cat: 'keepsakes', name: 'Pressed Linden Leaf', rarity: 'uncommon', icon: '🍃',
    blurb: 'Flattened between two pages of notes, which did the notes no good.',
    found: 'The Linden Research Grounds in autumn light.' },
  { id: 'pier-rope-knot', cat: 'keepsakes', name: 'Pier Rope Knot', rarity: 'uncommon', icon: '🪢',
    blurb: 'Someone on the pier tied this in eight seconds and would not slow ' +
           'down to show you how.',
    found: 'Spend time with the pier crew.' },
  { id: 'cracked-compiler-pin', cat: 'keepsakes', name: 'Cracked Compiler Pin', rarity: 'uncommon', icon: '📌',
    blurb: 'Enamel pin, hairline crack across the middle. Still worn.',
    found: 'Finish a job from the quest board.' },
  { id: 'ferry-ticket', cat: 'keepsakes', name: 'Stamped Ferry Ticket', rarity: 'rare', icon: '🎫',
    blurb: 'One crossing, one stamp. They do not take it back off you.',
    found: 'Sail between regions.' },
  { id: 'lamplighter-taper', cat: 'keepsakes', name: 'Lamplighter’s Taper', rarity: 'rare', icon: '🕯',
    blurb: 'Burnt at one end. The Hollow lamplighter hands these on rather ' +
           'than throwing them out.',
    found: 'Befriend the Cavern Hollow lamplighter.' },
  { id: 'champion-laurel', cat: 'keepsakes', name: 'Champion’s Laurel', rarity: 'prize', icon: '🏆',
    blurb: 'Heavier than it looks, and it looks heavy.',
    found: 'Beat the Champion.' }
];
