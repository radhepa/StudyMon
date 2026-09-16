/* Persistent friendship, scenes and trainer battles. One heart is 100 points. */
var FRIEND_STEP = 5;
function trainerById(id) { return TRAINERS.find(function(t){return t.id===id;}); }

/* One cast, two depths. A companion from trainers.js has a portrait, a partner
   and seven bespoke heart events. Anyone from townsfolk.js has three events
   drawn from their profession's arc, with their own name written into it.
   castMember() flattens both into the shape the friend screens expect. */
function castMember(id) {
  var t = trainerById(id);
  if (t) {
    return { id: t.id, name: t.name, role: t.role, bio: t.bio, colour: t.color,
             companion: true, source: t };
  }
  var p = (typeof townsfolkById === 'function') ? townsfolkById(id) : null;
  if (!p) return null;
  return { id: p.id, name: p.name, role: p.cls, bio: p.say,
             colour: '#8e6845', companion: false, source: p };
}

function folkArc(p) {
  var key = (window.CLASS_STORY || {})[p.cls];
  return (window.FOLK_EVENTS || {})[key] || [];
}

/* How many heart events this person has at all. */
function castEventCount(id) {
  var m = castMember(id);
  if (!m) return 0;
  return m.companion ? m.source.events.length : folkArc(m.source).length;
}

/* Hearts and badges needed for their next event. */
function castGate(id, index) {
  var m = castMember(id);
  if (!m) return { hearts: 99, badges: 99 };
  if (m.companion) return { hearts: FRIEND_GATES[index], badges: FRIEND_BADGES[index] };
  var ev = folkArc(m.source)[index];
  return ev ? { hearts: ev.hearts, badges: ev.badges } : { hearts: 99, badges: 99 };
}

/* Someone counts as a friend once you have shared a heart with them. Until then
   they are just a face in the region. */
var FRIEND_THRESHOLD = 100;
function isFriend(id) {
  var f = S.friends && S.friends[id];
  return !!f && f.met && f.points >= FRIEND_THRESHOLD;
}
/* You start with nobody. Everyone here was met somewhere in the region and then
   brought over the line, companions included , the Friends screen is a record of
   what you have built, not a cast list handed to you at the start. */
function friendRoster() {
  ensureFriends();
  var out = [];
  TRAINERS.forEach(function (t) { if (isFriend(t.id)) out.push(t.id); });
  (typeof everyPerson === 'function' ? everyPerson() : (window.TOWNSFOLK || []))
    .forEach(function (p) { if (isFriend(p.id)) out.push(p.id); });
  return out;
}

/* Their teams keep pace with your badges: another Pokemon every three badges,
   and the whole roster evolves a stage every five. scaleSpecies still trims
   anything that would badly outclass your own party. */
function friendTeamSize(t) { return Math.max(1, Math.min(t.team.length, 1 + Math.floor(badgeCount() / 3))); }
function friendEvoStages() { return Math.floor(badgeCount() / 5); }
function friendSpecies(id) {
  return scaleSpecies(evolveSpecies(id, friendEvoStages()), partyCapBst() * 1.25);
}
function friendPartnerId(t) { return friendSpecies(t.partner); }
function friendTeam(t) { return t.team.slice(0, friendTeamSize(t)).map(friendSpecies); }

/* Tell the player what the next badge actually buys them here. */
function friendTeamNote(t) {
  var b = badgeCount(), bits = [];
  var size = friendTeamSize(t);
  if (size < t.team.length) {
    var need = (Math.floor(b / 3) + 1) * 3;
    bits.push('They bring a ' + (size + 1) + (size + 1 === 2 ? 'nd' : size + 1 === 3 ? 'rd' : 'th') +
              ' Pokémon at ' + need + ' badges.');
  } else {
    bits.push('Their full team of ' + size + ' turns out for you now.');
  }
  var stages = friendEvoStages();
  if (stages < 3) bits.push('Their team evolves again at ' + ((stages + 1) * 5) + ' badges.');
  bits.push('You have ' + b + '.');
  return bits.join(' ');
}
function freshFriend() { return {points:0,met:false,events:[],history:[],talks:0,outings:0,battles:0,wins:0,lastTalk:-5,lastOuting:-5,lastBattle:-5,storyBadges:0}; }
function ensureFriends() {
  if (!S) return;
  if (!S.friends || typeof S.friends !== 'object' || Array.isArray(S.friends)) S.friends={};
  var everyone = TRAINERS.map(function(t){return {id:t.id};});
  if (window.TOWNSFOLK) everyone = everyone.concat(window.TOWNSFOLK.map(function(p){return {id:p.id};}));
  everyone.forEach(function(t){
    var f=S.friends[t.id];
    if (!f || typeof f!=='object' || Array.isArray(f)) f=S.friends[t.id]=freshFriend();
    var base=freshFriend();Object.keys(base).forEach(function(k){if(f[k]===undefined)f[k]=base[k];});
    f.points=Math.max(0,Math.min(1000,Number(f.points)||0));
    if(!Array.isArray(f.events))f.events=[];
    var cap=castEventCount(t.id)||7;
    f.events=f.events.filter(function(e,i,a){return Number.isInteger(e)&&e>=0&&e<cap&&a.indexOf(e)===i;}).sort(function(a,b){return a-b;});
    if(!Array.isArray(f.history))f.history=[];
    ['talks','outings','battles','wins','storyBadges'].forEach(function(k){f[k]=Math.max(0,Math.floor(Number(f[k])||0));});
    ['lastTalk','lastOuting','lastBattle'].forEach(function(k){f[k]=Number.isFinite(f[k])?f[k]:-5;});
    f.storyBadges=Math.min(15,f.storyBadges);
  });
  if(S.friendScene && (!castMember(S.friendScene.id)||!['event','outing'].includes(S.friendScene.kind)||!Number.isInteger(S.friendScene.index))) S.friendScene=null;
  if(S.friendScene){
    var sc=S.friendScene;
    if(!Number.isInteger(sc.beat)||sc.beat<0) sc.beat=0;
    if(!Array.isArray(sc.picks)) sc.picks=[];
    if(!Number.isFinite(sc.gained)) sc.gained=0;
  }
}
function friendship(id){ensureFriends();return S.friends[id];}

/* A heart event plays as a short scene: beat one comes from trainers.js, the
   rest from EVENT_BEATS in js/data/event-beats.js. Outings stay a single beat.
   sceneBeats() normalises both into one shape so the renderer does not care. */
function sceneBeats(who, kind, index) {
  var m = castMember(who && who.id ? who.id : who);
  if (!m) return null;
  var t = m.source;
  if (m && !m.companion) {
    if (kind !== 'event') return null;             // townsfolk have no outings
    var ev = folkArc(m.source)[index];
    if (!ev) return null;
    var say = function (s) { return String(s).split('{name}').join(m.name); };
    return { title: ev.title, place: ev.place,
             beats: ev.beats.map(function (b) {
               return { s: say(b.s),
                        c: b.c.map(function (c) { return [say(c[0]), say(c[1]), c[2]]; }) };
             }) };
  }
  var src = (kind === 'event' ? t.events : t.outings)[index];
  if (!src) return null;
  var beats = [{ s: src[2], c: src[3] }];
  if (kind === 'event') {
    var extra = (window.EVENT_BEATS && window.EVENT_BEATS[t.id] && window.EVENT_BEATS[t.id][index]) || [];
    for (var i = 0; i < extra.length; i++) beats.push(extra[i]);
  }
  return { title: src[0], place: src[1], beats: beats };
}
function friendHearts(f){return Math.floor(f.points/100);}
function changeFriendship(id,amount){var f=friendship(id),before=f.points;f.points=Math.max(0,Math.min(1000,before+amount));return f.points-before;}
function syncFriendStory(){
  ensureFriends();var badges=badgeCount(),changed=false;
  var all=TRAINERS.map(function(t){return t.id;}).concat((window.TOWNSFOLK||[]).map(function(p){return p.id;}));
  /* Badges drift you closer to people you have actually met. Companions travel
     with you, so the drift is strong. Townsfolk see you in passing, so theirs is
     weak on purpose: 15 badges is 60 points, never the 100 a friendship needs.
     Badges open the door; you still have to walk through it. */
  all.forEach(function(id){
    var f=S.friends[id]; if(!(f&&f.met&&badges>f.storyBadges)) return;
    var m=castMember(id), rate=(m&&m.companion)?12:4;
    changeFriendship(id,(badges-f.storyBadges)*rate);
    f.storyBadges=badges; changed=true;
  });
  if(changed)saveGame();
}
function friendWait(f,action){return Math.max(0,(Number(f['last'+action])||0)+FRIEND_STEP-(Number(S.clock)||0));}
function heartStrip(f){var n=friendHearts(f);return '<div class="friend-hearts" role="img" aria-label="'+n+' of 10 hearts">'+Array.from({length:10},function(_,i){return '<span class="'+(i<n?'full':'empty')+'" aria-hidden="true">♥</span>';}).join('')+'</div>';}
/* Companions have painted portraits. The wider cast does not, so they get a
   lettered disc in their trade's colour and their lead Pokemon beside it. */
function friendArt(t){
  var m = castMember(t.id ? t.id : t);
  if (!m) return '';
  if (m.companion) {
    var p = friendPartnerId(m.source);
    return '<img class="trainer-portrait" style="--head-shift:'+((window.TRAINER_HEAD_SHIFT||{})[m.id]||0)+'%" src="'+TRAINER_PORTRAITS[m.id]+'" alt="'+esc(m.name)+'">'+
           '<img class="trainer-partner" src="'+artUrl(p)+'" alt="'+esc(titleCase(dexOf(p).name))+'">';
  }
  var mon = (m.source.team && m.source.team.length) ? m.source.team[0] : null;
  var art = (window.FOLK_PORTRAITS || {})[m.id];
  var face = art
    ? '<img class="trainer-portrait" style="--head-shift:'+((window.FOLK_HEAD_SHIFT||{})[m.id]||0)+'%" src="'+art+'" alt="'+esc(m.name)+'">'
    : '<div class="folk-disc" aria-hidden="true">'+esc(m.name.charAt(0))+'</div>';
  return face +
         (mon ? '<img class="trainer-partner" src="'+artUrl(mon)+'" alt="'+esc(titleCase(dexOf(mon).name))+'">' : '');
}
function openFriends(){showScreen('friends');renderFriends();}
function renderFriends(){
  syncFriendStory();var h='<h2>People around town</h2><p class="muted">A few familiar faces between routes. Stop for a chat, arrange a practice match, or make plans for the afternoon.</p>';
  if(S.friendScene){
    var rsc=sceneBeats(S.friendScene.id,S.friendScene.kind,S.friendScene.index);
    h+='<div class="panel friend-resume"><p>You left a conversation with '+esc(castMember(S.friendScene.id).name)+' unfinished'+
       (rsc&&rsc.beats.length>1?' , part '+((S.friendScene.beat||0)+1)+' of '+rsc.beats.length:'')+
       '.</p><button class="primary" onclick="renderFriendScene()">Pick up where you left off</button></div>';
  }
  var roster=friendRoster();
  if(!roster.length){
    var known=0,cast=TRAINERS.length+(window.TOWNSFOLK||[]).length;
    TRAINERS.concat(window.TOWNSFOLK||[]).forEach(function(p){if(S.friends[p.id]&&S.friends[p.id].met)known++;});
    h+='<div class="panel friend-empty"><h3>Nobody yet</h3>'+
       '<p>You have not made a friend so far. Everyone starts as a stranger in the region , '+
       'battle them, talk to them, rest at their Centre, and when someone reaches a full heart '+
       'they move in here.</p><p class="small">'+known+' of '+cast+' people met.</p>'+
       '<button class="primary" onclick="openTown()">Go and meet someone</button></div>';
  }
  h+='<div class="friends-grid">';
  roster.forEach(function(id){
    var m=castMember(id); if(!m) return;
    var f=friendship(id), next=f.events.length, cap=castEventCount(id);
    var g=castGate(id,next);
    var ready=next<cap&&f.met&&friendHearts(f)>=g.hearts&&badgeCount()>=g.badges;
    h+='<article class="friend-card panel'+(m.companion?'':' folk')+'"><div class="trainer-art" style="--trainer-color:'+m.colour+'">'+friendArt(m)+'</div>'+
       '<div class="friend-role">'+esc(m.role)+'</div><h3>'+esc(m.name)+'</h3><p>'+esc(m.bio)+'</p>'+heartStrip(f)+
       '<p class="small">'+friendHearts(f)+'/10 hearts · '+f.events.length+'/'+cap+' memories</p>'+
       '<button class="'+(ready?'primary':'')+'" onclick="openFriend(\''+id+'\')">'+
       (!f.met?'Introduce yourself':ready?'A heart event is ready':'Spend time together')+'</button></article>';
  });
  h+='</div>'+
     (roster.length?'<p class="muted" style="margin-top:14px">Everyone in the region can become a friend. Battle them, talk to them, '+
     'and once you share a heart they move in here with the rest.</p>':'')+
     '<details class="panel friend-rules"><summary>How friendship works</summary><p>One heart is 100 friendship points. You can gain or lose points, up to ten hearts. Your Pokémon do not lose EXP when an outing goes badly.</p><p>Conversations, outings and practice battles each have their own reward break. Answer five more study questions to earn friendship from that activity again. You can still chat or battle while you wait. There is no real-world timer.</p><p>Each new gym badge adds 12 points with a travelling companion and 4 with anyone else you have met, so badges bring people closer but never make a friend for you. Earlier badges count when you first meet someone. Heart events need both friendship and story progress. Completed events stay in your journal, even if friendship drops.</p><p>These are friendships, not romance routes. Choices have different outcomes, but a bad afternoon does not end a friendship.</p></details>';
  $('#s-friends').innerHTML=h;
}
function openFriend(id){
  var m=castMember(id); if(!m) return;
  syncFriendStory(); var f=friendship(id);
  if(!f.met){f.met=true;changeFriendship(id,35);syncFriendStory();saveGame();}
  showScreen('friends');
  var t=m.source, cap=castEventCount(id), n=f.events.length, g=castGate(id,n);
  var ready=n<cap&&friendHearts(f)>=g.hearts&&badgeCount()>=g.badges;

  var h='<button class="ghost" onclick="renderFriends()">Back to your friends</button>'+
    '<div class="friend-detail panel"><div class="trainer-art" style="--trainer-color:'+m.colour+'">'+friendArt(m)+'</div>'+
    '<div><span class="friend-role">'+esc(m.role)+'</span><h2>'+esc(m.name)+'</h2><p>'+esc(m.bio)+'</p>'+
    heartStrip(f)+'<p>'+friendHearts(f)+'/10 hearts · '+f.points+'/1000 friendship</p>'+
    '<blockquote>'+esc(m.companion ? (f.talks?t.talk[(f.talks-1)%t.talk.length]:t.intro) : t.say)+'</blockquote>'+
    '<div class="friend-progress" role="progressbar" aria-label="Friendship" aria-valuemin="0" aria-valuemax="1000" aria-valuenow="'+f.points+'"><span style="width:'+f.points/10+'%"></span></div></div></div>';

  if(m.companion){
    h+='<section class="panel friend-team"><h3>'+esc(m.name)+'\u2019s team</h3><div class="team-row">';
    friendTeam(t).forEach(function(sp){h+='<figure><img src="'+spriteUrl(sp)+'" alt=""><figcaption>'+esc(titleCase(dexOf(sp).name))+'</figcaption></figure>';});
    h+='</div><p class="small">'+friendTeamNote(t)+'</p></section>';
  } else if (t.team && t.team.length) {
    h+='<section class="panel friend-team"><h3>'+esc(m.name)+'\u2019s team</h3><div class="team-row">';
    npcTeam(t).forEach(function(sp){h+='<figure><img src="'+spriteUrl(sp)+'" alt=""><figcaption>'+esc(titleCase(dexOf(sp).name))+'</figcaption></figure>';});
    h+='</div><p class="small">You will find '+esc(m.name)+' at '+esc(locationById(t.loc).name)+'.</p></section>';
  }

  h+='<div class="friend-actions panel"><div><h3>Catch up</h3><p class="small">'+
     (friendWait(f,'Talk')?'Chat anytime. Friendship again after '+friendWait(f,'Talk')+' more questions.':'A conversation adds 15 friendship.')+
     '</p><button onclick="talkFriend(\''+id+'\')">Have a chat</button></div>';
  if(m.companion){
    h+='<div><h3>Make plans</h3><p class="small">'+
       (friendWait(f,'Outing')?'Next outing after '+friendWait(f,'Outing')+' more questions.':'Pick an outing. Your choices can bring you closer or leave things awkward.')+
       '</p><button '+(friendWait(f,'Outing')?'disabled':'')+' onclick="chooseOuting(\''+id+'\')">Go somewhere together</button></div>';
  }
  if(m.companion || (t.team && t.team.length)){
    h+='<div><h3>Practice match</h3><label class="small" for="friend-chapter">Study chapter</label><select id="friend-chapter">';
    CHAPTERS.forEach(function(c){h+='<option value="'+c.n+'"'+(!m.companion&&c.n===t.ch?' selected':'')+'>'+c.n+'. '+esc(c.title)+'</option>';});
    h+='</select><p class="small">'+(friendWait(f,'Battle')?'Battle anytime. Friendship again after '+friendWait(f,'Battle')+' more questions.':'Win: +25. Loss: +15. Answer at least one question to earn friendship.')+
       ' Both teams heal after a finished match.</p><button onclick="battleFriend(\''+id+'\')">Battle '+esc(m.name)+'</button></div>';
  }
  h+='</div>';

  h+='<section class="panel friend-journal"><h3>Your story with '+esc(m.name)+'</h3>';
  if(n<cap){
    var nextTitle = m.companion ? t.events[n][0] : (folkArc(t)[n]||{}).title;
    h+='<p>Next: <b>'+esc(nextTitle||'')+'</b>. Needs '+g.hearts+' hearts and '+g.badges+' gym badges. You have '+friendHearts(f)+' hearts and '+badgeCount()+' badges.</p>'+
       '<button class="primary" '+(ready?'':'disabled')+' onclick="startFriendScene(\''+id+'\',\'event\','+n+')">'+(ready?'See heart event':'Keep getting to know each other')+'</button>';
  } else h+='<p>You have shared every heart event with '+esc(m.name)+'.</p>';
  h+='<ol class="memory-list">';
  for(var i=0;i<cap;i++){
    var title = m.companion ? t.events[i][0] : (folkArc(t)[i]||{}).title;
    var gg = castGate(id,i);
    var done = f.events.includes(i);
    h+='<li>'+(done?'<button onclick="readMemory(\''+id+'\','+i+')">'+esc(title)+'</button>'
                   :'<span>'+esc(title)+' <small>'+gg.hearts+' hearts \u00b7 '+gg.badges+' badges</small></span>')+'</li>';
  }
  h+='</ol></section>';
  $('#s-friends').innerHTML=h;
}
function talkFriend(id){var m=castMember(id);if(!m)return;var t=m.source,f=friendship(id);if(!f.met)return;if(typeof journalTalk==='function')journalTalk(id);var gain=0;if(!friendWait(f,'Talk')){gain=changeFriendship(id,15);f.lastTalk=S.clock;f.talks++;saveGame();}var line=m.companion?t.talk[Math.max(0,f.talks-1)%t.talk.length]:(t.tip||t.say);modal('<h2>'+esc(m.name)+'</h2><p class="scene-prose">'+esc(line)+'</p><p class="small">'+(gain?'Friendship +'+gain+'.':'Just a chat. Friendship can grow again after '+friendWait(f,'Talk')+' more questions.')+'</p><button class="primary" onclick="closeModal();openFriend(\''+id+'\')">See you around</button>');}
function chooseOuting(id){var m=castMember(id);if(!m||!m.companion)return;var t=m.source,f=friendship(id);if(friendWait(f,'Outing'))return;if(S.friendScene){renderFriendScene();return;}var h='<h2>Where to?</h2><p>'+t.name+' has some time this afternoon.</p><div class="outing-options">';t.outings.forEach(function(e,i){h+='<button onclick="closeModal();startFriendScene(\''+id+'\',\'outing\','+i+')">'+esc(e[0])+'<small>'+esc(e[1])+'</small></button>';});h+='</div><button class="ghost" onclick="closeModal()">Another time</button>';modal(h);}
function startFriendScene(id,kind,index){
  var m=castMember(id);if(!m)return;var t=m.source;var f=friendship(id);if(!f.met)return;
  if(S.friendScene){renderFriendScene();return;}
  if(kind==='event'){var gate=castGate(id,index);if(!Number.isInteger(index)||index!==f.events.length||index>=castEventCount(id)||friendHearts(f)<gate.hearts||badgeCount()<gate.badges)return;}
  else if(kind==='outing'){if(!m.companion||!t.outings[index]||friendWait(f,'Outing'))return;f.lastOuting=S.clock;}
  else return;
  S.friendScene={id:id,kind:kind,index:index,beat:0,picks:[],gained:0};saveGame();renderFriendScene();
}
function renderFriendScene(){
  ensureFriends();
  var pending=S.friendScene; if(!pending){renderFriends();return;}
  var m=castMember(pending.id); if(!m){S.friendScene=null;renderFriends();return;}
  var t=m.source, scene=sceneBeats(pending.id,pending.kind,pending.index);
  if(!scene){S.friendScene=null;saveGame();renderFriends();return;}
  if(pending.beat>=scene.beats.length){finishFriendScene();return;}
  var beat=scene.beats[pending.beat], total=scene.beats.length;
  showScreen('friends');
  var h='<div class="scene panel"><span class="friend-role">'+esc(t.name)+' \u00b7 '+esc(scene.place)+'</span>'+
        '<h2>'+esc(scene.title)+'</h2>';
  if(total>1){
    h+='<div class="scene-progress" role="img" aria-label="Part '+(pending.beat+1)+' of '+total+'">';
    for(var i=0;i<total;i++) h+='<span class="'+(i<pending.beat?'done':i===pending.beat?'now':'')+'"></span>';
    h+='<em>Part '+(pending.beat+1)+' of '+total+'</em></div>';
  }
  h+='<div class="scene-portrait">'+friendArt(t)+'</div>';
  // what has already happened in this scene, so it reads as one continuous story
  for(var j=0;j<pending.picks.length;j++){
    var pb=scene.beats[j]; if(!pb) continue;
    var pc=pb.c[pending.picks[j]]; if(!pc) continue;
    h+='<div class="scene-past"><p>'+esc(pb.s)+'</p><blockquote>'+esc(pc[0])+'</blockquote><p>'+esc(pc[1])+'</p></div>';
  }
  h+='<p class="scene-prose">'+esc(beat.s)+'</p><div class="scene-choices">';
  beat.c.forEach(function(c,i){h+='<button onclick="resolveFriendChoice('+i+')">'+esc(c[0])+'</button>';});
  h+='</div><p class="small">Choose what you want to say or do. Friendship can go up or down.</p>'+
     '<button class="ghost" onclick="renderFriends()">Come back to this later</button></div>';
  $('#s-friends').innerHTML=h;
}
function resolveFriendChoice(index){
  var pending=S.friendScene; if(!pending) return;
  var m=castMember(pending.id); if(!m) return;
  var t=m.source, f=friendship(pending.id);
  var scene=sceneBeats(pending.id,pending.kind,pending.index); if(!scene) return;
  if(pending.kind==='event'&&f.events.includes(pending.index)){S.friendScene=null;saveGame();renderFriends();return;}
  var beat=scene.beats[pending.beat]; if(!beat) return;
  var choice=beat.c[index]; if(!choice) return;

  pending.picks.push(index);
  pending.gained+=changeFriendship(t.id,choice[2]);
  pending.beat++;
  saveGame();

  if(pending.beat<scene.beats.length){ renderFriendScene(); return; }
  finishFriendScene();
}

/* The last beat has been answered: bank the scene and show how it went. */
function finishFriendScene(){
  var pending=S.friendScene; if(!pending) return;
  var m=castMember(pending.id); if(!m){S.friendScene=null;saveGame();renderFriends();return;}
  var t=m.source, f=friendship(pending.id);
  var scene=sceneBeats(pending.id,pending.kind,pending.index);
  S.friendScene=null;
  if(!scene){saveGame();renderFriends();return;}
  if(pending.kind==='event'){ if(!f.events.includes(pending.index)) f.events.push(pending.index); }
  else f.outings++;
  // completing a heart event is worth more than any single choice inside it
  var total=pending.gained+(pending.kind==='event'?changeFriendship(t.id,40):0);
  var record={kind:pending.kind,index:pending.index,choice:pending.picks[0],picks:pending.picks.slice(),
              change:total,clock:S.clock};
  f.history.push(record);
  var outings=f.history.filter(function(x){return x.kind==='outing';});
  if(outings.length>15){var remove=outings.slice(0,outings.length-15);f.history=f.history.filter(function(x){return !remove.includes(x);});}
  saveGame();
  showFriendOutcome(t,scene,record,false);
}
function showFriendOutcome(t,scene,record,replay){
  showScreen('friends');
  var picks=Array.isArray(record.picks)?record.picks:[record.choice];   // older saves stored one
  var h='<div class="scene panel"><span class="friend-role">'+(replay?'From your journal':'An afternoon with '+esc(t.name))+'</span>'+
        '<h2>'+esc(scene.title)+'</h2><div class="scene-portrait">'+friendArt(t)+'</div>';
  for(var i=0;i<scene.beats.length;i++){
    var b=scene.beats[i], c=b.c[picks[i]];
    h+='<div class="scene-past"><p>'+esc(b.s)+'</p>';
    if(c) h+='<blockquote>You chose: '+esc(c[0])+'</blockquote><p>'+esc(c[1])+'</p>';
    h+='</div>';
  }
  h+='<p class="friend-change" role="status">'+(replay?'Recorded friendship change: ':'Friendship ')+
     (record.change>0?'+':'')+record.change+
     (replay?'. Reading memories does not change friendship.':'.')+'</p>'+
     heartStrip(friendship(t.id))+
     '<button class="primary" onclick="openFriend(\''+t.id+'\')">Back to '+esc(t.name)+'</button></div>';
  $('#s-friends').innerHTML=h;
}
function readMemory(id,index){
  var m=castMember(id); if(!m) return;
  var t=m.source,f=friendship(id);
  var record=f.history.find(function(x){return x.kind==='event'&&x.index===index;});
  var scene=sceneBeats(id,'event',index);
  if(record&&scene) showFriendOutcome(t,scene,record,true);
}
function battleFriend(id){
  var m=castMember(id); if(!m) return;
  var t=m.source,f=friendship(id);if(!f.met)return;if(!partyAlive()){toast('Visit the Center first. Your party needs a rest.');return;}
  var sel=$('#friend-chapter'),chapter=sel?Number(sel.value):1;if(!chapterByNumber(chapter))chapter=CHAPTERS[0].n;
  var eligible=!friendWait(f,'Battle');
  var foes=(m.companion?friendTeam(t):npcTeam(t)).map(function(species,i){return makeMon(species,clampLvl(playerLevel()+i+(t.id==='rowan'?1:0)));});
  clearLog();startBattle({kind:'trainer',chapters:[chapter],foes:foes,title:'Practice with '+t.name,leader:t.name,friendId:id,friendEligible:eligible});
}
function finishFriendBattle(won){
  if(!B||B.kind!=='trainer'||B.friendRewarded)return;B.friendRewarded=true;clearInterval(B.timer);B.over=true;
  var m=castMember(B.friendId); if(!m) return;
  var t=m.source,f=friendship(m.id),answered=B.correctThisBattle+B.wrongThisBattle;
  f.battles++;if(won){f.wins++;S.totals.wins++;if(typeof journalWin==='function')journalWin();}var change=0;
  if(B.friendEligible&&answered>0){change=changeFriendship(t.id,won?25:15);f.lastBattle=S.clock;}
  healParty();saveGame();
  modal('<h2>'+esc(won?'You won!':'Good practice.')+'</h2><p class="scene-prose">'+esc((won?t.win:t.lose)||'Good match.')+'</p><p>'+B.correctThisBattle+'/'+answered+' questions correct.</p><p class="small">Both teams are healed. '+(change?'Friendship +'+change+'.':answered?'No friendship reward this time. Check the next reward on their page.':'Answer at least one question in a match to earn friendship.')+'</p><button class="primary" onclick="closeModal();openFriend(\''+t.id+'\')">Back to '+t.name+'</button>');
}
