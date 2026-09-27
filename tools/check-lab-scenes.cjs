/* Lab cutscenes: data integrity and the full opening -> lab -> closing flow.
   usage: node tools/check-lab-scenes.cjs [baseUrl]   (default http://127.0.0.1:8780/) */
const fs = require('fs');
const { chromium } = require('./playwright.cjs');

const URL = process.argv[2] || 'http://127.0.0.1:8780/';
const refs = JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json', 'utf8'));
// Labs whose scenes are still being written; empty once every lab has both.
const PENDING = Array.from({ length: 19 }, (_, i) => 'c-lab-' + (31 + i));

const results = [];
function check(name, ok, detail) { results.push({ name, ok: !!ok }); console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail !== undefined ? '  [' + detail + ']' : '')); }

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(URL);
    const fresh = () => page.evaluate(() => {
      localStorage.clear(); if (typeof closeLabScene === 'function') closeLabScene(true);
      S = freshSave(); activateSave(S); bindProgress('c'); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag();
      switchSubject('c'); document.querySelector('#nav').style.display = ''; LAB_SCENE_TYPE_MS = 0;
      document.querySelector('#nav [data-scr="quests"]').click();
    });

    // 1. Data
    const data = await page.evaluate(pending => {
      const errs = validateLabScenes().filter(e => !pending.some(id => e.startsWith(id + ': missing')));
      const labs = SIDE_QUESTS.filter(q => q.published);
      const cast = Object.keys(LAB_SCENE_CAST);
      const speakers = new Set(), givers = new Set();
      Object.values(LAB_SCENES).forEach(s => ['open', 'close'].forEach(k => s[k].beats.forEach(b => speakers.add(b.who))));
      labs.forEach(q => { const s = LAB_SCENES[q.id]; if (s) givers.add(s.open.beats[0].who); });
      const lines = [];
      Object.values(LAB_SCENES).forEach(s => ['open', 'close'].forEach(k => s[k].beats.forEach(b => lines.push(b.text))));
      const dupes = lines.filter((t, i) => lines.indexOf(t) !== i);
      return { errs, labs: labs.length, scened: labs.filter(q => LAB_SCENES[q.id]).length, cast: cast.length, speakers: speakers.size, givers: givers.size, dupes, lines: lines.length,
        generic: lines.filter(t => /^(good luck|you did it|well done)[.!]?$/i.test(t.trim())) };
    }, PENDING);
    check('every scene validates (portraits, speakers, one reward handover per ending, no em dashes)', data.errs.length === 0, data.errs.slice(0, 4).join(' | '));
    check('every published lab has an opening and a closing scene', data.scened === data.labs - PENDING.length, data.scened + '/' + data.labs);
    check('scenes use a varied cast and no line is repeated or generic', data.speakers >= (PENDING.length ? 25 : 40) && !data.dupes.length && !data.generic.length,
      data.speakers + ' speakers, ' + data.lines + ' lines, dupes ' + data.dupes.length);

    // 2. Opening scene plays from the board before the lab loads
    await fresh();
    const first = await page.evaluate(() => {
      document.querySelector('.sq-card button[onclick*="c-lab-03"]').click();
      return { on: !!document.querySelector('#lab-scene.on'), quest: QUEST_ID, editor: !!document.getElementById('sq-source'),
        speaker: document.querySelector('.lab-scene-name b').textContent, nav: getComputedStyle(document.querySelector('#nav')).pointerEvents };
    });
    check('Open quest plays the opening scene first, over the board', first.on && first.quest === null && !first.editor && first.speaker === 'Rowan' && first.nav === 'none', JSON.stringify(first));
    await page.keyboard.press('ArrowRight');
    const moved = await page.evaluate(() => LAB_SCENE && LAB_SCENE.index);
    check('the arrow key moves to the next line', moved === 1, String(moved));
    const done = await page.evaluate(() => { while (LAB_SCENE) advanceLabScene(); return { quest: QUEST_ID, editor: !!document.getElementById('sq-source'), seen: labSceneSeen('c-lab-03', 'open'), overlay: !!document.querySelector('#lab-scene.on') }; });
    check('finishing the opening loads the lab and records it as seen', done.quest === 'c-lab-03' && done.editor && done.seen && !done.overlay, JSON.stringify(done));
    const again = await page.evaluate(() => { openSideQuests(); document.querySelector('.sq-card button[onclick*="c-lab-03"]').click(); return { overlay: !!document.querySelector('#lab-scene.on'), quest: QUEST_ID }; });
    check('reopening a lab goes straight in', !again.overlay && again.quest === 'c-lab-03', JSON.stringify(again));

    await page.evaluate(() => { openSideQuests(); startSideQuest('c-lab-02'); });
    await page.keyboard.press('Escape');
    const skipped = await page.evaluate(() => ({ quest: QUEST_ID, seen: labSceneSeen('c-lab-02', 'open'), overlay: !!document.querySelector('#lab-scene.on') }));
    check('Escape skips the scene and still opens the lab', skipped.quest === 'c-lab-02' && skipped.seen && !skipped.overlay, JSON.stringify(skipped));

    // 3. A real graded completion ends in the closing scene, after the reward is saved
    await fresh();
    await page.evaluate(ref => { startSideQuest('c-lab-01'); while (LAB_SCENE) advanceLabScene(); saveSideQuestDraft('c-lab-01', ref); renderSideQuest(); window.__money = S.money; runQuestCode(true); }, refs['c-lab-01']);
    await page.waitForFunction(() => !C_JOB, null, { timeout: 120000 });
    await page.waitForTimeout(200);
    const closing = await page.evaluate(() => {
      const p = sideQuestProgress('c-lab-01'), saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      const reward = LAB_SCENE ? LAB_SCENE.scene.beats.findIndex(b => b.reward) : -1;
      const out = { on: !!document.querySelector('#lab-scene.on.is-close'), claimed: p.rewardClaimed, money: S.money - window.__money,
        savedClaim: saved.sideQuests.records['c-lab-01'].rewardClaimed, rewardBeat: reward };
      while (LAB_SCENE && LAB_SCENE.index < reward) advanceLabScene();
      const card = document.querySelector('.lab-reward');
      out.card = card ? card.textContent : '';
      while (LAB_SCENE) advanceLabScene();
      out.seen = labSceneSeen('c-lab-01', 'close'); out.moneyAfter = S.money - window.__money;
      return out;
    });
    check('passing every test opens the closing scene', closing.on && closing.rewardBeat > 0, JSON.stringify({ on: closing.on, beat: closing.rewardBeat }));
    check('the reward is claimed and saved before the handover plays', closing.claimed && closing.savedClaim && closing.money === 600, JSON.stringify({ claimed: closing.claimed, saved: closing.savedClaim, money: closing.money }));
    check('the handover card shows the quest\'s real reward', /600/.test(closing.card) && /3 × Oran Berry/.test(closing.card), closing.card);
    check('watching the ending grants nothing extra', closing.seen && closing.moneyAfter === 600, String(closing.moneyAfter));

    const replay = await page.evaluate(() => {
      renderSideQuest(); const strip = document.querySelector('.lab-scene-strip'); const buttons = [...strip.querySelectorAll('button')].map(b => b.textContent + (b.disabled ? ' (off)' : ''));
      const before = S.money; replayLabScene('c-lab-01', 'close'); const on = !!document.querySelector('#lab-scene.on'); const replayNote = (() => { const r = LAB_SCENE.scene.beats.findIndex(b => b.reward); while (LAB_SCENE.index < r) advanceLabScene(); return document.querySelector('.lab-reward-note').textContent; })();
      while (LAB_SCENE) advanceLabScene(); return { buttons, on, replayNote, same: S.money === before };
    });
    check('finished labs can replay both scenes without paying again', replay.on && replay.same && replay.buttons.join('|') === 'Replay the opening|Watch the ending' && /Handed over/.test(replay.replayNote), JSON.stringify(replay));

    // 4. Pokémon rewards appear in the card
    const monCard = await page.evaluate(() => { const q = questById('c-lab-09'); const p = sideQuestProgress('c-lab-09'); p.status = 'completed'; p.completedAt = Date.now(); p.submission = { questId: q.id, method: 'autograder', graderVersion: q.grading.version, source: 'x', passed: q.grading.tests.length, total: q.grading.tests.length, at: Date.now() };
      openSideQuest('c-lab-09'); claimSideQuestReward('c-lab-09'); const r = LAB_SCENE.scene.beats.findIndex(b => b.reward); while (LAB_SCENE.index < r) advanceLabScene();
      const t = document.querySelector('.lab-reward').textContent, img = document.querySelector('.lab-reward-mon img').getAttribute('src'); while (LAB_SCENE) advanceLabScene(); return { t, img }; });
    check('a Pokémon reward is shown with its art and where it went', /Eevee/.test(monCard.t) && /Level 15/.test(monCard.t) && /party|PC box/.test(monCard.t) && /art\/133\.png/.test(monCard.img), JSON.stringify(monCard));

    // 5. Labs finished before scenes existed get their ending once
    await fresh();
    const retro = await page.evaluate(() => {
      const q = questById('c-lab-14'), p = sideQuestProgress('c-lab-14');
      p.status = 'completed'; p.rewardClaimed = true; p.submission = { questId: q.id, method: 'autograder', graderVersion: 1, source: 'x', passed: q.grading.tests.length, total: q.grading.tests.length, at: 1 };
      delete S.labScenes; const money = S.money;
      openSideQuests(); document.querySelector('.sq-card button[onclick*="c-lab-14"]').click();
      const a = { on: !!document.querySelector('#lab-scene.on.is-close'), quest: QUEST_ID }; while (LAB_SCENE) advanceLabScene();
      openSideQuests(); startSideQuest('c-lab-14'); a.second = !!document.querySelector('#lab-scene.on'); a.money = S.money === money; return a;
    });
    check('a lab completed before the scenes existed plays its ending once, then never again', retro.on && retro.quest === 'c-lab-14' && !retro.second && retro.money, JSON.stringify(retro));

    // 6. Friendship and outcome variants
    const variants = await page.evaluate(() => {
      const beat = LAB_SCENES['c-lab-03'].open.beats.find(b => b.warm);
      S.friends = S.friends || {}; const before = labBeatText('c-lab-03', beat);
      S.friends.rowan = Object.assign(S.friends.rowan || {}, { points: 350 }); const warm = labBeatText('c-lab-03', beat);
      const ob = LAB_SCENES['c-lab-09'].close.beats.find(b => b.outcome); const p = sideQuestProgress('c-lab-09');
      p.attempts = []; p.hints = 0; const ind = labBeatText('c-lab-09', ob);
      p.attempts = [{ complete: false }, { complete: true }]; const per = labBeatText('c-lab-09', ob);
      p.attempts = []; p.hints = 1; const gui = labBeatText('c-lab-09', ob);
      return { stranger: before === beat.text, warm: warm === beat.warm, ind: ind === ob.outcome.independent, per: per === ob.outcome.persisted, gui: gui === ob.outcome.guided };
    });
    check('friends hear the warmer line; strangers the default', variants.stranger && variants.warm, JSON.stringify(variants));
    check('closing lines follow how the lab went (independent, persisted, guided)', variants.ind && variants.per && variants.gui, JSON.stringify(variants));

    // 7. Save round trip and junk
    const persist = await page.evaluate(() => {
      markLabSceneSeen('c-lab-05', 'open'); saveGame(); const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
      const kept = !!(raw.labScenes && raw.labScenes.seen['c-lab-05'] && raw.labScenes.seen['c-lab-05'].open);
      S.labScenes = 'junk'; const fixed = ensureLabScenes(); S.labScenes = { seen: [] }; const fixed2 = ensureLabScenes();
      return { kept, fixed: fixed.version === 1 && typeof fixed.seen === 'object', fixed2: !Array.isArray(fixed2.seen) };
    });
    check('seen scenes survive a save, and junk state normalises', persist.kept && persist.fixed && persist.fixed2, JSON.stringify(persist));

    // 8. Phone layout
    await page.setViewportSize({ width: 390, height: 844 });
    await fresh();
    const phone = await page.evaluate(() => { startSideQuest('c-lab-12'); const box = document.querySelector('.lab-scene-box').getBoundingClientRect(), card = document.querySelector('.lab-scene-card').getBoundingClientRect();
      const r = { boxRight: box.right, cardRight: card.right, width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth }; skipLabScene(); return r; });
    check('the scene fits a phone screen', phone.boxRight <= phone.width && phone.cardRight <= phone.width && !phone.overflow, JSON.stringify(phone));

    check('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  } finally { await browser.close(); }
  const passed = results.filter(r => r.ok).length;
  console.log('\n' + passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
