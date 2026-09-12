/* Persistent friendship, scenes and trainer battles. One heart is 100 points. */
var FRIEND_STEP = 5;
var FRIEND_WINDOW = 30;
var FRIEND_STAGES = [
  { id:'acquaintance', label:'Acquaintance', points:0, rank:0 },
  { id:'recognition', label:'Recognition', points:25, rank:1 },
  { id:'comfortable', label:'Comfortable acquaintance', points:50, rank:2 },
  { id:'beginning', label:'Beginning friendship', points:75, rank:3 },
  { id:'friend', label:'Actual friend', points:100, rank:4 },
  { id:'trusted', label:'Trusted friend', points:300, rank:5 },
  { id:'close', label:'Close relationship · major trust', points:600, rank:6 }
];
var FRIEND_STRANGER_STAGE = { id:'stranger', label:'Stranger', points:0, rank:0 };
var FRIEND_STAGE_MULTIPLIERS = { acquaintance:1, recognition:1, comfortable:.95,
  beginning:.9, friend:.85, trusted:.7, close:.55 };
var FRIEND_REPEAT_MULTIPLIERS = [1, .5, .25, 0];
var FRIEND_GIFT_CEILING = 599;
var FRIEND_EVENT_RULES = null;
function trainerById(id) { return TRAINERS.find(function(t){return t.id===id;}); }

/* Source prose and mechanics stay in their original files. cast.js supplies
   the authoritative identity/classification overlay and this adapter flattens
   both layers into the shape the friendship screens already consume. */
function castMember(id) {
  var meta = typeof castById === 'function' ? castById(id) : null;
  var source = meta && typeof castSource === 'function' ? castSource(meta) : null;
  if (!meta || !source) return null;
  var companion = meta.sourceKind === 'companion';
  return { id: meta.id, name: meta.name, role: meta.role,
           bio: source.bio || source.say || source.intro || meta.justification,
           colour: source.color || '#8e6845', companion: companion,
           befriendable: meta.befriendable, tier: meta.tier,
           subject: meta.homeSubject, sourceKind: meta.sourceKind,
           source: source, meta: meta };
}

function friendshipEligible(id) {
  var member = typeof castById === 'function' ? castById(id) : null;
  return !!member && member.befriendable === true;
}

/* Stages are views over the original 0..1000 scale. Saves keep their exact
   points; meeting state is the only distinction between a stranger and a new
   acquaintance at zero points. */
function friendStage(value) {
  var f = typeof value === 'string' ? (S.friends && S.friends[value]) : value;
  if (typeof value === 'number') f = { points:value, met:true };
  if (!f || !f.met) return FRIEND_STRANGER_STAGE;
  var points = Math.max(0, Math.min(1000, Number(f.points) || 0));
  for (var i=FRIEND_STAGES.length-1;i>=0;i--) if(points>=FRIEND_STAGES[i].points) return FRIEND_STAGES[i];
  return FRIEND_STAGES[0];
}
function friendStageAtLeast(value, stageId) {
  var target=FRIEND_STAGES.find(function(stage){return stage.id===stageId;});
  return !!target&&friendStage(value).rank>=target.rank;
}
function friendMeetingGate(id) {
  var m=castMember(id),f=S.friends&&S.friends[id];
  if(!m)return {allowed:false,reason:'unknown-character'};
  if(!m.befriendable)return {allowed:false,reason:'not-befriendable'};
  if(f&&f.met)return {allowed:false,reason:'already-met'};
  return {allowed:true,reason:null};
}
function friendRosterGate(id) {
  var f=S.friends&&S.friends[id];
  var allowed=!!f&&f.met&&friendStageAtLeast(f,'friend');
  return {allowed:allowed,reason:allowed?null:!f||!f.met?'not-met':'stage'};
}

function folkArc(p) {
  var key = (window.CLASS_STORY || {})[p.cls];
  return (window.FOLK_EVENTS || {})[key] || [];
}

function activeHeartEventSources(member) {
  if (!member) return [];
  var sources = member.companion ? (member.source.events || []) : folkArc(member.source);
  var ids = member.companion && member.source.heartEventIds;
  return Array.isArray(ids) && ids.length ? ids.map(function (id) {
    return sources.find(function (source) { return concreteSceneId(member, source) === id; });
  }).filter(Boolean) : sources.slice();
}
function heartEventCompatibility(id) {
  return (window.HEART_EVENT_COMPATIBILITY && window.HEART_EVENT_COMPATIBILITY[id]) || {};
}
function completedHeartEventId(id, canonicalId, completedIds) {
  var map = heartEventCompatibility(id), completed = completedIds || [];
  if (completed.indexOf(canonicalId) >= 0) return canonicalId;
  return Object.keys(map).find(function (eventId) {
    return map[eventId].canonicalId === canonicalId && completed.indexOf(eventId) >= 0;
  }) || null;
}

/* How many heart events this person has at all. */
function castEventCount(id) {
  var m = castMember(id);
  if (!m) return 0;
  return activeHeartEventSources(m).length;
}

/* Hearts and badges needed for their next event. */
function castGate(id, index) {
  var rule=friendEventRule(id,index);
  if(!rule)return {hearts:99,badges:99,stage:'close',subject:null,eventId:null};
  return {hearts:Math.ceil(rule.points/100),badges:rule.subjectBadges[rule.subject]||0,
          stage:rule.stage,subject:rule.subject,eventId:rule.eventId,rule:rule};
}

/* Someone counts as a friend once you have shared a heart with them. Until then
   they are just a face in the region. */
var FRIEND_THRESHOLD = 100;
function isFriend(id) {
  return friendRosterGate(id).allowed;
}
/* You start with nobody. Everyone here was met somewhere in the region and then
   brought over the line, companions included , the Friends screen is a record of
   what you have built, not a cast list handed to you at the start. */
function friendRoster() {
  ensureFriends();
  var list = typeof castEntries === 'function' ? castEntries() : [];
  return list.filter(function (entry) { return !!S.friends[entry.id] && isFriend(entry.id); })
    .map(function (entry) { return entry.id; });
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
function freshFriend() { return {points:0,met:false,meetings:0,events:[],history:[],talks:0,outings:0,battles:0,wins:0,lastTalk:-5,lastOuting:-5,lastBattle:-5,lastHeal:-5,rewardPacing:{anchor:0,counts:{}},storyBadgesBySubject:{}}; }
function ensureFriends() {
  if (!S) return;
  if (!S.friends || typeof S.friends !== 'object' || Array.isArray(S.friends)) S.friends={};
  /* Empty records are now lazy. Normalize every legacy record in place, even
     when its person was reclassified or is unknown to this build. */
  Object.keys(S.friends).forEach(function(id){
    var f=S.friends[id];
    if (!f || typeof f!=='object' || Array.isArray(f)) f=S.friends[id]=freshFriend();
    var base=freshFriend();Object.keys(base).forEach(function(k){if(f[k]===undefined)f[k]=base[k];});
    f.points=Math.max(0,Math.min(1000,Number(f.points)||0));
    if(!Array.isArray(f.events))f.events=[];
    if(castMember(id)) {
      f.events=f.events.filter(function(e,i,a){return typeof e==='string'&&!!sceneBeats(id,'event',e)&&a.indexOf(e)===i;});
    } else {
      f.events=f.events.filter(function(e,i,a){return typeof e==='string'&&a.indexOf(e)===i;});
    }
    if(!Array.isArray(f.history))f.history=[];
    ['meetings','talks','outings','battles','wins'].forEach(function(k){f[k]=Math.max(0,Math.floor(Number(f[k])||0));});
    if(f.met&&f.meetings<1)f.meetings=1;
    ['lastTalk','lastOuting','lastBattle','lastHeal'].forEach(function(k){f[k]=Number.isFinite(f[k])?f[k]:-5;});
    if(!f.rewardPacing||typeof f.rewardPacing!=='object'||Array.isArray(f.rewardPacing))f.rewardPacing={anchor:Number(S.activityClock)||0,counts:{}};
    f.rewardPacing.anchor=Math.max(0,Math.floor(Number(f.rewardPacing.anchor)||0));
    if(!f.rewardPacing.counts||typeof f.rewardPacing.counts!=='object'||Array.isArray(f.rewardPacing.counts))f.rewardPacing.counts={};
    Object.keys(f.rewardPacing.counts).forEach(function(action){
      f.rewardPacing.counts[action]=Math.max(0,Math.min(3,Math.floor(Number(f.rewardPacing.counts[action])||0)));
    });
    if(!f.storyBadgesBySubject||typeof f.storyBadgesBySubject!=='object'||Array.isArray(f.storyBadgesBySubject))f.storyBadgesBySubject={};
    Object.keys(f.storyBadgesBySubject).forEach(function(subject){
      f.storyBadgesBySubject[subject]=Math.max(0,Math.floor(Number(f.storyBadgesBySubject[subject])||0));
    });
    delete f.storyBadges;
  });
  var pendingMember=S.friendScene&&castMember(S.friendScene.id);
  if(S.friendScene && pendingMember && (!['event','outing'].includes(S.friendScene.kind)||
     !sceneBeats(S.friendScene.id,S.friendScene.kind,S.friendScene.sceneId))) S.friendScene=null;
  if(S.friendScene&&pendingMember){
    var sc=S.friendScene;
    var pendingScene=sceneBeats(sc.id,sc.kind,sc.sceneId);
    if(!pendingScene.beats.some(function(beat){return beat.id===sc.beatId;})) S.friendScene=null;
    if(!Array.isArray(sc.choiceIds)) sc.choiceIds=[];
    if(!Number.isFinite(sc.gained)) sc.gained=0;
  }
}
function friendship(id){
  ensureFriends();
  if(S.friends[id])return S.friends[id];
  if(!friendshipEligible(id))return null;
  return S.friends[id]=freshFriend();
}

/* A heart event plays as a short scene: beat one comes from trainers.js, the
   rest from EVENT_BEATS in js/data/event-beats.js. Outings stay a single beat.
   sceneBeats() resolves a stable ID (or a numeric index during migration) into
   one shape so stored memories no longer depend on array order. */
function concreteSceneId(member, source) {
  return member.companion ? source.id : member.id + '-' + source.id;
}
function concreteBeat(member, sceneId, sourceBeat) {
  var beatId = member.companion ? sourceBeat.id : member.id + '-' + sourceBeat.id;
  return { id: beatId, s: sourceBeat.s, c: sourceBeat.c.map(function (sourceChoice) {
    var choice = [sourceChoice[0], sourceChoice[1], sourceChoice[2]];
    choice.id = member.companion ? sourceChoice.id : member.id + '-' + sourceChoice.id;
    choice.outcomeFlags = Array.isArray(sourceChoice.outcomeFlags) ? sourceChoice.outcomeFlags.slice() : [];
    return choice;
  }) };
}
function sceneSource(member, kind, ref) {
  var list = member.companion ? (kind === 'event' ? member.source.events : member.source.outings) :
    (kind === 'event' ? folkArc(member.source) : []);
  var source = Number.isInteger(ref) ? list[ref] : list.find(function (candidate) {
    return concreteSceneId(member, candidate) === ref;
  });
  return source ? { source: source, index: list.indexOf(source), id: concreteSceneId(member, source) } : null;
}
function sceneBeats(who, kind, ref) {
  var m = castMember(who && who.id ? who.id : who);
  if (!m) return null;
  var t = m.source;
  var found = sceneSource(m, kind, ref);
  if (!found) return null;
  if (m && !m.companion) {
    var ev = found.source;
    var say = function (s) { return String(s).split('{name}').join(m.name); };
    return { id: found.id, index: found.index, title: ev.title, place: ev.place,
             beats: ev.beats.map(function (b) {
               var resolved=concreteBeat(m,found.id,b);resolved.s=say(resolved.s);
               resolved.c.forEach(function(c){c[0]=say(c[0]);c[1]=say(c[1]);});return resolved;
             }) };
  }
  var src = found.source;
  var opening={id:src.beatId,s:src[2],c:src[3]};
  var beats = [concreteBeat(m,found.id,opening)];
  if (kind === 'event') {
    var groups=(window.EVENT_BEATS&&window.EVENT_BEATS[t.id])||[];
    var extra=groups.find(function(group){return group.sceneId===src.id;})||[];
    for (var i = 0; i < extra.length; i++) beats.push(concreteBeat(m,found.id,extra[i]));
  }
  return { id: found.id, index: found.index, title: src[0], place: src[1], beats: beats };
}
function choiceById(beat, ref) {
  return Number.isInteger(ref) ? beat.c[ref] : beat.c.find(function(choice){return choice.id===ref;});
}

/* Event rules are snapshotted by stable scene ID when the scripts load. That
   makes prior-event links survive later content reordering and gives future
   scenes room for explicit meeting and compact world-flag requirements. */
function buildFriendEventRules() {
  var rules={};
  var entries=typeof castEntries==='function'?castEntries({befriendable:true}):[];
  entries.forEach(function(entry){
    var m=castMember(entry.id);if(!m)return;
    var sources=activeHeartEventSources(m);
    var prior=null;
    rules[m.id]=sources.map(function(source,index){
      var scene=sceneBeats(m.id,'event',concreteSceneId(m,source)),explicit=source.requirements||{};
      var hearts=m.companion?Number(FRIEND_GATES[index]):Number(source.hearts);
      var points=Number.isFinite(explicit.points)?Math.max(0,explicit.points):Math.max(0,(hearts||0)*100);
      var subject=explicit.subject||m.subject||'c';
      var badgeNeed=m.companion?Number(FRIEND_BADGES[index]):Number(source.badges);
      var bySubject={};bySubject[subject]=Math.max(0,Number(badgeNeed)||0);
      if(explicit.subjectBadges&&typeof explicit.subjectBadges==='object'){
        bySubject={};Object.keys(explicit.subjectBadges).forEach(function(key){bySubject[key]=Math.max(0,Number(explicit.subjectBadges[key])||0);});
      }
      var rule={eventId:scene&&scene.id,stage:explicit.stage||friendStage(points).id,points:points,
        subject:subject,subjectBadges:bySubject,priorEventIds:explicit.priorEventIds?explicit.priorEventIds.slice():(prior?[prior]:[]),
        meetings:Math.max(1,Number(explicit.meetings)||1),flags:Array.isArray(explicit.flags)?explicit.flags.slice():[]};
      prior=rule.eventId;return rule;
    }).filter(function(rule){return !!rule.eventId;});
  });
  return rules;
}
function friendEventRules(id) {
  if(!FRIEND_EVENT_RULES)FRIEND_EVENT_RULES=buildFriendEventRules();
  return FRIEND_EVENT_RULES[id]||[];
}
function friendEventRule(id,ref) {
  var rules=friendEventRules(id);
  if(Number.isInteger(ref))return rules[ref]||null;
  return rules.find(function(rule){return rule.eventId===ref;})||null;
}
function subjectBadgeCountFor(id) {
  var badges=id===activeSubject()?S.badges:(S.progress&&S.progress[id]&&S.progress[id].badges)||{};
  return Object.keys(badges||{}).filter(function(key){return !!badges[key];}).length;
}
function friendEventGate(id,ref) {
  var rule=friendEventRule(id,ref),f=S.friends&&S.friends[id];
  if(!rule)return {allowed:false,completed:false,reasons:['unknown-event'],rule:null};
  var completed=!!f&&!!completedHeartEventId(id,rule.eventId,f.events);
  if(completed)return {allowed:true,completed:true,reasons:[],rule:rule};
  var reasons=[];
  if(!friendshipEligible(id))reasons.push('not-befriendable');
  if(!f||!f.met)reasons.push('not-met');
  if(!f||f.meetings<rule.meetings)reasons.push('meetings');
  if(!f||!friendStageAtLeast(f,rule.stage)||f.points<rule.points)reasons.push('friendship-stage');
  Object.keys(rule.subjectBadges).forEach(function(subject){
    if(subjectBadgeCountFor(subject)<rule.subjectBadges[subject])reasons.push('badges:'+subject);
  });
  rule.priorEventIds.forEach(function(prior){if(!f||!completedHeartEventId(id,prior,f.events))reasons.push('prior-event:'+prior);});
  rule.flags.forEach(function(flag){if(!S.worldFlags||!S.worldFlags[flag])reasons.push('world-flag:'+flag);});
  return {allowed:reasons.length===0,completed:false,reasons:reasons,rule:rule};
}
function nextFriendEvent(id) {
  var f=S.friends&&S.friends[id],rules=friendEventRules(id);
  for(var i=0;i<rules.length;i++)if(!f||!completedHeartEventId(id,rules[i].eventId,f.events)){
    return {rule:rules[i],scene:sceneBeats(id,'event',rules[i].eventId),gate:friendEventGate(id,rules[i].eventId)};
  }
  return null;
}

/* Schema 2 -> 3. Numeric positions are resolved through today's source data,
   then removed from the persisted shape. Valid completed memories survive;
   only a pending scene that cannot be resumed is discarded. */
function migrateFriendSceneIds(save) {
  var previous = S;
  S = save;
  try {
    if (save.friends && typeof save.friends === 'object') {
      Object.keys(save.friends).forEach(function (personId) {
        var friend = save.friends[personId];
        if (!friend || typeof friend !== 'object') return;
        /* A removed/modded identity has no source table against which numeric
           positions can be resolved. Keep its opaque legacy payload intact. */
        if (!castMember(personId)) return;
        if (Array.isArray(friend.events)) {
          friend.events = friend.events.map(function (ref) {
            var scene = sceneBeats(personId, 'event', ref);
            return scene && scene.id;
          }).filter(function (id, index, list) { return !!id && list.indexOf(id) === index; });
        }
        if (Array.isArray(friend.history)) {
          friend.history.forEach(function (record) {
            if (!record || typeof record !== 'object') return;
            var scene = sceneBeats(personId, record.kind, record.sceneId || record.index);
            if (!scene) return;
            var refs = Array.isArray(record.choiceIds) ? record.choiceIds :
              (Array.isArray(record.picks) ? record.picks : [record.choiceId !== undefined ? record.choiceId : record.choice]);
            var choiceIds = [];
            scene.beats.forEach(function (beat, beatIndex) {
              var choice = choiceById(beat, refs[beatIndex]);
              if (choice) choiceIds.push(choice.id);
            });
            record.sceneId = scene.id;
            record.choiceIds = choiceIds;
            record.choiceId = choiceIds[0] || null;
            delete record.index; delete record.picks; delete record.choice;
          });
        }
      });
    }

    var pending = save.friendScene;
    if (pending && typeof pending === 'object') {
      if (!castMember(pending.id)) return save;
      var scene = sceneBeats(pending.id, pending.kind, pending.sceneId || pending.index);
      var beat = scene && (pending.beatId ? scene.beats.find(function (item) { return item.id === pending.beatId; }) :
        scene.beats[Number.isInteger(pending.beat) ? pending.beat : 0]);
      if (!scene || !beat) {
        save.friendScene = null;
      } else {
        var oldPicks = Array.isArray(pending.choiceIds) ? pending.choiceIds :
          (Array.isArray(pending.picks) ? pending.picks : []);
        var choiceIds = [];
        scene.beats.forEach(function (item, beatIndex) {
          if (beatIndex >= oldPicks.length) return;
          var choice = choiceById(item, oldPicks[beatIndex]);
          if (choice) choiceIds.push(choice.id);
        });
        pending.sceneId = scene.id;
        pending.beatId = beat.id;
        pending.choiceIds = choiceIds;
        delete pending.index; delete pending.beat; delete pending.picks;
      }
    } else if (pending) {
      save.friendScene = null;
    }
    return save;
  } finally {
    S = previous;
  }
}
function friendHearts(f){return Math.floor(f.points/100);}
function changeFriendship(id,amount){var f=friendship(id);if(!f)return 0;var before=f.points;f.points=Math.max(0,Math.min(1000,before+amount));return f.points-before;}

function friendWait(f,action){return Math.max(0,(Number(f['last'+action])||0)+FRIEND_STEP-(Number(S.activityClock)||0));}
function friendshipActionBase(action,context) {
  context=context||{};
  if(action==='meet')return context.source==='detail'?35:20;
  if(action==='reencounter')return 10;
  if(action==='talk')return context.source==='town'?12:15;
  if(action==='heal')return 6;
  if(action==='gift')return Number.isFinite(Number(context.amount))?Number(context.amount):25;
  if(action==='battle')return context.source==='town'?(context.won?22:14):(context.won?25:15);
  if(action==='scene-choice')return Number(context.amount)||0;
  if(action==='event-complete')return 40;
  if(action==='badge')return Math.max(0,Number(context.count)||0)*(context.companion?12:4);
  return 0;
}
function friendshipActionFamily(action,context) {
  if(action==='talk'||action==='heal'||action==='battle'||action==='gift')return action;
  if(action==='scene-choice'&&context&&context.kind==='outing')return 'outing';
  return null;
}
function friendshipCooldownAction(family) {
  return family==='talk'?'Talk':family==='heal'?'Heal':family==='battle'?'Battle':family==='outing'?'Outing':null;
}
function friendActivityGate(id,action,context) {
  context=context||{};var m=castMember(id),f=S.friends&&S.friends[id];
  if(!m)return {allowed:false,reason:'unknown-character',wait:0};
  if(!m.befriendable)return {allowed:false,reason:'not-befriendable',wait:0};
  if(!f||!f.met)return {allowed:false,reason:'not-met',wait:0};
  if(action==='outing'&&(!m.companion||!friendStageAtLeast(f,'friend')))return {allowed:false,reason:'activity-stage',wait:0};
  if(action==='battle'&&!(m.companion||(m.source.team&&m.source.team.length)))return {allowed:false,reason:'activity-unavailable',wait:0};
  var family=action==='scene-choice'&&context.kind==='outing'?'outing':action;
  var cooldown=friendshipCooldownAction(family),wait=cooldown?friendWait(f,cooldown):0;
  if(wait)return {allowed:false,reason:'cooldown',wait:wait};
  if(action==='battle'&&(context.eligibleAtStart===false||!(Number(context.answered)>0)))return {allowed:false,reason:context.eligibleAtStart===false?'cooldown':'no-answers',wait:0};
  if(['talk','heal','battle','outing','gift'].includes(family)&&friendPacingPreview(f,family).multiplier<=0)return {allowed:false,reason:'diminished',wait:Math.max(0,FRIEND_WINDOW-((Number(S.activityClock)||0)-f.rewardPacing.anchor))};
  return {allowed:true,reason:null,wait:0};
}
function friendPacingPreview(f,family) {
  var clock=Math.max(0,Number(S.activityClock)||0),p=f.rewardPacing||{anchor:clock,counts:{}};
  var reset=clock-p.anchor>=FRIEND_WINDOW,counts=reset?{}:p.counts||{},repeat=Math.max(0,Number(counts[family])||0);
  return {clock:clock,anchor:reset?clock:p.anchor,counts:counts,repeat:repeat,
          multiplier:FRIEND_REPEAT_MULTIPLIERS[Math.min(repeat,FRIEND_REPEAT_MULTIPLIERS.length-1)]};
}
function friendAwardMessage(result) {
  if(result.accepted&&result.change)return 'Friendship '+(result.change>0?'+':'')+result.change+'.';
  if(result.reason==='cooldown')return 'Friendship can grow from this again after '+result.wait+' more questions.';
  if(result.reason==='diminished')return 'That routine has gone stale for now. Mix things up or let more game activity pass.';
  if(result.reason==='not-befriendable')return 'This legacy friendship remains in your journal, but cannot gain new points.';
  if(result.reason==='no-answers')return 'Answer at least one question to earn friendship from a match.';
  return result.accepted?'Your friendship did not change.':'No friendship reward this time.';
}

/* The only gameplay-facing award path. Validation happens before any points,
   pacing counters, timestamps or activity totals are changed. */
function awardFriendship(id,action,context) {
  context=context||{};var m=castMember(id),f=S.friends&&S.friends[id],gate={allowed:true,reason:null,wait:0};
  var result={accepted:false,action:action,change:0,base:0,multiplier:1,reason:null,wait:0};
  if(!m){result.reason='unknown-character';result.message=friendAwardMessage(result);return result;}
  if(action==='meet')gate=friendMeetingGate(id);
  else {
    if(!f){result.reason='not-met';result.message=friendAwardMessage(result);return result;}
    if(!m.befriendable){result.reason='not-befriendable';result.message=friendAwardMessage(result);return result;}
    if(action==='reencounter'&&!context.firstMeeting)gate={allowed:false,reason:'already-counted',wait:0};
    else if(['talk','heal','battle'].includes(action)||(action==='scene-choice'&&context.kind==='outing'))gate=friendActivityGate(id,action,context);
    else if(!f.met)gate={allowed:false,reason:'not-met',wait:0};
  }
  if(!gate.allowed){result.reason=gate.reason;result.wait=gate.wait||0;result.message=friendAwardMessage(result);return result;}

  if(action==='meet')f=friendship(id);
  var stageBefore=friendStage(f).id;
  var base=friendshipActionBase(action,context),family=friendshipActionFamily(action,context),pacing=null,multiplier=1;
  if(family){
    pacing=friendPacingPreview(f,family);
    if(pacing.multiplier<=0){result.reason='diminished';result.message=friendAwardMessage(result);return result;}
    multiplier=pacing.multiplier*(FRIEND_STAGE_MULTIPLIERS[friendStage(f).id]||1);
  }
  var amount=base<0?base:Math.round(base*multiplier);
  if(action==='badge'&&!friendStageAtLeast(f,'friend'))amount=Math.min(amount,Math.max(0,FRIEND_THRESHOLD-1-f.points));
  if(action==='gift'&&amount>0)amount=Math.min(amount,Math.max(0,FRIEND_GIFT_CEILING-f.points));
  result.accepted=true;result.base=base;result.multiplier=multiplier;
  if(action==='meet'){f.met=true;f.meetings=Math.max(1,f.meetings+1);}
  result.change=changeFriendship(id,amount);
  if(family){
    f.rewardPacing.anchor=pacing.anchor;f.rewardPacing.counts=pacing.counts;
    f.rewardPacing.counts[family]=pacing.repeat+1;
    var cooldown=friendshipCooldownAction(family);if(cooldown)f['last'+cooldown]=Number(S.activityClock)||0;
  }
  if(action!=='meet'&&context.countMeeting)f.meetings++;
  if(action==='talk')f.talks++;
  result.stageBefore=stageBefore;result.stageAfter=friendStage(f).id;result.message=friendAwardMessage(result);
  return result;
}

function syncFriendStory(){
  ensureFriends();var badges=badgeCount(),subject=activeSubject(),changed=false;
  var all=(typeof castEntries==='function'?castEntries({befriendable:true}):[]).map(function(entry){return entry.id;});
  /* Badges drift you closer to people you have actually met. Companions travel
     with you, so the drift is strong. Townsfolk see you in passing, so theirs is
     weak on purpose: 15 badges is 60 points, never the 100 a friendship needs.
     Badges open the door; you still have to walk through it. */
  all.forEach(function(id){
    var f=S.friends[id],seen=(f&&f.storyBadgesBySubject&&f.storyBadgesBySubject[subject])||0;
    if(!(f&&f.met&&badges>seen)) return;
    var m=castMember(id);
    awardFriendship(id,'badge',{count:badges-seen,companion:!!(m&&m.companion)});
    f.storyBadgesBySubject[subject]=badges; changed=true;
  });
  if(changed)saveGame();
}
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
  if(S.friendScene&&castMember(S.friendScene.id)){
    var rsc=sceneBeats(S.friendScene.id,S.friendScene.kind,S.friendScene.sceneId);
    var resumeBeat=rsc?rsc.beats.findIndex(function(beat){return beat.id===S.friendScene.beatId;}):0;
    h+='<div class="panel friend-resume"><p>You left a conversation with '+esc(castMember(S.friendScene.id).name)+' unfinished'+
       (rsc&&rsc.beats.length>1?' , part '+(resumeBeat+1)+' of '+rsc.beats.length:'')+
       '.</p><button class="primary" onclick="renderFriendScene()">Pick up where you left off</button></div>';
  }
  var roster=friendRoster();
  if(!roster.length){
    var eligible=typeof castEntries==='function'?castEntries({befriendable:true}):[];
    var known=eligible.filter(function(entry){return S.friends[entry.id]&&S.friends[entry.id].met;}).length,cast=eligible.length;
    h+='<div class="panel friend-empty"><h3>Nobody yet</h3>'+
       '<p>You have not made a friend so far. Everyone starts as a stranger in the region , '+
       'battle them, talk to them, rest at their Centre, and when someone reaches a full heart '+
       'they move in here.</p><p class="small">'+known+' of '+cast+' people met.</p>'+
       '<button class="primary" onclick="openTown()">Go and meet someone</button></div>';
  }
  h+='<div class="friends-grid">';
  roster.forEach(function(id){
    var m=castMember(id); if(!m) return;
    var f=friendship(id),cap=castEventCount(id),nextInfo=nextFriendEvent(id);
    var ready=!!nextInfo&&nextInfo.gate.allowed;
    h+='<article class="friend-card panel'+(m.companion?'':' folk')+'"><div class="trainer-art" style="--trainer-color:'+m.colour+'">'+friendArt(m)+'</div>'+
       '<div class="friend-role">'+esc(m.role)+'</div><h3>'+esc(m.name)+'</h3><p>'+esc(m.bio)+'</p>'+heartStrip(f)+
       '<p class="small">'+esc(friendStage(f).label)+' · '+friendHearts(f)+'/10 hearts · '+f.events.length+'/'+cap+' memories</p>'+
       '<button class="'+(ready?'primary':'')+'" onclick="openFriend(\''+id+'\')">'+
       (!f.met?'Introduce yourself':ready?'A heart event is ready':'Spend time together')+'</button></article>';
  });
  h+='</div>'+
     (roster.length?'<p class="muted" style="margin-top:14px">Recurring companions, trainers, leaders, and neighbors can become friends. Once you share a heart they move in here with the rest.</p>':'')+
     '<details class="panel friend-rules"><summary>How friendship works</summary><p>One heart is 100 friendship points. The named relationship stage tells you what those points mean, from recognition through actual and trusted friendship to major trust. You can gain or lose points, up to ten hearts. Your Pokémon do not lose EXP when an outing goes badly.</p><p>Conversations, outings and practice battles each have their own reward break. Answer five more questions to make the same activity eligible again. Repeating one routine in the same 30-question activity window sharply reduces its reward, while mixing activities keeps each one meaningful. There is no real-world timer.</p><p>Gym badges add a small amount with people you have met, tracked separately in each person’s home subject. Badges can bring you close, but never cross the line into actual friendship by themselves. Heart events use stable requirements for relationship stage, subject badges, prior memories, meetings and story flags. Completed events stay in your journal even if friendship later drops.</p><p>These are friendships, not romance routes. Choices have different outcomes, but a bad afternoon does not end a friendship.</p></details>';
  $('#s-friends').innerHTML=h;
}
function openFriend(id){
  var m=castMember(id); if(!m) return;
  syncFriendStory(); var f=friendship(id);
  if(!f)return;
  var firstVisit=!f.met;
  if(!f.met){awardFriendship(id,'meet',{source:'detail'});syncFriendStory();saveGame();}
  showScreen('friends');
  var t=m.source,cap=castEventCount(id),n=friendEventRules(id).filter(function(rule){return completedHeartEventId(id,rule.eventId,f.events);}).length,nextInfo=nextFriendEvent(id);
  var detailDialogue=typeof selectCharacterDialogue==='function'?selectCharacterDialogue(id,{firstMeeting:firstVisit}):null;
  var g=nextInfo?castGate(id,nextInfo.rule.eventId):null,nextScene=nextInfo&&nextInfo.scene,ready=!!nextInfo&&nextInfo.gate.allowed;

  var h='<button class="ghost" onclick="renderFriends()">Back to your friends</button>'+
    '<div class="friend-detail panel"><div class="trainer-art" style="--trainer-color:'+m.colour+'">'+friendArt(m)+'</div>'+
    '<div><span class="friend-role">'+esc(m.role)+'</span><h2>'+esc(m.name)+'</h2><p>'+esc(m.bio)+'</p>'+
    heartStrip(f)+'<p><b>'+esc(friendStage(f).label)+'</b> · '+friendHearts(f)+'/10 hearts · '+f.points+'/1000 friendship</p>'+
    '<blockquote>'+esc(detailDialogue?detailDialogue.text:(m.companion ? (f.talks?t.talk[(f.talks-1)%t.talk.length]:t.intro) : t.say))+'</blockquote>'+
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

  var talkGate=friendActivityGate(id,'talk'),outingGate=friendActivityGate(id,'outing'),battleGate=friendActivityGate(id,'battle',{answered:1});
  h+='<div class="friend-actions panel"><div><h3>Catch up</h3><p class="small">'+
     (!m.befriendable?'This legacy friendship is preserved, but this world role no longer gains new friendship.':talkGate.reason==='cooldown'?'Chat anytime. Friendship again after '+talkGate.wait+' more questions.':talkGate.reason==='diminished'?'Chats have gone stale in this activity window. Mix in other plans or let more game activity pass.':'A conversation can deepen this '+esc(friendStage(f).label.toLowerCase())+' relationship.')+
     '</p><button onclick="talkFriend(\''+id+'\')">Have a chat</button></div>';
  if(m.companion){
    h+='<div><h3>Make plans</h3><p class="small">'+
       (outingGate.reason==='cooldown'?'Next outing after '+outingGate.wait+' more questions.':outingGate.reason==='diminished'?'Try a different kind of time together, or return after more game activity.':'Pick an outing. Your choices can bring you closer or leave things awkward.')+
       '</p><button '+(!outingGate.allowed?'disabled':'')+' onclick="chooseOuting(\''+id+'\')">Go somewhere together</button></div>';
  }
  if(m.companion || (t.team && t.team.length)){
    h+='<div><h3>Practice match</h3><label class="small" for="friend-chapter">Study chapter</label><select id="friend-chapter">';
    CHAPTERS.forEach(function(c){h+='<option value="'+c.n+'"'+(!m.companion&&c.n===t.ch?' selected':'')+'>'+c.n+'. '+esc(c.title)+'</option>';});
    h+='</select><p class="small">'+(battleGate.reason==='cooldown'?'Battle anytime. Friendship again after '+battleGate.wait+' more questions.':battleGate.reason==='diminished'?'Battle anytime, but this routine will not add friendship until the activity window resets.':'A completed practice match can deepen the relationship; answer at least one question.')+
       ' Both teams heal after a finished match.</p><button onclick="battleFriend(\''+id+'\')">Battle '+esc(m.name)+'</button></div>';
  }
  h+='</div>';

  if (typeof renderGiftPanel === 'function') h += renderGiftPanel(id);

  h+='<section class="panel friend-journal"><h3>Your story with '+esc(m.name)+'</h3>';
  if(nextInfo){
    var nextTitle = nextScene&&nextScene.title;
    var badgeNow=subjectBadgeCountFor(g.subject),locked=nextInfo.gate.reasons.join(', ');
    h+='<p>Next: <b>'+esc(nextTitle||'')+'</b>. Needs '+esc(friendStage(g.rule.points).label)+', '+g.hearts+' hearts and '+g.badges+' '+esc(g.subject.toUpperCase())+' gym badges. You have '+friendHearts(f)+' hearts and '+badgeNow+' badges.</p>'+
       '<button class="primary" '+(ready?'':'disabled')+' onclick="startFriendScene(\''+id+'\',\'event\',\''+(nextScene?nextScene.id:'')+'\')">'+(ready?'See heart event':'Keep getting to know each other')+'</button>';
  } else h+='<p>You have shared every heart event with '+esc(m.name)+'.</p>';
  h+='<ol class="memory-list">';
  friendEventRules(id).forEach(function(rule){
    var memoryScene=sceneBeats(id,'event',rule.eventId),title=memoryScene&&memoryScene.title;
    var gg = castGate(id,rule.eventId);
    var completedId = memoryScene&&completedHeartEventId(id,memoryScene.id,f.events);
    var done = !!completedId;
    h+='<li>'+(done?'<button onclick="readMemory(\''+id+'\',\''+completedId+'\')">'+esc(title)+'</button>'
                   :'<span>'+esc(title)+' <small>'+gg.hearts+' hearts \u00b7 '+gg.badges+' badges</small></span>')+'</li>';
  });
  h+='</ol></section>';
  $('#s-friends').innerHTML=h;
}
function talkFriend(id){var m=castMember(id);if(!m)return;var t=m.source,f=friendship(id);if(!f||!f.met)return;var result=awardFriendship(id,'talk',{source:'friend',countMeeting:true});var authored=typeof selectCharacterDialogue==='function'?selectCharacterDialogue(id):null;var line=authored?authored.text:(m.companion?t.talk[Math.max(0,f.talks-1)%t.talk.length]:(t.tip||t.say));if(result.accepted)saveGame();modal('<h2>'+esc(m.name)+'</h2><p class="scene-prose">'+esc(line)+'</p><p class="small">'+esc(result.message)+'</p><button class="primary" onclick="closeModal();openFriend(\''+id+'\')">See you around</button>');}
function chooseOuting(id){var m=castMember(id);if(!m||!m.companion)return;var t=m.source,gate=friendActivityGate(id,'outing');if(!gate.allowed)return;if(S.friendScene){renderFriendScene();return;}var h='<h2>Where to?</h2><p>'+t.name+' has some time this afternoon.</p><div class="outing-options">';t.outings.forEach(function(e,i){var scene=sceneBeats(id,'outing',i);h+='<button onclick="closeModal();startFriendScene(\''+id+'\',\'outing\',\''+scene.id+'\')">'+esc(e[0])+'<small>'+esc(e[1])+'</small></button>';});h+='</div><button class="ghost" onclick="closeModal()">Another time</button>';modal(h);}
function startFriendScene(id,kind,sceneRef){
  var m=castMember(id);if(!m)return;var t=m.source;var f=friendship(id);if(!f||!f.met)return;
  if(S.friendScene){renderFriendScene();return;}
  if(!m.befriendable)return;
  var scene=sceneBeats(id,kind,sceneRef);if(!scene)return;
  if(kind==='event'){var eventGate=friendEventGate(id,scene.id);if(!eventGate.allowed||eventGate.completed)return;}
  else if(kind==='outing'){if(!friendActivityGate(id,'outing').allowed)return;}
  else return;
  S.friendScene={id:id,kind:kind,sceneId:scene.id,beatId:scene.beats[0].id,choiceIds:[],gained:0};saveGame();renderFriendScene();
}
function renderFriendScene(){
  ensureFriends();
  var pending=S.friendScene; if(!pending){renderFriends();return;}
  var m=castMember(pending.id); if(!m){renderFriends();return;}
  var t=m.source, scene=sceneBeats(pending.id,pending.kind,pending.sceneId);
  if(!scene){S.friendScene=null;saveGame();renderFriends();return;}
  var beatIndex=scene.beats.findIndex(function(item){return item.id===pending.beatId;});
  if(beatIndex<0){S.friendScene=null;saveGame();renderFriends();return;}
  var beat=scene.beats[beatIndex], total=scene.beats.length;
  showScreen('friends');
  var h='<div class="scene panel"><span class="friend-role">'+esc(t.name)+' \u00b7 '+esc(scene.place)+'</span>'+
        '<h2>'+esc(scene.title)+'</h2>';
  if(total>1){
    h+='<div class="scene-progress" role="img" aria-label="Part '+(beatIndex+1)+' of '+total+'">';
    for(var i=0;i<total;i++) h+='<span class="'+(i<beatIndex?'done':i===beatIndex?'now':'')+'"></span>';
    h+='<em>Part '+(beatIndex+1)+' of '+total+'</em></div>';
  }
  h+='<div class="scene-portrait">'+friendArt(t)+'</div>';
  // what has already happened in this scene, so it reads as one continuous story
  for(var j=0;j<pending.choiceIds.length;j++){
    var pb=scene.beats[j]; if(!pb) continue;
    var pc=choiceById(pb,pending.choiceIds[j]); if(!pc) continue;
    h+='<div class="scene-past"><p>'+esc(pb.s)+'</p><blockquote>'+esc(pc[0])+'</blockquote><p>'+esc(pc[1])+'</p></div>';
  }
  h+='<p class="scene-prose">'+esc(beat.s)+'</p><div class="scene-choices">';
  beat.c.forEach(function(c){h+='<button onclick="resolveFriendChoice(\''+c.id+'\')">'+esc(c[0])+'</button>';});
  h+='</div><p class="small">Choose what you want to say or do. Friendship can go up or down.</p>'+
     '<button class="ghost" onclick="renderFriends()">Come back to this later</button></div>';
  $('#s-friends').innerHTML=h;
}
function resolveFriendChoice(choiceRef){
  var pending=S.friendScene; if(!pending) return;
  var m=castMember(pending.id); if(!m) return;
  var t=m.source, f=friendship(pending.id);
  var scene=sceneBeats(pending.id,pending.kind,pending.sceneId); if(!scene) return;
  if(pending.kind==='event'&&completedHeartEventId(pending.id,scene.id,f.events)){S.friendScene=null;saveGame();renderFriends();return;}
  var beatIndex=scene.beats.findIndex(function(item){return item.id===pending.beatId;});
  var beat=scene.beats[beatIndex]; if(!beat) return;
  var choice=choiceById(beat,choiceRef); if(!choice) return;

  var award=awardFriendship(t.id,'scene-choice',{kind:pending.kind,amount:choice[2],countMeeting:pending.choiceIds.length===0});
  if(typeof recordDialogueChoiceOutcome==='function') choice.outcomeFlags.forEach(function(flag){
    recordDialogueChoiceOutcome(choice.id,flag,true);
  });
  pending.choiceIds.push(choice.id);
  pending.gained+=award.change;
  pending.beatId=scene.beats[beatIndex+1]&&scene.beats[beatIndex+1].id;
  saveGame();

  if(pending.beatId){ renderFriendScene(); return; }
  finishFriendScene();
}

/* The last beat has been answered: bank the scene and show how it went. */
function finishFriendScene(){
  var pending=S.friendScene; if(!pending) return;
  var m=castMember(pending.id); if(!m){S.friendScene=null;saveGame();renderFriends();return;}
  var t=m.source, f=friendship(pending.id);
  var scene=sceneBeats(pending.id,pending.kind,pending.sceneId);
  S.friendScene=null;
  if(!scene){saveGame();renderFriends();return;}
  var completion={accepted:false,change:0};
  if(pending.kind==='event')completion=awardFriendship(t.id,'event-complete',{eventId:scene.id});
  if(pending.kind==='event'){
    if(!f.events.includes(scene.id)) f.events.push(scene.id);
    if(!S.worldFlags||typeof S.worldFlags!=='object')S.worldFlags={};
    S.worldFlags['event:'+pending.id+':'+scene.id]=true;
  }
  else f.outings++;
  // completing a heart event is worth more than any single choice inside it
  var total=pending.gained+completion.change;
  var record={kind:pending.kind,sceneId:scene.id,choiceId:pending.choiceIds[0]||null,choiceIds:pending.choiceIds.slice(),
              change:total,clock:S.activityClock};
  f.history.push(record);
  var outings=f.history.filter(function(x){return x.kind==='outing';});
  if(outings.length>15){var remove=outings.slice(0,outings.length-15);f.history=f.history.filter(function(x){return !remove.includes(x);});}
  saveGame();
  showFriendOutcome(t,scene,record,false);
}
function showFriendOutcome(t,scene,record,replay){
  showScreen('friends');
  var picks=Array.isArray(record.choiceIds)?record.choiceIds:[record.choiceId];
  var h='<div class="scene panel"><span class="friend-role">'+(replay?'From your journal':'An afternoon with '+esc(t.name))+'</span>'+
        '<h2>'+esc(scene.title)+'</h2><div class="scene-portrait">'+friendArt(t)+'</div>';
  for(var i=0;i<scene.beats.length;i++){
    var b=scene.beats[i], c=choiceById(b,picks[i]);
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
function readMemory(id,sceneId){
  var m=castMember(id); if(!m) return;
  var t=m.source,f=friendship(id);
  var record=f.history.find(function(x){return x.kind==='event'&&x.sceneId===sceneId;});
  var scene=sceneBeats(id,'event',sceneId);
  if(record&&scene) showFriendOutcome(t,scene,record,true);
}
function battleFriend(id){
  var m=castMember(id); if(!m) return;
  var t=m.source,f=friendship(id);if(!f.met)return;if(!partyAlive()){toast('Visit the Center first. Your party needs a rest.');return;}
  var sel=$('#friend-chapter'),chapter=sel?Number(sel.value):1;if(!chapterByNumber(chapter))chapter=CHAPTERS[0].n;
  var eligible=friendActivityGate(id,'battle',{answered:1}).allowed;
  var foes=(m.companion?friendTeam(t):npcTeam(t)).map(function(species,i){return makeMon(species,clampLvl(playerLevel()+i+(t.id==='rowan'?1:0)));});
  clearLog();startBattle({kind:'trainer',chapters:[chapter],foes:foes,title:'Practice with '+t.name,leader:t.name,friendId:id,friendEligible:eligible});
}
function finishFriendBattle(won){
  if(!B||B.kind!=='trainer'||B.friendRewarded)return;B.friendRewarded=true;B.over=true;
  var m=castMember(B.friendId); if(!m) return;
  var t=m.source,f=friendship(m.id),answered=B.correctThisBattle+B.wrongThisBattle;
  f.battles++;if(won){f.wins++;S.totals.wins++;}
  var result=awardFriendship(t.id,'battle',{source:'friend',won:won,answered:answered,eligibleAtStart:B.friendEligible,countMeeting:true}),change=result.change;
  healParty();saveGame();
  modal('<h2>'+esc(won?'You won!':'Good practice.')+'</h2><p class="scene-prose">'+esc((won?t.win:t.lose)||'Good match.')+'</p><p>'+B.correctThisBattle+'/'+answered+' questions correct.</p><p class="small">Both teams are healed. '+esc(result.message)+'</p><button class="primary" onclick="closeModal();openFriend(\''+t.id+'\')">Back to '+t.name+'</button>');
}

/* Capture authored order once; all runtime progression from here uses IDs. */
FRIEND_EVENT_RULES=buildFriendEventRules();
