/* Cross-subject friendship clocks, badge rewards, and schema-2 migration. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:8780/');

  let r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); S.settings.sound = false; S.party = [makeMon(255, 10)]; ensureFriends();
    const f = friendship('rowan'); f.met = true; f.points = 100;
    talkFriend('rowan');
    const afterTalk = { last: f.lastTalk, wait: friendWait(f, 'Talk'), c: S.clock, activity: S.activityClock };
    recordAnswer(QBANK[1][0], true);
    const afterC = { wait: friendWait(f, 'Talk'), c: S.clock, activity: S.activityClock };
    switchSubject('calc');
    const afterSwitch = { wait: friendWait(f, 'Talk'), calc: S.clock, activity: S.activityClock };
    recordAnswer(QBANK[1][0], true);
    const afterCalc = { wait: friendWait(f, 'Talk'), calc: S.clock, activity: S.activityClock };
    switchSubject('c');
    return { afterTalk, afterC, afterSwitch, afterCalc, backC: S.clock, finalActivity: S.activityClock };
  });
  check('recordAnswer advances a global activity clock beside each subject clock',
    r.afterTalk.activity === 0 && r.afterC.c === 1 && r.afterC.activity === 1 &&
    r.afterSwitch.calc === 0 && r.afterSwitch.activity === 1 && r.afterCalc.calc === 1 &&
    r.afterCalc.activity === 2 && r.backC === 1 && r.finalActivity === 2, JSON.stringify(r));
  check('friendship cooldowns continue unchanged across subject switches',
    r.afterTalk.wait === 5 && r.afterC.wait === 4 && r.afterSwitch.wait === 4 && r.afterCalc.wait === 3);

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); S.settings.sound = false; S.party = [makeMon(255, 10)]; ensureFriends();
    S.activityClock = 11;
    const companion = friendship('rowan'); companion.met = true; companion.points = 100;
    startFriendScene('rowan', 'outing', 0);
    const outingScene = sceneBeats('rowan', 'outing', S.friendScene.sceneId);
    resolveFriendChoice(outingScene.beats[0].c[0].id);
    const outing = companion.lastOuting;

    const talker = TOWNSFOLK.find(p => p.kind === 'talk' && !(p.badges > 0));
    const townFriend = friendship(talker.id); townFriend.met = true; townFriend.lastTalk = -5;
    talkTo(talker.id);
    const townTalk = townFriend.lastTalk;

    companion.lastBattle = -5;
    B = { kind: 'trainer', friendRewarded: false, friendEligible: true, over: false,
          friendId: 'rowan', correctThisBattle: 1, wrongThisBattle: 0 };
    finishFriendBattle(true);
    const battle = companion.lastBattle;
    B = null;
    return { outing, townTalk, battle, activity: S.activityClock };
  });
  check('completed outings, town talks, and practice battles stamp the activity clock',
    r.outing === 11 && r.townTalk === 11 && r.battle === 11, JSON.stringify(r));

  r = await page.evaluate(() => {
    const old = freshSave();
    old.schemaVersion = 1;
    delete old.activityClock;
    old.subject = 'c';
    old.progress = {
      c: { badges: { 1: true, 2: true }, elite: {}, chapterStats: {}, srs: {}, clock: 10 },
      calc: { badges: { 1: true, 2: true, 3: true }, elite: {}, chapterStats: {}, srs: {}, clock: 30 }
    };
    old.badges = old.progress.c.badges; old.elite = {}; old.chapterStats = {}; old.srs = {}; old.clock = 10;
    old.friends = { rowan: { points: 77, met: true, events: [], history: [], talks: 1, outings: 1,
      battles: 1, wins: 0, lastTalk: 8, lastOuting: 10, lastBattle: 4, storyBadges: 2 } };
    const migrated = normalizeSave(old);
    const mf = migrated.friends.rowan;
    activateSave(migrated);
    const waits = { talk: friendWait(S.friends.rowan, 'Talk'), outing: friendWait(S.friends.rowan, 'Outing'),
                    battle: friendWait(S.friends.rowan, 'Battle') };
    const before = S.friends.rowan.points;
    syncFriendStory();
    const afterC = S.friends.rowan.points;
    switchSubject('calc'); syncFriendStory();
    const afterCalc = S.friends.rowan.points;
    return { schema: S.schemaVersion, activity: S.activityClock, waits,
      last: [mf.lastTalk, mf.lastOuting, mf.lastBattle], points: [before, afterC, afterCalc],
      badges: mf.storyBadgesBySubject, scalarGone: !Object.prototype.hasOwnProperty.call(mf, 'storyBadges') };
  });
  check('schema 2 rebases legacy cooldowns without changing their remaining waits',
    r.schema === 3 && r.activity === 40 && r.waits.talk === 3 && r.waits.outing === 5 && r.waits.battle === 0,
    JSON.stringify(r));
  check('schema 2 preserves points and seeds per-subject badge counters without replay',
    r.points[0] === 77 && r.points[1] === 77 && r.points[2] === 77 &&
    r.badges.c === 2 && r.badges.calc === 3 && r.scalarGone, JSON.stringify(r));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f = friendship('rowan'); f.met = true; f.points = 100;
    S.badges[1] = true;
    syncFriendStory(); const cOnce = f.points;
    syncFriendStory(); const cTwice = f.points;
    switchSubject('calc'); S.badges[1] = true; S.badges[2] = true;
    syncFriendStory(); const calcOnce = f.points;
    syncFriendStory(); const calcTwice = f.points;
    switchSubject('c'); syncFriendStory();
    return { cOnce, cTwice, calcOnce, calcTwice, final: f.points, counters: f.storyBadgesBySubject };
  });
  check('badge friendship awards are tracked independently by subject',
    r.cOnce === 112 && r.cTwice === 112 && r.calcOnce === 136 && r.calcTwice === 136 &&
    r.final === 136 && r.counters.c === 1 && r.counters.calc === 2, JSON.stringify(r));
  check('badge synchronization never grants the same subject badge twice', r.cOnce === r.cTwice && r.calcOnce === r.calcTwice);

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f = friendship('rowan');
    const boundaries = [-1, 0, 24, 25, 49, 50, 74, 75, 99, 100, 299, 300, 599, 600, 1000]
      .map(points => { f.met = true; f.points = Math.max(0, points); return friendStage(f).id; });
    f.met = false; f.points = 1000;
    const stranger = friendStage(f).id;
    const meetingBefore = friendMeetingGate('rowan');
    f.met = true; f.points = 100;
    const meetingAfter = friendMeetingGate('rowan');
    return { boundaries, stranger, meetingBefore, meetingAfter, roster: friendRosterGate('rowan'), friend: isFriend('rowan') };
  });
  check('named stages hold every exact point boundary without rescaling saves',
    JSON.stringify(r.boundaries) === JSON.stringify(['acquaintance','acquaintance','acquaintance','recognition','recognition','comfortable','comfortable','beginning','beginning','friend','friend','trusted','trusted','close','close']), JSON.stringify(r));
  check('meeting and roster gates distinguish strangers from actual friends',
    r.stranger === 'stranger' && r.meetingBefore.allowed && !r.meetingAfter.allowed &&
    r.meetingAfter.reason === 'already-met' && r.roster.allowed && r.friend);

  r = await page.evaluate(() => {
    const old=freshSave();old.schemaVersion=2;
    old.friends={rowan:{points:1000,met:true,events:[],history:[],talks:0,outings:0,battles:0,wins:0,
      lastTalk:-5,lastOuting:-5,lastBattle:-5,storyBadgesBySubject:{}}};
    const loaded=normalizeSave(old);activateSave(loaded);
    return {points:S.friends.rowan.points,stage:friendStage('rowan').id};
  });
  check('old high-point saves retain exact points and enter major trust', r.points === 1000 && r.stage === 'close', JSON.stringify(r));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends(); S.activityClock = 0;
    const f = friendship('rowan'); f.met = true; f.meetings = 1; f.points = 100;
    const first = awardFriendship('rowan', 'talk', { source: 'friend', countMeeting: true });
    const snap = { points:f.points, last:f.lastTalk, count:f.rewardPacing.counts.talk, meetings:f.meetings };
    const rejected = awardFriendship('rowan', 'talk', { source: 'friend', countMeeting: true });
    const afterRejected = { points:f.points, last:f.lastTalk, count:f.rewardPacing.counts.talk, meetings:f.meetings };
    S.activityClock = 5; const second = awardFriendship('rowan', 'talk', { source: 'friend' });
    S.activityClock = 10; const third = awardFriendship('rowan', 'talk', { source: 'friend' });
    const beforeStale = { points:f.points, last:f.lastTalk, count:f.rewardPacing.counts.talk };
    S.activityClock = 15; const stale = awardFriendship('rowan', 'talk', { source: 'friend' });
    const afterStale = { points:f.points, last:f.lastTalk, count:f.rewardPacing.counts.talk };
    return { first, rejected, snap, afterRejected, second, third, stale, beforeStale, afterStale };
  });
  check('award policy applies stage-aware values and sharp repeated-action returns',
    r.first.accepted && r.first.change === 13 && r.second.change === 6 && r.third.change === 3 &&
    !r.stale.accepted && r.stale.reason === 'diminished', JSON.stringify(r));
  check('rejected awards never partially mutate points, timestamps, counters, or meetings',
    JSON.stringify(r.snap) === JSON.stringify(r.afterRejected) && JSON.stringify(r.beforeStale) === JSON.stringify(r.afterStale));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const ineligible = castEntries({ befriendable:false })[0];
    S.friends[ineligible.id] = freshFriend(); S.friends[ineligible.id].met = true; S.friends[ineligible.id].points = 222;
    const before = JSON.stringify(S.friends[ineligible.id]);
    const result = awardFriendship(ineligible.id, 'talk', { source:'town', countMeeting:true });
    return { result, unchanged:before === JSON.stringify(S.friends[ineligible.id]) };
  });
  check('ineligible legacy friendships are rejected atomically',
    !r.result.accepted && r.result.reason === 'not-befriendable' && r.unchanged, JSON.stringify(r));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f = friendship('rowan'); f.met = true; f.meetings = 1; f.points = 100;
    const mixed = [];
    mixed.push(awardFriendship('rowan','talk',{source:'friend'}));
    mixed.push(awardFriendship('rowan','battle',{source:'friend',won:true,answered:1,eligibleAtStart:true}));
    mixed.push(awardFriendship('rowan','scene-choice',{kind:'outing',amount:45}));
    const mixedPoints = f.points;
    for (let clock=5; clock<=1000; clock+=5) {
      S.activityClock = clock;
      awardFriendship('rowan','talk',{source:'friend'});
    }
    return { mixed:mixed.map(x => ({accepted:x.accepted,change:x.change})), mixedPoints, farmed:f.points };
  });
  check('varied play earns from independent activity families in one window',
    r.mixed.every(x => x.accepted && x.change > 0) && r.mixedPoints > 150, JSON.stringify(r));
  check('one thousand questions of talk-only farming still cannot reach ten hearts', r.farmed < 1000, JSON.stringify(r));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f = friendship('rowan'); f.met = true; f.meetings = 1; f.points = 0;
    for (let i=1;i<=15;i++) S.badges[i] = true;
    syncFriendStory();
    switchSubject('calc'); for (let i=1;i<=15;i++) S.badges[i] = true;
    syncFriendStory();
    return { points:f.points, stage:friendStage(f).id, roster:isFriend('rowan'), counters:f.storyBadgesBySubject };
  });
  check('badge awards are per subject but cannot create friendship by themselves',
    r.points === 99 && r.stage === 'beginning' && !r.roster && r.counters.c === 15 && r.counters.calc === 15, JSON.stringify(r));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const rowan = friendship('rowan'); rowan.met = true; rowan.meetings = 1; rowan.points = 1000;
    const rowanRules = friendEventRules('rowan'); rowan.events = [rowanRules[0].eventId];
    switchSubject('calc'); for(let i=1;i<=15;i++)S.badges[i]=true;
    let rowanGate = friendEventGate('rowan', rowanRules[1].eventId);
    switchSubject('c'); S.badges[1]=true; switchSubject('calc');
    const rowanReady = friendEventGate('rowan', rowanRules[1].eventId);

    const calcId = castEntries({homeSubject:'calc',sourceKind:'townsfolk',befriendable:true})
      .map(x=>x.id).find(id=>friendEventRules(id).some(rule=>(rule.subjectBadges.calc||0)>0));
    const cf = friendship(calcId); cf.met=true; cf.meetings=10; cf.points=1000;
    const calcRule = friendEventRules(calcId).find(rule=>(rule.subjectBadges.calc||0)>0);
    cf.events = calcRule.priorEventIds.slice();
    S.progress.calc.badges={}; bindProgress('calc');
    const calcLocked = friendEventGate(calcId,calcRule.eventId);
    for(let i=1;i<=calcRule.subjectBadges.calc;i++)S.badges[i]=true;
    const calcReady = friendEventGate(calcId,calcRule.eventId);
    return { rowanLocked:rowanGate.reasons,rowanReady:rowanReady.allowed,calcId,
      calcLocked:calcLocked.reasons,calcReady:calcReady.allowed };
  });
  check('event badge gates read the character subject in both regions',
    r.rowanLocked.includes('badges:c') && r.rowanReady && r.calcLocked.includes('badges:calc') && r.calcReady, JSON.stringify(r));

  r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    const f=friendship('rowan');f.met=true;f.meetings=1;f.points=1000;
    const rule=friendEventRules('rowan')[0];
    rule.flags.push('test:rowan-ready');
    const flagLocked=friendEventGate('rowan',rule.eventId);
    S.worldFlags['test:rowan-ready']=true;
    const flagReady=friendEventGate('rowan',rule.eventId);
    f.events.push(rule.eventId);f.points=0;f.meetings=0;delete S.worldFlags['test:rowan-ready'];
    const completed=friendEventGate('rowan',rule.eventId);
    rule.flags.pop();
    return {flagLocked:flagLocked.reasons,flagReady:flagReady.allowed,completed};
  });
  check('world flags lock stable events and completed events remain permanent after points fall',
    r.flagLocked.includes('world-flag:test:rowan-ready') && r.flagReady && r.completed.allowed && r.completed.completed, JSON.stringify(r));

  check('no page errors', errors.length === 0, errors.join(' | '));
  await browser.close();
  const passed = results.filter(x => x.ok).length;
  console.log(passed + '/' + results.length + ' checks passed');
  if (passed !== results.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
