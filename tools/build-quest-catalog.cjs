/* Regenerate output/Side Quest Curriculum.md from the live quest data, so the
   readable catalog cannot drift from what the autograder actually enforces. */
const fs = require('fs'), vm = require('vm');
const c = {}; c.window = c; vm.createContext(c);
vm.runInContext(fs.readFileSync('js/data/side-quests.js', 'utf8'), c);
const qs = c.SIDE_QUESTS.slice().sort((a, b) => a.recommendedOrder - b.recommendedOrder);

const show = s => s === '' ? '(no input)' : s;
let out = `# Side Quests: autograded C labs

All 30 quests are available from Side Quests in the bottom navigation, the C map,
and C Notes. There are 10 easy (under 30 minutes), 10 medium (30-60 minutes) and
10 hard (60-120 minutes). One per week is a suggested pace, not a calendar lock.

Original labs aligned to the fourth-edition curriculum for ISBN 9780357506134,
not copied textbook exercises.

You write the C in StudyMon and press Submit. The app compiles it with Clang and
runs it against every test listed below, on your machine, with nothing uploaded.
Output is compared exactly: every space, every number and the final newline. A
test passes only on exit code 0 with nothing written to stderr, and the reward is
granted only when every test passes.

Labs marked **functions** supply a fixed driver that calls the functions you
write, so keep the signatures in the starter. Labs marked **program** compile
your whole program including main.

Oran Berries heal 10 HP and Sitrus Berries heal a quarter of max HP to a living
party member between battles. Full-party Pokemon rewards are sent to storage.

`;

qs.forEach(q => {
  const r = q.rewards;
  const reward = [r.money + ' money']
    .concat((r.berries || []).map(b => b.count + ' ' + b.id[0].toUpperCase() + b.id.slice(1) + ' Berr' + (b.count > 1 ? 'ies' : 'y')))
    .concat(r.pokemon ? ['a ' + (r.pokemon.name || 'Pokemon') + (r.pokemon.level ? ' at level ' + r.pokemon.level : '')] : []);
  out += `## ${q.recommendedOrder}. ${q.title} (${q.id})\n\n`;
  out += `From ${q.giver || 'a trainer'} | ${q.difficulty[0].toUpperCase() + q.difficulty.slice(1)} | ${q.estimatedMinutes.min}-${q.estimatedMinutes.max} minutes | **${q.grading.mode}**\n`;
  out += `Primary chapter ${q.curriculum.primaryChapter}; chapters ${q.chapters.join(', ')}\n\n`;
  out += `${q.prompt}\n\n`;
  out += `Reward: ${reward.join(', ')}.\n\n`;
  out += `Tests (${q.grading.tests.length}):\n\n`;
  q.grading.tests.forEach(t => {
    const files = Object.entries(t.files || {});
    out += `- **${t.label}** input \`${show(t.input)}\`\n`;
    files.forEach(([n, v]) => {
      out += `  - file \`${n}\`: \`${Array.isArray(v) ? v.map(b => b.toString(16).padStart(2, '0')).join(' ') : JSON.stringify(v)}\`\n`;
    });
    out += '  - expects:\n\n';
    out += '    ```text\n' + String(t.stdout).replace(/\n$/, '').split('\n').map(l => '    ' + l).join('\n') + '\n    ```\n\n';
  });
});

fs.writeFileSync('output/Side Quest Curriculum.md', out);
console.log('wrote output/Side Quest Curriculum.md: ' + qs.length + ' labs, ' + qs.reduce((n, q) => n + q.grading.tests.length, 0) + ' cases');
