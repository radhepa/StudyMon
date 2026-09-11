/* Play real battles to completion, driving the same functions the buttons call.
   Battles are timer driven, so this waits on state rather than assuming timing. */
const {chromium}=require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');

 // Answer every question correctly until the battle ends or we run out of turns.
 const play = (setup, maxTurns) => p.evaluate(async ({setup,maxTurns})=>{
   const sleep=ms=>new Promise(r=>setTimeout(r,ms));
   S=freshSave();bindProgress('c');S.settings.sound=false;S.money=9000;
   S.party=[makeMon(6,60),makeMon(9,58)];
   ensureBag();
   eval(setup);
   const log={turns:0,answered:0,ended:false,result:null,errors:[]};
   for(let i=0;i<maxTurns;i++){
     if(!B||B.over){log.ended=true;break;}
     log.turns++;
     try{
       // Drive the DOM the way a player does. Answering only shows the
       // explanation card; damage lands when Continue is pressed. turnResolving
       // stays true until the next question, so it cannot gate the move choice.
       const cont=$('#contbtn');
       const move=document.querySelector('#battlemenu button.move:not([disabled]), .moves button.move:not([disabled])');
       const sw=document.querySelector('button[onclick^="doSwitch"]:not([disabled])');
       if(B.q && !B.qAnswered){
         const q=B.q;
         if(q.k==='fill'){ const el=$('#fillin'); if(el){el.value=String(q.a[0]); submitFill();} }
         else answer(q.a);
         log.answered++;
       } else if(cont){
         cont.click(); log.continued=(log.continued||0)+1;
       } else if(move){
         move.click(); log.moves=(log.moves||0)+1;
       } else if(sw){
         sw.click(); log.switches=(log.switches||0)+1;
       } else {
         log.idle=(log.idle||0)+1;
       }
     }catch(e){log.errors.push('turn '+i+': '+e.message);break;}
     await sleep(220);
   }
   log.finalB=B?{over:!!B.over,kind:B.kind}:null;
   log.party=S.party.map(m=>({id:m.id,lvl:m.lvl,hp:m.hp}));
   log.money=S.money;
   if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
   return log;
 },{setup,maxTurns});

 // 1. wild battle, answering correctly
 let r=await play("goWild(1);", 220);
 check('wild battle runs without throwing', r.errors.length===0, r.errors.slice(0,2).join(' | '));
 check('wild battle answers questions', r.answered>0, 'answered '+r.answered);
 check('wild battle reaches an end', r.ended===true||r.finalB===null||r.finalB.over===true, JSON.stringify(r.finalB));

 // 2. gym battle
 r=await play("beginGymBattle(1);", 320);
 console.log('   gym loop:', JSON.stringify({answered:r.answered,continued:r.continued,moves:r.moves,switches:r.switches,idle:r.idle,turns:r.turns,party:r.party}));
 check('gym battle runs without throwing', r.errors.length===0, r.errors.slice(0,2).join(' | '));
 check('gym battle reaches an end', r.ended===true||r.finalB===null||r.finalB.over===true, JSON.stringify(r.finalB));

 // 3. catching: throw balls at a wild mon
 const c=await p.evaluate(async ()=>{
   const sleep=ms=>new Promise(r=>setTimeout(r,ms));
   S=freshSave();bindProgress('c');S.settings.sound=false;
   S.party=[makeMon(6,60)];ensureBag();S.money=99999;
   buyItem('ultra',5);
   goWild(1);
   const before=S.box.length+S.party.length;
   const out={threw:0,errors:[],caught:false};
   for(let i=0;i<40 && B && !B.over;i++){
     try{
       if(B.q && !B.qAnswered){ const q=B.q; if(q.k==='fill'){$('#fillin').value=String(q.a[0]);submitFill();} else answer(q.a); }
       else if($('#contbtn')){ $('#contbtn').click(); }
       else if(!B.turnResolving){ tryCatch('ultra'); out.threw++; }
     }catch(e){out.errors.push(e.message);break;}
     await sleep(220);
   }
   out.caught=(S.box.length+S.party.length)>before;
   out.dexCaught=Object.keys(S.caught||{}).length;
   if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
   return out;
 });
 check('throwing balls does not throw errors', c.errors.length===0, c.errors.slice(0,2).join(' | '));
 check('balls can be thrown', c.threw>0, 'threw '+c.threw);

 // 4. berries heal outside battle, and refuse to during one
 const berry=await p.evaluate(()=>{
   S=freshSave();bindProgress('c');S.settings.sound=false;
   S.party=[makeMon(6,60)];ensureBag();
   giveItem('oran',3); giveItem('sitrus',2);
   const max=maxHp(S.party[0]);
   S.party[0].hp=1;
   const oran=feedQuestBerry('oran',0);
   const afterOran=S.party[0].hp;
   const sitrus=feedQuestBerry('sitrus',0);
   const afterSitrus=S.party[0].hp;
   // cannot revive the fainted
   S.party[0].hp=0;
   const onFainted=feedQuestBerry('oran',0);
   // cannot feed at full health
   S.party[0].hp=max;
   const onFull=feedQuestBerry('oran',0);
   // cannot feed mid battle
   S.party[0].hp=1; goWild(1);
   const inBattle=feedQuestBerry('oran',0);
   if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
   return {oran,afterOran,sitrus,afterSitrus,onFainted,onFull,inBattle,max,
           left:itemCount('oran')};
 });
 check('Oran restores 10 HP', berry.oran===true && berry.afterOran===11, JSON.stringify({r:berry.oran,hp:berry.afterOran}));
 check('Sitrus restores a quarter of max HP', berry.sitrus===true && berry.afterSitrus===11+Math.floor(berry.max/4),
       'hp '+berry.afterSitrus+' of '+berry.max);
 check('berries cannot revive a fainted Pokemon', berry.onFainted===false);
 check('berries refuse at full health', berry.onFull===false);
 check('berries refuse during a battle', berry.inBattle===false);
 check('a refused berry is not consumed', berry.left===2, 'oran left '+berry.left);

 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));
 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
