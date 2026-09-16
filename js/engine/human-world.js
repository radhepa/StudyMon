/* Bootstrap Town living world.
   A fixed-camera, DOM-sprite prototype layered over generated pixel-art scenes.
   Existing shops, battles, healing, friendship and save data remain authoritative. */

var HUMAN_RAF = 0;
var HUMAN_LAST = 0;
var HUMAN_CLOCK_ACC = 0;
var HUMAN_PLAYER = null;
var HUMAN_ACTORS = [];
var HUMAN_KEYS = {};
var HUMAN_LAST_AXIS = 'vertical';
var HUMAN_MOVE_TARGET = null;
var HUMAN_PENDING = null;
var HUMAN_NEARBY = null;
var HUMAN_DIALOGUE = null;
var HUMAN_SCHEDULE_SIG = '';
var HUMAN_AMBIENT_AT = 0;
var HUMAN_SAVE_AT = 0;
var HUMAN_MUSIC_ON = true;
var HUMAN_MUSIC_AUDIO = null;
var HUMAN_MUSIC_TOKEN = 0;

function humanMusicPattern(text) {
  return text.trim().split(/\s+/).filter(function (token) { return token !== '|'; }).map(function (token) {
    return token === '.' ? null : Number(token);
  });
}

/* "Sunlit Steps" is Bootstrap Town's original theme: a relaxed 16-bar tune
   with a small upward turn in each phrase, meant to suggest an ordinary morning
   becoming an adventure. Scale degrees keep the score compact and make the
   harmony, countermelody and arrangement easy to audit without storing audio. */
var HUMAN_MUSIC_TRACK = {
  id: 'bootstrap_day', name: 'Sunlit Steps', bpm: 82, root: 74, stepsPerBar: 8,
  scale: [0, 2, 4, 5, 7, 9, 11],
  chords: [0, 4, 5, 3, 0, 1, 4, 4, 0, 4, 5, 3, 1, 4, 0, 0],
  melody: humanMusicPattern(
    '0 . 2 4 5 . 4 2 | 1 . 3 5 6 . 5 3 | 2 4 5 . 7 6 5 . | 4 . 3 1 2 . . . | ' +
    '0 2 4 5 . 4 2 1 | 2 . 3 5 . 6 5 . | 4 5 7 . 6 4 2 . | 1 2 4 . 3 1 0 . | ' +
    '4 . 5 7 . 5 4 2 | 3 . 4 6 . 7 6 4 | 5 4 2 . 3 5 4 2 | 1 . 3 2 1 . . . | ' +
    '2 4 5 . 4 2 1 . | 3 5 6 . 5 4 2 . | 4 . 2 5 . 4 1 . | 0 2 4 . 2 1 0 .')
};

function ensureHumanWorld() {
  if (!S) return;
  var defaults = {
    version: 1, day: 1, minute: 480, scene: 'square', spawn: 'southGate',
    playerX: null, playerY: null, weather: null, activity: null,
    returnContext: null, seenMoments: {}, bestWarmup: null
  };
  if (!S.humanWorld || typeof S.humanWorld !== 'object' || Array.isArray(S.humanWorld)) S.humanWorld = {};
  Object.keys(defaults).forEach(function (key) {
    if (!(key in S.humanWorld)) S.humanWorld[key] = defaults[key];
  });
  if (!HUMAN_WORLD_SCENES[S.humanWorld.scene]) S.humanWorld.scene = 'square';
  S.humanWorld.day = Math.max(1, Math.floor(Number(S.humanWorld.day) || 1));
  S.humanWorld.minute = Math.max(360, Math.min(1439, Math.floor(Number(S.humanWorld.minute) || 480)));
  if (!S.humanWorld.weather) S.humanWorld.weather = humanWeatherForDay(S.humanWorld.day);
}

function humanWeatherForDay(day) {
  return ((day * 17 + 11) % 6 === 0 || (day * 29 + 3) % 11 === 0) ? 'rain' : 'clear';
}

function humanScene() {
  ensureHumanWorld();
  return HUMAN_WORLD_SCENES[S.humanWorld.scene] || HUMAN_WORLD_SCENES.square;
}

function humanTimeText(minute) {
  minute = Math.max(0, Math.floor(minute));
  var hour = Math.floor(minute / 60) % 24;
  var mins = minute % 60;
  var suffix = hour >= 12 ? 'PM' : 'AM';
  var twelve = hour % 12 || 12;
  return twelve + ':' + String(mins).padStart(2, '0') + ' ' + suffix;
}

function humanDayName(day) {
  return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][(day - 1) % 7] + ' · Day ' + day;
}

function humanPhase(minute) {
  return minute < 420 ? 'dawn' : minute < 1080 ? 'day' : minute < 1230 ? 'dusk' : 'night';
}

function openHumanWorld(sceneId, spawnId) {
  ensureHumanWorld();
  if (sceneId && HUMAN_WORLD_SCENES[sceneId]) {
    S.humanWorld.scene = sceneId;
    S.humanWorld.spawn = spawnId || Object.keys(HUMAN_WORLD_SCENES[sceneId].spawns)[0];
    S.humanWorld.playerX = null;
    S.humanWorld.playerY = null;
  }
  showScreen('human');
  renderHumanWorld();
}

function renderHumanWorld() {
  ensureHumanWorld();
  humanWorldStop(false);
  document.body.classList.add('human-world-active');
  var root = $('#s-human');
  if (!root) return;
  var scene = humanScene();
  var weather = scene.indoors ? 'Inside' : (S.humanWorld.weather === 'rain' ? 'Rain' : 'Clear');
  root.innerHTML =
    '<header class="human-head panel"><div><span class="eyebrow">BOOTSTRAP TOWN · LIVING WORLD TEST</span>' +
      '<h2>' + esc(scene.name) + '</h2><p>' + esc(scene.subtitle) + '</p></div>' +
      '<div class="human-hud"><span id="human-day">' + esc(humanDayName(S.humanWorld.day)) + '</span>' +
      '<b id="human-time">' + esc(humanTimeText(S.humanWorld.minute)) + '</b>' +
      '<span id="human-weather">' + (weather === 'Rain' ? '🌧 ' : weather === 'Clear' ? '☀️ ' : '⌂ ') + weather + '</span>' +
      '<button id="human-music-toggle" class="human-music-toggle" type="button" aria-pressed="' + HUMAN_MUSIC_ON + '" ' +
        'onclick="humanToggleMusic()" title="' + (HUMAN_MUSIC_ON ? 'Now playing: ' : 'Muted: ') + HUMAN_MUSIC_TRACK.name + '">' +
        (HUMAN_MUSIC_ON ? '🎵 ' + HUMAN_MUSIC_TRACK.name : '🎵 Music: off') + '</button>' +
      '<button class="human-town-map-button" type="button" onclick="humanOpenTownMap()">🗺 Town Map</button>' +
      '<button class="human-exit" onclick="showScreen(\'map\');renderMap()">Leave Town</button></div></header>' +
    '<div class="human-frame"><div id="human-stage" class="human-stage phase-' + humanPhase(S.humanWorld.minute) +
      (scene.indoors ? ' indoors' : '') + (S.humanWorld.weather === 'rain' && !scene.indoors ? ' weather-rain' : '') +
      '" tabindex="0" role="application" aria-label="' + esc(scene.name) + '. Use arrow keys or WASD to move; E, Space, or Enter to interact.">' +
      '<div class="human-daylight" aria-hidden="true"></div><div class="human-rain" aria-hidden="true"></div>' +
      '<div id="human-world-layer"></div><div id="human-activity-layer"></div>' +
      '<div id="human-player" class="human-player walking" aria-label="You"><img alt=""></div>' +
      '<div id="human-prompt" class="human-prompt" aria-live="polite"></div>' +
      '<div id="human-dialogue" class="human-dialogue" aria-live="polite"></div>' +
    '</div></div>' +
    '<div class="human-underbar"><div><b id="human-objective">' + esc(humanObjectiveText()) + '</b>' +
      '<span id="human-status">Walk with WASD or arrows · tap the ground to move · E to interact</span></div>' +
      '<div class="human-time-actions"><button onclick="humanWait(30)">Wait 30m</button>' +
      '<button onclick="humanWait(60)">Wait 1h</button>' +
      (S.humanWorld.activity ? '<button class="ghost" onclick="humanCancelActivity()">Stop activity</button>' : '') +
      '</div></div>' +
    '<details class="human-directory panel"><summary>Town directory and controls</summary><p class="small">' +
      'People follow the clock. Select a name to walk toward them when they are in this scene. The directory is also an accessibility fallback.</p>' +
      '<div id="human-directory-list"></div></details>';

  var stage = $('#human-stage');
  stage.style.backgroundImage = 'url("' + scene.image + '")';
  stage.style.backgroundSize = scene.imageSize || 'cover';
  stage.style.backgroundPosition = scene.imagePosition || 'center';
  humanRenderPortalsAndObjects(scene);
  humanPlacePlayer(scene);
  humanRenderActors();
  humanRenderActivityObjects();
  humanRenderDirectory();
  humanUpdateAtmosphere();
  humanUpdateObjective();
  HUMAN_LAST = performance.now();
  HUMAN_AMBIENT_AT = HUMAN_LAST + 5000;
  HUMAN_SAVE_AT = HUMAN_LAST + 12000;
  HUMAN_SCHEDULE_SIG = humanScheduleSignature();
  HUMAN_RAF = requestAnimationFrame(humanTick);
  if (HUMAN_MUSIC_ON) humanStartMusic();
  setTimeout(function () { if ($('#human-stage')) $('#human-stage').focus({ preventScroll: true }); }, 0);
}

function humanWorldStop(savePosition) {
  if (HUMAN_RAF) cancelAnimationFrame(HUMAN_RAF);
  HUMAN_RAF = 0;
  HUMAN_KEYS = {};
  HUMAN_MOVE_TARGET = null;
  HUMAN_PENDING = null;
  HUMAN_DIALOGUE = null;
  if (document && document.body) document.body.classList.remove('human-dialogue-open');
  if (document && document.body) document.body.classList.remove('human-world-active');
  if (savePosition) humanStopMusic(true);
  if (savePosition && S && S.humanWorld && HUMAN_PLAYER) {
    S.humanWorld.playerX = HUMAN_PLAYER.x;
    S.humanWorld.playerY = HUMAN_PLAYER.y;
    saveGame();
  }
  HUMAN_PLAYER = null;
  HUMAN_ACTORS = [];
}

function humanMusicMidi(degree, shift) {
  var length = HUMAN_MUSIC_TRACK.scale.length;
  var octave = Math.floor(degree / length);
  var index = ((degree % length) + length) % length;
  return HUMAN_MUSIC_TRACK.root + HUMAN_MUSIC_TRACK.scale[index] + octave * 12 + (shift || 0);
}

function humanCreateMusicAudio() {
  if (HUMAN_MUSIC_AUDIO) return HUMAN_MUSIC_AUDIO;
  var AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  try {
    var context = new AudioContextClass();
    var output = context.createGain();
    var warmth = context.createBiquadFilter();
    var compressor = context.createDynamicsCompressor();
    var room = context.createConvolver();
    var roomGain = context.createGain();
    var roomFilter = context.createBiquadFilter();
    var frames = Math.floor(context.sampleRate * 1.35);
    var impulse = context.createBuffer(2, frames, context.sampleRate);
    var seed = 8128;

    for (var channel = 0; channel < 2; channel++) {
      var data = impulse.getChannelData(channel);
      for (var i = 0; i < frames; i++) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        var noise = seed / 4294967296 * 2 - 1;
        data[i] = noise * Math.pow(1 - i / frames, 2.8) * .34;
      }
    }

    output.gain.value = .66;
    warmth.type = 'lowpass';
    warmth.frequency.value = 5400;
    warmth.Q.value = .28;
    room.buffer = impulse;
    roomGain.gain.value = .13;
    roomFilter.type = 'lowpass';
    roomFilter.frequency.value = 3900;
    compressor.threshold.value = -25;
    compressor.knee.value = 24;
    compressor.ratio.value = 2.2;
    compressor.attack.value = .07;
    compressor.release.value = .8;

    output.connect(warmth);
    warmth.connect(compressor);
    output.connect(room);
    room.connect(roomFilter);
    roomFilter.connect(roomGain);
    roomGain.connect(compressor);
    compressor.connect(context.destination);
    HUMAN_MUSIC_AUDIO = { context: context, output: output, active: null };
    return HUMAN_MUSIC_AUDIO;
  } catch (error) {
    return null;
  }
}

function humanMusicVoice(voice) {
  var voices = {
    lead: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .055, attack: .055, cutoff: 3900, vibrato: 4 },
    pizz: { wave: 'triangle', harmonic: 'sine', ratio: 2, harmonicGain: .045, attack: .008, cutoff: 2300 },
    bell: { wave: 'sine', harmonic: 'sine', ratio: 2.5, harmonicGain: .12, attack: .008, cutoff: 6000 },
    pad: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .025, attack: .38, cutoff: 1900 },
    bass: { wave: 'triangle', harmonic: 'sine', ratio: .5, harmonicGain: .055, attack: .035, cutoff: 680 }
  };
  return voices[voice] || voices.lead;
}

function humanScheduleMusicTone(active, midi, time, duration, voice, volume) {
  var context = active.context;
  var settings = humanMusicVoice(voice);
  var frequency = 440 * Math.pow(2, (midi - 69) / 12);
  var envelope = context.createGain();
  var filter = context.createBiquadFilter();
  var primary = context.createOscillator();
  var overtone = context.createOscillator();
  var overtoneGain = context.createGain();
  var attackEnd = time + Math.min(settings.attack, duration * .3);
  var releaseAt = time + Math.max(settings.attack + .025, duration * .56);
  var stopAt = time + duration + .08;

  primary.type = settings.wave;
  primary.frequency.setValueAtTime(frequency, time);
  overtone.type = settings.harmonic;
  overtone.frequency.setValueAtTime(frequency * settings.ratio, time);
  overtoneGain.gain.value = settings.harmonicGain;
  filter.type = 'lowpass';
  filter.frequency.value = settings.cutoff;
  filter.Q.value = .35;
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.linearRampToValueAtTime(volume, attackEnd);
  envelope.gain.setValueAtTime(volume * .72, releaseAt);
  envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);

  if (settings.vibrato) {
    var vibrato = context.createOscillator();
    var vibratoDepth = context.createGain();
    vibrato.type = 'sine';
    vibrato.frequency.value = 5.1;
    vibratoDepth.gain.value = settings.vibrato;
    vibrato.connect(vibratoDepth);
    vibratoDepth.connect(primary.detune);
    vibratoDepth.connect(overtone.detune);
    vibrato.start(time + Math.min(.22, duration * .3));
    vibrato.stop(stopAt);
  }

  primary.connect(filter);
  overtone.connect(overtoneGain);
  overtoneGain.connect(filter);
  filter.connect(envelope);
  envelope.connect(active.bus);
  primary.start(time);
  overtone.start(time);
  primary.stop(stopAt);
  overtone.stop(stopAt);
}

function humanScheduleMusicStep(active) {
  var track = HUMAN_MUSIC_TRACK;
  var step = active.step;
  var stepSeconds = 60 / track.bpm / 2;
  var withinBar = step % track.stepsPerBar;
  var bar = Math.floor(step / track.stepsPerBar);
  var chordDegree = track.chords[bar % track.chords.length];
  var phase = S && S.humanWorld ? humanPhase(S.humanWorld.minute) : 'day';
  var quiet = phase === 'night' || (humanScene && humanScene().indoors);
  var arpeggio = [0, 2, 4, 2, 0, 2, 5, 4];

  if (withinBar === 0) {
    [chordDegree, chordDegree + 2, chordDegree + 4].forEach(function (degree) {
      humanScheduleMusicTone(active, humanMusicMidi(degree, -12), active.nextTime,
        stepSeconds * (track.stepsPerBar - .28), 'pad', quiet ? .0048 : .0062);
    });
    humanScheduleMusicTone(active, humanMusicMidi(chordDegree, -24), active.nextTime,
      stepSeconds * 3.4, 'bass', quiet ? .013 : .017);
  } else if (withinBar === 4) {
    humanScheduleMusicTone(active, humanMusicMidi(chordDegree + 4, -24), active.nextTime,
      stepSeconds * 2.7, 'bass', quiet ? .009 : .012);
  }

  humanScheduleMusicTone(active, humanMusicMidi(chordDegree + arpeggio[withinBar], -12), active.nextTime,
    stepSeconds * .82, 'pizz', quiet ? .0044 : .0061);

  var degree = track.melody[step % track.melody.length];
  if (degree !== null) {
    if (active.cycle % 2 === 1 && bar % track.chords.length === 14 && withinBar === 0) degree += 7;
    humanScheduleMusicTone(active, humanMusicMidi(degree, 0), active.nextTime,
      stepSeconds * 1.7, 'lead', quiet ? .017 : .023);
  }

  if (!quiet && withinBar === 6 && (bar % 4 === 3)) {
    humanScheduleMusicTone(active, humanMusicMidi(chordDegree + 7, 0), active.nextTime,
      stepSeconds * 2.3, 'bell', .0065);
  }
}

function humanMusicScheduler(active) {
  if (!HUMAN_MUSIC_AUDIO || HUMAN_MUSIC_AUDIO.active !== active) return;
  var horizon = active.context.currentTime + .42;
  while (active.nextTime < horizon) {
    humanScheduleMusicStep(active);
    active.nextTime += 60 / HUMAN_MUSIC_TRACK.bpm / 2;
    active.step++;
    if (active.step >= HUMAN_MUSIC_TRACK.melody.length) {
      active.step = 0;
      active.cycle++;
    }
  }
}

function humanMusicMix() {
  return humanScene().indoors ? .66 : 1;
}

function humanStartMusic() {
  if (!HUMAN_MUSIC_ON) return;
  var music = humanCreateMusicAudio();
  if (!music) return;
  if (music.active) {
    var mixNow = music.context.currentTime;
    music.active.bus.gain.cancelScheduledValues(mixNow);
    music.active.bus.gain.setValueAtTime(Math.max(.0001, music.active.bus.gain.value), mixNow);
    music.active.bus.gain.linearRampToValueAtTime(humanMusicMix(), mixNow + .55);
    if (music.context.state === 'suspended') music.context.resume().catch(function () { });
    return;
  }

  var token = ++HUMAN_MUSIC_TOKEN;
  var bus = music.context.createGain();
  bus.gain.setValueAtTime(.0001, music.context.currentTime);
  bus.gain.linearRampToValueAtTime(humanMusicMix(), music.context.currentTime + 1.45);
  bus.connect(music.output);
  var active = {
    context: music.context, bus: bus, step: 0, cycle: 0,
    nextTime: music.context.currentTime + .08, timer: 0, token: token
  };
  music.active = active;
  humanMusicScheduler(active);
  active.timer = setInterval(function () { humanMusicScheduler(active); }, 110);
  if (music.context.state === 'suspended') music.context.resume().catch(function () { });
}

function humanStopMusic(immediate) {
  var music = HUMAN_MUSIC_AUDIO;
  var token = ++HUMAN_MUSIC_TOKEN;
  if (!music) return;
  if (!music.active) {
    if (immediate && music.context.state === 'running') music.context.suspend().catch(function () { });
    return;
  }
  var active = music.active;
  var now = music.context.currentTime;
  clearInterval(active.timer);
  active.bus.gain.cancelScheduledValues(now);
  active.bus.gain.setValueAtTime(Math.max(.0001, active.bus.gain.value), now);
  active.bus.gain.linearRampToValueAtTime(.0001, now + (immediate ? .08 : 1.05));
  music.active = null;
  setTimeout(function () {
    try { active.bus.disconnect(); } catch (error) { }
    if (token === HUMAN_MUSIC_TOKEN && music.context.state === 'running') music.context.suspend().catch(function () { });
  }, immediate ? 120 : 1180);
}

function humanToggleMusic() {
  HUMAN_MUSIC_ON = !HUMAN_MUSIC_ON;
  if (HUMAN_MUSIC_ON) humanStartMusic();
  else humanStopMusic(false);
  var button = $('#human-music-toggle');
  if (button) {
    button.setAttribute('aria-pressed', String(HUMAN_MUSIC_ON));
    button.textContent = HUMAN_MUSIC_ON ? '🎵 ' + HUMAN_MUSIC_TRACK.name : '🎵 Music: off';
    button.title = (HUMAN_MUSIC_ON ? 'Now playing: ' : 'Muted: ') + HUMAN_MUSIC_TRACK.name;
  }
  toast(HUMAN_MUSIC_ON ? HUMAN_MUSIC_TRACK.name + ' begins softly.' : 'Bootstrap Town music turned off.');
}

function humanTownMapNode(id) {
  return ((window.HUMAN_TOWN_MAP || {}).nodes || []).find(function (node) { return node.id === id; });
}

function humanTownMapCurrentScene() {
  return ['mart','center','lab','home'].includes(humanScene().id) ? 'square' : humanScene().id;
}

function humanTownMapDescribe(id) {
  var node = humanTownMapNode(id), detail = $('#human-town-map-detail');
  if (!node || !detail) return;
  var homes = humanHomesInScene(id);
  var buildings = humanBuildingsInScene(id);
  var links = (HUMAN_TOWN_MAP.edges || []).filter(function (edge) { return edge[0] === id || edge[1] === id; }).map(function (edge) {
    var other = humanTownMapNode(edge[0] === id ? edge[1] : edge[0]);
    return other ? other.label : '';
  }).filter(Boolean);
  detail.innerHTML = '<b>' + esc(node.label) + '</b><span>' +
    homes.length + (homes.length === 1 ? ' home' : ' homes') + ' · ' +
    buildings.length + (buildings.length === 1 ? ' public building' : ' public buildings') +
    '</span><small>Paths to ' + esc(links.join(', ')) + '.</small>';
  $$('.human-town-map-node').forEach(function (button) { button.classList.toggle('selected', button.dataset.scene === id); });
}

function humanOpenTownMap() {
  var map = window.HUMAN_TOWN_MAP;
  if (!map) return;
  HUMAN_KEYS = {}; HUMAN_MOVE_TARGET = null; HUMAN_PENDING = null;
  var byId = {};
  map.nodes.forEach(function (node) { byId[node.id] = node; });
  var edges = map.edges.map(function (edge) {
    var a = byId[edge[0]], b = byId[edge[1]];
    return a && b ? '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"></line>' : '';
  }).join('');
  var current = humanTownMapCurrentScene();
  var nodes = map.nodes.map(function (node) {
    return '<button type="button" class="human-town-map-node' + (node.id === current ? ' current selected' : '') +
      '" data-scene="' + node.id + '" style="left:' + node.x + '%;top:' + node.y + '%" ' +
      'onclick="humanTownMapDescribe(\'' + node.id + '\')"><i aria-hidden="true"></i><span>' + esc(node.label) + '</span></button>';
  }).join('');
  modal('<div class="human-town-map"><header><div><span class="eyebrow">BOOTSTRAP COMMUNITY</span><h2>Town Map</h2></div>' +
    '<button class="ghost" type="button" onclick="closeModal()">Close</button></header>' +
    '<div class="human-town-map-canvas" style="background-image:url(\'' + map.image + '\')">' +
      '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + edges + '</svg>' + nodes +
    '</div><div id="human-town-map-detail" class="human-town-map-detail" aria-live="polite"></div>' +
    '<p class="small">This map shows every outdoor district and every real road between them. Interior rooms belong to Bootstrap Town.</p></div>');
  $('#modal .box').classList.add('human-town-map-box');
  humanTownMapDescribe(current);
}

function humanRenderPortalsAndObjects(scene) {
  var layer = $('#human-world-layer');
  // A lamp post a path runs behind: the same scene art, clipped to the prop and
  // depth-sorted by its base, so someone walking behind it is hidden by it.
  (scene.foreground || []).forEach(function (prop) {
    var el = document.createElement('div');
    el.className = 'human-foreground';
    el.setAttribute('aria-hidden', 'true');
    el.style.backgroundImage = 'url("' + scene.image + '")';
    el.style.backgroundSize = scene.imageSize || 'cover';
    el.style.backgroundPosition = scene.imagePosition || 'center';
    el.style.clipPath = 'polygon(' + prop.shape.map(function (p) { return p[0] + '% ' + p[1] + '%'; }).join(', ') + ')';
    el.style.zIndex = String(100 + Math.round(prop.base));
    layer.appendChild(el);
  });
  (scene.portals || []).forEach(function (portal) {
    var b = document.createElement('button');
    b.className = 'human-hotspot human-door';
    b.style.left = portal.x + '%'; b.style.top = portal.y + '%';
    b.innerHTML = '<span>↥</span><small>' + esc(portal.label) + '</small>';
    b.setAttribute('aria-label', 'Enter ' + portal.label);
    b.onclick = function (event) { event.stopPropagation(); humanApproach({ type: 'portal', value: portal, x: portal.x, y: portal.y }); };
    layer.appendChild(b);
  });
  (scene.objects || []).forEach(function (object) {
    var b = document.createElement('button');
    b.className = 'human-hotspot human-object';
    b.style.left = object.x + '%'; b.style.top = object.y + '%';
    b.innerHTML = '<span>' + esc(object.icon) + '</span><small>' + esc(object.label) + '</small>';
    b.setAttribute('aria-label', object.label);
    b.onclick = function (event) { event.stopPropagation(); humanApproach({ type: 'object', value: object, x: object.x, y: object.y }); };
    layer.appendChild(b);
  });
  humanHomesInScene(scene.id).forEach(function (home) {
    var b = document.createElement('button');
    b.className = 'human-hotspot human-home';
    b.style.left = home.doorstep[0] + '%'; b.style.top = home.doorstep[1] + '%';
    b.innerHTML = '<span>⌂</span><small>' + esc(home.name) + '</small>';
    b.setAttribute('aria-label', 'Visit ' + home.name);
    b.onclick = function (event) {
      event.stopPropagation();
      humanApproach({ type: 'home', value: home, x: home.doorstep[0], y: home.doorstep[1] });
    };
    layer.appendChild(b);
  });
  humanBuildingsInScene(scene.id).forEach(function (building) {
    var b = document.createElement('button');
    b.className = 'human-hotspot human-building';
    b.style.left = building.doorstep[0] + '%'; b.style.top = building.doorstep[1] + '%';
    b.innerHTML = '<span>◆</span><small>' + esc(building.name) + '</small>';
    b.setAttribute('aria-label', 'Visit ' + building.name);
    b.onclick = function (event) {
      event.stopPropagation();
      humanApproach({ type: 'building', value: building, x: building.doorstep[0], y: building.doorstep[1] });
    };
    layer.appendChild(b);
  });
}

function humanHomesInScene(sceneId) {
  return (window.COMMUNITY_HOMES || []).filter(function (home) {
    return home.scene === sceneId && home.doorstep && home.doorstep.length === 2;
  });
}

function humanBuildingsInScene(sceneId) {
  return (window.COMMUNITY_BUILDINGS || []).filter(function (building) {
    return building.scene === sceneId && building.doorstep && building.doorstep.length === 2;
  });
}

function humanResidentName(id) {
  var folk = typeof townsfolkById === 'function' ? townsfolkById(id) : null;
  if (folk) return folk.name;
  var trainer = (window.TRAINERS || []).find(function (row) { return row.id === id; });
  return trainer ? trainer.name : id;
}

function humanPlacePlayer(scene) {
  var spawn = scene.spawns[S.humanWorld.spawn] || scene.spawns[Object.keys(scene.spawns)[0]];
  var x = Number(S.humanWorld.playerX), y = Number(S.humanWorld.playerY);
  if (!isFinite(x) || !isFinite(y) || !humanIsWalkable(x, y, scene)) { x = spawn[0]; y = spawn[1]; }
  HUMAN_PLAYER = { x: x, y: y, direction: 'up', moving: false, walkFrame: 1, el: $('#human-player') };
  humanSetSprite(HUMAN_PLAYER, 'player', 'up');
  humanPaint(HUMAN_PLAYER, true);
}

function humanSetSprite(entity, key, direction, front) {
  var img = entity.el.querySelector('img');
  var src;
  // v4 has three real limb poses in all four directions. Frames share a canvas
  // and foot baseline, while the figure within it preserves age-based height.
  var frame = entity.moving ? (entity.walkFrame === undefined ? 1 : entity.walkFrame) : 1;
  if (key) src = 'assets/humans/overworld/' + key + '-' + direction + '-' + frame + '-v4.png';
  else src = front;
  if (img.getAttribute('src') !== src) img.setAttribute('src', src);
  var flip = !key && direction === 'left' ? -1 : 1;
  entity.el.style.setProperty('--face', flip);
  entity.direction = direction;
}

/* Walking vs standing swaps true limb poses; idle always lands on the neutral frame. */
function humanSetMoving(entity, moving, key, front) {
  moving = !!moving;
  entity.el.classList.toggle('walking', moving);
  if (entity.moving === moving) return;
  entity.moving = moving;
  if (!moving) entity.walkFrame = 1;
  humanSetSprite(entity, key, entity.direction || 'down', front);
}

var HUMAN_WALK_SEQUENCE = [0, 1, 2, 1];
function humanAnimateWalk(entity, now, key, front, frameMs) {
  if (!entity.moving) return;
  var frame = HUMAN_WALK_SEQUENCE[Math.floor(now / frameMs) % HUMAN_WALK_SEQUENCE.length];
  if (frame === entity.walkFrame) return;
  entity.walkFrame = frame;
  humanSetSprite(entity, key, entity.direction || 'down', front);
}

function humanNpcState(id, minute) {
  var npc = HUMAN_WORLD_NPCS[id];
  if (!npc) return null;
  minute = minute === undefined ? S.humanWorld.minute : minute;
  var row = npc.schedule[npc.schedule.length - 1], index = npc.schedule.length - 1;
  for (var i = 0; i < npc.schedule.length; i++) {
    if (minute >= npc.schedule[i][0] && minute < npc.schedule[i][1]) { row = npc.schedule[i]; index = i; break; }
  }
  var state = { npc: npc, index: index, scene: row[2], x: row[3], y: row[4], activity: row[5], line: row[6] };
  if (S.humanWorld.weather === 'rain' && state.scene === 'square') {
    if (['practicing','reading','lunch','watering'].indexOf(state.activity) >= 0 && id !== 'postie') {
      var spot = (window.HUMAN_WORLD_RAIN_SPOTS || [])[Object.keys(HUMAN_WORLD_NPCS).indexOf(id)] || [50, 66];
      state.scene = 'center'; state.x = spot[0]; state.y = spot[1]; state.activity = 'sheltering';
      state.line = id === 'nurse' ? 'Rain sounds different from this side of the Centre desk.' : 'Practice moved indoors. Ada said no muddy shoes.';
    }
  }
  if (S.humanWorld.activity && S.humanWorld.activity.id === 'bellRound' && id === 'postie') {
    state.scene = S.humanWorld.scene;
    state.x = HUMAN_PLAYER ? Math.max(8, HUMAN_PLAYER.x - 4) : 46;
    state.y = HUMAN_PLAYER ? HUMAN_PLAYER.y : 78;
    state.activity = 'following'; state.line = 'Lead on. Parcels in order: Mart, Centre, lab.';
  }
  return state;
}

function humanScheduleSignature() {
  return Object.keys(HUMAN_WORLD_NPCS).map(function (id) {
    var s = humanNpcState(id); return id + ':' + s.scene + ':' + s.index + ':' + s.activity;
  }).join('|');
}

/* Snap render: everyone who belongs in this scene appears at their schedule spot. */
function humanRenderActors() {
  HUMAN_ACTORS.forEach(function (actor) { if (actor.el && actor.el.parentNode) actor.el.remove(); });
  HUMAN_ACTORS = [];
  if (!$('#human-world-layer')) return;
  Object.keys(HUMAN_WORLD_NPCS).forEach(function (id) {
    var state = humanNpcState(id);
    if (!state || state.scene !== S.humanWorld.scene) return;
    var spot = humanActorSpot(state);
    humanCreateActor(id, state, spot.x, spot.y);
  });
}

function humanCreateActor(id, state, x, y) {
  var button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = '<span class="human-emote" aria-hidden="true"></span><img alt=""><small>' + esc(state.npc.name) + '</small>';
  var actor = { id: id, npc: state.npc, state: state, el: button, x: x, y: y, goalX: x, goalY: y, path: [], direction: 'down', moving: false, walkFrame: 1 };
  button.dataset.proportion = state.npc.proportion || 'adult';
  humanActorApplyState(actor, state);
  humanSetSprite(actor, state.npc.sprite, 'down', state.npc.front);
  button.onclick = function (event) { event.stopPropagation(); humanApproach({ type: 'npc', value: actor, x: actor.x, y: actor.y }); };
  $('#human-world-layer').appendChild(button);
  HUMAN_ACTORS.push(actor);
  humanPaint(actor, false);
  return actor;
}

function humanActorApplyState(actor, state) {
  actor.state = state;
  actor.el.className = 'human-npc activity-' + state.activity + (actor.el.classList.contains('hopping') ? ' hopping' : '');
  actor.el.setAttribute('aria-label', state.npc.name + ', ' + state.npc.role + ', ' + state.activity);
}

/* Where a schedule entry puts someone's feet, nudged onto clear ground if needed. */
function humanActorSpot(state) {
  var scene = HUMAN_WORLD_SCENES[state.scene];
  if (typeof humanNavNearest !== 'function' || !scene) return { x: state.x, y: state.y };
  return humanNavOpen(scene.id, state.x, state.y, true) ? { x: state.x, y: state.y } : humanNavNearest(scene.id, state.x, state.y, true);
}

function humanSceneLinks(scene) {
  return ((scene.nav && scene.nav.links) || []).map(function (pair) {
    return pair.map(function (name) { var p = scene.spawns[name]; return { x: p[0], y: p[1] }; });
  });
}

/* The open spot just inside the doorway that leads toward another scene. */
function humanDoorPoint(scene, towardScene) {
  var portals = (scene.portals || []).filter(function (p) { return p.to !== scene.id; });
  var portal = portals.find(function (p) { return p.to === towardScene; }) || portals[0];
  if (!portal) return null;
  var dest = HUMAN_WORLD_SCENES[portal.to];
  var back = dest && (dest.portals || []).find(function (q) { return q.to === scene.id; });
  var spawn = back && scene.spawns[back.spawn];
  return spawn ? { x: spawn[0], y: spawn[1] } : { x: portal.x, y: portal.y };
}

function humanReducedMotion() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/* Plan a fixed route for an actor. Other people's spots are routed around; if
   that leaves no way through, the plain route is used and they politely wait. */
function humanActorRoute(actor, x, y, onArrive) {
  var scene = humanScene();
  actor.goalX = x; actor.goalY = y; actor.onArrive = onArrive || null; actor.blockedSince = 0;
  if (typeof humanNavPath !== 'function' || humanReducedMotion()) {
    actor.x = x; actor.y = y; actor.path = []; humanPaint(actor, false); return;
  }
  var links = humanSceneLinks(scene);
  var others = HUMAN_ACTORS.filter(function (a) { return a !== actor && !a.leaving; }).map(function (a) { return { x: a.goalX, y: a.goalY }; });
  var path = humanNavPath(scene.id, actor, { x: x, y: y }, { links: links, avoid: others }) ||
             humanNavPath(scene.id, actor, { x: x, y: y }, { links: links });
  if (!path) { actor.x = x; actor.y = y; path = []; humanPaint(actor, false); }
  actor.path = path;
}

/* When the clock moves someone to a new entry while you watch, they walk it:
   across the scene to their new spot, in from the door they came through, or
   out through the door toward where they are going. */
function humanSyncActors() {
  var scene = humanScene();
  if (!$('#human-world-layer')) return;
  Object.keys(HUMAN_WORLD_NPCS).forEach(function (id) {
    var state = humanNpcState(id);
    var actor = HUMAN_ACTORS.find(function (a) { return a.id === id; });
    if (state.scene === scene.id) {
      var spot = humanActorSpot(state);
      if (!actor || actor.leaving) {
        if (actor) humanRemoveActor(actor);
        var before = humanNpcState(id, Math.max(360, S.humanWorld.minute - 1));
        var door = before.scene !== scene.id ? humanDoorPoint(scene, before.scene) : null;
        var from = door || spot;
        actor = humanCreateActor(id, state, from.x, from.y);
        actor.el.classList.add('hopping');
        requestAnimationFrame(function () { actor.el.classList.remove('hopping'); });
      } else humanActorApplyState(actor, state);
      if (Math.abs(actor.goalX - spot.x) > .01 || Math.abs(actor.goalY - spot.y) > .01 || actor.path.length) humanActorRoute(actor, spot.x, spot.y);
    } else if (actor && !actor.leaving) {
      var exit = humanDoorPoint(scene, state.scene);
      actor.leaving = true;
      humanActorApplyState(actor, state);
      if (!exit) { humanRemoveActor(actor); return; }
      humanActorRoute(actor, exit.x, exit.y, function (a, now) { a.el.classList.add('hopping'); a.removeAt = now + 220; });
    }
  });
}

function humanRemoveActor(actor) {
  if (actor.el && actor.el.parentNode) actor.el.remove();
  HUMAN_ACTORS = HUMAN_ACTORS.filter(function (a) { return a !== actor; });
}

function humanRenderDirectory() {
  var box = $('#human-directory-list');
  if (!box) return;
  var here = [], away = [];
  Object.keys(HUMAN_WORLD_NPCS).forEach(function (id) {
    var state = humanNpcState(id);
    (state.scene === S.humanWorld.scene ? here : away).push({ id: id, state: state });
  });
  var html = '<div class="human-directory-group"><b>Here now</b>';
  here.forEach(function (row) {
    html += '<button onclick="humanApproachNpcById(\'' + row.id + '\')">' + esc(row.state.npc.name) + '<small>' + esc(row.state.activity) + '</small></button>';
  });
  if (!here.length) html += '<span class="small">Nobody is here right now.</span>';
  html += '</div><div class="human-directory-group away"><b>Elsewhere</b>';
  away.forEach(function (row) { html += '<span>' + esc(row.state.npc.name) + '<small>' + esc(HUMAN_WORLD_SCENES[row.state.scene].name) + '</small></span>'; });
  box.innerHTML = html + '</div>';
}

function humanIsWalkable(x, y, scene) {
  if (!scene || x < 1 || x > 99 || y < 1 || y > 98) return false;
  // The painted-path walk grid is authoritative when present; polygons are the old fallback.
  var open = typeof humanNavOpen === 'function' ? humanNavOpen(scene.id, x, y, false) : null;
  if (open !== null) return open;
  var inside = (scene.nav.areas || []).some(function (poly) { return humanPointInPolygon(x, y, poly); });
  if (!inside) return false;
  return !(scene.nav.blocks || []).some(function (block) {
    if (block.type === 'rect') return x >= block.x1 && x <= block.x2 && y >= block.y1 && y <= block.y2;
    var dx = (x - block.x) / block.rx, dy = (y - block.y) / block.ry;
    return dx * dx + dy * dy <= 1;
  });
}

function humanPointInPolygon(x, y, polygon) {
  var inside = false;
  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    var xi = polygon[i][0], yi = polygon[i][1], xj = polygon[j][0], yj = polygon[j][1];
    if (((yi > y) !== (yj > y)) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function humanTryMove(entity, nextX, nextY) {
  var scene = humanScene();
  var ok = function (x, y) { return humanIsWalkable(x, y, scene) && !(entity === HUMAN_PLAYER && humanBumpsPerson(entity, x, y)); };
  if (ok(nextX, nextY)) { entity.x = nextX; entity.y = nextY; return true; }
  if (ok(nextX, entity.y)) { entity.x = nextX; return true; }
  if (ok(entity.x, nextY)) { entity.y = nextY; return true; }
  return false;
}

/* Screen-space gap between two feet positions, in stage-width percent. */
function humanGap(ax, ay, bx, by) {
  var dx = ax - bx, dy = (ay - by) * 9 / 16;
  return Math.sqrt(dx * dx + dy * dy);
}

/* People are solid: the player can step away from someone but not into them.
   Planned routes already give people a wide berth, so they only need the tight radius. */
function humanBumpsPerson(entity, x, y, radius) {
  return HUMAN_ACTORS.some(function (actor) {
    if (actor.leaving) return false;
    var now = humanGap(x, y, actor.x, actor.y);
    return now < (radius || 1.8) && now < humanGap(entity.x, entity.y, actor.x, actor.y);
  });
}

function humanTick(now) {
  if (CUR !== 'human' || !$('#human-stage')) { humanWorldStop(true); return; }
  var dt = Math.min(.05, Math.max(0, (now - HUMAN_LAST) / 1000));
  HUMAN_LAST = now;
  var paused = !!HUMAN_DIALOGUE || $('#modal').classList.contains('on') || document.hidden;
  if (!paused) {
    humanMovePlayer(now, dt);
    humanMoveActors(now, dt);
    HUMAN_CLOCK_ACC += dt;
    while (HUMAN_CLOCK_ACC >= 1) {
      HUMAN_CLOCK_ACC -= 1;
      if (humanAdvanceMinute() === false) return;
    }
    humanCheckActivityProximity();
    humanUpdateNearby();
  }
  if (now >= HUMAN_AMBIENT_AT && !paused) { humanAmbientMoment(now); HUMAN_AMBIENT_AT = now + 6500; }
  if (now >= HUMAN_SAVE_AT && !paused) {
    S.humanWorld.playerX = HUMAN_PLAYER.x; S.humanWorld.playerY = HUMAN_PLAYER.y; saveGame(); HUMAN_SAVE_AT = now + 12000;
  }
  HUMAN_RAF = requestAnimationFrame(humanTick);
}

function humanMovePlayer(now, dt) {
  var dx = 0, dy = 0;
  if (HUMAN_KEYS.left) dx -= 1; if (HUMAN_KEYS.right) dx += 1;
  if (HUMAN_KEYS.up) dy -= 1; if (HUMAN_KEYS.down) dy += 1;
  // Keyboard movement is four-way. If two perpendicular keys are held, the
  // most recently pressed axis wins instead of producing a diagonal vector.
  if (dx && dy) {
    if (HUMAN_LAST_AXIS === 'horizontal') dy = 0;
    else dx = 0;
  }
  if (!dx && !dy && HUMAN_MOVE_TARGET) {
    // Click-to-walk follows a planned route, so it obeys the same collision as the keys.
    var route = HUMAN_MOVE_TARGET.path;
    while (route && route.length && !route[0].hop && humanGap(HUMAN_PLAYER.x, HUMAN_PLAYER.y, route[0].x, route[0].y) < .05) route.shift();
    if (route && route.length && route[0].hop) {
      var hop = route.shift(); HUMAN_PLAYER.x = hop.x; HUMAN_PLAYER.y = hop.y; humanPaint(HUMAN_PLAYER, true);
    }
    var waypoint = route && route.length ? route[0] : null;
    if (!waypoint) { HUMAN_MOVE_TARGET = null; }
    else {
      dx = waypoint.x - HUMAN_PLAYER.x; dy = waypoint.y - HUMAN_PLAYER.y;
      // Routes are authored orthogonally. This also protects old saves or a
      // fallback waypoint from ever creating visible diagonal motion.
      if (Math.abs(dx) > .01 && Math.abs(dy) > .01) {
        if (Math.abs(dx) >= Math.abs(dy) * 9 / 16) dy = 0;
        else dx = 0;
      }
    }
  }
  if (dx || dy) {
    HUMAN_MOVE_TARGET = (HUMAN_KEYS.left || HUMAN_KEYS.right || HUMAN_KEYS.up || HUMAN_KEYS.down) ? null : HUMAN_MOVE_TARGET;
    var length = Math.sqrt(dx * dx + dy * dy); dx /= length; dy /= length;
    var stride = Math.min(13 * dt, HUMAN_MOVE_TARGET ? length : Infinity);
    var moved;
    if (HUMAN_MOVE_TARGET) {
      // Routes are walked exactly (no sliding along edges), so a blocked step means re-plan.
      var px = HUMAN_PLAYER.x + dx * stride, py = HUMAN_PLAYER.y + dy * stride;
      moved = humanIsWalkable(px, py, humanScene()) && !humanBumpsPerson(HUMAN_PLAYER, px, py, 1.3);
      if (moved) { HUMAN_PLAYER.x = px; HUMAN_PLAYER.y = py; }
    } else moved = humanTryMove(HUMAN_PLAYER, HUMAN_PLAYER.x + dx * stride, HUMAN_PLAYER.y + dy * stride);
    var direction = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down');
    if (direction !== HUMAN_PLAYER.direction) humanSetSprite(HUMAN_PLAYER, 'player', direction);
    humanSetMoving(HUMAN_PLAYER, moved, 'player');
    humanAnimateWalk(HUMAN_PLAYER, now, 'player', null, 105);
    if (!moved && HUMAN_MOVE_TARGET) {
      // Someone stepped into the route: plan around them a few times, then give up.
      var tries = (HUMAN_MOVE_TARGET.replans || 0) + 1, goal = HUMAN_MOVE_TARGET;
      if (tries > 3 || goal.x === undefined) HUMAN_MOVE_TARGET = null;
      else { humanWalkPlayerTo(goal.x, goal.y); if (HUMAN_MOVE_TARGET) HUMAN_MOVE_TARGET.replans = tries; }
    }
  } else humanSetMoving(HUMAN_PLAYER, false, 'player');
  humanPaint(HUMAN_PLAYER, true);
  if (HUMAN_PENDING && humanDistance(HUMAN_PLAYER, HUMAN_PENDING) < 7) {
    var pending = HUMAN_PENDING; HUMAN_PENDING = null; HUMAN_MOVE_TARGET = null; humanActivate(pending);
  }
}

/* Townsfolk never wander: they stand at their spot, or walk the route planned
   for them (same route every time), waiting if the player is in the way. */
var HUMAN_NPC_SPEED = 2.4;          // stage-width percent per second: an unhurried stroll
var HUMAN_NPC_FOLLOW_SPEED = 5.5;   // Bell keeping up with you on the delivery round

function humanMoveActors(now, dt) {
  HUMAN_ACTORS.slice().forEach(function (actor) {
    if (actor.removeAt) { if (now >= actor.removeAt) humanRemoveActor(actor); return; }
    if (S.humanWorld.activity && S.humanWorld.activity.id === 'bellRound' && actor.id === 'postie') humanFollowPlayer(actor, now);
    var next = actor.path[0];
    if (next && next.hop) {
      // Crossing the stile: a short fade, then out the other side.
      if (!actor.hopStart) { actor.hopStart = now; actor.el.classList.add('hopping'); }
      else if (now - actor.hopStart > 200) {
        actor.x = next.x; actor.y = next.y; actor.path.shift(); actor.hopStart = 0;
        actor.el.classList.remove('hopping'); humanPaint(actor, false);
      }
      return;
    }
    if (!next) {
      humanSetMoving(actor, false, actor.npc.sprite, actor.npc.front);
      if (actor.onArrive) { var arrive = actor.onArrive; actor.onArrive = null; arrive(actor, now); }
      return;
    }
    var gap = humanGap(actor.x, actor.y, next.x, next.y);
    var following = S.humanWorld.activity && S.humanWorld.activity.id === 'bellRound' && actor.id === 'postie';
    var vx = next.x - actor.x, vy = next.y - actor.y;
    var horizontal = Math.abs(vx) > Math.abs(vy) * 9 / 16;
    if (horizontal) vy = 0; else vx = 0;
    gap = humanGap(actor.x, actor.y, actor.x + vx, actor.y + vy);
    var step = Math.min(gap, (following ? HUMAN_NPC_FOLLOW_SPEED : HUMAN_NPC_SPEED) * dt), t = gap ? step / gap : 1;
    var nx = actor.x + vx * t, ny = actor.y + vy * t;
    var direction = horizontal ? (vx < 0 ? 'left' : 'right') : (vy < 0 ? 'up' : 'down');
    if (direction !== actor.direction) humanSetSprite(actor, actor.npc.sprite, direction, actor.npc.front);
    var toPlayer = HUMAN_PLAYER ? humanGap(nx, ny, HUMAN_PLAYER.x, HUMAN_PLAYER.y) : 99;
    var fromPlayer = HUMAN_PLAYER ? humanGap(actor.x, actor.y, HUMAN_PLAYER.x, HUMAN_PLAYER.y) : 99;
    // (Someone who came through the door you are standing in just steps clear of you.)
    if (toPlayer < 2.2 && toPlayer < fromPlayer && fromPlayer > 1.2) {
      humanSetMoving(actor, false, actor.npc.sprite, actor.npc.front);
      // You are standing in the doorway they are leaving by: they slip out rather than wait forever.
      if (actor.leaving && humanGap(actor.x, actor.y, actor.goalX, actor.goalY) < 6) { actor.path = []; return; }
      if (!actor.blockedSince) actor.blockedSince = now;
      else if (now - actor.blockedSince > 1600) {
        // Still blocked: plan once around where the player is standing.
        actor.blockedSince = 0;
        var around = humanNavPath(humanScene().id, actor, { x: actor.goalX, y: actor.goalY },
          { links: humanSceneLinks(humanScene()), avoid: [{ x: HUMAN_PLAYER.x, y: HUMAN_PLAYER.y }] });
        if (around) actor.path = around;
      }
      return;
    }
    actor.blockedSince = 0;
    actor.x = nx; actor.y = ny;
    if (humanGap(nx, ny, next.x, next.y) < .05) actor.path.shift();
    humanSetMoving(actor, true, actor.npc.sprite, actor.npc.front);
    humanAnimateWalk(actor, now, actor.npc.sprite, actor.npc.front, 165);
    humanPaint(actor, false);
  });
}

/* Bell keeps a step behind you on the delivery round, on the same routes as everyone else. */
function humanFollowPlayer(actor, now) {
  if (actor.followAt && now < actor.followAt) return;
  actor.followAt = now + 450;
  if (humanGap(actor.x, actor.y, HUMAN_PLAYER.x, HUMAN_PLAYER.y) < 5) { actor.path = []; return; }
  var spot = humanNavNearest(humanScene().id, HUMAN_PLAYER.x - 3, HUMAN_PLAYER.y + 1, true);
  if (humanGap(spot.x, spot.y, actor.goalX, actor.goalY) < 1.5 && actor.path.length) return;
  humanActorRoute(actor, spot.x, spot.y);
}

function humanPaint(entity, player) {
  if (!entity || !entity.el) return;
  entity.el.style.left = entity.x.toFixed(2) + '%';
  entity.el.style.top = entity.y.toFixed(2) + '%';
  entity.el.style.zIndex = String(100 + Math.round(entity.y));
  entity.el.classList.toggle('carrying', !!(player && S.humanWorld.activity && S.humanWorld.activity.carrying));
}

function humanAdvanceMinute() {
  S.humanWorld.minute++;
  if (S.humanWorld.minute >= 1440) { humanSleep(true); return false; }
  humanUpdateClock();
  var sig = humanScheduleSignature();
  if (sig !== HUMAN_SCHEDULE_SIG) {
    HUMAN_SCHEDULE_SIG = sig; humanSyncActors(); humanRenderDirectory(); humanUpdateObjective();
    humanStatus('The town has shifted into a new part of its day.');
  }
  return true;
}

function humanAdvance(minutes) {
  ensureHumanWorld();
  S.humanWorld.minute += Math.max(0, Math.floor(minutes || 0));
  if (S.humanWorld.minute >= 1440) { humanSleep(true); return; }
  saveGame();
  humanUpdateClock();
  HUMAN_SCHEDULE_SIG = humanScheduleSignature();
  if ($('#human-stage')) { humanRenderActors(); humanRenderDirectory(); humanUpdateObjective(); }
}

function humanWait(minutes) {
  if (HUMAN_DIALOGUE || !HUMAN_PLAYER) return;
  humanAdvance(minutes);
  toast('You waited ' + minutes + ' minutes.');
}

function humanSleep(automatic) {
  ensureHumanWorld();
  S.humanWorld.day++;
  S.humanWorld.minute = 390;
  S.humanWorld.scene = 'home'; S.humanWorld.spawn = 'door';
  S.humanWorld.playerX = null; S.humanWorld.playerY = null;
  S.humanWorld.weather = humanWeatherForDay(S.humanWorld.day);
  S.humanWorld.activity = null; S.humanWorld.returnContext = null;
  saveGame();
  if (CUR === 'human') { renderHumanWorld(); toast(automatic ? 'You made it home. A new day begins.' : 'Good morning.'); }
}

function humanUpdateClock() {
  var time = $('#human-time'), day = $('#human-day');
  if (time) time.textContent = humanTimeText(S.humanWorld.minute);
  if (day) day.textContent = humanDayName(S.humanWorld.day);
  humanUpdateAtmosphere();
}

function humanUpdateAtmosphere() {
  var stage = $('#human-stage'); if (!stage) return;
  ['dawn','day','dusk','night'].forEach(function (phase) { stage.classList.toggle('phase-' + phase, phase === humanPhase(S.humanWorld.minute)); });
  stage.classList.toggle('weather-rain', S.humanWorld.weather === 'rain' && !humanScene().indoors);
}

function humanStagePoint(event) {
  var rect = $('#human-stage').getBoundingClientRect();
  return { x: (event.clientX - rect.left) / rect.width * 100, y: (event.clientY - rect.top) / rect.height * 100 };
}

function humanApproach(target) {
  if (!HUMAN_PLAYER || HUMAN_DIALOGUE) return;
  HUMAN_PENDING = target;
  humanWalkPlayerTo(target.x, target.y);
  if (humanDistance(HUMAN_PLAYER, target) < 7) { HUMAN_PENDING = null; HUMAN_MOVE_TARGET = null; humanActivate(target); }
}

function humanWalkPlayerTo(x, y) {
  var scene = humanScene();
  if (typeof humanNavPath !== 'function') { HUMAN_MOVE_TARGET = { path: [{ x: x, y: y }] }; return; }
  var people = HUMAN_ACTORS.filter(function (a) { return !a.leaving; }).map(function (a) { return { x: a.x, y: a.y }; });
  var options = { strict: false, links: humanSceneLinks(scene) };
  var path = humanNavPath(scene.id, HUMAN_PLAYER, { x: x, y: y }, Object.assign({ avoid: people }, options)) ||
             humanNavPath(scene.id, HUMAN_PLAYER, { x: x, y: y }, options);
  HUMAN_MOVE_TARGET = path ? { x: x, y: y, path: path, replans: 0 } : null;
}

function humanApproachNpcById(id) {
  var actor = HUMAN_ACTORS.find(function (a) { return a.id === id; });
  if (actor) humanApproach({ type: 'npc', value: actor, x: actor.x, y: actor.y });
}

function humanActivate(target) {
  if (!target) return;
  if (target.type === 'npc') { humanOpenDialogue(target.value.id); return; }
  if (target.type === 'portal') {
    if (target.value.to === S.humanWorld.scene) {
      // A stile inside the same scene: step across without reloading everyone.
      var spot = humanScene().spawns[target.value.spawn];
      HUMAN_MOVE_TARGET = null; HUMAN_PENDING = null;
      HUMAN_PLAYER.x = spot[0]; HUMAN_PLAYER.y = spot[1]; humanPaint(HUMAN_PLAYER, true);
      humanStatus(target.value.label + '.');
      return;
    }
    humanGo(target.value.to, target.value.spawn); return;
  }
  if (target.type === 'object') {
    if (target.value.action === 'sleep') humanObjectDialogue('Rest for the night?', 'Sleeping starts a new day at 6:30 AM.', '<button class="primary" onclick="humanCloseDialogue();humanSleep(false)">Sleep until morning</button>');
    else if (target.value.action === 'journal') humanOpenJournal();
    else if (target.value.action === 'chest') humanOpenHouseView(openChest);
    else if (target.value.action === 'aquarium') humanOpenHouseView(openAquarium);
    else if (target.value.action === 'terrarium') humanOpenHouseView(openTerrarium);
    else humanObjectDialogue('Your study desk',
      'Your notes and missed questions are waiting here, and the day’s journal lies open beside them.',
      '<button class="primary" onclick="humanOpenJournal()">📔 Read the journal</button>' +
      '<button onclick="humanCloseDialogue();showScreen(\'study\');renderStudy()">Open study notes</button>');
    return;
  }
  if (target.type === 'home') {
    var residents = (target.value.residents || []).map(humanResidentName);
    var copy = residents.length ? ('Home of ' + residents.join(', ') + '.') : 'A quiet home in the Bootstrap community.';
    humanObjectDialogue(target.value.name, copy, '');
    return;
  }
  if (target.type === 'building') {
    humanObjectDialogue(target.value.name, target.value.description || 'A public place in the Bootstrap community.', '');
    return;
  }
  if (target.type === 'activity') humanActivityObject(target.value);
}

function humanGo(sceneId, spawnId) {
  if (!HUMAN_WORLD_SCENES[sceneId]) return;
  if (typeof journalVisit === 'function') journalVisit(sceneId);
  S.humanWorld.scene = sceneId; S.humanWorld.spawn = spawnId;
  S.humanWorld.playerX = null; S.humanWorld.playerY = null;
  saveGame(); renderHumanWorld();
}

function humanUpdateNearby() {
  var candidates = [];
  HUMAN_ACTORS.forEach(function (actor) {
    if (!actor.leaving) candidates.push({ type: 'npc', value: actor, x: actor.x, y: actor.y, label: 'Talk to ' + actor.npc.name });
  });
  (humanScene().portals || []).forEach(function (p) { candidates.push({ type: 'portal', value: p, x: p.x, y: p.y, label: 'Enter ' + p.label }); });
  (humanScene().objects || []).forEach(function (o) { candidates.push({ type: 'object', value: o, x: o.x, y: o.y, label: o.label }); });
  humanHomesInScene(humanScene().id).forEach(function (home) {
    candidates.push({ type: 'home', value: home, x: home.doorstep[0], y: home.doorstep[1], label: 'Visit ' + home.name });
  });
  humanBuildingsInScene(humanScene().id).forEach(function (building) {
    candidates.push({ type: 'building', value: building, x: building.doorstep[0], y: building.doorstep[1], label: 'Visit ' + building.name });
  });
  var activityEls = $$('.human-activity-object');
  activityEls.forEach(function (el) {
    candidates.push({ type: 'activity', value: { action: el.dataset.action, index: Number(el.dataset.index) || 0 }, x: Number(el.dataset.x), y: Number(el.dataset.y), label: el.getAttribute('aria-label') });
  });
  var best = null, bestD = 999;
  candidates.forEach(function (c) { var d = humanDistance(HUMAN_PLAYER, c); if (d < bestD) { best = c; bestD = d; } });
  HUMAN_NEARBY = bestD < 7 ? best : null;
  if (HUMAN_NEARBY && HUMAN_NEARBY.type === 'npc' && !HUMAN_NEARBY.value.path.length) {
    // Someone standing still turns to face you as you come close.
    var who = HUMAN_NEARBY.value, fx = HUMAN_PLAYER.x - who.x, fy = (HUMAN_PLAYER.y - who.y) * 9 / 16;
    var facing = Math.abs(fx) > Math.abs(fy) ? (fx < 0 ? 'left' : 'right') : (fy < 0 ? 'up' : 'down');
    if (facing !== who.direction) humanSetSprite(who, who.npc.sprite, facing, who.npc.front);
  }
  var prompt = $('#human-prompt');
  if (prompt) { prompt.textContent = HUMAN_NEARBY ? 'E · ' + HUMAN_NEARBY.label : ''; prompt.classList.toggle('on', !!HUMAN_NEARBY); }
}

function humanActivateNearby() {
  if (HUMAN_DIALOGUE) return;
  if (HUMAN_NEARBY) humanActivate(HUMAN_NEARBY);
}

function humanDistance(a, b) {
  var dx = a.x - b.x, dy = (a.y - b.y) * 1.35;
  return Math.sqrt(dx * dx + dy * dy);
}

function humanOpenDialogue(id) {
  var state = humanNpcState(id), npc = state && state.npc;
  if (!npc) return;
  HUMAN_MOVE_TARGET = null; HUMAN_PENDING = null;
  ensureTown(); ensureFriends();
  var folk = townsfolkById(id), fr = friendship(id);
  if (!fr.met) { fr.met = true; changeFriendship(id, npc.companion ? 35 : 20); syncFriendStory(); }
  if (folk) S.town.met[id] = true;
  saveGame();
  HUMAN_DIALOGUE = { npcId: id };
  humanDialogueMenu(id, state.line);
}

function humanPortrait(id) {
  if (id === 'rowan') return (window.TRAINER_PORTRAITS || {})[id] || 'assets/trainers/rowan-portrait.png';
  return (window.FOLK_PORTRAITS || {})[id] || '';
}

function humanDialogueMenu(id, line) {
  var state = humanNpcState(id), npc = state.npc, folk = townsfolkById(id);
  var portrait = humanPortrait(id);
  var actions = '';
  npc.services.forEach(function (service) {
    if (service === 'chat') actions += '<button class="primary" onclick="humanChat(\'' + id + '\')">Chat</button>';
    else if (service === 'shop') actions += '<button onclick="humanOpenShop(\'' + id + '\')">Browse the Mart</button>';
    else if (service === 'heal') actions += '<button onclick="humanHeal(\'' + id + '\')">Heal my party</button>';
    else if (service === 'gift') actions += '<button onclick="humanGift(\'' + id + '\')">' + (S.town.gifts[id] ? 'Say hello' : 'Accept gift') + '</button>';
    else if (service === 'battle') actions += '<button ' + ((folk && (folk.badges || 0) > badgeCount()) ? 'disabled' : '') + ' onclick="humanOfferBattle(\'' + id + '\')">Battle</button>';
    else if (service === 'delivery' && !S.humanWorld.activity) actions += '<button onclick="humanStartActivity(\'bellRound\')">Join delivery round</button>';
    else if (service === 'restock' && !S.humanWorld.activity && state.scene === 'mart') actions += '<button onclick="humanStartActivity(\'restock\')">Help restock</button>';
    else if (service === 'warmup' && !S.humanWorld.activity && state.scene === 'square') actions += '<button onclick="humanStartActivity(\'warmup\')">Run the warm-up</button>';
    else if (service === 'friend') actions += '<button onclick="humanOpenFriend(\'' + id + '\')">Spend time together</button>';
  });
  var delivery = S.humanWorld.activity && S.humanWorld.activity.id === 'bellRound';
  var deliveryDef = HUMAN_WORLD_ACTIVITY_DEFS.bellRound;
  if (delivery && deliveryDef.targets[S.humanWorld.activity.step] === id) {
    actions += '<button class="primary" onclick="humanDeliver(\'' + id + '\')">Hand over Bell’s parcel</button>';
  }
  actions += '<button class="ghost" onclick="humanCloseDialogue()">See you</button>';
  humanDialoguePage(npc.name, npc.role, line || (folk ? folk.say : ''), actions, portrait);
}

function humanDialoguePage(name, role, text, buttons, portrait, note) {
  var box = $('#human-dialogue'); if (!box) return;
  document.body.classList.add('human-dialogue-open');
  box.innerHTML = (portrait ? '<img class="human-dialogue-portrait" src="' + portrait + '" alt="">' : '') +
    '<div class="human-dialogue-copy"><span>' + esc(role || '') + '</span><h3>' + esc(name) + '</h3>' +
    '<p>' + esc(text) + '</p>' + (note ? '<small>' + esc(note) + '</small>' : '') +
    '<div class="human-dialogue-actions">' + buttons + '</div></div>';
  box.classList.add('on');
  var first = box.querySelector('button'); if (first) first.focus({ preventScroll: true });
}

function humanObjectDialogue(name, text, buttons) {
  HUMAN_DIALOGUE = { object: true };
  humanDialoguePage(name, 'Bootstrap Town', text, buttons + '<button class="ghost" onclick="humanCloseDialogue()">Not now</button>', '', 'The town clock pauses while you decide.');
}

/* The notebook on the desk. The town dialogue closes first so the journal is
   not stacked on top of it, and the world clock stays where it was - reading
   back over your own day should never cost you an hour of it. */
function humanOpenJournal() {
  humanOpenHouseView(typeof openJournal === 'function' ? openJournal : null);
}

/* The house furniture - journal, chest, aquarium, terrarium - all open a modal
   over the town. The town dialogue closes first so the two are never stacked,
   and the world clock stays where it was: looking through your own things
   should not cost you an hour of the day. */
function humanOpenHouseView(open) {
  humanCloseDialogue();
  if (typeof open === 'function') open();
  else toast('That is not loaded.');
}

function humanCloseDialogue() {
  HUMAN_DIALOGUE = null;
  document.body.classList.remove('human-dialogue-open');
  var box = $('#human-dialogue'); if (box) { box.classList.remove('on'); box.innerHTML = ''; }
  var stage = $('#human-stage'); if (stage) stage.focus({ preventScroll: true });
}

function humanDialogueBack() {
  if (!HUMAN_DIALOGUE || !HUMAN_DIALOGUE.npcId) { humanCloseDialogue(); return; }
  var id = HUMAN_DIALOGUE.npcId; humanDialogueMenu(id, humanNpcState(id).line);
}

function humanChat(id) {
  var state = humanNpcState(id), folk = townsfolkById(id), npc = state.npc, fr = friendship(id), gain = 0, line = state.line;
  if (typeof journalTalk === 'function') journalTalk(id);
  if (npc.companion) {
    var trainer = TRAINERS.find(function (t) { return t.id === id; });
    if (trainer && trainer.talk && trainer.talk.length) line = trainer.talk[fr.talks % trainer.talk.length];
  } else if (folk && folk.tip && fr.talks % 2) line = folk.tip;
  if (!friendWait(fr, 'Talk')) { gain = changeFriendship(id, npc.companion ? 15 : 12); fr.lastTalk = S.clock; fr.talks++; }
  // Conversation pauses the town clock; only normal play advances the schedule.
  saveGame();
  humanDialoguePage(npc.name, npc.role, line, '<button class="primary" onclick="humanDialogueBack()">Keep talking</button><button class="ghost" onclick="humanCloseDialogue()">See you</button>', humanPortrait(id), gain ? 'Friendship +' + gain : 'A comfortable, ordinary conversation.');
}

function humanHeal(id) {
  healParty(); changeFriendship(id, 6); humanAdvance(20); saveGame();
  humanDialoguePage('Nurse Ada', 'Centre Nurse', 'All done. Let them rest before you ask for more.', '<button class="primary" onclick="humanDialogueBack()">Thank you</button>', humanPortrait(id), 'Your party is fully healed.');
}

function humanGift(id) {
  var folk = townsfolkById(id);
  if (!folk) return;
  var note = 'Tam has already handed over the supplies.';
  if (!S.town.gifts[id]) {
    S.town.gifts[id] = true; giveItem(folk.item, folk.amount); changeFriendship(id, 25);
    note = 'Received ' + folk.amount + ' ' + ITEMS[folk.item].name + (folk.amount > 1 ? 's.' : '.');
  }
  humanAdvance(10); saveGame();
  humanDialoguePage(folk.name, folk.cls, folk.say, '<button class="primary" onclick="humanDialogueBack()">Thanks</button>', humanPortrait(id), note);
}

function humanSetReturn(minutes, source) {
  S.humanWorld.returnContext = {
    scene: S.humanWorld.scene, spawn: S.humanWorld.spawn, x: HUMAN_PLAYER ? HUMAN_PLAYER.x : null,
    y: HUMAN_PLAYER ? HUMAN_PLAYER.y : null, minutes: minutes || 0, source: source || ''
  };
  saveGame();
}

function humanWorldHasReturn() {
  return !!(S && S.humanWorld && S.humanWorld.returnContext);
}

function humanWorldReturn() {
  ensureHumanWorld();
  var back = S.humanWorld.returnContext;
  if (!back) { openHumanWorld(); return; }
  S.humanWorld.scene = HUMAN_WORLD_SCENES[back.scene] ? back.scene : 'square';
  S.humanWorld.spawn = back.spawn || 'southGate';
  S.humanWorld.playerX = back.x; S.humanWorld.playerY = back.y;
  S.humanWorld.returnContext = null;
  if (back.minutes) humanAdvance(back.minutes);
  saveGame(); showScreen('human'); renderHumanWorld();
}

function humanOpenShop(id) {
  humanSetReturn(10, 'shop'); humanCloseDialogue(); openShop(id);
}

function humanOfferBattle(id) {
  var folk = townsfolkById(id); if (!folk) return;
  if ((folk.badges || 0) > badgeCount()) { toast(folk.want || 'Come back with more badges.'); return; }
  humanCloseDialogue();
  var h = '<h2>' + esc(folk.name) + '</h2><span class="friend-role">' + esc(folk.cls) + '</span><p class="scene-prose">' + esc(folk.say) + '</p>' +
    '<label class="small" for="npc-chapter">Study chapter</label><select id="npc-chapter">';
  CHAPTERS.forEach(function (c) { h += '<option value="' + c.n + '"' + (c.n === folk.ch ? ' selected' : '') + '>' + c.n + '. ' + esc(c.title) + '</option>'; });
  h += '</select><div class="row" style="justify-content:center;margin-top:12px"><button class="primary" onclick="humanStartNpcBattle(\'' + id + '\')">Battle</button>' +
    '<button class="ghost" onclick="closeModal()">Not now</button></div>';
  modal(h);
}

function humanStartNpcBattle(id) { humanSetReturn(40, 'battle'); startNpcBattle(id); }

function humanOpenFriend(id) {
  humanCloseDialogue(); openFriend(id);
}

function humanStartActivity(id) {
  var def = HUMAN_WORLD_ACTIVITY_DEFS[id]; if (!def || S.humanWorld.activity) return;
  var activity = { id: id, step: 0, carrying: false, startedAt: S.humanWorld.minute };
  S.humanWorld.activity = activity; humanCloseDialogue(); saveGame();
  humanRenderActors(); humanRenderActivityObjects(); humanRenderDirectory(); humanUpdateObjective();
  toast(def.name + ' started.');
}

function humanCancelActivity() {
  if (!S.humanWorld.activity) return;
  S.humanWorld.activity = null; saveGame(); renderHumanWorld(); toast('Activity stopped. You can try again anytime.');
}

function humanObjectiveText() {
  if (!S || !S.humanWorld || !S.humanWorld.activity) return 'Explore Bootstrap Town · people move as the clock changes';
  var a = S.humanWorld.activity, def = HUMAN_WORLD_ACTIVITY_DEFS[a.id];
  if (a.id === 'bellRound') return def.labels[a.step] || 'Delivery round complete';
  if (a.id === 'restock') return a.carrying ? 'Carry the crate to the glowing shelf' : 'Pick up crate ' + (a.step + 1) + ' of 3';
  if (a.id === 'warmup') return 'Reach marker ' + (a.step + 1) + ' of ' + def.markers.length + ' in the practice field';
  return def.name;
}

function humanUpdateObjective() {
  var el = $('#human-objective'); if (el) el.textContent = humanObjectiveText();
}

function humanRenderActivityObjects() {
  var layer = $('#human-activity-layer'); if (!layer) return;
  layer.innerHTML = '';
  var a = S.humanWorld.activity; if (!a) return;
  if (a.id === 'restock' && S.humanWorld.scene === 'mart') {
    var restock = HUMAN_WORLD_ACTIVITY_DEFS.restock, crate = restock.crates[Math.min(a.step, restock.crates.length - 1)];
    if (!a.carrying && a.step < 3) humanAddActivityObject('crate', a.step, crate[0], crate[1], 'Pick up crate', '▣');
    humanAddActivityObject('shelf', a.step, restock.shelf[0], restock.shelf[1], a.carrying ? 'Place crate on shelf' : 'Shelf needs a crate', '✦');
  }
  if (a.id === 'warmup' && S.humanWorld.scene === 'square') {
    HUMAN_WORLD_ACTIVITY_DEFS.warmup.markers.forEach(function (point, i) {
      var button = humanAddActivityObject('marker', i, point[0], point[1], i === a.step ? 'Next warm-up marker' : 'Warm-up marker', String(i + 1));
      button.classList.toggle('done', i < a.step); button.classList.toggle('current', i === a.step);
    });
  }
}

function humanAddActivityObject(action, index, x, y, label, icon) {
  var b = document.createElement('button');
  b.className = 'human-activity-object'; b.dataset.action = action; b.dataset.index = index; b.dataset.x = x; b.dataset.y = y;
  b.style.left = x + '%'; b.style.top = y + '%'; b.setAttribute('aria-label', label); b.textContent = icon;
  b.onclick = function (event) { event.stopPropagation(); humanApproach({ type: 'activity', value: { action: action, index: index }, x: x, y: y }); };
  $('#human-activity-layer').appendChild(b); return b;
}

function humanActivityObject(object) {
  var a = S.humanWorld.activity; if (!a) return;
  if (a.id === 'restock' && object.action === 'crate' && !a.carrying) { a.carrying = true; humanStatus('Crate picked up. Bring it to the glowing shelf.'); }
  else if (a.id === 'restock' && object.action === 'shelf' && a.carrying) {
    a.carrying = false; a.step++;
    if (a.step >= 3) { humanCompleteActivity('Two Potions and Wren’s grateful nod.', function () { giveItem('potion', 2); }); return; }
    humanStatus('Shelf stocked. Two more crates to go.');
  }
  saveGame(); humanRenderActivityObjects(); humanUpdateObjective();
}

function humanCheckActivityProximity() {
  var a = S.humanWorld.activity; if (!a || a.id !== 'warmup' || S.humanWorld.scene !== 'square') return;
  var markers = HUMAN_WORLD_ACTIVITY_DEFS.warmup.markers, next = markers[a.step]; if (!next) return;
  if (humanDistance(HUMAN_PLAYER, { x: next[0], y: next[1] }) < 3.2) {
    a.step++; humanStatus('Marker ' + a.step + ' reached.');
    if (a.step >= markers.length) { humanCompleteActivity('Course complete. Rowan pretends not to be impressed.'); return; }
    saveGame(); humanRenderActivityObjects(); humanUpdateObjective();
  }
}

function humanDeliver(id) {
  var a = S.humanWorld.activity, def = HUMAN_WORLD_ACTIVITY_DEFS.bellRound;
  if (!a || a.id !== 'bellRound' || def.targets[a.step] !== id) return;
  a.step++;
  if (a.step >= def.targets.length) {
    humanCompleteActivity('Delivery round complete. Bell gives you a Great Ball.', function () { giveItem('great', 1); });
    return;
  }
  saveGame(); humanDialogueBack(); humanUpdateObjective();
  toast(def.labels[a.step]);
}

function humanCompleteActivity(message, reward) {
  var a = S.humanWorld.activity, def = a && HUMAN_WORLD_ACTIVITY_DEFS[a.id]; if (!def) return;
  if (reward) reward();
  changeFriendship(def.giver, 35);
  S.humanWorld.activity = null; humanAdvance(def.minutes); saveGame();
  humanCloseDialogue();
  if ($('#human-stage')) { humanRenderActors(); humanRenderActivityObjects(); humanRenderDirectory(); humanUpdateObjective(); }
  toast(message);
}

function humanStatus(text) {
  var el = $('#human-status'); if (el) el.textContent = text;
}

function humanAmbientMoment(now) {
  if (HUMAN_ACTORS.length < 2) return;
  var a = HUMAN_ACTORS[Math.floor((now / 1000) % HUMAN_ACTORS.length)];
  var b = null, best = 999;
  HUMAN_ACTORS.forEach(function (candidate) {
    if (candidate === a) return; var d = humanDistance(a, candidate); if (d < best) { best = d; b = candidate; }
  });
  if (!b || best > 18) return;
  var marks = ['♪','!','☀','♥'], mark = marks[Math.floor(now / 6500) % marks.length];
  [a,b].forEach(function (actor) {
    var emote = actor.el.querySelector('.human-emote'); emote.textContent = mark; emote.classList.add('on');
    setTimeout(function () { if (emote) emote.classList.remove('on'); }, 1800);
  });
  humanStatus(a.npc.name + ' and ' + b.npc.name + ' share a small town moment.');
}

/* Keyboard and pointer input are installed once. */
document.addEventListener('keydown', function (event) {
  if (CUR !== 'human') return;
  if (HUMAN_DIALOGUE) {
    if (event.key === 'Escape') { event.preventDefault(); humanCloseDialogue(); }
    return;
  }
  var key = event.key.toLowerCase();
  if (key === 'arrowleft' || key === 'a') { HUMAN_KEYS.left = true; HUMAN_LAST_AXIS = 'horizontal'; }
  else if (key === 'arrowright' || key === 'd') { HUMAN_KEYS.right = true; HUMAN_LAST_AXIS = 'horizontal'; }
  else if (key === 'arrowup' || key === 'w') { HUMAN_KEYS.up = true; HUMAN_LAST_AXIS = 'vertical'; }
  else if (key === 'arrowdown' || key === 's') { HUMAN_KEYS.down = true; HUMAN_LAST_AXIS = 'vertical'; }
  else if (key === 'e' || key === ' ' || key === 'enter') { event.preventDefault(); humanActivateNearby(); return; }
  else return;
  event.preventDefault();
});

document.addEventListener('keyup', function (event) {
  var key = event.key.toLowerCase();
  if (key === 'arrowleft' || key === 'a') HUMAN_KEYS.left = false;
  if (key === 'arrowright' || key === 'd') HUMAN_KEYS.right = false;
  if (key === 'arrowup' || key === 'w') HUMAN_KEYS.up = false;
  if (key === 'arrowdown' || key === 's') HUMAN_KEYS.down = false;
});

window.addEventListener('blur', function () { HUMAN_KEYS = {}; });

document.addEventListener('click', function (event) {
  if (CUR !== 'human' || HUMAN_DIALOGUE || !event.target.closest('#human-stage')) return;
  if (event.target.closest('button')) return;
  var point = humanStagePoint(event);
  if (humanIsWalkable(point.x, point.y, humanScene())) { HUMAN_PENDING = null; humanWalkPlayerTo(point.x, point.y); }
});
