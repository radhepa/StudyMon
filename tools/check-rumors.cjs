/* Phase 7 Slice 2: rumors. Reliable rumors are true and reachable, biased ones
   read as perspective, selection is deterministic and read-only, hearing is
   the only writer, and social text stays off the course material. */
const { chromium } = require('./playwright.cjs');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await (await browser.newContext()).newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');

  const r = await page.evaluate(() => {
    const out = {};
    const fresh = () => { S = freshSave(); activateSave(S); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag(); };
    const snap = () => JSON.stringify(S);
    const pickId = (who, opt) => { const p = pickRumor(who, opt); return p ? p.rumor.id : null; };
    const all = worldContentList('rumor');

    out.errors = validateRumors().concat(validateWorldState());
    out.count = all.length;
    out.kinds = [...new Set(all.map(x => x.reliability))].sort().join(',');
    const banned = /\b(study|studying|exam|exams|question|questions|quiz|chapter|lesson|homework|revise|revision|syntax|compile|compiler|pointer|pointers|code|coding|program|programming|calculus|integral|derivative|variable|function|array|loop)\b/i;
    out.vocabulary = all.filter(x => banned.test(x.text)).map(x => x.id);
    out.biasedFramed = all.filter(x => x.reliability === 'biased').every(x => RUMOR_PERSPECTIVE.test(x.text));
    out.selfGossip = all.filter(x => (x.speakers || []).indexOf(x.about) >= 0).map(x => x.id);

    // Validation refuses unsafe records and keeps them out of the registry.
    out.refused = {
      unframed: registerRumor({ id: 'test-unframed', reliability: 'biased', speakers: ['postie'], text: 'Sal is the worst angler on the whole river, full stop, end of story.' }).length > 0,
      speaker: registerRumor({ id: 'test-nobody', reliability: 'flavor', speakers: ['nobody-at-all'], text: 'Somebody somewhere said something about something else entirely.' }).length > 0,
      flavorFact: registerRumor({ id: 'test-flavorfact', reliability: 'flavor', speakers: ['postie'], fact: 'met:mira', text: 'Mira grows beans up the fence behind the Centre every single summer.' }).length > 0,
      self: registerRumor({ id: 'test-self', reliability: 'flavor', speakers: ['postie'], about: 'postie', text: 'Bell is apparently the fastest runner in the whole of Bootstrap Town.' }).length > 0,
      resolved: registerRumor({ id: 'test-resolve', reliability: 'flavor', speakers: ['postie'], resolvedBy: ['weather:rain'], text: 'The river is higher than anyone can remember it being this late in the year.' }).length > 0,
      badLevel: registerRumor({ id: 'test-level', reliability: 'gospel', speakers: ['postie'], text: 'The river is higher than anyone can remember it being this late in the year.' }).length > 0,
      absent: ['test-unframed', 'test-nobody', 'test-flavorfact', 'test-self', 'test-resolve', 'test-level'].every(id => !worldContent('rumor', id))
    };
    RUMOR_ERRORS = []; // the refusals above are expected

    // Fresh save: actionable hints come first, deterministically.
    fresh();
    out.bellFirst = pickId('postie', { location: 'town' });
    out.bellSame = pickId('postie', { location: 'town' });
    const reloadCopy = normalizeSave(JSON.parse(snap()));
    const keep = S; activateSave(reloadCopy);
    out.bellAfterReload = pickId('postie', { location: 'town' });
    activateSave(keep);

    // Selection and listing never write.
    const before = snap();
    CAST_REGISTRY.forEach(e => { rumorsFor(e.id); pickRumor(e.id); pickRumor(e.id, { location: 'cafe' }); });
    out.readOnly = snap() === before;

    // Hearing is the only writer; the next talk moves on.
    const heard1 = hearRumor('postie', { location: 'town' });
    out.heard1 = heard1 && heard1.rumor.id;
    out.seen1 = worldHas('seen', 'rumor', out.heard1);
    const heard2 = hearRumor('postie', { location: 'town' });
    out.heard2 = heard2 && heard2.rumor.id;

    // Reliable rumors are withheld while their fact is false.
    fresh();
    out.byteHidden = rumorsFor('barista').map(x => x.id).indexOf('byte-radiator') < 0;
    S.badges[1] = true;
    out.byteShown = rumorsFor('barista').map(x => x.id).indexOf('byte-radiator') >= 0;
    out.byteFactTrue = worldFact(worldContent('rumor', 'byte-radiator').fact);

    // Gated hints wait for their condition and retire when resolved.
    fresh();
    out.theoLocked = rumorsFor('mart', { location: 'town' }).some(x => x.id === 'theo-winches');
    S.badges[1] = true; S.badges[2] = true;
    out.theoOpen = rumorsFor('mart', { location: 'town' }).some(x => x.id === 'theo-winches');
    S.friends.theo = Object.assign(freshFriend(), { met: true, meetings: 1 });
    out.theoRetired = !rumorsFor('mart', { location: 'town' }).some(x => x.id === 'theo-winches');

    // Kern's hint retires once his grant receipt exists; a seen copy is stamped
    // resolved on the next explicit hear, never by listing.
    fresh();
    for (let i = 0; i < 4 && !worldHas('seen', 'rumor', 'kern-drawer'); i++) hearRumor('postie', { location: 'town' });
    const kernSeen = worldHas('seen', 'rumor', 'kern-drawer');
    claimTownGrant(townsfolkById('aide'));
    const listSnap = snap();
    out.kernGone = !rumorsFor('postie', { location: 'town' }).some(x => x.id === 'kern-drawer');
    out.kernListNoWrite = snap() === listSnap;
    out.kernResolvedBefore = worldHas('resolved', 'rumor', 'kern-drawer');
    hearRumor('postie', { location: 'town' });
    out.kern = { seen: kernSeen, resolvedAfter: worldHas('resolved', 'rumor', 'kern-drawer') };

    // Every actionable reliable rumor is reachable within a few talks with one
    // of its speakers, even with every other rumor competing.
    // Make a fact true through the branch that owns it (only the families
    // actionable rumors use today; an unhandled one makes the check fail).
    const satisfy = fact => {
      const [fam, ...rest] = fact.split(':'); const arg = rest.join(':');
      if (fam === 'badges-at-least') return true;                 // badges are already set below
      if (fam === 'met') { S.friends[arg] = Object.assign(freshFriend(), { met: true, meetings: 1 }); return true; }
      if (fam === 'leader-beaten') {
        const l = leaderById(arg);
        if (l.subject === 'c') { if (l.kind === 'gym') S.badges[l.ref] = true; else S.elite[l.ref] = true; return true; }
        S.progress[l.subject] = S.progress[l.subject] || {};
        const key = l.kind === 'gym' ? 'badges' : 'elite';
        S.progress[l.subject][key] = Object.assign(S.progress[l.subject][key] || {}, { [l.ref]: true });
        return true;
      }
      return false;
    };
    out.reach = all.filter(x => x.actionable).map(x => {
      fresh();
      for (let n = 1; n <= 14; n++) S.badges[n] = true;
      const w = x.when || {};
      const satisfied = (w.all || []).concat(w.any && w.any.length ? [w.any[0]] : []).every(satisfy);
      const speakers = (x.speakers || []).concat(CAST_REGISTRY.filter(e => (x.anyoneAt || []).indexOf(e.recurringLocations[0]) >= 0 && e.id !== x.about).map(e => e.id));
      const who = speakers[speakers.length - 1];
      let found = 0;
      for (let t = 1; t <= 6 && !found; t++) { const h = hearRumor(who); if (h && h.rumor.id === x.id) found = t; S.activityClock += 1; }
      return { id: x.id, who, found: satisfied ? found : 0 };
    });

    // With nothing new to say, a speaker only sometimes repeats themselves.
    fresh();
    for (let i = 0; i < 12; i++) hearRumor('postie', { location: 'town' });
    const pattern = [];
    for (let w = 0; w < 30; w++) { S.activityClock = w * RUMOR_WINDOW; const p = pickRumor('postie', { location: 'town' }); pattern.push(p ? (p.repeat ? 'R' : 'N') : '-'); }
    out.repeatPattern = pattern.join('');

    // The talk surfaces show the aside and persist the stamp.
    fresh();
    talkTo('barista');
    const modalHtml = document.querySelector('#modal') ? document.querySelector('#modal').innerHTML : '';
    out.directory = { aside: /rumor-aside/.test(modalHtml), id: (modalHtml.match(/data-rumor="([^"]+)"/) || [])[1] };
    closeModal();
    out.directorySaved = loadGame() && worldHas('seen', 'rumor', out.directory.id);

    fresh();
    S.friends.mo2 = Object.assign(freshFriend(), { met: true, meetings: 1, points: 50 });
    talkFriend('mo2');
    const fm = document.querySelector('#modal').innerHTML;
    out.friendTalk = (fm.match(/data-rumor="([^"]+)"/) || [])[1];
    closeModal();

    // Walkable town: Kern's ordinary chat hands over the EXP Share once.
    fresh();
    openHumanWorld();
    const hadShare = itemCount('expShare');
    humanChat('aide');
    const box1 = document.querySelector('#human-dialogue').innerHTML;
    const afterFirst = itemCount('expShare');
    humanChat('aide');
    const box2 = document.querySelector('#human-dialogue').innerHTML;
    out.kernChat = { before: hadShare, after: afterFirst, again: itemCount('expShare'), receipt: !!S.town.receipts['aide-exp-share'],
      firstNote: /Received 1 EXP Share/i.test(box1), secondNote: /Received/i.test(box2), aside: /rumor-aside/.test(box1) };
    humanCloseDialogue();
    showScreen('map');
    return out;
  });

  check('rumor registry validates', r.errors.length === 0, r.errors.join('; '));
  check('seed covers all three reliability classes', r.count >= 6 && r.kinds === 'biased,flavor,reliable', r.count + ' rumors: ' + r.kinds);
  check('no course vocabulary in rumor text', r.vocabulary.length === 0, r.vocabulary.join(','));
  check('biased rumors are framed as perspective', r.biasedFramed);
  check('nobody gossips about themselves', r.selfGossip.length === 0, r.selfGossip.join(','));
  check('unsafe records are refused and not registered', Object.values(r.refused).every(Boolean), JSON.stringify(r.refused));
  check('actionable hint comes first on a fresh save', r.bellFirst === 'kern-drawer' || r.bellFirst === 'tam-potions', r.bellFirst);
  check('selection is deterministic, including across a reload', r.bellFirst === r.bellSame && r.bellFirst === r.bellAfterReload);
  check('listing and picking never write the save', r.readOnly);
  check('hearing stamps seen and the next talk moves on', r.seen1 && r.heard2 && r.heard2 !== r.heard1, r.heard1 + ' -> ' + r.heard2);
  check('reliable rumor is withheld while its fact is false', r.byteHidden && r.byteShown && r.byteFactTrue);
  check('gated hint waits for its condition and retires when resolved', !r.theoLocked && r.theoOpen && r.theoRetired);
  check('a resolved hint disappears; listing does not stamp it', r.kernGone && r.kernListNoWrite && !r.kernResolvedBefore);
  check('resolution is stamped on the next explicit hear', r.kern.seen && r.kern.resolvedAfter, JSON.stringify(r.kern));
  check('every actionable reliable rumor is reachable within 6 talks', r.reach.length >= 3 && r.reach.every(x => x.found > 0), JSON.stringify(r.reach));
  const reps = (r.repeatPattern.match(/R/g) || []).length, fresh = (r.repeatPattern.match(/N/g) || []).length;
  check('with nothing new, repeats are occasional', fresh === 0 && reps > 0 && reps < 25, r.repeatPattern);
  check('directory talk shows a rumor and it survives a reload', r.directory.aside && !!r.directory.id && r.directorySaved, JSON.stringify(r.directory));
  check('friend chat shows a rumor', !!r.friendTalk, r.friendTalk);
  check('walkable-town chat with Kern grants the EXP Share exactly once', r.kernChat.before === 0 && r.kernChat.after === 1 &&
    r.kernChat.again === 1 && r.kernChat.receipt && r.kernChat.firstNote && !r.kernChat.secondNote, JSON.stringify(r.kernChat));
  check('walkable-town chat can carry a rumor', r.kernChat.aside);
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' rumor checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
