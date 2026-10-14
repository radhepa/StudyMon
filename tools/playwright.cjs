const fs = require('fs');
const os = require('os');
const path = require('path');

function load(candidate) {
  try {
    return require(candidate);
  } catch (error) {
    if (error && error.code === 'MODULE_NOT_FOUND') return null;
    throw error;
  }
}

function findPlaywright(root, depth) {
  if (depth < 0 || !fs.existsSync(root)) return null;
  const direct = path.join(root, 'node_modules', 'playwright');
  if (fs.existsSync(path.join(direct, 'package.json'))) return direct;

  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch (_) {
    return null;
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'node_modules') continue;
    const found = findPlaywright(path.join(root, entry.name), depth - 1);
    if (found) return found;
  }
  return null;
}

const configured = process.env.PLAYWRIGHT_PATH;
const cached = findPlaywright(path.join(os.homedir(), '.cache'), 8);
const playwright = load('playwright') || (configured && load(configured)) || (cached && load(cached));

if (!playwright) {
  throw new Error('Playwright was not found. Install it locally or set PLAYWRIGHT_PATH.');
}

/* Friendships, heart scenes and the leaders' social hub are archived in the
   game (FRIENDS_ENABLED in js/engine/ui.js, docs/ARCHIVED-FEATURES.md). The
   suites below still exercise those systems, so for them every page this
   loader opens sets window.STUDYMON_ARCHIVED_FEATURES before the game loads,
   which switches the archived code back on for that test page only. Every
   other suite sees the game exactly as a player does. */
const ARCHIVED_FEATURE_SUITES = new Set([
  'check-aide-phase4.cjs', 'check-archive-phase5.cjs', 'check-batch-chart-exchange.cjs',
  'check-batch-stack-ridge.cjs', 'check-cafe-phase5.cjs', 'check-cast.cjs',
  'check-cavern-keepers-phase5.cjs', 'check-core-cast-phase4.cjs', 'check-economy.cjs',
  'check-ellis-phase4.cjs', 'check-exp-share.cjs', 'check-friends.cjs', 'check-gameplay.cjs',
  'check-gifts.cjs', 'check-gym-leaders.cjs', 'check-hawthorn-phase4.cjs', 'check-june-phase4.cjs',
  'check-lab-scenes.cjs', 'check-linden-phase4.cjs', 'check-mail.cjs', 'check-meadow-bugs-phase5.cjs',
  'check-mira-phase4.cjs', 'check-oakes-phase5.cjs', 'check-phase7-matrix.cjs',
  'check-pier-fishermen-phase5.cjs', 'check-portrait-gameplay.cjs', 'check-quarter-aces-phase5.cjs',
  'check-relationship-web.cjs', 'check-ridge-hikers-phase5.cjs', 'check-rumors.cjs', 'check-scenes.cjs',
  'check-social-context.cjs', 'check-systems.cjs', 'check-theo-phase4.cjs', 'check-ui-sweep.cjs',
  'check-vignettes.cjs', 'check-walkins.cjs', 'check-world-state.cjs'
]);
const suite = require.main && require.main.filename ? path.basename(require.main.filename) : '';
if (ARCHIVED_FEATURE_SUITES.has(suite) || process.env.STUDYMON_ARCHIVED_FEATURES === '1') {
  const enable = () => { window.STUDYMON_ARCHIVED_FEATURES = true; };
  const wrapContext = (context) => { context.addInitScript(enable); return context; };
  const wrapBrowser = (browser) => {
    const newContext = browser.newContext.bind(browser);
    const newPage = browser.newPage.bind(browser);
    browser.newContext = async (...args) => wrapContext(await newContext(...args));
    browser.newPage = async (...args) => {
      const page = await newPage(...args);
      await page.context().addInitScript(enable);
      return page;
    };
    return browser;
  };
  for (const type of ['chromium', 'firefox', 'webkit']) {
    const bt = playwright[type];
    if (!bt) continue;
    const launch = bt.launch.bind(bt);
    bt.launch = async (...args) => wrapBrowser(await launch(...args));
    if (bt.launchPersistentContext) {
      const persistent = bt.launchPersistentContext.bind(bt);
      bt.launchPersistentContext = async (...args) => wrapContext(await persistent(...args));
    }
  }
}

module.exports = playwright;
