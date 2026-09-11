/* The ferry.

   Two regions, one trainer, and something has to carry you between them. The
   berth sits in the first location of each subject - the practice field at
   Bootstrap Town has a jetty, Origin Harbour is a harbour - and it is open from
   the first day.

   That last part is deliberate and should stay that way. C-MON is a study tool
   for real classes with real exam dates. Gating the calculus region behind C
   badges would mean that the week before a calculus midterm the game refuses to
   teach you calculus, which is the one thing it must never do. The content
   INSIDE each region is gated by that region's own badges; getting to the region
   is not. */

var FERRY_PORT = { c: 'town', calc: 'harbour' };

/* The berth only appears in the departure location of the region you are in. */
function ferryHere() {
  return FERRY_PORT[activeSubject()] === TOWN_LOC;
}

function ferryDestinations() {
  var here = activeSubject(), out = [];
  for (var id in SUBJECTS) if (id !== here) out.push(SUBJECTS[id]);
  return out;
}

/* Badges earned in a region you are not currently standing in. */
function badgesIn(id) {
  if (id === activeSubject()) return badgeCount();
  var p = S.progress && S.progress[id];
  return p && p.badges ? Object.keys(p.badges).length : 0;
}

function ferryCard() {
  var dests = ferryDestinations();
  if (!dests.length) return '';
  var d = dests[0];
  var note = dests.length === 1
    ? esc(d.region) + ' · ' + badgesIn(d.id) + ' of ' + d.CHAPTERS.length + ' badges'
    : dests.length + ' crossings';
  return '<article class="town-card ferry-card">' +
    '<div class="town-head"><span class="town-cls">THE CROSSING</span>' +
    '<span class="town-kind k-ferry">FERRY</span></div>' +
    '<h3>The Ferry Berth</h3>' +
    '<p>Your team, your money and your friends come with you. Badges and review ' +
    'history stay where you earned them.</p>' +
    '<p class="town-note">' + note + '</p>' +
    '<button class="primary" onclick="openFerry()">Sail somewhere else</button></article>';
}

function openFerry() {
  var dests = ferryDestinations();
  if (!dests.length) { toast('There is nowhere else to sail yet.'); return; }

  var h = '<h2>The Ferry Berth</h2>' +
    '<p class="muted">One trainer, two coastlines. Everything you have caught comes ' +
    'with you; every badge you have earned stays behind until you come back.</p>' +
    '<div class="ferry-list">';

  dests.forEach(function (d) {
    var got = badgesIn(d.id), total = d.CHAPTERS.length;
    var been = got > 0;
    h += '<button class="ferry-dest" onclick="sailTo(\'' + d.id + '\')">' +
      '<span class="ferry-region">' + esc(d.region) + '</span>' +
      '<span class="ferry-book">' + esc(d.book) + '</span>' +
      '<span class="ferry-meta">' + total + ' gyms · ' +
        (been ? got + ' badge' + (got === 1 ? '' : 's') + ' earned there'
              : 'you have not landed there yet') + '</span>' +
      '<span class="ferry-blurb">' + esc(d.blurb) + '</span>' +
      '</button>';
  });

  h += '</div><p class="small">You can sail back whenever you like. Nothing is lost ' +
    'either way.</p><button onclick="closeModal()">Stay here</button>';
  modal(h);
}

function sailTo(id) {
  var def = SUBJECTS[id];
  if (!def) { toast('No such crossing.'); return; }
  var first = badgesIn(id) === 0 && !(S.visited && S.visited[id]);

  if (!switchSubject(id)) { toast('You are already there.'); return; }

  if (!S.visited) S.visited = {};
  S.visited[id] = true;
  TOWN_LOC = FERRY_PORT[id] || LOCATIONS[0].id;
  saveGame();

  closeModal();
  openTown(TOWN_LOC);
  renderTopbar();
  toast(first ? 'You land at ' + LOCATIONS[0].name + '. ' + def.region + '.'
              : 'Back in ' + def.region + '.');
}

/* Topbar chip: says where you are, and is the second way to reach the ferry so
   you are never more than one click from the crossing. */
function regionChip() {
  var d = subjectDef();
  if (Object.keys(SUBJECTS).length < 2) return '';
  return '<button class="chip region-chip" onclick="openFerry()" ' +
    'title="Sail to another region">⚓ ' + esc(d.short || d.name) + '</button>';
}
