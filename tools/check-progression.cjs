/* Catching, experience, evolution and reward routing. */
const {chromium}=require('C:/Users/minal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');

 // --- catching -----------------------------------------------------------
 const c=await p.evaluate(async()=>{
   const sleep=ms=>new Promise(r=>setTimeout(r,ms));
   S=freshSave();bindProgress('c');S.settings.sound=false;
   S.party=[makeMon(6,60)];ensureBag();S.money=99999;buyItem('ultra',30);
   goWild(1);
   const before={party:S.party.length,box:S.box.length,caught:Object.keys(S.caught||{}).length};
   const foeId=B?foe().id:null;
   const out={before,foeId,throws:0,errors:[]};
   for(let i=0;i<160 && B && !B.over;i++){
     try{
       const cont=$('#contbtn');
       if(B.q&&!B.qAnswered){const q=B.q;if(q.k==='fill'){const el=$('#fillin');if(el){el.value=String(q.a[0]);submitFill();}}else answer(q.a);}
       else if(cont)cont.click();
       else { foe().hp=1; tryCatch('ultra'); out.throws++; }
     }catch(e){out.errors.push(e.message);break;}
     await sleep(180);
   }
   out.after={party:S.party.length,box:S.box.length,caught:Object.keys(S.caught||{}).length};
   out.gained=(out.after.party+out.after.box)-(before.party+before.box);
   out.ballsLeft=itemCount('ultra');
   if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
   return out;
 });
 check('catching throws balls and consumes them', c.throws>0 && c.ballsLeft<30, 'threw '+c.throws+', left '+c.ballsLeft);
 check('a caught Pokemon joins the party or box', c.gained>0, JSON.stringify({before:c.before,after:c.after}));
 check('catching records the dex entry', c.after.caught>c.before.caught, c.before.caught+' -> '+c.after.caught);
 check('catching throws no errors', c.errors.length===0, c.errors.slice(0,2).join(' | '));

 // --- experience and levelling -------------------------------------------
 const xp=await p.evaluate(async()=>{
   const sleep=ms=>new Promise(r=>setTimeout(r,ms));
   S=freshSave();bindProgress('c');S.settings.sound=false;
   S.party=[makeMon(6,40)];ensureBag();
   const before={lvl:S.party[0].lvl,xp:S.party[0].xp};
   goWild(1);
   for(let i=0;i<160 && B && !B.over;i++){
     const cont=$('#contbtn');
     const move=document.querySelector('.moves button.move:not([disabled])');
     if(B.q&&!B.qAnswered){const q=B.q;if(q.k==='fill'){const el=$('#fillin');if(el){el.value=String(q.a[0]);submitFill();}}else answer(q.a);}
     else if(cont)cont.click();
     else if(move)move.click();
     await sleep(180);
   }
   await sleep(700);
   const after={lvl:S.party[0].lvl,xp:S.party[0].xp};
   if(B){try{clearInterval(B.timer);}catch(e){}B=null;}
   return {before,after};
 });
 check('winning a battle awards experience', xp.after.xp>xp.before.xp || xp.after.lvl>xp.before.lvl,
       JSON.stringify(xp));

 // --- evolution -----------------------------------------------------------
 const evo=await p.evaluate(()=>{
   S=freshSave();bindProgress('c');S.settings.sound=false;
   // Charmander evolves at 16
   S.party=[makeMon(4,15)];
   const out={before:S.party[0].id};
   try{
     if(typeof evolveCheck==='function')out.fn='evolveCheck';
     const names=Object.keys(window).filter(k=>/evolv/i.test(k)&&typeof window[k]==='function');
     out.evoFns=names;
   }catch(e){out.err=e.message;}
   return out;
 });
 check('evolution functions are exposed', (evo.evoFns||[]).length>0, (evo.evoFns||[]).join(', '));

 // --- quest reward routing when the party is full -------------------------
 const route=await p.evaluate(()=>{
   S=freshSave();bindProgress('c');S.settings.sound=false;
   S.party=[makeMon(1,5),makeMon(4,5),makeMon(7,5),makeMon(25,5),makeMon(133,5),makeMon(147,5)];
   S.box=[];
   const q=(window.SIDE_QUESTS||[]).find(x=>x.rewards&&x.rewards.pokemon);
   if(!q)return{skip:true};
   const boxBefore=S.box.length;
   const pr=sideQuestProgress(q.id);
   pr.status='completed';pr.rewardClaimed=false;
   pr.submission={questId:q.id,method:'autograder',graderVersion:q.grading.version,
                  source:'x',passed:q.grading.tests.length,total:q.grading.tests.length,at:Date.now()};
   const ok=claimSideQuestReward(q.id);
   return {ok,quest:q.id,party:S.party.length,boxBefore,boxAfter:S.box.length,claimed:!!sideQuestProgress(q.id).rewardClaimed};
 });
 check('a reward Pokemon goes to the box when the party is full',
       route.skip || (route.ok===true && route.party===6 && route.boxAfter===route.boxBefore+1),
       JSON.stringify(route));

 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));
 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
