/* Atomic character gifts, authored reactions and preference discovery. */
var GIFT_LIMIT_PER_WINDOW = 3;
var GIFT_PREFERENCE_POINTS = { loved: 40, liked: 26, neutral: 12, disliked: -6, hated: -16 };
var GIFT_BAND_LABELS = { loved: 'Loved', liked: 'Liked', neutral: 'Neutral', disliked: 'Disliked', hated: 'Hated' };

/* These lines are deliberately character-specific. They describe an immediate
   response to an object, not a heart event and not a lesson in either subject. */
var GIFT_REACTIONS = {
  rowan: {
    loved: 'Rowan turns the tin over twice, then tucks it beside his battle journal. “Good choice. I was nearly out.”',
    liked: 'Rowan tests the weight in one hand and nods. “Useful. You paid attention.”',
    neutral: 'Rowan accepts it with a quick, surprised smile. “Wasn’t expecting this. Thanks.”',
    disliked: 'Rowan studies the packaging longer than the gift. “A bit much for me, honestly.”',
    hated: 'Rowan coughs at the cheerful warning label. “You can keep the tactical fire hazard.”'
  },
  mira: {
    loved: 'Mira opens the tin and breathes in the juniper. “This can go on the community table tonight.”',
    liked: 'Mira rubs a thumb over the handmade edge. “Someone took care with this. I will too.”',
    neutral: 'Mira finds a clear spot among the seed trays. “Thank you. Let me put it somewhere Oddish cannot investigate.”',
    disliked: 'Mira looks at the wrapping, then at the compost bin. “Next time, less packaging would be kinder.”',
    hated: 'Mira returns the pressed bloom to its paper. “I would rather meet a flower still growing.”'
  },
  theo: {
    loved: 'Theo aligns the tin with the edge of his workbench. “It seals properly. And, um, smells better than solder.”',
    liked: 'Theo examines the join, forgets to be nervous, and grins. “That is a very clean little build.”',
    neutral: 'Theo clears the spare stool for it. “I did not plan a gift shelf. Apparently I have one now.”',
    disliked: 'Theo holds it well away from the crowded bench. “Fragile is difficult in a room full of elbows.”',
    hated: 'Theo reads the sauce label in silence. “My fire extinguisher is decorative. So: no.”'
  },
  june: {
    loved: 'June checks the cap, laughs, and slips the bottle into her trail kit. “Soup just got interesting.”',
    liked: 'June gives it the brisk inspection she gives a good map. “Light, useful, and worth the pack space.”',
    neutral: 'June finds a safe pocket for it. “Unexpected cargo, but welcome cargo.”',
    disliked: 'June hefts it and winces. “Lovely, but my knees have filed an objection.”',
    hated: 'June blows one note, startling herself and an Eevee nearby. “That will announce us to the entire ridge.”'
  },
  ellis: {
    loved: 'Ellis traces the pencilled date without touching the petals. “Crooked margin. Perfect. It remembers being made.”',
    liked: 'Ellis tilts it toward the window. “The uneven part is the best part. Do not tell the shop.”',
    neutral: 'Ellis sets it beside a page of abandoned hands. “It changes the color of the whole table.”',
    disliked: 'Ellis studies the polished finish. “It is very certain about where I am supposed to put it.”',
    hated: 'Ellis eyes the sauce, then their pale sketchbook. “That combination ends in an orange crime scene.”'
  },
  aide: {
    loved: 'Kern pockets the sauce beside two folded checklists. “Lunch has been upgraded from obligation to event.”',
    liked: 'Kern checks its size against an open kit pocket. “Portable. Useful. No assembly. Excellent.”',
    neutral: 'Kern accepts it after a brief inventory of both hands. “Thanks. I will find it a route.”',
    disliked: 'Kern looks at the crowded lab desk. “Another object requiring a surface. Bold choice.”',
    hated: 'Kern gives the whistle one flat look. “If the lab needs more noise, a centrifuge will volunteer.”'
  },
  linden: {
    loved: 'Linden reads the pencilled location before the flower. “A specimen with context. Keep doing that.”',
    liked: 'Linden checks the construction and gives one decisive nod. “Durable enough for field use. Good.”',
    neutral: 'Linden turns it over, revises an initial frown, and pockets it. “Unexpected. Not unwelcome.”',
    disliked: 'Linden sets it beside an unopened award plaque. “Ceremony occupies more shelf than work should.”',
    hated: 'Linden hears the whistle once. “No. It imitates a local call badly enough to confuse both of us.”'
  },
  'c-hawthorn': {
    loved: 'Hawthorn measures out the tea with surprising informality. “This may justify interrupting the midnight record.”',
    liked: 'Hawthorn inspects it under the lamp. “Well maintained, and unlikely to distort an observation.”',
    neutral: 'Hawthorn makes a precise space beside the card deck. “I had not accounted for a gift. Thank you.”',
    disliked: 'Hawthorn tests the novelty mechanism once. “Its uncertainty is not the interesting kind.”',
    hated: 'Hawthorn reads the sauce warning as though reviewing a doubtful result. “The claim appears reproducible. Regrettably.”'
  },
  'c-gym-1': {
    loved: 'Byte sounds the whistle once and labels its drawer. “New archive resident. Access approved.”',
    liked: 'Byte checks the worn edge and smiles. “Built to be handled. That is the correct design.”',
    neutral: 'Byte adds a tiny paper label with your name. “Received, recorded, appreciated.”',
    disliked: 'Byte leaves the seal intact. “Objects should be usable, not permanently trapped in packaging.”',
    hated: 'Byte studies the pressed flower. “Beautiful record. Catastrophic maintenance requirements.”'
  },
  'calc-gym-1': {
    loved: 'Rhea turns the pressed flower north, then laughs at herself. “A place, a date, and no vague bearings. Excellent.”',
    liked: 'Rhea tests it against the wind. “Light enough to carry and useful when the weather changes.”',
    neutral: 'Rhea secures it before examining it. “First rule on this coast: do not let gratitude blow away.”',
    disliked: 'Rhea glances toward the open door. “It belongs indoors, and I rarely know where indoors is.”',
    hated: 'Rhea catches the whistle cord before it tangles. “One more loose line is not improving this route.”'
  }
};

function giftReaction(characterId, band) {
  var set = GIFT_REACTIONS[characterId];
  return set && set[band] ? set[band] : 'They accept the gift and tell you plainly how it landed.';
}

function ensureGiftLedger() {
  if (!S.giftLedger || typeof S.giftLedger !== 'object' || Array.isArray(S.giftLedger)) S.giftLedger = {};
  Object.keys(S.giftLedger).forEach(function (id) {
    var record = S.giftLedger[id];
    if (!record || typeof record !== 'object' || Array.isArray(record)) record = S.giftLedger[id] = {};
    if (!record.d || typeof record.d !== 'object' || Array.isArray(record.d)) record.d = {};
    if (!record.r || typeof record.r !== 'object' || Array.isArray(record.r)) record.r = {};
    record.n = Math.max(0, Math.floor(Number(record.n) || 0));
  });
}

function giftRecord(characterId) {
  ensureGiftLedger();
  if (!S.giftLedger[characterId]) S.giftLedger[characterId] = { n: 0, d: {}, r: {} };
  return S.giftLedger[characterId];
}

function giftPreferenceBand(characterId, itemId) {
  var member = castById(characterId), item = itemById(itemId);
  if (!member || !item || item.category !== 'gift') return null;
  var prefs = member.bible && member.bible.giftPreferences;
  if (!prefs) return 'neutral';
  if ((prefs.favoriteItemIds || []).indexOf(itemId) >= 0) return 'loved';
  if ((prefs.avoidedItemIds || []).indexOf(itemId) >= 0) return 'hated';
  var tags = item.giftTags || [];
  if (tags.some(function (tag) { return (prefs.dislikedCategories || []).indexOf(tag) >= 0; })) return 'disliked';
  if (tags.some(function (tag) { return (prefs.likedCategories || []).indexOf(tag) >= 0; })) return 'liked';
  return 'neutral';
}

function giftDiscovery(characterId) {
  ensureGiftLedger();
  var record = S.giftLedger[characterId];
  return record ? Object.assign({}, record.d) : {};
}

function giftFrequency(characterId) {
  var f = S.friends && S.friends[characterId];
  if (!f) return { used: 0, remaining: GIFT_LIMIT_PER_WINDOW, wait: 0 };
  var pacing = friendPacingPreview(f, 'gift');
  return { used: pacing.repeat, remaining: Math.max(0, GIFT_LIMIT_PER_WINDOW - pacing.repeat),
    wait: pacing.repeat >= GIFT_LIMIT_PER_WINDOW ? Math.max(0, FRIEND_WINDOW - (pacing.clock - pacing.anchor)) : 0 };
}

function persistGiftTransaction() {
  try {
    if (typeof stashProgress === 'function') stashProgress();
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
    return true;
  } catch (error) {
    toast('Could not save the gift. Nothing was exchanged.');
    return false;
  }
}

function giveGift(characterId, itemId, options) {
  options = options || {};
  ensureFriends(); ensureBag(); ensureGiftLedger();
  var member = castById(characterId), friend = S.friends && S.friends[characterId], item = itemById(itemId);
  var result = { accepted: false, characterId: characterId, itemId: itemId, band: null, change: 0, reason: null };
  if (!member) { result.reason = 'unknown-character'; return result; }
  if (!member.befriendable) { result.reason = 'not-befriendable'; return result; }
  if (!friend || !friend.met) { result.reason = 'not-met'; return result; }
  if (!item || item.category !== 'gift' || !itemHasContext(item, 'gift')) { result.reason = 'not-a-gift'; return result; }
  if (!itemCount(itemId)) { result.reason = 'not-owned'; return result; }
  var record = giftRecord(characterId);
  var receiptId = options.receiptId || ('gift:' + characterId + ':' + (record.n + 1));
  if (record.r[receiptId]) { result.reason = 'duplicate-receipt'; return result; }
  var frequency = giftFrequency(characterId);
  if (frequency.remaining <= 0) { result.reason = 'frequency-limit'; result.wait = frequency.wait; return result; }

  if (typeof stashProgress === 'function') stashProgress();
  var before = JSON.stringify(S);
  var band = giftPreferenceBand(characterId, itemId);
  var award = awardFriendship(characterId, 'gift', { amount: GIFT_PREFERENCE_POINTS[band], countMeeting: true });
  if (!award.accepted) { result.reason = award.reason || 'friendship-refused'; return result; }
  if (!useItem(itemId, 1)) { activateSave(JSON.parse(before)); result.reason = 'inventory-changed'; return result; }
  record = giftRecord(characterId);
  record.n++;
  record.d[itemId] = band;
  record.r[receiptId] = 1;
  if (!persistGiftTransaction()) { activateSave(JSON.parse(before)); result.reason = 'save-failed'; return result; }
  result.accepted = true; result.band = band; result.change = award.change;
  result.receiptId = receiptId; result.remaining = giftFrequency(characterId).remaining;
  return result;
}

function giftFailureMessage(result) {
  if (!result) return 'The gift could not be exchanged.';
  if (result.reason === 'frequency-limit') return 'You have already given three gifts in this activity window. Answer ' + (result.wait || 0) + ' more questions before giving another.';
  if (result.reason === 'not-owned') return 'That item is no longer in your bag.';
  if (result.reason === 'not-a-gift') return 'That item is not meant to be given away.';
  if (result.reason === 'save-failed') return 'The save failed, so the item and friendship change were both restored.';
  if (result.reason === 'duplicate-receipt') return 'That exchange was already recorded. Nothing was removed.';
  return 'The gift could not be exchanged. Nothing was removed from your bag.';
}

function giftChoiceIds() {
  return Object.keys(ITEMS).filter(function (id) {
    var item = itemById(id);
    return item.category === 'gift' || (itemCount(id) > 0 && (item.unique || item.category === 'key' || item.category === 'exploration'));
  });
}

function giftChoiceState(characterId, itemId) {
  var item = itemById(itemId), count = itemCount(itemId), frequency = giftFrequency(characterId);
  var validGift = !!(item && item.category === 'gift' && itemHasContext(item, 'gift'));
  return { item: item, count: count, frequency: frequency, validGift: validGift,
    enabled: !!(validGift && count > 0 && frequency.remaining > 0),
    protected: !!(item && (item.unique || item.category === 'key' || item.category === 'exploration' || !item.sellable)) };
}

function renderGiftChoicePreview(characterId, itemId) {
  var state = giftChoiceState(characterId, itemId), item = state.item;
  if (!item) return '<p class="small">Choose an item to preview it.</p>';
  var warning = state.protected ? '<p class="gift-warning"><b>Protected item:</b> unique, key, exploration, or nonreplaceable objects cannot be given away.</p>' : '';
  if (!state.validGift) warning += '<p class="gift-warning">This is not a gift item and cannot be selected.</p>';
  else if (!state.count) warning += '<p class="gift-warning">You do not own this item yet.</p>';
  return '<div class="gift-preview"><p><b>' + esc(item.name) + '</b> · ' + esc(item.rarity.replace('-', ' ')) + ' · owned ' + state.count + '</p>' +
    '<p class="small">' + esc(item.description) + '</p>' + warning + '</div>';
}

function renderGiftPanel(characterId) {
  var ids = giftChoiceIds(), frequency = giftFrequency(characterId), discovery = giftDiscovery(characterId);
  var selected = ids.find(function (id) { return giftChoiceState(characterId, id).enabled; }) || ids[0] || '';
  var h = '<section class="panel friend-gifts"><h3>Offer a gift</h3><p class="small">A gift reveals this person’s preference after they receive it. Purchased gifts can help a friendship, but cannot create maximum closeness by themselves.</p>' +
    '<p class="gift-frequency" role="status"><b>' + frequency.remaining + '</b> of ' + GIFT_LIMIT_PER_WINDOW + ' gifts remain in this activity window' +
    (frequency.wait ? ' · answer ' + frequency.wait + ' more questions to reset it' : '') + '.</p>' +
    '<label for="friend-gift-choice">Item</label><select id="friend-gift-choice" onchange="updateGiftChoice(\'' + characterId + '\')">';
  ids.forEach(function (id) {
    var state = giftChoiceState(characterId, id), item = state.item;
    h += '<option value="' + id + '"' + (id === selected ? ' selected' : '') + (!state.enabled ? ' disabled' : '') + '>' +
      esc(item.name) + ' · owned ' + state.count + (!state.validGift ? ' · protected' : !state.count ? ' · unavailable' : '') + '</option>';
  });
  h += '</select><div id="friend-gift-preview">' + renderGiftChoicePreview(characterId, selected) + '</div>' +
    '<button id="friend-gift-submit" ' + (!selected || !giftChoiceState(characterId, selected).enabled ? 'disabled ' : '') +
    'onclick="giveSelectedGift(\'' + characterId + '\')">Give selected item</button>';
  var known = Object.keys(discovery);
  h += '<div class="gift-discoveries"><h4>Discovered preferences</h4>' + (known.length ? '<ul>' + known.map(function (id) {
    var item = itemById(id); return '<li><span>' + esc(item ? item.name : id) + '</span><b class="gift-band ' + discovery[id] + '">' + esc(GIFT_BAND_LABELS[discovery[id]] || discovery[id]) + '</b></li>';
  }).join('') + '</ul>' : '<p class="small">Nothing discovered yet. Undiscovered preferences stay unknown.</p>') + '</div></section>';
  return h;
}

function updateGiftChoice(characterId) {
  var select = document.getElementById('friend-gift-choice'), preview = document.getElementById('friend-gift-preview'), submit = document.getElementById('friend-gift-submit');
  if (!select || !preview || !submit) return;
  var state = giftChoiceState(characterId, select.value);
  preview.innerHTML = renderGiftChoicePreview(characterId, select.value);
  submit.disabled = !state.enabled;
}

function giveSelectedGift(characterId) {
  var select = document.getElementById('friend-gift-choice');
  if (!select) return;
  var item = itemById(select.value), result = giveGift(characterId, select.value);
  if (!result.accepted) {
    modal('<h2>Gift not exchanged</h2><p>' + esc(giftFailureMessage(result)) + '</p><button class="primary" onclick="closeModal();openFriend(\'' + characterId + '\')">Back</button>');
    return;
  }
  var member = castById(characterId), label = GIFT_BAND_LABELS[result.band] || titleCase(result.band);
  modal('<h2>' + esc(member.name) + ' · ' + esc(label) + '</h2><p class="scene-prose">' + esc(giftReaction(characterId, result.band)) + '</p>' +
    '<p class="friend-change" role="status">Friendship ' + (result.change >= 0 ? '+' : '') + result.change + '.</p>' +
    '<p class="small">' + esc(item.name) + ' was removed from your bag. ' + result.remaining + ' gifts remain in this activity window.</p>' +
    '<button class="primary" onclick="closeModal();openFriend(\'' + characterId + '\')">Continue</button>');
}
