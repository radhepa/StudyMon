/* Every opening and ending, through actual controls, at laptop sizes.
   Completion fixtures expose endings; check-lab-scenes.cjs covers real grading.
   All storage is isolated from the player's profile. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('./playwright.cjs');
const shots = process.argv.includes('--screenshots');
(async () => {
  const browser = await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try {
    const page = await browser.newPage({viewport:{width:1366,height:768}, reducedMotion:'reduce'});
    const errors = [], failures = [], missing = [], report = [];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
    await page.goto('http://127.0.0.1:8780/');
    await page.evaluate(()=>{S=freshSave();activateSave(S);bindProgress('c');S.settings.sound=false;S.party=[makeMon(6,30)];ensureBag();switchSubject('c');openSideQuests();LAB_SCENE_TYPE_MS=0;});
    const ids = await page.evaluate(()=>SIDE_QUESTS.filter(q=>q.published).map(q=>q.id));
    fs.mkdirSync('output/lab-direction',{recursive:true});
    const sample = [1,2,9,12,19,24,27,31,32,33,36,37,38,40,42,44,46,48,49].map(n=>'c-lab-'+String(n).padStart(2,'0'));
    let pages=0;
    for(const [width,height] of [[1440,900],[1366,768],[1280,720]]) {
      await page.setViewportSize({width,height});
      const before=pages;
      for(const id of ids) for(const kind of ['open','close']) {
        await page.evaluate(({id,kind})=>{
          closeLabScene(true);
          const p=sideQuestProgress(id);
          p.status=kind==='close'?'completed':'not-started'; p.rewardClaimed=kind==='close';
          p.rewardReceipt=kind==='close'?{deliveredTo:'box',keepsakes:['cracked-compiler-pin','midterm-ribbon']}:null;
          window.__sceneSave=JSON.stringify(S);
          playLabScene(id,kind,{replay:true});
        },{id,kind});
        let steps=0, captured=false;
        while(await page.locator('#lab-scene.on').count()) {
          const result=await page.evaluate(()=>{
            const root=document.querySelector('#lab-scene'),issues=[];
            for(const sel of ['.lab-scene-card','.lab-scene-box','.lab-scene-text','.lab-scene-controls','.lab-reward']) {
              const el=root.querySelector(sel);if(!el)continue;const r=el.getBoundingClientRect();
              if(r.left<0||r.top<0||r.right>innerWidth+1||r.bottom>innerHeight+1)issues.push(sel+' outside viewport');
              if(el.scrollWidth>el.clientWidth+2)issues.push(sel+' horizontal overflow');
            }
            const box=root.querySelector('.lab-scene-box').getBoundingClientRect();
            const reward=root.querySelector('.lab-reward');
            if(reward&&reward.getBoundingClientRect().bottom>box.top)issues.push('reward overlaps conversation');
            const port=root.querySelector('.lab-scene-portrait');
            if(port&&port.complete&&!port.naturalWidth)issues.push('missing portrait');
            return {issues,reward:!!reward,beat:LAB_SCENE.index,page:LAB_SCENE.page,text:root.querySelector('.lab-scene-text').textContent};
          });
          if(result.issues.length) failures.push({width,height,id,kind,...result});
          if(shots&&width===1366&&sample.includes(id)&&!captured&&(kind==='open'||result.reward)) {
            await page.locator('.lab-scene-portrait').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
            await page.screenshot({path:`output/lab-direction/${id}-${kind}.png`}); captured=true;
          }
          // Alternate pointer and keyboard input; never call the advance function.
          if(steps%2) await page.keyboard.press('ArrowRight');
          else await page.locator('#lab-scene-next').click();
          pages++; if(++steps>30)throw Error('Scene did not finish '+id+'/'+kind);
        }
        assert(await page.evaluate(()=>JSON.stringify(S)===window.__sceneSave),'Replay changed save '+id+'/'+kind);
      }
      report.push({width,height,scenes:ids.length*2,pages:pages-before});
      console.log(`Traversed all ${ids.length*2} scenes at ${width} x ${height}: ${pages-before} dialogue pages`);
    }
    // Backtracking, stable scenery, focus containment and return.
    await page.evaluate(()=>{openSideQuest('c-lab-02');document.querySelector('.lab-scene-strip button').focus();window.__trigger=document.activeElement;replayLabScene('c-lab-02','open');window.__backdrop=document.querySelector('.lab-scene-backdrop');});
    const first=await page.locator('.lab-scene-text').innerText();
    await page.locator('#lab-scene-next').click();await page.locator('.lab-scene-back').click();
    assert.equal(await page.locator('.lab-scene-text').innerText(),first);
    assert(await page.evaluate(()=>window.__backdrop===document.querySelector('.lab-scene-backdrop')),'Backdrop rebuilt between lines');
    for(let i=0;i<8;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>!!document.activeElement.closest('#lab-scene')),'Focus escaped modal');}
    await page.keyboard.press('Escape');
    assert(await page.evaluate(()=>document.activeElement===window.__trigger&&!document.querySelector('#app').inert),'Focus/inert state not restored');
    // Actual typewriter: revealing a line does not skip it or move the buttons.
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.evaluate(()=>{LAB_SCENE_TYPE_MS=100;playLabScene('c-lab-31','open',{replay:true});});
    const bounds=await page.locator('#lab-scene-next').boundingBox();
    assert.equal(await page.locator('#lab-scene-next').innerText(),'Show line');
    await page.locator('#lab-scene-next').click();
    assert.equal(await page.evaluate(()=>LAB_SCENE.index),0);
    assert.equal(await page.locator('#lab-scene-next').innerText(),'Continue');
    assert.deepEqual(await page.locator('#lab-scene-next').boundingBox(),bounds);
    // UI hints must select guided endings, including labs without legacy framing.
    await page.evaluate(()=>{closeLabScene(true);openSideQuest('c-lab-42');sideQuestProgress('c-lab-42').hints=0;sideQuestProgress('c-lab-42').attempts=[];});
    await page.locator('#sq-hints summary').click();
    await page.waitForFunction(()=>sideQuestProgress('c-lab-42').hints>0);
    assert.equal(await page.evaluate(()=>labSceneOutcome('c-lab-42')),'guided');
    assert(await page.evaluate(()=>{
      const p=sideQuestProgress('c-lab-09');p.hints=0;p.attempts=[];questFramingNoteGuidance('c-lab-09');
      return labSceneOutcome('c-lab-09')==='guided';
    }),'Legacy guidance record not read');
    assert(await page.evaluate(()=>{
      const p=sideQuestProgress('c-lab-42');p.attempts=[{complete:false}];return labSceneOutcome('c-lab-42')==='persisted';
    }),'Persistence must take priority over hints');
    await page.emulateMedia({reducedMotion:'reduce'});
    assert(await page.evaluate(()=>{playLabScene('c-lab-31','open',{replay:true});return !LAB_SCENE.typing&&document.querySelector('.lab-scene-text').textContent.length>0;}),'Reduced motion should show complete lines');
    // All alternate dialogue is paginated without dropping words.
    assert(await page.evaluate(()=>Object.values(LAB_SCENES).every(s=>['open','close'].every(k=>s[k].beats.every(b=>[b.text,b.warm,...Object.values(b.outcome||{})].filter(Boolean).every(t=>labTextPages(t).join(' ')===t.trim().replace(/\s+/g,' ')))))));
    fs.writeFileSync('output/lab-direction/report.json',JSON.stringify({report,pages,failures,errors,missing},null,2));
    assert.deepEqual(failures,[],'Layout problems; see output/lab-direction/report.json');
    assert.deepEqual(errors,[],'Browser errors');assert.deepEqual(missing,[],'Missing assets');
    console.log('PASS: all pages fit; rewards, replay, Back, typing, hints, keyboard focus, and reduced motion verified.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
