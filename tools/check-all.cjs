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
