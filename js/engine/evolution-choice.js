function evolutionBranches(m){var seen={};var e=(dexOf(m.id).evo||[]).filter(function(x){if(seen[x.to])return false;seen[x.to]=true;return true;});return e.length>1?e:[];}
var EVOLUTION_CHOICE=null;
var EVOLUTION_ITEM_CHOICE=null;
function renderEvolutionChoices(){var h='';['party','box'].forEach(function(w){S[w].forEach(function(m,i){if(evolutionBranches(m).length)h+='<div class="note">'+esc(monName(m))+' (Lv '+m.lvl+') <button data-evo-where="'+w+'" data-evo-index="'+i+'">Choose evolution</button></div>';});});if(!h)return;$('#s-party').insertAdjacentHTML('beforeend','<section class="panel"><h3>Evolution paths</h3><p>Choose when you are ready. Special evolution methods use level requirements in this game.</p>'+h+'</section>');document.querySelectorAll('[data-evo-where]').forEach(function(b){b.onclick=function(){openEvolutionChoice(b.dataset.evoWhere,Number(b.dataset.evoIndex));};});}
function openEvolutionChoice(w,i){var m=S[w]&&S[w][i];if(!m)return;EVOLUTION_CHOICE=m;var h='<h2>Choose a path for '+esc(monName(m))+'</h2><p>You can decide later. Evolution cannot be reversed.</p><div class="row">';evolutionBranches(m).forEach(function(e){var need=e.level||32;h+='<button '+(m.lvl<need?'disabled':'')+' onclick="confirmEvolutionChoice('+e.to+')"><img style="width:80px;height:80px;object-fit:contain" src="'+spriteUrl(e.to)+'" alt=""><br>'+esc(titleCase(dexOf(e.to).name))+'<br>Lv '+need+'</button>';});modal(h+'</div><button onclick="closeModal()">Decide later</button>');}
function confirmEvolutionChoice(id){var m=EVOLUTION_CHOICE;if(!m||S.party.concat(S.box).indexOf(m)<0)return;if(typeof B!=='undefined'&&B&&!B.over){toast('Finish your battle before evolving.');return;}if(!evolutionBranches(m).some(function(e){return e.to===id&&m.lvl>=(e.level||32);}))return;var from=monName(m),old=maxHp(m),fainted=m.hp<=0;m.id=id;m.hp=fainted?0:Math.min(maxHp(m),m.hp+Math.max(0,maxHp(m)-old));S.seen[id]=true;S.caught[id]=true;EVOLUTION_CHOICE=null;saveGame();renderParty();showEvolve({from:from,to:monName(m),id:id});}

function openEvolutionItemChoice(itemKey,index){
  var item=itemById(itemKey),m=S.party&&S.party[index];
  if(!item||item.effectHandler!=='party-evolution'||!itemCount(itemKey)||!m||!evolutionBranches(m).length)return false;
  EVOLUTION_ITEM_CHOICE={itemKey:itemKey,mon:m};
  var h='<h2>'+esc(item.name)+': choose a path</h2><p>The stone is consumed only after a successful evolution.</p><div class="row">';
  evolutionBranches(m).forEach(function(e){h+='<button onclick="confirmItemEvolutionChoice('+e.to+')"><img style="width:80px;height:80px;object-fit:contain" src="'+spriteUrl(e.to)+'" alt=""><br>'+esc(titleCase(dexOf(e.to).name))+'</button>';});
  modal(h+'</div><button onclick="EVOLUTION_ITEM_CHOICE=null;closeModal()">Keep the stone</button>');
  return true;
}

function confirmItemEvolutionChoice(id){
  var pending=EVOLUTION_ITEM_CHOICE,m=pending&&pending.mon,item=pending&&itemById(pending.itemKey);
  if(!pending||!m||S.party.indexOf(m)<0||!item||!itemCount(pending.itemKey))return false;
  if(typeof B!=='undefined'&&B&&!B.over){toast('Finish your battle before evolving.');return false;}
  if(!evolutionBranches(m).some(function(e){return e.to===id;}))return false;
  var snapshot=JSON.parse(JSON.stringify(m)),oldCount=itemCount(pending.itemKey);
  var oldSeen=JSON.stringify(S.seen||{}),oldCaught=JSON.stringify(S.caught||{});
  var from=monName(m),oldMax=maxHp(m),fainted=m.hp<=0;
  m.id=id;m.hp=fainted?0:Math.min(maxHp(m),m.hp+Math.max(0,maxHp(m)-oldMax));
  S.seen[id]=true;S.caught[id]=true;
  if(!useItem(pending.itemKey,1)||!persistBagUse()){
    restoreItemTarget(m,snapshot);S.items[pending.itemKey]=oldCount;
    S.seen=JSON.parse(oldSeen);S.caught=JSON.parse(oldCaught);
    return false;
  }
  EVOLUTION_ITEM_CHOICE=null;renderParty();showEvolve({from:from,to:monName(m),id:id});return true;
}
