/* Static navigation audit for Bootstrap Town.
   Proves, without a browser, that every place a person is sent is open ground,
   that each one can walk there from the door, and that no two people are ever
   told to stand in the same spot at the same time (clear weather and rain). */
const path = require('path');

global.window = global;
require('../js/data/townsfolk.js');
require('../js/data/trainers.js');
require('../js/data/community-housing.js');
require('../js/data/human-world.js');
require('../js/data/human-world-nav.js');
const nav = require('../js/engine/human-world-nav.js');

const failures = [];
function fail(message) { failures.push(message); }

// A body is ~3.5% of the stage wide and ~9% tall. Closer than this and one sprite covers the other;
// a little head-over-feet overlap further apart is normal depth-sorted top-down staging.
const MIN_DX = 5, MIN_DY = 7;
const OUTDOOR_SHELTER = ['practicing', 'reading', 'lunch', 'watering'];
const npcIds = Object.keys(HUMAN_WORLD_NPCS);

function sceneLinks(scene) {
  return ((scene.nav && scene.nav.links) || []).map(pair => pair.map(name => {
    const p = scene.spawns[name]; return { x: p[0], y: p[1] };
  }));
}

function entryFor(sceneId) {
  const scene = HUMAN_WORLD_SCENES[sceneId];
  const first = sceneId === 'square' ? scene.spawns.southGate : (scene.spawns.door || scene.spawns[Object.keys(scene.spawns)[0]]);
  return { x: first[0], y: first[1] };
}

function reachable(sceneId, point, label) {
  const scene = HUMAN_WORLD_SCENES[sceneId];
  if (!nav.humanNavOpen(sceneId, point.x, point.y, true)) fail(`${label} (${point.x}, ${point.y}) in ${sceneId} is not clear open ground`);
  const route = nav.humanNavPath(sceneId, entryFor(sceneId), point, { links: sceneLinks(scene) });
  if (!route) fail(`${label} (${point.x}, ${point.y}) cannot be reached from the ${sceneId} entrance`);
}

for (const [sceneId, scene] of Object.entries(HUMAN_WORLD_SCENES)) {
  if (!HUMAN_WORLD_NAV[sceneId]) { fail(`Scene ${sceneId} has no walk grid`); continue; }
  if (HUMAN_WORLD_NAV[sceneId].length !== 90 || HUMAN_WORLD_NAV[sceneId].some(row => row.length !== 160)) fail(`Walk grid for ${sceneId} is not 160x90`);
  for (const [name, p] of Object.entries(scene.spawns)) {
    if (!nav.humanNavOpen(sceneId, p[0], p[1], false)) fail(`Spawn ${sceneId}:${name} is not walkable`);
    const route = nav.humanNavPath(sceneId, entryFor(sceneId), { x: p[0], y: p[1] }, { strict: false, links: sceneLinks(scene) });
    if (!route) fail(`Spawn ${sceneId}:${name} is cut off from the entrance`);
  }
  for (const portal of scene.portals || []) {
    if (!nav.humanNavOpen(sceneId, portal.x, portal.y, false)) fail(`Portal ${sceneId}:${portal.id} is not on exact player-walkable ground`);
    if (!nav.humanNavOpen(sceneId, portal.x, portal.y, true)) fail(`Portal ${sceneId}:${portal.id} is not on exact NPC-walkable ground`);
    if (!nav.humanNavPath(sceneId, entryFor(sceneId), { x:portal.x, y:portal.y }, { strict:false, links:sceneLinks(scene) })) fail(`Portal ${sceneId}:${portal.id} is cut off from the entrance`);
  }
}

// Every visible home marker is a real gameplay destination. Both player and
// schedule-sized routing must be able to reach its doorstep from the scene entry.
for (const home of COMMUNITY_HOMES) {
  const point = { x: home.doorstep[0], y: home.doorstep[1] };
  if (!nav.humanNavOpen(home.scene, point.x, point.y, false)) fail(`Home ${home.id} doorstep is not player-walkable`);
  if (!nav.humanNavOpen(home.scene, point.x, point.y, true)) fail(`Home ${home.id} doorstep is not NPC-walkable`);
  if (!nav.humanNavPath(home.scene, entryFor(home.scene), point, { strict: false })) fail(`Player cannot reach home ${home.id}`);
  if (!nav.humanNavPath(home.scene, entryFor(home.scene), point, { strict: true })) fail(`NPC cannot reach home ${home.id}`);
}

for (const building of COMMUNITY_BUILDINGS) {
  const point = { x: building.doorstep[0], y: building.doorstep[1] };
  if (!nav.humanNavOpen(building.scene, point.x, point.y, false)) fail(`Building ${building.id} approach is not player-walkable`);
  if (!nav.humanNavOpen(building.scene, point.x, point.y, true)) fail(`Building ${building.id} approach is not NPC-walkable`);
  if (!nav.humanNavPath(building.scene, entryFor(building.scene), point, { strict: false, links:sceneLinks(HUMAN_WORLD_SCENES[building.scene]) })) fail(`Player cannot reach building ${building.id}`);
  if (!nav.humanNavPath(building.scene, entryFor(building.scene), point, { strict: true, links:sceneLinks(HUMAN_WORLD_SCENES[building.scene]) })) fail(`NPC cannot reach building ${building.id}`);
}

// No island of apparently walkable ground is allowed. Flood-fill both player
// and NPC grids from the scene entrance, including authored links such as the
// practice-field stile, and require every open cell to belong to that component.
function assertGridConnected(sceneId, strict) {
  const scene = HUMAN_WORLD_SCENES[sceneId], grids = nav.humanNavGrids(sceneId);
  const grid = strict ? grids.clear : grids.feet, W = 160, H = 90;
  const first = entryFor(sceneId);
  const start = nav.humanNavNearest(sceneId, first.x, first.y, strict);
  const startCell = { i: Math.floor(start.x / 100 * W), j: Math.floor(start.y / 100 * H) };
  const queue = [startCell.j * W + startCell.i], seen = new Uint8Array(W * H);
  seen[queue[0]] = 1;
  const jumps = {};
  sceneLinks(scene).forEach(link => {
    const points = link.map(point => nav.humanNavNearest(sceneId, point.x, point.y, strict));
    const keys = points.map(point => Math.floor(point.y / 100 * H) * W + Math.floor(point.x / 100 * W));
    (jumps[keys[0]] = jumps[keys[0]] || []).push(keys[1]);
    (jumps[keys[1]] = jumps[keys[1]] || []).push(keys[0]);
  });
  for (let at = 0; at < queue.length; at++) {
    const key = queue[at], x = key % W, y = Math.floor(key / W);
    for (const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nx=x+dx, ny=y+dy, next=ny*W+nx;
      if (nx>=0 && nx<W && ny>=0 && ny<H && grid[next] && !seen[next]) { seen[next]=1; queue.push(next); }
    }
    (jumps[key] || []).forEach(next => { if (grid[next] && !seen[next]) { seen[next]=1; queue.push(next); } });
  }
  let open = 0, reached = 0;
  grid.forEach((value, index) => { if (value) { open++; if (seen[index]) reached++; } });
  if (open !== reached) fail(`${sceneId} has ${open - reached} unreachable ${strict ? 'NPC' : 'player'} walk cells`);
}
Object.keys(HUMAN_WORLD_SCENES).forEach(sceneId => { assertGridConnected(sceneId, false); assertGridConnected(sceneId, true); });

// Every schedule spot, and every rain shelter spot.
function stateAt(id, minute, weather) {
  const npc = HUMAN_WORLD_NPCS[id];
  const index = npc.schedule.findIndex(row => minute >= row[0] && minute < row[1]);
  const row = npc.schedule[index];
  const state = { scene: row[2], x: row[3], y: row[4], activity: row[5] };
  if (weather === 'rain' && state.scene === 'square' && OUTDOOR_SHELTER.includes(state.activity) && id !== 'postie') {
    const spot = HUMAN_WORLD_RAIN_SPOTS[npcIds.indexOf(id)];
    Object.assign(state, { scene: 'center', x: spot[0], y: spot[1], activity: 'sheltering' });
  }
  return state;
}

for (const id of npcIds) {
  const npc = HUMAN_WORLD_NPCS[id];
  npc.schedule.forEach(row => reachable(row[2], { x: row[3], y: row[4] }, `${npc.name} at ${row[0]}`));
  if (!HUMAN_WORLD_RAIN_SPOTS[npcIds.indexOf(id)]) fail(`${npc.name} has no rain shelter spot`);
}
HUMAN_WORLD_RAIN_SPOTS.forEach((p, i) => reachable('center', { x: p[0], y: p[1] }, `Rain spot ${i}`));

for (const weather of ['clear', 'rain']) {
  for (let minute = 360; minute < 1440; minute++) {
    const states = npcIds.map(id => [id, stateAt(id, minute, weather)]);
    for (let a = 0; a < states.length; a++) for (let b = a + 1; b < states.length; b++) {
      const [ia, sa] = states[a], [ib, sb] = states[b];
      if (sa.scene !== sb.scene) continue;
      if (Math.abs(sa.x - sb.x) < MIN_DX && Math.abs(sa.y - sb.y) < MIN_DY) {
        fail(`${HUMAN_WORLD_NPCS[ia].name} and ${HUMAN_WORLD_NPCS[ib].name} overlap in ${sa.scene} at minute ${minute} (${weather})`);
        minute = Math.max(minute, Math.min(HUMAN_WORLD_NPCS[ia].schedule.find(r => minute < r[1])[1], HUMAN_WORLD_NPCS[ib].schedule.find(r => minute < r[1])[1]) - 1);
      }
    }
  }
}

// Activity objects must sit on ground the player can reach.
const defs = HUMAN_WORLD_ACTIVITY_DEFS;
defs.warmup.markers.forEach((p, i) => reachable('square', { x: p[0], y: p[1] }, `Warm-up marker ${i + 1}`));
defs.restock.crates.forEach((p, i) => reachable('mart', { x: p[0], y: p[1] }, `Restock crate ${i + 1}`));
reachable('mart', { x: defs.restock.shelf[0], y: defs.restock.shelf[1] }, 'Restock shelf');

// Boundaries: feet never stand on furniture, walls or buildings, and every painted path stays walkable.
const SOLID = {
  home: [[18, 35, 'bed'], [45.5, 32, 'desk chair'], [50, 25, 'desk'], [88, 35, 'wardrobe'], [11, 65, 'nightstand'],
         [19, 72, 'floor cushion'], [89.5, 68, 'flower pot'], [3, 60, 'west wall'], [96, 60, 'east wall'],
         [25, 83, 'south wall'], [40.5, 85, 'door post'], [35, 84, 'wall planter'], [50, 20, 'north wall']],
  mart: [[50, 35, 'counter'], [35, 56, 'potion display'], [65, 56, 'supply display'], [14, 30, 'shelving'],
         [12, 60, 'crates'], [86, 30, 'shelving'], [10, 75, 'plant barrel'], [30, 86, 'south wall']],
  center: [[50, 38, 'nurse counter'], [26.5, 30, 'PC terminal'], [72, 30, 'healing machine'], [10.5, 56, 'bench'],
           [88, 56, 'bench'], [9.5, 73, 'planter']],
  lab: [[50, 53, 'starter table'], [50, 37, 'desk chair'], [15, 30, 'bookshelf'], [11, 58, 'plant'], [90, 65, 'plant']],
  square: [[22, 15, 'Poké Centre'], [52, 15, 'Poké Mart'], [52, 42, 'noticeboard'], [41.5, 40, 'bench'], [62, 40, 'bench'],
           [61, 24, 'chalkboard'], [45.5, 74, 'gate lamp post'], [54, 74, 'gate lamp post'], [14.5, 38.5, 'water barrel'],
           [10.5, 40, 'planter'], [19.6, 43.5, 'stile rock'], [16, 45.5, 'field fence'], [25, 48, 'field fence'],
           [18, 66.5, 'field fence'], [83, 53, 'flower-bed fence'], [80, 80, 'pond'], [90, 20, 'forest'], [30, 85, 'forest'],
           [25.5, 53, 'field grass outside the court'], [35, 41, 'west bench garden'], [67, 38, 'east bench garden']]
};
const PATH = {
  home: [[50, 55, 'rug'], [18, 54, 'foot of the bed'], [50, 86, 'doormat']],
  mart: [[50, 55, 'aisle'], [22, 55, 'crate corner'], [78, 55, 'shelf corner']],
  center: [[50, 60, 'waiting floor'], [30, 45, 'in front of the terminal']],
  lab: [[50, 70, 'floor'], [25, 50, 'west aisle']],
  square: [[50, 90, 'south path'], [22, 36, 'Centre path'], [52, 32, 'Mart cobbles'], [50, 60, 'noticeboard cobbles'],
           [36, 27.2, 'Centre path by the west lamp'], [67, 28, 'lab path by the east lamp'], [75, 38, 'lab path'],
           [86.5, 47, 'Cottage Row steps'], [15, 57, 'practice court'], [87, 76, 'bridge deck'], [92, 90, 'far side of the bridge'],
           [17, 41.8, 'your doorstep path'], [80, 62, 'path to the bridge']]
};
for (const [sceneId, points] of Object.entries(SOLID)) points.forEach(([x, y, what]) => {
  if (nav.humanNavOpen(sceneId, x, y, false)) fail(`Feet can stand on the ${what} (${x}, ${y}) in ${sceneId}`);
});
for (const [sceneId, points] of Object.entries(PATH)) points.forEach(([x, y, what]) => {
  if (!nav.humanNavOpen(sceneId, x, y, false)) fail(`The ${what} (${x}, ${y}) in ${sceneId} is not walkable`);
  const scene = HUMAN_WORLD_SCENES[sceneId];
  if (!nav.humanNavPath(sceneId, entryFor(sceneId), { x, y }, { strict: false, links: sceneLinks(scene) })) fail(`The ${what} in ${sceneId} is cut off`);
});

// Deterministic routing: the same request must give the same waypoints every time.
const a = JSON.stringify(nav.humanNavPath('square', entryFor('square'), { x: 78.5, y: 32 }));
const b = JSON.stringify(nav.humanNavPath('square', entryFor('square'), { x: 78.5, y: 32 }));
if (a !== b) fail('Route planning is not deterministic');

if (failures.length) {
  console.error(failures.map(f => 'FAIL: ' + f).join('\n'));
  process.exit(1);
}
console.log(`PASS: ${path.basename(__filename)} — every walk cell, portal, schedule spot, ${COMMUNITY_HOMES.length} homes and ${COMMUNITY_BUILDINGS.length} public buildings are reachable`);
