/* Inject verified expected outputs into js/data/side-quests.js.

   Each stored expectation carries a hash of the inputs that produced it. If a
   contract, harness, reference or case input changes, the hash stops matching
   and the expectation is DROPPED rather than kept. A case with no expectation
   can never be passed by the grader, so the failure mode is a quest that
   cannot be completed, never a quest graded against a stale answer. */
const fs = require('fs');
const crypto = require('crypto');

const DATA = 'js/data/side-quests.js';
const FIXTURE = 'tools/quest-expected-outputs.json';

function hashCase(harness, source, test) {
  return crypto.createHash('sha256').update(JSON.stringify({
    harness: harness || '', source: source, input: test.input || '', files: test.files || {}
  })).digest('hex').slice(0, 16);
}

const refs = JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json', 'utf8'));
const fixture = JSON.parse(fs.readFileSync(FIXTURE, 'utf8')).cases;
const window = {};
eval(fs.readFileSync(DATA, 'utf8'));
const quests = window.SIDE_QUESTS;

let applied = 0, stale = 0, missing = 0;
const problems = [];
quests.forEach(q => {
  const source = refs[q.id];
  (q.grading.tests || []).forEach(t => {
    const rec = fixture[t.id];
    if (!rec) { delete t.stdout; missing++; problems.push(t.id + ': no verified expectation'); return; }
    const want = hashCase(q.grading.harness, source, t);
    if (rec.hash !== want) { delete t.stdout; stale++; problems.push(t.id + ': expectation is stale (contract changed since it was verified)'); return; }
    t.stdout = rec.stdout;
    applied++;
  });
});

fs.writeFileSync(DATA, '// Thirty C11 labs with exact executable autograder contracts.\nwindow.SIDE_QUESTS = ' + JSON.stringify(quests, null, 2) + ';\n');
console.log('applied ' + applied + ' expected outputs; stale ' + stale + '; missing ' + missing);
if (problems.length) { problems.forEach(p => console.log('  ' + p)); process.exitCode = 1; }
