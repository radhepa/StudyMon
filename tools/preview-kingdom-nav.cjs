/* Dumps each Kingdom district's walk mask (0.5% cells) and gate routes as JSON,
   for tools/preview-kingdom-nav.py to paint over the artwork. */
const fs = require('fs');
const vm = require('vm');
const ctx = { console, Math, Date, performance: { now: () => 0 }, localStorage: { getItem() { return null; }, setItem() {} } };
vm.createContext(ctx);
for (const f of ['js/engine/kingdom.js', 'js/engine/kingdom-travel.js']) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
}
const out = vm.runInContext(`KINGDOM_LOCATIONS.map(function (loc) {
  var rows = [];
  for (var y = 0; y < 200; y++) {
    var row = '';
    for (var x = 0; x < 200; x++) row += kingdomIsWalkable(x / 2 + .25, y / 2 + .25, loc) ? '1' : '0';
    rows.push(row);
  }
  var routes = [];
  loc.neighbors.forEach(function (a) {
    routes.push({ gate: a, points: loc.gates[a] });
    loc.neighbors.forEach(function (b) {
      if (a < b) routes.push({ from: a, to: b, points: kingdomSceneRoute(loc.id, a, b) });
    });
    routes.push({ home: a, points: kingdomSceneRoute(loc.id, null, a) });
  });
  return { id: loc.id, image: loc.image, rows: rows, routes: routes, home: loc.nav.home };
})`, ctx);
process.stdout.write(JSON.stringify(out));
