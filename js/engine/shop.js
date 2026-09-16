/* Money, the bag, and the counter.

   Regular Poké Balls are free and unlimited: running out of them was never the
   interesting constraint, and being unable to catch something because you were
   short a consumable is just an errand. What money buys is a BETTER ball, so the
   decision is "is this one worth an Ultra Ball", which is a real decision. */

/* ---- bag ----------------------------------------------------------------- */

function ensureBag() {
  if (!S) return;
  if (typeof S.money !== 'number' || !isFinite(S.money)) S.money = 0;
  S.money = Math.max(0, Math.floor(S.money));
  if (!S.items || typeof S.items !== 'object' || Array.isArray(S.items)) S.items = {};
  Object.keys(ITEMS).forEach(function (k) {
    var item = itemById(k);
    var count = Math.max(0, Math.floor(Number(S.items[k]) || 0));
    S.items[k] = Math.min(item.maxStack, count);
  });
  /* A save from before the shop carried plain balls and potions. Migrate off the
     presence of those FIELDS and then delete them, rather than off a flag:
     loadGame backfills any key missing from freshSave, so a flag would be filled
     in as "already migrated" before this ever ran, and the old stock would be
     silently thrown away. Basic balls are free now, so the old ones become Great
     Balls instead of vanishing. */
  if (typeof S.balls === 'number' || typeof S.potions === 'number') {
    if (typeof S.balls === 'number' && S.balls > 0) {
      S.items.great = Math.min(itemById('great').maxStack, S.items.great + Math.min(20, S.balls));
    }
    if (typeof S.potions === 'number' && S.potions > 0) {
      S.items.potion = Math.min(itemById('potion').maxStack, S.items.potion + Math.min(20, S.potions));
    }
    delete S.balls;
    delete S.potions;
    if (!S.money) S.money = 500;
  }
}

function itemCount(key) { ensureBag(); return itemById(key) ? (S.items[key] || 0) : 0; }
function haveItem(key) { return itemCount(key) > 0; }
function useItem(key, n) {
  ensureBag();
  var item = itemById(key);
  if (!item || !item.consumable) return false;
  n = n === undefined ? 1 : Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 1) return false;
  if ((S.items[key] || 0) < n) return false;
  S.items[key] -= n;
  return true;
}

function itemHasContext(item, context) {
  return !!(item && Array.isArray(item.usableIn) && item.usableIn.indexOf(context) >= 0);
}

/* Runtime item behavior lives in one dispatch table. A handler may mutate its
   target, but performItemEffect owns inventory debit, persistence and rollback. */
var ITEM_EFFECTS = {
  'battle-heal': function (item, target) {
    if (!target || target.hp <= 0) return { error: 'A fainted Pokémon needs a Revive.' };
    if (target.hp >= maxHp(target)) return { error: monName(target) + ' is already at full HP.' };
    var amount = bagHealAmount(item, target);
    var healed = Math.min(maxHp(target) - target.hp, amount);
    target.hp += healed;
    return { amount: healed, message: monName(target) + ' recovered ' + healed + ' HP.' };
  },
  'party-heal': function (item, target) {
    return ITEM_EFFECTS['battle-heal'](item, target);
  },
  'party-revive': function (item, target) {
    if (!target || target.hp > 0) return { error: 'Revive only works on a fainted Pokémon.' };
    var amount = item.revival && item.revival.mode === 'fraction' ?
      Math.max(1, Math.ceil(maxHp(target) * item.revival.amount)) : 1;
    target.hp = Math.min(maxHp(target), amount);
    return { amount: target.hp, message: monName(target) + ' returned with ' + target.hp + ' HP.' };
  },
  'party-level': function (item, target) {
    if (!target || target.hp <= 0) return { error: 'Revive this Pokémon before training it.' };
    if (target.lvl >= 100) return { error: monName(target) + ' is already level 100.' };
    var before = target.lvl;
    var events = giveXp(target, Math.max(0, xpToNext(target.lvl) - target.xp));
    return { events: events, message: monName(target) + ' grew from level ' + before + ' to ' + target.lvl + '.' };
  },
  'battle-escape': function () {
    if (!B || B.over || B.kind !== 'wild') return { error: 'Poké Dolls only work in wild battles.' };
    return {
      message: 'The wild Pokémon watched the doll while you slipped away safely.',
      afterSave: function () { log('You used a Poké Doll and got away safely.'); B.over = true; showScreen('map'); renderMap(); }
    };
  }
};

function restoreItemTarget(target, snapshot) {
  if (!target || !snapshot) return;
  Object.keys(target).forEach(function (key) { if (!Object.prototype.hasOwnProperty.call(snapshot, key)) delete target[key]; });
  Object.keys(snapshot).forEach(function (key) { target[key] = snapshot[key]; });
}

function performItemEffect(key, context, target) {
  var item = itemById(key);
  var handler = item && ITEM_EFFECTS[item.effectHandler];
  if (!item || !handler || !itemHasContext(item, context) || !itemCount(key)) return false;
  var snapshot = target ? JSON.parse(JSON.stringify(target)) : null;
  var oldCount = itemCount(key);
  var oldSeen = JSON.stringify(S.seen || {}), oldCaught = JSON.stringify(S.caught || {});
  var result = handler(item, target, context) || {};
  if (result.error) { toast(result.error); return false; }
  if (!useItem(key, 1)) { restoreItemTarget(target, snapshot); return false; }
  (result.events || []).forEach(function (event) {
    if (event.kind === 'evolve') { S.seen[event.id] = true; S.caught[event.id] = true; }
  });
  if (!persistBagUse()) {
    restoreItemTarget(target, snapshot);
    S.items[key] = oldCount;
    S.seen = JSON.parse(oldSeen); S.caught = JSON.parse(oldCaught);
    return false;
  }
  if (result.afterSave) result.afterSave();
  return result;
}
function giveItem(key, n) {
  ensureBag();
  var item = itemById(key);
  if (!item) return false;
  n = n === undefined ? 1 : Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 1) return false;
  var count = (S.items[key] || 0) + n;
  S.items[key] = Math.min(item.maxStack, count);
  return true;
}
function sellItem(key, n) {
  ensureBag();
  var item = itemById(key);
  if (!item || !item.sellable) return false;
  n = n === undefined ? 1 : Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 1 || itemCount(key) < n) return false;
  S.items[key] -= n;
  addMoney(Math.floor(item.value / 2) * n);
  return true;
}
function ballCount(key) { return BALLS[key].unlimited ? Infinity : itemCount(key); }

function bagOwnedKeys() {
  ensureBag();
  return Object.keys(ITEMS).filter(function (key) { return itemCount(key) > 0; });
}

function itemCategoryLabel(category) {
  return ({ capture: 'Capture', medicine: 'Medicine', 'battle-utility': 'Battle utility',
    training: 'Training', evolution: 'Evolution', exploration: 'Exploration', key: 'Key items',
    collectible: 'Collectibles', gift: 'Gifts', flavor: 'Curios' })[category] || category;
}

function collectionProgress(collection) {
  var ids = Object.keys(ITEMS).filter(function (key) { return ITEMS[key].collection === collection; });
  return { found: ids.filter(function (key) { return itemCount(key) > 0; }).length, total: ids.length };
}

function renderBagSummary() {
  ensureBag();
  var keys = bagOwnedKeys();
  var h = '<section class="panel bag-summary"><h3>Bag</h3>' +
    '<p>Items you are carrying. Party-use items can be used here between battles.</p>';
  if (!keys.length) h += '<p class="small">Your bag is empty.</p>';
  else {
    ITEM_CATEGORIES.forEach(function (category) {
      var categoryKeys = keys.filter(function (key) { return itemById(key).category === category; });
      if (!categoryKeys.length) return;
      h += '<div class="bag-group"><h4>' + esc(itemCategoryLabel(category)) + '</h4>';
      if (category === 'collectible') {
        var collection = collectionProgress('regionalKeepsakes');
        h += '<p class="small">Regional keepsakes discovered: ' + collection.found + '/' + collection.total + '</p>';
      }
      h += '<div class="bag-items">';
      categoryKeys.forEach(function (key) {
      var item = itemById(key);
      var partyUse = ['party-heal', 'party-revive', 'party-level', 'party-evolution'].indexOf(item.effectHandler) >= 0;
      h += '<article class="bag-item"><div><strong>' + esc(item.name) + '</strong>' +
        '<span> × ' + itemCount(key) + '</span><p class="small">' + esc(item.description || '') + '</p></div>' +
        (partyUse ? '<button ' + (!itemCount(key) ? 'disabled ' : '') +
          'onclick="openBagItem(\'' + key + '\')">Use</button>' : '') + '</article>';
      });
      h += '</div></div>';
    });
  }
  h += '</section>';
  $('#s-party').insertAdjacentHTML('beforeend', h);
}

function openBagItem(key) {
  var item = itemById(key);
  if (!item || ['party-heal', 'party-revive', 'party-level', 'party-evolution'].indexOf(item.effectHandler) < 0 || !itemCount(key)) return;
  var h = '<h2>Use ' + esc(item.name) + '</h2><div class="row">';
  S.party.forEach(function (mon, index) {
    h += '<button ' + (!itemCanTarget(item, mon) ? 'disabled ' : '') +
      'onclick="useBagItem(\'' + key + '\',' + index + ')">' + esc(monName(mon)) +
      '<br>HP ' + mon.hp + '/' + maxHp(mon) + '</button>';
  });
  modal(h + '</div><button onclick="closeModal()">Keep it for later</button>');
}

function itemCanTarget(item, mon) {
  if (!item || !mon) return false;
  if (item.effectHandler === 'party-heal') return mon.hp > 0 && mon.hp < maxHp(mon);
  if (item.effectHandler === 'party-revive') return mon.hp <= 0;
  if (item.effectHandler === 'party-level') return mon.hp > 0 && mon.lvl < 100;
  if (item.effectHandler === 'party-evolution') return typeof evolutionBranches === 'function' && evolutionBranches(mon).length > 0;
  return false;
}

function bagHealAmount(item, mon) {
  if (!item.healing) return 0;
  if (item.healing.mode === 'flat') return Math.max(0, Math.floor(item.healing.amount));
  if (item.healing.mode === 'fraction') return Math.max(1, Math.floor(maxHp(mon) * item.healing.amount));
  return 0;
}

function persistBagUse() {
  try {
    if (typeof stashProgress === 'function') stashProgress();
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
    return true;
  } catch (e) {
    toast('Could not save. Keep this page open and try again.');
    return false;
  }
}

function useBagItem(key, index) {
  var item = itemById(key);
  if (!item || !itemHasContext(item, 'party')) return false;
  if (typeof B !== 'undefined' && B && !B.over) {
    toast('Finish the battle before using Party-bag items.');
    return false;
  }
  var mon = S.party[index];
  if (!mon || !itemCount(key)) return false;
  if (item.effectHandler === 'party-evolution') {
    if (!itemCanTarget(item, mon)) { toast('This Pokémon has no branching evolution to choose.'); return false; }
    openEvolutionItemChoice(key, index);
    return true;
  }
  var result = performItemEffect(key, 'party', mon);
  if (!result) return false;
  closeModal();
  renderParty();
  toast(result.message);
  return true;
}

function addMoney(n) {
  ensureBag();
  n = Math.floor(n);
  S.money = Math.max(0, S.money + n);
  if (typeof journalMoney === 'function') journalMoney(n);
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

function ensureShopPurchases() {
  if (!S.town || typeof S.town !== 'object' || Array.isArray(S.town)) S.town = {};
  if (!S.town.shopPurchases || typeof S.town.shopPurchases !== 'object' || Array.isArray(S.town.shopPurchases)) S.town.shopPurchases = {};
}

function shopInventory(keeperId) {
  return (SHOP_INVENTORIES[keeperId] || []).slice();
}

function shopEntry(keeperId, itemId) {
  return shopInventory(keeperId).find(function (entry) { return entry.item === itemId; }) || null;
}

function shopPurchaseKey(keeperId, itemId) { return keeperId + ':' + itemId; }
function shopPurchaseCount(keeperId, itemId) {
  ensureShopPurchases();
  return Math.max(0, Math.floor(Number(S.town.shopPurchases[shopPurchaseKey(keeperId, itemId)]) || 0));
}
function shopStockRemaining(keeperId, entry) {
  if (!entry || !Number.isFinite(entry.stock)) return Infinity;
  return Math.max(0, entry.stock - shopPurchaseCount(keeperId, entry.item));
}
function shopEntryPrice(entry) {
  var item = entry && itemById(entry.item);
  return entry && Number.isFinite(entry.price) ? entry.price : item ? item.price : NaN;
}

function openShop(keeperId) {
  ensureBag();
  ensureShopPurchases();
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

  var stock = shopInventory(SHOP_KEEPER);
  if (!stock.length) stock = SHOP_STOCK.map(function (item) { return { item: item }; });
  stock.forEach(function (entry) {
    var key = entry.item;
    var it = itemById(key);
    var blurb = it.description || (BALLS[key] ? BALLS[key].blurb : '');
    var price = shopEntryPrice(entry), locked = (entry.badges || 0) > badgeCount();
    var remaining = shopStockRemaining(SHOP_KEEPER || 'legacy', entry), soldOut = remaining <= 0;
    var can = !locked && !soldOut && money() >= price && itemCount(key) < it.maxStack;
    h += '<article class="shop-item"><h3>' + esc(it.name) + '</h3>' +
      '<p class="small">' + esc(blurb) + '</p>' +
      '<div class="shop-buy"><span class="price">₵ ' + price.toLocaleString() + '</span>' +
      '<span class="owned">' + (locked ? 'Unlocks at ' + entry.badges + ' badges' : soldOut ? 'Sold out' :
        'You have ' + itemCount(key) + (Number.isFinite(remaining) ? ' · ' + remaining + ' left here' : '')) + '</span></div>' +
      '<div class="row tight">' +
      '<button class="' + (can ? 'primary' : '') + '" ' + (can ? '' : 'disabled') +
      ' onclick="buyItem(\'' + key + '\',1)">Buy 1</button>' +
      '<button ' + (!locked && !soldOut && remaining >= 5 && money() >= price * 5 && it.maxStack - itemCount(key) >= 5 ? '' : 'disabled') +
      ' onclick="buyItem(\'' + key + '\',5)">Buy 5</button>' +
      '</div></article>';
  });
  h += '</div>';

  h += '<p class="muted" style="margin-top:16px">Prize money comes from battles. Wild Pokémon pay a little, ' +
    'trainers around the region pay more, and gym leaders pay best.</p>' +
    '<div class="row" style="margin-top:12px"><button class="ghost" onclick="' +
    (typeof humanWorldHasReturn === 'function' && humanWorldHasReturn() ? 'humanWorldReturn()' : 'openTown()') +
    '">Back to ' + (typeof humanWorldHasReturn === 'function' && humanWorldHasReturn() ? 'Bootstrap Town' : 'the region') + '</button></div>';

  $('#s-shop').innerHTML = h;
  renderTopbar();
}

function buyItem(key, n) {
  ensureBag();
  ensureShopPurchases();
  var it = itemById(key);
  if (!it || !Number.isFinite(it.price)) return;
  // Guard the arithmetic before it touches money. A non-numeric n made cost NaN,
  // which slipped past the affordability check and wrote NaN into the save.
  n = Math.floor(Number(n));
  if (!isFinite(n) || n < 1) return;
  var entry = SHOP_KEEPER ? shopEntry(SHOP_KEEPER, key) : { item: key };
  if (!entry) { toast('This shop does not stock that item.'); return; }
  if ((entry.badges || 0) > badgeCount()) { toast('That stock unlocks at ' + entry.badges + ' badges.'); return; }
  if (n > shopStockRemaining(SHOP_KEEPER || 'legacy', entry)) { toast('That shelf does not have enough left.'); return; }
  if (n > it.maxStack - itemCount(key)) { toast('Your stack cannot hold that many.'); return; }
  var price = shopEntryPrice(entry), cost = price * n;
  if (!isFinite(cost) || money() < cost) { toast('Not enough money for that.'); return; }
  addMoney(-cost);
  giveItem(key, n);
  if (typeof collectFirstPurchase === 'function') collectFirstPurchase();
  if (SHOP_KEEPER && Number.isFinite(entry.stock)) {
    var purchaseKey = shopPurchaseKey(SHOP_KEEPER, key);
    S.town.shopPurchases[purchaseKey] = shopPurchaseCount(SHOP_KEEPER, key) + n;
  }
  saveGame();
  renderShop();
  toast('Bought ' + n + ' ' + it.name + (n > 1 ? 's' : '') + '.');
}
