/* Question quality gates for the revised bank and active midterm, excluding imports. */
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const {window:after,files}=require('./dump-questions.cjs');
const before={console};before.window=before;vm.createContext(before);
for(const file of files)if(file!=='js/data/questions/midterm-quality.js')
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),before,{filename:file});
const all=bank=>Object.values(bank.QBANK).flat();
const prior=new Map(all(before).map(q=>[q.id,q]));
const scoped=all(after).filter(q=>q.chapter<=10&&!q.source);
assert.equal(all(after).length,all(before).length,'bank size changed');
assert.equal(scoped.length,705,'authored midterm scope changed');
assert.equal(new Set(all(after).map(q=>q.id)).size,all(after).length,'duplicate ID');
for(const q of all(after)){
  const old=prior.get(q.id);assert(old,'lost or replaced ID '+q.id);
  assert.equal(q.chapter,old.chapter,'chapter identity changed '+q.id);
  if(q.source||q.chapter>10)assert.equal(JSON.stringify(q),JSON.stringify(old),'excluded card changed '+q.id);
}
const mcq=scoped.filter(q=>q.k==='mcq');
assert.equal(mcq.length,684);assert.equal(scoped.filter(q=>q.k==='fill').length,21);
assert.equal(scoped.filter(q=>/-tf-/.test(q.id)).length,91);
for(const q of mcq){
  assert.equal(q.c.length,4,q.id+': four choices required');
  assert.equal(new Set(q.c).size,4,q.id+': duplicate choices');
  assert(Number.isInteger(q.a)&&q.a>=0&&q.a<4,q.id+': bad answer index');
  assert(!q.c.some(c=>/^(?:all|none) of the above|pok.mon type/i.test(c)),q.id+': filler distractor');
  assert(q.q&&q.why,q.id+': missing content');
  const maxWrong=Math.max(...q.c.filter((_,i)=>i!==q.a).map(s=>s.length));
  assert(!(q.c[q.a].length>=2*maxWrong&&q.c[q.a].length-maxWrong>=20),q.id+': severe length giveaway');
}
function rates(items,measure){
  const rankScores=[0,0,0,0];let uniqueLong=0,longRight=0,uniqueShort=0,shortRight=0;
  for(const q of items){
    const sizes=q.c.map(measure),ordered=sizes.slice().sort((a,b)=>a-b);
    const top=sizes.filter(n=>n===ordered[3]).length,bottom=sizes.filter(n=>n===ordered[0]).length;
    if(top===1){uniqueLong++;if(sizes[q.a]===ordered[3])longRight++;}
    if(bottom===1){uniqueShort++;if(sizes[q.a]===ordered[0])shortRight++;}
    const ties=sizes.filter(n=>n===sizes[q.a]).length;
    for(let rank=0;rank<4;rank++)if(sizes[q.a]===ordered[rank])rankScores[rank]+=1/ties;
  }
  return {rankRates:rankScores.map(n=>n/items.length),uniqueLong,longRight,uniqueShort,shortRight};
}
vm.runInContext(fs.readFileSync(path.join(root,'js/data/c-midterm.js'),'utf8'),after);
vm.runInContext(fs.readFileSync(path.join(root,'js/engine/quiz.js'),'utf8'),after);
const active=after.revisionQuestions(after.C_REVISION_ROUTES[0]).filter(q=>!q.source);
assert.equal(active.length,614,'active authored midterm scope changed');
const activeMCQ=active.filter(q=>q.k==='mcq');
assert.equal(activeMCQ.length,596);assert.equal(active.filter(q=>q.k==='fill').length,18);
const measured={revisedBank:{},activeMidterm:{}};
for(const [name,measure] of Object.entries({characters:s=>[...s].length,words:s=>(s.match(/\S+/g)||[]).length})){
  for(const [scope,items] of [['revisedBank',mcq],['activeMidterm',activeMCQ]]){
    const result=rates(items,measure);measured[scope][name]=result;
    for(const score of result.rankRates)assert(score>=.20&&score<=.30,scope+' '+name+': exploitable length rank '+score);
    for(const group of [
      ...['Recall','Concept','Bug Hunt','Trace'].map(tag=>items.filter(q=>q.tag===tag)),
      ...[1,2,3,4].map(t=>items.filter(q=>q.t===t))
    ])if(group.length>=80)for(const score of rates(group,measure).rankRates)
      assert(score<=.34,scope+' '+name+': subgroup length shortcut '+score);
  }
}
// The source index must remain the grading identity across every presentation.
vm.runInContext('var qualitySeed=159; Math.random=function(){qualitySeed=(Math.imul(qualitySeed,1664525)+1013904223)>>>0;return qualitySeed/4294967296;};',after);
for(const q of mcq){
  const positions=new Set();let last=-1;
  for(let i=0;i<40;i++){
    const order=after.shuffledChoiceOrder(q),position=order.indexOf(q.a);
    assert.deepEqual([...order].sort(),[0,1,2,3],q.id+': presentation lost a choice');
    assert(position!==last,q.id+': correct slot repeated');
    assert.equal(q.c[order[position]],q.c[q.a],q.id+': grading identity changed');
    positions.add(position);last=position;
  }
  assert.equal(positions.size,4,q.id+': unavailable correct position');
}
// Applying the quality layer again must not touch subsequently loaded imports.
const source=fs.readFileSync(path.join(root,'js/data/questions/midterm-quality.js'),'utf8');
const snapshot=JSON.stringify(all(after));vm.runInContext(source,after);
assert.equal(JSON.stringify(all(after)),snapshot,'quality patches are not idempotent');
for(const id of after.C_MIDTERM_QUALITY_IDS)assert(prior.has(id),'unknown quality ID '+id);
console.log('PASS  705 authored cards; 684 four-option MCQs; 21 fills; stable IDs and chapters');
console.log('PASS  active midterm has 614 authored cards; 596 four-option MCQs and 18 fills');
console.log('PASS  all 82 imported cards and every later-chapter card unchanged');
console.log('PASS  no severe correct-answer length giveaway; all length-rank strategies near chance');
console.log('PASS  seeded presentation shuffles preserve grading and visit all four slots');
console.log(JSON.stringify(measured));
