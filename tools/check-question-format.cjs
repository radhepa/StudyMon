/* Calculus II question formatting, open topics and the copy button.

   What this proves, against the real engine in a real browser:
   - every Calculus II question, choice, hint and explanation typesets without
     an error and without a stray ^, _ or sqrt( left on screen
   - the typesetter does what it says on a handful of known spellings, and
     leaves prose (and/or, x-axis) alone
   - every C question renders exactly as it did before: escaped, not typeset
   - every Converging Isles gym, route and exam is open on a fresh save, and a
     gym's difficulty follows the badges you hold rather than its position
   - the C region still keeps its Elite Four behind all fifteen badges
   - the copy button on the question card copies the question and its choices,
     lettered in the order they are on screen

   Needs the local server running (see TESTING.md). Uses a throwaway browser
   context, so your own save is never touched. */
const {chromium}=require('./playwright.cjs');
const BASE=process.argv[2]||'http://127.0.0.1:8780/';
const results=[];
function check(n,ok,d){results.push({n,ok});console.log((ok?'PASS  ':'FAIL  ')+n+(d?'  ['+d+']':''));}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const ctx=await b.newContext(); const p=await ctx.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE);

 const r=await p.evaluate(async ()=>{
  const o={errors:[]};
  const t=(n,fn)=>{try{return fn();}catch(e){o.errors.push(n+': '+e.message);}};
  const fresh=(subject,lv)=>{S=freshSave();bindProgress('c');S.settings.sound=false;
    if(subject==='calc')switchSubject('calc');S.party=[makeMon(6,lv||20),makeMon(9,lv||20)];ensureBag();};
  const visible=h=>{const d=document.createElement('div');d.innerHTML=h;return d.textContent;};

  t('typeset all',()=>{
    fresh('calc');
    let texts=0,bad=[];
    allQuestions().forEach(q=>{
      [q.q].concat(q.c||[],q.hints||[],[q.why]).forEach(s=>{
        if(s==null||s==='')return;
        texts++;
        const v=visible(questionHtml(q,s));
        if(/[\^_]|sqrt\(/.test(v))bad.push(q.id);
      });
    });
    o.calc={questions:allQuestions().length,texts,bad:bad.slice(0,5),badN:bad.length};
  });

  t('samples',()=>{
    const q={id:'k1-test'},h=s=>questionHtml(q,s);
    o.samples={
      power:/<sup class="mx">2<\/sup>/.test(h('x^2 + 1')),
      fraction:/class="mf"/.test(h('it equals 1/2.')),
      fracDropsParens:(()=>{const d=document.createElement('div');d.innerHTML=h('(3n + 1)/(n^3 + 2)');
        return d.querySelector('.mf-n').textContent==='3n + 1'&&d.querySelector('.mf-d').textContent==='n3 + 2';})(),
      root:/class="mr"/.test(h('sqrt(x + 1)')),
      integral:/class="mi"/.test(h('∫ from 0 to 1 of x dx'))&&/ml-u">1</.test(h('∫ from 0 to 1 of x dx')),
      unicodeIntegral:/ml-d">0</.test(h('∫₀² x dx')),
      sum:/class="ms"/.test(h('Σ from n = 1 to ∞ of 1/n^2')),
      limit:/ms-lim/.test(h('lim(b→∞) 1/b')),
      evalBar:/\]<span class="ml">/.test(h('[x²/2]₀¹')),
      minus:visible(h('x - 1')).indexOf('−')>=0,
      keepsHyphen:visible(h('the x-axis and a p-series')).indexOf('x-axis')>=0&&visible(h('a p-series')).indexOf('p-series')>=0,
      keepsWords:!/class="mf"/.test(h('and/or, kg/m and determinant/component')),
      escapes:visible(h('0 < x <= 1 & y > 2')).indexOf('≤')>=0&&!/<x/.test(h('0 <x')),
      prose:visible(h('the definite integral from x = 0 to x = 3 becomes')).indexOf('integral from')>=0
    };
  });

  t('clean data',()=>{
    fresh('calc');
    const texts=[];
    allQuestions().forEach(q=>[q.q].concat(q.c||[],q.hints||[],[q.why],q.k==='fill'&&Array.isArray(q.a)?q.a:[])
      .forEach(s=>{if(typeof s==='string'&&s)texts.push([q,s]);}));
    const bad=(re,onlyGenerated)=>texts.filter(([q,s])=>(!onlyGenerated||/-ten-/.test(q.id))&&re.test(s)).map(([q])=>q.id);
    o.clean={
      // shifted or garbled conversions from the field manual
      garbled:bad(/&[ₐ-ₜᵢ-ᵥ]|⁺\^|\^1\^1|ᶜ|₀\.⁵/),
      kSeriesWithB:bad(/Σ\(k=.*ᵇ/),
      // leftovers from pasting numbers into the generated questions
      coefOne:bad(/(^|[\s(=+\-\[])1(?=[a-zA-Z])/,true),
      powOne:bad(/[A-Za-z)]\^1(?![\d.])/,true),
      varMinusParen:bad(/[A-Za-z] [-+] \(-?\d+(\.\d+)?\)/,true),
      fracCoef:bad(/(^|[^\w)\/.^(])\d+\/\d+[a-zA-Z(]/,true)
    };
    // every generated question offers four different choices
    o.cleanDistinct=allQuestions().filter(q=>/-ten-/.test(q.id)&&(q.c.length!==4||new Set(q.c).size!==4)).map(q=>q.id);
  });

  t('C untouched',()=>{
    let n=0,diff=0;
    const bank=SUBJECTS.c.QBANK;
    for(const ch in bank)bank[ch].forEach(q=>{
      [q.q].concat(q.c||[],[q.why]).forEach(s=>{if(s==null)return;n++;if(questionHtml(q,s)!==esc(s))diff++;});
    });
    o.c={texts:n,diff};
  });

  t('open topics',()=>{
    fresh('calc');
    o.open={
      gymsBlocked:CHAPTERS.filter(c=>gymBlockedBy(c.n)).length,
      bossesClosed:ELITE.filter(e=>!bossOpen(e)).length,
      lvFresh:CHAPTERS.map(c=>gymExpectedLevel(c)),
      sizeFresh:CHAPTERS.map(c=>gymTeamSize(c.n))
    };
    renderMap();
    o.open.disabledButtons=document.querySelectorAll('#s-map button[disabled]').length;
    // a fresh save can walk straight into gym 10 and the Final
    goGym(10); beginGymBattle(10);
    o.open.gym10=!!(B&&B.kind==='gym'&&B.chapter.n===10);
    B.over=true;
    goElite('final');
    o.open.final=!!(B&&B.kind==='elite'&&B.elite.id==='final');
    B.over=true;
    // with nine badges the ramp is the fixed order again
    for(let n=1;n<=9;n++)S.badges[n]=true;
    o.open.slot10=difficultySlot(10);
    o.open.slot1=difficultySlot(1);
    S.badges={};
    o.open.slot10Fresh=difficultySlot(10);
  });

  t('C still gated',()=>{
    fresh('c');
    o.cGate={topicsOpen:topicsOpen(),eliteOpen:ELITE.filter(e=>bossOpen(e)).length,slot:difficultySlot(9)};
  });

  t('copy',()=>{
    fresh('calc');
    goWild(7); chooseMove(0);
    const q=allQuestions().find(x=>x.id==='k7-th-001');
    B.q=q; B.qAnswered=false; B.choiceOrder=null; renderQuestion();
    const order=displayedChoiceOrder(B,q);
    o.copy={button:!!document.querySelector('#quiz .qhead #qcopy-battle'),
      expected:['A','B','C','D'].map((L,i)=>L+') '+q.c[order[i]]),
      text:questionPlainText(q,order)};
  });
  return o;
 });

 // the button itself, through a stubbed clipboard
 await p.evaluate(()=>{window.__copied=null;
   try{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:t=>{window.__copied=t;return Promise.resolve();}}});}catch(e){}});
 await p.click('#qcopy-battle');
 await p.waitForTimeout(200);
 const copied=await p.evaluate(()=>({text:window.__copied,label:(document.querySelector('#qcopy-battle')||{}).textContent,toast:document.querySelector('#toast').textContent}));

 check('no setup errors', r.errors.length===0, r.errors.join(' | '));
 check('every Calculus II text typesets with nothing raw left on screen', r.calc&&r.calc.questions>=1500&&r.calc.badN===0, JSON.stringify(r.calc));
 const s=r.samples||{};
 check('powers, fractions, roots, integrals, sums, limits and evaluation bars typeset',
   s.power&&s.fraction&&s.fracDropsParens&&s.root&&s.integral&&s.unicodeIntegral&&s.sum&&s.limit&&s.evalBar, JSON.stringify(s));
 check('hyphens become minus signs only between terms', s.minus&&s.keepsHyphen, JSON.stringify({m:s.minus,h:s.keepsHyphen}));
 check('prose stays prose (and/or, units, "integral from ... becomes")', s.keepsWords&&s.prose, JSON.stringify({w:s.keepsWords,p:s.prose}));
 check('text is still escaped, and <= reads as ≤', s.escapes);
 const cl=r.clean||{};
 check('no garbled or shifted math is left in the Calculus II bank', cl.garbled&&cl.garbled.length===0&&cl.kSeriesWithB.length===0, JSON.stringify({g:(cl.garbled||[]).slice(0,3),k:(cl.kSeriesWithB||[]).slice(0,3)}));
 check('generated questions read cleanly (no 1x, ^1, x - (-4) or 9/2pi)',
   cl.coefOne&&[cl.coefOne,cl.powOne,cl.varMinusParen,cl.fracCoef].every(a=>a.length===0)&&r.cleanDistinct.length===0,
   JSON.stringify({c:(cl.coefOne||[]).slice(0,2),p:(cl.powOne||[]).slice(0,2),v:(cl.varMinusParen||[]).slice(0,2),f:(cl.fracCoef||[]).slice(0,2),d:(r.cleanDistinct||[]).slice(0,2)}));
 check('C questions render exactly as before', r.c&&r.c.texts>1000&&r.c.diff===0, JSON.stringify(r.c));
 const op=r.open||{};
 check('every Isles gym and route is open on a fresh save', op.gymsBlocked===0&&op.disabledButtons===0, JSON.stringify({g:op.gymsBlocked,d:op.disabledButtons}));
 check('every Isles exam can be challenged on a fresh save', op.bossesClosed===0&&op.final===true, JSON.stringify({b:op.bossesClosed,f:op.final}));
 check('a fresh save can fight gym 10', op.gym10===true);
 check('with no badges every gym fights like the first', op.lvFresh&&new Set(op.lvFresh).size===1&&op.sizeFresh.every(x=>x===op.sizeFresh[0]), JSON.stringify(op.lvFresh));
 check('difficulty follows badges held, never above the fixed order', op.slot10===10&&op.slot1===1&&op.slot10Fresh===1, JSON.stringify({a:op.slot10,b:op.slot1,c:op.slot10Fresh}));
 check('the C region keeps its Elite Four behind the badges', r.cGate&&r.cGate.topicsOpen===false&&r.cGate.eliteOpen===0&&r.cGate.slot===9, JSON.stringify(r.cGate));
 const cp=r.copy||{};
 check('the question card has a copy button in its header', cp.button===true);
 check('the copied text has the topic, the question and the lettered choices in screen order',
   cp.text&&cp.text.indexOf('Calculus II · Lesson 23')===0&&cp.text.indexOf('converges. Name a suitable comparison.')>0&&cp.expected.every(l=>cp.text.indexOf(l)>0), JSON.stringify(cp.text));
 check('clicking Copy puts that text on the clipboard', copied.text===cp.text&&/Copied/.test(copied.label||'')&&/copied/i.test(copied.toast||''), JSON.stringify(copied));
 check('no page errors', errs.length===0, errs.slice(0,3).join(' | '));

 await b.close();
 const failed=results.filter(x=>!x.ok).length;
 console.log('\n'+(results.length-failed)+'/'+results.length+' checks passed');
 process.exit(failed?1:0);
})();
