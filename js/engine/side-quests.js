/* C programming Side Quests with isolated compilation and executable grading. */
var QUEST_ID = null;
var QUEST_FILTER = 'all';
var QUEST_DIFFICULTY = 'all';
var QUEST_SEARCH = '';
var QUEST_SOURCE_LIMIT = 64000;
var C_JOB = null;

function questById(id) { return SIDE_QUESTS.find(function(q){return q.id===id && q.published;}); }
function ensureSideQuests() {
  if (!S.sideQuests || typeof S.sideQuests !== 'object') S.sideQuests={version:2,records:{}};
  if (!S.sideQuests.records || typeof S.sideQuests.records!=='object') S.sideQuests.records={};
  S.sideQuests.version=3;
}
function sideQuestProgress(id) {
  if(!SIDE_QUESTS.some(function(q){return q.id===id;}))return null;
  ensureSideQuests();
  var p=S.sideQuests.records[id];
  if(!p || typeof p!=='object')p=S.sideQuests.records[id]={};
  var defaults={status:'not-started',draft:'',startedAt:null,completedAt:null,rewardClaimed:false,
    hints:0,attempts:[],feedback:[]};
  Object.keys(defaults).forEach(function(k){if(p[k]===undefined)p[k]=defaults[k];});
  if(!p.graderMigration){
    if(p.status==='completed' && (!p.submission || p.submission.method!=='autograder'))p.status='needs-revision';
    /* Only the superseded self-review submissions are cleared. An autograder
       submission was earned against executable tests and stays valid. */
    if(p.submission&&p.submission.method==='autograder')p.legacySubmission=null;
    else{p.legacySubmission=p.submission||null;p.submission=null;}
    p.legacyAttempts=p.attempts;p.attempts=[];p.feedback=[];p.graderMigration=1;
  }
  if(p.sample===undefined)p.sample=0;
  return p;
}

function questPersist() {
  try { if(typeof stashProgress==='function')stashProgress();localStorage.setItem(SAVE_KEY,JSON.stringify(S));return true; }
  catch(e){toast('Could not save. Keep this page open and try again.');return false;}
}
function saveSideQuestDraft(id,source) {
  var p=sideQuestProgress(id);if(!p)return false;
  if(String(source).length>QUEST_SOURCE_LIMIT){toast('Keep source under 64,000 characters.');return false;}
  p.draft=String(source);questTouch(p);return questPersist();
}
function questTouch(p){if(p.status==='not-started'){p.status='in-progress';p.startedAt=Date.now();}}
function questStatus(p){return p.rewardClaimed&&p.status==='completed'?'Completed':p.status==='completed'?'Completed':p.status==='needs-revision'?'Review needed':p.status==='in-progress'?'In progress':'Not started';}
function questChapterName(n){var def=subjectDef('c');var c=def && def.CHAPTERS.find(function(x){return x.n===n;});return c?c.title:'Chapter '+n;}
function questRewardText(q){var r=q.rewards,parts=['₵ '+r.money.toLocaleString()];r.berries.forEach(function(b){parts.push(b.count+' '+(b.id==='oran'?'Oran':'Sitrus')+' Berries');});if(r.pokemon)parts.push(titleCase(dexOf(r.pokemon.id).name)+' Lv '+r.pokemon.level);return parts.join(' · ');}
function questEntryCard(){return '<section class="panel sq-entry"><div><span class="eyebrow">C PROGRAMMING</span><h3>Side Quests</h3><p>Put the chapter into practice. Thirty programming jobs, from a quick receipt to a working field journal.</p></div><button class="primary" onclick="openSideQuests()">Visit the quest board</button></section>';}
function openSideQuests(){cancelCJob();QUEST_ID=null;showScreen('quests');renderSideQuests();}
function renderSideQuests(){
  var qs=SIDE_QUESTS.filter(function(q){return q.published;}).slice().sort(function(a,b){return a.recommendedOrder-b.recommendedOrder;});
  var complete=qs.filter(function(q){return sideQuestProgress(q.id).status==='completed';}).length;
  var active=qs.filter(function(q){var s=sideQuestProgress(q.id).status;return s==='in-progress'||s==='needs-revision';});
  var next=active[0]||qs.find(function(q){return sideQuestProgress(q.id).status!=='completed';});
  var h='<div class="section-intro"><span class="eyebrow">THE StudyMon QUEST BOARD</span><h2>Side Quests</h2><p>Write real C programs for the people around the region. Try one a week, or work at your own pace. Every quest is available now.</p></div>'+
    '<div class="panel sq-summary"><strong>'+complete+' / '+qs.length+' completed</strong><span>Easy: under 30 min · Medium: 30-60 min · Hard: 1-2 hours</span><p>Time estimates assume you know the prerequisite chapters. There is no time limit.</p>'+
    (next?'<button class="primary" onclick="openSideQuest(\''+next.id+'\')">'+(active.length?'Continue: ':'Suggested next: ')+esc(next.title)+'</button>':'<p>Every job is finished. Your submitted work stays here for review.</p>')+'</div>'+
    '<details class="panel"><summary>How labs and rewards work</summary><p>These are original labs aligned to the fourth-edition C curriculum (ISBN 9780357506134), not copied textbook exercises. The primary chapter and prerequisites appear on every job.</p><p>Write C here, use Run to try an input, and Submit to compile and check every test. Output must match exactly. Every required test must pass before a quest counts or grants its reward.</p><p>Drafts save in StudyMon. There are no external files to import or export. Programs run inside a browser sandbox with a fresh in-memory filesystem for each test.</p></details>'+
    '<div class="sq-filters panel"><label>Difficulty<select id="sq-difficulty"><option value="all">All difficulties</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label><label>Progress<select id="sq-progress"><option value="all">All progress</option><option value="not-started">Not started</option><option value="in-progress">In progress</option><option value="needs-revision">Review needed</option><option value="completed">Completed</option></select></label><label>Find a quest<input id="sq-search" type="search" placeholder="Title, chapter or character" value="'+esc(QUEST_SEARCH)+'"></label></div><p id="sq-match-count" class="small" aria-live="polite"></p><div class="sq-grid">';
  qs.forEach(function(q){var p=sideQuestProgress(q.id);h+='<article class="panel sq-card" data-difficulty="'+q.difficulty+'" data-status="'+p.status+'" data-search="'+esc((q.title+' '+q.giver+' '+questChapterName(q.curriculum.primaryChapter)+' '+q.curriculum.primaryChapter).toLowerCase())+'"><div class="sq-card-top"><span class="sq-badge '+q.difficulty+'">'+titleCase(q.difficulty)+'</span><span>'+q.estimatedMinutes.min+'-'+q.estimatedMinutes.max+' min</span></div><p class="eyebrow">'+esc(q.giver)+' · Chapter '+q.curriculum.primaryChapter+'</p><h3>'+esc(q.title)+'</h3><p>'+esc(q.story)+'</p><p class="sq-reward">'+esc(questRewardText(q))+'</p><p class="small">'+questStatus(p)+'</p><button onclick="openSideQuest(\''+q.id+'\')">'+(p.status==='completed'?'Review quest':'Open quest')+'</button></article>';});
  h+='</div><p id="sq-no-results" class="panel" hidden>No quests match. Try another difficulty or clear your search.</p>';
  $('#s-quests').innerHTML=h;
  $('#sq-difficulty').value=QUEST_DIFFICULTY;$('#sq-progress').value=QUEST_FILTER;
  $('#sq-difficulty').onchange=function(){QUEST_DIFFICULTY=this.value;filterSideQuests();};
  $('#sq-progress').onchange=function(){QUEST_FILTER=this.value;filterSideQuests();};
  $('#sq-search').oninput=function(){QUEST_SEARCH=this.value;filterSideQuests();};filterSideQuests();
}
function filterSideQuests(){var count=0;document.querySelectorAll('.sq-card').forEach(function(el){var visible=(QUEST_DIFFICULTY==='all'||el.dataset.difficulty===QUEST_DIFFICULTY)&&(QUEST_FILTER==='all'||el.dataset.status===QUEST_FILTER)&&el.dataset.search.includes(QUEST_SEARCH.toLowerCase().trim());el.hidden=!visible;if(visible)count++;});$('#sq-match-count').textContent=count+' quests shown';$('#sq-no-results').hidden=!!count;}
// The in-app editor, compiler job and result renderer are defined below.
function claimSideQuestReward(id){
  var q=questById(id),p=sideQuestProgress(id);if(!q||p.status!=='completed'||p.rewardClaimed||!p.submission||p.submission.method!=='autograder'||p.submission.graderVersion!==q.grading.version||p.submission.passed!==q.grading.tests.length)return false;
  if(typeof B!=='undefined'&&B&&!B.over){toast('Finish the battle first.');return false;}
  ensureBag();if(typeof stashProgress==='function')stashProgress();var before=JSON.stringify(S),r=q.rewards,where=null;
  try {
    addMoney(r.money);r.berries.forEach(function(b){giveItem(b.id,b.count);});
    if(r.pokemon){var m=makeMon(r.pokemon.id,r.pokemon.level,{shiny:false});where=S.party.length<6?'party':'box';S[where].push(m);S.seen[m.id]=true;S.caught[m.id]=true;S.totals.caught=(S.totals.caught||0)+1;}
    p.rewardClaimed=true;p.rewardReceipt={at:Date.now(),money:r.money,berries:JSON.parse(JSON.stringify(r.berries)),pokemon:r.pokemon,deliveredTo:where};
    if(typeof stashProgress==='function')stashProgress();localStorage.setItem(SAVE_KEY,JSON.stringify(S));
  }catch(e){S=JSON.parse(before);bindProgress(activeSubject());toast('Reward could not be saved. Keep this page open and submit again to retry.');return false;}
  renderTopbar();if(CUR==='quests'&&QUEST_ID===id)renderSideQuest();toast('All tests passed. Reward collected.'+(where?' Your Pokémon joined '+(where==='box'?'a storage box.':'your party.'):' Berries are in your Party pouch.'));return true;
}
/* Quest berries are earned, not sold. Their effect is available between battles. */
ITEMS.oran={name:'Oran Berry',kind:'berry',price:200,blurb:'Restores 10 HP to a living Pokémon between battles.'};
ITEMS.sitrus={name:'Sitrus Berry',kind:'berry',price:500,blurb:'Restores a quarter of max HP to a living Pokémon between battles.'};
function renderQuestBerryPouch(){ensureBag();var h='<section class="panel sq-berries"><h3>Berry pouch</h3><p>Side Quest rewards for the road. Feed a berry to a living party member between battles.</p>';['oran','sitrus'].forEach(function(k){h+='<button '+(!itemCount(k)?'disabled':'')+' onclick="openQuestBerry(\''+k+'\')">'+ITEMS[k].name+' × '+itemCount(k)+'</button> ';});h+='<p class="small">Oran: 10 HP. Sitrus: 25% of max HP. Berries do not revive fainted Pokémon.</p><button class="ghost" onclick="openSideQuests()">Find a Side Quest</button></section>';$('#s-party').insertAdjacentHTML('beforeend',h);}
function openQuestBerry(key){if(!['oran','sitrus'].includes(key)||!itemCount(key))return;var h='<h2>Feed an '+esc(ITEMS[key].name)+'</h2><div class="row">';S.party.forEach(function(m,i){h+='<button '+(m.hp<=0||m.hp>=maxHp(m)?'disabled':'')+' onclick="feedQuestBerry(\''+key+'\','+i+')">'+esc(monName(m))+'<br>HP '+m.hp+'/'+maxHp(m)+'</button>';});modal(h+'</div><button onclick="closeModal()">Keep it for later</button>');}
function feedQuestBerry(key,index){if(!['oran','sitrus'].includes(key))return false;if(typeof B!=='undefined'&&B&&!B.over){toast('Berries are for between battles.');return false;}var m=S.party[index];if(!m||m.hp<=0||m.hp>=maxHp(m)||!itemCount(key))return false;var oldHp=m.hp,oldCount=itemCount(key);useItem(key,1);m.hp=Math.min(maxHp(m),m.hp+(key==='oran'?10:Math.max(1,Math.floor(maxHp(m)/4))));if(!questPersist()){m.hp=oldHp;S.items[key]=oldCount;return false;}closeModal();renderParty();toast(monName(m)+' recovered '+(m.hp-oldHp)+' HP.');return true;}
function openSideQuest(id){if(!questById(id))return;cancelCJob();QUEST_ID=id;showScreen('quests');var p=sideQuestProgress(id),q=questById(id);if(!p.draft){p.draft=q.starterCode;questPersist();}renderSideQuest();}
function questOpenNotes(n){cancelCJob();if(activeSubject()!=='c')switchSubject('c');goStudy(n);}
function revealQuestHint(){var q=questById(QUEST_ID),p=sideQuestProgress(QUEST_ID);p.hints=Math.min(q.hints.length,p.hints+1);questPersist();renderSideQuest();}
function selectQuestSample(index){var q=questById(QUEST_ID),p=sideQuestProgress(QUEST_ID);p.sample=index;p.runInput=q.grading.tests[index].input;p.runFiles=JSON.parse(JSON.stringify(q.grading.tests[index].files||{}));questPersist();renderSideQuest();}
function renderSideQuest(){
 var q=questById(QUEST_ID);if(!q){openSideQuests();return;}var p=sideQuestProgress(q.id),ch=q.curriculum;
 if(p.sample>=q.grading.tests.length)p.sample=0;
 var sample=q.grading.tests[p.sample];
 if(p.runInput===undefined)p.runInput=sample.input;
 if(!p.runFiles)p.runFiles=JSON.parse(JSON.stringify(sample.files||{}));
 var h='<button class="ghost" onclick="openSideQuests()">Back to Side Quests</button><div class="section-intro"><span class="eyebrow">'+esc(q.giver)+' HAS A JOB FOR YOU</span><h2>'+esc(q.title)+'</h2><div class="row"><span class="sq-badge '+q.difficulty+'">'+titleCase(q.difficulty)+'</span><span>'+q.estimatedMinutes.min+'-'+q.estimatedMinutes.max+' minutes · '+questStatus(p)+'</span></div><p>'+esc(q.story)+'</p></div>'+
 '<div class="sq-detail-grid"><section class="panel"><h3>The exact contract</h3><p>'+esc(q.implementationContract)+'</p><p class="note">'+esc(q.inputPolicy)+'</p>'+(q.grading.mode==='functions'?'<details><summary>Required types and signatures</summary><pre class="sq-code">'+esc(q.starterCode)+'</pre></details>':'')+'</section><aside><section class="panel"><h3>Chapter '+ch.primaryChapter+'</h3><p>'+esc(questChapterName(ch.primaryChapter))+'</p><button onclick="questOpenNotes('+ch.primaryChapter+')">Read chapter notes</button><p class="small">Prerequisites: '+ch.prerequisiteChapters.map(function(n){return n+'. '+esc(questChapterName(n));}).join('; ')+'.</p></section><section class="panel"><h3>Reward</h3><p>'+esc(questRewardText(q))+'</p><p class="small">Granted once, after all tests pass.</p>'+(p.rewardClaimed?'<p>Reward already received.</p>':'')+'</section><details class="panel"><summary>Hints</summary>'+q.hints.map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+'</details></aside></div>'+
 '<section class="panel sq-workspace"><div class="sq-editor-head"><h3>Your C program</h3><span class="small">C11 · Clang · Strict warnings</span></div><label class="sr-only" for="sq-source">C source</label><textarea class="sq-editor" id="sq-source" rows="20" spellcheck="false" autocapitalize="off" autocomplete="off" maxlength="64000">'+esc(p.draft)+'</textarea><p id="sq-save-status" class="small" role="status">Draft saved in StudyMon. '+(q.grading.mode==='functions'?'Implement the required functions; the game supplies main().':'Write your complete program, including main().')+'</p><div class="sq-runbar"><button id="sq-run" onclick="runQuestCode(false)">Run</button><button class="primary" id="sq-submit" onclick="runQuestCode(true)">Submit</button><button id="sq-stop" class="ghost" onclick="cancelCJob(\'Stopped. Your draft is saved.\')" hidden>Stop</button><span id="sq-job-status" role="status" aria-live="polite">'+(p.status==='completed'?'All tests passed.':'')+'</span></div></section>'+
 '<div class="sq-two"><section class="panel"><h3>Try an input</h3><label>Test fixture<select id="sq-sample">'+q.grading.tests.map(function(t,i){return '<option value="'+i+'"'+(i===p.sample?' selected':'')+'>'+esc(t.label)+'</option>';}).join('')+'</select></label><label for="sq-stdin">Standard input</label><textarea id="sq-stdin" rows="5" maxlength="16000" spellcheck="false">'+esc(p.runInput)+'</textarea>'+
 Object.keys(p.runFiles).map(function(name){var value=p.runFiles[name],binary=Array.isArray(value);return '<label>Sandbox file: '+esc(name)+(binary?' (hex bytes)':'')+'<textarea data-sq-file="'+esc(name)+'" data-binary="'+binary+'" maxlength="16000" rows="4" spellcheck="false">'+esc(binary?value.map(function(n){return n.toString(16).padStart(2,'0');}).join(' '):value)+'</textarea></label>';}).join('')+'<p class="small">Editing these inputs affects Run only. Submit uses the full test suite. File fixtures exist only inside StudyMon.</p><details><summary>Expected output for the selected fixture</summary><pre class="sq-code">'+esc(sample.stdout===undefined?'Tests are being prepared.':sample.stdout)+'</pre></details></section><section class="panel"><h3>Output</h3><pre id="sq-output" class="sq-code sq-output" role="log" aria-label="Program output">'+esc(p.lastRun?p.lastRun.output||'(no output)':'Run your program to see its output here.')+'</pre><pre id="sq-diagnostics" class="sq-code sq-diagnostics" aria-label="Compiler diagnostics">'+esc(p.lastRun?p.lastRun.diagnostics||'':'')+'</pre></section></div>'+
 '<section class="panel"><h3>Autograder</h3><div id="sq-grade-results" aria-live="polite">'+renderQuestGradeResult(p.lastGrade&&{sourceChanged:p.lastGrade.source!==undefined&&p.lastGrade.source!==p.draft,at:p.lastGrade.at,passed:p.lastGrade.passed,total:p.lastGrade.total,cases:p.lastGrade.cases})+'</div><p class="small">Exact comparison includes whitespace and final newlines. The tests accept any implementation satisfying the contract. Passing tests is not a proof that a C program is free of every possible error.</p></section>';
 $('#s-quests').innerHTML=h;
 $('#sq-source').oninput=function(){cancelCJob('Source changed. Run or submit this version.');var ok=saveSideQuestDraft(q.id,this.value);$('#sq-save-status').textContent=ok?'Draft saved.':'Could not save. Keep this page open and try again.';if(p.lastGrade)$('#sq-grade-results').innerHTML=renderQuestGradeResult(Object.assign({},p.lastGrade,{sourceChanged:p.lastGrade.source!==p.draft}));};
 $('#sq-stdin').oninput=function(){p.runInput=this.value;questPersist();};
 $('#sq-sample').onchange=function(){cancelCJob();selectQuestSample(Number(this.value));};
 document.querySelectorAll('[data-sq-file]').forEach(function(el){el.oninput=function(){if(this.dataset.binary==='true'){var text=this.value.trim();if(text&&!/^[0-9a-fA-F]{2}(?:\s+[0-9a-fA-F]{2})*$/.test(text)){this.setCustomValidity('Enter two-digit hexadecimal bytes separated by spaces.');return;}this.setCustomValidity('');p.runFiles[this.dataset.sqFile]=text?text.split(/\s+/).map(function(v){return parseInt(v,16);}):[];}else p.runFiles[this.dataset.sqFile]=this.value;questPersist();};});
 if(C_JOB)setQuestBusy(true,'Working…');
}
function renderQuestGradeResult(result){
 if(!result)return '<p>Not submitted yet. All required tests must pass to complete this quest.</p>';
 return '<p><strong>'+result.passed+' / '+result.total+' tests passed</strong> · '+(result.sourceChanged?'Result belongs to an earlier draft.':esc(new Date(result.at).toLocaleString()))+'</p>'+result.cases.map(function(c,i){return '<details class="sq-grade-case '+(c.passed?'pass':'fail')+'" '+(!c.passed?'open':'')+'><summary>'+(c.passed?'PASS':'FAIL')+' · '+esc(c.label||'Case '+(i+1))+'</summary>'+(c.passed?'<p>Exact output matched; exit code 0.</p>':'<p>'+esc(c.error||'Output did not match.')+'</p><div class="sq-two"><div>Expected<pre class="sq-code">'+esc(c.expected||'')+'</pre></div><div>Actual<pre class="sq-code">'+esc(c.actual||'')+'</pre></div></div><p class="small">Escaped expected: <code>'+esc(JSON.stringify(c.expected||''))+'</code><br>Escaped actual: <code>'+esc(JSON.stringify(c.actual||''))+'</code></p>')+'</details>';}).join('');
}
function setQuestBusy(busy,message){if(!$('#sq-run'))return;$('#sq-run').disabled=busy;$('#sq-submit').disabled=busy;$('#sq-stop').hidden=!busy;$('#sq-job-status').textContent=message||'';}
function cancelCJob(message){if(C_JOB){clearTimeout(C_JOB.timer);C_JOB.worker.terminate();C_JOB=null;}if(message)setQuestBusy(false,message);else setQuestBusy(false,'');}
async function runQuestCode(submit){
 if(C_JOB||!QUEST_ID)return;
 var q=questById(QUEST_ID),p=sideQuestProgress(QUEST_ID),source=p.draft;
 if(!source.trim()){setQuestBusy(false,'Write your program first.');return;}
 if(!submit)for(var el of document.querySelectorAll('[data-sq-file]'))if(!el.reportValidity())return;
 if(!questPersist())return;
 var worker=new Worker('js/engine/c-worker.js'),job={worker:worker,owner:S,id:q.id,source:source,submit:submit,results:[],timer:null,diagnostics:''};C_JOB=job;
 var current=function(){return C_JOB===job && S===job.owner && QUEST_ID===job.id && CUR==='quests' && sideQuestProgress(job.id).draft===job.source;};
 function arm(ms){clearTimeout(job.timer);job.timer=setTimeout(function(){if(!current())return;var phase=job.phase==='run'?'Time limit exceeded (3 seconds).':'Compiler timed out. Try again.';finishError(phase);},ms);}
 function finishError(message,diagnostics){if(!current())return;var idx=job.index||0;if(submit){job.results.push({label:q.grading.tests[idx].label,passed:false,error:message,expected:q.grading.tests[idx].stdout,actual:''});p.lastGrade={at:Date.now(),source:source,passed:job.results.filter(function(r){return r.passed;}).length,total:q.grading.tests.length,cases:job.results};if(p.status!=='completed')p.status='needs-revision';}p.lastRun={output:'',diagnostics:(diagnostics||'')+'\n'+message};questPersist();cancelCJob();renderSideQuest();setQuestBusy(false,message);}
 setQuestBusy(true,'Preparing the C compiler…');$('#sq-diagnostics').textContent='';$('#sq-output').textContent='';arm(45000);
 worker.onerror=function(e){finishError('Compiler worker failed: '+e.message);};
 worker.onmessage=async function(event){
  if(!current()){if(C_JOB===job)cancelCJob('Result discarded because the draft or game changed.');return;}
  var d=event.data;
  if(d.type==='phase'){job.phase=d.phase;job.index=d.index;arm(d.phase==='compile'?45000:3000);setQuestBusy(true,d.phase==='compile'?'Compiling C11…':submit?'Running test '+(d.index+1)+' of '+q.grading.tests.length+'…':'Running…');}
  if(d.type==='compiled'){job.diagnostics=d.diagnostics;$('#sq-diagnostics').textContent=d.diagnostics;}
  if(d.type==='error'){finishError(d.message,d.diagnostics);return;}
  if(d.type==='case'){
   if(submit){var t=q.grading.tests[d.index];job.results.push({label:t.label,passed:d.exitCode===0&&!d.error&&d.output===t.stdout&&d.stderr==='',expected:t.stdout,actual:d.output,error:d.error||(d.exitCode?'Exit code '+d.exitCode:d.stderr?'Unexpected stderr output.':null)});$('#sq-grade-results').innerHTML=renderQuestGradeResult({at:Date.now(),passed:job.results.filter(function(r){return r.passed;}).length,total:q.grading.tests.length,cases:job.results});}
   else{p.lastRun={at:Date.now(),output:d.output,diagnostics:d.stderr+(d.error?'\n'+d.error:''),exitCode:d.exitCode};$('#sq-output').textContent=d.output||'(no output)';$('#sq-diagnostics').textContent=p.lastRun.diagnostics;}
  }
  if(d.type==='done'){
   clearTimeout(job.timer);worker.terminate();C_JOB=null;
   if(submit){var passed=job.results.filter(function(r){return r.passed;}).length,ok=passed===q.grading.tests.length&&job.results.length===q.grading.tests.length;
    p.lastGrade={at:Date.now(),source:source,passed:passed,total:q.grading.tests.length,cases:job.results};
    p.attempts.push({at:Date.now(),complete:ok,method:'autograder',passed:passed,total:q.grading.tests.length});p.attempts=p.attempts.slice(-5);
    if(ok){p.status='completed';p.completedAt=Date.now();p.submission={questId:q.id,method:'autograder',graderVersion:q.grading.version,source:source,passed:passed,total:q.grading.tests.length,at:Date.now()};}else if(p.status!=='completed')p.status='needs-revision';
    var saved=questPersist();renderSideQuest();setQuestBusy(false,ok?(saved?'All tests passed!':'Tests passed, but saving failed. Submit again to save.'):'Some tests failed. Check the results below.');if(ok&&saved)claimSideQuestReward(q.id);
   }else{questPersist();setQuestBusy(false,p.lastRun.exitCode===0?'Run finished (exit code 0).':'Run failed. See output.');}
  }
 };
 worker.postMessage({source:source,harness:q.grading.harness,cases:submit?q.grading.tests:[{input:p.runInput||'',files:p.runFiles||{}}]});
}
