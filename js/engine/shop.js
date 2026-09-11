/* Money, the bag, and the counter.

   Regular Poké Balls are free and unlimited: running out of them was never the
   interesting constraint, and being unable to catch something because you were
   short a consumable is just an errand. What money buys is a BETTER ball, so the
   decision is "is this one worth an Ultra Ball", which is a real decision. */

/* Ball bonuses are the real ones. They feed the capture formula in battle.js,
   which is the Gen III/IV maths, so a species is as hard to catch here as it is
   in the games it came from. */
var BALLS = {
  poke:  { name: 'Poké Ball',  mult: 1.0, price: 0, unlimited: true,
           blurb: 'Always in your bag. The house keeps crates of them.' },
  great: { name: 'Great Ball', mult: 1.5, price: 600,
           blurb: 'Half again the catch rate. Worth it for something you would be sad to lose.' },
  ultra: { name: 'Ultra Ball', mult: 2.0, price: 1400,
           blurb: 'Double the catch rate. Save them for the rare ones.' }
};

var ITEMS = {
  great:       { name: 'Great Ball',  price: 600,  kind: 'ball' },
  ultra:       { name: 'Ultra Ball',  price: 1400, kind: 'ball' },
  potion:      { name: 'Potion',      price: 250,  kind: 'heal', heal: 0.5,
                 blurb: 'Restores about half of a Pokémon\'s health.' },
  superpotion: { name: 'Super Potion', price: 650, kind: 'heal', heal: 1.0,
                 blurb: 'Restores a Pokémon completely.' }
};

var SHOP_STOCK = ['great', 'ultra', 'potion', 'superpotion'];

/* ---- bag ----------------------------------------------------------------- */

function ensureBag() {
  if (!S) return;
  if (typeof S.money !== 'number' || !isFinite(S.money)) S.money = 0;
  S.money = Math.max(0, Math.floor(S.money));
  if (!S.items || typeof S.items !== 'object' || Array.isArray(S.items)) S.items = {};
  Object.keys(ITEMS).forEach(function (k) {
    S.items[k] = Math.max(0, Math.floor(Number(S.items[k]) || 0));
  });
  /* A save from before the shop carried plain balls and potions. Migrate off the
     presence of those FIELDS and then delete them, rather than off a flag:
     loadGame backfills any key missing from freshSave, so a flag would be filled
     in as "already migrated" before this ever ran, and the old stock would be
     silently thrown away. Basic balls are free now, so the old ones become Great
     Balls instead of vanishing. */
  if (typeof S.balls === 'number' || typeof S.potions === 'number') {
    if (typeof S.balls === 'number' && S.balls > 0) S.items.great += Math.min(20, S.balls);
    if (typeof S.potions === 'number' && S.potions > 0) S.items.potion += Math.min(20, S.potions);
    delete S.balls;
    delete S.potions;
    if (!S.money) S.money = 500;
  }
}

function itemCount(key) { ensureBag(); return S.items[key] || 0; }
function haveItem(key) { return itemCount(key) > 0; }
function useItem(key, n) {
  ensureBag();
  n = n || 1;
  if ((S.items[key] || 0) < n) return false;
  S.items[key] -= n;
  return true;
}
function giveItem(key, n) {
  ensureBag();
  if (!ITEMS[key]) return;
  S.items[key] = (S.items[key] || 0) + (n || 1);
}
function ballCount(key) { return BALLS[key].unlimited ? Infinity : itemCount(key); }

function addMoney(n) {
  ensureBag();
  n = Math.floor(n);
  S.money = Math.max(0, S.money + n);
  return n;
}
function money() { ensureBag(); return S.money; }

/* Prize money for a battle. Scaled by level so it keeps pace, with a floor so an
   early win is still worth something. */
function battlePrize(kind, level, base) {
  var lv = Math.max(1, level || playerLevel());
  if (kind === 'wild') return 15 + lv * 4;
  if (kind === 'gym') return 400 + lv * 12;
  if (kind === 'elite') return 900 + lv * 20;
  if (kind === 'npc') return Math.round((base || 100) * (0.7 + lv / 45));
  return 0;
}

/* ---- the counter --------------------------------------------------------- */

var SHOP_KEEPER = null;   // which townsperson is serving, for flavour

function openShop(keeperId) {
  ensureBag();
  SHOP_KEEPER = keeperId || null;
  showScreen('shop');
  renderShop();
}

function renderShop() {
  ensureBag();
  var keeper = SHOP_KEEPER && typeof townsfolkById === 'function' ? townsfolkById(SHOP_KEEPER) : null;
  var h = '<div class="section-intro"><span class="eyebrow">POKé MART</span>' +
    '<h2>' + (keeper ? esc(keeper.name) + '’s counter' : 'The counter') + '</h2>' +
    '<p class="muted">' + esc(keeper ? keeper.say : 'Poké Balls are free. Everything else has a price.') + '</p></div>';

  h += '<div class="shop-wallet"><span>In your wallet</span><b>₵ ' + money().toLocaleString() + '</b></div>';

  h += '<div class="shop-grid">';
  // the free one, listed first so it is obvious it is free
  h += '<article class="shop-item free"><h3>Poké Ball</h3>' +
    '<p class="small">' + esc(BALLS.poke.blurb) + '</p>' +
    '<div class="shop-buy"><span class="price">Free</span><span class="owned">Unlimited</span></div></article>';

  SHOP_STOCK.forEach(function (key) {
    var it = ITEMS[key];
    var blurb = it.blurb || (BALLS[key] ? BALLS[key].blurb : '');
    var can = money() >= it.price;
    h += '<article class="shop-item"><h3>' + esc(it.name) + '</h3>' +
      '<p class="small">' + esc(blurb) + '</p>' +
      '<div class="shop-buy"><span class="price">₵ ' + it.price.toLocaleString() + '</span>' +
      '<span class="owned">You have ' + itemCount(key) + '</span></div>' +
      '<div class="row tight">' +
      '<button class="' + (can ? 'primary' : '') + '" ' + (can ? '' : 'disabled') +
      ' onclick="buyItem(\'' + key + '\',1)">Buy 1</button>' +
      '<button ' + (money() >= it.price * 5 ? '' : 'disabled') +
      ' onclick="buyItem(\'' + key + '\',5)">Buy 5</button>' +
      '</div></article>';
  });
  h += '</div>';

  h += '<p class="muted" style="margin-top:16px">Prize money comes from battles. Wild Pokémon pay a little, ' +
    'trainers around the region pay more, and gym leaders pay best.</p>' +
    '<div class="row" style="margin-top:12px"><button class="ghost" onclick="openTown()">Back to the region</button></div>';

  $('#s-shop').innerHTML = h;
  renderTopbar();
}

function buyItem(key, n) {
  ensureBag();
  var it = ITEMS[key];
  if (!it) return;
  // Guard the arithmetic before it touches money. A non-numeric n made cost NaN,
  // which slipped past the affordability check and wrote NaN into the save.
  n = Math.floor(Number(n));
  if (!isFinite(n) || n < 1) return;
  var cost = it.price * n;
  if (!isFinite(cost) || money() < cost) { toast('Not enough money for that.'); return; }
  addMoney(-cost);
  giveItem(key, n);
  saveGame();
  renderShop();
  toast('Bought ' + n + ' ' + it.name + (n > 1 ? 's' : '') + '.');
}
