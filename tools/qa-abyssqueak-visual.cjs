/* Isolated browser render check for the custom Abyssqueak line. */
const path = require('path');
const { chromium } = require('./playwright.cjs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  await page.evaluate(() => {
    S = freshSave();
    S.settings.sound = false;
    bindProgress('c');
    S.party = [makeMon(1029, 5), makeMon(1030, 20), makeMon(1031, 40)];
    S.party.forEach(mon => {
      S.seen[mon.id] = true;
      S.caught[mon.id] = true;
    });
    showScreen('party');
    renderParty();
  });
  await page.locator('.pc-party img').first().waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll('.pc-party img')].every(image => image.complete));
  const partyMetrics = await page.locator('.pc-party img').evaluateAll(images => images.map(image => ({
    src: image.getAttribute('src'),
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    imageRendering: getComputedStyle(image).imageRendering
  })));
  await page.screenshot({
    path: path.join(__dirname, '..', 'assets', 'fakemon', 'concepts', 'abyssqueak-line-v2', 'abyssqueak-party-browser.png'),
    fullPage: true
  });

  await page.evaluate(() => {
    S.party = [makeMon(1031, 40)];
    startBattle({
      kind: 'wild',
      chapters: [1],
      foes: [makeMon(1030, 36)],
      title: 'Abyssqueak Line Visual QA'
    });
  });
  await page.locator('#youimg').waitFor();
  await page.waitForFunction(() => ['youimg', 'foeimg'].every(id => document.getElementById(id).complete));
  const battleMetrics = await page.locator('#youimg, #foeimg').evaluateAll(images => images.map(image => ({
    id: image.id,
    src: image.getAttribute('src'),
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    imageRendering: getComputedStyle(image).imageRendering
  })));
  await page.screenshot({
    path: path.join(__dirname, '..', 'assets', 'fakemon', 'concepts', 'abyssqueak-line-v2', 'abyssqueak-battle-browser.png'),
    fullPage: true
  });

  console.log(JSON.stringify({ partyMetrics, battleMetrics, errors }, null, 2));
  await browser.close();
  if (errors.length || [...partyMetrics, ...battleMetrics].some(metric =>
    metric.naturalWidth !== 96 || metric.naturalHeight !== 96 || metric.imageRendering !== 'pixelated')) {
    process.exitCode = 1;
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
