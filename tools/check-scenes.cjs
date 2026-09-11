/* Friend scenes across the whole cast in both regions.

   Townsfolk have events only; companions also have outings. Each scene must
   carry a title, a place and beats, and every beat must offer choices that
   render, since a malformed one would strand the player in a modal. */
const {chromium}=require('./playwright.cjs');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8780/');
 const r=await p.evaluate(()=>{
  S=freshSave();bindProgress('c');S.settings.sound=false;S.party=[makeMon(6,50)];
  const o={cast:0,scenes:0,beats:0,bad:[],placeholders:[]};
  ['c','calc'].forEach(sub=>{
   switchSubject(sub);
   const cast=(typeof everyPerson==='function')?everyPerson():TOWNSFOLK;
   cast.forEach(t=>{
    o.cast++;
    const m=castMember(t.id||t);
    if(!m)return;
    const kinds=m.companion?['event','outing']:['event'];
    kinds.forEach(kind=>{
     for(let i=0;i<12;i++){
      let s;
      try{ s=sceneBeats(m.id,kind,i); }
      catch(e){ o.bad.push(m.id+'/'+kind+'/'+i+': '+e.message); continue; }
      if(!s)break;                       // ran past the end of this arc
      o.scenes++;
      if(!s.title||!String(s.title).trim())o.bad.push(m.id+'/'+kind+'/'+i+': no title');
      if(!Array.isArray(s.beats)||!s.beats.length){o.bad.push(m.id+'/'+kind+'/'+i+': no beats');continue;}
      s.beats.forEach((bt,bi)=>{
       o.beats++;
       if(!bt.s||!String(bt.s).trim())o.bad.push(m.id+'/'+kind+'/'+i+'/beat'+bi+': empty line');
       if(!Array.isArray(bt.c)||!bt.c.length)o.bad.push(m.id+'/'+kind+'/'+i+'/beat'+bi+': no choices');
       else bt.c.forEach((c,ci)=>{
        if(!Array.isArray(c)||c.length<2)o.bad.push(m.id+'/'+kind+'/'+i+'/beat'+bi+'/c'+ci+': malformed choice');
        else if(!String(c[0]).trim()||!String(c[1]).trim())o.bad.push(m.id+'/'+kind+'/'+i+'/beat'+bi+'/c'+ci+': blank text');
       });
       // an unreplaced template token would print literally
       if(/\{name\}|\{[a-z]+\}/.test(String(bt.s)))o.placeholders.push(m.id+'/'+kind+'/'+i+'/beat'+bi);
      });
     }
    });
   });
  });
  switchSubject('c');
  return o;
 });
 console.log('cast members  : '+r.cast);
 console.log('scenes        : '+r.scenes);
 console.log('beats         : '+r.beats);
 console.log('malformed     : '+(r.bad.length?r.bad.length:'none'));
 r.bad.slice(0,8).forEach(x=>console.log('   '+x));
 console.log('unreplaced {} : '+(r.placeholders.length?r.placeholders.slice(0,5).join(', '):'none'));
 console.log('page errors   : '+(errs.length?errs.slice(0,3).join(' | '):'none'));
 await ctx.close();await b.close();
 if(r.bad.length||r.placeholders.length||errs.length||r.scenes===0)process.exitCode=1;
 else console.log('PASS: every scene is well formed');
})().catch(e=>{console.error(e);process.exitCode=1});
