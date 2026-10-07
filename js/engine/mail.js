/* Phase 7 Slice 3: letters, postcards and invitations.

   Mail rides on the world-state buckets, keyed "mail:<id>":
     known     delivered to the mailbox
     seen      opened
     rewarded  enclosure taken (claimWorldReward: one receipt, all-or-nothing)

   Delivery is a write, so it only happens at two explicit moments: when a save
   is opened (loadGame -> mailOnOpening) and when the player opens the mailbox.
   Everything the top bar and the mailbox list show is read-only. Nothing
   expires, nothing is lost by waiting, and nothing counts days: a letter that
   is eligible stays eligible until it is delivered.

   The one real-time rule is warm and optional: a `returning` letter from an
   established friend may be chosen when a save is opened after a few days away.
   Being away never costs friendship and never makes other mail missable. */

var MAIL_TYPES = { letter: 'Letter', postcard: 'Postcard', invitation: 'Invitation' };
var MAIL_PER_DELIVERY = 3;                        // pacing: the rest wait for the next moment
var MAIL_RETURN_GAP_MS = 3 * 24 * 60 * 60 * 1000; // "a while" for a returning note
var MAIL_ERRORS = [];

function validateMailRecord(m) {
  var errors = [], label = 'mail:' + (m && m.id);
  if (!m || typeof m !== 'object') return [label + ': invalid record'];
  if (!MAIL_TYPES[m.type]) errors.push(label + ': unknown type ' + m.type);
  if (typeof castById !== 'function' || !castById(m.from)) errors.push(label + ': unknown sender ' + m.from);
  if (typeof m.title !== 'string' || m.title.trim().length < 4) errors.push(label + ': missing title');
  if (typeof m.body !== 'string' || m.body.trim().length < 60) errors.push(label + ': body missing or too short');
  if (m.attachment !== undefined) {
    if (!Array.isArray(m.attachment) || !m.attachment.length) errors.push(label + ': attachment must be a non-empty list');
    else m.attachment.forEach(function (a) {
      var item = a && typeof itemById === 'function' ? itemById(a.item) : null;
      if (!item) errors.push(label + ': unknown attachment item ' + (a && a.item));
      else if (item.category === 'key' || item.unique) errors.push(label + ': key or unique items are never mailed (' + a.item + ')');
      if (!(Math.floor(Number(a && a.count)) >= 1)) errors.push(label + ': attachment count must be at least 1');
    });
  }
  if (m.invitation !== undefined) {
    if (m.type !== 'invitation') errors.push(label + ': only invitations carry an invitation');
    if (!m.invitation || typeof rumorLocationKnown !== 'function' || !rumorLocationKnown(m.invitation.location)) {
      errors.push(label + ': invitation needs a known location');
    }
  }
  if (m.type === 'invitation' && !m.invitation) errors.push(label + ': invitation has no place');
  if (m.returning) {
    var all = (m.when && m.when.all) || [];
    var established = all.some(function (f) {
      var p = String(f).split(':');
      return p[0] === 'stage' && p[1] === m.from && ['friend', 'trusted', 'close'].indexOf(p[2]) >= 0;
    });
    if (!established) errors.push(label + ': a returning note needs stage:<sender>:friend (or closer) in when.all');
    if (m.attachment) errors.push(label + ': returning notes carry no enclosure');
  }
  return errors;
}

function registerMail(record) {
  var errors = validateMailRecord(record);
  if (!errors.length) errors = registerWorldContent('mail', record);
  MAIL_ERRORS = MAIL_ERRORS.concat(errors);
  return errors;
}

function validateMail() { return MAIL_ERRORS.slice(); }

function mailDelivered(m) { return worldHas('known', 'mail', m.id); }
function mailOpened(m) { return worldHas('seen', 'mail', m.id); }
function mailTaken(m) { return worldHas('rewarded', 'mail', m.id); }

/* Read-only: letters that could be delivered right now. Senders must have met
   the player - nobody writes to a stranger. */
function mailEligible(options) {
  options = options || {};
  if (!S) return [];
  var list = worldContentList('mail').filter(function (m) {
    if (mailDelivered(m)) return false;
    if (!worldFact('met:' + m.from)) return false;
    if (m.returning && !(Number(options.awayMs) >= MAIL_RETURN_GAP_MS)) return false;
    return worldConditionMet(m.when);
  });
  return list.sort(function (a, b) {
    return (Number(b.priority) || 0) - (Number(a.priority) || 0) || a.id.localeCompare(b.id);
  });
}

/* Read-only: delivered letters, newest first (stamp, then id for ties). */
function mailbox() {
  if (!S) return [];
  return worldContentList('mail').filter(mailDelivered).sort(function (a, b) {
    return worldStamp('known', 'mail', b.id) - worldStamp('known', 'mail', a.id) || a.id.localeCompare(b.id);
  });
}

/* Read-only count for the top bar: unopened plus ready to arrive. */
function mailWaiting() {
  if (!S) return 0;
  var unopened = mailbox().filter(function (m) { return !mailOpened(m); }).length;
  return unopened + Math.min(MAIL_PER_DELIVERY, mailEligible().length);
}

/* The only delivery writer. At most one returning note per opening, and at
   most MAIL_PER_DELIVERY letters per moment. */
function deliverMail(options) {
  if (!S) return [];
  var delivered = [], returned = false;
  mailEligible(options).forEach(function (m) {
    if (delivered.length >= MAIL_PER_DELIVERY) return;
    if (m.returning) { if (returned) return; returned = true; }
    if (worldMark('known', 'mail', m.id)) delivered.push(m);
  });
  return delivered;
}

/* Called by loadGame once a save is active. Records when the save was opened
   so a later opening can tell it has been a while; nothing else uses it. */
function mailOnOpening(now) {
  if (!S) return [];
  ensureWorldState();
  now = Number(now) || Date.now();
  var last = Number(S.world.lastOpenedAt) || 0;
  var awayMs = last > 0 ? Math.max(0, now - last) : 0;
  S.world.lastOpenedAt = now;
  return deliverMail({ awayMs: awayMs });
}

function mailSenderName(m) { var c = castById(m.from); return c ? c.name : 'Someone'; }

function mailEnclosureText(m) {
  return (m.attachment || []).map(function (a) {
    var item = itemById(a.item);
    return a.count + ' ' + (item ? item.name : a.item) + (a.count > 1 ? 's' : '');
  }).join(', ');
}

function mailChip() {
  if (!S) return '';
  var n = mailWaiting(), any = n || mailbox().length;
  if (!any) return '';
  return '<button class="chip mail-chip" onclick="openMailbox()" aria-label="Mailbox' + (n ? ', ' + n + ' new' : '') + '">✉' +
    (n ? ' <b>' + n + '</b> new' : ' mail') + '</button>';
}

function openMailbox() {
  if (!S) return;
  var arrived = deliverMail();
  if (arrived.length) saveGame();
  renderMailbox(arrived);
  if (typeof renderTopbar === 'function') renderTopbar();
}

function renderMailbox(arrived) {
  var list = mailbox();
  var fresh = {};
  (arrived || []).forEach(function (m) { fresh[m.id] = true; });
  var h = '<div class="mailbox"><h2>Mailbox</h2>';
  if (!list.length) h += '<p class="muted">Nothing yet. People write once they know you.</p>';
  else {
    h += '<ul class="mail-list">';
    list.forEach(function (m) {
      var state = !mailOpened(m) ? 'unopened' : (m.attachment && !mailTaken(m) ? 'enclosure' : 'read');
      h += '<li class="mail-row mail-' + state + '"><button onclick="openLetter(\'' + m.id + '\')">' +
        '<span class="mail-kind">' + MAIL_TYPES[m.type] + (fresh[m.id] ? ' · just arrived' : '') + '</span>' +
        '<b>' + esc(m.title) + '</b><small>From ' + esc(mailSenderName(m)) +
        (state === 'enclosure' ? ' · something enclosed' : state === 'unopened' ? ' · unopened' : '') + '</small></button></li>';
    });
    h += '</ul>';
  }
  h += '<button class="ghost" onclick="closeModal()">Close</button></div>';
  modal(h);
}

function openLetter(id) {
  var m = worldContent('mail', id);
  if (!m || !mailDelivered(m)) return;
  if (worldMark('seen', 'mail', id)) saveGame();
  renderLetter(m);
  if (typeof renderTopbar === 'function') renderTopbar();
}

function renderLetter(m, note) {
  var h = '<article class="letter letter-' + m.type + '"><span class="eyebrow">' + MAIL_TYPES[m.type] + ' from ' + esc(mailSenderName(m)) + '</span>' +
    '<h2>' + esc(m.title) + '</h2>' +
    m.body.split('\n\n').map(function (p) { return '<p class="scene-prose">' + esc(p) + '</p>'; }).join('') +
    '<p class="letter-sign">' + esc(m.sign || ('- ' + mailSenderName(m))) + '</p>';
  if (m.attachment) {
    h += mailTaken(m)
      ? '<p class="small">Enclosed: ' + esc(mailEnclosureText(m)) + '. Already in your bag.</p>'
      : '<p class="small">Enclosed: ' + esc(mailEnclosureText(m)) + '.</p><button class="primary" onclick="takeEnclosure(\'' + m.id + '\')">Take it</button>';
  }
  if (m.invitation) {
    var loc = typeof locationById === 'function' ? mailInvitationPlace(m) : null;
    if (loc && loc.open) h += '<button onclick="closeModal();openTown(\'' + m.invitation.location + '\')">Go to ' + esc(loc.name) + '</button>';
    else if (loc) h += '<p class="small">' + esc(loc.name) + ' is not open to you yet. The invitation will keep.</p>';
    else h += '<p class="small">That is on the other side of the water. The invitation will keep.</p>';
  }
  if (note) h += '<p class="friend-change">' + esc(note) + '</p>';
  h += '<div class="row" style="justify-content:center;margin-top:12px"><button class="ghost" onclick="renderMailbox()">Back to the mailbox</button></div></article>';
  modal(h);
}

function mailInvitationPlace(m) {
  var id = m.invitation.location;
  var list = (window.LOCATIONS || []).filter(function (l) { return l.id === id; });
  if (!list.length) return null;
  return { name: list[0].name, open: typeof locationOpen === 'function' ? locationOpen(list[0]) : true };
}

function takeEnclosure(id) {
  var m = worldContent('mail', id);
  if (!m || !m.attachment || !mailDelivered(m)) return;
  var granted = claimWorldReward('mail', id, m.attachment);
  if (granted) saveGame();
  renderLetter(m, granted ? 'Added to your bag: ' + mailEnclosureText(m) + '.' :
    mailTaken(m) ? '' : 'Your bag has no room for that right now. It will keep.');
  if (typeof renderTopbar === 'function') renderTopbar();
}
