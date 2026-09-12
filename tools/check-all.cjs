/* Run every check in order and summarise. Needs the local server running.

   Static checks come first because they are fast and a failure there usually
   explains the browser failures that would follow. */
const {execFileSync}=require('child_process');
const NODE=process.execPath;
const SUITES=[
  ['question banks',    'tools/check-questions.cjs'],
  ['side quest data',   'tools/check-side-quests.cjs'],
  ['handlers',          'tools/check-handlers.cjs'],
  ['type chart',        'tools/check-typechart.cjs'],
  ['battle maths',      'tools/check-maths.cjs'],
  ['data integrity',    'tools/check-integrity.cjs'],
  ['gameplay',          'tools/check-gameplay.cjs'],
  ['systems',           'tools/check-systems.cjs'],
  ['item registry',     'tools/check-items.cjs'],
  ['item distribution', 'tools/check-item-distribution.cjs'],
  ['gift transactions', 'tools/check-gifts.cjs'],
  ['economy simulation', 'tools/check-economy.cjs'],
  ['cast registry',     'tools/check-cast.cjs'],
  ['friend progression','tools/check-friends.cjs'],
  ['social context',    'tools/check-social-context.cjs'],
  ['Phase 4 core cast', 'tools/check-core-cast-phase4.cjs'],
    ['Phase 4 Mira',      'tools/check-mira-phase4.cjs'],
    ['Phase 4 Theo',      'tools/check-theo-phase4.cjs'],
    ['Phase 4 June',      'tools/check-june-phase4.cjs'],
    ['Phase 4 Ellis',     'tools/check-ellis-phase4.cjs'],
    ['Phase 4 Kern',      'tools/check-aide-phase4.cjs'],
    ['Phase 4 Linden',    'tools/check-linden-phase4.cjs'],
    ['Phase 4 Hawthorn',  'tools/check-hawthorn-phase4.cjs'],
  ['Phase 5 ledger',    'tools/check-phase5-ledger.cjs'],
    ['Phase 5 Dr. Oakes', 'tools/check-oakes-phase5.cjs'],
    ['Phase 5 pier fishermen', 'tools/check-pier-fishermen-phase5.cjs'],
    ['Phase 5 café counter', 'tools/check-cafe-phase5.cjs'],
    ['Phase 5 quarter aces', 'tools/check-quarter-aces-phase5.cjs'],
    ['Phase 5 ridge hikers', 'tools/check-ridge-hikers-phase5.cjs'],
    ['Phase 5 cavern keepers', 'tools/check-cavern-keepers-phase5.cjs'],
    ['Phase 5 archive desk', 'tools/check-archive-phase5.cjs'],
    ['Phase 5 meadow bug catchers', 'tools/check-meadow-bugs-phase5.cjs'],
  ['EXP Share grant',  'tools/check-exp-share.cjs'],
  ['friend scenes',     'tools/check-scenes.cjs'],
  ['battles',           'tools/check-battle.cjs'],
  ['progression',       'tools/check-progression.cjs'],
  ['evolution',         'tools/check-evolution.cjs'],
  ['persistence',       'tools/check-persistence.cjs'],
  ['calculus region',   'tools/check-calc-region.cjs'],
  ['calculus problems', 'tools/check-calc-problems.cjs'],
  ['autograder',        'tools/check-autograder.cjs'],
  ['runtime edges',     'tools/check-runtime-edges.cjs'],
  ['UI sweep',          'tools/check-ui-sweep.cjs'],
];
const only=process.argv.slice(2);
let failed=0;
for(const [name,script] of SUITES){
  if(only.length && !only.some(o=>name.includes(o)||script.includes(o))) continue;
  process.stdout.write('\n=== '+name+' ('+script+') ===\n');
  try{
    const out=execFileSync(NODE,[script],{encoding:'utf8',stdio:['ignore','pipe','pipe']});
    process.stdout.write(out.split('\n').filter(l=>/^(PASS|FAIL|\d+\/\d+|PROBLEMS)/.test(l)||/checks passed|PASS:/.test(l)).join('\n')+'\n');
  }catch(e){
    failed++;
    const out=(e.stdout||'')+(e.stderr||'');
    process.stdout.write(out.split('\n').filter(l=>/FAIL|Error|checks passed/.test(l)).slice(0,12).join('\n')+'\n');
    process.stdout.write('  -> SUITE FAILED\n');
  }
}
console.log('\n'+(failed?failed+' suite(s) failed':'all suites passed'));
if(failed)process.exitCode=1;
