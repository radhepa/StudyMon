/* The ferry.

   Two regions, one trainer, and something has to carry you between them. The
   topbar crossing opens the destination's gym and battle map, and it is open
   from the first day. The town berths remain available in the retained content.

   That last part is deliberate and should stay that way. StudyMon is a study tool
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
    h += '<button class="ferry-dest" onclick="ferrySail(\'' + d.id + '\')">' +
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
  if (!S || !S.party || !S.party.length) { toast('Choose your first partner before you set sail.'); return; }
  var first = badgesIn(id) === 0 && !(S.visited && S.visited[id]);

  if (!switchSubject(id)) { toast('You are already there.'); return; }

  if (!S.visited) S.visited = {};
  S.visited[id] = true;
  if (typeof collectFirstCrossing === 'function') collectFirstCrossing();
  TOWN_LOC = FERRY_PORT[id] || LOCATIONS[0].id;
  saveGame();

  closeModal();
  showScreen('map');
  renderMap();
  toast(first ? 'Welcome to ' + def.region + '.'
              : 'Back in ' + def.region + '.');
}

/* The crossing. Clicking the ferry plays the voyage first and travels when it
   lands, so the new region appears as the boat reaches the far shore. sailTo
   itself stays instant: the save, imports and the checks call it directly. */
var FERRY_SAILING = false;
var FERRY_VOYAGE_MS = 2600;   // the boat reaches the island at this point

function ferrySail(id) {
  if (FERRY_SAILING) return;
  var def = SUBJECTS[id];
  // anything sailTo would refuse is refused straight away, with its own message
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!def || !S || !S.party || !S.party.length || id === activeSubject() || calm) { sailTo(id); return; }
  closeModal();
  FERRY_SAILING = true;
  ferryVoyage(def, function () {
    FERRY_SAILING = false;
    sailTo(id);
  });
}

/* A little pixel-art scene in the game's own palette: a GBA-width canvas
   (240 x 112) drawn at 2x with crisp pixels, a ferry built from rectangles,
   dithered sky and sea, the destination island on the horizon and a Wingull
   keeping the boat company. */
function ferryVoyage(def, arrive) {
  var old = document.getElementById('ferry-voyage');
  if (old) old.remove();
  var el = document.createElement('div');
  el.id = 'ferry-voyage';
  el.setAttribute('role', 'status');
  el.innerHTML = '<div class="fv-card"><canvas width="240" height="112" aria-hidden="true"></canvas>' +
    '<div class="fv-text">Sailing to <b>' + esc(def.region) + '</b>…<span class="fv-more" aria-hidden="true"></span></div></div>';
  document.body.appendChild(el);

  var cv = el.querySelector('canvas'), g = cv.getContext('2d');
  g.imageSmoothingEnabled = false;
  var gull = new Image();
  gull.src = spriteUrl(278);           // Wingull
  var W = 240, H = 112, SEA = 62, start = performance.now(), landed = false;

  function px(x, y, w, h, c) { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), w, h); }
  function disc(cx, cy, r, c) {
    for (var y = -r; y <= r; y++) for (var x = -r; x <= r; x++) if (x * x + y * y <= r * r + r) px(cx + x, cy + y, 1, 1, c);
  }
  // two colours meeting on a checkerboard row, the old-school gradient
  function band(y0, y1, c) { px(0, y0, W, y1 - y0, c); }
  function dither(y, c) { for (var x = (y % 2); x < W; x += 2) px(x, y, 1, 1, c); }

  var waves = [];
  for (var i = 0; i < 26; i++) {
    var depth = Math.random();
    waves.push({ x: Math.random() * W, y: SEA + 4 + Math.floor(depth * (H - SEA - 8)),
                 len: 2 + Math.floor(depth * 5), v: 6 + depth * 18 });
  }
  var clouds = [{ x: 26, y: 14, w: 26 }, { x: 120, y: 24, w: 18 }, { x: 196, y: 10, w: 14 }];

  function cloud(x, y, w) {
    px(x + 3, y, w - 6, 2, '#FFFFFF');
    px(x, y + 2, w, 4, '#FFFFFF');
    px(x + 1, y + 6, w - 2, 1, '#D8ECF8');
  }

  function island(x) {
    // destination on the horizon: beach, two hills, a lighthouse
    px(x, SEA - 2, 52, 2, '#F0D890');
    for (var i = 0; i < 18; i++) px(x + 4 + i, SEA - 2 - Math.round(Math.sin(i / 17 * Math.PI) * 9), 1, Math.round(Math.sin(i / 17 * Math.PI) * 9), '#58A860');
    for (var j = 0; j < 22; j++) px(x + 18 + j, SEA - 2 - Math.round(Math.sin(j / 21 * Math.PI) * 13), 1, Math.round(Math.sin(j / 21 * Math.PI) * 13), j < 8 ? '#3C7848' : '#58A860');
    px(x + 44, SEA - 14, 3, 12, '#F8F8F8'); px(x + 44, SEA - 10, 3, 2, '#E04838'); px(x + 44, SEA - 6, 3, 2, '#E04838');
    px(x + 43, SEA - 16, 5, 2, '#202838');
  }

  function boat(bx, by, t) {
    var K = '#202838';
    // smoke from the funnel, drifting back
    for (var p = 0; p < 3; p++) {
      var age = ((t / 520) + p / 3) % 1;
      var r = 1 + Math.round(age * 3);
      disc(bx + 22 - age * 16, by - 2 - age * 18, r + 1, K);
      disc(bx + 22 - age * 16, by - 2 - age * 18, r, age > .7 ? '#E8EEF4' : '#FFFFFF');
    }
    // mast and flag
    px(bx + 37, by - 4, 1, 16, K);
    var flap = Math.floor(t / 180) % 2;
    [6, 5, 4, 2].forEach(function (w, i) { px(bx + 38, by - 3 + i, w - (i === 0 ? flap : 0), 1, '#E04838'); });
    // funnel
    px(bx + 18, by + 1, 10, 11, K);
    px(bx + 19, by + 2, 8, 10, '#3870C8');
    px(bx + 19, by + 2, 2, 10, '#5890E8');
    px(bx + 19, by + 5, 8, 2, '#F8C838');
    // cabin
    px(bx + 7, by + 11, 30, 10, K);
    px(bx + 8, by + 12, 28, 8, '#F8F0D8');
    px(bx + 8, by + 18, 28, 2, '#D8CCB0');
    for (var w = 0; w < 5; w++) px(bx + 10 + w * 5, by + 14, 3, 2, '#78C8F8');
    px(bx + 31, by + 13, 4, 5, '#A87048');                    // door
    // hull: white, a red stripe, navy keel; the bow rakes forward
    for (var row = 0; row < 12; row++) {
      var left = bx + (row < 5 ? 0 : row - 4), right = bx + 56 - (row < 3 ? 0 : (row - 2) * 2);
      var y = by + 20 + row, c = row < 6 ? (row === 5 ? '#C8D0D8' : '#F8F8F8') : row < 8 ? '#E04838' : '#2C4888';
      if (row === 0 || row === 11) c = K;
      px(left, y, right - left, 1, c);
      px(left, y, 1, 1, K); px(right - 1, y, 1, 1, K);
    }
    for (var h = 0; h < 6; h++) px(bx + 6 + h * 7, by + 23, 2, 2, '#2C4888');   // portholes
    // bow spray and the wake behind
    var s = Math.floor(t / 90) % 3;
    px(bx + 50 + s, by + 30, 4, 1, '#FFFFFF'); px(bx + 53, by + 29 - (s % 2), 2, 1, '#FFFFFF');
    for (var k = 0; k < 9; k++) {
      var wx = bx - 4 - k * 6 - ((t / 40) % 6);
      px(wx, by + 31 + (k % 2), 4 - (k >> 2), 1, k < 4 ? '#FFFFFF' : '#C8ECF8');
    }
  }

  function frame(now) {
    if (!el.isConnected) return;
    var t = now - start, f = Math.min(1, t / FERRY_VOYAGE_MS);
    var ease = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;

    band(0, 24, '#70C0F0'); dither(22, '#88D0F8'); dither(23, '#88D0F8');
    band(24, 46, '#88D0F8'); dither(44, '#A8E0F8'); dither(45, '#A8E0F8');
    band(46, SEA, '#A8E0F8');
    disc(204, 18, 9, '#F8C048'); disc(204, 18, 7, '#F8E070');
    clouds.forEach(function (c) { cloud(((c.x - t / 90) % (W + 40) + W + 40) % (W + 40) - 30, c.y, c.w); });
    island(176);

    band(SEA, SEA + 3, '#B8E8F8');
    band(SEA + 3, 81, '#60B0E8'); dither(80, '#4898D8');
    band(81, 97, '#4898D8'); dither(96, '#3880C8');
    band(97, H, '#3880C8');
    waves.forEach(function (w) {
      var x = ((w.x - t / 1000 * w.v) % W + W) % W;
      px(x, w.y, w.len, 1, w.y < 80 ? '#D8F4FF' : '#A8DCF8');
    });

    var bx = -64 + ease * 226, by = SEA - 22 + Math.round(Math.sin(t / 160));
    boat(bx, by, t);

    if (gull.complete && gull.naturalWidth) {
      var gx = bx + 40 + Math.sin(t / 400) * 10, gy = 4 + Math.sin(t / 230) * 3;
      g.save(); g.translate(Math.round(gx) + 48, Math.round(gy)); g.scale(-1, 1);
      g.drawImage(gull, 0, 0, 48, 48); g.restore();
    }

    if (f >= 1) land();
    if (el.isConnected) requestAnimationFrame(frame);
  }
  function land() {
    if (landed) return;
    landed = true;
    el.classList.add('fv-out');
    arrive();
    setTimeout(function () { el.remove(); }, 420);
  }
  requestAnimationFrame(frame);
  // a hidden window pauses animation frames; the crossing still finishes
  setTimeout(land, FERRY_VOYAGE_MS + 900);
}

/* One compact topbar button sails directly to the other region. */
function regionChip() {
  var dests = ferryDestinations();
  if (!dests.length) return '';
  var d = dests[0], label = esc('Ferry to ' + d.region);
  return '<button type="button" class="chip region-chip" onclick="ferrySail(\'' + d.id + '\')" ' +
    'title="' + label + '" aria-label="' + label + '">' +
    '<span aria-hidden="true">⛴</span> Ferry</button>';
}
