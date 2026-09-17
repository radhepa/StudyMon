/* Pokemon Kingdom: one connected town whose residents come and go on their own,
   walking the paths between districts (see kingdom-travel.js). This layer never
   mutates the save; Party + PC remain the source of truth. */

var KINGDOM_LOCATIONS = [
  {
    id: 'green', icon: '🌿', name: 'Kingdom Green', short: 'Green',
    image: 'assets/ui/kingdom-meadow.png',
    description: 'The wild meadow at the town gate, where forest paths meet the water.',
    neighbors: ['square', 'riverside'],
    /* Town-map position, and each path out: the first point is open ground,
       the last is past the picture's edge. */
    map: { x: 45, y: 58 },
    gates: {
      square: [[66, 36], [70, 27], [73, 18], [76, 9], [78, -4]],
      riverside: [[22, 57], [19, 49], [19, 42], [14, 37], [6, 36], [-6, 35]]
    },
    walk: { x: 50, y: 63, rx: 35, ry: 21 },
    lanterns: [],
    nav: {
      home: [50, 60],
      areas: [
        [[12, 34], [27, 25], [38, 27], [50, 34], [65, 27], [82, 27], [89, 43],
          [87, 66], [77, 81], [61, 85], [37, 84], [18, 79], [10, 61]]
      ],
      blocks: [
        { type: 'rect', name: 'waterfall pond', x1: 38, y1: 0, x2: 61, y2: 34 },
        { type: 'rect', name: 'stream', x1: 0, y1: 61, x2: 25, y2: 100 },
        { type: 'rect', name: 'rest shelter', x1: 78, y1: 9, x2: 93, y2: 31 },
        { type: 'ellipse', name: 'west rocks', x: 17, y: 43, rx: 10, ry: 9 },
        { type: 'ellipse', name: 'east rocks', x: 81, y: 44, rx: 10, ry: 8 },
        { type: 'ellipse', name: 'southwest rock', x: 25, y: 69, rx: 5, ry: 6 },
        { type: 'ellipse', name: 'south rock', x: 61, y: 71, rx: 5, ry: 5 },
        { type: 'ellipse', name: 'southeast rock', x: 77, y: 63, rx: 6, ry: 5 }
      ]
    }
  },
  {
    id: 'square', icon: '🏮', name: 'Lantern Square', short: 'Square',
    image: 'assets/ui/kingdom-lantern-square.png',
    description: 'The warm town center, gathered around an old lantern tree and fountain.',
    neighbors: ['green', 'market', 'hearth'],
    map: { x: 45, y: 20 },
    gates: {
      green: [[50, 80], [50, 90], [49, 97], [49, 108]],
      market: [[14, 38], [8, 36], [2, 35], [-6, 35]],
      hearth: [[86, 40], [94, 40], [100, 40], [106, 40]]
    },
    walk: { x: 50, y: 70, rx: 33, ry: 15 },
    lanterns: [
      { x: 21.9, y: 19.1 }, { x: 40.5, y: 13.8 }, { x: 43.5, y: 18.9 },
      { x: 55.3, y: 18.8 }, { x: 69.4, y: 7.8 }, { x: 34.7, y: 28.3 },
      { x: 67.3, y: 28.7 }, { x: 10.0, y: 68.0 }, { x: 89.2, y: 74.0 }
    ],
    nav: {
      home: [50, 75],
      areas: [
        [[7, 31], [25, 24], [39, 33], [61, 33], [76, 23], [94, 34], [93, 76],
          [82, 87], [19, 87], [6, 77]]
      ],
      blocks: [
        { type: 'rect', name: 'west shops', x1: 0, y1: 0, x2: 34, y2: 30 },
        { type: 'rect', name: 'east shops', x1: 69, y1: 0, x2: 100, y2: 30 },
        { type: 'rect', name: 'lantern tree and noticeboard', x1: 40, y1: 0, x2: 61, y2: 37 },
        { type: 'ellipse', name: 'fountain', x: 50, y: 50, rx: 10, ry: 13 },
        { type: 'rect', name: 'west benches', x1: 27, y1: 26, x2: 40, y2: 43 },
        { type: 'rect', name: 'east benches', x1: 61, y1: 26, x2: 74, y2: 43 },
        { type: 'rect', name: 'southwest shop', x1: 0, y1: 51, x2: 23, y2: 80 },
        { type: 'rect', name: 'southeast shop', x1: 78, y1: 51, x2: 100, y2: 83 },
        { type: 'ellipse', name: 'fountain planters', x: 50, y: 55, rx: 20, ry: 12 }
      ]
    }
  },
  {
    id: 'market', icon: '🫐', name: 'Berry Market', short: 'Market',
    image: 'assets/ui/kingdom-berry-market.png',
    description: 'A cheerful ring of berry stalls, shaded tables, and little resting nooks.',
    neighbors: ['square', 'riverside'],
    map: { x: 14, y: 22 },
    gates: {
      square: [[57, 40], [60, 33], [64, 29.5], [72, 29], [79, 28], [81, 20], [81, 9], [82, -4]],
      riverside: [[62, 76], [68, 84], [71, 92], [72, 108]]
    },
    walk: { x: 50, y: 61, rx: 32, ry: 19 },
    lanterns: [
      { x: 41.3, y: 10.2 }, { x: 59.0, y: 10.2 },
      { x: 20.8, y: 25.7 }, { x: 87.5, y: 26.1 }
    ],
    nav: {
      home: [50, 68],
      areas: [
        [[9, 42], [21, 29], [39, 30], [61, 29], [80, 28], [92, 44], [91, 75],
          [77, 85], [22, 85], [8, 76]]
      ],
      blocks: [
        { type: 'rect', name: 'upper west stalls', x1: 12, y1: 0, x2: 38, y2: 30 },
        { type: 'rect', name: 'upper middle stalls', x1: 40, y1: 0, x2: 62, y2: 28 },
        { type: 'rect', name: 'upper east stalls', x1: 64, y1: 0, x2: 83, y2: 30 },
        { type: 'ellipse', name: 'rock garden', x: 50, y: 31, rx: 11, ry: 10 },
        { type: 'rect', name: 'west berry stall', x1: 12, y1: 29, x2: 34, y2: 52 },
        { type: 'rect', name: 'east cafe', x1: 64, y1: 29, x2: 91, y2: 61 },
        { type: 'rect', name: 'southwest shelter', x1: 0, y1: 57, x2: 24, y2: 84 },
        { type: 'rect', name: 'southeast bridge', x1: 82, y1: 65, x2: 100, y2: 88 }
      ]
    }
  },
  {
    id: 'riverside', icon: '🌊', name: 'Riverside Walk', short: 'River',
    image: 'assets/ui/kingdom-riverside-walk.png',
    description: 'The river promenade, footbridge, and moss-roof water-wheel workshop.',
    neighbors: ['green', 'market', 'hill'],
    map: { x: 22, y: 80 },
    gates: {
      market: [[36, 42], [28, 40], [20, 35], [12, 31], [5, 28], [-6, 26]],
      green: [[89, 52], [93, 44], [93, 34], [91, 24], [89, 14], [87, 6], [86, -4]],
      hill: [[80, 76], [88, 72], [95, 68], [106, 66]]
    },
    walk: { x: 56, y: 66, rx: 32, ry: 18 },
    lanterns: [],
    nav: {
      home: [51, 69],
      areas: [
        [[9, 39], [27, 31], [42, 36], [62, 35], [81, 34], [93, 48], [92, 76],
          [79, 87], [20, 87], [7, 78]]
      ],
      blocks: [
        { type: 'rect', name: 'riverbank', x1: 0, y1: 0, x2: 100, y2: 35 },
        { type: 'rect', name: 'west footbridge', x1: 0, y1: 25, x2: 27, y2: 45 },
        { type: 'rect', name: 'water wheel workshop', x1: 58, y1: 0, x2: 86, y2: 30 },
        { type: 'rect', name: 'east dock', x1: 73, y1: 28, x2: 97, y2: 49 },
        { type: 'ellipse', name: 'west rocks', x: 29, y: 46, rx: 8, ry: 7 },
        { type: 'ellipse', name: 'north rocks', x: 70, y: 48, rx: 7, ry: 7 },
        { type: 'ellipse', name: 'east rocks', x: 84, y: 62, rx: 7, ry: 8 },
        { type: 'ellipse', name: 'southwest rocks', x: 15, y: 72, rx: 7, ry: 8 }
      ]
    }
  },
  {
    id: 'hearth', icon: '🏡', name: 'Hearthside Lane', short: 'Hearthside',
    image: 'assets/ui/kingdom-hearthside-lane.png',
    description: 'The cottage lane, with garden fences, warm chimneys, and a shared firepit.',
    neighbors: ['square', 'hill'],
    map: { x: 84, y: 22 },
    gates: {
      square: [[30, 44], [22, 48], [14, 54], [7, 59], [-6, 61]],
      hill: [[66, 62], [69, 72], [74, 82], [81, 88], [86, 95], [87, 108]]
    },
    walk: { x: 52, y: 62, rx: 34, ry: 19 },
    lanterns: [
      { x: 28.0, y: 22.8 }, { x: 90.8, y: 29.4 }, { x: 88.8, y: 77.0 }
    ],
    nav: {
      home: [48, 67],
      areas: [
        [[9, 39], [23, 27], [42, 29], [52, 36], [72, 28], [91, 40], [93, 65],
          [80, 84], [58, 86], [28, 85], [9, 75]]
      ],
      blocks: [
        { type: 'rect', name: 'west cottage', x1: 7, y1: 2, x2: 35, y2: 33 },
        { type: 'rect', name: 'north cottage', x1: 57, y1: 0, x2: 85, y2: 29 },
        { type: 'ellipse', name: 'shared firepit', x: 62, y: 35, rx: 10, ry: 9 },
        { type: 'rect', name: 'south cottage', x1: 72, y1: 49, x2: 100, y2: 85 },
        { type: 'rect', name: 'river and rocky bank', x1: 0, y1: 35, x2: 26, y2: 100 },
        { type: 'rect', name: 'lane bridge', x1: 0, y1: 38, x2: 23, y2: 69 },
        { type: 'rect', name: 'east signpost', x1: 84, y1: 21, x2: 97, y2: 39 },
        { type: 'ellipse', name: 'south boulders', x: 64, y: 85, rx: 9, ry: 8 }
      ]
    }
  },
  {
    id: 'hill', icon: '🔔', name: 'Moonbell Hill', short: 'Hill',
    image: 'assets/ui/kingdom-moonbell-hill.png',
    description: 'A quiet garden terrace above town, watched over by the little bell pavilion.',
    neighbors: ['hearth', 'riverside'],
    map: { x: 72, y: 80 },
    gates: {
      riverside: [[24, 55], [16, 48], [13, 40], [9, 33], [4, 28], [-6, 26]],
      hearth: [[76, 52], [84, 51], [92, 54], [97, 56], [106, 57]]
    },
    walk: { x: 52, y: 62, rx: 34, ry: 19 },
    lanterns: [
      { x: 23.6, y: 8.4 }, { x: 50.2, y: 9.7 },
      { x: 87.9, y: 43.4 }, { x: 26.7, y: 72.6 }
    ],
    nav: {
      home: [51, 63],
      areas: [
        [[8, 39], [27, 29], [43, 36], [61, 31], [83, 35], [94, 52], [88, 76],
          [72, 85], [40, 86], [14, 79], [6, 57]]
      ],
      blocks: [
        { type: 'rect', name: 'upper pond', x1: 20, y1: 0, x2: 45, y2: 35 },
        { type: 'rect', name: 'bell pavilion', x1: 54, y1: 0, x2: 75, y2: 26 },
        { type: 'rect', name: 'raised garden terrace', x1: 20, y1: 0, x2: 92, y2: 43 },
        { type: 'rect', name: 'west terrace stairs', x1: 38, y1: 25, x2: 55, y2: 44 },
        { type: 'rect', name: 'east terrace stairs', x1: 69, y1: 24, x2: 87, y2: 46 },
        { type: 'rect', name: 'west lantern rocks', x1: 17, y1: 62, x2: 33, y2: 81 },
        { type: 'rect', name: 'east lantern rocks', x1: 82, y1: 34, x2: 97, y2: 54 },
        { type: 'ellipse', name: 'southwest rocks', x: 20, y: 86, rx: 10, ry: 10 },
        { type: 'ellipse', name: 'south rocks', x: 58, y: 86, rx: 8, ry: 8 },
        { type: 'ellipse', name: 'southeast rocks', x: 83, y: 81, rx: 9, ry: 9 }
      ]
    }
  }
];

function kingdomMusicPattern(text) {
  return text.trim().split(/\s+/).filter(function (token) { return token !== '|'; }).map(function (token) {
    return token === '.' ? null : Number(token);
  });
}

/* Original, compact town themes. Scale degrees rather than copied melodies keep
   the score cohesive while each district gets its own meter, color, and pace. */
var KINGDOM_MUSIC_TRACKS = {
  green: {
    name: 'Meadow Lullaby', bpm: 76, root: 74, stepsPerBar: 8,
    scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 5, 4, 0, 3, 4, 0], voice: 'flute',
    melody: kingdomMusicPattern(
      '0 . 2 . 4 . 2 . | 1 . 3 . 5 . 3 . | 2 . 4 5 4 . 2 . | 1 . 4 . 3 . 1 . | ' +
      '0 . 2 . 4 5 4 . | 6 . 4 . 3 . 1 . | 2 . 1 . 4 . 2 . | 0 . . 2 . . 0 .')
  },
  square: {
    name: 'Lantern Waltz', bpm: 82, root: 72, stepsPerBar: 6,
    scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'chime',
    melody: kingdomMusicPattern(
      '0 . 2 4 . 2 | 1 . 3 5 . 3 | 2 . 4 6 . 4 | 4 . 3 1 . . | ' +
      '0 2 4 7 . 4 | 3 . 5 4 . 2 | 1 3 4 6 . 3 | 2 . 1 . 0 .')
  },
  market: {
    name: 'Berry Stroll', bpm: 94, root: 77, stepsPerBar: 8,
    scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 4, 5, 3, 1, 4, 0, 4], voice: 'pluck',
    melody: kingdomMusicPattern(
      '0 2 . 4 2 . 5 . | 4 . 2 1 . 2 4 . | 5 4 . 2 0 . 2 . | 3 . 5 4 . 2 1 . | ' +
      '0 2 4 . 5 4 . 2 | 1 . 3 5 . 4 2 . | 4 5 . 7 5 . 4 . | 2 . 1 . 0 . . .')
  },
  riverside: {
    name: 'Riverglass', bpm: 72, root: 69, stepsPerBar: 8,
    scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 5, 3, 4, 0, 1, 3, 0], voice: 'glass',
    melody: kingdomMusicPattern(
      '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 2 . 4 . 6 . 4 . | 3 . . 1 . . 0 . | ' +
      '0 . 2 . 4 . 7 . | 6 . . 4 . 2 . . | 3 . 5 . 4 . 1 . | 2 . . 1 . 0 . .')
  },
  hearth: {
    name: 'Homeward Lights', bpm: 78, root: 76, stepsPerBar: 6,
    scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 0, 4, 5, 3, 4, 0], voice: 'reed',
    melody: kingdomMusicPattern(
      '0 . 2 3 . 2 | 0 . 4 3 . 1 | 0 2 3 5 . 3 | 4 . 2 . 1 . | ' +
      '2 . 4 5 . 4 | 3 . 5 4 . 2 | 1 3 4 . 2 1 | 0 . . 2 . 0')
  },
  hill: {
    name: 'Moonbell Reverie', bpm: 68, root: 72, stepsPerBar: 8,
    scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 5, 3, 1, 0, 4, 3, 0], voice: 'bell',
    melody: kingdomMusicPattern(
      '0 . . 3 . 4 . . | 6 . 4 . 2 . . . | 1 . 3 . 5 . 3 . | 2 . . 1 . 0 . . | ' +
      '0 . 2 . 4 . 7 . | 6 . . 5 . 3 . . | 4 . 2 . 3 . 1 . | 0 . . . 2 . 0 .')
  }
};

var KINGDOM_LOCATION = 'green';
var KINGDOM_VISIBLE_LIMIT = 42;
var KINGDOM_ACTORS = [];
var KINGDOM_CENSUS = null;
var KINGDOM_SYNC_TIMER = 0;
var KINGDOM_RAF = 0;
var KINGDOM_CLOCK_TIMER = 0;
var KINGDOM_LAST = 0;
var KINGDOM_SOCIAL_AT = 0;
var KINGDOM_TIME_ZONE = 'America/Indiana/Indianapolis';
var KINGDOM_WEATHER = 'clear';
var KINGDOM_RAIN_SOUND = true;
var KINGDOM_RAIN_AUDIO = null;
var KINGDOM_RAIN_AUDIO_TOKEN = 0;
var KINGDOM_MUSIC_ON = true;
var KINGDOM_MUSIC_AUDIO = null;
var KINGDOM_MUSIC_TOKEN = 0;
var KINGDOM_HOLD_MS = 1000;
var KINGDOM_HOVER_MS = 350;
var KINGDOM_GRAB = null;
var KINGDOM_CARRY = null;
var KINGDOM_INSPECTED = null;
var KINGDOM_SWALLOW_CLICK_UNTIL = 0;

function kingdomRoster() {
  if (!S) return [];
  return S.party.map(function (m, i) {
    return { mon: m, where: 'party', index: i, key: 'party-' + i };
  }).concat(S.box.map(function (m, i) {
    return { mon: m, where: 'box', index: i, key: 'box-' + i };
  }));
}

function kingdomLocation(id) {
  for (var i = 0; i < KINGDOM_LOCATIONS.length; i++) {
    if (KINGDOM_LOCATIONS[i].id === id) return KINGDOM_LOCATIONS[i];
  }
  return KINGDOM_LOCATIONS[0];
}

function kingdomHash(entry) {
  /* Stable for this roster ordering; spreads newcomers across the districts. */
  var n = entry.mon.id * 2654435761 + entry.index * 7919 +
    (entry.where === 'party' ? 101 : 100003) + entry.mon.lvl * 97;
  n = Math.imul(n ^ n >>> 16, 2246822507);
  n = Math.imul(n ^ n >>> 13, 3266489909);
  return (n ^ n >>> 16) >>> 0;
}

/* Party/PC slots have no unique id, so the species guards against a slot that
   was reshuffled since the itinerary was made. */
function kingdomPlacementKey(entry) {
  return entry.where + '-' + entry.index + '-' + entry.mon.id;
}

function kingdomSeed(entry, position, salt) {
  var n = kingdomHash(entry) + position * 7919 + salt * 31;
  return function () {
    n |= 0;
    n = n + 0x6D2B79F5 | 0;
    var t = Math.imul(n ^ n >>> 15, 1 | n);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function kingdomPointInPolygon(x, y, polygon) {
  var inside = false;
  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    var xi = polygon[i][0], yi = polygon[i][1];
    var xj = polygon[j][0], yj = polygon[j][1];
    var crosses = (yi > y) !== (yj > y) &&
      x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function kingdomInsideBlock(x, y, block) {
  if (block.type === 'rect') {
    return x >= block.x1 && x <= block.x2 && y >= block.y1 && y <= block.y2;
  }
  if (block.type === 'ellipse') {
    var dx = (x - block.x) / block.rx;
    var dy = (y - block.y) / block.ry;
    return dx * dx + dy * dy <= 1;
  }
  return false;
}

function kingdomIsWalkable(x, y, location) {
  if (!location || !location.nav) return false;
  var inArea = location.nav.areas.some(function (polygon) {
    return kingdomPointInPolygon(x, y, polygon);
  });
  if (!inArea) return false;
  return !location.nav.blocks.some(function (block) {
    return kingdomInsideBlock(x, y, block);
  });
}

function kingdomPoint(rand, location) {
  var areas = location.nav.areas;
  for (var attempt = 0; attempt < 120; attempt++) {
    var polygon = areas[Math.floor(rand() * areas.length)];
    var minX = 100, maxX = 0, minY = 100, maxY = 0;
    polygon.forEach(function (point) {
      minX = Math.min(minX, point[0]); maxX = Math.max(maxX, point[0]);
      minY = Math.min(minY, point[1]); maxY = Math.max(maxY, point[1]);
    });
    var x = minX + rand() * (maxX - minX);
    var y = minY + rand() * (maxY - minY);
    if (kingdomIsWalkable(x, y, location)) return { x: x, y: y };
  }
  return { x: location.nav.home[0], y: location.nav.home[1] };
}

function kingdomNearestWalkable(x, y, location) {
  if (kingdomIsWalkable(x, y, location)) return { x: x, y: y };
  for (var r = .75; r <= 12; r += .75) {
    for (var a = 0; a < 20; a++) {
      var angle = a / 20 * Math.PI * 2;
      var px = x + Math.cos(angle) * r, py = y + Math.sin(angle) * r;
      if (kingdomIsWalkable(px, py, location)) return { x: px, y: py };
    }
  }
  return null;
}

function kingdomTryStep(actor, nextX, nextY) {
  if (kingdomIsWalkable(nextX, nextY, actor.location)) {
    actor.x = nextX;
    actor.y = nextY;
    return true;
  }
  /* Axis fallbacks make residents glide along a border instead of vibrating or
     cutting a diagonal corner through the scenery. Pokemon are intentionally
     absent from this collision test, so friends may bunch up and overlap. */
  if (kingdomIsWalkable(nextX, actor.y, actor.location)) {
    actor.x = nextX;
    return true;
  }
  if (kingdomIsWalkable(actor.x, nextY, actor.location)) {
    actor.y = nextY;
    return true;
  }
  return false;
}

function kingdomClockText(now) {
  var census = KINGDOM_CENSUS;
  if (!census || census.nextDeparture === Infinity) return 'The town is settling in';
  var left = census.nextDeparture - now;
  if (left < 60000) return 'Someone is about to set off';
  return 'Next Pokémon sets off in ' + kingdomDurationText(left);
}

function kingdomEasternTime(now) {
  var date = new Date(now === undefined ? Date.now() : now);
  var parts = new Intl.DateTimeFormat('en-US', {
    timeZone: KINGDOM_TIME_ZONE,
    hour: 'numeric', minute: '2-digit', hour12: false, hourCycle: 'h23'
  }).formatToParts(date);
  var values = {};
  parts.forEach(function (part) { values[part.type] = part.value; });
  var hour = Number(values.hour) % 24;
  var minute = Number(values.minute);
  var decimal = hour + minute / 60;
  var phase = decimal < 5 || decimal >= 20 ? 'night' :
    decimal < 7 ? 'dawn' : decimal < 18 ? 'day' : 'dusk';
  var label = new Intl.DateTimeFormat('en-US', {
    timeZone: KINGDOM_TIME_ZONE,
    hour: 'numeric', minute: '2-digit', hour12: true
  }).format(date);
  return { hour: hour, minute: minute, phase: phase, label: label };
}

function kingdomPhaseLabel(phase) {
  return phase.charAt(0).toUpperCase() + phase.slice(1);
}

function kingdomAtmosphereHtml(now) {
  var time = kingdomEasternTime(now);
  var raining = KINGDOM_WEATHER === 'rain';
  var track = KINGDOM_MUSIC_TRACKS[KINGDOM_LOCATION];
  return '<div class="kingdom-atmosphere-controls">' +
    '<span id="kingdom-local-time" class="kingdom-local-time" title="America/Indiana/Indianapolis">' +
    (time.phase === 'night' ? '🌙 ' : time.phase === 'dawn' ? '🌅 ' : time.phase === 'dusk' ? '🌇 ' : '☀️ ') +
    esc(time.label) + ' ET · ' + kingdomPhaseLabel(time.phase) + '</span>' +
    '<button id="kingdom-weather-toggle" class="kingdom-weather-toggle" type="button" ' +
    'aria-pressed="' + raining + '" onclick="kingdomToggleWeather()">' +
    (raining ? '🌧️ Rain: on' : '☁️ Rain: off') + '</button>' +
    '<button id="kingdom-sound-toggle" class="kingdom-sound-toggle" type="button" ' +
    'aria-pressed="' + KINGDOM_RAIN_SOUND + '" onclick="kingdomToggleRainSound()">' +
    (KINGDOM_RAIN_SOUND ? '🔊 Rain SFX' : '🔇 Rain muted') + '</button>' +
    '<button id="kingdom-music-toggle" class="kingdom-music-toggle" type="button" ' +
    'aria-pressed="' + KINGDOM_MUSIC_ON + '" onclick="kingdomToggleMusic()" title="' +
    esc(track ? track.name : 'Kingdom music') + '">' +
    (KINGDOM_MUSIC_ON && track ? '🎵 ' + esc(track.name) : '🎵 Music: off') + '</button></div>';
}

function kingdomLanternHtml(location) {
  var lights = location.lanterns || [];
  var h = '<div id="kingdom-lanterns" class="kingdom-lanterns" aria-hidden="true">';
  lights.forEach(function (light, i) {
    var size = light.size || 11;
    var mobileX = light.x * 2.222222 - 61.111111;
    h += '<i style="--x:' + light.x + '%;--mx:' + mobileX.toFixed(2) + '%;--y:' + light.y +
      '%;--size:' + size + '%;--msize:' + (size * 2.222222).toFixed(2) +
      '%;--delay:-' + ((i * 1.17) % 4.3).toFixed(2) + 's"></i>';
  });
  return h + '</div>';
}

function kingdomWeatherHtml(location) {
  var seed = 2166136261;
  for (var c = 0; c < location.id.length; c++) {
    seed = Math.imul(seed ^ location.id.charCodeAt(c), 16777619) >>> 0;
  }
  function rand() {
    seed = Math.imul(seed ^ seed >>> 15, 2246822519) >>> 0;
    seed = Math.imul(seed ^ seed >>> 13, 3266489917) >>> 0;
    return ((seed ^ seed >>> 16) >>> 0) / 4294967296;
  }
  var h = '<div id="kingdom-weather" class="kingdom-weather" aria-hidden="true">' +
    '<i class="kingdom-rain-mist"></i><div class="kingdom-rain-splashes">';
  for (var i = 0; i < 18; i++) {
    var point = kingdomPoint(rand, location);
    var mobileX = point.x * 2.222222 - 61.111111;
    h += '<i style="--sx:' + point.x.toFixed(2) + '%;--smx:' + mobileX.toFixed(2) +
      '%;--sy:' + point.y.toFixed(2) +
      '%;--sdelay:-' + (rand() * 3.2).toFixed(2) + 's;--sdur:' +
      (2.1 + rand() * 1.5).toFixed(2) + 's;--sscale:' + (.7 + rand() * .7).toFixed(2) + '"></i>';
  }
  return h + '</div></div>';
}

function renderKingdom() {
  var root = $('#s-kingdom');
  if (!root || !S) return;
  kingdomStop();

  var now = Date.now();
  var location = kingdomLocation(KINGDOM_LOCATION);
  KINGDOM_LOCATION = location.id;
  var census = KINGDOM_CENSUS = kingdomTownCensus(now);
  var roster = kingdomRoster();
  var here = census.groups[location.id].length;

  var h =
    '<div class="panel kingdom-head"><div><div class="kingdom-eyebrow">A living forest town</div>' +
      '<h2>Pokémon Kingdom</h2><p>Your Pokémon live their own lives here. Each one settles in for a while - ' +
      'a few minutes or a few days - then follows the paths somewhere new.</p></div>' +
      '<div class="kingdom-counts"><span>★ ' + roster.length + ' residents</span>' +
      '<span>Party ' + S.party.length + '</span><span>PC ' + S.box.length + '</span></div></div>' +
    kingdomTownMapHtml(census) +
    '<section class="kingdom-location-head"><div><span class="kingdom-location-icon">' + location.icon + '</span>' +
      '<div><h3>' + esc(location.name) + '</h3><p>' + esc(location.description) + '</p></div></div>' +
      '<div class="kingdom-location-status"><span id="kingdom-clock" class="kingdom-clock">' +
      kingdomClockText(now) + '</span>' + kingdomAtmosphereHtml(now) + '</div></section>' +
    '<div class="kingdom-frame"><div id="kingdom-stage" class="kingdom-stage loc-' + location.id +
      '" tabindex="-1" role="region" aria-label="' + esc(location.name) + ', with ' + here +
      ' Pokémon residents">' +
      '<div class="kingdom-bar"><span id="kingdom-glade" class="kingdom-glade">' + location.icon + ' ' +
      here + ' here</span><span id="kingdom-story" class="kingdom-story" aria-live="polite">' +
      'This corner of town is peaceful.</span></div>' +
      '<div id="kingdom-daylight" class="kingdom-daylight" aria-hidden="true"></div>' +
      kingdomLanternHtml(location) +
      kingdomWeatherHtml(location) +
      '<div class="kingdom-empty" hidden>Nobody is here right now. Wait a while, or follow a path to visit your Pokémon.</div>' +
      '<div class="kingdom-overflow" hidden></div></div></div>' +
    '<div class="kingdom-paths"><b>Paths from here</b>';
  location.neighbors.forEach(function (id) {
    var neighbor = kingdomLocation(id);
    h += '<button data-kingdom-loc="' + id + '" onclick="kingdomGo(\'' + id + '\')">' + neighbor.icon + ' Walk to ' + esc(neighbor.short) + '</button>';
  });
  h += '</div><div id="kingdom-inspector" class="panel kingdom-inspector kingdom-welcome">' +
    '<span aria-hidden="true" class="kingdom-welcome-mark">❧</span><div><h3>Life around town</h3>' +
    '<p>Your party wears a gold star. Watch the paths - Pokémon wander in and out on their own. ' +
    'Tap one to say hello, or hold the hand on it for a moment to pick it up and carry it somewhere.</p></div></div>';
  root.innerHTML = h;
  $('#kingdom-stage').style.backgroundImage = 'url("' + location.image + '")';
  kingdomBindHand($('#kingdom-stage'));
  kingdomApplyAtmosphere(now);
  if (KINGDOM_WEATHER === 'rain' && KINGDOM_RAIN_SOUND) kingdomStartRainAudio();
  if (KINGDOM_MUSIC_ON) kingdomStartMusic(location.id);

  kingdomSync(true);
  KINGDOM_SOCIAL_AT = performance.now() + 1500;
  kingdomEnsureTick();
  KINGDOM_SYNC_TIMER = setInterval(kingdomSync, 1000);
  KINGDOM_CLOCK_TIMER = setInterval(kingdomUpdateClock, 10000);
}

function kingdomReduceMotion() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function kingdomEnsureTick() {
  if (KINGDOM_RAF) return;
  KINGDOM_LAST = performance.now();
  KINGDOM_RAF = requestAnimationFrame(kingdomTick);
}

/* Once a second: replay everyone's itinerary and make this district's picture
   match it - leavers head for their path, newcomers walk in from the edge. */
function kingdomSync(initial) {
  if (CUR !== 'kingdom' || !document.getElementById('kingdom-stage')) { kingdomStop(true); return; }
  initial = initial === true;
  var now = Date.now();
  var census = KINGDOM_CENSUS = kingdomTownCensus(now);
  var location = kingdomLocation(KINGDOM_LOCATION);
  var byKey = {};
  KINGDOM_ACTORS.forEach(function (actor) { byKey[actor.key] = actor; });
  var rows = census.groups[location.id];
  /* Travellers and Pokemon the player set down are never hidden by the limit. */
  var special = function (entry) { return !!entry.spot || entry.whereNow.kind !== 'stay'; };
  rows = rows.filter(special).concat(rows.filter(function (entry) { return !special(entry); }));
  var wanted = {};
  var hidden = 0;
  rows.forEach(function (entry) {
    var key = kingdomPlacementKey(entry);
    var where = entry.whereNow;
    wanted[key] = true;
    var actor = byKey[key];
    if (actor) {
      actor.entry = entry;
      if (where.kind === 'leave' && !actor.trip) {
        kingdomStartTrip(actor, where, false);
        kingdomAnnounceTrip(actor, where);
      }
      return;
    }
    if (KINGDOM_ACTORS.length >= KINGDOM_VISIBLE_LIMIT) { hidden++; return; }
    actor = kingdomAddActor(entry, KINGDOM_ACTORS.length, location, now);
    if (where.kind !== 'stay') {
      kingdomStartTrip(actor, where, true);
      if (!initial && where.kind !== 'leave') kingdomAnnounceTrip(actor, where);
    }
  });
  KINGDOM_ACTORS.slice().forEach(function (actor) {
    if (!wanted[actor.key] && !actor.trip) kingdomFadeOut(actor);
  });

  $$('.kingdom-map-node').forEach(function (node) {
    var small = node.querySelector('small');
    var group = census.groups[node.getAttribute('data-kingdom-loc')];
    if (small && group) small.textContent = group.length;
  });
  var glade = $('#kingdom-glade');
  if (glade) glade.textContent = location.icon + ' ' + census.groups[location.id].length + ' here';
  var empty = $('.kingdom-empty');
  if (empty) empty.hidden = KINGDOM_ACTORS.length > 0 || !!KINGDOM_CARRY;
  var overflow = $('.kingdom-overflow');
  if (overflow) {
    overflow.hidden = !hidden;
    overflow.textContent = '+' + hidden + ' more exploring nearby';
  }
  var clock = $('#kingdom-clock');
  if (clock) clock.textContent = kingdomClockText(now);
  kingdomDrawMapWalkers(census, now);
  kingdomRefreshInspector();
}

/* Sets an actor walking one leg. Actors that were already on screen when they
   decided to leave start from where they stand, on their own clock. */
function kingdomStartTrip(actor, where, spawned) {
  var leg = where.leg;
  var speed = kingdomTemperament(actor.key).speed;
  var trip = { kind: leg.kind, from: leg.from, to: leg.to, leg: leg };
  if (leg.kind === 'leave' && !spawned) {
    trip.points = kingdomSceneRoute(leg.loc, null, leg.to, [actor.x, actor.y]);
    trip.t0 = Date.now();
    trip.t1 = trip.t0 + Math.round(kingdomLineLength(trip.points) / speed * 1000);
  } else {
    trip.points = kingdomSceneRoute(leg.loc, leg.from, leg.to);
    trip.t0 = leg.start;
    trip.t1 = leg.end;
  }
  actor.trip = trip;
  actor.pauseUntil = 0;
  actor.el.classList.add('walking', 'traveling');
  kingdomTripStep(actor, Date.now());
}

function kingdomAnnounceTrip(actor, where) {
  var name = monName(actor.entry.mon);
  var trip = actor.entry.state && actor.entry.state.trip;
  var dest = trip ? kingdomLocation(trip.to).name : '';
  if (where.kind === 'leave') {
    var via = trip && trip.path.length > 2 ? ', by way of ' + kingdomLocation(trip.path[1]).name : '';
    kingdomSay(name + ' is heading off to ' + dest + via + '.', 'news');
  } else if (where.kind === 'cross') {
    kingdomSay(name + ' is passing through on the way to ' + dest + '.', 'news');
  } else if (where.kind === 'arrive') {
    kingdomSay(name + ' is coming up the path from ' + kingdomLocation(where.leg.from).name + '!', 'news');
  }
}

/* Moves a traveller to where its schedule says it should be. Returns false
   once the leg is over. */
function kingdomTripStep(actor, now) {
  var trip = actor.trip;
  var f = (now - trip.t0) / Math.max(1, trip.t1 - trip.t0);
  if (f >= 1) return false;
  var pos = kingdomPointAlong(trip.points, f);
  actor.x = pos.x;
  actor.y = pos.y;
  if (Math.abs(pos.dx) > .05) actor.el.style.setProperty('--face', pos.dx < 0 ? '-1' : '1');
  var fade = 1;
  if (trip.kind !== 'leave') fade = Math.min(fade, pos.walked / 6);
  if (trip.kind !== 'arrive') fade = Math.min(fade, pos.left / 6);
  actor.el.style.opacity = Math.max(0, Math.min(1, fade)).toFixed(2);
  kingdomPaint(actor);
  return true;
}

function kingdomFinishTrip(actor) {
  var trip = actor.trip;
  if (trip.kind === 'arrive') {
    var end = trip.points[trip.points.length - 1];
    actor.trip = null;
    actor.x = end[0];
    actor.y = end[1];
    actor.el.style.opacity = '';
    actor.el.classList.remove('traveling');
    actor.target = kingdomPoint(actor.rand, actor.location);
    actor.nextTurn = performance.now() + 4000;
    actor.pauseUntil = performance.now() + 900;
    kingdomSay(monName(actor.entry.mon) + ' has arrived in ' + actor.location.name + '.', 'news');
    kingdomPaint(actor);
    return;
  }
  kingdomRemoveActor(actor);
}

function kingdomFadeOut(actor) {
  kingdomRemoveActor(actor, true);
  actor.el.classList.add('vanishing');
  setTimeout(function () { if (actor.el.parentNode) actor.el.remove(); }, 700);
}

function kingdomAddActor(entry, position, location, salt) {
  var stage = $('#kingdom-stage');
  var rand = kingdomSeed(entry, position, salt % 100003);
  var point = entry.spot && entry.spot.loc === location.id ?
    { x: entry.spot.x, y: entry.spot.y } : kingdomPoint(rand, location);
  var button = document.createElement('button');
  button.className = 'kingdom-mon walking';
  button.type = 'button';
  button.setAttribute('aria-label', monName(entry.mon) + ', level ' + entry.mon.lvl +
    (entry.where === 'party' ? ', in your party' : ', from the PC') + ', in ' + location.name);
  button.innerHTML = '<img src="' + monSprite(entry.mon, entry.mon.shiny ? 'shiny' : 'front') +
    '" alt="" draggable="false">' +
    (entry.where === 'party' ? '<span class="kingdom-party-mark" title="In your party">★</span>' : '');
  var actor = {
    entry: entry, key: kingdomPlacementKey(entry), el: button, rand: rand, location: location,
    x: point.x, y: point.y, target: kingdomPoint(rand, location), trip: null,
    speed: 2.7 + rand() * 2.6, pauseUntil: 0, nextTurn: 0
  };
  button.onclick = function () { kingdomInspect(actor); };
  stage.appendChild(button);
  KINGDOM_ACTORS.push(actor);
  kingdomPaint(actor);
  return actor;
}

function kingdomTick(now) {
  if (CUR !== 'kingdom' || !document.getElementById('kingdom-stage')) {
    kingdomStop(true);
    return;
  }
  var dt = Math.min(.05, Math.max(0, (now - KINGDOM_LAST) / 1000));
  KINGDOM_LAST = now;
  var clock = Date.now();
  var still = kingdomReduceMotion();
  var held = KINGDOM_GRAB && KINGDOM_GRAB.actor;
  var actors = KINGDOM_ACTORS.slice();
  for (var i = 0; i < actors.length; i++) {
    var a = actors[i];
    if (a === held) continue;
    if (a.trip) {
      if (!kingdomTripStep(a, clock)) kingdomFinishTrip(a);
      continue;
    }
    if (still || now < a.pauseUntil) {
      a.el.classList.remove('walking');
      kingdomPaint(a);
      continue;
    }
    a.el.classList.add('walking');
    var dx = a.target.x - a.x, dy = a.target.y - a.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < .7 || now > a.nextTurn) {
      a.target = kingdomPoint(a.rand, a.location);
      a.nextTurn = now + 3500 + a.rand() * 5000;
    } else {
      var step = Math.min(dist, a.speed * dt);
      var moved = kingdomTryStep(a, a.x + dx / dist * step, a.y + dy / dist * step);
      if (moved && Math.abs(dx) > .15) {
        a.el.style.setProperty('--face', dx < 0 ? '-1' : '1');
      } else if (!moved) {
        /* A newcomer can end its walk just off the open ground at a path
           mouth; step it back onto the ground. */
        if (!kingdomIsWalkable(a.x, a.y, a.location)) {
          var back = kingdomNearestWalkable(a.x, a.y, a.location);
          if (back) { a.x = back.x; a.y = back.y; }
        }
        a.target = kingdomPoint(a.rand, a.location);
        a.nextTurn = now + 1600 + a.rand() * 2200;
      }
    }
    kingdomPaint(a);
  }
  if (now >= KINGDOM_SOCIAL_AT && !still) {
    kingdomFindFriends(now);
    KINGDOM_SOCIAL_AT = now + 1500;
  }
  KINGDOM_RAF = requestAnimationFrame(kingdomTick);
}

function kingdomPaint(actor) {
  var depth = .72 + actor.y * .0042;
  actor.el.style.left = actor.x.toFixed(2) + '%';
  actor.el.style.top = actor.y.toFixed(2) + '%';
  actor.el.style.transform = 'translate(-50%, -78%) scale(' + depth.toFixed(3) + ')';
  actor.el.style.zIndex = String(100 + Math.round(actor.y));
}

function kingdomFindFriends(now) {
  if (KINGDOM_ACTORS.length < 2) return;
  var start = Math.floor(Math.random() * KINGDOM_ACTORS.length);
  for (var offset = 0; offset < KINGDOM_ACTORS.length; offset++) {
    var a = KINGDOM_ACTORS[(start + offset) % KINGDOM_ACTORS.length];
    if (now < a.pauseUntil || a.trip) continue;
    var best = null, bestD = 999;
    for (var j = 0; j < KINGDOM_ACTORS.length; j++) {
      var b = KINGDOM_ACTORS[j];
      if (a === b || now < b.pauseUntil || b.trip) continue;
      var dx = a.x - b.x, dy = a.y - b.y;
      var d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = b; }
    }
    if (best && bestD < 85) { kingdomSocial(a, best, now); return; }
  }
}

function kingdomSocial(a, b, now) {
  var moments = [
    { mark: '♥', line: ' are sharing a happy moment.' },
    { mark: '♪', line: ' found a song in the trees.' },
    { mark: '!', line: ' started a tiny game of chase.' },
    { mark: '✦', line: ' stopped to watch the town sparkle.' }
  ];
  var moment = moments[Math.floor(Math.random() * moments.length)];
  [a, b].forEach(function (actor) {
    actor.pauseUntil = now + 1800;
    actor.el.classList.remove('walking');
    actor.el.classList.add('greeting');
    var old = actor.el.querySelector('.kingdom-emote');
    if (old) old.remove();
    var emote = document.createElement('span');
    emote.className = 'kingdom-emote';
    emote.textContent = moment.mark;
    actor.el.appendChild(emote);
    setTimeout(function () {
      if (emote.parentNode) emote.remove();
      actor.el.classList.remove('greeting');
    }, 1700);
  });
  kingdomSay(monName(a.entry.mon) + ' and ' + monName(b.entry.mon) + moment.line, 'chatter');
}

/* What a Pokemon is up to, in words, for the inspector. */
function kingdomTravelLine(actor) {
  var st = actor.entry.state;
  var now = Date.now();
  if (!st) return 'Spending time in ' + actor.location.name + '.';
  if (st.trip) {
    var via = st.trip.path.slice(1, -1).map(function (id) { return kingdomLocation(id).name; });
    return 'Walking to ' + kingdomLocation(st.trip.to).name +
      (via.length ? ' by way of ' + via.join(' and ') : '') +
      ' - about ' + kingdomDurationText(st.trip.end - now) + ' to go.';
  }
  return 'Settled in ' + actor.location.name + '. Feels like wandering off in about ' +
    kingdomDurationText(st.until - now) + '.';
}

function kingdomInspect(actor) {
  KINGDOM_INSPECTED = actor;
  KINGDOM_ACTORS.forEach(function (a) { a.el.classList.toggle('selected', a === actor); });
  if (!actor.trip) {
    actor.pauseUntil = performance.now() + 3200;
    actor.el.classList.remove('walking');
  }
  actor.el.classList.add('greeting');
  setTimeout(function () { if (actor.el) actor.el.classList.remove('greeting'); }, 850);
  playCry(actor.entry.mon.id);
  var m = actor.entry.mon, d = dexOf(m.id);
  var home = actor.entry.where === 'party' ? 'Traveling in your party' : 'Living in the PC';
  var travelling = !!(actor.entry.state && actor.entry.state.trip);
  $('#kingdom-inspector').className = 'panel kingdom-inspector';
  $('#kingdom-inspector').innerHTML =
    '<img src="' + monSprite(m, m.shiny ? 'shiny' : 'front') + '" alt="">' +
    '<div><h3>' + esc(monName(m)) + (m.shiny ? ' ✦' : '') + '</h3><div>' + typePills(d.types) + '</div>' +
    '<p>Level ' + m.lvl + ' · ' + esc(d.genus) + ' · ' + home + '<br><span id="kingdom-inspect-status">' +
    esc(kingdomTravelLine(actor)) + '</span></p><div id="kingdom-inspect-moves" data-travelling="' +
    travelling + '">' + kingdomMoveButtonsHtml(actor, travelling) + '</div></div>' +
    '<button class="kingdom-close" onclick="kingdomClearInspect()" aria-label="Close Pokémon details">×</button>';
  kingdomSay(monName(m) + (actor.trip ? ' waved on its way past!' : ' came over to say hello!'));
}

function kingdomRefreshInspector() {
  var actor = KINGDOM_INSPECTED;
  var status = $('#kingdom-inspect-status');
  if (!actor || !status) return;
  status.textContent = kingdomTravelLine(actor);
  var moves = $('#kingdom-inspect-moves');
  var travelling = !!(actor.entry.state && actor.entry.state.trip);
  if (moves && moves.getAttribute('data-travelling') !== String(travelling)) {
    moves.setAttribute('data-travelling', String(travelling));
    moves.innerHTML = kingdomMoveButtonsHtml(actor, travelling);
  }
}

function kingdomMoveButtonsHtml(actor, travelling) {
  if (travelling) return '';
  var h = '<div class="kingdom-move-row"><span>Walk to</span>';
  KINGDOM_LOCATIONS.forEach(function (loc) {
    if (loc.id === actor.location.id) return;
    h += '<button type="button" onclick="kingdomMoveInspected(\'' + loc.id + '\')">' +
      loc.icon + ' ' + esc(loc.short) + '</button>';
  });
  return h + '</div>';
}

/* Button alternative to carrying: the Pokemon sets off on foot, right now. */
function kingdomMoveInspected(locationId) {
  var actor = KINGDOM_INSPECTED;
  if (!actor || KINGDOM_ACTORS.indexOf(actor) < 0 || KINGDOM_CARRY || actor.trip) return;
  var target = kingdomLocation(locationId);
  if (!kingdomTravelSend(actor.entry, target.id)) return;
  actor.pauseUntil = 0;
  kingdomSync();
  toast(monName(actor.entry.mon) + ' is walking to ' + target.name + '.');
}

function kingdomRemoveActor(actor, keepElement) {
  var i = KINGDOM_ACTORS.indexOf(actor);
  if (i >= 0) KINGDOM_ACTORS.splice(i, 1);
  if (!keepElement && actor.el && actor.el.parentNode) actor.el.remove();
  if (KINGDOM_INSPECTED === actor) kingdomClearInspect();
}

function kingdomRefreshCounts() {
  if (document.getElementById('kingdom-stage')) kingdomSync();
}

function kingdomClearInspect() {
  KINGDOM_INSPECTED = null;
  KINGDOM_ACTORS.forEach(function (a) { a.el.classList.remove('selected'); });
  var box = $('#kingdom-inspector');
  if (!box) return;
  box.className = 'panel kingdom-inspector kingdom-welcome';
  box.innerHTML = '<span aria-hidden="true" class="kingdom-welcome-mark">❧</span>' +
    '<div><h3>Back to exploring</h3><p>Choose another Pokémon whenever you want to visit.</p></div>';
}

/* Comings and goings are the news; idle chatter waits a few seconds behind them. */
var KINGDOM_NEWS_UNTIL = 0;
function kingdomSay(message, kind) {
  var story = $('#kingdom-story');
  if (!story) return;
  var now = performance.now();
  if (kind === 'chatter' && now < KINGDOM_NEWS_UNTIL) return;
  if (kind === 'news') KINGDOM_NEWS_UNTIL = now + 4500;
  story.textContent = message;
}

function kingdomGo(id) {
  var location = kingdomLocation(id);
  if (!location || location.id === KINGDOM_LOCATION) return;
  KINGDOM_LOCATION = location.id;
  renderKingdom();
  var stage = $('#kingdom-stage');
  if (stage) stage.focus({ preventScroll: true });
}

function kingdomUpdateClock() {
  if (CUR !== 'kingdom') { kingdomStop(true); return; }
  kingdomApplyAtmosphere(Date.now());
}

function kingdomApplyAtmosphere(now) {
  var stage = $('#kingdom-stage');
  if (!stage) return;
  var time = kingdomEasternTime(now);
  ['dawn', 'day', 'dusk', 'night'].forEach(function (phase) {
    stage.classList.toggle('phase-' + phase, phase === time.phase);
  });
  stage.classList.toggle('weather-rain', KINGDOM_WEATHER === 'rain');
  var timeLabel = $('#kingdom-local-time');
  if (timeLabel) {
    var icon = time.phase === 'night' ? '🌙 ' : time.phase === 'dawn' ? '🌅 ' :
      time.phase === 'dusk' ? '🌇 ' : '☀️ ';
    timeLabel.textContent = icon + time.label + ' ET · ' + kingdomPhaseLabel(time.phase);
  }
  var button = $('#kingdom-weather-toggle');
  if (button) {
    var raining = KINGDOM_WEATHER === 'rain';
    button.setAttribute('aria-pressed', String(raining));
    button.textContent = raining ? '🌧️ Rain: on' : '☁️ Rain: off';
  }
  var soundButton = $('#kingdom-sound-toggle');
  if (soundButton) {
    soundButton.setAttribute('aria-pressed', String(KINGDOM_RAIN_SOUND));
    soundButton.textContent = KINGDOM_RAIN_SOUND ? '🔊 Rain SFX' : '🔇 Rain muted';
  }
  var musicButton = $('#kingdom-music-toggle');
  if (musicButton) {
    var track = KINGDOM_MUSIC_TRACKS[KINGDOM_LOCATION];
    musicButton.setAttribute('aria-pressed', String(KINGDOM_MUSIC_ON));
    musicButton.textContent = KINGDOM_MUSIC_ON && track ? '🎵 ' + track.name : '🎵 Music: off';
    musicButton.title = track ? (KINGDOM_MUSIC_ON ? 'Now playing: ' : 'Muted: ') + track.name : 'Kingdom music';
  }
}

function kingdomCreateRainAudio() {
  if (KINGDOM_RAIN_AUDIO) return KINGDOM_RAIN_AUDIO;
  var AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  try {
    var context = new AudioContextClass();
    var seconds = 4;
    var buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    var data = buffer.getChannelData(0);
    var soft = 0;
    for (var i = 0; i < data.length; i++) {
      var white = Math.random() * 2 - 1;
      soft = soft * .985 + white * .015;
      data[i] = white * .52 + soft * .72;
    }

    var master = context.createGain();
    master.gain.value = .0001;
    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -22;
    compressor.knee.value = 18;
    compressor.ratio.value = 3;
    compressor.attack.value = .04;
    compressor.release.value = .55;
    master.connect(compressor);
    compressor.connect(context.destination);

    function addLayer(rate, filterType, frequency, q, gainValue) {
      var source = context.createBufferSource();
      var filter = context.createBiquadFilter();
      var gain = context.createGain();
      source.buffer = buffer;
      source.loop = true;
      source.playbackRate.value = rate;
      filter.type = filterType;
      filter.frequency.value = frequency;
      filter.Q.value = q;
      gain.gain.value = gainValue;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      source.start();
      return source;
    }

    var sources = [
      addLayer(.83, 'lowpass', 4300, .45, .72),
      addLayer(1.17, 'bandpass', 1550, .55, .2),
      addLayer(.41, 'lowpass', 310, .35, .1)
    ];
    KINGDOM_RAIN_AUDIO = { context: context, master: master, sources: sources };
    return KINGDOM_RAIN_AUDIO;
  } catch (error) {
    return null;
  }
}

function kingdomStartRainAudio() {
  if (KINGDOM_WEATHER !== 'rain' || !KINGDOM_RAIN_SOUND) return;
  var audio = kingdomCreateRainAudio();
  if (!audio) return;
  var token = ++KINGDOM_RAIN_AUDIO_TOKEN;
  var begin = function () {
    if (token !== KINGDOM_RAIN_AUDIO_TOKEN || KINGDOM_WEATHER !== 'rain' || !KINGDOM_RAIN_SOUND) return;
    var now = audio.context.currentTime;
    audio.master.gain.cancelScheduledValues(now);
    audio.master.gain.setValueAtTime(Math.max(.0001, audio.master.gain.value), now);
    audio.master.gain.linearRampToValueAtTime(.075, now + 1.6);
  };
  if (audio.context.state === 'suspended') {
    audio.context.resume().then(begin).catch(function () { });
  } else {
    begin();
  }
}

function kingdomStopRainAudio(immediate) {
  var audio = KINGDOM_RAIN_AUDIO;
  var token = ++KINGDOM_RAIN_AUDIO_TOKEN;
  if (!audio) return;
  var now = audio.context.currentTime;
  audio.master.gain.cancelScheduledValues(now);
  audio.master.gain.setValueAtTime(Math.max(.0001, audio.master.gain.value), now);
  audio.master.gain.linearRampToValueAtTime(.0001, now + (immediate ? .08 : 1.1));
  setTimeout(function () {
    if (token === KINGDOM_RAIN_AUDIO_TOKEN && audio.context.state === 'running') {
      audio.context.suspend().catch(function () { });
    }
  }, immediate ? 120 : 1250);
}

function kingdomMusicMidi(track, degree, shift) {
  var length = track.scale.length;
  var octave = Math.floor(degree / length);
  var index = ((degree % length) + length) % length;
  return track.root + track.scale[index] + octave * 12 + (shift || 0);
}

function kingdomCreateMusicAudio() {
  if (KINGDOM_MUSIC_AUDIO) return KINGDOM_MUSIC_AUDIO;
  var AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  try {
    var context = new AudioContextClass();
    var output = context.createGain();
    var warmth = context.createBiquadFilter();
    var compressor = context.createDynamicsCompressor();
    output.gain.value = .68;
    warmth.type = 'lowpass';
    warmth.frequency.value = 7200;
    warmth.Q.value = .25;
    compressor.threshold.value = -24;
    compressor.knee.value = 22;
    compressor.ratio.value = 2.4;
    compressor.attack.value = .06;
    compressor.release.value = .7;
    output.connect(warmth);
    warmth.connect(compressor);
    compressor.connect(context.destination);
    KINGDOM_MUSIC_AUDIO = { context: context, output: output, active: null };
    return KINGDOM_MUSIC_AUDIO;
  } catch (error) {
    return null;
  }
}

function kingdomMusicVoice(voice) {
  var voices = {
    flute: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .07, attack: .075, cutoff: 3200 },
    chime: { wave: 'sine', harmonic: 'sine', ratio: 2.01, harmonicGain: .22, attack: .008, cutoff: 6900 },
    pluck: { wave: 'triangle', harmonic: 'square', ratio: 2, harmonicGain: .055, attack: .006, cutoff: 2450 },
    glass: { wave: 'sine', harmonic: 'sine', ratio: 3, harmonicGain: .13, attack: .018, cutoff: 6100 },
    reed: { wave: 'triangle', harmonic: 'sine', ratio: 2, harmonicGain: .065, attack: .045, cutoff: 2800 },
    bell: { wave: 'sine', harmonic: 'sine', ratio: 2.5, harmonicGain: .18, attack: .01, cutoff: 6500 },
    pad: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .035, attack: .32, cutoff: 2200 },
    bass: { wave: 'triangle', harmonic: 'sine', ratio: .5, harmonicGain: .07, attack: .025, cutoff: 760 }
  };
  return voices[voice] || voices.flute;
}

function kingdomScheduleMusicTone(context, bus, midi, time, duration, voice, volume) {
  var settings = kingdomMusicVoice(voice);
  var frequency = 440 * Math.pow(2, (midi - 69) / 12);
  var envelope = context.createGain();
  var filter = context.createBiquadFilter();
  var primary = context.createOscillator();
  var overtone = context.createOscillator();
  var overtoneGain = context.createGain();
  var attackEnd = time + Math.min(settings.attack, duration * .28);
  var releaseAt = time + Math.max(settings.attack + .03, duration * .52);
  var stopAt = time + duration + .08;

  primary.type = settings.wave;
  primary.frequency.setValueAtTime(frequency, time);
  overtone.type = settings.harmonic;
  overtone.frequency.setValueAtTime(frequency * settings.ratio, time);
  overtoneGain.gain.value = settings.harmonicGain;
  filter.type = 'lowpass';
  filter.frequency.value = settings.cutoff;
  filter.Q.value = .35;
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.linearRampToValueAtTime(volume, attackEnd);
  envelope.gain.setValueAtTime(volume * .76, releaseAt);
  envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);

  primary.connect(filter);
  overtone.connect(overtoneGain);
  overtoneGain.connect(filter);
  filter.connect(envelope);
  envelope.connect(bus);
  primary.start(time);
  overtone.start(time);
  primary.stop(stopAt);
  overtone.stop(stopAt);
}

function kingdomScheduleMusicStep(active) {
  var track = active.track;
  var step = active.step;
  var stepSeconds = 60 / track.bpm / 2;
  var withinBar = step % track.stepsPerBar;
  var bar = Math.floor(step / track.stepsPerBar);
  var chordDegree = track.chords[bar % track.chords.length];

  if (withinBar === 0) {
    [chordDegree, chordDegree + 2, chordDegree + 4].forEach(function (degree) {
      kingdomScheduleMusicTone(active.context, active.bus,
        kingdomMusicMidi(track, degree, -12), active.nextTime,
        stepSeconds * (track.stepsPerBar - .35), 'pad', .0075);
    });
    kingdomScheduleMusicTone(active.context, active.bus,
      kingdomMusicMidi(track, chordDegree, -24), active.nextTime,
      stepSeconds * Math.max(2.4, track.stepsPerBar * .58), 'bass', .021);
  } else if (withinBar === Math.floor(track.stepsPerBar / 2)) {
    kingdomScheduleMusicTone(active.context, active.bus,
      kingdomMusicMidi(track, chordDegree + 4, -24), active.nextTime,
      stepSeconds * 2.1, 'bass', .012);
  }

  var degree = track.melody[step % track.melody.length];
  if (degree !== null) {
    if (active.cycle % 2 === 1 && step % (track.stepsPerBar * 4) === track.stepsPerBar * 3) degree += 7;
    var leadDuration = stepSeconds * (track.voice === 'bell' || track.voice === 'glass' ? 2.7 : 1.65);
    kingdomScheduleMusicTone(active.context, active.bus,
      kingdomMusicMidi(track, degree, 0), active.nextTime, leadDuration, track.voice,
      track.voice === 'pluck' ? .027 : .024);
  }
}

function kingdomMusicScheduler(active) {
  if (!KINGDOM_MUSIC_AUDIO || KINGDOM_MUSIC_AUDIO.active !== active) return;
  var horizon = active.context.currentTime + .42;
  while (active.nextTime < horizon) {
    kingdomScheduleMusicStep(active);
    active.nextTime += 60 / active.track.bpm / 2;
    active.step++;
    if (active.step >= active.track.melody.length) {
      active.step = 0;
      active.cycle++;
    }
  }
}

function kingdomFadeMusicActive(active, seconds) {
  if (!active) return;
  clearInterval(active.timer);
  var now = active.context.currentTime;
  active.bus.gain.cancelScheduledValues(now);
  active.bus.gain.setValueAtTime(Math.max(.0001, active.bus.gain.value), now);
  active.bus.gain.linearRampToValueAtTime(.0001, now + seconds);
  setTimeout(function () {
    try { active.bus.disconnect(); } catch (error) { }
  }, seconds * 1000 + 180);
}

function kingdomStartMusic(locationId) {
  if (!KINGDOM_MUSIC_ON) return;
  if (typeof radioMusicPlaying === 'function' && radioMusicPlaying()) return;
  var track = KINGDOM_MUSIC_TRACKS[locationId];
  var music = track && kingdomCreateMusicAudio();
  if (!music) return;
  var token = ++KINGDOM_MUSIC_TOKEN;
  if (music.active && music.active.id === locationId) {
    if (music.context.state === 'suspended') music.context.resume().catch(function () { });
    return;
  }
  if (music.active) kingdomFadeMusicActive(music.active, 1.25);

  var bus = music.context.createGain();
  bus.gain.setValueAtTime(.0001, music.context.currentTime);
  bus.gain.linearRampToValueAtTime(1, music.context.currentTime + 1.35);
  bus.connect(music.output);
  var active = {
    id: locationId, track: track, context: music.context, bus: bus,
    step: 0, cycle: 0, nextTime: music.context.currentTime + .08, timer: 0, token: token
  };
  music.active = active;
  kingdomMusicScheduler(active);
  active.timer = setInterval(function () { kingdomMusicScheduler(active); }, 110);
  if (music.context.state === 'suspended') music.context.resume().catch(function () { });
}

function kingdomStopMusic(immediate) {
  var music = KINGDOM_MUSIC_AUDIO;
  var token = ++KINGDOM_MUSIC_TOKEN;
  if (!music) return;
  if (music.active) {
    kingdomFadeMusicActive(music.active, immediate ? .08 : 1.15);
    music.active = null;
  }
  setTimeout(function () {
    if (token === KINGDOM_MUSIC_TOKEN && music.context.state === 'running') {
      music.context.suspend().catch(function () { });
    }
  }, immediate ? 120 : 1320);
}

function kingdomToggleWeather() {
  KINGDOM_WEATHER = KINGDOM_WEATHER === 'rain' ? 'clear' : 'rain';
  kingdomApplyAtmosphere();
  if (KINGDOM_WEATHER === 'rain' && KINGDOM_RAIN_SOUND) kingdomStartRainAudio();
  else kingdomStopRainAudio(false);
  kingdomSay(KINGDOM_WEATHER === 'rain' ?
    'A gentle rain is passing over town.' : 'The clouds have cleared over town.');
  toast(KINGDOM_WEATHER === 'rain' ? 'Kingdom rain turned on.' : 'Kingdom rain turned off.');
}

function kingdomToggleRainSound() {
  KINGDOM_RAIN_SOUND = !KINGDOM_RAIN_SOUND;
  kingdomApplyAtmosphere();
  if (KINGDOM_RAIN_SOUND && KINGDOM_WEATHER === 'rain') kingdomStartRainAudio();
  else kingdomStopRainAudio(false);
  toast(KINGDOM_RAIN_SOUND ? 'Rain ambience unmuted.' : 'Rain ambience muted.');
}

function kingdomToggleMusic() {
  KINGDOM_MUSIC_ON = !KINGDOM_MUSIC_ON;
  kingdomApplyAtmosphere();
  var track = KINGDOM_MUSIC_TRACKS[KINGDOM_LOCATION];
  if (KINGDOM_MUSIC_ON) {
    kingdomStartMusic(KINGDOM_LOCATION);
    kingdomSay((track ? track.name : 'The town theme') + ' begins softly.');
    toast('Kingdom music turned on.');
  } else {
    kingdomStopMusic(false);
    kingdomSay('The town grows quiet, with only its natural ambience remaining.');
    toast('Kingdom music turned off.');
  }
}

/* ---- The grabbing hand ---------------------------------------------------
   Hold on a Pokemon for KINGDOM_HOLD_MS to pick it up. It then hangs from the
   hand wherever the pointer goes; hovering a district on the town map or a
   path button walks there. Letting go inside the town sets it down; letting
   go anywhere else does nothing - it clings on until it is placed in town. */

function kingdomBindHand(stage) {
  if (!stage) return;
  stage.addEventListener('pointerdown', kingdomStagePointerDown);
  stage.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
  if (kingdomBindHand.bound) return;
  kingdomBindHand.bound = true;
  window.addEventListener('pointermove', kingdomPointerMove);
  window.addEventListener('pointerup', kingdomPointerUp);
  window.addEventListener('pointercancel', function () {
    kingdomSetHandClosed(false);
    if (KINGDOM_GRAB) kingdomCancelHold(true);
  });
  window.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && KINGDOM_CARRY) { ev.preventDefault(); kingdomReturnCarried(); }
  });
  /* While carrying, the only clicks that do anything are district changes. */
  window.addEventListener('click', function (ev) {
    var swallow = performance.now() < KINGDOM_SWALLOW_CLICK_UNTIL;
    if (!KINGDOM_CARRY && !swallow) return;
    var loc = ev.target.closest && ev.target.closest('[data-kingdom-loc]');
    if (loc && !swallow) return;
    ev.preventDefault();
    ev.stopPropagation();
  }, true);
}

function kingdomSetHandClosed(closed) {
  var stage = $('#kingdom-stage');
  if (stage) stage.classList.toggle('hand-closed', closed);
}

function kingdomActorFor(el) {
  for (var i = 0; i < KINGDOM_ACTORS.length; i++) {
    if (KINGDOM_ACTORS[i].el === el) return KINGDOM_ACTORS[i];
  }
  return null;
}

function kingdomStagePointerDown(ev) {
  if (ev.pointerType === 'mouse' && ev.button !== 0) return;
  kingdomSetHandClosed(true);
  if (KINGDOM_CARRY) { ev.preventDefault(); return; }
  var monEl = ev.target.closest('.kingdom-mon');
  var actor = monEl && kingdomActorFor(monEl);
  if (actor) kingdomBeginHold(actor, ev);
}

function kingdomBeginHold(actor, ev) {
  kingdomCancelHold(true);
  actor.pauseUntil = Infinity;
  actor.el.classList.remove('walking');
  actor.el.classList.add('holding');
  actor.el.style.setProperty('--hold', '0');
  var grab = KINGDOM_GRAB = {
    actor: actor, pointerId: ev.pointerId, startedAt: performance.now(),
    x: ev.clientX, y: ev.clientY, raf: 0, timer: 0
  };
  /* The timer owns the pickup; animation frames only draw the ring. */
  grab.timer = setTimeout(function () {
    if (KINGDOM_GRAB === grab) kingdomPickUp();
  }, KINGDOM_HOLD_MS);
  var step = function () {
    if (KINGDOM_GRAB !== grab) return;
    var progress = Math.min(1, Math.max(0, (performance.now() - grab.startedAt) / KINGDOM_HOLD_MS));
    actor.el.style.setProperty('--hold', progress.toFixed(3));
    grab.raf = requestAnimationFrame(step);
  };
  grab.raf = requestAnimationFrame(step);
}

function kingdomCancelHold(quiet) {
  var grab = KINGDOM_GRAB;
  if (!grab) return;
  KINGDOM_GRAB = null;
  cancelAnimationFrame(grab.raf);
  clearTimeout(grab.timer);
  var actor = grab.actor;
  actor.el.classList.remove('holding');
  actor.el.style.removeProperty('--hold');
  actor.pauseUntil = performance.now() + 700;
  var held = performance.now() - grab.startedAt;
  /* A long press that was let go early is not also a tap. */
  if (held > 450) {
    KINGDOM_SWALLOW_CLICK_UNTIL = performance.now() + 350;
    if (!quiet) kingdomSay('Keep holding ' + monName(actor.entry.mon) + ' a little longer to pick it up.');
  }
}

function kingdomPickUp() {
  var grab = KINGDOM_GRAB;
  if (!grab) return;
  KINGDOM_GRAB = null;
  cancelAnimationFrame(grab.raf);
  clearTimeout(grab.timer);
  var actor = grab.actor;
  var size = Math.max(48, actor.el.getBoundingClientRect().width);
  var m = actor.entry.mon;
  kingdomRemoveActor(actor);
  var el = document.createElement('div');
  el.className = 'kingdom-carry';
  el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--size', Math.round(size) + 'px');
  el.innerHTML = '<img src="' + monSprite(m, m.shiny ? 'shiny' : 'front') + '" alt="" draggable="false">' +
    (actor.entry.where === 'party' ? '<span class="kingdom-party-mark">★</span>' : '');
  document.body.appendChild(el);
  KINGDOM_CARRY = {
    entry: actor.entry, key: kingdomPlacementKey(actor.entry), el: el,
    from: { loc: actor.location.id, x: actor.x, y: actor.y },
    size: size, x: grab.x, y: grab.y, hoverId: null, hoverAt: 0, timer: 0
  };
  document.documentElement.classList.add('kingdom-carrying');
  kingdomMoveCarry(grab.x, grab.y);
  KINGDOM_CARRY.timer = setInterval(kingdomCarryTick, 40);
  kingdomRefreshCounts();
  playCry(m.id);
  kingdomSay('You picked up ' + monName(m) + '! Hover a district to travel, then let go in town.');
}

/* The hand grips the top of the sprite, so it is aimed by its feet - the same
   anchor kingdomPaint uses (78% down a sprite that hangs from 20% above the hand). */
function kingdomFeetPoint(cx, cy) {
  var stage = $('#kingdom-stage');
  if (!stage || !KINGDOM_CARRY) return null;
  var r = stage.getBoundingClientRect();
  var fy = cy + KINGDOM_CARRY.size * .58;
  /* Hit-test rather than trust the rectangle: the fixed nav bar can cover
     the bottom of the town. The carried sprite ignores pointer events. */
  var under = document.elementFromPoint(cx, cy);
  return {
    inside: !!under && stage.contains(under),
    x: Math.max(0, Math.min(100, (cx - r.left) / r.width * 100)),
    y: Math.max(0, Math.min(100, (fy - r.top) / r.height * 100))
  };
}

function kingdomMoveCarry(cx, cy) {
  var carry = KINGDOM_CARRY;
  if (!carry) return;
  carry.x = cx;
  carry.y = cy;
  carry.el.style.left = cx + 'px';
  carry.el.style.top = cy + 'px';
  var feet = kingdomFeetPoint(cx, cy);
  var inside = !!(feet && feet.inside);
  var canDrop = inside && !!kingdomNearestWalkable(feet.x, feet.y, kingdomLocation(KINGDOM_LOCATION));
  carry.el.classList.toggle('outside', !inside);
  carry.el.classList.toggle('can-drop', canDrop);

  var under = document.elementFromPoint(cx, cy);
  var target = under && under.closest && under.closest('[data-kingdom-loc]');
  var id = target ? target.getAttribute('data-kingdom-loc') : null;
  if (id === KINGDOM_LOCATION) id = null;
  if (id !== carry.hoverId) {
    $$('.carry-hover').forEach(function (node) { node.classList.remove('carry-hover'); });
    carry.hoverId = id;
    carry.hoverAt = performance.now();
    if (id) target.classList.add('carry-hover');
  } else if (id && performance.now() - carry.hoverAt >= KINGDOM_HOVER_MS) {
    carry.hoverId = null;
    kingdomGo(id);
    kingdomSay('Carrying ' + monName(carry.entry.mon) + ' into ' + kingdomLocation(id).name +
      '. Let go in town to set it down.');
  }
}

/* Runs while carrying so the district hover finishes and the page scrolls at
   the screen edges even when the pointer rests. */
function kingdomCarryTick() {
  var carry = KINGDOM_CARRY;
  if (!carry) return;
  var edge = 48;
  if (carry.y < edge) window.scrollBy(0, -Math.ceil((edge - carry.y) / 3));
  else if (carry.y > innerHeight - edge) window.scrollBy(0, Math.ceil((carry.y - innerHeight + edge) / 3));
  kingdomMoveCarry(carry.x, carry.y);
}

function kingdomPointerMove(ev) {
  var grab = KINGDOM_GRAB;
  if (grab && ev.pointerId === grab.pointerId) {
    grab.x = ev.clientX;
    grab.y = ev.clientY;
    var r = grab.actor.el.getBoundingClientRect();
    var slack = 12;
    if (ev.clientX < r.left - slack || ev.clientX > r.right + slack ||
        ev.clientY < r.top - slack || ev.clientY > r.bottom + slack) {
      kingdomCancelHold(false);
    }
  }
  if (KINGDOM_CARRY) kingdomMoveCarry(ev.clientX, ev.clientY);
}

function kingdomPointerUp(ev) {
  kingdomSetHandClosed(false);
  if (KINGDOM_GRAB) kingdomCancelHold(false);
  else if (KINGDOM_CARRY) kingdomTryDrop(ev.clientX, ev.clientY);
}

function kingdomTryDrop(cx, cy) {
  var carry = KINGDOM_CARRY;
  var name = monName(carry.entry.mon);
  var feet = kingdomFeetPoint(cx, cy);
  if (!feet || !feet.inside) {
    carry.el.classList.remove('clinging');
    void carry.el.offsetWidth;
    carry.el.classList.add('clinging');
    kingdomSay(name + ' is holding on tight! Set it down somewhere in town.');
    return false;
  }
  var location = kingdomLocation(KINGDOM_LOCATION);
  var point = kingdomNearestWalkable(feet.x, feet.y, location);
  if (!point) {
    kingdomSay('There is no room for ' + name + ' there. Try an open path.');
    return false;
  }
  kingdomTravelSettle(carry.entry, location.id, point);
  kingdomEndCarry();
  kingdomPlaceActor(carry.entry, { loc: location.id, x: point.x, y: point.y }, location);
  kingdomSay(name + ' settled into ' + location.name + '.');
  return true;
}

function kingdomPlaceActor(entry, spot, location) {
  entry.spot = spot;
  var actor = kingdomAddActor(entry, KINGDOM_ACTORS.length, location, Date.now());
  actor.pauseUntil = performance.now() + 1400;
  actor.el.classList.remove('walking');
  actor.el.classList.add('dropped');
  setTimeout(function () { actor.el.classList.remove('dropped'); }, 600);
  kingdomRefreshCounts();
  kingdomEnsureTick();
}

function kingdomEndCarry() {
  var carry = KINGDOM_CARRY;
  if (!carry) return;
  KINGDOM_CARRY = null;
  clearInterval(carry.timer);
  if (carry.el.parentNode) carry.el.remove();
  $$('.carry-hover').forEach(function (node) { node.classList.remove('carry-hover'); });
  document.documentElement.classList.remove('kingdom-carrying');
  KINGDOM_SWALLOW_CLICK_UNTIL = performance.now() + 350;
}

/* Escape puts the Pokemon back where it was picked up - still in town. */
function kingdomReturnCarried() {
  var carry = KINGDOM_CARRY;
  if (!carry) return;
  var name = monName(carry.entry.mon);
  kingdomTravelSettle(carry.entry, carry.from.loc, carry.from);
  kingdomEndCarry();
  if (carry.from.loc === KINGDOM_LOCATION && CUR === 'kingdom' && $('#kingdom-stage')) {
    kingdomPlaceActor(carry.entry, { loc: carry.from.loc, x: carry.from.x, y: carry.from.y },
      kingdomLocation(carry.from.loc));
  } else if ($('#kingdom-stage')) {
    kingdomRefreshCounts();
  }
  kingdomSay(name + ' hurried back to ' + kingdomLocation(carry.from.loc).name + '.');
}

function kingdomStop(stopAudio) {
  if (KINGDOM_GRAB) {
    cancelAnimationFrame(KINGDOM_GRAB.raf);
    clearTimeout(KINGDOM_GRAB.timer);
    KINGDOM_GRAB = null;
  }
  if (stopAudio && KINGDOM_CARRY) kingdomReturnCarried();
  if (KINGDOM_RAF) cancelAnimationFrame(KINGDOM_RAF);
  if (KINGDOM_CLOCK_TIMER) clearInterval(KINGDOM_CLOCK_TIMER);
  if (KINGDOM_SYNC_TIMER) clearInterval(KINGDOM_SYNC_TIMER);
  KINGDOM_RAF = 0;
  KINGDOM_CLOCK_TIMER = 0;
  KINGDOM_SYNC_TIMER = 0;
  KINGDOM_ACTORS = [];
  if (stopAudio) {
    kingdomStopRainAudio(true);
    kingdomStopMusic(true);
  }
}
