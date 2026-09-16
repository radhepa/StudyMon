const fs = require('fs');
const path = require('path');

global.window = global;
require('../js/data/townsfolk.js');
require('../js/data/trainers.js');
require('../js/data/community-housing.js');
require('../js/data/human-world.js');

function assert(ok, message) {
  if (!ok) throw new Error(message);
}

const root = path.resolve(__dirname, '..');
const scenes = Object.values(HUMAN_WORLD_SCENES);
const npcs = Object.values(HUMAN_WORLD_NPCS);

assert(scenes.length === 18, 'Connected Bootstrap world should have exactly eighteen scenes');
assert(npcs.length === 9, 'Bootstrap prototype should have exactly nine residents');
assert(Object.keys(HUMAN_WORLD_ACTIVITY_DEFS).length === 3, 'Expected three reusable activities');

const communityIds = TOWNSFOLK.map(person => person.id).concat(TRAINERS.map(person => person.id));
const housedIds = COMMUNITY_HOMES.flatMap(home => home.residents);
assert(communityIds.length === 84, 'Expected the existing 84-person community');
assert(new Set(housedIds).size === housedIds.length, 'A community member has been assigned to two homes');
assert(housedIds.length === communityIds.length, 'Housing registry does not contain exactly 84 residents');
communityIds.forEach(id => assert(VILLAGER_HOME[id], `Community member ${id} has no home`));
COMMUNITY_HOMES.forEach(home => {
  assert(HUMAN_WORLD_SCENES[home.scene], `Home ${home.id} has invalid scene ${home.scene}`);
  assert(home.doorstep && home.doorstep.length === 2, `Home ${home.id} has no doorstep`);
});
COMMUNITY_BUILDINGS.forEach(building => {
  assert(HUMAN_WORLD_SCENES[building.scene], `Building ${building.id} has invalid scene ${building.scene}`);
  assert(building.doorstep && building.doorstep.length === 2, `Building ${building.id} has no doorstep`);
  assert(building.description, `Building ${building.id} has no interaction description`);
});
const nurseIds = ['nurse','nurse-cafe','nurse-meadow','nurse-pier','nurse-ridge','nurse-archive','nurse-lab','nurse-cavern','nurse-quarter'];
const nurseHouse = COMMUNITY_HOMES.find(home => home.id === 'nurse-house');
assert(nurseHouse && nurseIds.every(id => nurseHouse.residents.includes(id)), 'The full nurse family does not share Nurse House');

for (const scene of scenes) {
  assert(fs.existsSync(path.join(root, scene.image)), `Missing scene art: ${scene.image}`);
  assert(scene.nav && scene.nav.areas && scene.nav.areas.length, `Scene ${scene.id} has no walkable area`);
  assert(scene.spawns && Object.keys(scene.spawns).length, `Scene ${scene.id} has no spawn`);
  for (const portal of scene.portals || []) {
    assert(HUMAN_WORLD_SCENES[portal.to], `Portal ${scene.id}:${portal.id} has an invalid destination`);
    assert(HUMAN_WORLD_SCENES[portal.to].spawns[portal.spawn], `Portal ${scene.id}:${portal.id} has an invalid spawn`);
  }
}

const outdoorSceneIds = scenes.filter(scene => !scene.indoors).map(scene => scene.id).sort();
const mapNodeIds = HUMAN_TOWN_MAP.nodes.map(node => node.id).sort();
assert(JSON.stringify(outdoorSceneIds) === JSON.stringify(mapNodeIds), 'Town map must contain every outdoor scene exactly once');
assert(fs.existsSync(path.join(root, HUMAN_TOWN_MAP.image)), `Missing town map art: ${HUMAN_TOWN_MAP.image}`);
HUMAN_TOWN_MAP.edges.forEach(edge => {
  const a = HUMAN_WORLD_SCENES[edge[0]], b = HUMAN_WORLD_SCENES[edge[1]];
  assert(a && b, `Town map edge ${edge.join(' -> ')} has an invalid scene`);
  assert(a.portals.some(portal => portal.to === b.id), `Town map edge ${edge.join(' -> ')} does not exist in gameplay`);
  assert(b.portals.some(portal => portal.to === a.id), `Town map edge ${edge.slice().reverse().join(' -> ')} does not exist in gameplay`);
});

for (const npc of npcs) {
  assert(npc.services.includes('chat'), `${npc.name} cannot chat`);
  assert(npc.sprite || npc.front, `${npc.name} has no overworld art`);
  if (npc.front) assert(fs.existsSync(path.join(root, npc.front)), `Missing sprite: ${npc.front}`);
  let cursor = 360;
  for (const row of npc.schedule) {
    assert(row[0] === cursor, `${npc.name} schedule gap/overlap at ${cursor}`);
    assert(row[1] > row[0], `${npc.name} has an empty schedule block`);
    assert(HUMAN_WORLD_SCENES[row[2]], `${npc.name} has invalid scene ${row[2]}`);
    assert(row[3] >= 0 && row[3] <= 100 && row[4] >= 0 && row[4] <= 100, `${npc.name} has invalid coordinates`);
    cursor = row[1];
  }
  assert(cursor === 1440, `${npc.name} schedule does not reach midnight`);
}

// Everyone has three real limb poses in all four directions on the same 140x120
// canvas. Figure height inside that canvas remains age-proportional.
for (const name of [...new Set(npcs.map(npc => npc.sprite).filter(Boolean)), 'player']) {
  for (const direction of ['down','up','left','right']) {
    for (let frame = 0; frame < 3; frame++) {
      const file = path.join(root, 'assets', 'humans', 'overworld', `${name}-${direction}-${frame}-v4.png`);
      assert(fs.existsSync(file), `Missing walk-cycle sprite ${path.relative(root, file)}`);
      const png = fs.readFileSync(file);
      assert(png.readUInt32BE(16) === 140 && png.readUInt32BE(20) === 120, `${path.relative(root, file)} is not a 140x120 frame`);
    }
  }
}

const byId = Object.fromEntries(npcs.map(npc => [npc.id, npc]));
assert(byId.ren.heightRatio < byId.rowan.heightRatio, 'Ren must be shorter than teenage Rowan');
assert(byId.opal.heightRatio < byId.rowan.heightRatio, 'Opal must be shorter than teenage Rowan');
assert(byId.rowan.heightRatio < byId.mart.heightRatio, 'Teenage Rowan must be shorter than adult Wren');
assert(byId.postie.heightRatio < byId.mart.heightRatio, 'Young-adult Bell should be slightly shorter than adult Wren');
assert(byId.gus.heightRatio > byId.mart.heightRatio, 'Gus should be slightly taller than adult Wren');

console.log(`PASS: ${scenes.length} connected scenes, ${COMMUNITY_HOMES.length} homes, ${COMMUNITY_BUILDINGS.length} public buildings, all ${communityIds.length} villagers and the complete town map`);
