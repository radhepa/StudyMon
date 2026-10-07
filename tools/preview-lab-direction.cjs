/* Isolated visual samples; never opens the player's browser profile. */
const { chromium } = require('./playwright.cjs');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://127.0.0.1:8780/');
    await page.evaluate(() => { S = freshSave(); activateSave(S); bindProgress('c'); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag(); switchSubject('c'); LAB_SCENE_TYPE_MS = 0; openSideQuests(); });
    fs.mkdirSync('output/lab-direction', { recursive: true });
    const prefix = process.argv[2] || 'before';
    for (const [id, kind, reward] of [['c-lab-02','open',false], ['c-lab-42','close',true], ['c-lab-33','open',false]]) {
      await page.evaluate(({id,kind,reward}) => { if(kind==='close'){const p=sideQuestProgress(id);p.status='completed';p.rewardClaimed=true;p.rewardReceipt={deliveredTo:'party'};} playLabScene(id,kind,{replay:true}); if(reward) { while(!LAB_SCENE.scene.beats[LAB_SCENE.index].reward) advanceLabScene(); } }, {id,kind,reward});
      await page.waitForTimeout(400);
      await page.screenshot({path:`output/lab-direction/${prefix}-${id}-${kind}.png`});
    }
    await page.setViewportSize({width:1280,height:720});
    await page.evaluate(() => {playLabScene('c-lab-48','close',{replay:true}); while(!LAB_SCENE.scene.beats[LAB_SCENE.index].reward) advanceLabScene();});
    await page.waitForTimeout(400);
    await page.screenshot({path:`output/lab-direction/${prefix}-laptop.png`});
    console.log('Saved laptop visual samples to output/lab-direction');
  } finally { await browser.close(); }
})().catch(e=>{ console.error(e); process.exitCode=1; });
