/* Calculus II review schedule and Wild Battle reach.

   What this proves, against the real engine in a real browser:
   - every question in the Calculus II bank can be asked by some Wild Battle,
     including the five lessons that sit on no quiz
   - a right answer comes back after about 50 answered questions and a wrong one
     after about 25, never on a fixed count
   - three right answers in a row hide a question everywhere, a miss resets the
     run, and unhideQuestions() brings it back
   - a real Wild Battle asks, grades and retires a question through the page
   - the C region still runs on the original review boxes

   Needs the local server running (see TESTING.md). Uses a throwaway browser
   context, so your own save is never touched. */
const {chromium}=require('./playwright.cjs');
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');

 const r=await p.evaluate(async ()=>{
  const o={errors:[]};
  const t=(n,fn)=>{try{return fn();}catch(e){o.errors.push(n+': '+e.message+' @ '+(e.stack||'').split('\n')[1]);}};
  const fresh=()=>{S=freshSave();bindProgress('c');S.settings.sound=false;switchSubject('calc');
    S.party=[makeMon(6,60),makeMon(9,58)];ensureBag();};
  const routes=[1,2,3,4,5,6,7,8,9,10];

  // --- reach: every question is on some wild route --------------------------
  t('reach',()=>{
    fresh();
    const total=allQuestions().length;
    const reach={};
    routes.forEach(n=>routeQuestions(n).forEach(q=>reach[q.id]=n));
    const missing=allQuestions().filter(q=>!reach[q.id]).map(q=>q.id);
    o.reach={total,reachable:Object.keys(reach).length,missing:missing.slice(0,5),missingN:missing.length};
    // the exam-only lessons land where the config says
    const home={};
    allQuestions().filter(q=>q.chapter>90).forEach(q=>{home[q.lesson]=reach[q.id];});
    o.guestHomes=home;
    // a route never serves a lesson that belongs to a different route
    o.foreignFree=routes.every(n=>{
      const allowed=new Set(CHAPTERS.find(c=>c.n===n).lessons.concat(wildGuestLessons(n)||[]));
      return routeQuestions(n).every(q=>allowed.has(q.lesson));
    });
    // and the picker itself, not just the list, reaches a guest lesson
    let sawGuest=false;
    for(let i=0;i<600&&!sawGuest;i++){
      const g=pickQuestion([3],1+i%4,{},wildGuestLessons(3));
      if(g.q.lesson===10) sawGuest=true;
    }
    o.pickerReachesGuest=sawGuest;
  });

  // --- the plan is a Calculus II thing --------------------------------------
  t('plan scope',()=>{
    fresh(); o.calcPlan=reviewPlan();
    switchSubject('c'); o.cPlan=reviewPlan(); o.cGuests=wildGuestLessons(3);
    switchSubject('calc');
  });

  // --- gaps -----------------------------------------------------------------
  t('gaps',()=>{
    fresh();
    const rg=[],wg=[];
    // one answer per question, so no run builds up and nothing retires
    for(let i=0;i<60;i++){
      const right=QBANK[1][i],wrong=QBANK[2][i];
      recordAnswer(right,true); rg.push(S.srs[right.id].due-S.clock);
      recordAnswer(wrong,false); wg.push(S.srs[wrong.id].due-S.clock);
    }
    const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
    o.gaps={rightMin:Math.min(...rg),rightMax:Math.max(...rg),rightMean:+mean(rg).toFixed(1),
      wrongMin:Math.min(...wg),wrongMax:Math.max(...wg),wrongMean:+mean(wg).toFixed(1),
      rightDistinct:new Set(rg).size,wrongDistinct:new Set(wg).size};
  });

  // --- three in a row hides, a miss resets, unhide restores ------------------
  t('retire',()=>{
    fresh();
    const q=QBANK[2].find(x=>x.k==='mcq'&&!x.selfCheck);
    recordAnswer(q,true);recordAnswer(q,true);
    o.afterTwo={hidden:isHidden(q.id),run:S.srs[q.id].run};
    recordAnswer(q,false);
    o.afterMiss={hidden:isHidden(q.id),run:S.srs[q.id].run};
    recordAnswer(q,true);recordAnswer(q,true);recordAnswer(q,true);
    o.afterThree={hidden:isHidden(q.id),run:S.srs[q.id].run,box:S.srs[q.id].box,note:retiredNoteHtml(q).length>0};
    // never drawn again, from any route or tier
    let drawn=0;
    for(let i=0;i<1500;i++){ if(pickQuestion([2],1+i%4,{}).q.id===q.id) drawn++; }
    o.drawnWhileHidden=drawn;
    // not counted as due, even long overdue
    S.clock+=500;
    o.dueWhileHidden=dueCount();
    // listed in the question base, marked hidden, and counted
    const html=routeQuestionBaseHtml(2);
    o.baseCountsHidden=/1 hidden/.test(html);
    // unhide
    const back=unhideQuestions(q.id);
    const e=S.srs[q.id];
    o.unhide={back,hidden:isHidden(q.id),run:e.run,box:e.box,dueSoon:e.due-S.clock>=0&&e.due-S.clock<100};
    o.unhideTwice=unhideQuestions(q.id);
  });

  // --- mock exam and the review drill honour hidden questions ----------------
  t('mock exam',()=>{
    fresh();
    // retire all but three of chapter 2, so an exam that ignored the flag
    // would be very likely to draw a retired one
    const live=QBANK[2].filter(q=>!q.selfCheck).slice(0,3).map(q=>q.id);
    QBANK[2].forEach(q=>{ if(live.indexOf(q.id)<0) S.srs[q.id]={box:4,due:0,r:3,w:0,run:3,hidden:true}; });
    let bad=0,drawn=0;
    for(let i=0;i<12;i++){
      mockExam(25);
      D.exam.forEach(q=>{ drawn++; if(isHidden(q.id)) bad++; });
      D=null;
    }
    o.mockExam={drawn,bad};
    // a retired question that is overdue is not offered by the review drill either
    o.reviewDrillDue=dueCount();
  });

  // --- unhide by chapter / all and only touches what is hidden --------------
  t('unhide scope',()=>{
    fresh();
    const a=QBANK[3][0],b=QBANK[3][1],c=QBANK[4][0];
    [a,b,c].forEach(q=>{recordAnswer(q,true);recordAnswer(q,true);recordAnswer(q,true);});
    o.hiddenBefore=hiddenQuestions().length;
    o.chapterBack=unhideQuestions(3);
    o.stillHidden=hiddenQuestions().length;
    o.allBack=unhideQuestions('all');
    o.hiddenAfter=hiddenQuestions().length;
  });

  // --- saves made before the flag existed ------------------------------------
  t('legacy save',()=>{
    fresh();
    const q3=QBANK[5][0],q4=QBANK[5][1],q5=QBANK[5][2];
    S.srs[q3.id]={box:3,due:0,r:2,w:0};      // two right in a row: stays
    S.srs[q4.id]={box:4,due:0,r:3,w:0};      // three right in a row: hidden
    S.srs[q5.id]={box:5,due:0,r:4,w:0};
    o.legacy={box3:isHidden(q3.id),box4:isHidden(q4.id),box5:isHidden(q5.id)};
    recordAnswer(q3,true);
    o.legacyThenRight={hidden:isHidden(q3.id),run:S.srs[q3.id].run};
    // survives a save round trip
    saveGame();
    const back=normalizeSave(JSON.parse(localStorage.getItem(SAVE_KEY)));
    o.roundTrip=back.progress.calc.srs[q3.id].hidden===true;
  });

  // --- exposure: fresh questions spread across problem types ----------------
  t('exposure',()=>{
    fresh();
    RECENT_FAMILIES.length=0;
    let asked={},inB=0,repeats=0,freshAsks=0,recent=[];
    for(let i=0;i<120;i++){
      if(inB>=6){asked={};inB=0;}
      const g=pickQuestion([2],1+i%4,asked,wildGuestLessons(2));
      asked[g.q.id]=true;inB++;
      if(!g.review){freshAsks++;if(recent.indexOf(familyOf(g.q))>=0)repeats++;}
      recent.push(familyOf(g.q));if(recent.length>8)recent.shift();
      recordAnswer(g.q,Math.random()<0.7);
    }
    o.exposure={freshAsks,repeats};
  });

  // --- the original boxes still run the C region -----------------------------
  t('c region',()=>{
    fresh(); switchSubject('c');
    const q=QBANK[1][0];
    recordAnswer(q,false); const w=S.srs[q.id].due-S.clock;
    recordAnswer(q,true);recordAnswer(q,true);recordAnswer(q,true);recordAnswer(q,true);
    o.c={wrongGap:w,hidden:isHidden(q.id),hasRun:'run' in S.srs[q.id],box:S.srs[q.id].box,due:isDue(q.id)};
    switchSubject('calc');
  });

  return o;
 });

 // ---- a real Wild Battle through the page ------------------------------------
 const battle=await p.evaluate(async ()=>{
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const log={errors:[],asked:[],lessons:{},hiddenAsked:0,battles:0};
  try{
   S=freshSave();bindProgress('c');S.settings.sound=false;switchSubject('calc');
   S.party=[makeMon(6,60),makeMon(9,58)];ensureBag();S.money=9000;
   S.elite={x1:true,x2:true,x3:true};
   // Retire all but six of route 3's own questions. What is left to ask is those
   // six plus the parked lesson 10, so a battle that serves the parked lesson
   // and skips every retired question is unmistakable.
   QBANK[3].slice(6).forEach(q=>{ S.srs[q.id]={box:4,due:0,r:3,w:0,run:3,hidden:true}; });
   // Play real battles the way a player does: choose a move, answer the card,
   // press Continue. Each foe is left on 1 HP so a battle is one question long
   // and the battle timers are the only thing being waited on.
   for(let i=0;i<900;i++){
     if(!B||B.over){
       if(++log.battles>10) break;
       S.party.forEach(m=>{m.hp=maxHp(m);});
       goWild(3);
       if(log.battles===1){ log.guestLessons=B&&B.guestLessons; log.title=B&&B.title; }
       if(B) foe().hp=1;
       continue;
     }
     const cont=$('#contbtn');
     const move=document.querySelector('.moves button.move:not([disabled])');
     if(B.q&&!B.qAnswered){
       const q=B.q;
       log.asked.push(q.id); log.lessons[q.lesson]=(log.lessons[q.lesson]||0)+1;
       if(isHidden(q.id)) log.hiddenAsked++;
       if(q.k==='fill'){const el=$('#fillin');if(el){el.value=String(q.a[0]);submitFill();}}
       else answer(q.a);
       if(document.querySelector('#quiz .qcard .why')) log.sawCard=true;
     } else if(cont){ cont.click(); }
     else if(move){ move.click(); }
     await sleep(40);
   }
   log.answered=log.asked.length;
   log.distinct=new Set(log.asked).size;
   log.runs=Object.values(S.srs).filter(e=>e.run>=1).length;
   log.wrongRuns=Object.values(S.srs).filter(e=>e.w>0).length;
   log.hiddenNow=hiddenQuestions().length;
  }catch(e){log.errors.push(e.message+' @ '+(e.stack||'').split('\n')[1]);}
  return log;
 });

 console.log('   reach:',JSON.stringify(r.reach),' guest homes:',JSON.stringify(r.guestHomes));
 console.log('   gaps:',JSON.stringify(r.gaps));
 console.log('   battle:',JSON.stringify({answered:battle.answered,distinct:battle.distinct,lessons:battle.lessons,hidden:battle.hiddenNow,battles:battle.battles}));

 check('no thrown errors', r.errors.length===0&&battle.errors.length===0, r.errors.concat(battle.errors).slice(0,3).join(' | '));
 check('every Calculus II question can be asked by some Wild Battle', r.reach&&r.reach.missingN===0&&r.reach.reachable===r.reach.total, JSON.stringify(r.reach));
 check('lessons 10, 11, 20, 27, 35 are parked on routes 3, 4, 6, 9, 10',
   r.guestHomes&&r.guestHomes[10]===3&&r.guestHomes[11]===4&&r.guestHomes[20]===6&&r.guestHomes[27]===9&&r.guestHomes[35]===10, JSON.stringify(r.guestHomes));
 check('no route serves a lesson that is not its own or a parked guest', r.foreignFree===true);
 check('the picker itself serves a parked lesson on its route', r.pickerReachesGuest===true);
 check('Calculus II has a review plan; the C region does not', r.calcPlan&&r.calcPlan.right===50&&r.calcPlan.wrong===25&&r.calcPlan.retireAfter===3&&r.cPlan===null&&r.cGuests===null);
 check('a right answer is due in about 50 questions, inside the wobble',
   r.gaps&&r.gaps.rightMin>=38&&r.gaps.rightMax<=62&&Math.abs(r.gaps.rightMean-50)<=5, JSON.stringify(r.gaps));
 check('a wrong answer is due in about 25 questions, inside the wobble',
   r.gaps&&r.gaps.wrongMin>=19&&r.gaps.wrongMax<=31&&Math.abs(r.gaps.wrongMean-25)<=4, JSON.stringify(r.gaps));
 check('the gap is not a fixed count', r.gaps&&r.gaps.rightDistinct>=8&&r.gaps.wrongDistinct>=5, JSON.stringify(r.gaps));
 check('two right answers do not hide a question', r.afterTwo&&r.afterTwo.hidden===false&&r.afterTwo.run===2);
 check('a miss resets the run', r.afterMiss&&r.afterMiss.hidden===false&&r.afterMiss.run===0);
 check('three right in a row hide it, and the answer card says so', r.afterThree&&r.afterThree.hidden===true&&r.afterThree.run===3&&r.afterThree.note===true, JSON.stringify(r.afterThree));
 check('a hidden question is never drawn again', r.drawnWhileHidden===0, 'drawn '+r.drawnWhileHidden);
 check('a hidden question is not due, however overdue', r.dueWhileHidden===0, 'due '+r.dueWhileHidden);
 check('hidden questions stay off the mock exam', r.mockExam&&r.mockExam.drawn>=250&&r.mockExam.bad===0, JSON.stringify(r.mockExam));
 check('the question base marks hidden questions', r.baseCountsHidden===true);
 check('unhideQuestions brings one back, restarting its run, once', r.unhide&&r.unhide.back===1&&r.unhide.hidden===false&&r.unhide.run===0&&r.unhide.box===1&&r.unhide.dueSoon&&r.unhideTwice===0, JSON.stringify(r.unhide));
 check('unhide by chapter and by "all" only touch hidden questions', r.hiddenBefore===3&&r.chapterBack===2&&r.stillHidden===1&&r.allBack===1&&r.hiddenAfter===0, JSON.stringify({b:r.hiddenBefore,c:r.chapterBack,s:r.stillHidden,a:r.allBack,z:r.hiddenAfter}));
 check('an older save reads its box as a run: box 3 stays, box 4 and 5 hide', r.legacy&&r.legacy.box3===false&&r.legacy.box4===true&&r.legacy.box5===true, JSON.stringify(r.legacy));
 check('an older entry picks up the counter on its next answer', r.legacyThenRight&&r.legacyThenRight.hidden===true&&r.legacyThenRight.run===3, JSON.stringify(r.legacyThenRight));
 check('the hidden flag survives a save round trip', r.roundTrip===true);
 check('fresh questions move on to a different problem type', r.exposure&&r.exposure.freshAsks>30&&r.exposure.repeats<=2, JSON.stringify(r.exposure));
 check('the C region keeps the original boxes and hides nothing',
   r.c&&r.c.wrongGap===2&&r.c.hidden===false&&r.c.hasRun===false&&r.c.box===5, JSON.stringify(r.c));
 check('a Wild Battle on route 3 carries the parked lesson', Array.isArray(battle.guestLessons)&&battle.guestLessons[0]===10, JSON.stringify(battle.guestLessons));
 check('real Wild Battles ask and grade questions through the page', battle.answered>=8&&battle.sawCard===true, 'answered '+battle.answered+' in '+battle.battles+' battles');
 check('real Wild Battles never ask a hidden question', battle.hiddenAsked===0, 'hidden asked '+battle.hiddenAsked);
 check('a real Wild Battle serves a lesson that sits on no quiz', battle.lessons&&battle.lessons[10]>=1, JSON.stringify(battle.lessons));
 check('real Wild Battles spread over different questions', battle.distinct>=battle.answered*0.7, battle.distinct+'/'+battle.answered);
 check('answers in a real battle are recorded as runs', battle.runs>=battle.distinct-1&&battle.runs>=6, 'runs '+battle.runs);
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));

 await b.close();
 const failed=results.filter(x=>!x.ok).length;
 console.log('\n'+(results.length-failed)+'/'+results.length+' checks passed');
 process.exit(failed?1:0);
})();
