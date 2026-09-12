/* Stable social identity, data integrity, schema-3 migration, and replay. */
const { chromium } = require('./playwright.cjs');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:8780/');

  const r = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); S.settings.sound = false; S.party = [makeMon(6, 50)];
    const people = TRAINERS.concat(typeof everyPerson === 'function' ? everyPerson() : TOWNSFOLK);
    const cast = Array.from(new Map(people.map(person => [person.id, person])).values());
    const out = { cast: cast.length, scenes: 0, beats: 0, choices: 0, bad: [], placeholders: [],
                  sceneIds: [], beatIds: [], choiceIds: [] };

    cast.forEach(person => {
      const member = castMember(person.id);
      if (!member) { out.bad.push(person.id + ': missing cast member'); return; }
      const kinds = member.companion ? ['event', 'outing'] : ['event'];
      kinds.forEach(kind => {
        for (let i = 0; i < 12; i++) {
          let scene;
          try { scene = sceneBeats(member.id, kind, i); }
          catch (e) { out.bad.push(member.id + '/' + kind + '/' + i + ': ' + e.message); continue; }
          if (!scene) break;
          out.scenes++; out.sceneIds.push(scene.id);
          if (!scene.id || !scene.title || !String(scene.title).trim()) out.bad.push(member.id + '/' + kind + '/' + i + ': identity/title');
          if (!Array.isArray(scene.beats) || !scene.beats.length) { out.bad.push(scene.id + ': no beats'); continue; }
          scene.beats.forEach((beat, beatIndex) => {
            out.beats++; out.beatIds.push(beat.id);
            if (!beat.id || !beat.s || !String(beat.s).trim()) out.bad.push(scene.id + '/beat' + beatIndex + ': identity/line');
            if (!Array.isArray(beat.c) || !beat.c.length) out.bad.push(beat.id + ': no choices');
            else beat.c.forEach((choice, choiceIndex) => {
              out.choices++; out.choiceIds.push(choice.id);
              if (!choice.id || !Array.isArray(choice) || choice.length < 3 ||
                  !String(choice[0]).trim() || !String(choice[1]).trim()) out.bad.push(beat.id + '/choice' + choiceIndex + ': malformed');
              if (/\{name\}|\{[a-z]+\}/.test(String(choice[0]) + String(choice[1]))) out.placeholders.push(choice.id);
            });
            if (/\{name\}|\{[a-z]+\}/.test(String(beat.s))) out.placeholders.push(beat.id);
          });
        }
      });
    });
    out.uniqueScenes = new Set(out.sceneIds).size;
    out.uniqueBeats = new Set(out.beatIds).size;
    out.uniqueChoices = new Set(out.choiceIds).size;
    return out;
  });

  const migration = await page.evaluate(() => {
    const old = freshSave(); old.schemaVersion = 2;
    old.friends = { rowan: { points: 500, met: true, events: [0, 1], history: [
      { kind: 'event', index: 0, choice: 0, picks: [0, 1, 0], change: 70, clock: 3 }
    ], talks: 0, outings: 0, battles: 0, wins: 0, lastTalk: -5, lastOuting: -5, lastBattle: -5,
      storyBadgesBySubject: {} } };
    old.friendScene = { id: 'rowan', kind: 'event', index: 2, beat: 1, picks: [0], gained: 25 };
    const migrated = normalizeSave(old);
    const friend = migrated.friends.rowan;
    const record = friend.history[0];
    const pending = migrated.friendScene;
    const expected0 = sceneBeats('rowan', 'event', 0);
    const expected1 = sceneBeats('rowan', 'event', 1);
    const expected2 = sceneBeats('rowan', 'event', 2);
    const pendingStable = pending.sceneId === expected2.id && pending.beatId === expected2.beats[1].id &&
      pending.choiceIds[0] === expected2.beats[0].c[0].id && !('index' in pending) && !('beat' in pending) && !('picks' in pending);

    activateSave(migrated); ensureFriends();
    const trainer = trainerById('rowan');
    trainer.events.reverse();
    const reordered = sceneBeats('rowan', 'event', expected0.id);
    readMemory('rowan', expected0.id);
    const replayTitle = document.querySelector('#s-friends h2').textContent;
    const pendingScene = sceneBeats('rowan', 'event', pending.sceneId);
    const currentBeat = pendingScene.beats.find(beat => beat.id === pending.beatId);
    resolveFriendChoice(currentBeat.c[0].id);
    const advancedById = S.friendScene && S.friendScene.beatId === pendingScene.beats[2].id;
    trainer.events.reverse();

    const invalid = copySaveValue(old);
    invalid.friendScene = { id: 'rowan', kind: 'event', index: 999, beat: 0, picks: [], gained: 0 };
    const repaired = normalizeSave(invalid);
    return {
      schema: migrated.schemaVersion,
      completed: friend.events,
      completedExpected: [expected0.id, expected1.id],
      recordStable: record.sceneId === expected0.id && record.choiceIds.length === 3 &&
        typeof record.choiceIds[0] === 'string' && !('index' in record) && !('picks' in record) && !('choice' in record),
      pendingStable,
      reorderStable: reordered && reordered.title === expected0.title && reordered.beats.length === expected0.beats.length,
      replayStable: replayTitle === expected0.title,
      advancedById,
      invalidDropped: repaired.friendScene === null,
      validMemoryKept: repaired.friends.rowan.events[0] === expected0.id
    };
  });

  const progression = await page.evaluate(() => {
    S = freshSave(); bindProgress('c'); ensureFriends();
    for (let i=1;i<=15;i++) S.badges[i]=true;
    const f=friendship('rowan'); f.met=true; f.meetings=1; f.points=1000;
    const trainer=trainerById('rowan'),rules=friendEventRules('rowan'),firstId=rules[0].eventId;
    const priorLocked=friendEventGate('rowan',rules[1].eventId).reasons.some(x=>x.indexOf('prior-event:')===0);
    const before=nextFriendEvent('rowan');
    trainer.events.reverse();
    const after=nextFriendEvent('rowan');
    startFriendScene('rowan','event',firstId);
    const started=S.friendScene&&S.friendScene.sceneId===firstId;
    let scene=sceneBeats('rowan','event',firstId),beat=scene.beats.find(x=>x.id===S.friendScene.beatId);
    resolveFriendChoice(beat.c[0].id);
    const saved=normalizeSave(copySaveValue(S));
    const pendingBefore=saved.friendScene&&{sceneId:saved.friendScene.sceneId,beatId:saved.friendScene.beatId,choiceIds:saved.friendScene.choiceIds.slice()};
    activateSave(saved);ensureFriends();
    const resumed=S.friendScene&&S.friendScene.sceneId===pendingBefore.sceneId&&S.friendScene.beatId===pendingBefore.beatId&&
      JSON.stringify(S.friendScene.choiceIds)===JSON.stringify(pendingBefore.choiceIds);
    while(S.friendScene){
      scene=sceneBeats('rowan','event',S.friendScene.sceneId);
      beat=scene.beats.find(x=>x.id===S.friendScene.beatId);
      resolveFriendChoice(beat.c[0].id);
    }
    const completed=S.friends.rowan.events.includes(firstId);
    trainer.events.reverse();
    return {firstId,before:before&&before.rule.eventId,after:after&&after.rule.eventId,
      priorLocked,started,resumed,completed};
  });

  console.log('cast members  : ' + r.cast);
  console.log('scenes        : ' + r.scenes);
  console.log('beats         : ' + r.beats);
  console.log('choices       : ' + r.choices);
  console.log('malformed     : ' + (r.bad.length ? r.bad.length : 'none'));
  r.bad.slice(0, 8).forEach(x => console.log('   ' + x));
  console.log('unreplaced {} : ' + (r.placeholders.length ? r.placeholders.slice(0, 5).join(', ') : 'none'));
  console.log('page errors   : ' + (errors.length ? errors.slice(0, 3).join(' | ') : 'none'));

  const exact = r.cast === 130 && r.scenes === 412 && r.beats === 1080;
  const unique = r.uniqueScenes === r.scenes && r.uniqueBeats === r.beats && r.uniqueChoices === r.choices;
  const migrated = migration.schema === 3 && JSON.stringify(migration.completed) === JSON.stringify(migration.completedExpected) &&
    migration.recordStable && migration.pendingStable && migration.invalidDropped && migration.validMemoryKept;
  const replay = migration.reorderStable && migration.replayStable && migration.advancedById;
  const stableProgression = progression.before === progression.firstId && progression.after === progression.firstId &&
    progression.priorLocked && progression.started && progression.resumed && progression.completed;

  if (r.bad.length || r.placeholders.length || errors.length || !exact || !unique || !migrated || !replay || !stableProgression) {
      if (!exact) console.log('FAIL expected exactly 130 cast, 412 scenes, and 1080 beats');
    if (!unique) console.log('FAIL social IDs are not globally unique');
    if (!migrated) console.log('FAIL schema-3 migration: ' + JSON.stringify(migration));
    if (!replay) console.log('FAIL stable replay/reorder: ' + JSON.stringify(migration));
    if (!stableProgression) console.log('FAIL stable event prerequisites/reload: ' + JSON.stringify(progression));
    process.exitCode = 1;
  } else {
      console.log('PASS: 130 identities, 412 stable scenes, 1080 stable beats, prerequisites, reload and replay');
  }
  await ctx.close(); await browser.close();
})().catch(e => { console.error(e); process.exitCode = 1; });
