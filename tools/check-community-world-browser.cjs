const { chromium } = require('./playwright.cjs');

let browser;
(async () => {
  browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://127.0.0.1:8780/', { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(() => {
    S = freshSave();
    S.party = [makeMon(1, 10)];
    bindProgress('c');
    ensureFriends(); ensureBag(); ensureTown(); ensureHumanWorld();

    const sceneIds = Object.keys(HUMAN_WORLD_SCENES);
    const reached = new Set(['square']);
    const queue = ['square'];
    while (queue.length) {
      const id = queue.shift();
      (HUMAN_WORLD_SCENES[id].portals || []).forEach(portal => {
        if (!reached.has(portal.to)) { reached.add(portal.to); queue.push(portal.to); }
      });
    }

    const sceneFailures = [];
    for (const id of sceneIds) {
      const scene = HUMAN_WORLD_SCENES[id];
      const firstSpawn = Object.keys(scene.spawns)[0];
      humanGo(id, firstSpawn);
      const background = document.getElementById('human-stage').style.backgroundImage;
      if (!background.includes(scene.image.split('/').pop())) sceneFailures.push(id + ': background');
      const expectedHomes = COMMUNITY_HOMES.filter(home => home.scene === id).length;
      const actualHomes = document.querySelectorAll('.human-home').length;
      if (actualHomes !== expectedHomes) sceneFailures.push(id + ': homes ' + actualHomes + '/' + expectedHomes);
      const expectedBuildings = COMMUNITY_BUILDINGS.filter(building => building.scene === id).length;
      const actualBuildings = document.querySelectorAll('.human-building').length;
      if (actualBuildings !== expectedBuildings) sceneFailures.push(id + ': buildings ' + actualBuildings + '/' + expectedBuildings);
    }

    humanGo('residence', 'door');
    const home = COMMUNITY_HOMES.find(row => row.id === 'nurse-house');
    HUMAN_PLAYER.x = home.doorstep[0]; HUMAN_PLAYER.y = home.doorstep[1];
    humanPaint(HUMAN_PLAYER, true); humanUpdateNearby(); humanActivateNearby();
    const dialogue = document.getElementById('human-dialogue').textContent;

    humanGo('pier', 'south');
    const mill = COMMUNITY_BUILDINGS.find(row => row.id === 'pier-watermill');
    HUMAN_PLAYER.x = mill.doorstep[0]; HUMAN_PLAYER.y = mill.doorstep[1];
    humanPaint(HUMAN_PLAYER, true); humanUpdateNearby(); humanActivateNearby();
    const buildingDialogue = document.getElementById('human-dialogue').textContent;
    humanCloseDialogue();
    humanOpenTownMap();
    const mapNodes = document.querySelectorAll('.human-town-map-node').length;
    const mapEdges = document.querySelectorAll('.human-town-map-canvas line').length;
    const mapBackground = document.querySelector('.human-town-map-canvas').style.backgroundImage;

    return {
      sceneCount: sceneIds.length,
      reachedCount: reached.size,
      sceneFailures,
      homeButtons: document.querySelectorAll('.human-home').length,
      nurseHouseVisited: dialogue.includes('Nurse House') && dialogue.includes('Nurse Ada') && dialogue.includes('Nurse Marek'),
      publicBuildingVisited: buildingDialogue.includes('Riverside Watermill'),
      mapNodes, mapEdges,
      mapLoaded: mapBackground.includes('bootstrap-town-community-map-v1.png')
    };
  });

  if (result.sceneCount !== 18 || result.reachedCount !== 18) throw new Error('Scene graph is not fully connected: ' + JSON.stringify(result));
  if (result.sceneFailures.length) throw new Error('Scene render failures: ' + result.sceneFailures.join(', '));
  if (!result.nurseHouseVisited) throw new Error('Nurse House could not be visited: ' + JSON.stringify(result));
  if (!result.publicBuildingVisited) throw new Error('Public building could not be visited: ' + JSON.stringify(result));
  if (result.mapNodes !== 14 || result.mapEdges !== 18 || !result.mapLoaded) throw new Error('Town map is incomplete: ' + JSON.stringify(result));
  if (errors.length) throw new Error('Browser errors: ' + errors.join(' | '));

  await browser.close();
  console.log('PASS: all 18 scenes render in one connected graph; every home/public building is visitable; the 14-district town map is complete');
})().catch(async error => {
  console.error(error.stack || error);
  if (browser) await browser.close();
  process.exitCode = 1;
});
