/* Data integrity across both regions: every species, team, reward and question
   referenced anywhere must actually exist and be usable. */
const {chromium}=require('./playwright.cjs');
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');
 const r=await p.evaluate(()=>{
  S=freshSave();bindProgress('c');
  const o={badSpecies:[],badTeams:[],badQuestions:[],badAce:[],badEncounters:[],badRewards:[],evoLoops:[],levelIssues:[]};
  const valid=id=>Number.isInteger(id)&&id>=1&&id<=1025&&!!dexOf(id);

  // encounters
  Object.keys(window.ENCOUNTERS||{}).forEach(sub=>{
   Object.keys(ENCOUNTERS[sub]).forEach(ch=>{
    (ENCOUNTERS[sub][ch]||[]).forEach(e=>{
     const id=Array.isArray(e)?e[0]:e;
     if(!valid(id))o.badEncounters.push(sub+'/ch'+ch+'/'+id);
    });
   });
  });

  // townsfolk teams, gym aces, boss teams, in both regions
  ['c','calc'].forEach(sub=>{
   switchSubject(sub);
   (TOWNSFOLK||[]).forEach(t=>(t.team||[]).forEach(id=>{if(!valid(id))o.badTeams.push(sub+'/'+t.id+'/'+id);}));
   (CHAPTERS||[]).forEach(c=>{if(c.ace!==undefined&&!valid(c.ace))o.badAce.push(sub+'/ch'+c.n+'/'+c.ace);});
   (ELITE||[]).forEach(e=>{if(e.ace!==undefined&&!valid(e.ace))o.badAce.push(sub+'/'+e.id+'/'+e.ace);});
   // generate each gym and boss team for real
   (CHAPTERS||[]).forEach(c=>{try{const t=gymTeam(c);if(!t||!t.length)o.badTeams.push(sub+'/gym'+c.n+'/empty');
     t.forEach(m=>{if(!valid(m.id))o.badTeams.push(sub+'/gym'+c.n+'/'+m.id);
       if(m.lvl<1||m.lvl>100)o.levelIssues.push(sub+'/gym'+c.n+'/lv'+m.lvl);});
   }catch(e){o.badTeams.push(sub+'/gym'+c.n+': '+e.message);}});
   (ELITE||[]).forEach(el=>{try{const t=eliteTeam(el);if(!t||!t.length)o.badTeams.push(sub+'/'+el.id+'/empty');
     t.forEach(m=>{if(!valid(m.id))o.badTeams.push(sub+'/'+el.id+'/'+m.id);
       if(m.lvl<1||m.lvl>100)o.levelIssues.push(sub+'/'+el.id+'/lv'+m.lvl);});
   }catch(e){o.badTeams.push(sub+'/'+el.id+': '+e.message);}});
   // questions
   Object.keys(QBANK).forEach(ch=>{
    (QBANK[ch]||[]).forEach(q=>{
     const id=sub+'/'+(q.id||ch);
     // k 'mcq': c is the choice list and a is the index into it.
     // k 'fill': a is the list of accepted answers.
     if(!q.q||!String(q.q).trim())o.badQuestions.push(id+': empty stem');
     if(q.k==='fill'){
       if(!Array.isArray(q.a)||!q.a.length)o.badQuestions.push(id+': fill has no accepted answers');
       else if(q.a.some(x=>x===undefined||x===null||String(x).trim()===''))o.badQuestions.push(id+': blank accepted answer');
     } else {
       if(!Array.isArray(q.c)||q.c.length<2)o.badQuestions.push(id+': needs at least two choices');
       else{
         if(!Number.isInteger(q.a)||q.a<0||q.a>=q.c.length)o.badQuestions.push(id+': answer index '+q.a+' of '+q.c.length);
         if(q.c.some(x=>x===undefined||x===null||String(x).trim()===''))o.badQuestions.push(id+': blank choice');
         if(new Set(q.c.map(String)).size!==q.c.length)o.badQuestions.push(id+': duplicate choices');
       }
     }
     if(q.t!==undefined&&(!Number.isInteger(q.t)||q.t<1||q.t>4))o.badQuestions.push(id+': tier '+q.t);
     if(!q.why||!String(q.why).trim())o.badQuestions.push(id+': no explanation');
    });
   });
  });
  switchSubject('c');

  // quest rewards
  (window.SIDE_QUESTS||[]).forEach(q=>{
   const pk=q.rewards&&q.rewards.pokemon;
   if(pk&&pk.id!==undefined&&!valid(pk.id))o.badRewards.push(q.id+'/'+pk.id);
   if(pk&&pk.level!==undefined&&(pk.level<1||pk.level>100))o.badRewards.push(q.id+'/lv'+pk.level);
  });

  // evolution chains terminate
  for(let id=1;id<=1025;id++){
   let cur=id,steps=0;
   while(steps<12){
    const d=dexOf(cur);
    const next=d&&d.evo&&d.evo.length?(Array.isArray(d.evo[0])?d.evo[0][0]:d.evo[0].to||d.evo[0]):null;
    if(!next||next===cur)break;
    cur=typeof next==='number'?next:null;
    if(cur===null)break;
    steps++;
   }
   if(steps>=12)o.evoLoops.push(id);
  }
  // Question ids key the spaced-review record, so a duplicate would make two
  // questions share one review history.
  o.dupIds=[];o.noId=[];
  ['c','calc'].forEach(sub=>{
   switchSubject(sub);
   const seen={};
   Object.keys(QBANK).forEach(ch=>{(QBANK[ch]||[]).forEach(q=>{
    if(!q.id){o.noId.push(sub+'/ch'+ch);return;}
    if(seen[q.id])o.dupIds.push(sub+'/'+q.id);
    seen[q.id]=ch;
   });});
  });
  switchSubject('c');

  return o;
 });
 check('every wild encounter species exists', r.badEncounters.length===0, r.badEncounters.slice(0,5).join(', '));
 check('every trainer, gym and boss team is valid', r.badTeams.length===0, r.badTeams.slice(0,5).join(', '));
 check('every gym and boss ace exists', r.badAce.length===0, r.badAce.slice(0,5).join(', '));
 check('all generated levels are 1-100', r.levelIssues.length===0, r.levelIssues.slice(0,5).join(', '));
 check('every question is answerable', r.badQuestions.length===0, r.badQuestions.slice(0,6).join(' | '));
 check('every quest reward is valid', r.badRewards.length===0, r.badRewards.slice(0,5).join(', '));
 check('no evolution chain loops', r.evoLoops.length===0, r.evoLoops.slice(0,8).join(', '));
 check('every question has a unique id', r.dupIds.length===0, r.dupIds.slice(0,5).join(', '));
 check('every question has an id', r.noId.length===0, r.noId.slice(0,5).join(', '));
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));
 await ctx.close();await b.close();
 const failed=results.filter(x=>!x.ok);
 console.log('\n'+(results.length-failed.length)+'/'+results.length+' checks passed');
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
