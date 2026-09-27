/* Static validation of the 49 autograded C labs (30 originals plus the 19
   midterm review labs, c-lab-31 to c-lab-49).

   Structure only. Whether an expected output is CORRECT is settled by
   tools/build-expected-outputs.cjs plus review, and whether grading works is
   settled by tools/check-autograder.cjs. */
const fs = require('fs'), vm = require('vm'), assert = require('assert');
const crypto = require('crypto');
const c = {}; c.window = c; vm.createContext(c);
vm.runInContext(fs.readFileSync('js/data/side-quests.js', 'utf8'), c);
const qs = c.SIDE_QUESTS;
const refs = JSON.parse(fs.readFileSync('tools/quest-reference-fixtures.json', 'utf8'));

assert.equal(qs.length, 49, '49 labs');
assert.equal(new Set(qs.map(q => q.id)).size, 49, 'stable unique ids');
assert.equal(new Set(qs.map(q => q.recommendedOrder)).size, 49, 'unique ordering');
assert.deepEqual(qs.filter(q => q.collection === 'midterm-review').map(q => q.id),
  Array.from({ length: 19 }, (_, i) => 'c-lab-' + (31 + i)), 'midterm review set is c-lab-31 to c-lab-49');

let cases = 0;
for (const q of qs) {
  const where = q.id + ': ';
  assert.equal(q.subject, 'c', where + 'subject');
  assert.equal(q.curriculum.edition, 4, where + 'edition');
  assert(q.chapters.every(n => n >= 1 && n <= 15), where + 'chapter range');
  assert(q.chapters.includes(q.curriculum.primaryChapter), where + 'primary chapter listed');
  assert(q.published, where + 'published');
  assert.equal(q.validation.mode, 'autograder', where + 'graded by the autograder');
  assert(q.starterCode.length && q.hints.length === 3, where + 'starter and hints');
  const itemRewards=['oran','sitrus','revive','circuitToken','rareCandy','prismStone'];
  assert(q.rewards.money > 0 && q.rewards.berries.every(b => itemRewards.includes(b.id) && b.count > 0), where + 'rewards');
  assert(!JSON.stringify(q).includes('—'), where + 'no em dashes in copy');
  const t = q.estimatedMinutes;
  assert(t.min <= t.max, where + 'time estimate');
  assert(q.difficulty === 'easy' ? t.max < 30 : q.difficulty === 'medium' ? t.min >= 30 && t.max <= 60 : t.min >= 60 && t.max <= 120, where + 'time matches difficulty');

  // Grading contract
  const g = q.grading;
  assert(g && g.tests && g.tests.length, where + 'has tests');
  assert(['program', 'functions'].includes(g.mode), where + 'grading mode');
  assert.equal(g.mode === 'functions', !!g.harness, where + 'function labs supply a driver, program labs do not');
  assert(refs[q.id], where + 'has a reference implementation');
  const ids = new Set();
  g.tests.forEach(test => {
    cases++;
    assert(!ids.has(test.id), where + 'duplicate case id ' + test.id);
    ids.add(test.id);
    // Every case must carry a verified expectation. A case without one can
    // never pass, which would make the quest impossible to complete.
    assert(typeof test.stdout === 'string' && test.stdout.length,
      where + test.id + ' has no verified expected output');
  });
}
assert.equal(cases, 315, 'expected case total');
const perDifficulty = { easy: 18, medium: 15, hard: 16 };
for (const d of ['easy', 'medium', 'hard']) assert.equal(qs.filter(q => q.difficulty === d).length, perDifficulty[d], d + ' count');

// The stored expectations must still match the contracts that produced them.
const fixture = JSON.parse(fs.readFileSync('tools/quest-expected-outputs.json', 'utf8')).cases;
let stale = 0;
for (const q of qs) for (const test of q.grading.tests) {
  const want = crypto.createHash('sha256').update(JSON.stringify({
    harness: q.grading.harness || '', source: refs[q.id], input: test.input || '', files: test.files || {}
  })).digest('hex').slice(0, 16);
  const rec = fixture[test.id];
  if (!rec || rec.hash !== want) { stale++; console.log('  STALE: ' + test.id); }
  else if (rec.stdout !== test.stdout) { stale++; console.log('  DRIFTED: ' + test.id + ' differs from the verified fixture'); }
}
assert.equal(stale, 0, stale + ' expectations are stale or drifted; re-run tools/build-expected-outputs.cjs');

console.log('PASS: ' + qs.length + ' autograded labs, ' + cases + ' cases, every case carrying a verified expected output that still matches its contract.');
