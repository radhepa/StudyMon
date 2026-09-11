/* Compile every reference implementation, run every case, and record the exact
   stdout each one produces.

   The output of this script is a REVIEWED artifact, not an authority. A
   reference implementation that is subtly wrong would produce a confidently
   wrong expectation and the autograder would then enforce it. Every entry is
   hashed against the inputs that determine it (harness + reference source +
   case input + case files) so that changing a contract invalidates the stored
   expectation instead of silently keeping a stale one. */
const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const URL = 'http://127.0.0.1:8780/';
const OUT = 'tools/quest-expected-outputs.json';

function hashCase(harness, source, test) {
  return crypto.createHash('sha256').update(JSON.stringify({
    harness: harness || '', source: source, input: test.input || '', files: test.files || {}
  })).digest('hex').slice(0, 16);
}

(async () => {
  const refs = JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json', 'utf8'));
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  await page.goto(URL);

  const quests = await page.evaluate(() => SIDE_QUESTS.map(q => ({ id: q.id, harness: q.grading.harness, tests: q.grading.tests })));
  const expected = {};
  const problems = [];

  for (const q of quests) {
    const source = refs[q.id];
    if (!source) { problems.push([q.id, 'no reference implementation']); continue; }
    const res = await page.evaluate(({ source, harness, tests }) => new Promise(resolve => {
      const w = new Worker('js/engine/c-worker.js');
      const events = [];
      let timer;
      const finish = d => { clearTimeout(timer); w.terminate(); resolve(d); };
      const arm = ms => { clearTimeout(timer); timer = setTimeout(() => finish({ error: 'timeout', events }), ms); };
      arm(120000);
      w.onmessage = e => {
        const d = e.data;
        if (d.type === 'phase') arm(d.phase === 'compile' ? 120000 : 10000);
        events.push(d);
        if (d.type === 'error') finish({ error: d.message, diagnostics: d.diagnostics, events });
        if (d.type === 'done') finish({ events });
      };
      w.onerror = e => finish({ error: e.message, events });
      w.postMessage({ source, harness, cases: tests });
    }), { source, harness: q.harness, tests: q.tests });

    if (res.error) { problems.push([q.id, 'run failed: ' + res.error, (res.diagnostics || '').slice(0, 400)]); console.log(q.id, 'ERROR', res.error); continue; }
    const cases = res.events.filter(e => e.type === 'case');
    if (cases.length !== q.tests.length) problems.push([q.id, 'expected ' + q.tests.length + ' cases, saw ' + cases.length]);
    const marks = [];
    cases.forEach((c, i) => {
      const t = q.tests[i];
      if (c.exitCode !== 0) { problems.push([q.id, t.id, 'exit code ' + c.exitCode]); marks.push('EXIT' + c.exitCode); return; }
      if (c.error) { problems.push([q.id, t.id, 'runtime error: ' + c.error]); marks.push('ERR'); return; }
      if (c.stderr) { problems.push([q.id, t.id, 'unexpected stderr: ' + c.stderr.slice(0, 120)]); marks.push('STDERR'); return; }
      if (!c.output) { problems.push([q.id, t.id, 'produced no output']); marks.push('EMPTY'); return; }
      expected[t.id] = { stdout: c.output, hash: hashCase(q.harness, source, t) };
      marks.push('ok');
    });
    console.log(q.id, marks.join(' '));
  }

  await browser.close();
  fs.writeFileSync(OUT, JSON.stringify({
    generated: new Date().toISOString(),
    note: 'Generated from verified reference implementations. Reviewed before use; regenerate with tools/build-expected-outputs.cjs.',
    cases: expected
  }, null, 2));
  console.log('\nrecorded ' + Object.keys(expected).length + ' expected outputs -> ' + OUT);
  if (problems.length) { console.log('PROBLEMS (' + problems.length + '):'); problems.forEach(p => console.log('  ' + p.join(' | '))); process.exitCode = 1; }
  else console.log('no problems');
})().catch(e => { console.error(e); process.exitCode = 1; });
