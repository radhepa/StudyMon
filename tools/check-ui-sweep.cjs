const {chromium}=require('./playwright.cjs');
const fs=require('fs');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});try{
const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.dismiss());await p.goto('http://127.0.0.1:8780/');
async function seed(subject,screen){await p.evaluate(({subject,screen})=>{if(B)B=null;cancelCJob();closeModal();S=freshSave();bindProgress('c');S.settings.sound=false;S.party=[makeMon(255,20),makeMon(25,15)];S.box=[makeMon(133,20)];S.money=5000;switchSubject(subject);document.querySelector('#nav').style.display='';document.querySelector('#nav [data-scr="'+screen+'"]').click();},{subject,screen});}
let clicks=0;const snapshots=[];
for(const subject of ['c','calc'])for(const screen of ['map','party','dex','study','stats','town','friends','quests']){
 await seed(subject,screen);
 const buttons=await p.locator('#s-'+screen+' button:visible:not(:disabled)').evaluateAll(es=>es.map(e=>({text:e.textContent,handler:e.getAttribute('onclick')})));
 for(let i=0;i<buttons.length;i++){
  const info=buttons[i];if(/export|import|reset|delete|download|new game/i.test(info.text+' '+info.handler))continue;
  await seed(subject,screen);const target=p.locator('#s-'+screen+' button:visible:not(:disabled)').nth(i);if(!await target.count())continue;
  try{await target.click({timeout:2000});clicks++;}catch(e){errors.push(subject+'/'+screen+'/'+info.text+': '+e.message.slice(0,140));}
 }
 await seed(subject,screen);await p.setViewportSize({width:390,height:844});
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);snapshots.push({subject,screen,overflow});
 if(overflow)errors.push('Mobile overflow: '+subject+'/'+screen);
 await p.setViewportSize({width:1440,height:1000});
 console.log('PASS scanned '+subject+'/'+screen+' ('+buttons.length+' buttons)');
}
for(const width of [390,1440]){await seed('c','quests');await p.evaluate(()=>openSideQuest('c-lab-28'));await p.setViewportSize({width,height:width===390?844:1000});await p.screenshot({path:'output/quest-audit-'+width+'.png',fullPage:true});const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)errors.push('Quest workspace overflow at '+width);}
fs.writeFileSync('output/ui-sweep-results.json',JSON.stringify({clicks,snapshots,errors},null,2));if(errors.length)throw Error(errors.join('\n'));console.log('PASS '+clicks+' visible-button interactions and 16 mobile screens, no page errors');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
