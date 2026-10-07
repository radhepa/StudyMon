/* Pokedoro: a Pomodoro-style focus timer. A 🍅 chip beside the Radio opens a
   panel with a Focus / Short Break / Long Break cycle. Every minute spent in
   a completed or skipped Focus phase pays your whole living, sub-100 party
   in XP, through the same giveXp() battle uses - so studying with the timer
   running levels your team even between battles. A phase ending also rings
   a short repeating alarm (see "alarm" below), separate from the Radio.

   The timer itself (phase, remaining time, settings, lifetime stats) is a
   listening-style preference, not game progress, so it lives in its own
   localStorage key like the Radio's does - kept out of the save file. The XP
   it grants is real progress, so that part always goes through S.party and
   saveGame(), exactly like a battle win.

   Time is tracked as an absolute "endsAt" timestamp rather than a tick count,
   so the countdown is correct even after the tab was backgrounded, throttled,
   or closed and reopened - only one phase is ever auto-completed on return,
   never a cascade of missed cycles. */

var POKEDORO_STORE_KEY = 'studymon.pokedoro.v1';
var POKEDORO_BASE_TITLE = document.title;

/* XP scales with the mon's own current level rather than a flat rate, so
   grinding a level 80 isn't the same few minutes as a level 5. Calibrated so
   a level 1 mon hits exactly one level per hour of focus (xpToNext(1)/60 XP
   per minute); the rate then grows linearly with level, which makes minutes-
   per-level grow roughly linearly too (xpToNext itself grows quadratically),
   so high levels take meaningfully longer without turning into a grind wall. */
function pokedoroXpPerMinute(lvl) {
  return xpToNext(1) / 60 * Math.max(1, lvl);
}

var POKEDORO = {
  phase: 'focus',          // 'focus' | 'short' | 'long'
  running: false,
  endsAt: 0,                // epoch ms; valid while running
  remainingMs: 25 * 60000,  // valid while paused/idle
  phaseTotalMs: 25 * 60000, // full length this phase instance started at, for the progress bar
  cyclesDone: 0,             // completed focus sessions since the last long break
  totalSessions: 0,          // lifetime completed focus sessions
  totalFocusMs: 0,            // lifetime focused milliseconds (completed + skipped-early)
  focusMin: 25,
  shortMin: 5,
  longMin: 15,
  cyclesUntilLong: 4,
  panelOpen: false,
  tickTimer: 0,
  alarmActive: false,
  alarmTimer: 0,
  alarmCount: 0
};

/* ---- settings + lifetime stats (own key, not the save file) --------------- */

function pokedoroLoadSettings() {
  try {
    var saved = JSON.parse(localStorage.getItem(POKEDORO_STORE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return;
    if (['focus', 'short', 'long'].indexOf(saved.phase) >= 0) POKEDORO.phase = saved.phase;
    POKEDORO.running = !!saved.running;
    if (typeof saved.endsAt === 'number') POKEDORO.endsAt = saved.endsAt;
    if (typeof saved.remainingMs === 'number' && saved.remainingMs >= 0) POKEDORO.remainingMs = saved.remainingMs;
    if (typeof saved.phaseTotalMs === 'number' && saved.phaseTotalMs > 0) POKEDORO.phaseTotalMs = saved.phaseTotalMs;
    if (typeof saved.cyclesDone === 'number') POKEDORO.cyclesDone = Math.max(0, Math.floor(saved.cyclesDone));
    if (typeof saved.totalSessions === 'number') POKEDORO.totalSessions = Math.max(0, Math.floor(saved.totalSessions));
    if (typeof saved.totalFocusMs === 'number') POKEDORO.totalFocusMs = Math.max(0, saved.totalFocusMs);
    if (pokedoroValidMinutes(saved.focusMin)) POKEDORO.focusMin = saved.focusMin;
    if (pokedoroValidMinutes(saved.shortMin)) POKEDORO.shortMin = saved.shortMin;
    if (pokedoroValidMinutes(saved.longMin)) POKEDORO.longMin = saved.longMin;
    if (typeof saved.cyclesUntilLong === 'number' && saved.cyclesUntilLong >= 1) POKEDORO.cyclesUntilLong = Math.floor(saved.cyclesUntilLong);
  } catch (error) { }
}

function pokedoroValidMinutes(n) { return typeof n === 'number' && n >= 1 && n <= 180; }

function pokedoroSaveSettings() {
  try {
    localStorage.setItem(POKEDORO_STORE_KEY, JSON.stringify({
      phase: POKEDORO.phase, running: POKEDORO.running, endsAt: POKEDORO.endsAt,
      remainingMs: POKEDORO.remainingMs, phaseTotalMs: POKEDORO.phaseTotalMs,
      cyclesDone: POKEDORO.cyclesDone, totalSessions: POKEDORO.totalSessions, totalFocusMs: POKEDORO.totalFocusMs,
      focusMin: POKEDORO.focusMin, shortMin: POKEDORO.shortMin, longMin: POKEDORO.longMin,
      cyclesUntilLong: POKEDORO.cyclesUntilLong
    }));
  } catch (error) { }
}

/* ---- time math ------------------------------------------------------------- */

function pokedoroPhaseMinutes(phase) {
  return phase === 'focus' ? POKEDORO.focusMin : phase === 'long' ? POKEDORO.longMin : POKEDORO.shortMin;
}
function pokedoroRemainingMs() {
  return Math.max(0, POKEDORO.running ? POKEDORO.endsAt - Date.now() : POKEDORO.remainingMs);
}
function pokedoroElapsedMs() {
  return Math.max(0, POKEDORO.phaseTotalMs - pokedoroRemainingMs());
}
function pokedoroProgressPct() {
  return POKEDORO.phaseTotalMs ? Math.max(0, Math.min(100, 100 * pokedoroElapsedMs() / POKEDORO.phaseTotalMs)) : 0;
}
function pokedoroFormatTime(ms) {
  var total = Math.ceil(ms / 1000);
  var m = Math.floor(total / 60), s = total % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}
function pokedoroFormatHours(ms) {
  var mins = Math.round(ms / 60000);
  var h = Math.floor(mins / 60), m = mins % 60;
  return h ? (h + 'h ' + m + 'm') : (m + 'm');
}
function pokedoroPhaseLabel(phase) {
  return phase === 'focus' ? 'Focus' : phase === 'long' ? 'Long Break' : 'Short Break';
}

/* ---- XP: the whole point --------------------------------------------------- */

/* Mirrors battleXpAwards()'s fainted/level-100 exclusion in battle.js, so
   studying follows the same rule battling does. Each mon is paid at its own
   level's rate (see pokedoroXpPerMinute), so a session's total varies by who
   is in the party - the toast reports that total, not a per-mon figure. */
function pokedoroAwardXp(minutes) {
  if (!S || !S.party || !S.party.length) return;
  var total = 0, leveled = [], evolved = [];
  S.party.forEach(function (mon) {
    if (mon.hp <= 0 || mon.lvl >= 100) return;
    var amount = Math.max(1, Math.round(minutes * pokedoroXpPerMinute(mon.lvl)));
    total += amount;
    var events = giveXp(mon, amount);
    events.forEach(function (e) {
      if (e.kind === 'level') leveled.push(e);
      if (e.kind === 'evolve') { S.seen[e.id] = true; S.caught[e.id] = true; evolved.push(e); }
    });
  });
  if (total <= 0) return;
  saveGame();
  if (typeof renderParty === 'function') renderParty();
  if (typeof renderTopbar === 'function') renderTopbar();

  var summary = '🍅 +' + total + ' XP to your team from studying.';
  if (leveled.length) {
    var names = leveled.map(function (e) { return e.name; }).filter(function (n, i, a) { return a.indexOf(n) === i; });
    summary += ' ' + names.join(', ') + (names.length > 1 ? ' grew a level!' : ' grew a level!');
  }
  toast(summary);
  evolved.forEach(function (e) { if (typeof showEvolve === 'function') showEvolve(e); });
}

function pokedoroBankFocusTime(minutes, completed) {
  minutes = Math.max(0, minutes);
  if (minutes >= 0.5) {
    POKEDORO.totalFocusMs += minutes * 60000;
    pokedoroAwardXp(minutes);
  }
  if (completed) POKEDORO.totalSessions++;
}

/* ---- transport -------------------------------------------------------------- */

function pokedoroEnsureTicking() {
  if (POKEDORO.tickTimer) return;
  POKEDORO.tickTimer = setInterval(pokedoroTick, 1000);
}
function pokedoroStopTicking() {
  clearInterval(POKEDORO.tickTimer);
  POKEDORO.tickTimer = 0;
}

function pokedoroSetPhase(next) {
  POKEDORO.phase = next;
  var ms = pokedoroPhaseMinutes(next) * 60000;
  POKEDORO.phaseTotalMs = ms;
  POKEDORO.remainingMs = ms;
  POKEDORO.endsAt = 0;
}

function pokedoroStart() {
  if (POKEDORO.running || pokedoroRemainingMs() <= 0) return;
  pokedoroStopAlarm();
  POKEDORO.endsAt = Date.now() + POKEDORO.remainingMs;
  POKEDORO.running = true;
  pokedoroEnsureTicking();
  pokedoroSaveSettings();
  pokedoroRefresh();
}

function pokedoroPause() {
  if (!POKEDORO.running) return;
  POKEDORO.remainingMs = pokedoroRemainingMs();
  POKEDORO.running = false;
  POKEDORO.endsAt = 0;
  pokedoroStopTicking();
  pokedoroSaveSettings();
  pokedoroRefresh();
}

function pokedoroToggle() { POKEDORO.running ? pokedoroPause() : pokedoroStart(); }

/* Ends the current phase now. A focus phase banks XP for the elapsed time and
   always drops to a short break (it wasn't a completed cycle, so it doesn't
   earn the long-break cadence); a break just returns to focus. */
function pokedoroSkip() {
  pokedoroStopAlarm();
  if (POKEDORO.phase === 'focus') {
    pokedoroBankFocusTime(pokedoroElapsedMs() / 60000, false);
    pokedoroSetPhase('short');
  } else {
    pokedoroSetPhase('focus');
  }
  POKEDORO.running = false;
  pokedoroStopTicking();
  pokedoroSaveSettings();
  pokedoroRefresh();
}

/* Natural completion: the phase ran its full course. */
function pokedoroComplete() {
  if (POKEDORO.phase === 'focus') {
    pokedoroBankFocusTime(POKEDORO.focusMin, true);
    POKEDORO.cyclesDone++;
    pokedoroSetPhase(POKEDORO.cyclesDone % POKEDORO.cyclesUntilLong === 0 ? 'long' : 'short');
    toast('🔔 Focus session complete - break time.');
  } else {
    pokedoroSetPhase('focus');
    toast('🔔 Break’s over, ready when you are.');
  }
  POKEDORO.running = false;
  pokedoroStopTicking();
  pokedoroStartAlarm();
  pokedoroSaveSettings();
  pokedoroRefresh();
}

/* Discards the in-progress phase with no credit and starts a clean cycle. */
function pokedoroReset() {
  if (POKEDORO.phase === 'focus' && pokedoroElapsedMs() > 60000 &&
    !confirm('Reset and lose this session’s progress?')) return;
  pokedoroStopAlarm();
  POKEDORO.running = false;
  POKEDORO.cyclesDone = 0;
  pokedoroStopTicking();
  pokedoroSetPhase('focus');
  pokedoroSaveSettings();
  pokedoroRefresh();
}

function pokedoroTick() {
  if (POKEDORO.running && pokedoroRemainingMs() <= 0) {
    if (S) pokedoroComplete();  // no save yet (title screen): retry next tick once one exists
    return;
  }
  pokedoroUpdateTitle();
  pokedoroUpdateTimeDisplay();
}

/* ---- settings --------------------------------------------------------------- */

function pokedoroSetDuration(key, value) {
  var n = Math.max(1, Math.min(180, Math.round(Number(value) || 1)));
  POKEDORO[key] = n;
  var phaseOf = { focusMin: 'focus', shortMin: 'short', longMin: 'long' };
  if (!POKEDORO.running && phaseOf[key] === POKEDORO.phase) {
    POKEDORO.phaseTotalMs = n * 60000;
    POKEDORO.remainingMs = n * 60000;
  }
  pokedoroSaveSettings();
  pokedoroRefresh();
}

function pokedoroSetCycles(value) {
  POKEDORO.cyclesUntilLong = Math.max(1, Math.min(12, Math.round(Number(value) || 1)));
  pokedoroSaveSettings();
  pokedoroRefresh();
}

/* ---- the alarm: a repeating ring on phase change, not a one-shot chime ------- */

var POKEDORO_ALARM_REPEATS = 8;
var POKEDORO_ALARM_GAP_MS = 1800;

/* Rings until dismissed (any transport action, or the panel's Dismiss button)
   or until it has rung POKEDORO_ALARM_REPEATS times on its own - long enough
   to notice from another room, short enough not to nag once you're back. */
function pokedoroStartAlarm() {
  pokedoroStopAlarm();
  POKEDORO.alarmActive = true;
  POKEDORO.alarmCount = 0;
  pokedoroAlarmBeep();
  POKEDORO.alarmTimer = setInterval(function () {
    POKEDORO.alarmCount++;
    if (POKEDORO.alarmCount >= POKEDORO_ALARM_REPEATS) { pokedoroStopAlarm(); return; }
    pokedoroAlarmBeep();
  }, POKEDORO_ALARM_GAP_MS);
  pokedoroRefresh();
}

function pokedoroStopAlarm() {
  if (!POKEDORO.alarmActive) return;
  clearInterval(POKEDORO.alarmTimer);
  POKEDORO.alarmTimer = 0;
  POKEDORO.alarmActive = false;
  pokedoroRefresh();
}

/* Gated by the game's sound setting, same as a cry or any other SFX. The
   ringing chip + panel banner still show with sound off. */
function pokedoroAlarmBeep() {
  if (!S || !S.settings || !S.settings.sound) return;
  try {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    var context = new AudioContextClass();
    var notes = POKEDORO.phase === 'focus' ? [880, 880, 1175] : [660, 660, 880];
    notes.forEach(function (freq, i) {
      var t = context.currentTime + i * 0.17;
      var osc = context.createOscillator();
      var gain = context.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(.0001, t);
      gain.gain.linearRampToValueAtTime(.16, t + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, t + .15);
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start(t);
      osc.stop(t + .17);
    });
    setTimeout(function () { try { context.close(); } catch (error) { } }, 700);
  } catch (error) { }
}

/* ---- document title, so the countdown is glanceable from the tab ------------ */

function pokedoroUpdateTitle() {
  if (!POKEDORO.running) { document.title = POKEDORO_BASE_TITLE; return; }
  var icon = POKEDORO.phase === 'focus' ? '🍅' : '☕';
  document.title = icon + ' ' + pokedoroFormatTime(pokedoroRemainingMs()) + ' — ' + POKEDORO_BASE_TITLE;
}

/* Cheap per-second update: only the countdown text and bar width, not a full
   innerHTML rebuild, so an open panel does not lose focus/scroll every tick. */
function pokedoroUpdateTimeDisplay() {
  var timeEl = document.getElementById('pokedoro-time');
  if (timeEl) timeEl.textContent = pokedoroFormatTime(pokedoroRemainingMs());
  var barEl = document.getElementById('pokedoro-bar-fill');
  if (barEl) barEl.style.width = pokedoroProgressPct() + '%';
  var chipTime = document.getElementById('pokedoro-chip-time');
  if (chipTime) chipTime.textContent = pokedoroFormatTime(pokedoroRemainingMs());
}

/* ---- chip + panel ------------------------------------------------------------ */

function pokedoroChip() {
  if (!S) return '';
  var live = POKEDORO.running;
  var icon = POKEDORO.alarmActive ? '⏰' : (POKEDORO.phase === 'focus' ? '🍅' : '☕');
  return '<button type="button" id="pokedoro-chip" class="chip pokedoro-chip' + (live ? ' live ' + POKEDORO.phase : '') +
    (POKEDORO.alarmActive ? ' ringing' : '') + '" ' +
    'aria-haspopup="dialog" aria-expanded="' + POKEDORO.panelOpen + '" aria-controls="pokedoro-panel" ' +
    'onclick="pokedoroTogglePanel(event)" title="Pokedoro study timer">' +
    '<span aria-hidden="true">' + icon + '</span> Pokedoro' +
    (live ? '<span class="pokedoro-chip-now" id="pokedoro-chip-time">' + esc(pokedoroFormatTime(pokedoroRemainingMs())) + '</span>' : '') +
    (POKEDORO.alarmActive ? '<span class="pokedoro-chip-now">Time’s up!</span>' : '') +
    '</button>';
}

function pokedoroPanelHTML() {
  var cyclePos = (POKEDORO.cyclesDone % POKEDORO.cyclesUntilLong) || (POKEDORO.cyclesDone > 0 ? POKEDORO.cyclesUntilLong : 0);
  var html = '<div class="pokedoro-head"><h2 id="pokedoro-title"><span aria-hidden="true">🍅</span> Pokedoro</h2>' +
    '<button type="button" class="pokedoro-close" onclick="pokedoroClosePanel(true)" aria-label="Close Pokedoro">×</button></div>' +

    (POKEDORO.alarmActive ?
      '<div class="pokedoro-alarm-banner"><span>⏰ Time’s up!</span>' +
        '<button type="button" onclick="pokedoroStopAlarm()">Dismiss</button></div>' : '') +

    '<div class="pokedoro-phase-row">' +
      '<span class="pokedoro-phase-label ' + POKEDORO.phase + '">' + pokedoroPhaseLabel(POKEDORO.phase) + '</span>' +
      '<span class="pokedoro-cycle">🍅 ' + cyclePos + ' of ' + POKEDORO.cyclesUntilLong + '</span>' +
    '</div>' +

    '<div class="pokedoro-time" id="pokedoro-time">' + esc(pokedoroFormatTime(pokedoroRemainingMs())) + '</div>' +
    '<div class="pokedoro-bar"><div class="pokedoro-bar-fill ' + POKEDORO.phase + '" id="pokedoro-bar-fill" style="width:' + pokedoroProgressPct() + '%"></div></div>' +

    '<div class="pokedoro-transport">' +
      '<button type="button" class="primary pokedoro-play" onclick="pokedoroToggle()" aria-label="' + (POKEDORO.running ? 'Pause' : 'Start') + '">' +
        (POKEDORO.running ? '❚❚ Pause' : '▶ Start') + '</button>' +
      '<button type="button" onclick="pokedoroSkip()">⏭ Skip</button>' +
      '<button type="button" class="ghost" onclick="pokedoroReset()">↺ Reset</button>' +
    '</div>' +

    '<p class="pokedoro-note">Your whole party earns XP for every focused minute. Breaks don’t.</p>';

  if (POKEDORO.totalSessions > 0) {
    html += '<p class="pokedoro-stats">🍅 ' + POKEDORO.totalSessions + ' session' + (POKEDORO.totalSessions === 1 ? '' : 's') +
      ' completed · ' + esc(pokedoroFormatHours(POKEDORO.totalFocusMs)) + ' studied</p>';
  }

  html += '<details class="pokedoro-settings"><summary>Timer settings</summary>' +
    '<label class="pokedoro-num">Focus <input type="number" min="1" max="180" value="' + POKEDORO.focusMin +
      '" oninput="pokedoroSetDuration(\'focusMin\',this.value)"> min</label>' +
    '<label class="pokedoro-num">Short break <input type="number" min="1" max="180" value="' + POKEDORO.shortMin +
      '" oninput="pokedoroSetDuration(\'shortMin\',this.value)"> min</label>' +
    '<label class="pokedoro-num">Long break <input type="number" min="1" max="180" value="' + POKEDORO.longMin +
      '" oninput="pokedoroSetDuration(\'longMin\',this.value)"> min</label>' +
    '<label class="pokedoro-num">Sessions until long break <input type="number" min="1" max="12" value="' + POKEDORO.cyclesUntilLong +
      '" oninput="pokedoroSetCycles(this.value)"></label>' +
  '</details>';

  return html;
}

function pokedoroPanelEl() {
  var panel = document.getElementById('pokedoro-panel');
  if (panel) return panel;
  panel = document.createElement('div');
  panel.id = 'pokedoro-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'pokedoro-title');
  panel.hidden = true;
  document.body.appendChild(panel);
  return panel;
}

function pokedoroPlacePanel() {
  var panel = document.getElementById('pokedoro-panel');
  var chip = document.getElementById('pokedoro-chip');
  if (!panel || panel.hidden) return;
  var gutter = 16;
  var width = Math.min(360, window.innerWidth - gutter * 2);
  var rect = chip ? chip.getBoundingClientRect() : { left: gutter, bottom: gutter };
  var top = Math.max(gutter, Math.min(rect.bottom + 8, window.innerHeight - 220));
  var left = Math.max(gutter, Math.min(rect.left, window.innerWidth - width - gutter));
  panel.style.width = width + 'px';
  panel.style.left = left + 'px';
  panel.style.top = top + 'px';
  var bottom = window.innerHeight - gutter;
  var nav = document.getElementById('nav');
  if (nav && getComputedStyle(nav).display !== 'none') {
    bottom = Math.min(bottom, nav.getBoundingClientRect().top - 8);
  }
  panel.style.maxHeight = Math.max(200, bottom - top) + 'px';
}

function pokedoroRefresh() {
  if (POKEDORO.panelOpen) {
    var panel = pokedoroPanelEl();
    var scroll = panel.scrollTop;
    var focusId = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.id : '';
    panel.innerHTML = pokedoroPanelHTML();
    panel.scrollTop = scroll;
    if (focusId && document.getElementById(focusId)) document.getElementById(focusId).focus({ preventScroll: true });
  }
  var chip = document.getElementById('pokedoro-chip');
  if (chip) chip.outerHTML = pokedoroChip();
  pokedoroPlacePanel();
  pokedoroUpdateTitle();
}

function pokedoroOpenPanel() {
  var panel = pokedoroPanelEl();
  POKEDORO.panelOpen = true;
  panel.hidden = false;
  pokedoroRefresh();
  var play = panel.querySelector('.pokedoro-play');
  if (play) play.focus({ preventScroll: true });
}

function pokedoroClosePanel(returnFocus) {
  var panel = document.getElementById('pokedoro-panel');
  POKEDORO.panelOpen = false;
  if (panel) panel.hidden = true;
  var chip = document.getElementById('pokedoro-chip');
  if (returnFocus && chip) chip.focus({ preventScroll: true });
}

function pokedoroTogglePanel(event) {
  if (event) event.stopPropagation();
  if (POKEDORO.panelOpen) pokedoroClosePanel(true);
  else pokedoroOpenPanel();
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && POKEDORO.panelOpen) {
    event.stopPropagation();
    pokedoroClosePanel(true);
  }
}, true);

document.addEventListener('pointerdown', function (event) {
  if (!POKEDORO.panelOpen) return;
  var panel = document.getElementById('pokedoro-panel');
  var chip = document.getElementById('pokedoro-chip');
  if ((panel && panel.contains(event.target)) || (chip && chip.contains(event.target))) return;
  pokedoroClosePanel();
});

window.addEventListener('resize', pokedoroPlacePanel);
window.addEventListener('scroll', pokedoroPlacePanel, { passive: true });

pokedoroLoadSettings();
if (POKEDORO.running) pokedoroEnsureTicking();  // resume ticking after a reload; catch-up completion runs on the first tick once S exists
