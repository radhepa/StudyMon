/* Pokemon Kingdom travel: every resident keeps its own itinerary. It stays in a
   district for anywhere from 5 minutes to 3 days, then walks the town paths to
   another district - through any districts in between. Itineraries are plain
   timestamps kept in localStorage, so the town keeps living while the game is
   closed and every district view agrees on who is where. The save is untouched.

   A trip is a list of legs:
     leave  - walking from the district out along the path to the next one
     road   - between two pictures, off-screen (the town map shows these)
     cross  - passing straight through a district on the way somewhere else
     arrive - walking in from the edge; afterwards the Pokemon just lives there */

var KINGDOM_TRAVEL_KEY = 'studymon.kingdom.travel.v1';
var KINGDOM_STAY_MIN = 5 * 60000;
var KINGDOM_STAY_MAX = 3 * 86400000;
var KINGDOM_ROAD_MS = 14000;
var KINGDOM_TRAVEL = null;
var KINGDOM_TRAVEL_DIRTY = false;
var KINGDOM_WALK_GRIDS = {};
var KINGDOM_SCENE_ROUTES = {};

function kingdomStringHash(text) {
  var h = 2166136261;
  for (var i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function kingdomTravelRand(key, n) {
  var s = (kingdomStringHash(key) ^ Math.imul(n + 1, 2654435761)) >>> 0;
  return function () {
    s = s + 0x6D2B79F5 | 0;
    var t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* Each Pokemon has a temperament: wanderers rarely settle for long, homebodies
   now and then stay for days. Most stays are a short visit (5-60 minutes); the
   rest are a long stay (2 hours to 3 days). With 40 residents that is a
   departure every few minutes, and more Pokemon means a busier town. */
function kingdomTemperament(key) {
  var rand = kingdomTravelRand(key, -1);
  return { wander: rand(), speed: 5.2 + rand() * 2.4 };
}

function kingdomStayMs(key, rand) {
  var longChance = .03 + (1 - kingdomTemperament(key).wander) * .14;
  if (rand() < longChance) {
    return Math.round(2 * 3600000 * Math.pow(KINGDOM_STAY_MAX / (2 * 3600000), rand()));
  }
  return Math.round(KINGDOM_STAY_MIN * Math.pow(12, rand()));
}

/* ---- Distances and routes inside one picture ---------------------------- */

function kingdomDist(a, b) {
  var dx = a[0] - b[0], dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function kingdomLineLength(points) {
  var total = 0;
  for (var i = 1; i < points.length; i++) total += kingdomDist(points[i - 1], points[i]);
  return total;
}

function kingdomClearLine(a, b, location) {
  var steps = Math.max(1, Math.ceil(kingdomDist(a, b) / .5));
  for (var i = 1; i < steps; i++) {
    var t = i / steps;
    if (!kingdomIsWalkable(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, location)) return false;
  }
  return true;
}

/* A* over a 1% grid of the district's open ground, then shortened wherever a
   straight line stays clear, so walkers take natural diagonals around obstacles. */
function kingdomWalkGrid(location) {
  var grid = KINGDOM_WALK_GRIDS[location.id];
  if (grid) return grid;
  grid = new Uint8Array(101 * 101);
  for (var y = 0; y <= 100; y++) {
    for (var x = 0; x <= 100; x++) grid[y * 101 + x] = kingdomIsWalkable(x, y, location) ? 1 : 0;
  }
  return (KINGDOM_WALK_GRIDS[location.id] = grid);
}

function kingdomNearestCell(grid, p) {
  var cx = Math.max(0, Math.min(100, Math.round(p[0])));
  var cy = Math.max(0, Math.min(100, Math.round(p[1])));
  if (grid[cy * 101 + cx]) return cy * 101 + cx;
  for (var r = 1; r < 20; r++) {
    for (var dy = -r; dy <= r; dy++) {
      for (var dx = -r; dx <= r; dx++) {
        var x = cx + dx, y = cy + dy;
        if (x >= 0 && x <= 100 && y >= 0 && y <= 100 && grid[y * 101 + x]) return y * 101 + x;
      }
    }
  }
  return -1;
}

function kingdomFindPath(location, from, to) {
  var grid = kingdomWalkGrid(location);
  var start = kingdomNearestCell(grid, from), goal = kingdomNearestCell(grid, to);
  if (start < 0 || goal < 0) return [from, to];
  var gx = goal % 101, gy = (goal / 101) | 0;
  var cost = new Float32Array(101 * 101).fill(Infinity);
  var came = new Int32Array(101 * 101).fill(-1);
  var closed = new Uint8Array(101 * 101);
  var open = [start];
  cost[start] = 0;
  var dirs = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
    [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]];
  var guess = function (i) {
    var dx = Math.abs(i % 101 - gx), dy = Math.abs(((i / 101) | 0) - gy);
    return Math.max(dx, dy) + .414 * Math.min(dx, dy);
  };
  while (open.length) {
    var best = 0;
    for (var k = 1; k < open.length; k++) {
      if (cost[open[k]] + guess(open[k]) < cost[open[best]] + guess(open[best])) best = k;
    }
    var cur = open[best];
    open[best] = open[open.length - 1];
    open.pop();
    if (cur === goal) break;
    if (closed[cur]) continue;
    closed[cur] = 1;
    var x = cur % 101, y = (cur / 101) | 0;
    for (var d = 0; d < 8; d++) {
      var nx = x + dirs[d][0], ny = y + dirs[d][1];
      if (nx < 0 || nx > 100 || ny < 0 || ny > 100) continue;
      var ni = ny * 101 + nx;
      if (!grid[ni] || closed[ni]) continue;
      /* No squeezing diagonally between two blocked cells. */
      if (d > 3 && (!grid[y * 101 + nx] || !grid[ny * 101 + x])) continue;
      var c = cost[cur] + dirs[d][2];
      if (c < cost[ni]) {
        if (cost[ni] === Infinity) open.push(ni);
        cost[ni] = c;
        came[ni] = cur;
      }
    }
  }
  if (came[goal] < 0 && goal !== start) return [from, to];
  var cells = [];
  for (var at = goal; at >= 0; at = at === start ? -1 : came[at]) cells.push([at % 101, (at / 101) | 0]);
  cells.reverse();
  cells[0] = from;
  cells[cells.length - 1] = to;
  var path = [cells[0]];
  var i = 0;
  while (i < cells.length - 1) {
    var j = cells.length - 1;
    while (j > i + 1 && !kingdomClearLine(cells[i], cells[j], location)) j--;
    path.push(cells[j]);
    i = j;
  }
  return path;
}

/* The line a walker follows through a district. `from`/`to` are neighbour ids
   (null means "somewhere inside"), `start` overrides where a leaver begins. */
function kingdomSceneRoute(locationId, from, to, start) {
  var cacheKey = locationId + ':' + from + ':' + to;
  if (!start && KINGDOM_SCENE_ROUTES[cacheKey]) return KINGDOM_SCENE_ROUTES[cacheKey];
  var location = kingdomLocation(locationId);
  var points;
  if (from && to) {
    var gin = location.gates[from].slice().reverse();
    var gout = location.gates[to];
    points = gin.concat(kingdomFindPath(location, gin[gin.length - 1], gout[0]).slice(1, -1), gout);
  } else if (to) {
    var gate = location.gates[to];
    var begin = start || location.nav.home;
    points = kingdomFindPath(location, begin, gate[0]).concat(gate.slice(1));
  } else {
    points = location.gates[from].slice().reverse();
  }
  if (!start) KINGDOM_SCENE_ROUTES[cacheKey] = points;
  return points;
}

function kingdomPointAlong(points, fraction) {
  var total = kingdomLineLength(points);
  var want = Math.max(0, Math.min(1, fraction)) * total;
  for (var i = 1; i < points.length; i++) {
    var seg = kingdomDist(points[i - 1], points[i]);
    if (want <= seg || i === points.length - 1) {
      var t = seg ? Math.min(1, want / seg) : 1;
      return {
        x: points[i - 1][0] + (points[i][0] - points[i - 1][0]) * t,
        y: points[i - 1][1] + (points[i][1] - points[i - 1][1]) * t,
        dx: points[i][0] - points[i - 1][0],
        walked: want, left: total - want
      };
    }
    want -= seg;
  }
  var last = points[points.length - 1];
  return { x: last[0], y: last[1], dx: 0, walked: total, left: 0 };
}

/* ---- Planning trips -------------------------------------------------------- */

/* Breadth-first over the town paths; neighbour order is shuffled so equal-length
   routes (Green -> Hearthside via Square, or via River and Hill...) both get used. */
function kingdomTownRoute(from, to, rand) {
  var prev = {};
  prev[from] = null;
  var queue = [from];
  while (queue.length) {
    var id = queue.shift();
    if (id === to) break;
    var next = kingdomLocation(id).neighbors.slice().sort(function () { return rand() - .5; });
    next.forEach(function (n) {
      if (!(n in prev)) { prev[n] = id; queue.push(n); }
    });
  }
  var path = [];
  for (var at = to; at; at = prev[at]) path.unshift(at);
  return path;
}

function kingdomPlanTrip(key, from, to, start, rand) {
  if (!to) {
    var others = KINGDOM_LOCATIONS.filter(function (loc) { return loc.id !== from; });
    to = others[Math.floor(rand() * others.length)].id;
  }
  var path = kingdomTownRoute(from, to, rand);
  var speed = kingdomTemperament(key).speed;
  var legs = [];
  var t = start;
  var push = function (leg, length) {
    leg.start = t;
    leg.end = t = t + Math.round(length / speed * 1000);
    legs.push(leg);
  };
  for (var i = 0; i < path.length; i++) {
    var here = path[i], prev = path[i - 1] || null, next = path[i + 1] || null;
    var kind = !prev ? 'leave' : next ? 'cross' : 'arrive';
    push({ kind: kind, loc: here, from: prev, to: next },
      kingdomLineLength(kingdomSceneRoute(here, prev, next)));
    if (next) {
      var road = { kind: 'road', loc: null, from: here, to: next, start: t };
      road.end = t = t + Math.round(KINGDOM_ROAD_MS * (.8 + rand() * .6));
      legs.push(road);
    }
  }
  return { from: from, to: to, path: path, start: start, end: t, legs: legs };
}

/* ---- The shared itinerary store ------------------------------------------- */

function kingdomTravelLoad() {
  if (KINGDOM_TRAVEL) return KINGDOM_TRAVEL;
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KINGDOM_TRAVEL_KEY) || 'null'); } catch (error) { }
  KINGDOM_TRAVEL = saved && saved.v === 1 && saved.mons ? saved : { v: 1, mons: {} };
  return KINGDOM_TRAVEL;
}

function kingdomTravelSave() {
  if (!KINGDOM_TRAVEL_DIRTY || !KINGDOM_TRAVEL) return;
  KINGDOM_TRAVEL_DIRTY = false;
  var live = {};
  kingdomRoster().forEach(function (entry) { live[kingdomPlacementKey(entry)] = true; });
  Object.keys(KINGDOM_TRAVEL.mons).forEach(function (key) {
    if (!live[key]) delete KINGDOM_TRAVEL.mons[key];
  });
  try { localStorage.setItem(KINGDOM_TRAVEL_KEY, JSON.stringify(KINGDOM_TRAVEL)); } catch (error) { }
}

function kingdomFreshState(key, entry, now) {
  var rand = kingdomTravelRand(key, 0);
  /* Newcomers are spread evenly, and their first departure is staggered so a
     brand-new town starts moving within minutes rather than all at once. */
  var loc = KINGDOM_LOCATIONS[kingdomHash(entry) % KINGDOM_LOCATIONS.length].id;
  return { loc: loc, n: 1, trip: null, spot: null, until: now + Math.round(kingdomStayMs(key, rand) * rand()) };
}

/* Replays everything that happened since the itinerary was last looked at. */
function kingdomTravelAdvance(key, st, now) {
  if (now - st.until > 7 * 86400000) {
    /* Away for over a week: settle wherever it was heading and start fresh. */
    if (st.trip) st.loc = st.trip.to;
    st.trip = null;
    st.spot = null;
    st.until = now + Math.round(kingdomStayMs(key, kingdomTravelRand(key, st.n++)) * .5);
    KINGDOM_TRAVEL_DIRTY = true;
  }
  for (var guard = 0; now >= st.until && guard < 4000; guard++) {
    var rand = kingdomTravelRand(key, st.n++);
    if (st.trip) {
      st.loc = st.trip.to;
      st.until = st.trip.end + kingdomStayMs(key, rand);
      st.trip = null;
    } else {
      st.trip = kingdomPlanTrip(key, st.loc, null, st.until, rand);
      st.until = st.trip.end;
    }
    st.spot = null;
    KINGDOM_TRAVEL_DIRTY = true;
  }
  return st;
}

function kingdomTravelState(entry, now) {
  var store = kingdomTravelLoad();
  var key = kingdomPlacementKey(entry);
  var st = store.mons[key];
  if (!st || !kingdomLocationExists(st.loc)) {
    st = store.mons[key] = kingdomFreshState(key, entry, now);
    KINGDOM_TRAVEL_DIRTY = true;
  }
  return kingdomTravelAdvance(key, st, now);
}

function kingdomLocationExists(id) {
  return KINGDOM_LOCATIONS.some(function (loc) { return loc.id === id; });
}

/* Where a Pokemon is right now: { kind: 'stay'|'leave'|'cross'|'arrive'|'road', loc, leg, p }. */
function kingdomWhere(st, now) {
  if (!st.trip) return { kind: 'stay', loc: st.loc, leg: null, p: 0 };
  var legs = st.trip.legs;
  for (var i = 0; i < legs.length; i++) {
    var leg = legs[i];
    if (now < leg.end || i === legs.length - 1) {
      var span = Math.max(1, leg.end - leg.start);
      return { kind: leg.kind, loc: leg.loc, leg: leg, p: Math.max(0, Math.min(1, (now - leg.start) / span)) };
    }
  }
  return { kind: 'stay', loc: st.trip.to, leg: null, p: 0 };
}

/* The player's hand (or the Move button's arrival) sets a Pokemon down: it
   starts a brand-new stay right there. */
function kingdomTravelSettle(entry, locationId, spot) {
  var key = kingdomPlacementKey(entry);
  var store = kingdomTravelLoad();
  var now = Date.now();
  var st = store.mons[key] || kingdomFreshState(key, entry, now);
  st.loc = locationId;
  st.trip = null;
  st.spot = spot ? { x: Math.round(spot.x * 100) / 100, y: Math.round(spot.y * 100) / 100 } : null;
  st.until = now + kingdomStayMs(key, kingdomTravelRand(key, st.n++));
  store.mons[key] = st;
  KINGDOM_TRAVEL_DIRTY = true;
  kingdomTravelSave();
  return st;
}

/* "Move to": the Pokemon walks there along the paths instead of vanishing. */
function kingdomTravelSend(entry, locationId) {
  var key = kingdomPlacementKey(entry);
  var now = Date.now();
  var st = kingdomTravelState(entry, now);
  if (st.trip || st.loc === locationId) return null;
  st.trip = kingdomPlanTrip(key, st.loc, locationId, now, kingdomTravelRand(key, st.n++));
  st.until = st.trip.end;
  st.spot = null;
  KINGDOM_TRAVEL_DIRTY = true;
  kingdomTravelSave();
  return st;
}

/* Everyone's whereabouts, grouped by district, plus who is between districts. */
function kingdomTownCensus(now) {
  var groups = {}, road = [];
  var nextDeparture = Infinity;
  KINGDOM_LOCATIONS.forEach(function (loc) { groups[loc.id] = []; });
  var carried = KINGDOM_CARRY ? KINGDOM_CARRY.key : null;
  kingdomRoster().forEach(function (entry) {
    var key = kingdomPlacementKey(entry);
    if (key === carried) return;
    var st = kingdomTravelState(entry, now);
    var where = kingdomWhere(st, now);
    entry.state = st;
    entry.whereNow = where;
    entry.location = where.loc;
    entry.spot = where.kind === 'stay' && st.spot ? { loc: st.loc, x: st.spot.x, y: st.spot.y } : null;
    if (where.kind === 'road') road.push(entry);
    else groups[where.loc].push(entry);
    if (!st.trip) nextDeparture = Math.min(nextDeparture, st.until);
  });
  kingdomTravelSave();
  return { groups: groups, road: road, nextDeparture: nextDeparture };
}

function kingdomDurationText(ms) {
  var minutes = Math.max(1, Math.round(ms / 60000));
  if (minutes < 60) return minutes + (minutes === 1 ? ' minute' : ' minutes');
  var hours = Math.round(minutes / 60);
  if (hours < 36) return hours + (hours === 1 ? ' hour' : ' hours');
  var days = Math.round(hours / 24);
  return days + (days === 1 ? ' day' : ' days');
}

/* ---- Town map: districts, paths, and the Pokemon walking between them ----- */

function kingdomTownEdges() {
  var edges = [];
  KINGDOM_LOCATIONS.forEach(function (loc) {
    loc.neighbors.forEach(function (id) {
      if (loc.id < id) edges.push([loc.id, id]);
    });
  });
  return edges;
}

function kingdomTownMapHtml(census) {
  var h = '<div class="kingdom-town-map panel"><div class="kingdom-map-title">' +
    '<b>Pokémon Town</b><span>Residents come and go along these paths all day and night.</span>' +
    '<em id="kingdom-road-count" class="kingdom-road-count"></em></div>' +
    '<div class="kingdom-map-board"><svg class="kingdom-map-roads" viewBox="0 0 100 100" ' +
    'preserveAspectRatio="none" aria-hidden="true">';
  kingdomTownEdges().forEach(function (edge) {
    var a = kingdomLocation(edge[0]).map, b = kingdomLocation(edge[1]).map;
    h += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"></line>';
  });
  h += '</svg><div id="kingdom-map-walkers" class="kingdom-map-walkers" aria-hidden="true"></div>';
  KINGDOM_LOCATIONS.forEach(function (loc) {
    h += '<button class="kingdom-map-node' + (loc.id === KINGDOM_LOCATION ? ' current' : '') +
      '" style="left:' + loc.map.x + '%;top:' + loc.map.y + '%" data-kingdom-loc="' + loc.id +
      '" onclick="kingdomGo(\'' + loc.id + '\')"><span>' + loc.icon + '</span>' +
      '<b>' + esc(loc.short) + '</b><small>' + census.groups[loc.id].length + '</small></button>';
  });
  return h + '</div></div>';
}

function kingdomDrawMapWalkers(census, now) {
  var layer = $('#kingdom-map-walkers');
  if (!layer) return;
  var count = $('#kingdom-road-count');
  if (count) {
    count.textContent = census.road.length ? '🐾 ' + census.road.length + ' on the road' : '';
  }
  var seen = {};
  census.road.slice(0, 40).forEach(function (entry) {
    var key = kingdomPlacementKey(entry);
    var where = entry.whereNow;
    var a = kingdomLocation(where.leg.from).map, b = kingdomLocation(where.leg.to).map;
    var p = Math.max(0, Math.min(1, (now + 1000 - where.leg.start) / Math.max(1, where.leg.end - where.leg.start)));
    var el = layer.querySelector('[data-walker="' + key + '"]');
    if (!el) {
      el = document.createElement('img');
      el.setAttribute('data-walker', key);
      el.alt = '';
      el.draggable = false;
      el.src = monSprite(entry.mon, entry.mon.shiny ? 'shiny' : 'front');
      el.style.left = a.x + '%';
      el.style.top = a.y + '%';
      layer.appendChild(el);
      void el.offsetWidth;
    }
    el.classList.toggle('face-left', b.x < a.x);
    /* Keep walkers on the visible stretch of road between the two buttons. */
    p = .14 + p * .72;
    el.style.left = (a.x + (b.x - a.x) * p).toFixed(2) + '%';
    el.style.top = (a.y + (b.y - a.y) * p).toFixed(2) + '%';
    el.title = monName(entry.mon) + ' → ' + kingdomLocation(where.leg.to).name;
    seen[key] = true;
  });
  Array.prototype.slice.call(layer.children).forEach(function (el) {
    if (!seen[el.getAttribute('data-walker')]) el.remove();
  });
}
