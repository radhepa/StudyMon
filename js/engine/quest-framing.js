/* Phase 6 Slices 5-6: story framing and completion reactions for the
   substantial C labs (js/data/quest-framing.js).

   Read-only toward everything a quest owns. The only state written is
   S.questFraming = { version: 1, records: { questId: record } } where a record
   holds just three facts:
     guidance     true once the hints for that quest have been opened
     outcome      the coarse completion outcome, fixed the first time the
                  finished quest is viewed ('independent' | 'persisted' | 'guided')
     seenClock / seenAt   when that first completed view happened, so later
                  visits can move on to an acknowledgment
   No attempt counts, timings or scores are copied out of the quest record. */

var QUEST_FRAMING_VERSION = 1;
var QUEST_FRAMING_OUTCOMES = ['independent', 'persisted', 'guided'];
var QUEST_FRAMING_ACK_CLOCK = 10;                 // answered questions after the first completed view
var QUEST_FRAMING_ACK_MS = 6 * 60 * 60 * 1000;    // or a later sitting

function freshQuestFramingRecord() {
  return { guidance: false, outcome: null, seenClock: null, seenAt: null };
}

function normalizeQuestFramingRecord(record) {
  var base = freshQuestFramingRecord();
  if (!record || typeof record !== 'object' || Array.isArray(record)) return base;
  base.guidance = record.guidance === true;
  base.outcome = QUEST_FRAMING_OUTCOMES.indexOf(record.outcome) >= 0 ? record.outcome : null;
  base.seenClock = Number.isFinite(Number(record.seenClock)) && record.seenClock !== null ? Math.max(0, Math.floor(Number(record.seenClock))) : null;
  base.seenAt = Number.isFinite(Number(record.seenAt)) && record.seenAt !== null ? Math.max(0, Math.floor(Number(record.seenAt))) : null;
  if (base.outcome === null) { base.seenClock = null; base.seenAt = null; }
  return base;
}

function ensureQuestFraming() {
  if (!S) return;
  var box = S.questFraming;
  if (!box || typeof box !== 'object' || Array.isArray(box)) box = S.questFraming = { version: QUEST_FRAMING_VERSION, records: {} };
  if (!box.records || typeof box.records !== 'object' || Array.isArray(box.records)) box.records = {};
  box.version = QUEST_FRAMING_VERSION;
  Object.keys(box.records).forEach(function (id) { box.records[id] = normalizeQuestFramingRecord(box.records[id]); });
}

function questFrameFor(questId) { return (window.QUEST_FRAMING || {})[questId] || null; }

function questFramingRecord(questId, create) {
  ensureQuestFraming();
  if (S.questFraming.records[questId]) return S.questFraming.records[questId];
  if (!create || !questFrameFor(questId)) return null;
  return S.questFraming.records[questId] = freshQuestFramingRecord();
}

/* Opening the hints is the only guidance signal the game has. */
function questFramingNoteGuidance(questId) {
  var record = questFramingRecord(questId, true);
  if (!record || record.guidance) return false;
  record.guidance = true;
  return true;
}

/* Coarse and respectful: which route got the job done, never how well. A
   failed submission before the pass counts as persistence even if hints were
   also used, because that is the part worth acknowledging. */
function questFramingOutcome(progress, record) {
  var attempts = progress && Array.isArray(progress.attempts) ? progress.attempts : [];
  if (attempts.some(function (a) { return a && a.complete === false; })) return 'persisted';
  if (record && record.guidance) return 'guided';
  return 'independent';
}

function questGiverName(frame, quest) {
  var member = typeof castById === 'function' ? castById(frame.giverId) : null;
  return member ? member.name : (quest && quest.giver) || 'Someone';
}

/* Which framing line applies right now. With {record:true} the first view of
   a completed quest fixes its outcome; nothing else is ever written. */
function questFramingStage(questId, options) {
  var frame = questFrameFor(questId), quest = typeof questById === 'function' ? questById(questId) : null;
  if (!frame || !quest || !S) return null;
  var progress = S.sideQuests && S.sideQuests.records && S.sideQuests.records[questId];
  var status = progress ? progress.status : 'not-started';
  var out = { frameId: frame.frameId, questId: questId, giverId: frame.giverId, giver: questGiverName(frame, quest),
    stage: 'offer', outcome: null, text: frame.offer };
  if (status === 'in-progress' || status === 'needs-revision') { out.stage = 'in-progress'; out.text = frame.inProgress; return out; }
  if (status !== 'completed') return out;
  var record = questFramingRecord(questId, !!(options && options.record));
  var outcome = record && record.outcome ? record.outcome : questFramingOutcome(progress, record);
  if (options && options.record && record && !record.outcome) {
    record.outcome = outcome;
    record.seenClock = Math.max(0, Number(S.activityClock) || 0);
    record.seenAt = Date.now();
  }
  out.outcome = outcome;
  var later = record && record.outcome && record.seenClock !== null &&
    ((Number(S.activityClock) || 0) - record.seenClock >= QUEST_FRAMING_ACK_CLOCK ||
     (record.seenAt !== null && Date.now() - record.seenAt >= QUEST_FRAMING_ACK_MS));
  if (later) { out.stage = 'acknowledgment'; out.text = frame.acknowledgment; }
  else { out.stage = 'complete'; out.text = frame.complete[outcome]; }
  return out;
}

function questFramingPanel(questId) {
  var stage = questFramingStage(questId, { record: true });
  if (!stage) return '';
  var label = stage.stage === 'offer' ? 'asks a favour' : stage.stage === 'in-progress' ? 'checks in'
    : stage.stage === 'complete' ? 'on the finished job' : 'some time later';
  return '<section class="panel sq-framing" data-frame="' + esc(stage.frameId) + '" data-stage="' + stage.stage + '">' +
    '<span class="eyebrow">' + esc(stage.giver) + ' · ' + label + '</span>' +
    '<p class="scene-prose">' + esc(stage.text) + '</p></section>';
}

/* ---- validation (tools/check-quest-framing.cjs) -------------------------- */

var QUEST_FRAMING_FORBIDDEN = /\b(stupid|lazy|failure|cheated|cheater|should have|finally got it|took you long|about time)\b/i;

function validateQuestFraming() {
  var errors = [], frames = window.QUEST_FRAMING || {}, frameIds = {}, texts = {};
  // The midterm review labs (collection 'midterm-review') are framed by their
  // cutscenes in js/data/lab-scenes.js instead, so only the original hard labs count here.
  var hard = (window.SIDE_QUESTS || []).filter(function (q) { return q.published && q.difficulty === 'hard' && q.collection !== 'midterm-review'; }).map(function (q) { return q.id; }).sort();
  var framed = Object.keys(frames).sort();
  if (JSON.stringify(hard) !== JSON.stringify(framed)) errors.push('framed quests should be exactly the hard labs: ' + framed.join(','));
  framed.forEach(function (questId) {
    var f = frames[questId], quest = (window.SIDE_QUESTS || []).find(function (q) { return q.id === questId; });
    if (!quest) { errors.push(questId + ': no such quest'); return; }
    if (f.frameId !== 'frame-' + questId) errors.push(questId + ': unstable frame ID');
    if (frameIds[f.frameId]) errors.push(questId + ': duplicate frame ID');
    frameIds[f.frameId] = true;
    var member = typeof castById === 'function' ? castById(f.giverId) : null;
    if (!member) errors.push(questId + ': giver ' + f.giverId + ' is not in the cast');
    else if (member.name !== quest.giver) errors.push(questId + ': giver ' + member.name + ' does not match quest giver ' + quest.giver);
    var lines = [f.offer, f.inProgress, f.acknowledgment].concat(QUEST_FRAMING_OUTCOMES.map(function (o) { return (f.complete || {})[o]; }));
    lines.forEach(function (text) {
      if (typeof text !== 'string' || text.trim().length < 30) errors.push(questId + ': missing or fragmentary line');
      else {
        if (QUEST_FRAMING_FORBIDDEN.test(text)) errors.push(questId + ': judgemental wording: ' + text.slice(0, 40));
        if (texts[text]) errors.push(questId + ': duplicate line');
        texts[text] = true;
      }
    });
  });
  return errors;
}
