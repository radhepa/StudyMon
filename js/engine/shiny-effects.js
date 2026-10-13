/* Shiny entrances: original pixel sparkles and a short handheld-style chime.
   This cue always plays, independently of the optional Pokemon cry setting. */
var SHINY_BATTLE_EFFECTS = (function () {
  var owner = null, seenFoes = [], lastYou = null, pending = null;
  var context = null, voices = [];
  var points = [
    [18, 25, 0], [43, 11, 70], [74, 17, 140], [89, 43, 210],
    [76, 72, 280], [48, 83, 350], [19, 69, 420], [9, 46, 490]
  ];
  var starSvg = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" shape-rendering="crispEdges">' +
    '<path fill="#1b1b2f" d="M7 0h2v3h1v2h1v1h2v1h3v2h-3v1h-2v1h-1v2H9v3H7v-3H6v-2H5v-1H3V9H0V7h3V6h2V5h1V3h1z"/>' +
    '<path fill="#f2c14e" d="M7 2h2v3h1v2h3v2h-3v2H9v3H7v-3H6V9H3V7h3V5h1z"/>' +
    '<path fill="#fff7d6" d="M7 5h2v2h2v2H9v2H7V9H5V7h2z"/></svg>';

  function currentBattle() {
    return typeof B !== 'undefined' && B && typeof CUR !== 'undefined' && CUR === 'battle' ? B : null;
  }

  function currentMon(side) {
    var battle = currentBattle();
    return battle && (side === 'foe' ? battle.foes[battle.foeIx] : battle.you);
  }

  function validCue(cue) {
    if (!cue || currentBattle() !== cue.battle || document.hidden) return false;
    return cue.entries.some(function (entry) {
      var slot = document.querySelector('.bf-' + entry.side + '[data-shiny="true"]');
      return slot && currentMon(entry.side) === entry.mon &&
        (entry.side !== 'foe' || cue.battle.foeIx === entry.foeIx);
    });
  }

  function stopVoices() {
    voices.forEach(function (voice) {
      try { voice.stop(); } catch (err) { /* Already finished. */ }
    });
    voices = [];
  }

  function audioContext() {
    if (context && context.state !== 'closed') return context;
    var AudioClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioClass) return null;
    try { context = new AudioClass(); } catch (err) { context = null; }
    return context;
  }

  function note(frequency, start, duration, type, volume) {
    var oscillator = context.createOscillator(), gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    voices.push(oscillator);
    oscillator.onended = function () {
      oscillator.disconnect(); gain.disconnect();
      var index = voices.indexOf(oscillator);
      if (index !== -1) voices.splice(index, 1);
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.012);
  }

  function flushCue() {
    if (!validCue(pending)) { pending = null; return; }
    if (!context || context.state !== 'running') return;
    pending = null;
    stopVoices();
    /* A rising broken chord, followed by three airy twinkles. Original audio;
       the quiet square overtone gives it the game cartridge's bright edge. */
    var start = context.currentTime + 0.012;
    var melody = [1046.5, 1318.51, 1567.98, 2093, 2637.02];
    melody.forEach(function (frequency, index) {
      note(frequency, start + index * 0.065, 0.15, 'triangle', 0.07);
      note(frequency * 2, start + index * 0.065, 0.065, 'square', 0.011);
    });
    [3135.96, 2637.02, 4186].forEach(function (frequency, index) {
      note(frequency, start + 0.39 + index * 0.075, 0.14, 'sine', 0.044);
    });
  }

  function unlockAudio(event) {
    if (!event.isTrusted) return;
    var audio = audioContext();
    if (!audio) { pending = null; return; }
    if (audio.state === 'running') { flushCue(); return; }
    if (audio.state === 'suspended' && audio.resume) {
      try {
        var resumed = audio.resume();
        if (resumed && resumed.then) resumed.then(flushCue).catch(function () {});
      } catch (err) { /* The next trusted gesture can try again. */ }
    }
  }

  function requestCue(entries) {
    pending = { battle: owner, entries: entries };
    audioContext();
    flushCue();
    /* Audio may still be suspended if this encounter was opened without a
       gesture. The trusted-input listeners unlock only the current cue. */
  }

  function makeStars(className, list) {
    var layer = document.createElement('span');
    layer.className = 'shiny-sparkles ' + className;
    layer.setAttribute('aria-hidden', 'true');
    list.forEach(function (point, index) {
      var star = document.createElement('span');
      star.className = 'shiny-pixel-star';
      star.style.setProperty('--shine-x', point[0] + '%');
      star.style.setProperty('--shine-y', point[1] + '%');
      star.style.setProperty('--shine-delay', point[2] + 'ms');
      star.style.setProperty('--shine-size', (index % 3 === 0 ? 1.2 : 1) + '');
      star.innerHTML = starSvg;
      layer.appendChild(star);
    });
    return layer;
  }

  function render() {
    var battle = currentBattle();
    if (!battle) { stop(); return; }
    if (battle !== owner) {
      stopVoices(); pending = null;
      owner = battle; seenFoes = []; lastYou = null;
    }
    var entries = [];
    ['foe', 'you'].forEach(function (side) {
      var slot = document.querySelector('.bf-' + side), mon = currentMon(side);
      if (!slot || !mon || slot.dataset.shiny !== 'true') return;
      if (!slot.querySelector('.shiny-ambient')) {
        slot.appendChild(makeStars('shiny-ambient', [points[0], points[2], points[4], points[6]]));
      }
      var seen = side === 'foe' ? seenFoes.some(function (entry) {
        return entry.foeIx === battle.foeIx && entry.mon === mon;
      }) : lastYou === mon;
      if (seen) return;
      if (side === 'foe') seenFoes.push({ foeIx: battle.foeIx, mon: mon });
      slot.classList.add('shiny-entrance');
      var burst = makeStars('shiny-burst', points);
      slot.appendChild(burst);
      var cleanup = function () {
        if (burst.parentNode) burst.parentNode.removeChild(burst);
        slot.classList.remove('shiny-entrance');
      };
      /* Removing the spent burst keeps each battle lightweight. A detached
         slot can finish harmlessly if a switch redraws the battlefield. */
      setTimeout(cleanup, 1700);
      entries.push({ side: side, mon: mon, foeIx: battle.foeIx });
    });
    /* Every sent-out player counts, including ordinary monsters. Returning
       to a shiny partner is a fresh entrance; an unchanged redraw is not. */
    lastYou = battle.you;
    if (entries.length) requestCue(entries);
    else if (!validCue(pending)) pending = null;
  }

  function stop() {
    pending = null;
    stopVoices();
    document.querySelectorAll('.shiny-sparkles').forEach(function (layer) { layer.remove(); });
    document.querySelectorAll('.shiny-entrance').forEach(function (slot) { slot.classList.remove('shiny-entrance'); });
    owner = null; seenFoes = []; lastYou = null;
  }

  document.addEventListener('pointerdown', unlockAudio, true);
  document.addEventListener('keydown', unlockAudio, true);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { pending = null; stopVoices(); }
  });
  return { render: render, stop: stop };
})();

function renderShinyBattleEffects() { SHINY_BATTLE_EFFECTS.render(); }
function stopShinyBattleEffects() { SHINY_BATTLE_EFFECTS.stop(); }
