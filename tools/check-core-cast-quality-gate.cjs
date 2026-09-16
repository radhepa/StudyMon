/* Phase 4 Slice 14: core-cast quality gate, scoped to the eight authored
   characters (Rowan, Mira, Theo, June, Ellis, Kern/aide, Linden, Hawthorn).
   This is a closeout-only diagnostic, not a per-slice production check: it
   looks for repeated-phrase padding, broader educational-voice leakage than
   the narrow per-character contamination regex catches, and prints per-
   character/per-category counts for human review. It does not replace
   check-*-phase4.cjs or check-scenes.cjs; it runs after them. */
const { chromium } = require('./playwright.cjs');

const CAST = ['rowan', 'mira', 'theo', 'june', 'ellis', 'aide', 'linden', 'c-hawthorn'];
const LABELS = { rowan: 'Rowan', mira: 'Mira', theo: 'Theo', june: 'June', ellis: 'Ellis',
  aide: 'Kern', linden: 'Linden', 'c-hawthorn': 'Hawthorn' };

function normalize(line) {
  return line.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function trigrams(words) {
  const set = new Set();
  for (let i = 0; i + 2 < words.length; i++) set.add(words[i] + ' ' + words[i + 1] + ' ' + words[i + 2]);
  return set;
}
function jaccard(a, b) {
  if (!a.size && !b.size) return 0;
  let inter = 0;
  a.forEach(x => { if (b.has(x)) inter++; });
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const perCharacter = await page.evaluate((castIds) => {
    return castIds.map(id => {
      const pools = (window.CORE_CAST_DIALOGUE && window.CORE_CAST_DIALOGUE[id]) || [];
      const categories = {};
      pools.forEach(pool => { categories[pool.category] = (categories[pool.category] || 0) + pool.lines.length; });
      return { id, poolCount: pools.length, lineCount: pools.reduce((n, p) => n + p.lines.length, 0),
        categories, lines: pools.flatMap(p => p.lines) };
    });
  }, CAST);

  await browser.close();

  const BROAD_CONTAMINATION = /\b(calculus|compiler|pointer|quiz|exam|homework|study|studies|studying|lesson|lessons|algorithm|programming|midterm|gpa|assignment|coursework|syllabus|textbook)\b/i;
  const SIMILARITY_THRESHOLD = 0.55;

  let anyBroadHits = false;
  let anyExcessiveNearDup = false;
  const report = [];

  perCharacter.forEach(({ id, poolCount, lineCount, categories, lines }) => {
    const broadHits = lines.filter(line => BROAD_CONTAMINATION.test(line));
    if (broadHits.length) anyBroadHits = true;

    const grams = lines.map(line => trigrams(normalize(line).split(' ')));
    const nearDupPairs = [];
    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[i] === lines[j]) continue; // exact dup already caught by uniqueTexts elsewhere
        const sim = jaccard(grams[i], grams[j]);
        if (sim >= SIMILARITY_THRESHOLD) nearDupPairs.push({ a: lines[i], b: lines[j], sim: Math.round(sim * 100) / 100 });
      }
    }
    if (nearDupPairs.length > 3) anyExcessiveNearDup = true;

    report.push({ id, label: LABELS[id], poolCount, lineCount, categories, broadHits, nearDupPairs });
  });

  console.log('Per-character counts:');
  report.forEach(r => console.log('  ' + r.label + ': ' + r.lineCount + ' lines / ' + r.poolCount + ' pools'));

  console.log('\nBroad educational-voice scan (beyond the narrow per-suite regex):');
  report.forEach(r => {
    if (r.broadHits.length) {
      console.log('  ' + r.label + ': ' + r.broadHits.length + ' hit(s)');
      r.broadHits.forEach(line => console.log('    - ' + line));
    }
  });
  if (!anyBroadHits) console.log('  none found across all eight characters');

  console.log('\nNear-duplicate phrasing scan (trigram Jaccard >= ' + SIMILARITY_THRESHOLD + '):');
  report.forEach(r => {
    console.log('  ' + r.label + ': ' + r.nearDupPairs.length + ' near-duplicate pair(s)' + (r.nearDupPairs.length > 3 ? '  <-- above review threshold (3)' : ''));
    r.nearDupPairs.slice(0, 8).forEach(p => console.log('    [' + p.sim + '] "' + p.a + '"  ~  "' + p.b + '"'));
  });

  const checks = [
    ['every core-cast character has at least 250 lines', report.every(r => r.lineCount >= 250)],
    ['no broad educational-voice contamination beyond narrow filter', !anyBroadHits],
    ['near-duplicate phrasing stays within a small, reviewable count per character', !anyExcessiveNearDup],
    ['no page errors', pageErrors.length === 0]
  ];
  console.log('');
  checks.forEach(([name, ok]) => console.log((ok ? 'PASS  ' : 'FAIL  ') + name));
  if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
  else console.log(checks.length + '/' + checks.length + ' checks passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
