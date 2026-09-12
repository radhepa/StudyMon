/* Central item registry and Phase 3 item contract. Engine modules keep their
   established public APIs, but item identity and policy live here. */
var ITEM_CATEGORIES = [
  'capture', 'medicine', 'battle-utility', 'training', 'evolution',
  'exploration', 'key', 'collectible', 'gift', 'flavor'
];
var ITEM_RARITIES = ['common', 'uncommon', 'rare', 'very-rare', 'unique'];
var ITEM_VALUE_BANDS = [
  { id: 'free', min: 0, max: 0 },
  { id: 'low', min: 1, max: 299 },
  { id: 'standard', min: 300, max: 699 },
  { id: 'high', min: 700, max: 1499 },
  { id: 'premium', min: 1500, max: Infinity }
];
var ITEM_EFFECT_HANDLERS = [
  'capture', 'battle-heal', 'party-heal', 'party-revive', 'battle-escape',
  'party-level', 'party-evolution', 'passive-exp-share', 'gift', 'none'
];

var ITEMS = {
  great: {
    name: 'Great Ball', category: 'capture', rarity: 'uncommon', value: 600,
    price: 600, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'capture', usableIn: ['battle'], captureMultiplier: 1.5,
    discoveryText: 'Sold at Poké Marts throughout both regions.',
    description: 'Half again the catch rate. Worth it for something you would be sad to lose.'
  },
  ultra: {
    name: 'Ultra Ball', category: 'capture', rarity: 'rare', value: 1400,
    price: 1400, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'capture', usableIn: ['battle'], captureMultiplier: 2,
    discoveryText: 'Sold at Poké Marts and awarded for major victories.',
    description: 'Double the catch rate. Save them for the rare ones.'
  },
  potion: {
    name: 'Potion', category: 'medicine', rarity: 'common', value: 250,
    price: 250, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'battle-heal', usableIn: ['battle'],
    healing: { mode: 'fraction', amount: 0.5 },
    discoveryText: 'Sold at Poké Marts and found through battles and local gifts.',
    description: 'Restores about half of a Pokémon\'s health.'
  },
  superpotion: {
    name: 'Super Potion', category: 'medicine', rarity: 'uncommon', value: 650,
    price: 650, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'battle-heal', usableIn: ['battle'],
    healing: { mode: 'fraction', amount: 1 },
    discoveryText: 'Sold at Poké Marts and awarded for elite victories.',
    description: 'Restores a Pokémon completely.'
  },
  oran: {
    name: 'Oran Berry', category: 'medicine', rarity: 'common', value: 200,
    price: 200, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'party-heal', usableIn: ['party'],
    healing: { mode: 'flat', amount: 10 },
    discoveryText: 'Awarded by early C-region side quests.',
    description: 'Restores 10 HP to a living Pokémon between battles.'
  },
  sitrus: {
    name: 'Sitrus Berry', category: 'medicine', rarity: 'uncommon', value: 500,
    price: 500, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'party-heal', usableIn: ['party'],
    healing: { mode: 'fraction', amount: 0.25 },
    discoveryText: 'Awarded by intermediate and advanced C-region side quests.',
    description: 'Restores a quarter of max HP to a living Pokémon between battles.'
  },
  revive: {
    name: 'Revive', category: 'medicine', rarity: 'uncommon', value: 900,
    price: 900, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'party-revive', usableIn: ['party'],
    revival: { mode: 'fraction', amount: 0.5 },
    discoveryText: 'Planned for later Poké Marts and difficult trainer rewards.',
    description: 'Revives one fainted Pokémon with half of its maximum HP.'
  },
  pokeDoll: {
    name: 'Poké Doll', category: 'battle-utility', rarity: 'uncommon', value: 700,
    price: 700, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'battle-escape', usableIn: ['battle'],
    discoveryText: 'Planned for route merchants and cautious explorer rewards.',
    description: 'Ends a wild battle safely. It has no effect in trainer battles.'
  },
  rareCandy: {
    name: 'Rare Candy', category: 'training', rarity: 'rare', value: 1200,
    price: 1200, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'party-level', usableIn: ['party'],
    discoveryText: 'Planned as a scarce gym, quest and exploration reward.',
    description: 'Raises a living Pokémon by one level. It cannot help at level 100.'
  },
  prismStone: {
    name: 'Prism Stone', category: 'evolution', rarity: 'very-rare', value: 1400,
    price: 1400, sellable: true, consumable: true, unique: false, maxStack: 99,
    effectHandler: 'party-evolution', usableIn: ['party'],
    discoveryText: 'Planned as a one-time reward in each region and a rare late-game discovery.',
    description: 'Lets a Pokémon with several evolution paths choose one immediately.'
  },
  expShare: {
    name: 'EXP Share', category: 'key', rarity: 'unique', value: 0,
    price: 0, sellable: false, consumable: false, unique: true, maxStack: 1,
    effectHandler: 'passive-exp-share', usableIn: ['passive'],
    discoveryText: 'Kern gives this to the player during an ordinary conversation in Bootstrap Town.',
    description: 'A device that shares battle experience with the rest of your party.'
  },
  trailPermit: {
    name: 'Ranger Trail Permit', category: 'exploration', rarity: 'unique', value: 0,
    price: 0, sellable: false, consumable: false, unique: true, maxStack: 1,
    effectHandler: 'none', usableIn: ['passive'],
    discoveryText: 'Planned as a one-time ranger receipt before the C-region back trails open.',
    description: 'Proof that the ranger station cleared you for marked back trails. Never consumed.'
  },
  fieldNotebook: {
    name: 'Field Notebook', category: 'exploration', rarity: 'unique', value: 0,
    price: 0, sellable: false, consumable: false, unique: true, maxStack: 1,
    effectHandler: 'none', usableIn: ['passive'],
    discoveryText: 'Planned as a one-time Calculus-region surveyor gift.',
    description: 'A waterproof notebook for recording landmarks and odd local clues. Never consumed.'
  },
  circuitToken: {
    name: 'Copper Circuit Token', category: 'collectible', rarity: 'uncommon', value: 180,
    price: 180, sellable: false, consumable: false, unique: false, maxStack: 12,
    effectHandler: 'none', usableIn: ['collection'], collection: 'regionalKeepsakes',
    discoveryText: 'Planned for hidden C-region route caches and optional trainer rematches.',
    description: 'A stamped copper trace from the old circuit works. One of the regional keepsakes.'
  },
  seaGlass: {
    name: 'Tumbled Sea Glass', category: 'collectible', rarity: 'uncommon', value: 160,
    price: 160, sellable: false, consumable: false, unique: false, maxStack: 12,
    effectHandler: 'none', usableIn: ['collection'], collection: 'regionalKeepsakes',
    discoveryText: 'Planned for shore discoveries and a ferry-deck conversation reward.',
    description: 'Blue-green glass worn perfectly smooth by the ferry coast. One of the regional keepsakes.'
  },
  integralToken: {
    name: 'Brass Integral Token', category: 'collectible', rarity: 'rare', value: 260,
    price: 260, sellable: false, consumable: false, unique: false, maxStack: 12,
    effectHandler: 'none', usableIn: ['collection'], collection: 'regionalKeepsakes',
    discoveryText: 'Planned for Calculus-region overlooks, gyms and optional route challenges.',
    description: 'A weighty brass token from the hillside tram. One of the regional keepsakes.'
  },
  teaTin: {
    name: 'Juniper Tea Tin', category: 'gift', rarity: 'uncommon', value: 420,
    price: 420, sellable: true, consumable: true, unique: false, maxStack: 12,
    effectHandler: 'gift', usableIn: ['gift'], giftTags: ['tea', 'portable-food', 'handmade'],
    discoveryText: 'Planned for Bootstrap Town and harbor specialty counters.',
    description: 'A pine-bright tea blend meant for sharing, not for use from the Party bag.'
  },
  pressedFlower: {
    name: 'Pressed Route Flower', category: 'gift', rarity: 'uncommon', value: 360,
    price: 360, sellable: true, consumable: true, unique: false, maxStack: 12,
    effectHandler: 'gift', usableIn: ['gift'], giftTags: ['handmade', 'cut-flowers', 'postcards', 'art-supplies'],
    discoveryText: 'Planned as a careful exploration find on grassy routes in both regions.',
    description: 'A tiny route flower pressed between handmade paper, with the place and date pencilled below.'
  },
  hotSauce: {
    name: 'Volcano Hot Sauce', category: 'gift', rarity: 'rare', value: 680,
    price: 680, sellable: true, consumable: true, unique: false, maxStack: 12,
    effectHandler: 'gift', usableIn: ['gift'], giftTags: ['portable-food', 'camp-food', 'novelty-gadgets', 'showy-luxury'],
    discoveryText: 'Planned for a late C-region food stall and one cook-off reward.',
    description: 'A smoky local sauce whose warning label is much too cheerful.'
  },
  carvedWhistle: {
    name: 'Carved Bird Whistle', category: 'gift', rarity: 'rare', value: 760,
    price: 760, sellable: true, consumable: true, unique: false, maxStack: 12,
    effectHandler: 'gift', usableIn: ['gift'], giftTags: ['handmade', 'instrument-care', 'fragile-ornaments', 'desk-ornaments', 'ceremonial-gifts'],
    discoveryText: 'Planned for a Calculus-region artisan and a woodland discovery.',
    description: 'A thumb-sized wooden whistle with a clear, surprisingly serious note.'
  },
  bentSpoon: {
    name: 'Mysteriously Bent Spoon', category: 'flavor', rarity: 'uncommon', value: 90,
    price: 90, sellable: true, consumable: false, unique: false, maxStack: 3,
    effectHandler: 'none', usableIn: ['display'],
    discoveryText: 'Planned for an inn drawer, a psychic trainer and nowhere sensible.',
    description: 'It was already bent when you found it. That explanation satisfies nobody.'
  },
  tinyUmbrella: {
    name: 'Tiny Paper Umbrella', category: 'flavor', rarity: 'common', value: 60,
    price: 60, sellable: true, consumable: false, unique: false, maxStack: 6,
    effectHandler: 'none', usableIn: ['display'],
    discoveryText: 'Planned for cafés, beach tables and one very formal Bug-type trainer.',
    description: 'Far too small for rain and apparently the correct size for an elaborate berry drink.'
  }
};

function itemById(id) {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(ITEMS, id) ? ITEMS[id] : null;
}
function itemValueBand(itemOrId) {
  var item = typeof itemOrId === 'string' ? itemById(itemOrId) : itemOrId;
  if (!item) return null;
  for (var i = 0; i < ITEM_VALUE_BANDS.length; i++) {
    var band = ITEM_VALUE_BANDS[i];
    if (item.value >= band.min && item.value <= band.max) return band.id;
  }
  return null;
}
function itemCanSell(id) { var item = itemById(id); return !!(item && item.sellable); }
function itemCanConsume(id) { var item = itemById(id); return !!(item && item.consumable); }

function validateItemRegistry(registry) {
  var errors = [], seenNames = {};
  registry = registry || ITEMS;
  Object.keys(registry).forEach(function (id) {
    var item = registry[id], prefix = id + ': ';
    if (!item || typeof item !== 'object' || Array.isArray(item)) { errors.push(prefix + 'record must be an object'); return; }
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(id)) errors.push(prefix + 'invalid stable ID');
    if (typeof item.name !== 'string' || !item.name.trim()) errors.push(prefix + 'missing name');
    else if (seenNames[item.name]) errors.push(prefix + 'duplicate name'); else seenNames[item.name] = true;
    if (ITEM_CATEGORIES.indexOf(item.category) < 0) errors.push(prefix + 'invalid category');
    if (ITEM_RARITIES.indexOf(item.rarity) < 0) errors.push(prefix + 'invalid rarity');
    if (!Number.isFinite(item.value) || item.value < 0 || Math.floor(item.value) !== item.value) errors.push(prefix + 'invalid value');
    if (typeof item.sellable !== 'boolean') errors.push(prefix + 'sellable must be boolean');
    if (typeof item.consumable !== 'boolean') errors.push(prefix + 'consumable must be boolean');
    if (typeof item.unique !== 'boolean') errors.push(prefix + 'unique must be boolean');
    if (!Number.isInteger(item.maxStack) || item.maxStack < 1 || item.maxStack > 99) errors.push(prefix + 'invalid maxStack');
    if (item.unique && item.maxStack !== 1) errors.push(prefix + 'unique items must stack to one');
    if (item.category === 'key' && (item.sellable || item.consumable || !item.unique)) errors.push(prefix + 'key items must be unique, unsellable and non-consumable');
    if (ITEM_EFFECT_HANDLERS.indexOf(item.effectHandler) < 0) errors.push(prefix + 'invalid effect handler');
    if (!Array.isArray(item.usableIn) || !item.usableIn.length) errors.push(prefix + 'missing use contexts');
    if (item.category === 'gift' && (!Array.isArray(item.giftTags) || !item.giftTags.length)) errors.push(prefix + 'gift items need preference tags');
    if (typeof item.discoveryText !== 'string' || !item.discoveryText.trim()) errors.push(prefix + 'missing discovery text');
    if (typeof item.description !== 'string' || !item.description.trim()) errors.push(prefix + 'missing description');
  });
  return errors;
}

var ITEM_REGISTRY_ERRORS = validateItemRegistry(ITEMS);
if (ITEM_REGISTRY_ERRORS.length) throw new Error('Invalid item registry: ' + ITEM_REGISTRY_ERRORS.join('; '));

/* Compatibility views used by established battle and shop interfaces. */
Object.keys(ITEMS).forEach(function (key) {
  var item = ITEMS[key];
  item.kind = item.category === 'capture' ? 'ball' :
    item.category === 'medicine' && item.effectHandler === 'party-heal' ? 'berry' :
    item.category === 'medicine' ? 'heal' : item.category;
  item.blurb = item.description;
  if (item.healing && item.healing.mode === 'fraction') item.heal = item.healing.amount;
});

var BALLS = {
  poke: {
    name: 'Poké Ball', mult: 1, price: 0, unlimited: true,
    blurb: 'Always in your bag. The house keeps crates of them.'
  },
  great: {
    name: itemById('great').name, mult: itemById('great').captureMultiplier,
    price: itemById('great').price, blurb: itemById('great').description
  },
  ultra: {
    name: itemById('ultra').name, mult: itemById('ultra').captureMultiplier,
    price: itemById('ultra').price, blurb: itemById('ultra').description
  }
};

/* Explicit regional stock. `badges` gates a shelf entry; `stock` is the total
   number this vendor can sell in one save. Missing stock means unlimited. */
var SHOP_INVENTORIES = {
  mart: [
    { item: 'great' }, { item: 'potion' }, { item: 'superpotion', badges: 2 },
    { item: 'ultra', badges: 4 }, { item: 'teaTin', stock: 3 }
  ],
  nemo: [
    { item: 'great' }, { item: 'potion' }, { item: 'pokeDoll' },
    { item: 'seaGlass', stock: 2 }, { item: 'teaTin', stock: 2 }
  ],
  clerk2: [
    { item: 'superpotion' }, { item: 'revive' }, { item: 'rareCandy', badges: 7, stock: 2 },
    { item: 'bentSpoon', stock: 1 }
  ],
  'lab-shop': [
    { item: 'ultra' }, { item: 'revive' }, { item: 'rareCandy', stock: 3 },
    { item: 'prismStone', badges: 10, stock: 1 }, { item: 'pressedFlower', stock: 2 }
  ],
  shopq: [
    { item: 'ultra' }, { item: 'superpotion' }, { item: 'revive' },
    { item: 'pokeDoll' }, { item: 'hotSauce', stock: 3 }, { item: 'prismStone', badges: 13, stock: 1 }
  ],
  'c-mart-harbour': [
    { item: 'great' }, { item: 'potion' }, { item: 'superpotion', badges: 2 },
    { item: 'pressedFlower', stock: 3 }
  ],
  'c-mirit': [
    { item: 'great' }, { item: 'superpotion' }, { item: 'pokeDoll' },
    { item: 'revive', badges: 3 }, { item: 'tinyUmbrella', stock: 2 }
  ],
  'c-solveig': [
    { item: 'ultra' }, { item: 'revive' }, { item: 'rareCandy', badges: 7, stock: 2 },
    { item: 'carvedWhistle', stock: 2 }
  ],
  'c-supply-hall': [
    { item: 'ultra' }, { item: 'superpotion' }, { item: 'revive' },
    { item: 'rareCandy', stock: 3 }, { item: 'prismStone', stock: 1 }, { item: 'hotSauce', stock: 2 }
  ]
};

var GYM_ITEM_REWARDS = {
  c: {
    1: [{ item: 'potion', count: 2 }],
    3: [{ item: 'great', count: 2 }],
    5: [{ item: 'revive', count: 1 }],
    8: [{ item: 'rareCandy', count: 1 }],
    11: [{ item: 'ultra', count: 2 }],
    15: [{ item: 'prismStone', count: 1 }]
  },
  calc: {
    1: [{ item: 'potion', count: 2 }],
    2: [{ item: 'great', count: 2 }],
    4: [{ item: 'revive', count: 1 }],
    7: [{ item: 'rareCandy', count: 1 }],
    10: [{ item: 'prismStone', count: 1 }]
  }
};

var BOSS_ITEM_REWARDS = {
  c: [{ item: 'superpotion', count: 2 }, { item: 'ultra', count: 1 }],
  calc: [{ item: 'rareCandy', count: 1 }, { item: 'ultra', count: 1 }]
};

/* Legacy callers may still inspect the original baseline list. Runtime shop
   decisions use SHOP_INVENTORIES exclusively when a real keeper is open. */
var SHOP_STOCK = ['great', 'ultra', 'potion', 'superpotion'];
