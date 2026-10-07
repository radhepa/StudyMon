/* Run every check in order and summarise. Needs the local server running.

   Static checks come first because they are fast and a failure there usually
   explains the browser failures that would follow. */
const {execFileSync,spawnSync}=require('child_process');
const fs=require('fs'),os=require('os'),path=require('path');
const NODE=process.execPath;
/* One stuck suite must not hang the whole run. Output goes to a temp file, not
   a pipe: a killed suite's headless Edge children would otherwise hold the pipe
   open and keep even a timed-out spawnSync from returning. */
const SUITE_TIMEOUT_MS=Number(process.env.SUITE_TIMEOUT_MS)||5*60*1000;

/* On Windows the Edge processes a suite launched outlive the killed node
   process, so stop its whole descendant tree by parent PID. */
function killDescendants(pid){
  if(process.platform!=='win32'||!pid)return;
  const ps='function K($p){Get-CimInstance Win32_Process -Filter "ParentProcessId=$p" | '+
    'ForEach-Object { K $_.ProcessId; Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }}; K '+pid;
  try{execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',ps],{stdio:'ignore',timeout:30000});}catch(e){}
}

function runSuite(script){
  const log=path.join(os.tmpdir(),'studymon-check-'+process.pid+'.log');
  const fd=fs.openSync(log,'w');
  const r=spawnSync(NODE,[script],{stdio:['ignore',fd,fd],timeout:SUITE_TIMEOUT_MS,windowsHide:true});
  fs.closeSync(fd);
  const timedOut=!!(r.error&&r.error.code==='ETIMEDOUT');
  if(timedOut)killDescendants(r.pid);
  let out='';
  try{out=fs.readFileSync(log,'utf8');fs.unlinkSync(log);}catch(e){}
  return {out,timedOut,ok:!timedOut&&!r.error&&r.status===0};
}
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
  ['Phase 6 gym leaders', 'tools/check-gym-leaders.cjs'],
  ['Phase 6 quest framing', 'tools/check-quest-framing.cjs'],
  ['Phase 7 world state', 'tools/check-world-state.cjs'],
  ['Phase 7 rumors', 'tools/check-rumors.cjs'],
  ['Phase 7 mail', 'tools/check-mail.cjs'],
  ['Phase 7 vignettes', 'tools/check-vignettes.cjs'],
  ['Phase 7 walk-ins', 'tools/check-walkins.cjs'],
  ['Phase 7 relationship web', 'tools/check-relationship-web.cjs'],
  ['Phase 7 batch: chart exchange', 'tools/check-batch-chart-exchange.cjs'],
  ['Phase 7 batch: stack ridge', 'tools/check-batch-stack-ridge.cjs'],
  ['Phase 7 matrix',   'tools/check-phase7-matrix.cjs'],
  ['EXP Share grant',  'tools/check-exp-share.cjs'],
  ['friend scenes',     'tools/check-scenes.cjs'],
  ['battles',           'tools/check-battle.cjs'],
  ['progression',       'tools/check-progression.cjs'],
  ['evolution',         'tools/check-evolution.cjs'],
  ['original StudyMon', 'tools/check-fakemon.cjs'],
  ['Isles originals',   'tools/check-isles-originals.cjs'],
  ['persistence',       'tools/check-persistence.cjs'],
  ['calculus region',   'tools/check-calc-region.cjs'],
  ['calculus problems', 'tools/check-calc-problems.cjs'],
  ['calculus review',   'tools/check-calc-review.cjs'],
  ['question format',   'tools/check-question-format.cjs'],
  ['play-test fixes',   'tools/check-playtest-fixes.cjs'],
  ['autograder',        'tools/check-autograder.cjs'],
  ['midterm lab cross-check', 'tools/check-midterm-labs.cjs'],
  ['lab cutscenes',     'tools/check-lab-scenes.cjs'],
  ['lab art direction', 'tools/check-lab-direction.cjs'],
  ['runtime edges',     'tools/check-runtime-edges.cjs'],
  ['Pokemon Kingdom',   'tools/check-kingdom.cjs'],
  ['Bootstrap data',    'tools/check-human-world.cjs'],
  ['Bootstrap sprites', 'tools/check-human-sprites.cjs'],
  ['Bootstrap nav',     'tools/check-human-world-nav.cjs'],
  ['Bootstrap browser', 'tools/check-human-world-browser.cjs'],
  ['Community world',   'tools/check-community-world-browser.cjs'],
  ['House systems',     'tools/check-house.cjs'],
  ['UI sweep',          'tools/check-ui-sweep.cjs'],
];
const only=process.argv.slice(2);
let failed=0;
for(const [name,script] of SUITES){
  if(only.length && !only.some(o=>name.includes(o)||script.includes(o))) continue;
  process.stdout.write('\n=== '+name+' ('+script+') ===\n');
  const r=runSuite(script);
  if(r.ok){
    process.stdout.write(r.out.split('\n').filter(l=>/^(PASS|FAIL|\d+\/\d+|PROBLEMS)/.test(l)||/checks passed|PASS:/.test(l)).join('\n')+'\n');
  }else{
    failed++;
    process.stdout.write(r.out.split('\n').filter(l=>/FAIL|Error|checks passed/.test(l)).slice(0,12).join('\n')+'\n');
    process.stdout.write(r.timedOut?'  -> SUITE TIMED OUT after '+Math.round(SUITE_TIMEOUT_MS/1000)+'s (process tree stopped)\n':'  -> SUITE FAILED\n');
  }
}
console.log('\n'+(failed?failed+' suite(s) failed':'all suites passed'));
if(failed)process.exitCode=1;
