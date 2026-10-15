/* Pokemon Kingdom life: what residents do once they have arrived somewhere.
   Every district has activity spots painted into its picture (a fountain, a
   firepit, hot springs...), and each resident has a nature drawn from its
   species: how it moves, which places it loves, whether it glows after dark
   or stays up at night. Residents decide for themselves every few seconds,
   remember who they have met (friendships and gym rivalries), and little
   ones tag along after their evolved relatives. Like the rest of the
   Kingdom, none of this touches the save: friendships live in their own
   localStorage key, next to the itineraries. */

var KINGDOM_BOND_KEY = 'studymon.kingdom.bonds.v1';
var KINGDOM_BONDS = null;
var KINGDOM_BOND_MEET_MS = 60000;
var KINGDOM_PAIR_AT = {};
var KINGDOM_GROUP_AT = {};
var KINGDOM_RECENT_LINES = [];
var KINGDOM_DARK = false;
var KINGDOM_PHASE = 'day';
var KINGDOM_WEATHER_SET = false;
var KINGDOM_TRAITS = {};
var KINGDOM_PARENT = null;

function kingdomIdSet(ids) {
  var set = {};
  ids.forEach(function (id) { set[id] = true; });
  return set;
}

/* ---- Species natures ----------------------------------------------------- */

/* Drift above the ground instead of walking: ghosts, levitating psychics and
   magnets, plus sea creatures, which bob along like they do in water. */
var KINGDOM_FLOATERS = kingdomIdSet([
  92, 93, 109, 110, 81, 82, 462, 436, 437, 201, 343, 344, 337, 338, 374, 358, 151, 251, 385,
  380, 381, 480, 481, 482, 479, 200, 429, 425, 426, 355, 356, 477, 592, 593, 602, 603, 604,
  608, 609, 562, 563, 679, 680, 681, 708, 707, 615, 599, 600, 601, 774, 789, 790, 803, 720,
  785, 786, 787, 788, 488, 491, 494, 885, 886, 969, 970, 854, 855, 686, 687, 1029, 1043
]);
var KINGDOM_FISH = kingdomIdSet([
  118, 119, 129, 130, 131, 340, 349, 350, 318, 319, 320, 321, 456, 457, 550, 211, 223, 224,
  170, 171, 72, 73, 120, 121, 90, 91, 116, 117, 230, 366, 367, 368, 369, 370, 458, 226, 746,
  779, 846, 847, 147, 148, 902, 963, 964, 976, 977, 978, 1030, 1031
]);
/* Flying types that walk anyway. */
var KINGDOM_GROUNDED = kingdomIdSet([83, 84, 85, 177, 178, 357, 566, 567, 701]);
var KINGDOM_SLITHER = kingdomIdSet([23, 24, 95, 208, 336, 843, 844]);
var KINGDOM_HOPPERS = kingdomIdSet([39, 40, 60, 325, 326, 427, 428, 433, 710, 711, 1036, 1044]);
var KINGDOM_NOCTURNAL = kingdomIdSet([
  163, 164, 41, 42, 169, 48, 49, 269, 167, 168, 35, 36, 173, 337, 527, 528, 714, 715, 722, 723,
  724, 313, 314, 43, 44, 755, 756, 1029, 1030
]);
var KINGDOM_SLEEPY = kingdomIdSet([143, 446, 287, 289, 79, 80, 199, 1032, 517, 518, 775, 194, 195]);
/* Light their own way after dark. Fire types glow on their own (violet when
   the flame is a ghostly one); these are the other natural lamps. */
var KINGDOM_GLOWERS = {
  180: ['#fff3a0', 'steady'], 181: ['#fff3a0', 'steady'], 170: ['#fff08a', 'pulse'],
  171: ['#fff08a', 'pulse'], 938: ['#fff59a', 'steady'], 939: ['#fff59a', 'steady'],
  479: ['#bff3ff', 'steady'], 796: ['#cfe9ff', 'steady'], 456: ['#8af6ff', 'pulse'],
  457: ['#8af6ff', 'pulse'], 755: ['#c9adff', 'pulse'], 756: ['#c9adff', 'pulse'],
  686: ['#ffe17a', 'pulse'], 687: ['#ffe17a', 'pulse'], 120: ['#ff8aa6', 'pulse'],
  121: ['#ff8aa6', 'pulse'], 313: ['#e9ff7a', 'pulse'], 314: ['#e9ff7a', 'pulse'],
  197: ['#ffe58a', 'pulse'], 337: ['#e4ecff', 'steady'], 338: ['#ffcf7a', 'steady'],
  969: ['#a9f7ff', 'steady'], 970: ['#a9f7ff', 'steady'], 1029: ['#82ffd9', 'pulse'],
  1030: ['#82ffd9', 'pulse'], 1031: ['#a9c4ff', 'pulse']
};

/* Districts each type is drawn to when it picks where to wander next. */
var KINGDOM_TYPE_HOMES = {
  water: { riverside: 3, springs: 1.5, market: 1, green: 1 },
  fire: { hearth: 2.5, springs: 2.2 },
  grass: { orchard: 2.8, green: 1.6, hill: .8 },
  bug: { orchard: 2.4, green: 1.2 },
  psychic: { hill: 2, observatory: 2.2 },
  fairy: { hill: 2.5, observatory: 1.2, square: .6 },
  fighting: { gym: 3.5 },
  ghost: { observatory: 1.6, hill: 1.4 },
  dark: { observatory: 1.2, hearth: .8 },
  normal: { square: 1.6, market: 1.6, hearth: .8 },
  electric: { observatory: 1.2, square: 1, riverside: .6 },
  ground: { gym: 1.2, springs: 1.2 },
  rock: { gym: 1.4, springs: 1, hill: .6 },
  ice: { hill: 1.2, riverside: 1.2 },
  dragon: { springs: 1.4, hill: 1, gym: .8 },
  steel: { gym: 1.8, square: .6 },
  poison: { riverside: .8, orchard: .8 },
  flying: { hill: 1.6, green: 1, orchard: .6 }
};

function kingdomTraits(id) {
  if (KINGDOM_TRAITS[id]) return KINGDOM_TRAITS[id];
  var d = (typeof dexOf === 'function' && dexOf(id)) || { types: ['normal'], height: 6, weight: 100 };
  var types = d.types && d.types.length ? d.types : ['normal'];
  var has = function (type) { return types.indexOf(type) >= 0; };
  var height = d.height || 6, weight = d.weight || 100;
  var gait = 'step';
  if (KINGDOM_FISH[id] || KINGDOM_FLOATERS[id]) gait = 'float';
  else if (has('flying') && !KINGDOM_GROUNDED[id]) gait = 'fly';
  else if (KINGDOM_SLITHER[id]) gait = 'slither';
  else if (weight >= 1500 || height >= 17) gait = 'heavy';
  else if (KINGDOM_HOPPERS[id] || (height <= 4 && weight <= 200)) gait = 'hop';
  var glow = null;
  if (has('fire')) glow = { color: has('ghost') ? '#b98cff' : '#ffae42', style: 'flame' };
  else if (KINGDOM_GLOWERS[id]) glow = { color: KINGDOM_GLOWERS[id][0], style: KINGDOM_GLOWERS[id][1] };
  var swimmer = has('water') || !!KINGDOM_FISH[id];
  var traits = KINGDOM_TRAITS[id] = {
    id: id, types: types, has: has, gait: gait, glow: glow, swimmer: swimmer, fish: !!KINGDOM_FISH[id],
    big: height >= 14 || weight >= 900,
    nocturnal: has('ghost') || has('dark') || !!KINGDOM_NOCTURNAL[id],
    sleepy: !!KINGDOM_SLEEPY[id],
    rainLover: swimmer || has('grass'),
    speed: gait === 'heavy' ? .68 : gait === 'hop' ? 1.06 : gait === 'float' ? .86 : gait === 'fly' ? 1.08 : 1
  };
  return traits;
}

/* Where the creature sits inside its 96px sprite: [empty fraction below it,
   horizontal centre, size]. Swimmers are cut off at a waterline measured
   from their real feet, not the bottom of the frame. */
function kingdomSeat(mon) {
  var table = window.SPRITE_SEAT_DATA;
  var kind = mon.shiny && table && table.shiny && table.shiny[mon.id] ? 'shiny' : 'front';
  var row = table && table[kind] && table[kind][mon.id];
  return row ? { below: row[0], cx: row[1], span: row[2] } : { below: .25, cx: .5, span: .6 };
}

function kingdomFamily(id) {
  if (!KINGDOM_PARENT) {
    KINGDOM_PARENT = {};
    (window.DEX || []).forEach(function (d) {
      (d.evo || []).forEach(function (e) { if (!KINGDOM_PARENT[e.to]) KINGDOM_PARENT[e.to] = d.id; });
    });
  }
  var root = id, stage = 0;
  for (var guard = 0; KINGDOM_PARENT[root] && guard < 6; guard++) { root = KINGDOM_PARENT[root]; stage++; }
  return { root: root, stage: stage };
}

function kingdomSpeciesOfKey(key) {
  var id = Number(String(key).split('-').pop());
  return id > 0 ? id : 0;
}

/* Called by kingdomPlanTrip for a trip without a set destination. One rand()
   either way, so itineraries replay exactly as before. */
function kingdomPickDestination(key, from, rand) {
  var others = KINGDOM_LOCATIONS.filter(function (loc) { return loc.id !== from; });
  var id = kingdomSpeciesOfKey(key);
  var types = id && typeof dexOf === 'function' && dexOf(id) ? kingdomTraits(id).types : [];
  var weights = others.map(function (loc) {
    var w = 1;
    types.forEach(function (type) { w += (KINGDOM_TYPE_HOMES[type] || {})[loc.id] || 0; });
    return w;
  });
  var total = weights.reduce(function (sum, w) { return sum + w; }, 0);
  var pick = rand() * total;
  for (var i = 0; i < others.length; i++) {
    if ((pick -= weights[i]) < 0) return others[i].id;
  }
  return others[others.length - 1].id;
}

function kingdomFavouriteHaunts(id) {
  var types = kingdomTraits(id).types;
  var scores = KINGDOM_LOCATIONS.map(function (loc) {
    var w = 0;
    types.forEach(function (type) { w += (KINGDOM_TYPE_HOMES[type] || {})[loc.id] || 0; });
    return { loc: loc, w: w };
  }).filter(function (row) { return row.w >= 1.4; });
  scores.sort(function (a, b) { return b.w - a.w; });
  return scores.slice(0, 2).map(function (row) { return row.loc; });
}

/* ---- Activity spots ------------------------------------------------------
   `at` is where the resident stands (feet). When `at` is off the open ground
   (a bench, a stump, the water) the resident walks to `from` and hops over.
   `drift` keeps a swimmer moving around its pool. Verbs can vary by time of
   day and weather; `shelter` and `bed` spots are where residents go when it
   rains or when they get sleepy. */
var KINGDOM_SPOTS = [
  /* Kingdom Green */
  { id: 'green-pool', loc: 'green', icon: '🏊', name: 'Waterfall Pool', short: 'Swim', motion: 'swim',
    swim: true, group: true, types: { water: 3 }, dur: [12000, 19000],
    verbs: ['swimming laps in the waterfall pool', 'paddling out under the waterfall'],
    finish: ['climbs out of the pool and shakes itself dry', 'hops out onto the grass, dripping happily'],
    seats: [
      { from: [49.5, 35], at: [50.5, 25], drift: [[49, 21.5], [51.5, 18.5], [52.5, 22.5], [48.5, 26]] },
      { from: [55, 34], at: [55.5, 23.5], drift: [[57, 20], [54.5, 19.5], [54.5, 25.5]] }
    ] },
  { id: 'green-drink', loc: 'green', icon: '💧', name: 'Pool Edge', short: 'Drink', motion: 'drink',
    dur: [5000, 8000],
    verbs: ['taking a cool drink at the pool', 'lapping water at the pool edge'],
    finish: ['licks its lips, refreshed', 'trots away from the pool, refreshed'],
    seats: [{ at: [46.5, 34.5], face: 1 }, { at: [56.5, 33.5], face: -1 }] },
  { id: 'green-shelter', loc: 'green', icon: '🛖', name: 'Rest Shelter', short: 'Shelter', motion: 'rest',
    perch: true, shelter: true, bed: true, group: true, dur: [9000, 15000],
    verbs: ['resting on the shelter bench', 'watching the meadow from the rest shelter'],
    rainVerbs: ['sheltering from the rain under the mossy roof'],
    nightVerbs: ['dozing on the shelter bench'],
    finish: ['hops down from the rest shelter'],
    seats: [
      { from: [84, 34], at: [83.5, 27], face: 1 },
      { from: [87, 35], at: [88.5, 27.5], face: -1 },
      { from: [85.5, 34.5], at: [86, 30.5], face: 1 }
    ] },
  { id: 'green-stones', loc: 'green', icon: '🪨', name: 'Stepping Stones', short: 'Stones', motion: 'stones',
    small: true, driftMode: 'hop', dur: [6000, 9000], types: { normal: .5 }, gaits: { hop: 2 },
    verbs: ['hopping across the stepping stones', 'balancing on the stepping stones'],
    finish: ['lands the last hop with a flourish'],
    seats: [{ from: [22.5, 41], at: [21.5, 37], drift: [[17.5, 37.5], [20, 40.5], [17.5, 43], [21.5, 37]] }] },
  { id: 'green-stream', loc: 'green', icon: '🦶', name: 'Stream Bank', short: 'Paddle', motion: 'paddle',
    dur: [6000, 10000], types: { water: 1.5, grass: .8 },
    verbs: ['dipping its feet in the stream', 'paddling at the edge of the stream'],
    finish: ['shakes the water off its feet'],
    seats: [{ from: [27, 86], at: [19.5, 90.5], face: -1 }, { from: [26, 84], at: [16.5, 86], face: -1 }] },

  /* Lantern Square */
  { id: 'square-fountain', loc: 'square', icon: '⛲', name: 'Fountain', short: 'Splash', motion: 'splash',
    swim: true, small: true, group: true, fx: 'fountain', types: { water: 3 }, dur: [7000, 12000],
    verbs: ['splashing in the fountain', 'playing under the fountain spray'],
    finish: ['hops out of the fountain with a happy shake'],
    seats: [
      { from: [36, 50], at: [46.5, 49.5], drift: [[48, 48], [47.5, 50.5], [46, 50.5]] },
      { from: [64.5, 50], at: [54.5, 49], drift: [[53, 48], [53.5, 50.5], [55, 50]] }
    ] },
  { id: 'square-rim', loc: 'square', icon: '🪙', name: 'Fountain Rim', short: 'Wish', motion: 'sit',
    group: true, dur: [8000, 13000],
    verbs: ['sitting on the fountain rim', 'making a wish at the fountain', 'dangling its feet over the fountain'],
    nightVerbs: ['watching the lantern light dance on the fountain'],
    finish: ['hops down from the fountain rim'],
    seats: [
      { from: [36, 50], at: [38.5, 49], face: 1 },
      { from: [64.5, 50], at: [61.5, 49], face: -1 },
      { from: [47, 61], at: [47, 58.5], face: 1 }
    ] },
  { id: 'square-benches', loc: 'square', icon: '🪑', name: 'Lantern Benches', short: 'Bench', motion: 'sit',
    perch: true, bed: true, group: true, dur: [9000, 15000],
    verbs: ['sitting on a bench under the lanterns', 'people-watching from a bench'],
    nightVerbs: ['dozing on a bench under the lanterns'],
    finish: ['hops off the bench and stretches'],
    seats: [{ from: [40, 43], at: [35.5, 35.5], face: 1 }, { from: [61, 43], at: [64.5, 35.5], face: -1 }] },
  { id: 'square-notices', loc: 'square', icon: '📜', name: 'Noticeboard', short: 'Notices', motion: 'read',
    dur: [6000, 9000], types: { psychic: 1.5, normal: .5 },
    verbs: ['reading the noticeboard', 'studying the posters on the noticeboard'],
    finish: ['nods at the noticeboard, very informed now'],
    seats: [{ at: [57.5, 31.5], face: 1 }] },
  { id: 'square-awning', loc: 'square', icon: '🏪', name: 'Shop Awning', short: 'Shop', motion: 'browse',
    shelter: true, dur: [7000, 11000], types: { normal: 1 },
    verbs: ['window-shopping at the berry shop', 'peering into the shop window'],
    rainVerbs: ['sheltering under the shop awning'],
    finish: ['wanders off from the shop window'],
    seats: [{ from: [26, 30], at: [26.5, 26.5], face: -1 }, { from: [74, 26.5], at: [75, 21.5], face: 1 }] },
  { id: 'square-cafe', loc: 'square', icon: '🧁', name: 'Café', short: 'Café', motion: 'eat',
    snack: 'cake', group: true, dur: [7000, 11000], types: { normal: 1.2 },
    verbs: ['nibbling a treat outside the café', 'snacking at the café door'],
    finish: ['finishes its treat, crumbs and all'],
    seats: [{ at: [77, 83], face: 1 }, { at: [81, 87], face: 1 }] },

  /* Berry Market */
  { id: 'market-stalls', loc: 'market', icon: '🫐', name: 'Berry Stalls', short: 'Stalls', motion: 'browse',
    group: true, dur: [6000, 10000], types: { normal: 1.2, grass: .6 },
    verbs: ['browsing the berry stalls', 'sniffing the berry baskets', 'eyeing the juiciest berries'],
    finish: ['leaves the stalls with a happy wiggle'],
    seats: [
      { at: [42, 29.5], face: 1 }, { at: [61, 29.5], face: -1 },
      { at: [31.5, 31.5], face: -1 }, { at: [33.5, 50.5], face: -1 }
    ] },
  { id: 'market-tables', loc: 'market', icon: '🍓', name: 'Café Tables', short: 'Picnic', motion: 'eat',
    perch: true, snack: 'berry', group: true, dur: [8000, 13000], types: { normal: 1 },
    verbs: ['snacking at the café tables', 'sharing a berry tart at the tables'],
    finish: ['hops down from the table, full and happy'],
    seats: [
      { from: [64, 62], at: [67.5, 57], face: 1 },
      { from: [70, 61.5], at: [73, 55], face: -1 },
      { from: [77, 61.5], at: [77.5, 57.5], face: 1 },
      { from: [84, 62], at: [83.5, 56], face: -1 }
    ] },
  { id: 'market-shelter', loc: 'market', icon: '⛺', name: 'Market Shelter', short: 'Shelter', motion: 'rest',
    shelter: true, bed: true, group: true, dur: [9000, 15000],
    verbs: ['resting in the shade of the market shelter'],
    rainVerbs: ['sheltering from the rain in the market shelter'],
    nightVerbs: ['curled up in the market shelter'],
    finish: ['steps out of the shelter'],
    seats: [{ from: [24, 72.5], at: [14, 73], face: 1 }, { from: [24, 75], at: [18, 75.5], face: 1 }] },
  { id: 'market-bridge', loc: 'market', icon: '🌉', name: 'Pond Bridge', short: 'Bridge', motion: 'watch',
    group: true, dur: [8000, 13000], types: { water: 1.5, normal: .5 },
    verbs: ['leaning on the rail of the little footbridge', 'watching the stream slip under the footbridge'],
    finish: ['hops off the footbridge', 'stretches and strolls off the footbridge'],
    seats: [{ at: [93.5, 75.5], face: 1 }, { at: [88.5, 82], face: -1 }] },
  { id: 'market-pond', loc: 'market', icon: '🏊', name: 'Lily Pond', short: 'Swim', motion: 'swim',
    swim: true, dur: [11000, 17000], types: { water: 3 },
    verbs: ['swimming between the lily pads', 'paddling around the lily pond'],
    finish: ['climbs out of the pond with a lily pad on its head'],
    seats: [{ from: [92, 84.5], at: [86, 88.5], drift: [[84.5, 87], [87.5, 89], [85.5, 92.5]] }] },

  /* Riverside Walk */
  { id: 'river-dock', loc: 'riverside', icon: '🌊', name: 'Little Dock', short: 'Dock', motion: 'sit',
    perch: true, group: true, dur: [10000, 16000], types: { water: 1.5, normal: .5 },
    verbs: ['sitting at the end of the little dock', 'watching the water wheel turn from the dock'],
    finish: ['stretches and leaves the dock', 'hops back onto the riverbank'],
    seats: [{ at: [79.5, 43.5], face: -1 }, { at: [83.5, 40.5], face: 1 }] },
  { id: 'river-bridge', loc: 'riverside', icon: '🌉', name: 'Footbridge', short: 'Bridge', motion: 'watch',
    group: true, dur: [8000, 13000],
    verbs: ['watching the waterfall from the footbridge', 'leaning over the footbridge rail'],
    finish: ['trots off the footbridge'],
    seats: [{ at: [16.5, 31], face: 1 }, { at: [22, 37.5], face: 1 }] },
  { id: 'river-swim', loc: 'riverside', icon: '🏊', name: 'River', short: 'Swim', motion: 'swim',
    swim: true, group: true, dur: [12000, 20000], types: { water: 3 },
    verbs: ['swimming downstream and back again', 'floating lazily on the river'],
    finish: ['clambers up the riverbank, dripping'],
    seats: [
      { from: [55.5, 39], at: [58.5, 31.5], drift: [[55, 28.5], [61, 30], [64, 32.5], [59.5, 33]] },
      { from: [65, 40.5], at: [68.5, 34], drift: [[72, 32.5], [66.5, 33], [70, 35.5], [74, 34]] }
    ] },

  /* Hearthside Lane */
  { id: 'hearth-firepit', loc: 'hearth', icon: '🔥', name: 'Firepit', short: 'Firepit', motion: 'warm',
    group: true, bed: true, fx: 'campfire', fxAt: [63.7, 32], fxSize: 5, dur: [11000, 18000],
    types: { fire: 3, normal: .6 }, phaseBonus: { dusk: 2.4, night: 1.6 },
    verbs: ['warming up by the firepit', 'roasting a berry over the firepit'],
    nightVerbs: ['watching the sparks drift up from the firepit'],
    rainVerbs: ['keeping the firepit going in the drizzle'],
    finish: ['leaves the warm firepit, toasty all over'],
    seats: [
      { from: [56.5, 37.5], at: [58.5, 32.5], face: 1 },
      { from: [72, 35], at: [69, 29.5], face: -1 },
      { from: [70, 40], at: [68, 36], face: -1 },
      { at: [61, 39.5], face: 1 },
      { at: [65.5, 40.5], face: -1 }
    ] },
  { id: 'hearth-garden', loc: 'hearth', icon: '🌱', name: 'Cottage Garden', short: 'Garden', motion: 'garden',
    dur: [7000, 11000], types: { grass: 3, bug: 1.5, ground: 1 },
    verbs: ['tending the cottage garden', 'digging around the vegetable patch'],
    finish: ['proudly leaves the garden a little tidier'],
    seats: [{ from: [52, 31.5], at: [55, 24], face: 1 }] },
  { id: 'hearth-doorstep', loc: 'hearth', icon: '🚪', name: 'Cottage Doorstep', short: 'Doorstep', motion: 'sit',
    shelter: true, bed: true, dur: [9000, 15000],
    verbs: ['sitting on the cottage doorstep', 'watching the lane from the doorstep'],
    rainVerbs: ['sheltering in the cottage doorway'],
    nightVerbs: ['curled up on the cottage doorstep'],
    finish: ['steps down from the doorstep'],
    seats: [{ from: [24, 39], at: [23.5, 31.5], face: 1 }] },
  { id: 'hearth-bridge', loc: 'hearth', icon: '🌉', name: 'Creek Bridge', short: 'Bridge', motion: 'watch',
    dur: [7000, 11000],
    verbs: ['watching the creek tumble under the bridge'],
    finish: ['hops off the little bridge'],
    seats: [{ at: [12.5, 54.5], face: -1 }] },
  { id: 'hearth-creek', loc: 'hearth', icon: '🏊', name: 'Creek', short: 'Swim', motion: 'swim',
    swim: true, dur: [10000, 16000], types: { water: 3 },
    verbs: ['splashing down the little creek'],
    finish: ['hops out of the creek onto the warm grass'],
    seats: [{ from: [27, 66], at: [17, 69], drift: [[15, 63.5], [16.5, 73.5], [19.5, 80], [22.5, 89.5], [18.5, 81.5]] }] },

  /* Moonbell Hill */
  { id: 'hill-bell', loc: 'hill', icon: '🔔', name: 'Moonbell', short: 'Bell', motion: 'ring',
    fx: 'bell', fxAt: [62.5, 9], dur: [4200, 6000], types: { fairy: 2, psychic: 1 },
    verbs: ['ringing the Moonbell'],
    finish: ['listens to the Moonbell hum fade away'],
    seats: [{ at: [62.5, 25.5], face: -1 }] },
  { id: 'hill-pavilion', loc: 'hill', icon: '⛩️', name: 'Bell Pavilion', short: 'Pavilion', motion: 'rest',
    shelter: true, bed: true, group: true, dur: [9000, 15000],
    verbs: ['resting in the bell pavilion'],
    rainVerbs: ['sheltering from the rain in the bell pavilion'],
    nightVerbs: ['sleeping under the Moonbell'],
    finish: ['steps out of the pavilion'],
    seats: [{ from: [60, 26], at: [59.5, 19.5], face: 1 }, { from: [61, 26.5], at: [66, 19.5], face: -1 }] },
  { id: 'hill-flowers', loc: 'hill', icon: '🌸', name: 'Moonflowers', short: 'Flowers', motion: 'sniff',
    dur: [5000, 8000], types: { grass: 2, bug: 2, fairy: 1.5 },
    verbs: ['sniffing the moonflowers', 'admiring the moonflower beds'],
    finish: ['sneezes a puff of pollen and wanders off'],
    seats: [{ at: [53.5, 28.5], face: 1 }, { at: [66, 30.5], face: 1 }] },
  { id: 'hill-pond', loc: 'hill', icon: '🏊', name: 'Hill Pond', short: 'Swim', motion: 'swim',
    swim: true, dur: [11000, 17000], types: { water: 3 },
    verbs: ['swimming in the waterfall pond', 'floating among the lily pads'],
    finish: ['climbs out of the pond and shakes off'],
    seats: [{ from: [41.5, 23], at: [34.5, 18], drift: [[28, 17.5], [32.5, 15.5], [35, 20.5], [31, 22.5]] }] },
  { id: 'hill-terrace', loc: 'hill', icon: '🧘', name: 'Terrace', short: 'Meditate', motion: 'meditate',
    dur: [9000, 14000], types: { psychic: 3, fighting: 2, fairy: 1 },
    verbs: ['meditating on the quiet terrace'],
    finish: ['opens its eyes, calm and clear'],
    seats: [{ at: [43.5, 25], face: 1 }, { at: [79, 27], face: -1 }] },

  /* Honeywind Orchard */
  { id: 'orchard-tree', loc: 'orchard', icon: '🫐', name: 'Berry Tree', short: 'Berries', motion: 'pick',
    group: true, dur: [6000, 10000], types: { grass: 1.5, bug: 1, normal: 1 },
    verbs: ['picking berries from the big berry tree', 'reaching for a ripe berry'],
    finish: ['munches its berry happily', 'drops a berry and chases it'],
    seats: [{ at: [49.5, 37.5], face: 1 }, { at: [56, 38], face: 1 }, { at: [62.5, 37], face: -1 }] },
  { id: 'orchard-hives', loc: 'orchard', icon: '🐝', name: 'Beehives', short: 'Hives', motion: 'buzz',
    fx: 'bees', fxAt: [86, 47], dur: [6000, 10000], types: { bug: 4, fairy: .5 },
    verbs: ['visiting the beehives', 'humming along with the bees'],
    finish: ['backs away from the hives with a little honey on its nose'],
    seats: [{ at: [76.5, 43.5], face: 1 }, { at: [76.5, 56], face: 1 }] },
  { id: 'orchard-press', loc: 'orchard', icon: '🍎', name: 'Cider Press', short: 'Press', motion: 'press',
    dur: [6000, 9000], types: { fighting: 2, normal: 1, ground: 1 },
    verbs: ['helping at the cider press', 'squashing apples at the cider press'],
    finish: ['steps back from the press, sticky but proud'],
    seats: [{ at: [80, 33.2], face: 1 }, { at: [86, 33.4], face: -1 }] },
  { id: 'orchard-windmill', loc: 'orchard', icon: '🌾', name: 'Windmill', short: 'Windmill', motion: 'watch',
    dur: [7000, 11000], types: { flying: 1.5 },
    verbs: ['watching the windmill sails turn'],
    finish: ['loses count of the windmill turns and wanders off'],
    seats: [{ at: [27, 33.5], face: -1 }] },
  { id: 'orchard-bridge', loc: 'orchard', icon: '🌉', name: 'Rill Bridge', short: 'Bridge', motion: 'sit',
    dur: [7000, 11000],
    verbs: ['dangling its feet off the little bridge'],
    finish: ['hops off the bridge'],
    seats: [{ at: [15, 50], face: -1 }] },
  { id: 'orchard-shade', loc: 'orchard', icon: '🌳', name: 'Apple Trees', short: 'Shade', motion: 'rest',
    shelter: true, bed: true, group: true, dur: [10000, 16000],
    verbs: ['resting in the shade of the apple trees'],
    rainVerbs: ['keeping dry under the apple trees'],
    nightVerbs: ['sleeping under the apple trees'],
    finish: ['wakes and shakes off a fallen leaf'],
    seats: [{ from: [41, 70], at: [35.5, 70], face: 1 }, { from: [41, 76], at: [36, 77], face: 1 }] },

  /* Emberstone Springs */
  { id: 'springs-soak', loc: 'springs', icon: '♨️', name: 'Hot Springs', short: 'Soak', motion: 'soak',
    soak: true, group: true, dur: [13000, 22000], types: { water: 2, normal: 1, ice: 1, ground: .5 },
    verbs: ['soaking in the hot spring', 'relaxing in the warm water'],
    rainVerbs: ['soaking in the hot spring while the rain falls'],
    finish: ['climbs out of the hot spring, pink and happy', 'steps out of the spring in a puff of steam'],
    seats: [
      { from: [59.5, 31.5], at: [59.5, 21], drift: [[58.5, 17], [64, 18.5], [61, 19.5]] },
      { from: [61.5, 32.5], at: [67.5, 27], drift: [[70, 23], [72.5, 21.5], [68, 19], [69.5, 25.5]] },
      { from: [24.5, 44], at: [16, 45], drift: [[11.5, 47], [17.5, 46.5], [14.5, 49.5]] },
      { from: [81.5, 50.5], at: [88, 52], drift: [[83.5, 51], [91.5, 51.5], [86, 53.5]] }
    ] },
  { id: 'springs-circle', loc: 'springs', icon: '🔥', name: 'Fire Circle', short: 'Fire', motion: 'warm',
    group: true, bed: true, fx: 'campfire', fxAt: [47.5, 48.2], fxSize: 5.6, lit: true, dur: [10000, 17000], types: { fire: 3, normal: .5 }, phaseBonus: { dusk: 2, night: 1.5 },
    verbs: ['resting around the fire circle', 'warming its paws by the fire circle'],
    nightVerbs: ['dozing by the glowing fire circle'],
    finish: ['leaves the fire circle, warm right through'],
    seats: [
      { at: [49, 53.5], face: 1 }, { at: [40, 48.5], face: 1 }, { at: [58.5, 48.5], face: -1 },
      { from: [39.5, 44], at: [42.5, 43], face: 1 }
    ] },
  { id: 'springs-pavilion', loc: 'springs', icon: '🛖', name: 'Rest Pavilion', short: 'Pavilion', motion: 'rest',
    shelter: true, bed: true, group: true, dur: [10000, 16000],
    verbs: ['lounging in the rest pavilion'],
    rainVerbs: ['sheltering in the rest pavilion'],
    nightVerbs: ['asleep in the rest pavilion'],
    finish: ['steps out of the pavilion, well rested'],
    seats: [
      { from: [41, 33], via: [[41.5, 26]], at: [33.5, 19.5], face: 1 },
      { from: [42, 33], via: [[42, 26]], at: [41, 20], face: -1 }
    ] },

  /* Starglass Observatory */
  { id: 'obs-telescope', loc: 'observatory', icon: '🔭', name: 'Brass Telescope', short: 'Telescope', motion: 'peer',
    dur: [8000, 13000], types: { psychic: 2, electric: 1 }, phaseBonus: { night: 3, dusk: 1 },
    verbs: ['polishing the telescope lens', 'peeking through the telescope at the clouds'],
    nightVerbs: ['peering through the brass telescope', 'searching the sky for a comet'],
    finish: ['steps back from the telescope, starry-eyed'],
    seats: [{ from: [57, 33], via: [[56.5, 28], [58, 22.5]], at: [62, 19], face: 1 }] },
  { id: 'obs-compass', loc: 'observatory', icon: '🧭', name: 'Star Compass', short: 'Compass', motion: 'read',
    dur: [6000, 9000], types: { psychic: 1.5 },
    verbs: ['tracing the star compass', 'reading the old star chart'],
    finish: ['finds north and looks very pleased'],
    seats: [{ from: [45, 35.5], at: [45, 31], face: 1 }] },
  { id: 'obs-pool', loc: 'observatory', icon: '🏊', name: 'Crescent Pool', short: 'Swim', motion: 'swim',
    swim: true, dur: [11000, 17000], types: { water: 3 },
    verbs: ['swimming in the crescent pool', 'floating among the starlit lilies'],
    finish: ['climbs out of the crescent pool'],
    seats: [{ from: [64.5, 39.5], at: [74, 36.5], drift: [[71.5, 32], [75, 34], [79, 37], [74.5, 38.5]] }] },
  { id: 'obs-stargaze', loc: 'observatory', icon: '🌠', name: 'Stargazing Circle', short: 'Stargaze', motion: 'stargaze',
    group: true, bed: true, dur: [12000, 20000], phases: ['dusk', 'night'], types: { psychic: 1, fairy: 1 },
    phaseBonus: { night: 3 },
    verbs: ['stargazing on the compass stones', 'counting stars on the compass stones'],
    finish: ['sits up and stretches after stargazing'],
    seats: [{ at: [46, 83.5], face: 1 }, { at: [50, 81.5], face: 1 }, { at: [54, 83.5], face: -1 }] }
];

/* Mossroot Gym's stations are spots too, with their markers kept. Each one is
   worked where the picture puts the equipment: up the ramp and the wall,
   across the stumps, over the hurdles, at the bag and the dummy. Route
   points are [x, y, how, pause]; `how` is hop (default), jump, run or climb. */
var KINGDOM_GYM_SEATS = {
  climb: { driftMode: 'route', keepDepth: true, seats: [{ from: [36, 40], at: [32.5, 37.2], face: -1,
    drift: [[28.3, 27, 'climb'], [26, 21, 'climb'], [24.5, 15.5, 'climb'], [24, 11, 'climb', 1500],
      [32.5, 37.2, 'jump', 1200]] }] },
  bags: { seats: [{ from: [45.5, 31.5], at: [45.6, 27.6], face: 1 }] },
  balance: { driftMode: 'route', landFx: 'dust', seats: [{ from: [35, 53], at: [32.6, 56.5],
    drift: [[30.3, 53.4], [27.8, 50.4], [27.8, 43.4, 'hop', 1600], [27.8, 50.4], [30.3, 53.4],
      [32.6, 56.5, 'hop', 1600]] }] },
  hurdles: { driftMode: 'route', landFx: 'dust', seats: [{ from: [65.5, 38.5], at: [68.5, 35.2],
    drift: [[73.8, 40.4, 'jump'], [77.9, 44.3, 'jump'], [80.6, 41, 'run'], [84.4, 36.6, 'jump', 1100],
      [80.6, 41, 'jump'], [77.9, 44.3, 'run'], [73.8, 40.4, 'jump'], [68.5, 35.2, 'jump', 1100]] }] },
  spar: { seats: [{ from: [71, 61], at: [74.2, 64], face: 1 }] },
  weights: { seats: [{ at: [55, 63.5], face: 1 }] }
};
KINGDOM_GYM_STATIONS.forEach(function (station) {
  var extra = KINGDOM_GYM_SEATS[station.id] || {};
  var spot = {
    id: station.id, loc: 'gym', icon: station.icon, name: station.name, short: station.short,
    motion: station.motion, station: station, dur: [7000, 11000], types: { fighting: 3, normal: .4, steel: .5 },
    verbs: [station.action], finish: [station.finish], seats: [{ at: [station.x, station.y] }]
  };
  Object.keys(extra).forEach(function (key) { spot[key] = extra[key]; });
  KINGDOM_SPOTS.push(spot);
});
KINGDOM_SPOTS.push({
  id: 'gym-pavilion', loc: 'gym', icon: '🛖', name: 'Training Pavilion', short: 'Rest', motion: 'rest',
  shelter: true, bed: true, group: true, dur: [8000, 13000],
  verbs: ['catching its breath in the training pavilion'],
  rainVerbs: ['waiting out the rain in the training pavilion'],
  nightVerbs: ['asleep on the pavilion bench'],
  finish: ['rolls its shoulders and heads back out'],
  seats: [{ from: [46, 29.5], at: [45.5, 24.5], face: 1 }, { from: [56, 29.5], at: [57, 25], face: -1 }]
});

/* Things a resident can do right where it is. `only` limits it to natures
   that make sense; `quiet` ones are small idle moments with no news. */
var KINGDOM_AMBIENT = [
  { id: 'look', motion: 'look', quiet: true, dur: [1800, 2800], w: 2.4 },
  { id: 'sit', motion: 'sit', quiet: true, dur: [2600, 4800], w: 1.6 },
  { id: 'hop', motion: 'hop', quiet: true, dur: [1100, 1500], w: 1, fx: 'heart' },
  { id: 'bask', motion: 'bask', icon: '☀️', dur: [6000, 10000], w: .7, phases: ['day'], dry: true,
    types: { grass: 3, fire: 2, normal: .5 }, fx: 'sparkle',
    verbs: ['basking in the sunshine', 'soaking up the warm sun'] },
  { id: 'roll', motion: 'roll', icon: '🌿', dur: [3600, 5600], w: .7, phases: ['dawn', 'day'], dry: true,
    locs: ['green', 'hill', 'orchard', 'riverside', 'observatory', 'hearth'], notGait: ['float', 'fly'], fx: 'leaf',
    verbs: ['rolling around in the soft grass', 'wiggling happily in the grass'] },
  { id: 'chase', motion: 'chase', icon: '🦋', dur: [5000, 8000], w: .7, phases: ['day'], dry: true,
    locs: ['green', 'hill', 'orchard', 'riverside', 'hearth', 'observatory', 'market'], wander: true,
    verbs: ['chasing a butterfly', 'bounding after a fluttering butterfly'] },
  { id: 'sniff', motion: 'sniff', icon: '🌼', dur: [3500, 5500], w: .8, dry: true, fx: 'petal',
    verbs: ['sniffing the wildflowers', 'stopping to smell the flowers'] },
  { id: 'dig', motion: 'dig', icon: '🕳️', dur: [4500, 7000], w: 1.4, only: ['ground', 'rock'], dry: true, fx: 'dust',
    verbs: ['digging a little hole', 'pawing a neat hole in the dirt'] },
  { id: 'stargaze', motion: 'stargaze', icon: '✨', dur: [9000, 15000], w: .9, phases: ['night'], dry: true,
    locBonus: { hill: 2, observatory: 3, green: 1 }, fx: 'twinkle',
    verbs: ['lying back to gaze at the stars', 'watching the night sky'] },
  { id: 'raindance', motion: 'dance', icon: '💧', dur: [6000, 9000], w: 2.2, rain: true, lover: true, fx: 'drop',
    verbs: ['dancing in the rain', 'splashing through the puddles'] },
  { id: 'huddle', motion: 'shelter', icon: '☔', dur: [5000, 9000], w: 1.4, rain: true, lover: false, fx: 'drop',
    verbs: ['huddling against the rain', 'waiting for the rain to ease off'] },
  { id: 'shake', motion: 'shake', quiet: true, dur: [1400, 2000], w: 1.2, rain: true, fx: 'drop' },
  { id: 'puff', motion: 'puff', icon: '🔥', dur: [3200, 5200], w: 1.1, only: ['fire'], fx: 'ember',
    verbs: ['puffing out little embers', 'warming its paws on its own flame'] },
  { id: 'spark', motion: 'spark', icon: '⚡', dur: [3000, 4800], w: 1.1, only: ['electric'], fx: 'spark',
    verbs: ['crackling with static', 'sending tiny sparks into the air'] },
  { id: 'twirl', motion: 'dance', icon: '✨', dur: [3800, 5600], w: .6, types: { fairy: 3, psychic: 1 }, fx: 'sparkle',
    verbs: ['twirling on the spot', 'dancing a little jig'] },
  { id: 'meditate', motion: 'meditate', icon: '🧘', dur: [8000, 13000], w: .9, only: ['psychic', 'fighting'],
    verbs: ['meditating quietly', 'focusing its mind'] },
  { id: 'fade', motion: 'fade', icon: '👻', dur: [4500, 7000], w: 1.2, only: ['ghost'], phaseBonus: { night: 2 },
    verbs: ['flickering in and out of sight', 'haunting a shady corner'] },
  { id: 'frost', motion: 'puff', icon: '❄️', dur: [3200, 5000], w: 1.1, only: ['ice'], fx: 'frost',
    verbs: ['breathing out frosty puffs', 'frosting the grass around it'] },
  { id: 'bubble', motion: 'puff', icon: '🫧', dur: [3200, 5000], w: .8, only: ['water', 'poison'], fx: 'bubble',
    verbs: ['blowing bubbles', 'chasing its own bubbles'] },
  { id: 'preen', motion: 'preen', icon: '🪶', dur: [3200, 5000], w: 1, gaits: ['fly'], fx: 'feather',
    verbs: ['preening its feathers', 'fluffing up its feathers'] },
  { id: 'roar', motion: 'roar', icon: '❗', dur: [2600, 3600], w: .8, only: ['dragon'], fx: 'shout',
    verbs: ['practicing a mighty roar'] },
  { id: 'yawn', motion: 'yawn', quiet: true, dur: [2200, 3000], w: 1.4, phases: ['dusk', 'night'], diurnal: true },
  { id: 'stretch', motion: 'stretch', icon: '🌅', dur: [2500, 3400], w: 1.2, phases: ['dawn'],
    verbs: ['having a long morning stretch'] },
  /* Species with a habit of their own. */
  { id: 'sing', motion: 'sing', icon: '🎵', dur: [6500, 9000], w: 1.6, species: [39, 40, 174], fx: 'note',
    lullaby: true, verbs: ['singing a soothing lullaby'] },
  { id: 'headache', motion: 'headache', icon: '💫', dur: [3500, 5500], w: 1.6, species: [54, 55],
    verbs: ['clutching its head. Another headache'] },
  { id: 'karp', motion: 'flop', icon: '💦', dur: [3000, 4500], w: 2, species: [129], fx: 'drop',
    say: ['{a} used Splash! But nothing happened.'] },
  { id: 'zoneout', motion: 'sit', icon: '💭', dur: [9000, 15000], w: 1.8, species: [79, 80, 199],
    verbs: ['staring into space', 'thinking about absolutely nothing'] },
  { id: 'coins', motion: 'sniff', icon: '🪙', dur: [4000, 6000], w: 1.6, species: [52, 53], fx: 'coin',
    verbs: ['counting its shiny coins'] },
  { id: 'moondance', motion: 'dance', icon: '🌙', dur: [6000, 9000], w: 2.4, species: [35, 36, 173], phases: ['night'],
    fx: 'sparkle', verbs: ['dancing in the moonlight'] },
  { id: 'cairn', motion: 'cairn', icon: '🪨', dur: [6000, 9000], w: 2.2, species: [1044, 1045],
    verbs: ['stacking pebbles into a little cairn'] },
  { id: 'tally', motion: 'tally', icon: '🧮', dur: [5000, 8000], w: 2, species: [1037],
    verbs: ['sliding its tail beads to count everyone nearby'] },
  { id: 'curl', motion: 'curl', icon: '🌿', dur: [5000, 9000], w: 2, species: [1042],
    verbs: ['curled up tight, pretending to be a fern'] },
  { id: 'lockpick', motion: 'sniff', icon: '🗝️', dur: [4000, 6500], w: 2, species: [1046],
    verbs: ['testing its key feathers on a cottage lock'] },
  { id: 'notes', motion: 'read', icon: '📜', dur: [5000, 8000], w: 2, species: [1026, 1027, 1028],
    verbs: ['rearranging the ink marks on its hide', 'chewing a discarded note thoughtfully'] },
  { id: 'kiln', motion: 'puff', icon: '🏺', dur: [4500, 7000], w: 2, species: [1038], fx: 'ember',
    verbs: ['firing a little clay pellet in its glowing seam'] },
  { id: 'lure', motion: 'meditate', icon: '🫧', dur: [6000, 9000], w: 2, species: [1029, 1030], fx: 'bubble',
    verbs: ['pulsing its lure in perfect stillness'] }
];

/* ---- What residents say ------------------------------------------------- */

/* A line fits when all of its tags describe the moment: the district, the
   time of day, the weather, how well the pair know each other, a shared
   type ("both:fire")... Specific lines beat general ones, and lines heard
   recently are skipped. */
var KINGDOM_LINES = [
  ['♥', [], '{a} and {b} are sharing a happy moment.'],
  ['!', [], '{a} started a tiny game of chase with {b}.'],
  ['♪', [], '{a} hums a little tune, and {b} joins in.'],
  ['?', [], '{a} bumped into {b}. Both pretend it was on purpose.'],
  ['✦', [], '{a} shows {b} a shiny pebble it found.'],
  ['…', [], '{a} and {b} are having a staring contest. {b} blinked first.'],
  ['ha', [], '{a} told {b} a joke. {b} is still thinking about it.'],
  ['♥', [], '{a} and {b} trade a friendly nuzzle.'],
  ['!', [], '{a} is teaching {b} a brand-new trick.'],
  ['~', [], '{a} sniffs {b} politely. {b} sniffs back.'],
  ['✿', [], '{a} and {b} are sharing a berry, mostly fairly.'],
  ['♪', ['clear'], '{a} and {b} are walking in step without noticing.'],
  ['👋', ['first'], 'First meeting! {a} and {b} circle each other curiously.'],
  ['👋', ['first'], '{a} introduces itself to {b} with a little bow.'],
  ['?', ['first'], '{b} is not sure about {a} yet, but it is warming up.'],
  ['♥', ['friends'], '{a} and {b} greet each other like old pals.'],
  ['★', ['friends'], '{a} saved a spot for {b}.'],
  ['✋', ['friends'], '{a} and {b} have a secret handshake now.'],
  ['♥', ['close'], '{a} and {b} are inseparable today.'],
  ['♥', ['close'], '{a} leans on {b} for a while. {b} does not mind at all.'],
  ['♥', ['best'], 'Best friends {a} and {b} giggle about something only they understand.'],
  ['♥', ['best'], '{a} spotted {b} and came running. Best friends!'],
  ['♥', ['best'], '{a} and {b} share everything, even the last berry.'],
  ['⚔', ['rivals'], '{a} and {b} size each other up. Rivals!'],
  ['⚔', ['rivals'], '{a} challenges {b} to a race. {b} accepts at once.'],
  ['⚔', ['rivals', 'gym'], '{a} and {b} bump fists. Next time, {a} says, it wins.'],
  ['♥', ['family'], '{a} copies everything {b} does.'],
  ['♥', ['family'], '{b} keeps a watchful eye on little {a}.'],
  ['♥', ['family'], '{a} and {b} look so alike. Family!'],
  ['!', ['same'], 'Two of a kind! {a} and {b} are comparing notes.'],
  ['☀', ['dawn'], '{a} and {b} wake the town with a cheerful morning call.'],
  ['✦', ['dawn'], 'Dew sparkles on {a} as it says good morning to {b}.'],
  ['☀', ['day', 'clear'], '{a} and {b} are soaking up the sunshine together.'],
  ['!', ['day'], '{a} and {b} are playing tag in the warm light.'],
  ['✦', ['day'], '{a} and {b} stopped to watch the town sparkle.'],
  ['♥', ['dusk'], '{a} and {b} watch the sky turn orange.'],
  ['…', ['dusk'], '{a} yawns. Now {b} is yawning too.'],
  ['★', ['night'], '{a} and {b} whisper so they do not wake anyone.'],
  ['★', ['night', 'clear'], '{a} and {b} count the stars together.'],
  ['☄', ['night', 'clear'], '{a} and {b} spotted a shooting star!'],
  ['✧', ['night'], 'Fireflies drift between {a} and {b}.'],
  ['💧', ['rain'], '{a} and {b} are splashing in the puddles.'],
  ['☔', ['rain'], '{a} shares a dry spot with {b}.'],
  ['💦', ['rain'], '{a} shakes off the rain all over {b}. Oops.'],
  ['♪', ['rain'], '{a} and {b} listen to the rain pattering on the leaves.'],
  ['💧', ['rain', 'both:water'], '{a} and {b} are thrilled about the rain.'],
  ['🔥', ['rain', 'both:fire'], '{a} and {b} huddle close to keep their flames dry.'],
  ['🔥', ['night', 'both:fire'], '{a} and {b} light up the path together.'],
  ['🌿', ['both:grass'], '{a} and {b} are comparing leaves.'],
  ['☀', ['day', 'both:grass'], '{a} and {b} turn their leaves to the sun.'],
  ['🐝', ['both:bug'], '{a} and {b} are buzzing about something.'],
  ['⚡', ['both:electric'], 'Zap! {a} and {b} gave each other a static shock.'],
  ['…', ['both:psychic'], '{a} and {b} have a whole conversation without a sound.'],
  ['👻', ['both:ghost'], '{a} and {b} play hide-and-seek in the shadows.'],
  ['➰', ['both:flying'], '{a} and {b} race each other in a quick loop overhead.'],
  ['👊', ['both:fighting'], '{a} and {b} trade friendly sparring taps.'],
  ['✨', ['both:fairy'], '{a} and {b} leave a trail of sparkles behind them.'],
  ['💬', ['both:normal'], '{a} and {b} share a lazy chat about nothing in particular.'],
  ['🪨', ['both:rock'], '{a} and {b} are comparing their favourite rocks.'],
  ['🕳', ['both:ground'], '{a} and {b} dig matching holes side by side.'],
  ['❄', ['both:ice'], '{a} and {b} frost the grass in a perfect little circle.'],
  ['❗', ['both:dragon'], '{a} and {b} let out a tiny proud roar together.'],
  ['🫧', ['both:poison'], '{a} and {b} are bubbling happily.'],
  ['🔔', ['both:steel'], '{a} and {b} clink together. Clang!'],
  ['🌙', ['night', 'both:dark'], '{a} and {b} slip into the shadows for a moment.'],
  ['💧', ['both:water'], '{a} and {b} squirt water at each other.'],
  ['♪', ['green'], '{a} and {b} found a song in the trees.'],
  ['!', ['green'], '{a} and {b} dare each other to touch the waterfall.'],
  ['~', ['green', 'clear'], '{a} and {b} roll down the meadow slope together.'],
  ['✿', ['green'], '{a} shows {b} the best shady spot in the meadow.'],
  ['⛲', ['square'], '{a} and {b} make a wish at the fountain.'],
  ['👀', ['square'], '{a} and {b} are people-watching by the fountain.'],
  ['🏮', ['square', 'night'], 'The lanterns sway as {a} and {b} chase each other round the square.'],
  ['🫐', ['market'], '{a} and {b} haggle over a berry. Nobody knows the price.'],
  ['🫐', ['market'], '{a} found a fallen berry and split it with {b}.'],
  ['~', ['market'], '{a} and {b} sniff every stall in a row.'],
  ['🌊', ['riverside'], '{a} and {b} are skipping stones on the river.'],
  ['🌊', ['riverside'], '{a} and {b} count the turns of the water wheel.'],
  ['🌊', ['riverside'], '{a} and {b} count the ripples under the footbridge.'],
  ['🏡', ['hearth'], '{a} and {b} are visiting the cottages.'],
  ['🌱', ['hearth'], '{a} and {b} snoop around the cottage garden.'],
  ['🔥', ['hearth', 'dusk'], '{a} and {b} sniff the woodsmoke from the chimneys.'],
  ['🔔', ['hill'], '{a} and {b} listen to the Moonbell hum in the wind.'],
  ['🌸', ['hill'], '{a} and {b} admire the moonflowers.'],
  ['!', ['hill'], '{a} and {b} race up the terrace stairs.'],
  ['💪', ['gym'], '{a} and {b} trade training tips.'],
  ['💪', ['gym'], '{a} cheers {b} through one more set.'],
  ['🍎', ['orchard'], '{a} and {b} are sharing an apple.'],
  ['🌾', ['orchard'], '{a} and {b} watch the windmill sails turn.'],
  ['🐝', ['orchard', 'day'], '{a} and {b} follow a honeybee across the orchard.'],
  ['♨', ['springs'], '{a} and {b} are enjoying the warm steam.'],
  ['♨', ['springs'], '{a} and {b} dip a toe in the springs and squeal.'],
  ['🌠', ['observatory', 'night'], '{a} and {b} trace constellations in the sky.'],
  ['✦', ['observatory'], '{a} and {b} spin around on the star compass.'],
  ['🔭', ['observatory'], '{a} and {b} take turns guessing where the telescope points.']
];

/* Lines for a crowd at one spot, by the spot's motion. */
var KINGDOM_GROUP_LINES = {
  warm: ['{list} are swapping stories around the fire.', '{list} share the warmth of the fire.'],
  soak: ['{list} are soaking together. Pure bliss.', '{list} sigh happily in the warm water.'],
  swim: ['{list} are having a splash fight!', '{list} swim lazy circles together.'],
  splash: ['{list} are having a splash fight in the fountain!'],
  sit: ['{list} sit together, swinging their feet.'],
  rest: ['{list} are taking it easy together.'],
  eat: ['{list} are having a berry picnic.'],
  browse: ['{list} crowd round the stalls.'],
  stargaze: ['{list} lie in a row, counting the stars.'],
  watch: ['{list} watch the water together.'],
  pick: ['{list} are picking berries together.'],
  sleep: ['{list} are curled up together, fast asleep.'],
  shelter: ['{list} squeeze in together to wait out the rain.'],
  gym: ['{list} are training side by side.'],
  any: ['{list} are hanging out together.']
};

function kingdomLineTags(a, b) {
  var tags = { any: true };
  tags[a.location.id] = true;
  tags[KINGDOM_PHASE] = true;
  tags[KINGDOM_WEATHER === 'rain' ? 'rain' : 'clear'] = true;
  var bond = kingdomBond(a.entry, b.entry);
  var level = kingdomBondLevel(bond);
  if (!bond.n) tags.first = true;
  if (level >= 1) tags.friends = true;
  if (level >= 2) tags.close = true;
  if (level >= 3) tags.best = true;
  if ((bond.r || 0) >= 3) tags.rivals = true;
  if (kingdomFamilyPair(a, b)) tags.family = true;
  if (a.entry.mon.id === b.entry.mon.id) tags.same = true;
  a.traits.types.forEach(function (type) {
    if (b.traits.types.indexOf(type) >= 0) tags['both:' + type] = true;
  });
  return tags;
}

function kingdomPickLine(tags, rand) {
  var options = [], total = 0;
  KINGDOM_LINES.forEach(function (line) {
    if (KINGDOM_RECENT_LINES.indexOf(line[2]) >= 0) return;
    if (!line[1].every(function (tag) { return tags[tag]; })) return;
    var w = 1 + line[1].length * 1.6;
    options.push([line, w]);
    total += w;
  });
  if (!options.length) return KINGDOM_LINES[0];
  var pick = rand() * total;
  for (var i = 0; i < options.length; i++) {
    if ((pick -= options[i][1]) < 0) return options[i][0];
  }
  return options[0][0];
}

function kingdomRememberLine(text) {
  KINGDOM_RECENT_LINES.push(text);
  if (KINGDOM_RECENT_LINES.length > 18) KINGDOM_RECENT_LINES.shift();
}

function kingdomNameList(actors) {
  var names = actors.map(function (actor) { return monName(actor.entry.mon); });
  if (names.length < 3) return names.join(' and ');
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
}

function kingdomFill(text, a, b) {
  return text.replace(/\{a\}/g, a ? monName(a.entry.mon) : '').replace(/\{b\}/g, b ? monName(b.entry.mon) : '');
}

/* ---- Friendships ---------------------------------------------------------- */

function kingdomBondsLoad() {
  if (KINGDOM_BONDS) return KINGDOM_BONDS;
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KINGDOM_BOND_KEY) || 'null'); } catch (error) { }
  KINGDOM_BONDS = saved && saved.v === 1 && saved.pairs ? saved : { v: 1, pairs: {} };
  return KINGDOM_BONDS;
}

function kingdomBondsSave() {
  if (!KINGDOM_BONDS) return;
  var live = {};
  kingdomRoster().forEach(function (entry) { live[kingdomPlacementKey(entry)] = true; });
  Object.keys(KINGDOM_BONDS.pairs).forEach(function (pair) {
    var keys = pair.split('|');
    if (!live[keys[0]] || !live[keys[1]]) delete KINGDOM_BONDS.pairs[pair];
  });
  try { localStorage.setItem(KINGDOM_BOND_KEY, JSON.stringify(KINGDOM_BONDS)); } catch (error) { }
}

function kingdomBondId(a, b) {
  var ka = kingdomPlacementKey(a), kb = kingdomPlacementKey(b);
  return ka < kb ? ka + '|' + kb : kb + '|' + ka;
}

function kingdomBond(a, b) {
  return kingdomBondsLoad().pairs[kingdomBondId(a, b)] || { n: 0, r: 0, t: 0 };
}

/* 0 acquaintances, 1 friends, 2 close friends, 3 best friends. */
function kingdomBondLevel(bond) {
  var n = bond ? bond.n || 0 : 0;
  return n >= 10 ? 3 : n >= 6 ? 2 : n >= 3 ? 1 : 0;
}

var KINGDOM_BOND_NAMES = ['acquaintances', 'friends', 'close friends', 'best friends'];

/* Counts once a minute per pair at most, so a pair has to keep finding each
   other to become close. Returns the new level when it just went up. */
function kingdomBondMeet(a, b, rivalry) {
  if (a === b) return 0;
  var store = kingdomBondsLoad();
  var id = kingdomBondId(a.entry, b.entry);
  var bond = store.pairs[id] || (store.pairs[id] = { n: 0, r: 0, t: 0 });
  var now = Date.now();
  if (now - (bond.t || 0) < KINGDOM_BOND_MEET_MS) return 0;
  var before = kingdomBondLevel(bond), wasRival = (bond.r || 0) >= 3;
  bond.n = (bond.n || 0) + 1;
  if (rivalry) bond.r = (bond.r || 0) + 1;
  bond.t = now;
  kingdomBondsSave();
  var after = kingdomBondLevel(bond);
  if (after > before) {
    kingdomSay(monName(a.entry.mon) + ' and ' + monName(b.entry.mon) + ' are ' +
      (after === 3 ? 'now best friends!' : after === 2 ? 'close friends now!' : 'friends now!'), 'news');
    kingdomEmote(a, '♥', 'bond');
    kingdomEmote(b, '♥', 'bond');
    return after;
  }
  if (!wasRival && (bond.r || 0) >= 3) {
    kingdomSay(monName(a.entry.mon) + ' and ' + monName(b.entry.mon) + ' have become gym rivals!', 'news');
  }
  return 0;
}

function kingdomFamilyPair(a, b) {
  var fa = kingdomFamily(a.entry.mon.id), fb = kingdomFamily(b.entry.mon.id);
  return fa.root === fb.root && fa.stage !== fb.stage;
}

/* Friends and family of an actor that are in this district right now. */
function kingdomCloseOnes(actor) {
  var rows = [];
  KINGDOM_ACTORS.forEach(function (other) {
    if (other === actor || other.trip) return;
    var level = kingdomBondLevel(kingdomBond(actor.entry, other.entry));
    var family = kingdomFamilyPair(actor, other);
    if (level >= 1 || family) rows.push({ actor: other, level: level, family: family });
  });
  return rows;
}

/* ---- Particles ------------------------------------------------------------- */

/* Particles drawn from the pixel icon sheet (assets/ui/kingdom-icons.png). */
var KINGDOM_FX_ICONS = { heart: 0, note: 1, sparkle: 6, twinkle: 14 };
/* Some effects are a little bundle: a frosty puff is one breath cloud and
   a scatter of flakes. */
var KINGDOM_FX_BUNDLES = { frost: ['breath', 'snow', 'snow', 'snow'] };
var KINGDOM_NOTE_HUES = [48, 330, 196, 140, 275];

function kingdomFx(actor, kind, count) {
  if (!actor || !actor.el || kingdomReduceMotion()) return;
  if (KINGDOM_FX_BUNDLES[kind]) {
    KINGDOM_FX_BUNDLES[kind].forEach(function (part, i) { kingdomFxBit(actor, part, i); });
    return;
  }
  count = count || 1;
  for (var i = 0; i < count; i++) kingdomFxBit(actor, kind, i);
}

function kingdomFxBit(actor, kind, i) {
  var bit = document.createElement('i');
  var icon = KINGDOM_FX_ICONS[kind];
  bit.className = 'kfx kfx-' + kind + (icon == null ? '' : ' kingdom-icon');
  bit.setAttribute('aria-hidden', 'true');
  bit.style.setProperty('--dx', ((Math.random() - .5) * 2).toFixed(2));
  bit.style.setProperty('--dy', (.6 + Math.random() * .8).toFixed(2));
  /* Pixel icons keep their own size; only plain bits vary. */
  if (icon == null) bit.style.setProperty('--s', (.8 + Math.random() * .45).toFixed(2));
  else bit.style.setProperty('--i', String(icon));
  bit.style.setProperty('--rot', Math.round(Math.random() * 360) + 'deg');
  /* Notes come in a few colours: the blue note, turned round the colour wheel. */
  if (kind === 'note') bit.style.setProperty('--hr', (KINGDOM_NOTE_HUES[Math.floor(Math.random() * KINGDOM_NOTE_HUES.length)] - 225) + 'deg');
  bit.style.setProperty('--delay', (i * .12 + Math.random() * .1).toFixed(2) + 's');
  actor.el.appendChild(bit);
  setTimeout(function () { if (bit.parentNode) bit.remove(); }, 2700);
}

/* Emote bubbles use one small set of pixel icons, like a handheld game, so
   every line's mark is read as one of them (anything else is a happy face). */
var KINGDOM_EMOTE_ICONS = { heart: 0, note: 1, excl: 2, quest: 3, dots: 4, drop: 5, spark: 6, happy: 7, anger: 8 };
var KINGDOM_EMOTE_MARKS = {
  '♥': 'heart', '!': 'excl', '❗': 'excl', '💪': 'excl', '👋': 'excl', '✋': 'excl', '?': 'quest',
  '…': 'dots', '~': 'dots', '➰': 'dots', '💬': 'dots', '👀': 'dots', '🕳': 'dots', '🪨': 'dots',
  '♪': 'note', '🎵': 'note', '🔔': 'note',
  '✦': 'spark', '✧': 'spark', '★': 'spark', '✨': 'spark', '☄': 'spark', '🌠': 'spark', '🔭': 'spark',
  '⚡': 'spark', '🌙': 'spark',
  '💧': 'drop', '💦': 'drop', '☔': 'drop', '🌊': 'drop', '♨': 'drop', '⛲': 'drop', '❄': 'drop', '\ud83e\udee7': 'drop',
  '⚔': 'anger', '👊': 'anger'
};

function kingdomEmote(actor, mark, kind) {
  if (!actor || !actor.el) return;
  var old = actor.el.querySelector('.kingdom-emote');
  if (old) old.remove();
  var emote = document.createElement('span');
  emote.className = 'kingdom-emote' + (kind ? ' kingdom-emote-' + kind : '');
  emote.setAttribute('aria-hidden', 'true');
  var icon = document.createElement('i');
  icon.style.setProperty('--i', String(KINGDOM_EMOTE_ICONS[KINGDOM_EMOTE_MARKS[mark] || 'happy']));
  emote.appendChild(icon);
  actor.el.appendChild(emote);
  clearTimeout(actor.emoteTimer);
  actor.emoteTimer = setTimeout(function () { if (emote.parentNode) emote.remove(); }, 1900);
}

/* ---- Glow ----------------------------------------------------------------- */

/* After dusk every resident is drawn above the town's night tint, so depth
   order never breaks, and each sprite is graded by an SVG colour matrix that
   matches that tint (a little lighter, to keep it readable). A Pokemon that
   makes light gets a lighter grade, a soft halo behind it and a pool of light
   at its feet, all inside its own box: no screen-wide blend layer. */
var KINGDOM_TINTS = {
  'kq-night': '0.53 0 0 0 0.028  0 0.53 0 0 0.066  0 0 0.58 0 0.13  0 0 0 1 0',
  'kq-dusk': '0.8 0 0 0 0.055  0 0.75 0 0 0.035  0 0 0.78 0 0.06  0 0 0 1 0',
  'kq-glow-night': '0.86 0 0 0 0.01  0 0.84 0 0 0.015  0 0 0.84 0 0.03  0 0 0 1 0',
  'kq-glow-dusk': '0.96 0 0 0 0.01  0 0.94 0 0 0.01  0 0 0.94 0 0.015  0 0 0 1 0',
  'kq-fire-night': '0.72 0 0 0 0.07  0 0.56 0 0 0.04  0 0 0.44 0 0.05  0 0 0 1 0',
  'kq-fire-dusk': '0.92 0 0 0 0.05  0 0.8 0 0 0.03  0 0 0.7 0 0.03  0 0 0 1 0'
};

function kingdomEnsureTints() {
  if (document.getElementById('kingdom-tints')) return;
  var h = '<svg id="kingdom-tints" width="0" height="0" aria-hidden="true" focusable="false" ' +
    'style="position:absolute;width:0;height:0;overflow:hidden">';
  Object.keys(KINGDOM_TINTS).forEach(function (id) {
    h += '<filter id="' + id + '" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="' +
      KINGDOM_TINTS[id] + '"/></filter>';
  });
  document.body.insertAdjacentHTML('beforeend', h + '</svg>');
}

function kingdomGlowEnsure(actor) {
  var glow = actor.traits && actor.traits.glow;
  if (!glow) return;
  kingdomEnsureTints();
  actor.el.classList.add('glows', 'glow-' + glow.style);
  actor.el.style.setProperty('--glow', glow.color);
  if (actor.halo && actor.halo.parentNode === actor.el) return;
  var halo = document.createElement('i');
  halo.className = 'kingdom-halo';
  halo.setAttribute('aria-hidden', 'true');
  halo.style.animationDelay = '-' + (Math.random() * 3).toFixed(2) + 's';
  var pool = document.createElement('i');
  pool.className = 'kingdom-pool';
  pool.setAttribute('aria-hidden', 'true');
  actor.el.insertBefore(pool, actor.el.firstChild);
  actor.el.insertBefore(halo, actor.el.firstChild);
  actor.halo = halo;
  actor.pool = pool;
}

/* The pool of light stays on the ground while a flyer or hopper is up in the air. */
function kingdomGlowPaint(actor, depth) {
  if (!actor.pool) return;
  var lift = actor.lift || 0;
  var layer = actor.el.parentElement;
  var px = lift && layer ? lift / 100 * layer.clientHeight / depth : 0;
  actor.pool.style.translate = px ? '-50% calc(-50% + ' + px.toFixed(1) + 'px)' : '';
}

function kingdomGlowRemove(actor) {
  if (actor.halo && actor.halo.parentNode) actor.halo.remove();
  if (actor.pool && actor.pool.parentNode) actor.pool.remove();
  actor.halo = null;
  actor.pool = null;
}

/* ---- Setting up a resident -------------------------------------------------- */

function kingdomActorSetup(actor) {
  var traits = actor.traits = kingdomTraits(actor.entry.mon.id);
  var now = performance.now();
  actor.speed *= traits.speed;
  /* Everyone wanders a moment before their first decision, so a district
     does not spring into action all at once. */
  actor.nextTurn = now + 700 + actor.rand() * 2600;
  actor.act = null;
  actor.follow = null;
  actor.lift = 0;
  actor.el.classList.add('gait-' + traits.gait);
  var seat = kingdomSeat(actor.entry.mon);
  /* Where the creature's feet are in its frame, so water cuts it at the
     right height and floaters hover by the same amount. */
  actor.el.style.setProperty('--below', (seat.below * 100).toFixed(1) + '%');
  actor.el.style.setProperty('--span', (seat.span * 100).toFixed(1) + '%');
  kingdomGlowEnsure(actor);
  /* Arriving in a district at night finds most of the town already asleep. */
  var settled = !actor.entry.whereNow || actor.entry.whereNow.kind === 'stay';
  if (!settled) return;
  if (KINGDOM_PHASE === 'night' && !traits.nocturnal && actor.rand() < .62) kingdomStartSleep(actor, now, true);
  else if (KINGDOM_PHASE === 'day' && traits.sleepy && actor.rand() < .5) kingdomStartSleep(actor, now, true);
}

function kingdomActorTeardown(actor) {
  kingdomActCancel(actor, true);
  kingdomGlowRemove(actor);
}

/* ---- Activities --------------------------------------------------------------- */

function kingdomSpot(id) {
  for (var i = 0; i < KINGDOM_SPOTS.length; i++) {
    if (KINGDOM_SPOTS[i].id === id) return KINGDOM_SPOTS[i];
  }
  return null;
}

function kingdomSpotsAt(locId) {
  return KINGDOM_SPOTS.filter(function (spot) { return spot.loc === locId; });
}

function kingdomSeatOccupant(spot, index, except) {
  for (var i = 0; i < KINGDOM_ACTORS.length; i++) {
    var actor = KINGDOM_ACTORS[i];
    if (actor !== except && kingdomActAt(actor, spot) && actor.act.seat === index) return actor;
  }
  return null;
}

/* At this spot, whether doing its usual thing or asleep on it. */
function kingdomActAt(actor, spot) {
  return !!(actor.act && (actor.act.spot === spot || actor.act.spot.base === spot));
}

function kingdomFreeSeat(spot, actor, rand) {
  var free = [];
  spot.seats.forEach(function (seat, i) { if (!kingdomSeatOccupant(spot, i, actor)) free.push(i); });
  if (!free.length) return -1;
  /* The nearest free seat, with a little randomness so friends spread out. */
  free.sort(function (a, b) {
    var sa = spot.seats[a].from || spot.seats[a].at, sb = spot.seats[b].from || spot.seats[b].at;
    return kingdomDist([actor.x, actor.y], sa) - kingdomDist([actor.x, actor.y], sb);
  });
  return rand && free.length > 1 && rand() < .3 ? free[1] : free[0];
}

/* Why this resident cannot use this spot right now ('' when it can). */
function kingdomSpotBlocked(spot, actor) {
  var t = actor.traits;
  if ((spot.swim || spot.soak) && t.has('fire') && !t.has('water')) return 'Fire types keep out of the water';
  if (spot.swim && !t.swimmer) return 'Only swimmers go in the water';
  if (spot.small && t.big) return 'Too big to fit';
  if (t.fish && /^(climb|balance|hurdles|weights|bags|spar)$/.test(spot.motion)) return 'Fins are not made for this';
  if (spot.phases && spot.phases.indexOf(KINGDOM_PHASE) < 0) return 'Only after dark';
  return '';
}

function kingdomSpotVerb(spot, rand) {
  var list = KINGDOM_WEATHER === 'rain' && spot.rainVerbs ? spot.rainVerbs :
    (KINGDOM_PHASE === 'night' && spot.nightVerbs) ? spot.nightVerbs : spot.verbs;
  return list[Math.floor(rand() * list.length)];
}

function kingdomActStart(actor, spot, seatIndex, options) {
  options = options || {};
  if (!actor || actor.trip || !spot) return false;
  if (!spot.adhoc && actor.location.id !== spot.loc) return false;
  if (!spot.adhoc && (seatIndex < 0 || kingdomSeatOccupant(spot, seatIndex, actor))) return false;
  kingdomActCancel(actor, true);
  actor.follow = null;
  var seat = spot.seats[seatIndex] || spot.seats[0];
  var dest = seat.from || seat.at;
  var route = [];
  if (!spot.adhoc) {
    var path = kingdomFindPath(actor.location, [actor.x, actor.y], dest);
    route = path.slice(1);
    if (!route.length || kingdomDist(route[route.length - 1], dest) > .01) route.push(dest);
  } else if (kingdomDist([actor.x, actor.y], dest) > .3) {
    /* Stepping aside to a place of its own first. */
    route = [dest];
  }
  var now = performance.now();
  actor.act = {
    spot: spot, seat: seatIndex, phase: route.length ? 'go' : 'arrive', route: route, step: 0,
    manual: !!options.manual, quiet: !!(options.quiet || spot.quiet), blocked: 0, startedAt: now,
    verb: options.verb || (spot.verbs ? kingdomSpotVerb(spot, actor.rand) : ''),
    dur: options.dur || 0, then: options.then || null, fxAt: 0, driftAt: 0, drift: 0
  };
  actor.pauseUntil = 0;
  actor.nextTurn = Infinity;
  if (route.length) {
    actor.el.classList.add('walking');
    if (!actor.act.quiet && !spot.adhoc) {
      kingdomSay(monName(actor.entry.mon) + ' is heading to the ' + spot.name + '.', options.manual ? 'news' : 'chatter');
    }
  }
  kingdomRefreshGymStations();
  kingdomRefreshInspector();
  return true;
}

function kingdomActBegin(actor, now) {
  var act = actor.act;
  var spot = act.spot;
  var seat = spot.seats[act.seat] || spot.seats[0];
  act.phase = 'do';
  var span = spot.dur || [6000, 9000];
  act.until = now + (act.dur || (act.manual ? Math.max(span[0], 6800) : span[0] + actor.rand() * (span[1] - span[0])));
  actor.pauseUntil = act.until;
  actor.el.classList.remove('walking', 'greeting');
  actor.el.classList.add('acting', 'act-' + spot.motion);
  if (spot.perch) actor.el.classList.add('perched');
  if (seat.face) actor.el.style.setProperty('--face', String(seat.face));
  kingdomActDecor(actor, spot.motion, true);
  if (!act.quiet) {
    var name = monName(actor.entry.mon);
    var line = spot.say ? kingdomFill(spot.say[Math.floor(actor.rand() * spot.say.length)], actor) :
      name + ' is ' + act.verb + '!';
    kingdomSay(line, act.manual ? 'news' : 'chatter');
  }
  if (spot.lullaby) kingdomLullaby(actor, now);
  if (spot.fx === 'bell') kingdomRingBell();
  kingdomSpotFx(spot.loc);
  kingdomRefreshGymStations();
  kingdomRefreshInspector();
}

/* Extra parts an activity needs: sleepy Zs, buzzing bees, a butterfly to
   chase, a snack to nibble, ripples where a swimmer meets the water. */
function kingdomActDecor(actor, motion, on) {
  actor.el.querySelectorAll('.kingdom-decor').forEach(function (node) { node.remove(); });
  if (!on) return;
  var html = '';
  if (motion === 'sleep') html = '<span class="kingdom-decor kingdom-zzz"><i class="kingdom-icon"></i><i class="kingdom-icon"></i><i class="kingdom-icon"></i></span>';
  else if (motion === 'buzz') html = '<span class="kingdom-decor kingdom-bees"><i></i><i></i><i></i></span>';
  else if (motion === 'chase') html = '<span class="kingdom-decor kingdom-butterfly"><i class="kingdom-icon"></i></span>';
  else if (motion === 'eat') {
    var snack = actor.act && actor.act.spot.snack === 'cake' ? 13 : 12;
    html = '<span class="kingdom-decor kingdom-snack"><i class="kingdom-icon" style="--i:' + snack + '"></i></span>';
  }
  else if (motion === 'swim' || motion === 'soak' || motion === 'splash' || motion === 'paddle') {
    html = '<span class="kingdom-decor kingdom-ripples"><i></i><i></i></span>';
  } else if (motion === 'stargaze') html = '<span class="kingdom-decor kingdom-twinkles"><i class="kingdom-icon"></i><i class="kingdom-icon"></i><i class="kingdom-icon"></i></span>';
  else if (motion === 'cairn') html = '<span class="kingdom-decor kingdom-cairn"><i></i><i></i><i></i></span>';
  else if (motion === 'meditate') html = '<span class="kingdom-decor kingdom-aura"></span>';
  else if (motion === 'bags' || motion === 'spar') html = '<span class="kingdom-decor kingdom-pow"></span>';
  else if (motion === 'weights') html = '<span class="kingdom-decor kingdom-barbell"><i></i></span>';
  else if (motion === 'headache') html = '<span class="kingdom-decor kingdom-dizzy"><i class="kingdom-icon"></i><i class="kingdom-icon"></i><i class="kingdom-icon"></i></span>';
  if (html) actor.el.insertAdjacentHTML('beforeend', html);
}

var KINGDOM_MOTION_FX = {
  swim: ['drop', 2600, 1], soak: ['steam', 900, 1], splash: ['drop', 700, 2], warm: ['ember', 1500, 1],
  pick: ['berry', 1900, 1], garden: ['leaf', 1300, 1], eat: ['crumb', 1100, 1], ring: ['note', 900, 2],
  sniff: ['petal', 1500, 1], bask: ['sparkle', 1300, 1], roll: ['leaf', 900, 1], dig: ['dust', 600, 2],
  dance: ['sparkle', 800, 1], puff: ['ember', 1150, 3], spark: ['spark', 420, 2], preen: ['feather', 1200, 1],
  sing: ['note', 700, 1], flop: ['drop', 600, 2], shake: ['drop', 350, 2], shelter: ['drop', 1600, 1],
  press: ['juice', 900, 1], stones: ['drop', 1700, 1], paddle: ['drop', 1300, 1], roar: ['shout', 700, 2],
  weights: ['dust', 2000, 2]
};

function kingdomActFx(actor, now) {
  var act = actor.act;
  var spot = act.spot;
  var rule = KINGDOM_MOTION_FX[spot.motion];
  var kind = spot.fx && !/^(fountain|campfire|bell|bees)$/.test(spot.fx) ? spot.fx : rule && rule[0];
  if (!kind || now < act.fxAt) return;
  act.fxAt = now + (rule ? rule[1] : 1200) * (.75 + actor.rand() * .5);
  kingdomFx(actor, kind, rule ? rule[2] : 1);
}

function kingdomActEnd(actor, now) {
  var act = actor.act;
  if (!act) return;
  var spot = act.spot;
  var seat = spot.seats[act.seat] || spot.seats[0];
  if (!spot.adhoc && seat.from && act.phase === 'do') {
    kingdomActHop(actor, [actor.x, actor.y], seat.from, now, 'out');
    kingdomActLeaveVisuals(actor);
    return;
  }
  kingdomActFinish(actor, now);
}

function kingdomActLeaveVisuals(actor) {
  var act = actor.act;
  actor.el.classList.remove('acting', 'act-' + act.spot.motion, 'perched', 'leg-jump', 'leg-run', 'leg-climb', 'leg-cheer');
  actor.depthY = null;
  kingdomActDecor(actor, null, false);
}

function kingdomActFinish(actor, now) {
  var act = actor.act;
  if (!act) return;
  var spot = act.spot;
  kingdomActLeaveVisuals(actor);
  actor.act = null;
  actor.lift = 0;
  actor.pauseUntil = now + 500 + actor.rand() * 700;
  actor.target = { x: actor.x, y: actor.y };
  actor.nextTurn = now + 600;
  if (!act.quiet && spot.finish && actor.rand() < .7) {
    kingdomSay(monName(actor.entry.mon) + ' ' + spot.finish[Math.floor(actor.rand() * spot.finish.length)] + '.',
      act.manual ? 'news' : 'chatter');
  }
  kingdomSpotFx(spot.loc);
  kingdomRefreshGymStations();
  kingdomRefreshInspector();
  if (act.then) kingdomAmbientStart(actor, act.then, now, { quiet: true });
}

/* `rest` puts off the next decision a little, so a resident the player just
   interrupted does not march straight back to the same spot. */
function kingdomActCancel(actor, rest) {
  if (!actor || !actor.act) return;
  var spot = actor.act.spot;
  kingdomActLeaveVisuals(actor);
  actor.act = null;
  actor.lift = 0;
  actor.el.classList.remove('hopping');
  /* Stepping off a bench or out of the water lands it back on open ground. */
  if (actor.location && !kingdomIsWalkable(actor.x, actor.y, actor.location)) {
    var back = kingdomNearestWalkable(actor.x, actor.y, actor.location);
    if (back) { actor.x = back.x; actor.y = back.y; }
  }
  var now = performance.now();
  actor.target = { x: actor.x, y: actor.y };
  actor.nextTurn = now + (rest ? 6000 + actor.rand() * 6000 : 800);
  if (rest) actor.target = kingdomPoint(actor.rand, actor.location);
  if (actor.el && actor.el.isConnected) kingdomPaint(actor);
  kingdomSpotFx(spot.loc);
  kingdomRefreshGymStations();
  kingdomRefreshInspector();
}

/* Onto a bench, into a pool: a hop. Stairs (`via`) are climbed at walking
   pace first, then a short hop to the seat. Leaving runs the same way back. */
function kingdomActHop(actor, from, to, now, kind) {
  var act = actor.act;
  var seat = act.spot.seats[act.seat] || act.spot.seats[0];
  var via = seat.via || [];
  var points = [from].concat(kind === 'in' ? via : via.slice().reverse()).concat([to]);
  act.phase = kind === 'in' ? 'hop-in' : 'hop-out';
  act.hopPoints = points;
  act.hopLeg = 0;
  kingdomHopLeg(actor, now);
}

function kingdomHopLeg(actor, now) {
  var act = actor.act;
  var a = act.hopPoints[act.hopLeg], b = act.hopPoints[act.hopLeg + 1];
  var dist = kingdomDist(a, b);
  var last = act.hopPoints.length - 2;
  /* The hop is the leg that leaves or reaches the seat; the rest are steps. */
  act.legHop = act.phase === 'hop-in' ? act.hopLeg === last : act.hopLeg === 0;
  act.hopMs = act.legHop ? 280 + dist * 32 : dist / Math.max(1.5, actor.speed) * 1000;
  act.hopAt = now;
  actor.el.classList.toggle('hopping', act.legHop);
  actor.el.classList.toggle('walking', !act.legHop);
  if (Math.abs(b[0] - a[0]) > .2) actor.el.style.setProperty('--face', b[0] < a[0] ? '-1' : '1');
}

function kingdomMoveToward(actor, tx, ty, dt, scale) {
  var dx = tx - actor.x, dy = ty - actor.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < .45) return 'arrived';
  var step = Math.min(dist, actor.speed * (scale || 1) * dt);
  actor.x += dx / dist * step;
  actor.y += dy / dist * step;
  if (Math.abs(dx) > .15) actor.el.style.setProperty('--face', dx < 0 ? '-1' : '1');
  return 'moved';
}

/* Runs every frame for every settled resident. Returns true while it owns
   the frame (walking to a spot, hopping, doing something). */
function kingdomLifeTick(actor, now, still, dt) {
  var act = actor.act;
  if (!act) {
    if (actor.follow) kingdomFollowTick(actor, now);
    return false;
  }
  var spot = act.spot;
  var seat = spot.seats[act.seat] || spot.seats[0];
  if (act.phase === 'go') {
    var target = act.route[act.step];
    if (still) { actor.x = target[0]; actor.y = target[1]; }
    var dx = target[0] - actor.x, dy = target[1] - actor.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < .6 || still) {
      act.step++;
      if (act.step >= act.route.length) act.phase = 'arrive';
    } else {
      actor.el.classList.add('walking');
      var move = Math.min(dist, actor.speed * dt);
      var moved = kingdomTryStep(actor, actor.x + dx / dist * move, actor.y + dy / dist * move);
      if (moved) {
        act.blocked = 0;
        if (Math.abs(dx) > .15) actor.el.style.setProperty('--face', dx < 0 ? '-1' : '1');
      } else if (++act.blocked > 40) {
        /* Squeezed against scenery: plan again from here, or give up. */
        if (act.replanned) { kingdomActCancel(actor, true); kingdomPaint(actor); return true; }
        act.replanned = true;
        act.blocked = 0;
        var dest = act.route[act.route.length - 1];
        act.route = kingdomFindPath(actor.location, [actor.x, actor.y], dest).slice(1).concat([dest]);
        act.step = 0;
      }
    }
    if (act.phase !== 'arrive') { kingdomPaint(actor); return true; }
  }
  if (act.phase === 'arrive') {
    if (!spot.adhoc && seat.from && !still) {
      kingdomActHop(actor, [actor.x, actor.y], seat.at, now, 'in');
    } else {
      actor.x = seat.at[0];
      actor.y = seat.at[1];
      kingdomActBegin(actor, now);
    }
    kingdomPaint(actor);
    return true;
  }
  if (act.phase === 'hop-in' || act.phase === 'hop-out') {
    var from = act.hopPoints[act.hopLeg], to = act.hopPoints[act.hopLeg + 1];
    var f = still ? 1 : Math.min(1, (now - act.hopAt) / act.hopMs);
    actor.x = from[0] + (to[0] - from[0]) * f;
    actor.y = from[1] + (to[1] - from[1]) * f;
    actor.lift = act.legHop ? Math.sin(Math.PI * f) * Math.min(5, 1.6 + kingdomDist(from, to) * .32) : 0;
    if (f >= 1) {
      actor.lift = 0;
      if (act.legHop && (spot.swim || spot.soak) && act.phase === 'hop-in') kingdomFx(actor, 'drop', 4);
      if (++act.hopLeg < act.hopPoints.length - 1) {
        kingdomHopLeg(actor, now);
      } else {
        actor.el.classList.remove('hopping', 'walking');
        if (act.phase === 'hop-in') kingdomActBegin(actor, now);
        else kingdomActFinish(actor, now);
      }
    }
    kingdomPaint(actor);
    return true;
  }
  /* Doing it. */
  if (now >= act.until) {
    kingdomActEnd(actor, now);
    kingdomPaint(actor);
    return true;
  }
  if (!still) {
    kingdomActDrift(actor, act, seat, now, dt);
    kingdomActFx(actor, now);
    if (spot.motion === 'look' && now >= (act.lookAt || 0)) {
      act.lookAt = now + 600 + actor.rand() * 700;
      var face = actor.el.style.getPropertyValue('--face') === '-1' ? '1' : '-1';
      actor.el.style.setProperty('--face', face);
    }
  }
  kingdomPaint(actor);
  return true;
}

/* Swimmers glide round their pool, stepping-stone hoppers jump stone to
   stone, and a butterfly chase loops around where it started. */
function kingdomActDrift(actor, act, seat, now, dt) {
  var points = seat.drift || act.points;
  if (!points || !points.length) return;
  var spot = act.spot;
  var target = points[act.drift % points.length];
  if (spot.driftMode === 'hop' || spot.driftMode === 'route') {
    if (spot.keepDepth) actor.depthY = seat.at[1];
    if (!act.stoneLeg) {
      if (now < act.driftAt) return;
      actor.el.classList.remove('leg-cheer');
      var how = target[2] || 'hop';
      var dx = target[0] - actor.x, dy = target[1] - actor.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      act.stoneLeg = {
        from: [actor.x, actor.y], to: target, at: now, how: how,
        ms: how === 'climb' ? 500 + dist * 230 : how === 'run' ? 220 + dist * 70 : how === 'jump' ? 320 + dist * 38 : 520,
        arc: how === 'jump' ? 2.6 + dist * .3 : how === 'hop' ? 3.2 : 0
      };
      if (Math.abs(dx) > .2) actor.el.style.setProperty('--face', dx < 0 ? '-1' : '1');
      actor.el.classList.add('leg-' + (how === 'hop' ? 'jump' : how));
    }
    var leg = act.stoneLeg;
    var f = Math.min(1, (now - leg.at) / leg.ms);
    actor.x = leg.from[0] + (leg.to[0] - leg.from[0]) * f;
    actor.y = leg.from[1] + (leg.to[1] - leg.from[1]) * f;
    actor.lift = Math.sin(Math.PI * f) * leg.arc;
    if (f >= 1) {
      act.stoneLeg = null;
      actor.lift = 0;
      act.drift++;
      actor.el.classList.remove('leg-jump', 'leg-run', 'leg-climb');
      var pause = target[3];
      act.driftAt = now + (pause || 380 + actor.rand() * 420);
      if (pause >= 1000) actor.el.classList.add('leg-cheer');
      if (leg.arc) kingdomFx(actor, spot.landFx || 'drop', spot.landFx === 'dust' ? 2 : 1);
    }
    return;
  }
  if (spot.motion === 'chase') {
    /* On open ground, so it goes round the scenery like any walk. */
    var dx = target[0] - actor.x, dy = target[1] - actor.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var step = Math.min(dist, actor.speed * 1.45 * dt);
    if (dist < .5 || !kingdomTryStep(actor, actor.x + dx / dist * step, actor.y + dy / dist * step)) act.drift++;
    else if (Math.abs(dx) > .15) actor.el.style.setProperty('--face', dx < 0 ? '-1' : '1');
    return;
  }
  var pace = spot.motion === 'soak' ? .22 : .38;
  if (kingdomMoveToward(actor, target[0], target[1], dt, pace) === 'arrived') act.drift++;
}

/* A thing to do right here: from the ambient list, or the bed/shelter of
   the moment when there is no spot to walk to. */
/* Is another resident already standing (or settled) right about here? */
function kingdomCrowdedAt(actor, x, y) {
  return KINGDOM_ACTORS.some(function (other) {
    if (other === actor || other.trip || !other.el) return false;
    var at = other.act && other.act.phase === 'go' && other.act.route.length ?
      other.act.route[other.act.route.length - 1] : [other.x, other.y];
    return Math.abs(at[0] - x) < 3.6 && Math.abs(at[1] - y) < 2.6;
  });
}

/* A place of its own: when someone is already right here (or it is under
   the HUD), a few steps aside, so two Pokemon never settle into one spot. */
function kingdomRoomyPoint(actor) {
  if (!kingdomCrowdedAt(actor, actor.x, actor.y) && !kingdomUnderHud(actor.x, actor.y)) return [actor.x, actor.y];
  for (var r = 4; r <= 10; r += 3) {
    var turn = actor.rand();
    for (var k = 0; k < 8; k++) {
      var angle = (k / 8 + turn) * Math.PI * 2;
      var x = actor.x + Math.cos(angle) * r, y = actor.y + Math.sin(angle) * r * .6;
      if (kingdomIsWalkable(x, y, actor.location) && !kingdomCrowdedAt(actor, x, y) && !kingdomUnderHud(x, y)) return [x, y];
    }
  }
  return [actor.x, actor.y];
}

function kingdomAdhocSpot(def, actor) {
  var at = kingdomRoomyPoint(actor);
  var spot = {
    adhoc: true, id: def.id, motion: def.motion, icon: def.icon, name: def.name || '',
    verbs: def.verbs, say: def.say, finish: def.finish, quiet: def.quiet, fx: def.fx,
    dur: def.dur, lullaby: def.lullaby, loc: actor.location.id,
    seats: [{ at: at }]
  };
  if (def.wander) {
    var points = [];
    for (var i = 0; i < 4; i++) {
      var angle = actor.rand() * Math.PI * 2, r = 4 + actor.rand() * 6;
      var p = kingdomNearestWalkable(at[0] + Math.cos(angle) * r, at[1] + Math.sin(angle) * r * .7, actor.location);
      if (p) points.push([p.x, p.y]);
    }
    points.push(at);
    spot.seats[0].drift = points;
  }
  return spot;
}

function kingdomAmbientDef(id) {
  for (var i = 0; i < KINGDOM_AMBIENT.length; i++) {
    if (KINGDOM_AMBIENT[i].id === id) return KINGDOM_AMBIENT[i];
  }
  return null;
}

function kingdomAmbientStart(actor, id, now, options) {
  var def = kingdomAmbientDef(id);
  if (!def || actor.trip) return false;
  return kingdomActStart(actor, kingdomAdhocSpot(def, actor), 0, options || {});
}

/* Sleep: a bed spot when one is free nearby, otherwise right here. */
var KINGDOM_SLEEP_DEF = {
  id: 'sleep', motion: 'sleep', icon: '💤', dur: [40000, 110000],
  verbs: ['fast asleep', 'snoozing peacefully', 'dreaming happily'],
  finish: ['wakes up and blinks sleepily', 'wakes with a big yawn']
};

function kingdomStartSleep(actor, now, instant) {
  var bedSpot = null, bedSeat = -1;
  if (!instant) {
    var beds = kingdomSpotsAt(actor.location.id).filter(function (spot) {
      return spot.bed && !kingdomSpotBlocked(spot, actor);
    });
    for (var i = 0; i < beds.length && bedSeat < 0; i++) {
      var seat = kingdomFreeSeat(beds[i], actor, actor.rand);
      if (seat >= 0 && actor.rand() < .7) { bedSpot = beds[i]; bedSeat = seat; }
    }
  }
  var dur = KINGDOM_SLEEP_DEF.dur[0] + actor.rand() * (KINGDOM_SLEEP_DEF.dur[1] - KINGDOM_SLEEP_DEF.dur[0]);
  var spot = kingdomAdhocSpot(KINGDOM_SLEEP_DEF, actor);
  if (bedSpot) {
    /* Same seat, but this time it sleeps there. */
    spot = Object.create(bedSpot);
    spot.motion = 'sleep';
    spot.verbs = bedSpot.nightVerbs || KINGDOM_SLEEP_DEF.verbs;
    spot.finish = KINGDOM_SLEEP_DEF.finish;
    spot.base = bedSpot;
    spot.dur = KINGDOM_SLEEP_DEF.dur;
    return kingdomActStartShared(actor, spot, bedSpot, bedSeat, { dur: dur, quiet: actor.rand() < .5, then: 'stretch' });
  }
  return kingdomActStart(actor, spot, 0, {
    dur: instant ? dur * (.3 + actor.rand() * .7) : dur, quiet: instant || actor.rand() < .5, then: 'stretch'
  });
}

/* An activity that occupies a real spot's seat while looking different
   (sleeping on a bench rather than sitting on it). */
function kingdomActStartShared(actor, view, base, seatIndex, options) {
  if (kingdomSeatOccupant(base, seatIndex, actor)) return false;
  if (!kingdomActStart(actor, base, seatIndex, options)) return false;
  actor.act.view = view;
  actor.act.spot = view;
  actor.act.verb = view.verbs[Math.floor(actor.rand() * view.verbs.length)];
  return true;
}

/* Jigglypuff's song sends nearby residents off for a short nap. */
function kingdomLullaby(singer, now) {
  var sleepers = [];
  KINGDOM_ACTORS.forEach(function (other) {
    if (other === singer || other.trip || other.act || sleepers.length >= 3) return;
    if (kingdomDist([singer.x, singer.y], [other.x, other.y]) > 16) return;
    if (other.traits.has('normal') && other.entry.mon.id === singer.entry.mon.id) return;
    if (kingdomStartSleep(other, now, true)) {
      other.act.until = now + 9000 + other.rand() * 6000;
      sleepers.push(other);
    }
  });
  if (sleepers.length) {
    setTimeout(function () {
      kingdomSay(kingdomNameList(sleepers) + (sleepers.length > 1 ? ' doze' : ' dozes') + ' off to ' +
        monName(singer.entry.mon) + "'s lullaby.", 'news');
    }, 1800);
  }
}

/* ---- Deciding what to do --------------------------------------------------- */

function kingdomWeighted(options, rand) {
  var total = 0;
  options.forEach(function (row) { total += row.w; });
  var pick = rand() * total;
  for (var i = 0; i < options.length; i++) {
    if ((pick -= options[i].w) < 0) return options[i];
  }
  return options[options.length - 1];
}

function kingdomAffinity(table, traits) {
  var w = 0;
  if (!table) return 0;
  traits.types.forEach(function (type) { w += table[type] || 0; });
  return w;
}

function kingdomAmbientFits(def, actor) {
  var t = actor.traits, raining = KINGDOM_WEATHER === 'rain';
  if (def.species && def.species.indexOf(actor.entry.mon.id) < 0) return false;
  if (def.only && !def.only.some(function (type) { return t.has(type); })) return false;
  if (def.gaits && def.gaits.indexOf(t.gait) < 0) return false;
  if (def.notGait && def.notGait.indexOf(t.gait) >= 0) return false;
  if (def.phases && def.phases.indexOf(KINGDOM_PHASE) < 0) return false;
  if (def.locs && def.locs.indexOf(actor.location.id) < 0) return false;
  if (def.dry && raining) return false;
  if (def.rain && !raining) return false;
  if (def.lover === true && !t.rainLover) return false;
  if (def.lover === false && t.rainLover) return false;
  if (def.diurnal && t.nocturnal) return false;
  return true;
}

/* Called when a resident finishes a walk, a stay, or an activity. */
function kingdomDecide(actor, now) {
  var t = actor.traits;
  var rand = actor.rand;
  var raining = KINGDOM_WEATHER === 'rain';
  var phase = KINGDOM_PHASE;
  var options = [{ kind: 'wander', w: 3.2 }, { kind: 'pause', w: 1.8 }];

  /* Bedtime. Night owls are the other way round: they nap in the daytime. */
  var sleepy = 0;
  if (!t.nocturnal) sleepy = phase === 'night' ? 7 : phase === 'dusk' ? .5 : 0;
  else sleepy = phase === 'day' ? .9 : 0;
  if (t.sleepy && phase !== 'night') sleepy += 1.4;
  if (sleepy) options.push({ kind: 'sleep', w: sleepy });

  if (raining && !t.rainLover) {
    var shelters = kingdomSpotsAt(actor.location.id).filter(function (spot) { return spot.shelter; });
    shelters.forEach(function (spot) {
      var seat = kingdomFreeSeat(spot, actor, rand);
      if (seat >= 0) options.push({ kind: 'spot', spot: spot, seat: seat, w: t.has('fire') ? 9 : 4.5 });
    });
  }

  kingdomSpotsAt(actor.location.id).forEach(function (spot) {
    if (kingdomSpotBlocked(spot, actor)) return;
    if (raining && spot.shelter && !t.rainLover) return;
    var seat = kingdomFreeSeat(spot, actor, rand);
    if (seat < 0) return;
    var w = .55 + kingdomAffinity(spot.types, t) * .55;
    if (spot.phaseBonus && spot.phaseBonus[phase]) w += spot.phaseBonus[phase];
    if (spot.gaits && spot.gaits[t.gait]) w += spot.gaits[t.gait];
    if (raining && !spot.shelter && !spot.swim && !spot.soak && !t.rainLover) w *= .35;
    if (phase === 'night' && !t.nocturnal && !spot.bed) w *= .4;
    if (spot.group && kingdomSpotCrowd(spot) > 0) w += .8;
    options.push({ kind: 'spot', spot: spot, seat: seat, w: w });
  });

  KINGDOM_AMBIENT.forEach(function (def) {
    if (!kingdomAmbientFits(def, actor)) return;
    var w = def.w * (def.types ? .4 + kingdomAffinity(def.types, t) * .4 : 1);
    if (def.locBonus && def.locBonus[actor.location.id]) w += def.locBonus[actor.location.id];
    if (def.phaseBonus && def.phaseBonus[phase]) w += def.phaseBonus[phase];
    /* A fire type caught in the rain with no shelter free huddles up to keep its flame dry. */
    if (raining && def.motion === 'shelter' && t.has('fire')) w *= 4;
    options.push({ kind: 'ambient', def: def, w: w });
  });

  var close = kingdomCloseOnes(actor).filter(function (row) {
    return !row.actor.act || row.actor.act.phase === 'do';
  });
  close.forEach(function (row) {
    var elder = row.family && kingdomFamily(row.actor.entry.mon.id).stage > kingdomFamily(actor.entry.mon.id).stage;
    if (elder) options.push({ kind: 'follow', other: row.actor, w: 3.4 });
    else if (row.level) options.push({ kind: 'seek', other: row.actor, w: .6 + row.level * .7 });
  });

  var choice = kingdomWeighted(options, rand);
  if (choice.kind === 'sleep' && kingdomStartSleep(actor, now, false)) return;
  if (choice.kind === 'spot' && kingdomActStart(actor, choice.spot, choice.seat, {})) return;
  if (choice.kind === 'ambient' && kingdomActStart(actor, kingdomAdhocSpot(choice.def, actor), 0, {})) return;
  if (choice.kind === 'follow' || choice.kind === 'seek') {
    actor.follow = { other: choice.other, until: now + 9000 + rand() * 12000, family: choice.kind === 'follow' };
    actor.nextTurn = actor.follow.until;
    return;
  }
  if (choice.kind === 'pause') {
    actor.pauseUntil = now + 1200 + rand() * 2600;
    actor.el.classList.remove('walking');
  }
  actor.target = kingdomPoint(rand, actor.location);
  actor.nextTurn = now + 3500 + rand() * 5000;
}

function kingdomSpotCrowd(spot) {
  var n = 0;
  KINGDOM_ACTORS.forEach(function (actor) { if (kingdomActAt(actor, spot)) n++; });
  return n;
}

/* Little ones trail behind their evolved relative; friends drift over to
   say hello. If the one they are with sits down somewhere, they join in. */
function kingdomFollowTick(actor, now) {
  var follow = actor.follow;
  var other = follow.other;
  if (now > follow.until || KINGDOM_ACTORS.indexOf(other) < 0 || other.trip) {
    actor.follow = null;
    actor.nextTurn = now;
    return;
  }
  var face = other.el.style.getPropertyValue('--face') === '-1' ? -1 : 1;
  var behind = follow.family ? 4.5 : 3.6;
  var spot = kingdomNearestWalkable(other.x - face * behind, other.y + 1.2, actor.location) || { x: other.x, y: other.y };
  actor.target = spot;
  actor.nextTurn = follow.until;
  var gap = kingdomDist([actor.x, actor.y], [spot.x, spot.y]);
  if (gap < 1.4 && now >= actor.pauseUntil) {
    actor.pauseUntil = now + 600;
    if (!follow.family) {
      actor.follow = null;
      kingdomSocialMoment(actor, other, now, true);
      return;
    }
    if (other.act && other.act.phase === 'do') kingdomJoin(actor, other, now);
  }
}

function kingdomJoin(actor, other, now) {
  var act = other.act;
  if (act.spot.motion === 'sleep') {
    if (kingdomStartSleep(actor, now, true)) actor.act.until = Math.min(actor.act.until, act.until + 2000);
    actor.follow = null;
    return;
  }
  var base = act.spot.adhoc ? null : act.spot;
  if (!base || kingdomSpotBlocked(base, actor)) return;
  var seat = kingdomFreeSeat(base, actor, actor.rand);
  if (seat >= 0 && kingdomActStart(actor, base, seat, {})) actor.follow = null;
}

/* ---- Meeting each other ---------------------------------------------------- */

function kingdomIdle(actor, now) {
  return !actor.trip && !actor.act && now >= actor.pauseUntil && !actor.el.classList.contains('holding');
}

/* Checks for a pair that has wandered close, or a crowd sharing a spot.
   Returns how long until the next check. */
function kingdomFindFriends(now) {
  if (KINGDOM_ACTORS.length < 2) return 1500;
  if (kingdomGroupMoment(now)) return 4200;
  var start = Math.floor(Math.random() * KINGDOM_ACTORS.length);
  for (var offset = 0; offset < KINGDOM_ACTORS.length; offset++) {
    var a = KINGDOM_ACTORS[(start + offset) % KINGDOM_ACTORS.length];
    if (!kingdomIdle(a, now)) continue;
    var best = null, bestD = 999;
    for (var j = 0; j < KINGDOM_ACTORS.length; j++) {
      var b = KINGDOM_ACTORS[j];
      if (a === b || !kingdomIdle(b, now)) continue;
      if (now < (KINGDOM_PAIR_AT[kingdomBondId(a.entry, b.entry)] || 0)) continue;
      var dx = a.x - b.x, dy = a.y - b.y;
      var d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = b; }
    }
    if (best && bestD < 85) {
      kingdomSocialMoment(a, best, now, false);
      return 4500 + Math.random() * 3500;
    }
  }
  return 1500;
}

function kingdomSocialMoment(a, b, now, sought) {
  KINGDOM_PAIR_AT[kingdomBondId(a.entry, b.entry)] = now + 40000;
  var line = kingdomPickLine(kingdomLineTags(a, b), a.rand);
  kingdomRememberLine(line[2]);
  /* Face each other for the moment. */
  a.el.style.setProperty('--face', b.x < a.x ? '-1' : '1');
  b.el.style.setProperty('--face', a.x < b.x ? '-1' : '1');
  [a, b].forEach(function (actor) {
    actor.pauseUntil = now + 2200;
    actor.el.classList.remove('walking');
    actor.el.classList.add('greeting');
    kingdomEmote(actor, line[0]);
    setTimeout(function () { if (actor.el) actor.el.classList.remove('greeting'); }, 1700);
  });
  var text = kingdomFill(line[2], a, b);
  var rival = a.location.id === 'gym' || (a.traits.has('fighting') && b.traits.has('fighting'));
  if (!kingdomBondMeet(a, b, rival)) kingdomSay(text, sought ? 'news' : 'chatter');
}

function kingdomGroupMoment(now) {
  var crowds = {};
  KINGDOM_ACTORS.forEach(function (actor) {
    var act = actor.act;
    if (!act || act.phase !== 'do' || act.spot.adhoc && act.spot.motion !== 'sleep') return;
    var base = act.spot.base || act.spot;
    var key = act.spot.adhoc ? 'sleep-' + Math.round(actor.x / 12) + '-' + Math.round(actor.y / 12) : base.id;
    (crowds[key] = crowds[key] || []).push(actor);
  });
  var keys = Object.keys(crowds).filter(function (key) {
    return crowds[key].length >= 2 && now >= (KINGDOM_GROUP_AT[key] || 0);
  });
  if (!keys.length) return false;
  var key = keys[Math.floor(Math.random() * keys.length)];
  var group = crowds[key];
  KINGDOM_GROUP_AT[key] = now + 22000 + Math.random() * 12000;
  var spot = group[0].act.spot;
  var motion = spot.station ? 'gym' : spot.motion;
  var lines = KINGDOM_GROUP_LINES[motion] || KINGDOM_GROUP_LINES.any;
  var text = lines[Math.floor(Math.random() * lines.length)].replace('{list}', kingdomNameList(group.slice(0, 4)));
  for (var i = 0; i < group.length; i++) {
    for (var j = i + 1; j < group.length; j++) {
      if (kingdomBondMeet(group[i], group[j], !!spot.station)) return true;
    }
  }
  kingdomSay(text, 'chatter');
  return true;
}

/* ---- Travelling together --------------------------------------------------- */

/* When a resident sets off while you watch, its best friends and the little
   ones of its family may tag along, walking the same road at its pace. */
function kingdomTravelCompanions(leader, now) {
  var st = leader.entry.state;
  if (!st || !st.trip || leader.companionsChecked === st.trip.start) return;
  leader.companionsChecked = st.trip.start;
  var joined = [];
  kingdomCloseOnes(leader).forEach(function (row) {
    var other = row.actor;
    if (joined.length >= 2 || other.trip || KINGDOM_CARRY && KINGDOM_CARRY.key === other.key) return;
    var little = row.family && kingdomFamily(other.entry.mon.id).stage < kingdomFamily(leader.entry.mon.id).stage;
    var chance = little ? .8 : row.level >= 3 ? .65 : row.level >= 2 ? .35 : 0;
    if (!chance || other.rand() >= chance) return;
    if (kingdomTravelFollow(other.entry, st.trip, [other.x, other.y], 900 + joined.length * 700)) {
      kingdomActCancel(other, true);
      other.follow = null;
      joined.push(other);
    }
  });
  if (joined.length) {
    var dest = kingdomLocation(st.trip.to).name;
    kingdomSay(kingdomNameList([leader].concat(joined)) + ' set off together for ' + dest + '.', 'news');
  }
}

/* ---- Time of day and weather --------------------------------------------------- */

/* Rain comes and goes on its own in two-hour spells, the same for everyone,
   until the player flips the rain switch. */
function kingdomForecast(now) {
  var block = Math.floor(now / 7200000);
  var h = Math.imul(block ^ 0x5bd1e995, 2654435761) >>> 0;
  h = Math.imul(h ^ h >>> 15, 2246822507) >>> 0;
  return (h % 1000) / 1000 < .18 ? 'rain' : 'clear';
}

function kingdomLifeAtmosphere(phase, raining) {
  var changedPhase = phase !== KINGDOM_PHASE;
  var wasRaining = !!kingdomLifeAtmosphere.raining;
  KINGDOM_PHASE = phase;
  kingdomLifeAtmosphere.raining = raining;
  var dark = phase === 'night' || phase === 'dusk';
  if (dark) kingdomEnsureTints();
  if (dark !== KINGDOM_DARK) {
    KINGDOM_DARK = dark;
    KINGDOM_ACTORS.forEach(function (actor) { kingdomPaint(actor); });
  }
  var now = performance.now();
  if (raining && !wasRaining && KINGDOM_ACTORS.length) {
    KINGDOM_ACTORS.forEach(function (actor) {
      if (actor.trip || actor.act || actor.rand() > .55) return;
      kingdomAmbientStart(actor, actor.traits.rainLover ? 'raindance' : 'shake', now);
    });
  }
  if (changedPhase && phase === 'night') {
    KINGDOM_ACTORS.forEach(function (actor) {
      if (!actor.act && !actor.trip && !actor.traits.nocturnal && actor.rand() < .4) {
        kingdomAmbientStart(actor, 'yawn', now);
      }
    });
  }
}

/* ---- Spot effects: the firepit, the bell, the fountain, the hives -------- */

function kingdomSpotFxHtml(location) {
  var h = '';
  kingdomSpotsAt(location.id).forEach(function (spot) {
    if (!spot.fx || !spot.fxAt && spot.fx !== 'fountain') return;
    var at = spot.fxAt || [50, 46];
    var mobileX = at[0] * 2.222222 - 61.111111;
    h += '<div class="kingdom-prop prop-' + spot.fx + '" data-spot-fx="' + spot.id + '" style="--x:' + at[0] +
      '%;--mx:' + mobileX.toFixed(2) + '%;--y:' + at[1] + '%;--zy:' + Math.round(at[1]) + ';z-index:' +
      (100 + Math.round(at[1])) + (spot.fxSize ? ';--w:' + spot.fxSize + '%' : '') +
      '" aria-hidden="true">' + kingdomPropInner(spot.fx) + '</div>';
  });
  return h;
}

function kingdomPropInner(fx) {
  if (fx === 'campfire') return '<i class="fire-light"></i><i class="flame"></i><b class="embers"><i></i><i></i><i></i></b>';
  if (fx === 'bell') return '<i></i><i></i><i></i>';
  if (fx === 'bees') return '<i></i><i></i><i></i><i></i>';
  if (fx === 'fountain') return '<i></i><i></i><i></i><i></i><i></i>';
  return '';
}

/* Lights the firepit while someone sits at it, sends the bees buzzing while
   someone visits, makes the fountain leap while someone splashes in it. */
function kingdomSpotFx(locId) {
  kingdomSpotsAt(locId).forEach(function (spot) {
    if (!spot.fx) return;
    var node = document.querySelector('[data-spot-fx="' + spot.id + '"]');
    if (!node) return;
    var busy = spot.lit || KINGDOM_ACTORS.some(function (actor) {
      return kingdomActAt(actor, spot) && actor.act.phase === 'do';
    });
    node.classList.toggle('on', busy);
  });
}

/* A soft three-note chime from the Moonbell, through the Kingdom music bus. */
function kingdomRingBell() {
  if (!S || !S.settings || S.settings.sound === false) return;
  var music = KINGDOM_MUSIC_AUDIO || (KINGDOM_MUSIC_ON ? kingdomCreateMusicAudio() : null);
  if (!music || !music.context) return;
  var context = music.context;
  if (context.state === 'suspended') context.resume().catch(function () { });
  var t = context.currentTime + .05;
  [[84, 0], [88, .32], [91, .64]].forEach(function (note) {
    try { kingdomScheduleMusicTone(context, music.output, note[0], t + note[1], 2.4, 'bell', .07); } catch (error) { }
  });
}

/* ---- Words for the inspector ----------------------------------------------- */

function kingdomActLine(actor) {
  var act = actor.act;
  if (!act) return '';
  var verb = act.verb || 'busy';
  if (act.phase === 'go' || act.phase === 'arrive') {
    return act.spot.adhoc ? '' : 'Heading to the ' + act.spot.name + '.';
  }
  return verb.charAt(0).toUpperCase() + verb.slice(1) + '.';
}

function kingdomAboutHtml(actor) {
  var t = actor.traits;
  var bits = [];
  var haunts = kingdomFavouriteHaunts(actor.entry.mon.id);
  if (haunts.length) bits.push('Loves ' + haunts.map(function (loc) { return loc.name; }).join(' and '));
  if (t.nocturnal) bits.push('Night owl');
  if (t.glow) bits.push('Glows after dark');
  if (t.sleepy) bits.push('Loves a nap');
  var people = [];
  var rival = null;
  var store = kingdomBondsLoad();
  var key = kingdomPlacementKey(actor.entry);
  var roster = kingdomRoster();
  var byKey = {};
  roster.forEach(function (entry) { byKey[kingdomPlacementKey(entry)] = entry; });
  var friends = [];
  Object.keys(store.pairs).forEach(function (pair) {
    var keys = pair.split('|');
    if (keys[0] !== key && keys[1] !== key) return;
    var other = byKey[keys[0] === key ? keys[1] : keys[0]];
    if (!other) return;
    var bond = store.pairs[pair];
    friends.push({ entry: other, level: kingdomBondLevel(bond), rival: (bond.r || 0) >= 3, n: bond.n });
  });
  friends.sort(function (a, b) { return b.n - a.n; });
  friends.forEach(function (row) {
    if (row.level >= 1 && people.length < 3) {
      var name = KINGDOM_BOND_NAMES[row.level];
      people.push(name.charAt(0).toUpperCase() + name.slice(1, -1) + ' with ' + esc(monName(row.entry.mon)));
    }
    if (row.rival && !rival) { rival = row; people.push('Gym rival: ' + esc(monName(row.entry.mon))); }
  });
  var h = '';
  if (bits.length) h += '<span class="kingdom-about">' + esc(bits.join(' · ')) + '</span>';
  if (people.length) h += '<span class="kingdom-bonds">♥ ' + people.join(' · ') + '</span>';
  return h;
}

/* Buttons in the inspector: the spots in this district this resident can use. */
function kingdomSpotButtonsHtml(actor) {
  var spots = kingdomSpotsAt(actor.location.id);
  if (!spots.length) return '';
  var gym = actor.location.id === 'gym';
  var h = '<div class="kingdom-move-row kingdom-workout-row"><span>' + (gym ? 'Work out' : 'Things to do') + '</span>';
  spots.forEach(function (spot) {
    if (gym && !spot.station) return;
    var blocked = kingdomSpotBlocked(spot, actor);
    var current = kingdomActAt(actor, spot);
    var full = !current && kingdomFreeSeat(spot, actor) < 0;
    var occupant = full && kingdomSeatOccupant(spot, 0, actor);
    var title = blocked || (full ? (spot.seats.length === 1 && occupant ? monName(occupant.entry.mon) +
      ' is using this' : 'No room right now') : spot.name);
    h += '<button type="button" onclick="kingdomUseSpot(\'' + spot.id + '\')"' +
      (blocked || full ? ' disabled' : '') + ' title="' + esc(title) + '"' +
      (current ? ' class="active" aria-pressed="true"' : '') + '>' + spot.icon + ' ' + esc(spot.short) + '</button>';
  });
  return h + '</div>';
}

/* The player sends the inspected resident to a spot. */
function kingdomUseSpot(id) {
  var spot = kingdomSpot(id);
  var actor = KINGDOM_INSPECTED;
  if (!spot || KINGDOM_LOCATION !== spot.loc) return;
  if (!actor || KINGDOM_ACTORS.indexOf(actor) < 0 || actor.location.id !== spot.loc) {
    var pick = spot.station ? 'Choose a Pokémon in Mossroot Gym first.' : 'Choose a Pokémon here first.';
    kingdomSay(spot.station ? 'Choose a Pokémon in the gym first, then pick a workout station.' : pick);
    toast(pick);
    return;
  }
  if (actor.trip || KINGDOM_CARRY) return;
  if (kingdomActAt(actor, spot)) {
    toast(monName(actor.entry.mon) + ' is already at the ' + spot.name + '.');
    return;
  }
  var blocked = kingdomSpotBlocked(spot, actor);
  if (blocked) { toast(blocked + '.'); return; }
  var seat = kingdomFreeSeat(spot, actor);
  if (seat < 0) {
    var occupant = kingdomSeatOccupant(spot, 0, actor);
    var busy = occupant && spot.seats.length === 1 ? monName(occupant.entry.mon) + ' is using the ' + spot.name + ' right now.' :
      'There is no room at the ' + spot.name + ' right now.';
    kingdomSay(busy);
    toast(busy);
    return;
  }
  if (kingdomActStart(actor, spot, seat, { manual: true })) {
    toast(monName(actor.entry.mon) + ' is heading to the ' + spot.name + '.');
  }
}
