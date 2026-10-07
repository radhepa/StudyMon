/* C programming Side Quests with isolated compilation and executable grading. */
var QUEST_ID = null;
var QUEST_FILTER = 'all';
var QUEST_DIFFICULTY = 'all';
var QUEST_SEARCH = '';
var QUEST_SET = 'all';
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
function questRewardText(q){var r=q.rewards,parts=['₵ '+r.money.toLocaleString()];r.berries.forEach(function(b){var item=itemById(b.id);parts.push(b.count+' '+(item?item.name:b.id));});if(r.keepsake){var k=typeof collectItem==='function'?collectItem(r.keepsake):null;parts.push(k?k.name:r.keepsake);}if(r.pokemon)parts.push((r.pokemon.shiny?'Shiny ':'')+titleCase(dexOf(r.pokemon.id).name)+' Lv '+r.pokemon.level);return parts.join(' · ');}
function questEntryCard(){return '<section class="panel sq-entry"><div><span class="eyebrow">C PROGRAMMING</span><h3>Side Quests</h3><p>Put the chapter into practice. Forty-nine programming jobs, from a quick receipt to a working field journal, including a nineteen-job midterm review set.</p></div><button class="primary" onclick="openSideQuests()">Visit the quest board</button></section>';}
function openSideQuests(){cancelCJob();QUEST_ID=null;showScreen('quests');renderSideQuests();}
function renderSideQuests(){
  grantQuestKeepsakes(false);
  var qs=SIDE_QUESTS.filter(function(q){return q.published;}).slice().sort(function(a,b){return a.recommendedOrder-b.recommendedOrder;});
  var complete=qs.filter(function(q){return sideQuestProgress(q.id).status==='completed';}).length;
  var active=qs.filter(function(q){var s=sideQuestProgress(q.id).status;return s==='in-progress'||s==='needs-revision';});
  var next=active[0]||qs.find(function(q){return sideQuestProgress(q.id).status!=='completed';});
  var h='<div class="section-intro"><span class="eyebrow">The StudyMon Quest Board</span><h2>Side Quests</h2><p>Write real C programs for the people around the region. Try one a week, or work at your own pace. Every quest is available now.</p></div>'+
    '<div class="panel sq-summary"><strong>'+complete+' / '+qs.length+' completed</strong><span>Easy: under 30 min · Medium: 30-60 min · Hard: 1-2 hours</span><p>Time estimates assume you know the prerequisite chapters. There is no time limit.</p>'+
    (next?'<button class="primary" onclick="startSideQuest(\''+next.id+'\')">'+(active.length?'Continue: ':'Suggested next: ')+esc(next.title)+'</button>':'<p>Every job is finished. Your submitted work stays here for review.</p>')+'</div>'+
    '<details class="panel"><summary>How labs and rewards work</summary><p>These are original labs aligned to the fourth-edition C curriculum (ISBN 9780357506134), not copied textbook exercises. The primary chapter and prerequisites appear on every job.</p><p>Write C here, use Run to try an input, and Submit to compile and check every test. Output must match exactly. Every required test must pass before a quest counts or grants its reward.</p><p>Drafts save in StudyMon. There are no external files to import or export. Programs run inside a browser sandbox with a fresh in-memory filesystem for each test.</p></details>'+
    '<div class="sq-filters panel"><label>Set<select id="sq-set"><option value="all">Every job</option><option value="midterm-review">Midterm review ('+qs.filter(function(q){return q.collection==='midterm-review';}).length+')</option></select></label><label>Difficulty<select id="sq-difficulty"><option value="all">All difficulties</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label><label>Progress<select id="sq-progress"><option value="all">All progress</option><option value="not-started">Not started</option><option value="in-progress">In progress</option><option value="needs-revision">Review needed</option><option value="completed">Completed</option></select></label><label>Find a quest<input id="sq-search" type="search" placeholder="Title, chapter or character" value="'+esc(QUEST_SEARCH)+'"></label></div><p id="sq-match-count" class="small" aria-live="polite"></p><div class="sq-grid">';
  // The card says "Chapter N", so the search text carries "chapter N" and "ch N" too.
  qs.forEach(function(q){var p=sideQuestProgress(q.id),n=q.curriculum.primaryChapter;h+='<article class="panel sq-card" data-difficulty="'+q.difficulty+'" data-status="'+p.status+'" data-set="'+esc(q.collection||'')+'" data-chapter="'+n+'" data-search="'+esc((q.title+' '+q.giver+' '+questChapterName(n)+' chapter '+n+' ch '+n+' ch'+n+' '+(q.topics||[]).join(' ')).toLowerCase())+'"><div class="sq-card-top"><span class="sq-badge '+q.difficulty+'">'+titleCase(q.difficulty)+'</span><span>'+q.estimatedMinutes.min+'-'+q.estimatedMinutes.max+' min</span></div><p class="eyebrow">'+esc(q.giver)+' · Chapter '+q.curriculum.primaryChapter+(typeof questFrameFor==='function'&&questFrameFor(q.id)?' \u00b7 Story job':'')+(q.collection==='midterm-review'?' \u00b7 Midterm review':'')+'</p><h3>'+esc(q.title)+'</h3><p>'+esc(q.story)+'</p><p class="sq-reward">'+esc(questRewardText(q))+'</p><p class="small">'+questStatus(p)+'</p><button onclick="startSideQuest(\''+q.id+'\')">'+(p.status==='completed'?'Review quest':'Open quest')+'</button></article>';});
  h+='</div><p id="sq-no-results" class="panel" hidden>No quests match. Try another difficulty or clear your search.</p>';
  $('#s-quests').innerHTML=h;
  $('#sq-set').value=QUEST_SET;$('#sq-difficulty').value=QUEST_DIFFICULTY;$('#sq-progress').value=QUEST_FILTER;
  $('#sq-set').onchange=function(){QUEST_SET=this.value;filterSideQuests();};
  $('#sq-difficulty').onchange=function(){QUEST_DIFFICULTY=this.value;filterSideQuests();};
  $('#sq-progress').onchange=function(){QUEST_FILTER=this.value;filterSideQuests();};
  $('#sq-search').oninput=function(){QUEST_SEARCH=this.value;filterSideQuests();};filterSideQuests();
}
/* "chapter 1" (or "ch 1", "ch.1") means that chapter exactly, not 10-15 as well. */
function filterSideQuests(){var count=0,term=QUEST_SEARCH.toLowerCase().trim().replace(/\s+/g,' '),chapter=term.match(/^(?:chapter|ch)\.? ?(\d+)$/);document.querySelectorAll('.sq-card').forEach(function(el){var visible=(QUEST_SET==='all'||el.dataset.set===QUEST_SET)&&(QUEST_DIFFICULTY==='all'||el.dataset.difficulty===QUEST_DIFFICULTY)&&(QUEST_FILTER==='all'||el.dataset.status===QUEST_FILTER)&&(chapter?el.dataset.chapter===String(Number(chapter[1])):el.dataset.search.includes(term));el.hidden=!visible;if(visible)count++;});$('#sq-match-count').textContent=count+' quests shown';$('#sq-no-results').hidden=!!count;}
// The in-app editor, compiler job and result renderer are defined below.
function claimSideQuestReward(id){
  var q=questById(id),p=sideQuestProgress(id);if(!q||p.status!=='completed'||p.rewardClaimed||!p.submission||p.submission.method!=='autograder'||p.submission.graderVersion!==q.grading.version||p.submission.passed!==q.grading.tests.length)return false;
  if(typeof B!=='undefined'&&B&&!B.over){toast('Finish the battle first.');return false;}
  ensureBag();if(typeof stashProgress==='function')stashProgress();var before=JSON.stringify(S),r=q.rewards,where=null;
  try {
    addMoney(r.money);r.berries.forEach(function(b){if(!itemById(b.id)||!giveItem(b.id,b.count))throw new Error('invalid item reward '+b.id);});
    if(r.pokemon){var m=makeMon(r.pokemon.id,r.pokemon.level,{shiny:!!r.pokemon.shiny});where=S.party.length<6?'party':'box';S[where].push(m);S.seen[m.id]=true;S.caught[m.id]=true;S.totals.caught=(S.totals.caught||0)+1;}
    p.rewardClaimed=true;p.rewardReceipt={at:Date.now(),money:r.money,berries:JSON.parse(JSON.stringify(r.berries)),pokemon:r.pokemon,keepsake:r.keepsake||null,deliveredTo:where};
    if(typeof stashProgress==='function')stashProgress();localStorage.setItem(SAVE_KEY,JSON.stringify(S));
  }catch(e){S=JSON.parse(before);bindProgress(activeSubject());toast('Reward could not be saved. Keep this page open and submit again to retry.');return false;}
  p.rewardReceipt.keepsakes=grantQuestKeepsakes(true);questPersist();
  renderTopbar();if(CUR==='quests'&&QUEST_ID===id)renderSideQuest();if(!(typeof labSceneAfterClaim==='function'&&labSceneAfterClaim(id)))toast('All tests passed. Reward collected.'+(where?' Your Pokémon joined '+(where==='box'?'a storage box.':'your party.'):' Berries are in your Bag.'));return true;
}
/* Keepsakes live in S.collection, and only collectFind may write there, so they
   are handed over after the claim itself has saved. Running this again for every
   claimed quest is safe: anything already in the collection is skipped. That
   also repairs a save whose keepsake write failed, and gives older saves the
   Cracked Compiler Pin for jobs finished before it was wired up. */
function grantQuestKeepsakes(quiet){
  if(typeof collectFind!=='function'||typeof collectHas!=='function'||!S.sideQuests||!S.sideQuests.records)return [];
  var records=S.sideQuests.records,fresh=[];
  var claimed=function(q){return !!(records[q.id]&&records[q.id].rewardClaimed);};
  var give=function(id){if(id&&!collectHas(id)&&collectFind(id,{quiet:quiet}))fresh.push(id);};
  var done=SIDE_QUESTS.filter(claimed);
  if(done.length)give('cracked-compiler-pin');
  done.forEach(function(q){give(q.rewards.keepsake);});
  var midterm=SIDE_QUESTS.filter(function(q){return q.published&&q.collection==='midterm-review';});
  if(midterm.length&&midterm.every(claimed))give('midterm-ribbon');
  return fresh;
}
function openSideQuest(id){if(!questById(id))return;cancelCJob();QUEST_ID=id;showScreen('quests');var p=sideQuestProgress(id),q=questById(id);if(!p.draft){p.draft=q.starterCode;questPersist();}renderSideQuest();}
/* The board is open from every region, but its notes are the C-Region's. In the
   C-Region they open on the Notes screen as before. Anywhere else they open
   right here on the quest screen, read straight from the C subject: sailing the
   player to C just to read (switchSubject) silently moved them, their badge chip
   and their next map visit with no word about it. */
var QUEST_NOTES_FROM=null;
function questOpenNotes(n){
 cancelCJob();
 if(activeSubject()==='c'){goStudy(n);return;}
 QUEST_NOTES_FROM={y:window.scrollY};
 renderQuestNotes(n);window.scrollTo(0,0);
 var heading=$('#sq-notes-title');if(heading)heading.focus({preventScroll:true});
}
function renderQuestNotes(n){
 var q=questById(QUEST_ID),def=subjectDef('c'),c=def&&def.CHAPTERS.find(function(x){return x.n===n;});
 if(!c){questCloseNotes();return;}
 var back=q?'Back to '+esc(q.title):'Back to Side Quests',list=q?[q.curriculum.primaryChapter].concat(q.curriculum.prerequisiteChapters):[n];
 list=list.filter(function(x,i){return list.indexOf(x)===i;});
 var h='<button class="ghost" onclick="questCloseNotes()">'+back+'</button><div class="section-intro"><span class="eyebrow">C-Region chapter notes</span><h2 id="sq-notes-title" tabindex="-1">Chapter '+c.n+', '+esc(c.title)+'</h2><p>'+esc(c.blurb||'')+(c.lessons?' Lessons '+esc(c.lessons.join(', '))+'.':'')+'</p></div><p class="small">Opened from the quest board. You are still in '+esc(subjectDef().region)+'; reading these notes does not move you.</p>';
 if(list.length>1)h+='<div class="row tight sq-notes-chapters" role="group" aria-label="This job\'s chapters">'+list.map(function(x,i){return '<button class="'+(x===c.n?'primary':'ghost')+'"'+(x===c.n?' aria-current="true"':'')+' onclick="renderQuestNotes('+x+');window.scrollTo(0,0)">Chapter '+x+(i?'':' (this job)')+'</button>';}).join('')+'</div>';
 h+='<div class="notes">'+(c.notes||[]).map(function(t){return '<div class="note">'+esc(t)+'</div>';}).join('')+'</div>'+
  '<p class="small">Drills, wild battles and the gym for this chapter are in the C-Region. Take the ferry when you want them.</p><button class="ghost" onclick="questCloseNotes()">'+back+'</button>';
 $('#s-quests').innerHTML=h;
}
function questCloseNotes(){
 var from=QUEST_NOTES_FROM;QUEST_NOTES_FROM=null;
 if(!questById(QUEST_ID)){openSideQuests();return;}
 renderSideQuest();window.scrollTo(0,from?from.y:0);
 var btn=$('#sq-notes-btn');if(btn)btn.focus({preventScroll:true});
}
function revealQuestHint(){var q=questById(QUEST_ID),p=sideQuestProgress(QUEST_ID);p.hints=Math.min(q.hints.length,p.hints+1);questPersist();renderSideQuest();}
function selectQuestSample(index){var q=questById(QUEST_ID),p=sideQuestProgress(QUEST_ID);p.sample=index;p.runInput=q.grading.tests[index].input;p.runFiles=JSON.parse(JSON.stringify(q.grading.tests[index].files||{}));questPersist();renderSideQuest();}
function renderSideQuest(){
 var q=questById(QUEST_ID);if(!q){openSideQuests();return;}var p=sideQuestProgress(q.id),ch=q.curriculum;
 if(p.sample>=q.grading.tests.length)p.sample=0;
 var sample=q.grading.tests[p.sample];
 if(p.runInput===undefined)p.runInput=sample.input;
 if(!p.runFiles)p.runFiles=JSON.parse(JSON.stringify(sample.files||{}));
 var h='<button class="ghost" onclick="openSideQuests()">Back to Side Quests</button><div class="section-intro"><span class="eyebrow">'+esc(q.giver)+' has a job for you</span><h2>'+esc(q.title)+'</h2><div class="row"><span class="sq-badge '+q.difficulty+'">'+titleCase(q.difficulty)+'</span><span>'+q.estimatedMinutes.min+'-'+q.estimatedMinutes.max+' minutes · '+questStatus(p)+'</span></div><p>'+esc(q.story)+'</p></div>'+(typeof labSceneStrip==='function'?labSceneStrip(q.id):'')+(typeof questFramingPanel==='function'?questFramingPanel(q.id):'')+
 '<div class="sq-detail-grid"><section class="panel"><h3>The exact contract</h3><p>'+esc(q.implementationContract)+'</p><p class="note">'+esc(q.inputPolicy)+'</p>'+(q.grading.mode==='functions'?'<details><summary>Required types and signatures</summary><pre class="sq-code">'+esc(q.starterCode)+'</pre></details>':'')+'</section><aside><section class="panel"><h3>Chapter '+ch.primaryChapter+'</h3><p>'+esc(questChapterName(ch.primaryChapter))+'</p><button id="sq-notes-btn" onclick="questOpenNotes('+ch.primaryChapter+')">Read chapter notes</button><p class="small">Prerequisites: '+ch.prerequisiteChapters.map(function(n){return n+'. '+esc(questChapterName(n));}).join('; ')+'.</p></section><section class="panel"><h3>Reward</h3><p>'+esc(questRewardText(q))+'</p><p class="small">Granted once, after all tests pass.</p>'+(p.rewardClaimed?'<p>Reward already received.</p>':'')+'</section><details class="panel" id="sq-hints"><summary>Hints</summary>'+q.hints.map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+'</details></aside></div>'+
 '<section class="panel sq-workspace"><div class="sq-editor-head"><h3>Your C program</h3><span class="small">C11 · Clang · Strict warnings</span></div><p class="small sq-editor-keys" id="sq-editor-keys">Tab indents and Shift+Tab outdents. To leave the editor with the keyboard, press Esc, then Tab.</p><label class="sr-only" for="sq-source">C source</label><textarea class="sq-editor" id="sq-source" rows="20" spellcheck="false" autocapitalize="off" autocomplete="off" maxlength="64000" aria-describedby="sq-editor-keys">'+esc(p.draft)+'</textarea><p id="sq-save-status" class="small" role="status">Draft saved in StudyMon. '+(q.grading.mode==='functions'?'Implement the required functions; the game supplies main().':'Write your complete program, including main().')+'</p><div class="sq-runbar"><button id="sq-run" onclick="runQuestCode(false)">Run</button><button class="primary" id="sq-submit" onclick="runQuestCode(true)">Submit</button><button id="sq-stop" class="ghost" onclick="cancelCJob(\'Stopped. Your draft is saved.\')" hidden>Stop</button><span id="sq-job-status" role="status" aria-live="polite">'+(p.status==='completed'?'All tests passed.':'')+'</span></div></section>'+
 '<div class="sq-two"><section class="panel"><h3>Try an input</h3><label>Test fixture<select id="sq-sample">'+q.grading.tests.map(function(t,i){return '<option value="'+i+'"'+(i===p.sample?' selected':'')+'>'+esc(t.label)+'</option>';}).join('')+'</select></label><label for="sq-stdin">Standard input</label><textarea id="sq-stdin" rows="5" maxlength="16000" spellcheck="false">'+esc(p.runInput)+'</textarea>'+
 Object.keys(p.runFiles).map(function(name){var value=p.runFiles[name],binary=Array.isArray(value);return '<label>Sandbox file: '+esc(name)+(binary?' (hex bytes)':'')+'<textarea data-sq-file="'+esc(name)+'" data-binary="'+binary+'" maxlength="16000" rows="4" spellcheck="false">'+esc(binary?value.map(function(n){return n.toString(16).padStart(2,'0');}).join(' '):value)+'</textarea></label>';}).join('')+'<p class="small">Editing these inputs affects Run only. Submit uses the full test suite. File fixtures exist only inside StudyMon.</p><details><summary>Expected output for the selected fixture</summary><pre class="sq-code">'+esc(sample.stdout===undefined?'Tests are being prepared.':sample.stdout)+'</pre></details></section><section class="panel"><h3>Output</h3><pre id="sq-output" class="sq-code sq-output" role="log" aria-label="Program output">'+esc(p.lastRun?p.lastRun.output||(p.lastRun.buildFailed?'(Nothing ran: the program did not build.)':'(no output)'):'Run your program to see its output here.')+'</pre><pre id="sq-diagnostics" class="sq-code sq-diagnostics" aria-label="Compiler diagnostics">'+esc(p.lastRun?p.lastRun.diagnostics||'':'')+'</pre></section></div>'+
 '<section class="panel"><h3>Autograder</h3><div id="sq-grade-results" aria-live="polite">'+renderQuestGradeResult(p.lastGrade&&{sourceChanged:p.lastGrade.source!==undefined&&p.lastGrade.source!==p.draft,at:p.lastGrade.at,passed:p.lastGrade.passed,total:p.lastGrade.total,cases:p.lastGrade.cases})+'</div><p class="small">Exact comparison includes whitespace and final newlines. The tests accept any implementation satisfying the contract. Passing tests is not a proof that a C program is free of every possible error.</p></section>';
 $('#s-quests').innerHTML=h;
 $('#sq-source').oninput=function(){cancelCJob('Source changed. Run or submit this version.');var ok=saveSideQuestDraft(q.id,this.value);$('#sq-save-status').textContent=ok?'Draft saved.':'Could not save. Keep this page open and try again.';if(p.lastGrade)$('#sq-grade-results').innerHTML=renderQuestGradeResult(Object.assign({},p.lastGrade,{sourceChanged:p.lastGrade.source!==p.draft}));};
 $('#sq-source').onkeydown=questEditorKey;$('#sq-source').onblur=function(){delete this.dataset.tabOut;};
 $('#sq-stdin').oninput=function(){p.runInput=this.value;questPersist();};
 if($('#sq-hints'))$('#sq-hints').ontoggle=function(){
   if(!this.open)return;
   var changed=false,framed=typeof questFrameFor==='function'&&questFrameFor(q.id);
   // Original hard labs keep guidance in their framing record. The other
   // labs use the existing hint counter so their cutscene can acknowledge it.
   if(!framed&&!p.hints){p.hints=1;changed=true;}
   if(typeof questFramingNoteGuidance==='function'&&questFramingNoteGuidance(q.id))changed=true;
   if(changed)questPersist();
 };
 $('#sq-sample').onchange=function(){cancelCJob();selectQuestSample(Number(this.value));};
 document.querySelectorAll('[data-sq-file]').forEach(function(el){el.oninput=function(){if(this.dataset.binary==='true'){var text=this.value.trim();if(text&&!/^[0-9a-fA-F]{2}(?:\s+[0-9a-fA-F]{2})*$/.test(text)){this.setCustomValidity('Enter two-digit hexadecimal bytes separated by spaces.');return;}this.setCustomValidity('');p.runFiles[this.dataset.sqFile]=text?text.split(/\s+/).map(function(v){return parseInt(v,16);}):[];}else p.runFiles[this.dataset.sqFile]=this.value;questPersist();};});
 if(C_JOB)setQuestBusy(true,'Working…');
}
/* The editor is a plain textarea taught a little code editing: Tab indents to
   the next four-space stop (the starter code's style), Shift+Tab outdents, a
   multi-line selection indents or outdents every line, and Enter carries the
   line's indentation down. Edits go through insertText so Ctrl+Z still undoes
   them one at a time. Esc, then Tab, leaves the editor for keyboard users. */
function questEditorEdit(el,start,end,text,selStart,selEnd){
 el.setSelectionRange(start,end);
 var ok=false;try{ok=document.execCommand('insertText',false,text);}catch(e){}
 if(!ok){el.setRangeText(text,start,end,'end');el.dispatchEvent(new Event('input',{bubbles:true}));}
 el.setSelectionRange(selStart,selEnd);
}
function questEditorKey(e){
 var el=e.target;
 if(e.isComposing||e.ctrlKey||e.metaKey||e.altKey||/^(Shift|Control|Alt|Meta)$/.test(e.key))return;
 if(e.key==='Escape'){el.dataset.tabOut='1';return;}
 if(e.key==='Tab'&&el.dataset.tabOut){delete el.dataset.tabOut;return;}
 delete el.dataset.tabOut;
 var v=el.value,a=el.selectionStart,b=el.selectionEnd,ls=v.lastIndexOf('\n',a-1)+1;
 if(e.key==='Enter'){
  if(e.shiftKey)return;
  var ind=v.slice(ls,a).match(/^[ \t]*/)[0];if(!ind)return;
  e.preventDefault();questEditorEdit(el,a,b,'\n'+ind,a+1+ind.length,a+1+ind.length);return;
 }
 if(e.key!=='Tab')return;
 e.preventDefault();
 var multi=v.slice(a,b).indexOf('\n')>=0;
 if(!e.shiftKey&&!multi){var pad='    '.slice((a-ls)%4);questEditorEdit(el,a,b,pad,a+pad.length,a+pad.length);return;}
 var last=b>a&&v[b-1]==='\n'?b-1:b,le=v.indexOf('\n',last);if(le<0)le=v.length;
 var block=v.slice(ls,le),first=0;
 var out=block.split('\n').map(function(line,i){
  var d=e.shiftKey?-((line.match(/^( {1,4}|\t)/)||[''])[0].length):(line?4:0);
  if(!i)first=d;
  return d<0?line.slice(-d):d?'    '+line:line;
 }).join('\n');
 if(out===block)return;
 var na=multi&&a===ls?ls:Math.max(ls,a+first),nb=Math.max(na,b+out.length-block.length);
 questEditorEdit(el,ls,le,out,na,multi?nb:na+(b-a));
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
 // A build failure (compile or link) keeps the compiler's own diagnostics as
 // the detail and says so once in the status, rather than echoing the status
 // under the diagnostics; other failures (timeouts, worker errors) still add
 // their message there.
 function finishError(message,diagnostics,build){if(!current())return;var idx=job.index||0;if(submit){job.results.push({label:q.grading.tests[idx].label,passed:false,error:build?'The program did not build, so no test could run. The compiler errors are under Output.':message,expected:q.grading.tests[idx].stdout,actual:''});p.lastGrade={at:Date.now(),source:source,passed:job.results.filter(function(r){return r.passed;}).length,total:q.grading.tests.length,cases:job.results};if(p.status!=='completed')p.status='needs-revision';}p.lastRun={output:'',diagnostics:build?(diagnostics||message):[diagnostics,message].filter(Boolean).join('\n'),buildFailed:!!build};questPersist();cancelCJob();renderSideQuest();setQuestBusy(false,message);}
 setQuestBusy(true,'Preparing the C compiler…');$('#sq-diagnostics').textContent='';$('#sq-output').textContent='';arm(45000);
 worker.onerror=function(e){finishError('Compiler worker failed: '+e.message);};
 worker.onmessage=async function(event){
  if(!current()){if(C_JOB===job)cancelCJob('Result discarded because the draft or game changed.');return;}
  var d=event.data;
  if(d.type==='phase'){job.phase=d.phase;job.index=d.index;arm(d.phase==='compile'?45000:3000);setQuestBusy(true,d.phase==='compile'?'Compiling C11…':submit?'Running test '+(d.index+1)+' of '+q.grading.tests.length+'…':'Running…');}
  if(d.type==='compiled'){job.diagnostics=d.diagnostics;$('#sq-diagnostics').textContent=d.diagnostics;}
  if(d.type==='error'){if(d.buildFailed)finishError(d.stage==='link'?'Link failed - a function is missing or defined twice. See the errors below.':'Compile failed - see the errors below.',d.diagnostics,true);else finishError(d.message,d.diagnostics);return;}
  if(d.type==='case'){
   if(submit){var t=q.grading.tests[d.index];job.results.push({label:t.label,passed:d.exitCode===0&&!d.error&&d.output===t.stdout&&d.stderr==='',expected:t.stdout,actual:d.output,error:d.error||(d.exitCode?'Exit code '+d.exitCode:d.stderr?'Unexpected stderr output.':null)});$('#sq-grade-results').innerHTML=renderQuestGradeResult({at:Date.now(),passed:job.results.filter(function(r){return r.passed;}).length,total:q.grading.tests.length,cases:job.results});}
   else{p.lastRun={at:Date.now(),output:d.output,diagnostics:[d.stderr,d.error].filter(Boolean).join('\n'),exitCode:d.exitCode,error:d.error||null};$('#sq-output').textContent=d.output||'(no output)';$('#sq-diagnostics').textContent=p.lastRun.diagnostics;}
  }
  if(d.type==='done'){
   clearTimeout(job.timer);worker.terminate();C_JOB=null;
   if(submit){var passed=job.results.filter(function(r){return r.passed;}).length,ok=passed===q.grading.tests.length&&job.results.length===q.grading.tests.length;
    p.lastGrade={at:Date.now(),source:source,passed:passed,total:q.grading.tests.length,cases:job.results};
    p.attempts.push({at:Date.now(),complete:ok,method:'autograder',passed:passed,total:q.grading.tests.length});p.attempts=p.attempts.slice(-5);
    if(ok){p.status='completed';p.completedAt=Date.now();p.submission={questId:q.id,method:'autograder',graderVersion:q.grading.version,source:source,passed:passed,total:q.grading.tests.length,at:Date.now()};}else if(p.status!=='completed')p.status='needs-revision';
    var saved=questPersist();renderSideQuest();setQuestBusy(false,ok?(saved?'All tests passed!':'Tests passed, but saving failed. Submit again to save.'):'Some tests failed. Check the results below.');if(ok&&saved)claimSideQuestReward(q.id);
   }else{questPersist();setQuestBusy(false,p.lastRun.error?'Runtime error: the program compiled but stopped while running. See below.':p.lastRun.exitCode===0?'Run finished (exit code 0).':'Run finished with exit code '+p.lastRun.exitCode+'. The tests expect 0.');}
  }
 };
 worker.postMessage({source:source,harness:q.grading.harness,cases:submit?q.grading.tests:[{input:p.runInput||'',files:p.runFiles||{}}]});
}
