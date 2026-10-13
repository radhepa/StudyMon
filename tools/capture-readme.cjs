/* Fresh README screenshots from the shipped app, in disposable browser storage.
   Start the local server, then run:
     node tools/capture-readme.cjs http://127.0.0.1:8777/ [main|labs|extras]
   No player profile or question bank is changed. */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { chromium } = require('./playwright.cjs');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'docs', 'screenshots');
const url = process.argv[2] || 'http://127.0.0.1:8777/';
const part = process.argv[3] || 'all';

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true,
    executablePath: process.env.STUDYMON_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [], failedAssets = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) failedAssets.push(r.url() + ' ' + r.status()); });
  async function settle() {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].filter(i => i.getBoundingClientRect().top < innerHeight &&
        i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().width > 0).map(i =>
        i.complete ? Promise.resolve() : new Promise(resolve => { i.onload = resolve; i.onerror = resolve; })));
    });
    await page.waitForTimeout(200);
  }
  async function shot(name, selector) {
    await settle();
    const options = name.endsWith('.jpg') ? { type: 'jpeg', quality: 90 } : { type: 'png' };
    const bytes = selector ? await page.locator(selector).screenshot(options) : await page.screenshot(options);
    // A Windows image preview may briefly hold the old file while it reloads.
    for (let attempt = 0; ; attempt++) {
      try { fs.writeFileSync(path.join(out, name), bytes); break; }
      catch (error) { if (attempt >= 3) throw error; await page.waitForTimeout(300); }
    }
    console.log('CAPTURE ' + name);
  }
  async function reset() {
    await page.evaluate(() => {
      closeModal(); radioClosePanel(false); pokedoroClosePanel(false);
      S = freshSave(); activateSave(S); bindProgress('c'); S.settings.sound = false;
      S.trainer = 'RADHE'; S.money = 3250; S.streak = 4; S.bestStreak = 12;
      S.party = [6, 25, 448, 131, 94, 1026].map((id, i) => makeMon(id, 26 + i));
      S.box = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 16, 18, 26, 37, 39, 52, 54, 58, 63, 65,
        133, 134, 135, 136, 147, 149, 172, 174, 298, 447, 1027, 1028, 1044, 1045, 1046].map(id => makeMon(id, 18));
      S.party.concat(S.box).forEach(m => { S.caught[m.id] = true; S.seen[m.id] = true; });
      [11, 13, 14, 15, 17, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30].forEach(id => { S.seen[id] = true; });
      S.badges = { 1: true, 2: true, 3: true };
      S.clock = 300; S.totals = { r: 232, w: 68, battles: 48, wins: 39, caught: S.party.length + S.box.length };
      Object.keys(QBANK).forEach((n, i) => {
        if (i >= 9) return;
        const r = 8 + i * 2, w = 2 + (i * 3) % 8;
        S.chapterStats[n] = { r, w };
        QBANK[n].slice(0, r + w).forEach((q, j) => {
          S.srs[q.id] = { box: j < w ? 1 : 2 + j % 4, due: j < w ? 295 : 315 + j, r: j < w ? 0 : 2, w: j < w ? 1 : 0 };
        });
      });
      ensureBag(); giveItem('great', 12); giveItem('ultra', 5);
      LAB_SCENE_TYPE_MS = 0; KINGDOM_MUSIC_ON = false; KINGDOM_RAIN_SOUND = false;
      WILD_TRIP = null; clearLog();
      saveGame(); showScreen('map'); renderMap();
      const toastBox = document.querySelector('#toast'); toastBox.classList.remove('on');
    });
  }
  try {
    await page.goto(url);
    await page.waitForFunction(() => typeof freshSave === 'function' && installSubjects.done);
    const facts = await page.evaluate(() => ({
      species: DEX.length, originals: DEX.filter(d => d.id > 1025).length,
      questions: Object.fromEntries(Object.entries(SUBJECTS).map(([k, v]) => [k, Object.values(v.QBANK).flat().length])),
      chapters: Object.fromEntries(Object.entries(SUBJECTS).map(([k, v]) => [k, v.CHAPTERS.length])),
      quests: SIDE_QUESTS.filter(q => q.published).length,
      difficulties: SIDE_QUESTS.filter(q => q.published).reduce((a, q) => { a[q.difficulty] = (a[q.difficulty] || 0) + 1; return a; }, {}),
      midtermLabs: SIDE_QUESTS.filter(q => q.published && q.collection === 'midterm-review').length,
      labScenes: Object.values(LAB_SCENES).reduce((n, pair) => n + Number(!!pair.open) + Number(!!pair.close), 0),
      radioSongs: radioSongs().length, starters: STARTERS.length,
      districts: KINGDOM_LOCATIONS.length, townEnabled: TOWN_UI_ENABLED,
      midtermQuestions: (() => { S = freshSave(); bindProgress('c'); return routeQuestions(91).length; })(),
      midtermSpecies: routeSpecies(C_REVISION_ROUTES[0]).length
    }));
    console.log('FACTS ' + JSON.stringify(facts));
    if (part === 'all' || part === 'main') {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.evaluate(() => { localStorage.removeItem(SAVE_KEY); showScreen('title'); renderTitle(); });
      await page.waitForFunction(() => !document.querySelector('.title-mons').classList.contains('pending'));
      await shot('banner.png');
      await page.setViewportSize({ width: 1280, height: 1000 });
      await reset(); await shot('map.jpg');
      await page.evaluate(() => {
        const card = document.querySelector('.midterm-route');
        window.scrollTo(0, Math.max(0, card.getBoundingClientRect().top + scrollY - 290));
      });
      await shot('midterm.jpg');
      await page.setViewportSize({ width: 1024, height: 1400 });
      await page.evaluate(() => {
        startBattle({ kind: 'wild', chapters: [9], foes: [makeMon(93, 28)], chapter: chapterByNumber(9), title: chapterByNumber(9).route });
        chooseMove(1);
        B.q = QBANK[9].find(q => q.k === 'mcq' && q.code && q.q.length < 150 && q.code.length < 180);
        B.pendingMove = movesOf(B.you).find(m => m.tier === B.q.t && !m.locked);
        B.choiceOrder = null; B.choiceOrderQuestion = null; renderQuestion(); window.scrollTo(0, 0);
      });
      await shot('battle-c.jpg');
      await page.setViewportSize({ width: 1280, height: 1000 });
      await reset();
      await page.evaluate(() => { showScreen('study'); STUDY_CH = 9; renderStudy(); });
      await shot('notes.jpg');
      await reset();
      await page.evaluate(() => { showScreen('stats'); renderStats(); });
      await shot('stats.jpg');
      await reset();
      await page.evaluate(() => mockExam(25));
      await shot('exam.jpg');
      await reset();
      await page.evaluate(() => openRouteInfo(1));
      await shot('route.jpg', '#modal .box');
      await reset();
      await page.evaluate(() => { showScreen('dex'); renderDex(); });
      await shot('dex.jpg');
      await reset();
      await page.evaluate(() => { showScreen('party'); renderParty(); });
      await shot('party.jpg');
      await reset();
      await page.evaluate(() => { sailTo('calc'); document.querySelector('#toast').classList.remove('on'); });
      await shot('calc-map.jpg');
      await page.setViewportSize({ width: 1024, height: 1950 });
      await page.evaluate(() => {
        startBattle({ kind: 'wild', chapters: [4], foes: [makeMon(181, 28)], chapter: chapterByNumber(4), title: chapterByNumber(4).route });
        chooseMove(1);
        B.q = QBANK[4].find(q => q.k === 'mcq' && !q.selfCheck && q.hints && q.hints.length && q.q.length < 220) ||
          QBANK[4].find(q => q.k === 'mcq' && !q.selfCheck && q.q.length < 170 && q.why.length < 650);
        B.pendingMove = movesOf(B.you).find(m => m.tier === B.q.t && !m.locked) || B.pendingMove;
        B.choiceOrder = null; B.choiceOrderQuestion = null; renderQuestion(); answer((B.q.a + 1) % B.q.c.length);
        window.scrollTo(0, 0);
      });
      await shot('battle-calc.jpg');
      await reset();
      await page.setViewportSize({ width: 390, height: 844 });
      await shot('mobile.jpg');
    }
    if (part === 'all' || part === 'extras') {
      await page.setViewportSize({ width: 1280, height: 1000 });
      await reset();
      await page.evaluate(() => { S.party = [makeMon(1026, 26)]; S.box = DEX.filter(d => d.id > 1025).map(d => makeMon(d.id, 18)); showScreen('party'); renderParty(); });
      await shot('originals.png');
      await reset();
      await page.evaluate(() => { showScreen('kingdom'); KINGDOM_LOCATION = 'market'; renderKingdom(); });
      await page.waitForTimeout(1000);
      await shot('kingdom-map.jpg');
      await page.setViewportSize({ width: 1280, height: 1700 });
      await shot('kingdom.jpg', '.kingdom-frame');
      await page.setViewportSize({ width: 1280, height: 1000 });
      await reset();
      await page.evaluate(() => radioOpenPanel());
      await shot('radio.jpg', '#radio-panel');
      await page.evaluate(() => { radioClosePanel(false); pokedoroOpenPanel(); });
      await shot('pokedoro.jpg', '#pokedoro-panel');
      await reset();
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.evaluate(() => { FERRY_VOYAGE_MS = 6000; ferrySail('calc'); });
      await page.waitForTimeout(3000);
      await shot('ferry.jpg', '.fv-card');
      await page.waitForFunction(() => !FERRY_SAILING, null, { timeout: 20000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
    }
    if (part === 'all' || part === 'labs') {
      await page.setViewportSize({ width: 1280, height: 1000 });
      await reset();
      await page.evaluate(() => openSideQuests());
      await shot('quests.jpg');
      await page.evaluate(() => playLabScene('c-lab-02', 'open', { replay: true }));
      await shot('labscene.jpg');
      await page.evaluate(() => closeLabScene(true));
      const refs = JSON.parse(fs.readFileSync(path.join(root, 'tools', 'quest-reference-fixtures.json'), 'utf8'));
      const source = '#include <stdio.h>\n\nint main(void) {\n' +
        '    int potions, berries;\n' +
        '    if (scanf("%d%d", &potions, &berries) != 2 ||\n' +
        '        potions < 0 || potions > 99 || berries < 0 || berries > 99) {\n' +
        '        puts("ERROR");\n        return 0;\n    }\n' +
        '    int cents = 200 * potions + 300 * berries;\n' +
        '    printf("Total: $%d.%02d\\n", cents / 100, cents % 100);\n' +
        '    return 0;\n}\n';
      assert(refs['c-lab-02'], 'capture uses an existing graded lab');
      await page.evaluate(source => {
        openSideQuest('c-lab-02'); sideQuestProgress('c-lab-02').draft = source;
        renderSideQuest(); runQuestCode(true);
      }, source);
      await page.waitForFunction(() => !C_JOB, null, { timeout: 180000 });
      await page.setViewportSize({ width: 1280, height: 1550 });
      const grade = await page.evaluate(() => {
        closeLabScene(true); openSideQuest('c-lab-02');
        const g = sideQuestProgress('c-lab-02').lastGrade;
        const workspace = document.querySelector('.sq-workspace');
        window.scrollTo(0, workspace.getBoundingClientRect().top + scrollY - 20);
        return g && { passed: g.passed, total: g.total };
      });
      assert(grade && grade.passed === grade.total && grade.total > 0, 'real reference submission must pass');
      console.log('GRADE ' + JSON.stringify(grade));
      await shot('editor.jpg');
    }
    assert.deepStrictEqual(errors, [], 'page JavaScript errors');
    assert.deepStrictEqual(failedAssets, [], 'missing app assets');
    console.log('PASS screenshots captured without page errors or missing assets');
  } finally { await context.close(); await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
