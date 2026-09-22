/* Build a fixed encounter table for every route.

   Wild encounters used to be drawn live from "anything of the right type under
   a BST cap", which meant a route had no identity and nothing stable to show on
   a Route info screen. This bakes a curated table instead: a dozen or so species
   per route, banded by rarity, weighted toward the unevolved early and the
   evolved late, and - as far as the type lists allow - not repeated elsewhere in
   the same region.

   Deliberately partial. Nowhere near all 1025 species appear, which leaves room
   for the subjects still to come. Re-run after adding a region:
       node tools/build-encounters.cjs
*/
const fs = require('fs');
global.window = {};
require('../js/data/pokedex.js');
require('../js/data/fakemon.js');
require('../js/data/world.js');
require('../js/data/calc/calc-world.js');
const { DEX, CHAPTERS, CALC_CHAPTERS, CALC_EXAM_CHAPTERS } = global.window;

const byId = {};
DEX.forEach(d => { byId[d.id] = d; });

// Which species evolve FROM something, and which evolve INTO something.
const evolvesInto = {}, hasPreEvo = {};
DEX.forEach(d => (d.evo || []).forEach(e => {
  evolvesInto[d.id] = true;
  hasPreEvo[e.to] = true;
}));

/* A deterministic shuffle so re-running produces the same tables. */
function seeded(seed) {
  let x = seed;
  return () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x / 0x7fffffff; };
}

const RARITY = [
  { key: 'common',   n: 5, weight: 10 },
  { key: 'uncommon', n: 4, weight: 4 },
  { key: 'rare',     n: 3, weight: 1 }
];
const PER_ROUTE = RARITY.reduce((a, r) => a + r.n, 0);

/* `position(c, i, chapters)` picks the 0..1 strength band a chapter sits at.
   Defaults to the chapter's own place in the list, which is right for a
   region's ordinary gyms; a revision route isn't in that list at all, so
   callers that add one pass an explicit position instead.

   `rarity` defaults to the module-wide RARITY bands, but a route standing in
   for several chapters' worth of questions can pass a bigger one - the ratio
   of common:uncommon:rare stays whatever the caller gives it, only the count
   in each band changes, so the pacing still feels like every other route. */
function buildRegion(chapters, label, seedBase, position, used, rarity) {
  used = used || {};
  rarity = rarity || RARITY;
  const perRoute = rarity.reduce((a, r) => a + r.n, 0);
  const out = {};
  position = position || ((c, i, list) => (list.length > 1 ? i / (list.length - 1) : 0));
  chapters.forEach((c, i) => {
    const p = position(c, i, chapters);
    const rnd = seeded(seedBase + c.n * 7919);

    // Route position sets the strength band and how evolved things are.
    const lo = 180 + p * 260;            // route 1 ~180, last route ~440
    const hi = 340 + p * 280;            // route 1 ~340, last route ~620
    const wantEvolved = p;               // 0 = all basics, 1 = mostly evolved

    let pool = DEX.filter(d =>
      !d.legendary && !d.custom &&
      d.types.some(t => c.teamTypes.indexOf(t) >= 0) &&
      d.bst >= lo && d.bst <= hi);

    // Widen if a type is thin at this band rather than shipping a short route.
    if (pool.length < perRoute * 2) {
      pool = DEX.filter(d => !d.legendary && !d.custom &&
        d.types.some(t => c.teamTypes.indexOf(t) >= 0) &&
        d.bst >= lo - 90 && d.bst <= hi + 90);
    }
    if (pool.length < perRoute) {
      pool = DEX.filter(d => !d.legendary && !d.custom && d.bst >= lo - 60 && d.bst <= hi + 60);
    }
    // Still thin at 4x a normal route's size and up - a single type/BST band
    // cannot supply that many, so widen once more before dropping the type
    // filter entirely (the very last resort, unchanged from before).
    if (pool.length < perRoute) {
      pool = DEX.filter(d => !d.legendary && !d.custom &&
        d.types.some(t => c.teamTypes.indexOf(t) >= 0) && d.bst >= lo - 180 && d.bst <= hi + 180);
    }
    if (pool.length < perRoute) {
      pool = DEX.filter(d => !d.legendary && !d.custom && d.bst >= lo - 60 && d.bst <= hi + 60);
    }

    const score = d => {
      const evolved = hasPreEvo[d.id] ? 1 : 0;
      const fit = 1 - Math.abs(evolved - wantEvolved);        // stage suits the route
      const fresh = used[d.id] ? -3 : 0;                      // prefer unseen in this region
      return fit * 2 + fresh + rnd() * 1.6;
    };

    const picks = pool.slice().sort((a, b) => score(b) - score(a)).slice(0, perRoute);
    picks.sort((a, b) => a.bst - b.bst);

    const table = [];
    let k = 0;
    rarity.forEach(band => {
      for (let j = 0; j < band.n && k < picks.length; j++, k++) {
        used[picks[k].id] = true;
        table.push([picks[k].id, band.key]);
      }
    });
    out[c.n] = table;
  });
  const all = new Set();
  Object.values(out).forEach(t => t.forEach(r => all.add(r[0])));
  console.log(label + ': ' + Object.keys(out).length + ' routes, ' +
    all.size + ' distinct species');
  return out;
}

const c = buildRegion(CHAPTERS, 'C region', 1000);
const kUsed = {};
const k = buildRegion(CALC_CHAPTERS, 'Converging Isles', 5000, null, kUsed);

/* Elara Slate's revision route (chapter 91, Evening Exam I) gets its own
   encounter table too, so "Route info" and the exam's wild battle work the
   same way an ordinary gym route does. It has no place in CALC_CHAPTERS's
   own list, so its strength band is pinned explicitly: the exam sits right
   after gym 3 of 10, the same schedule position as route 4. It shares the
   Isles' `used` set so its species do not repeat a gym route's.

   The route draws its questions from the whole exam - chapters 1, 2, 3 and
   91 together, about 4-5x what a single gym route holds - so a dozen species
   would feel thin next to that much content. Scaling every band up 4x keeps
   the same common:uncommon:rare feel while giving a hunt that matches the
   route's actual size. */
const REVISION_RARITY = RARITY.map(function (band) { return { key: band.key, n: band.n * 4, weight: band.weight }; });
const elaraChapter = (CALC_EXAM_CHAPTERS || []).filter(x => x.exam === 'x1')[0];
if (elaraChapter) {
  Object.assign(k, buildRegion([elaraChapter], 'Revision Route I', 5000, () => 3 / 9, kUsed, REVISION_RARITY));
}

/* Hand-placed original species. Keep them out of the general generator above
   so their homes stay intentional when the table is rebuilt. */
function addFixedEncounter(region, route, entry) {
  const table = region[route] || (region[route] = []);
  if (table.some(row => row[0] === entry[0])) return;
  const firstRare = table.findIndex(row => row[1] === 'rare');
  table.splice(firstRare < 0 ? table.length : firstRare, 0, entry);
}
addFixedEncounter(k, 3, [1026, 'uncommon']);
addFixedEncounter(k, 3, [1029, 'uncommon']);

const every = new Set();
[c, k].forEach(r => Object.values(r).forEach(t => t.forEach(x => every.add(x[0]))));
console.log('total distinct species across both regions: ' + every.size + ' of ' + DEX.length);

const fmt = reg => Object.keys(reg).sort((a, b) => a - b)
  .map(n => '  ' + n + ': ' + JSON.stringify(reg[n]).replace(/","/g, '","')).join(',\n');

fs.writeFileSync('js/data/encounters.js',
`/* GENERATED by tools/build-encounters.cjs - do not edit by hand.

   The fixed encounter table for every route. Each entry is [speciesId, rarity],
   ordered common first. wildFor() draws from here, and the Route info panel
   lists exactly this - so what the panel promises is what the route gives.

   Not every species in the dex appears, on purpose: there is room left for the
   subjects still to come. */
window.ENCOUNTERS = {
 c: {
${fmt(c)}
 },
 calc: {
${fmt(k)}
 }
};
window.RARITY_WEIGHT = { common: 10, uncommon: 4, rare: 1 };
`, 'utf8');
console.log('wrote js/data/encounters.js');
