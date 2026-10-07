/* Phase 7 Slice 6: the relationship web. Covers the registries it is drawn
   from, never names an unmet person, separates world truth from what the
   player has learned, reveals deeper lines only after they are earned, is
   read-only, and lays out on desktop and a phone for small and full webs.
   Optional: pass a directory to save screenshots, e.g.
   node tools/check-relationship-web.cjs output/web-shots */
const { chromium } = require('./playwright.cjs');
const path = require('path');
const fs = require('fs');

const shotDir = process.argv[2] || null;
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  [' + detail + ']' : ''));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8780/');
  if (shotDir) fs.mkdirSync(shotDir, { recursive: true });

  const r = await page.evaluate(() => {
    const out = {};
    const fresh = () => { S = freshSave(); activateSave(S); S.settings.sound = false; S.party = [makeMon(6, 30)]; ensureBag(); };
    const snap = () => JSON.stringify(S);
    const meet = (id, points) => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1, points: points || 0 }); };
    const modalHtml = () => document.querySelector('#modal .box').innerHTML;
    const edges = RELATIONSHIP_WEB_EDGES;
    const banned = /\b(study|studying|exam|exams|question|questions|quiz|chapter|lesson|homework|revise|revision|syntax|compile|compiler|pointer|pointers|code|coding|program|programming|calculus|integral|derivative|variable|function|array|loop)\b/i;

    out.errors = validateRelationshipWeb();
    out.count = edges.length;
    out.sources = [...new Set(edges.map(e => e.source))].sort().join(',');
    out.vocabulary = edges.filter(e => banned.test(e.public + ' ' + (e.deep || ''))).map(e => e.id);

    // Nothing known on a fresh save; the button still opens a gentle page.
    fresh();
    out.freshKnown = relationshipWebKnown();
    renderFriends(); openFriends();
    out.button = !!document.querySelector('.web-button');
    openRelationshipWeb();
    out.freshPage = /not worked out how anyone here is connected/.test(modalHtml());
    closeModal();

    // Meeting one side reveals nothing and never names the other.
    meet('oz');
    const oneSide = relationshipWebKnown();
    openRelationshipWeb();
    out.oneSide = { edges: oneSide.edges.length, leak: /Sal\b/.test(JSON.stringify(oneSide) + modalHtml()) };
    closeModal();

    // Meeting both shows the public line only.
    meet('sal');
    openRelationshipWeb();
    const both = modalHtml();
    out.both = { pub: /Fish the same pier/.test(both), deep: /share the end post/.test(both), list: document.querySelectorAll('.web-list li').length,
      dashed: !!document.querySelector('.web-line.web-public') };
    closeModal();

    // Read-only.
    const before = snap();
    for (let i = 0; i < 3; i++) { relationshipWebKnown(); relationshipWebTruth(); validateRelationshipWeb(); openRelationshipWeb(); closeModal(); }
    out.readOnly = snap() === before;

    // Watching the thread's last scene reveals the deeper line.
    ['pier-wager', 'pier-squall', 'pier-shared-post'].forEach(id => { S.world.seen['walkin:' + id] = 1; S.world.resolved['walkin:' + id] = 1; S.world.known['walkin:' + id] = 1; });
    openRelationshipWeb();
    out.deepAfterThread = /What you have learned: They share the end post/.test(modalHtml()) && !!document.querySelector('.web-line.web-deep');
    closeModal();

    // A group edge needs everyone in it.
    meet('null'); meet('leak');
    out.groupPartial = !relationshipWebKnown().edges.some(e => e.id === 'cavern-keepers') && !/Geode/.test(JSON.stringify(relationshipWebKnown()));
    meet('geo');
    out.groupFull = relationshipWebKnown().edges.some(e => e.id === 'cavern-keepers');

    // Byte and Rhea: the letter's enclosure reveals the deeper line.
    meet('c-gym-1'); meet('calc-gym-1');
    const before2 = relationshipWebKnown().edges.find(e => e.id === 'byte-rhea');
    S.world.rewarded['mail:rhea-chart'] = 1;
    const after2 = relationshipWebKnown().edges.find(e => e.id === 'byte-rhea');
    out.byteRhea = { before: before2 && before2.learned, after: after2 && after2.learned };

    // Truth versus knowledge.
    const truth = relationshipWebTruth(), known = relationshipWebKnown();
    out.truthVsKnown = { truth: truth.length, known: known.edges.length, subset: known.edges.every(e => truth.some(t => t.id === e.id)) };

    // Full network: everyone met and every deep line earned.
    fresh();
    const everyone = [...new Set(edges.flatMap(e => e.people))];
    everyone.forEach(id => meet(id, 1000));
    edges.forEach(e => (e.deepWhen || []).forEach(f => {
      const [fam, ...rest] = f.split(':'); const arg = rest.join(':');
      if (fam === 'heart-event') { const i = arg.indexOf(':'); S.friends[arg.slice(0, i)].events.push(arg.slice(i + 1)); }
      if (fam === 'thread-at' || fam === 'rewarded') {}
    }));
    const full = relationshipWebKnown();
    out.full = { people: full.people.length, everyone: everyone.length, edges: full.edges.length, deep: full.edges.filter(e => e.deep).length };
    return out;
  });

  check('web validates and covers bible, leader and thread edges', r.errors.length === 0, r.errors.join('; '));
  check('web draws from every source', r.sources === 'bible,leader,pair,thread' && r.count >= 10, r.count + ' edges: ' + r.sources);
  check('no course vocabulary in web labels', r.vocabulary.length === 0, r.vocabulary.join(','));
  check('fresh save knows nobody', r.freshKnown.people.length === 0 && r.freshKnown.edges.length === 0);
  check('Friends screen has the button; the empty page is gentle', r.button && r.freshPage);
  check('meeting one side reveals nothing and never names the other', r.oneSide.edges === 0 && !r.oneSide.leak, JSON.stringify(r.oneSide));
  check('meeting both shows only the public line', r.both.pub && !r.both.deep && r.both.list === 1 && r.both.dashed, JSON.stringify(r.both));
  check('the web is read-only', r.readOnly);
  check('finishing the thread reveals the deeper line', r.deepAfterThread);
  check('a group connection needs everyone in it, and never names the missing one', r.groupPartial && r.groupFull);
  check('a letter enclosure can reveal a deeper line', r.byteRhea.before === 'public' && r.byteRhea.after === 'deep', JSON.stringify(r.byteRhea));
  check('what the player knows is a subset of world truth', r.truthVsKnown.subset && r.truthVsKnown.known < r.truthVsKnown.truth, JSON.stringify(r.truthVsKnown));
  check('full network shows everyone and every connection', r.full.people === r.full.everyone && r.full.edges === r.count, JSON.stringify(r.full));

  // Layout: desktop and phone, partial and full networks.
  async function layout(width, height, mode, file) {
    await page.setViewportSize({ width, height });
    return page.evaluate(({ mode }) => {
      const meet = id => { S.friends[id] = Object.assign(freshFriend(), { met: true, meetings: 1, points: 1000 }); };
      S = freshSave(); activateSave(S); S.party = [makeMon(6, 30)];
      const ids = mode === 'full' ? [...new Set(RELATIONSHIP_WEB_EDGES.flatMap(e => e.people))] : ['oz', 'sal', 'barista', 'dax'];
      ids.forEach(meet);
      openFriends(); openRelationshipWeb();
      const box = document.querySelector('#modal .box'), svgs = [...document.querySelectorAll('.web-graph')];
      const b = box.getBoundingClientRect();
      const inside = svgs.every(svg => { const g = svg.getBoundingClientRect(); return g.left >= b.left - 1 && g.right <= b.right + 1; });
      const labels = svgs.every(svg => { const vb = svg.viewBox.baseVal;
        return [...svg.querySelectorAll('.web-name')].every(t => { const r = t.getBBox();
          return r.x >= vb.x - 1 && r.x + r.width <= vb.x + vb.width + 1 && r.y >= vb.y - 1 && r.y + r.height <= vb.y + vb.height + 1; }); });
      const names = [...document.querySelectorAll('.web-name')].map(t => t.getBoundingClientRect());
      const overlap = names.some((p, i) => names.some((q, j) => j > i && p.left < q.right && q.left < p.right && p.top < q.bottom && q.top < p.bottom));
      return { pageOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        svgInside: inside, labelsInside: labels, overlap, clusters: svgs.length,
        nodes: document.querySelectorAll('.web-node').length, items: document.querySelectorAll('.web-list li').length };
    }, { mode }).then(async res => {
      if (shotDir) await page.screenshot({ path: path.join(shotDir, file) });
      await page.evaluate(() => closeModal());
      return res;
    });
  }
  const shots = {
    desktopPartial: await layout(1280, 900, 'partial', 'web-desktop-partial.png'),
    desktopFull: await layout(1280, 900, 'full', 'web-desktop-full.png'),
    phonePartial: await layout(375, 812, 'partial', 'web-phone-partial.png'),
    phoneFull: await layout(375, 812, 'full', 'web-phone-full.png')
  };
  Object.keys(shots).forEach(k => {
    const s = shots[k];
    check('layout ' + k + ': no page overflow, graph and labels fit, list matches',
      !s.pageOverflow && s.svgInside && s.labelsInside && !s.overlap && s.nodes > 0 && s.items > 0, JSON.stringify(s));
  });
  check('no page errors', errors.length === 0, errors.join(' | '));

  await browser.close();
  const failed = results.filter(x => !x.ok).length;
  console.log('\n' + (results.length - failed) + '/' + results.length + ' relationship-web checks passed');
  process.exit(failed ? 1 : 0);
})().catch(error => { console.error(error); process.exit(1); });
