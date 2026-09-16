/* Bootstrap Town navigation.
   Pure helpers over the generated walk grids in js/data/human-world-nav.js.
   Coordinates in and out are stage percentages (feet position), like the rest
   of the living-world data. Routes are deterministic: the same start and goal
   always give the same path, so townsfolk walk the same way every day. */

var HUMAN_NAV_W = 160;
var HUMAN_NAV_H = 90;
var HUMAN_NAV_CACHE = {};

function humanNavPruneSmall(grid, minCells) {
  var W = HUMAN_NAV_W, H = HUMAN_NAV_H, seen = new Uint8Array(W * H);
  for (var start = 0; start < grid.length; start++) {
    if (!grid[start] || seen[start]) continue;
    var queue = [start], part = [];
    seen[start] = 1;
    for (var at = 0; at < queue.length; at++) {
      var key = queue[at], x = key % W, y = Math.floor(key / W);
      part.push(key);
      [[-1,0],[1,0],[0,-1],[0,1]].forEach(function (delta) {
        var nx=x+delta[0], ny=y+delta[1], next=ny*W+nx;
        if (nx>=0 && nx<W && ny>=0 && ny<H && grid[next] && !seen[next]) { seen[next]=1; queue.push(next); }
      });
    }
    if (part.length < minCells) part.forEach(function (key) { grid[key] = 0; });
  }
}

function humanNavGrids(sceneId) {
  if (HUMAN_NAV_CACHE[sceneId]) return HUMAN_NAV_CACHE[sceneId];
  var rows = (window.HUMAN_WORLD_NAV || {})[sceneId];
  if (!rows) return null;
  var W = HUMAN_NAV_W, H = HUMAN_NAV_H;
  var feet = new Uint8Array(W * H), clear = new Uint8Array(W * H);
  for (var j = 0; j < H; j++) for (var i = 0; i < W; i++) feet[j * W + i] = rows[j].charCodeAt(i) === 49 ? 1 : 0;
  // Townsfolk keep one cell of clearance either side so a shoulder never brushes a
  // fence post or shelf end; the player is allowed the full painted path.
  for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
    var k = y * W + x;
    clear[k] = feet[k] && x > 0 && x < W - 1 && feet[k - 1] && feet[k + 1] ? 1 : 0;
  }
  // Narrow decorative slivers are valid player ground but not credible places
  // for scheduled townsfolk to stand. Removing tiny disconnected pockets keeps
  // NPC routing honest instead of letting nearest-cell snapping hide them.
  humanNavPruneSmall(clear, 24);
  return (HUMAN_NAV_CACHE[sceneId] = { feet: feet, clear: clear });
}

function humanNavCell(x, y) {
  return {
    i: Math.max(0, Math.min(HUMAN_NAV_W - 1, Math.floor(x / 100 * HUMAN_NAV_W))),
    j: Math.max(0, Math.min(HUMAN_NAV_H - 1, Math.floor(y / 100 * HUMAN_NAV_H)))
  };
}

function humanNavCentre(i, j) {
  return { x: (i + .5) * 100 / HUMAN_NAV_W, y: (j + .5) * 100 / HUMAN_NAV_H };
}

function humanNavOpen(sceneId, x, y, strict) {
  var grids = humanNavGrids(sceneId);
  if (!grids) return null;
  if (x < 0 || x >= 100 || y < 0 || y >= 100) return false;
  var c = humanNavCell(x, y);
  return !!(strict ? grids.clear : grids.feet)[c.j * HUMAN_NAV_W + c.i];
}

/* Nearest open cell centre to a point, searching outward ring by ring. */
function humanNavNearest(sceneId, x, y, strict) {
  var grids = humanNavGrids(sceneId);
  if (!grids) return { x: x, y: y };
  var grid = strict ? grids.clear : grids.feet, c = humanNavCell(x, y);
  if (grid[c.j * HUMAN_NAV_W + c.i]) return humanNavCentre(c.i, c.j);
  for (var r = 1; r < HUMAN_NAV_W; r++) {
    var best = null, bestD = Infinity;
    for (var dj = -r; dj <= r; dj++) for (var di = -r; di <= r; di++) {
      if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
      var i = c.i + di, j = c.j + dj;
      if (i < 0 || j < 0 || i >= HUMAN_NAV_W || j >= HUMAN_NAV_H || !grid[j * HUMAN_NAV_W + i]) continue;
      var d = di * di + dj * dj;
      if (d < bestD) { bestD = d; best = humanNavCentre(i, j); }
    }
    if (best) return best;
  }
  return { x: x, y: y };
}

/* Straight segment stays on open cells (checks every cell the segment touches). */
function humanNavLineClear(grid, a, b, blocked) {
  var W = HUMAN_NAV_W;
  var x0 = a.x / 100 * W, y0 = a.y / 100 * HUMAN_NAV_H, x1 = b.x / 100 * W, y1 = b.y / 100 * HUMAN_NAV_H;
  var steps = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 3) + 1;
  for (var s = 0; s <= steps; s++) {
    var t = s / steps, px = x0 + (x1 - x0) * t, py = y0 + (y1 - y0) * t;
    var cells = [[px, py], [px - .35, py], [px + .35, py], [px, py - .35], [px, py + .35]];
    for (var n = 0; n < cells.length; n++) {
      var i = Math.floor(cells[n][0]), j = Math.floor(cells[n][1]);
      if (i < 0 || j < 0 || i >= W || j >= HUMAN_NAV_H) return false;
      var k = j * W + i;
      if (!grid[k] || (blocked && blocked[k])) return false;
    }
  }
  return true;
}

/* Cells a standing person occupies, so routes pass around them rather than through. */
var HUMAN_NAV_PERSON_RADIUS = 2.1;   // screen-space, in stage-width percent

function humanNavBlockers(people) {
  if (!people || !people.length) return null;
  var W = HUMAN_NAV_W, H = HUMAN_NAV_H, r = HUMAN_NAV_PERSON_RADIUS, blocked = new Uint8Array(W * H), any = false;
  people.forEach(function (p) {
    var c = humanNavCell(p.x, p.y);
    for (var dj = -5; dj <= 5; dj++) for (var di = -5; di <= 5; di++) {
      var ex = di * 100 / W, ey = dj * 100 / H * 9 / 16;
      if (ex * ex + ey * ey > r * r) continue;
      var i = c.i + di, j = c.j + dj;
      if (i >= 0 && j >= 0 && i < W && j < H) { blocked[j * W + i] = 1; any = true; }
    }
  });
  return any ? blocked : null;
}

/* A* over the grid in four directions only, then reduced to one waypoint per
   orthogonal turn. `links` joins two open points the grid cannot (the
   practice-field stile); a waypoint reached through a link carries hop: true.
   Returns null when the goal cannot be reached. */
function humanNavPath(sceneId, from, to, options) {
  options = options || {};
  var grids = humanNavGrids(sceneId);
  if (!grids) return [{ x: to.x, y: from.y }, { x: to.x, y: to.y }];
  var grid = options.strict === false ? grids.feet : grids.clear;
  var W = HUMAN_NAV_W, H = HUMAN_NAV_H;
  var start = humanNavNearest(sceneId, from.x, from.y, options.strict !== false);
  var goal = humanNavNearest(sceneId, to.x, to.y, options.strict !== false);
  var sc = humanNavCell(start.x, start.y), gc = humanNavCell(goal.x, goal.y);
  var sk = sc.j * W + sc.i, gk = gc.j * W + gc.i;
  // People are soft obstacles: routes swing round them when there is room, and only
  // squeeze past (or start from beside someone) when there is no other way.
  var blocked = humanNavBlockers(options.avoid);
  if (blocked) { blocked[sk] = 0; blocked[gk] = 0; }

  var jumps = {};
  (options.links || []).forEach(function (link) {
    var a = humanNavNearest(sceneId, link[0].x, link[0].y, options.strict !== false);
    var b = humanNavNearest(sceneId, link[1].x, link[1].y, options.strict !== false);
    var ac = humanNavCell(a.x, a.y), bc = humanNavCell(b.x, b.y);
    var ak = ac.j * W + ac.i, bk = bc.j * W + bc.i;
    (jumps[ak] = jumps[ak] || []).push(bk);
    (jumps[bk] = jumps[bk] || []).push(ak);
  });

  var g = new Float32Array(W * H).fill(Infinity), came = new Int32Array(W * H).fill(-1);
  var hopped = new Uint8Array(W * H), closed = new Uint8Array(W * H);
  var open = [sk];
  g[sk] = 0;
  function h(k) { return Math.abs(k % W - gc.i) + Math.abs(Math.floor(k / W) - gc.j); }
  function passable(k) { return !!grid[k]; }
  function toll(k) { return blocked && blocked[k] ? 10 : 0; }
  var found = false, guard = 0;
  while (open.length && guard++ < W * H * 2) {
    var bi = 0, bf = Infinity;
    for (var n = 0; n < open.length; n++) {
      var f = g[open[n]] + h(open[n]);
      if (f < bf || (f === bf && open[n] < open[bi])) { bf = f; bi = n; }
    }
    var k = open[bi];
    open[bi] = open[open.length - 1]; open.pop();
    if (closed[k]) continue;
    closed[k] = 1;
    if (k === gk) { found = true; break; }
    var ci = k % W, cj = Math.floor(k / W);
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(function (delta) {
      var di = delta[0], dj = delta[1];
      var ni = ci + di, nj = cj + dj;
      if (ni < 0 || nj < 0 || ni >= W || nj >= H) return;
      var nk = nj * W + ni;
      if (!passable(nk) || closed[nk]) return;
      var cost = g[k] + 1 + toll(nk);
      if (cost < g[nk]) { g[nk] = cost; came[nk] = k; hopped[nk] = 0; open.push(nk); }
    });
    (jumps[k] || []).forEach(function (jk) {
      if (closed[jk] || !grid[jk]) return;
      var cost = g[k] + 6;
      if (cost < g[jk]) { g[jk] = cost; came[jk] = k; hopped[jk] = 1; open.push(jk); }
    });
  }
  if (!found) return null;

  var cells = [];
  for (var at = gk; at !== -1; at = came[at]) cells.push(at);
  cells.reverse();
  // Split at stile hops, then keep only orthogonal corners. Every normal leg
  // has either a constant x or a constant y, so click-to-walk and NPC schedules
  // obey the same no-diagonal rule as the keyboard.
  var segments = [{ cells: [], hop: false }];
  cells.forEach(function (key) {
    if (hopped[key]) segments.push({ cells: [], hop: true });
    segments[segments.length - 1].cells.push(humanNavCentre(key % W, Math.floor(key / W)));
  });
  var out = [];
  segments.forEach(function (seg, s) {
    if (!seg.cells.length) return;
    var kept = [seg.cells[0]];
    var lastDx = 0, lastDy = 0;
    for (var q = 1; q < seg.cells.length; q++) {
      var dx = Math.sign(seg.cells[q].x - seg.cells[q - 1].x);
      var dy = Math.sign(seg.cells[q].y - seg.cells[q - 1].y);
      if (q > 1 && (dx !== lastDx || dy !== lastDy)) kept.push(seg.cells[q - 1]);
      lastDx = dx; lastDy = dy;
    }
    if (kept[kept.length - 1] !== seg.cells[seg.cells.length - 1]) kept.push(seg.cells[seg.cells.length - 1]);
    kept.forEach(function (p, idx) {
      if (s === 0 && idx === 0) {
        // A walker standing off the open grid steps onto it first, so the first leg is a checked one.
        var own = humanNavCell(from.x, from.y);
        if (own.i !== sc.i || own.j !== sc.j) out.push({ x: p.x, y: p.y, hop: false });
        return;
      }
      out.push({ x: p.x, y: p.y, hop: seg.hop && idx === 0 });
    });
  });
  if (!out.length) out.push({ x: goal.x, y: goal.y, hop: false });
  return out;
}

if (typeof module !== 'undefined') {
  module.exports = { humanNavGrids: humanNavGrids, humanNavOpen: humanNavOpen, humanNavNearest: humanNavNearest, humanNavPath: humanNavPath };
}
