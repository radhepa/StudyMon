/* End-to-end cross-check of the midterm review labs (c-lab-31 to c-lab-49).

   For every lab, through the game's own compiler worker:
     1. the reference reproduces every stored expected output;
     2. each independently written solution in tools/quest-midterm-crosscheck.cjs
        passes every test exactly (stdout, exit code 0, empty stderr);
     3. each classic-mistake solution fails at least one test.
   Needs a local server: node tools/check-midterm-labs.cjs [baseUrl] */
const fs = require('fs');
const { chromium } = require('./playwright.cjs');
const CROSS = require('./quest-midterm-crosscheck.cjs');

const URL = process.argv[2] || 'http://127.0.0.1:8780/';
const refs = JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json', 'utf8'));

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const problems = [];
  let runs = 0;
  try {
    const page = await browser.newPage();
    await page.goto(URL);
    const quests = await page.evaluate(ids => SIDE_QUESTS.filter(q => ids.includes(q.id))
      .map(q => ({ id: q.id, harness: q.grading.harness, tests: q.grading.tests })), Object.keys(CROSS));
    if (quests.length !== Object.keys(CROSS).length) problems.push('expected ' + Object.keys(CROSS).length + ' labs, found ' + quests.length);

    const grade = (source, q) => page.evaluate(({ source, harness, tests }) => new Promise(resolve => {
      const w = new Worker('js/engine/c-worker.js');
      const cases = []; let timer;
      const finish = d => { clearTimeout(timer); w.terminate(); resolve(d); };
      const arm = ms => { clearTimeout(timer); timer = setTimeout(() => finish({ error: 'timeout', cases }), ms); };
      arm(120000);
      w.onmessage = e => {
        const d = e.data;
        if (d.type === 'phase') arm(d.phase === 'compile' ? 120000 : 3000);
        if (d.type === 'case') cases.push(d);
        if (d.type === 'error') finish({ error: d.message, diagnostics: d.diagnostics, cases });
        if (d.type === 'done') finish({ cases });
      };
      w.onerror = e => finish({ error: e.message, cases });
      w.postMessage({ source, harness, cases: tests });
    }).then(r => ({
      error: r.error || null,
      diagnostics: (r.diagnostics || '').slice(0, 300),
      passed: tests.map((t, i) => { const c = r.cases[i]; return !!c && c.exitCode === 0 && !c.error && c.stderr === '' && c.output === t.stdout; })
    })), { source, harness: q.harness, tests: q.tests });

    for (const q of quests) {
      const plan = CROSS[q.id];
      const marks = [];
      const ref = await grade(refs[q.id], q); runs++;
      if (!ref.passed.every(Boolean)) problems.push(q.id + ': reference does not reproduce its stored outputs ' + (ref.error || '') + ' ' + ref.diagnostics);
      marks.push('ref ' + ref.passed.filter(Boolean).length + '/' + q.tests.length);
      for (const [i, src] of plan.pass.entries()) {
        const r = await grade(src, q); runs++;
        const ok = r.passed.every(Boolean);
        marks.push('alt' + (i + 1) + ' ' + (ok ? 'passes' : 'FAILS'));
        if (!ok) problems.push(q.id + ': independent solution ' + (i + 1) + ' fails cases ' + r.passed.map((p, j) => p ? null : j + 1).filter(Boolean).join(',') + ' ' + (r.error || '') + ' ' + r.diagnostics);
      }
      for (const bad of plan.fail) {
        const r = await grade(bad.src, q); runs++;
        const caught = !r.passed.every(Boolean);
        marks.push((caught ? 'caught' : 'MISSED') + ': ' + bad.why);
        if (!caught) problems.push(q.id + ': a test suite does not catch "' + bad.why + '"');
      }
      console.log(q.id + '  ' + marks.join(' | '));
    }
  } finally { await browser.close(); }
  console.log('\n' + runs + ' compilations');
  if (problems.length) { console.log('PROBLEMS (' + problems.length + '):'); problems.forEach(p => console.log('  ' + p)); process.exitCode = 1; }
  else console.log('PASS: every reference reproduces its outputs, every independent solution passes, every classic mistake is caught.');
})().catch(e => { console.error(e); process.exitCode = 1; });
