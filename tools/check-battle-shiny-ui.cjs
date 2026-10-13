/* Battle session accuracy and shiny entrances in isolated browser storage.
   Screenshots use the game's real CSS animation, paused during its burst. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('./playwright.cjs');
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}
const output = path.resolve(__dirname, '../output');
const url = 'http://127.0.0.1:8780/';

async function instrumentAudio(context) {
  await context.addInitScript(() => {
    window.__shinyAudio = { contexts: [], created: 0, started: 0 };
    const Native = window.AudioContext || window.webkitAudioContext;
    if (!Native) return;
    const Wrapped = new Proxy(Native, {
      construct(Target, args) {
        const context = Reflect.construct(Target, args);
        window.__shinyAudio.contexts.push(context);
        const create = context.createOscillator.bind(context);
        context.createOscillator = (...args) => {
          const oscillator = create(...args);
          window.__shinyAudio.created++;
          const start = oscillator.start.bind(oscillator);
          oscillator.start = (...args) => {
            window.__shinyAudio.started++;
            return start(...args);
          };
          return oscillator;
        };
        return context;
      }
    });
    if (window.AudioContext) window.AudioContext = Wrapped;
    else window.webkitAudioContext = Wrapped;
  });
}

async function setup(page) {
  await page.goto(url);
  await page.evaluate(() => {
    stopShinyBattleEffects();
    S = freshSave(); bindProgress('c'); S.settings.sound = false;
    S.party = [makeMon(6, 35, { shiny: false }), makeMon(9, 35, { shiny: false })];
    ensureBag();
  });
}

// One real submission, including a repeated attempt against the same card.
async function submitBattle(page, correct) {
  return page.evaluate(correct => {
    startBattle({ kind: 'wild', chapters: [1], foes: [makeMon(25, 35, { shiny: false })], title: 'Wild · Chapter 1' });
    chooseMove(0);
    const q = B.q;
    const choice = q.k === 'fill' ? (correct ? q.a[0] : '__wrong__') : (correct ? q.a : (q.a + 1) % q.c.length);
    answer(choice, q.k === 'fill'); answer(choice, q.k === 'fill');
    return { correct: S.shinyStudy.correct, total: S.shinyStudy.total,
      label: $('#battle-session-count').textContent, right: B.correctThisBattle, wrong: B.wrongThisBattle };
  }, correct);
}

function geometryCheck() {
  const rect = selector => document.querySelector(selector).getBoundingClientRect();
  const title = rect('#btitle'), counter = rect('.battle-session-counter'), field = rect('#battlefield');
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const tag = rect('.hpbox.foe .battle-shiny-tag'), plate = rect('.hpbox.foe');
  const plates = Array.from(document.querySelectorAll('#battlefield .hpbox')).map(element => element.getBoundingClientRect());
  const sprite = selector => {
    const image = document.querySelector(selector), bounds = image.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d'); context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let total = 0, visible = 0, minY = canvas.height, maxY = 0;
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        if (pixels[(y * canvas.width + x) * 4 + 3] < 128) continue;
        total++; minY = Math.min(minY, y); maxY = Math.max(maxY, y);
        const point = { x: bounds.left + (x + 0.5) * bounds.width / canvas.width,
          y: bounds.top + (y + 0.5) * bounds.height / canvas.height };
        const inside = point.x >= field.left && point.x <= field.right && point.y >= field.top && point.y <= field.bottom;
        const covered = plates.some(plate => point.x >= plate.left && point.x <= plate.right && point.y >= plate.top && point.y <= plate.bottom);
        if (inside && !covered) visible++;
      }
    }
    return { height: Math.round((maxY - minY + 1) * bounds.height / canvas.height), visible: total ? visible / total : 0 };
  };
  const visibleStars = Array.from(document.querySelectorAll('.bf-foe .shiny-burst .shiny-pixel-star')).filter(star => {
    if (+getComputedStyle(star).opacity <= 0) return false;
    const bounds = star.getBoundingClientRect(), x = (bounds.left + bounds.right) / 2, y = (bounds.top + bounds.bottom) / 2;
    return x >= field.left && x <= field.right && y >= field.top && y <= field.bottom &&
      !plates.some(plate => x >= plate.left && x <= plate.right && y >= plate.top && y <= plate.bottom);
  }).length;
  return { overflow: document.documentElement.scrollWidth > innerWidth,
    headerCollision: overlaps(title, counter), fieldCollision: overlaps(counter, field),
    tagContained: tag.left >= plate.left && tag.right <= plate.right && tag.top >= plate.top && tag.bottom <= plate.bottom,
    counterContained: counter.left >= 0 && counter.right <= innerWidth,
    foeSprite: sprite('#foeimg'), playerSprite: sprite('#youimg'), visibleStars };
}

async function prepareScreenshot(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(['assets/sprites/shiny/25.png', 'assets/sprites/back/6.png'].map(source =>
      new Promise(resolve => { const image = new Image(); image.onload = resolve; image.onerror = resolve; image.src = source; })));
    closeModal(); stopShinyBattleEffects();
    S = freshSave(); bindProgress('c'); S.settings.sound = false;
    S.party = [makeMon(6, 35, { shiny: false })]; ensureBag();
    drill(1);
    for (let i = 0; i < 24; i++) recordAnswer(D.q, i < 18);
    startBattle({ kind: 'wild', chapters: [1], foes: [makeMon(25, 20, { shiny: true })], title: 'Wild · Chapter 1' });
    await new Promise(requestAnimationFrame);
    document.getAnimations().forEach(animation => {
      if (animation.effect && animation.effect.target.closest('.shiny-sparkles')) {
        animation.pause(); animation.currentTime = 800;
      }
    });
    // Let the existing screen-entry fade complete while genuine stars stay paused.
    await new Promise(resolve => setTimeout(resolve, 350));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

async function screenshotBattle(page, filename) {
  const clip = await page.evaluate(() => {
    const section = $('#s-battle').getBoundingClientRect(), controls = $('#quiz .moves').getBoundingClientRect();
    return { x: section.x, y: section.y, width: section.width, height: controls.bottom - section.top + 8 };
  });
  await page.screenshot({ path: path.join(output, filename), clip, animations: 'allow' });
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  try {
    const context = await browser.newContext({ viewport: { width: 1360, height: 1120 } });
    await instrumentAudio(context);
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await setup(page);

    let r = await page.evaluate(() => {
      drill(1);
      const q = D.q, choice = q.k === 'fill' ? q.a[0] : q.a;
      drillAnswer(choice, q.k === 'fill'); drillAnswer(choice, q.k === 'fill');
      return { correct: S.shinyStudy.correct, total: S.shinyStudy.total };
    });
    check('a real drill answer counts once in session accuracy', r.correct === 1 && r.total === 1, JSON.stringify(r));
    r = await submitBattle(page, false);
    check('battle counter includes prior drills and counts a wrong answer once', r.correct === 1 && r.total === 2 && r.wrong === 1 && r.label === '1 / 2', JSON.stringify(r));
    r = await submitBattle(page, true);
    check('session counter spans battles and updates immediately after a correct answer', r.correct === 2 && r.total === 3 && r.right === 1 && r.label === '2 / 3', JSON.stringify(r));
    r = await page.evaluate(() => {
      for (let i = 0; i < 120; i++) recordAnswer(B.q, i < 90);
      return { correct: S.shinyStudy.correct, total: S.shinyStudy.total, oddsAnswers: S.shinyStudy.answers,
        label: $('#battle-session-count').textContent };
    });
    check('accuracy keeps counting beyond the 100-answer shiny cap', r.correct === 92 && r.total === 123 && r.oddsAnswers === 100 && r.label === '92 / 123', JSON.stringify(r));
    r = await page.evaluate(() => {
      const old = rollCatch;
      try {
        rollCatch = () => ({ caught: true, shakes: 4, critical: false });
        foe().shiny = true; resolveCatch(true);
        return { correct: S.shinyStudy.correct, total: S.shinyStudy.total, oddsAnswers: S.shinyStudy.answers };
      } finally { rollCatch = old; closeModal(); }
    });
    check('catching a shiny resets odds while retaining whole-session accuracy', r.correct === 92 && r.total === 123 && r.oddsAnswers === 0, JSON.stringify(r));

    // The real trusted input event unlocks browser audio without bypassing it.
    await page.keyboard.press('Shift');
    await page.waitForFunction(() => __shinyAudio.contexts.some(context => context.state === 'running'));
    const before = await page.evaluate(() => __shinyAudio.started);
    await page.evaluate(() => {
      stopShinyBattleEffects();
      S.party = [makeMon(6, 35, { shiny: false }), makeMon(9, 35, { shiny: true })];
      startBattle({ kind: 'wild', chapters: [1], foes: [makeMon(25, 20, { shiny: true }), makeMon(6, 20, { shiny: true })], title: 'Wild · Chapter 1' });
    });
    await page.waitForFunction(before => __shinyAudio.started > before, before);
    r = await page.evaluate(() => ({ cries: S.settings.sound, notes: __shinyAudio.started,
      foeStars: document.querySelectorAll('.bf-foe .shiny-burst .shiny-pixel-star').length,
      ambient: document.querySelectorAll('.bf-foe .shiny-ambient .shiny-pixel-star').length,
      youLayers: document.querySelectorAll('.bf-you .shiny-sparkles').length,
      tag: !!document.querySelector('.hpbox.foe .battle-shiny-tag'),
      playerTag: !!document.querySelector('.hpbox.you .battle-shiny-tag') }));
    check('shiny foe gets an eight-star pixel burst, ambient twinkles and persistent SHINY tag', r.foeStars === 8 && r.ambient === 4 && r.tag, JSON.stringify(r));
    check('ordinary player has no shiny effect or marker', r.youLayers === 0 && !r.playerTag);
    check('original shiny chime schedules through real Web Audio with Cries disabled', !r.cries && r.notes > before, 'scheduled ' + (r.notes - before) + ' notes');
    const entranceNotes = r.notes;
    r = await page.evaluate(() => {
      renderBattle(); renderBattle(); $('#battlefield')._key = null; renderBattle();
      return { notes: __shinyAudio.started, tag: !!document.querySelector('.hpbox.foe .battle-shiny-tag'),
        burst: !!document.querySelector('.bf-foe .shiny-burst'), ambient: !!document.querySelector('.bf-foe .shiny-ambient') };
    });
    check('ordinary scene redraws preserve shiny identification without repeating entrance or sound', r.notes === entranceNotes && r.tag && !r.burst && r.ambient, JSON.stringify(r));
    r = await page.evaluate(() => { B.foeIx = 1; renderBattle(); return __shinyAudio.started; });
    check('a different shiny foe gets its own entrance chime', r > entranceNotes);
    const secondFoeNotes = r;
    r = await page.evaluate(() => {
      B.you = S.party[1]; renderBattle();
      return { notes: __shinyAudio.started, playerTag: !!document.querySelector('.hpbox.you .battle-shiny-tag'),
        playerBurst: !!document.querySelector('.bf-you .shiny-burst'), foeBurst: !!document.querySelector('.bf-foe .shiny-burst') };
    });
    check('a shiny player entering gets sparkles and sound without replaying the foe', r.notes > secondFoeNotes && r.playerTag && r.playerBurst && !r.foeBurst, JSON.stringify(r));
    const firstPlayerNotes = r.notes;
    r = await page.evaluate(() => {
      B.you = S.party[0]; renderBattle(); B.you = S.party[1]; renderBattle();
      return { notes: __shinyAudio.started, playerBurst: !!document.querySelector('.bf-you .shiny-burst') };
    });
    check('sending a shiny player back in repeats its entrance cue', r.notes > firstPlayerNotes && r.playerBurst, JSON.stringify(r));
    const leaveNotes = r.notes;
    r = await page.evaluate(() => { showScreen('map'); renderMap(); return document.querySelectorAll('.shiny-sparkles').length; });
    await page.keyboard.press('Shift');
    check('leaving battle cleans sparkle layers and discards pending audio', r === 0 && await page.evaluate(notes => __shinyAudio.started === notes, leaveNotes));

    await page.clock.install({ time: new Date('2026-10-13T18:00:00Z') });
    await page.clock.pauseAt(new Date('2026-10-13T18:00:10Z'));
    await page.evaluate(() => { drill(1); resetShinyStudy(); recordAnswer(D.q, true); showScreen('map'); renderMap(); });
    await page.clock.fastForward(19999);
    r = await page.evaluate(() => { drill(1); return { correct: S.shinyStudy.correct, total: S.shinyStudy.total }; });
    check('accuracy survives the hidden 20-second return grace', r.correct === 1 && r.total === 1, JSON.stringify(r));
    await page.evaluate(() => { showScreen('map'); renderMap(); });
    await page.clock.fastForward(20000);
    r = await page.evaluate(() => ({ correct: S.shinyStudy.correct, total: S.shinyStudy.total }));
    check('accuracy starts a new session after the hidden grace expires', r.correct === 0 && r.total === 0, JSON.stringify(r));

    // Separate page for screenshots: no fake clock, no changed user save.
    const screenshotContext = await browser.newContext({ viewport: { width: 1360, height: 1440 } });
    const shot = await screenshotContext.newPage();
    shot.on('pageerror', error => errors.push(error.message));
    await setup(shot);
    await prepareScreenshot(shot);
    r = await shot.evaluate(() => ({ label: $('#battle-session-count').textContent,
      visible: Array.from(document.querySelectorAll('.shiny-burst .shiny-pixel-star')).filter(star => +getComputedStyle(star).opacity > 0).length }));
    check('desktop screenshot captures the actual burst with earned 18 / 24 accuracy', r.label === '18 / 24' && r.visible >= 5, JSON.stringify(r));
    await screenshotBattle(shot, 'shiny-battle-effect.png');
    await shot.setViewportSize({ width: 390, height: 1240 });
    await setup(shot);
    await prepareScreenshot(shot);
    r = await shot.evaluate(geometryCheck);
    check('390px battle counter and shiny tag fit without collisions or horizontal overflow', !r.overflow && !r.headerCollision && !r.fieldCollision && r.tagContained && r.counterContained, JSON.stringify(r));
    check('390px actual creature pixels remain visible clear of the HP plates', r.foeSprite.height >= 32 && r.playerSprite.height >= 40 && r.foeSprite.visible >= 0.95 && r.playerSprite.visible >= 0.95, JSON.stringify({ foe: r.foeSprite, player: r.playerSprite }));
    check('390px shiny burst remains visible clear of the HP plates', r.visibleStars >= 4, 'visible stars ' + r.visibleStars);
    await screenshotBattle(shot, 'shiny-battle-mobile.png');
    await shot.setViewportSize({ width: 320, height: 740 });
    r = await shot.evaluate(geometryCheck);
    check('320px battle counter and shiny tag remain inside their layout', !r.overflow && !r.headerCollision && !r.fieldCollision && r.tagContained && r.counterContained, JSON.stringify(r));
    check('320px actual creature pixels remain visible clear of the HP plates', r.foeSprite.height >= 28 && r.playerSprite.height >= 32 && r.foeSprite.visible >= 0.95 && r.playerSprite.visible >= 0.95, JSON.stringify({ foe: r.foeSprite, player: r.playerSprite }));
    check('320px shiny burst remains visible clear of the HP plates', r.visibleStars >= 4, 'visible stars ' + r.visibleStars);

    const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const calm = await reduced.newPage();
    calm.on('pageerror', error => errors.push(error.message));
    await setup(calm);
    await calm.evaluate(() => startBattle({ kind: 'wild', chapters: [1], foes: [makeMon(25, 20, { shiny: true })], title: 'Wild · Chapter 1' }));
    r = await calm.evaluate(() => ({ burst: getComputedStyle(document.querySelector('.shiny-burst')).display,
      stars: Array.from(document.querySelectorAll('.shiny-ambient .shiny-pixel-star')).map(star => ({ animation: getComputedStyle(star).animationName, opacity: getComputedStyle(star).opacity })),
      tag: !!document.querySelector('.battle-shiny-tag') }));
    check('reduced motion keeps static shiny stars and marker with no animated burst', r.burst === 'none' && r.tag && r.stars.length === 4 && r.stars.every(star => star.animation === 'none' && star.opacity === '1'), JSON.stringify(r));
    check('no page errors', errors.length === 0, errors.join(' | '));
    await reduced.close(); await screenshotContext.close(); await context.close();
  } finally { await browser.close(); }
  const failed = results.filter(result => !result.ok);
  console.log('\n' + (results.length - failed.length) + '/' + results.length + ' checks passed');
  console.log('Screenshots: ' + path.join(output, 'shiny-battle-effect.png') + ' and ' + path.join(output, 'shiny-battle-mobile.png'));
  if (failed.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
