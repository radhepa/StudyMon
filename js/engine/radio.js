/* StudyMon Radio.
   A 📻 button beside the logo opens a panel with two independent players:

   - Music: every song in RADIO_SONGS (js/data/radio-songs.js). Synthesized
     themes are scored in scale degrees and played live through Web Audio,
     the same way the town and Kingdom themes are; audio files play through a
     plain <audio> element. While the radio's music plays, the area themes in
     Bootstrap Town and the Kingdom stay quiet so two tunes never overlap.

   - Rain & thunder: ten synthesized ambiences built from four layers (rain
     hiss, drops, wind, thunder). Each preset remembers its own mix. Nothing
     is recorded audio; the noise is generated once when the radio first plays.

   Settings persist in localStorage under RADIO_STORE_KEY. They are listening
   preferences, not game progress, so they are kept out of the save file. */

var RADIO_STORE_KEY = 'studymon.radio.v1';

/* Layer levels are 0-100. `drops.rate` is raindrops per second, `thunder.every`
   is the gap range in seconds and `thunder.distance` runs from 0 (overhead) to
   1 (far away). `muffle` low-passes the whole ambience, as if heard from indoors.
   A preset with rain and drops at 0 is thunder on its own. */
var RADIO_AMBIENCES = [
  { id: 'drizzle', name: 'Light Drizzle', icon: '🌦', blurb: 'A fine, quiet mist of rain. Good for reading.',
    rain: { level: 38, lp: 7000, hp: 900, gust: .12 }, drops: { level: 30, rate: 9 },
    wind: { level: 10, lp: 380 }, thunder: { level: 0, every: [40, 80], distance: .8 } },
  { id: 'steady', name: 'Steady Rain', icon: '🌧', blurb: 'Even, medium rain that never changes pace.',
    rain: { level: 60, lp: 5200, hp: 400, gust: .16 }, drops: { level: 38, rate: 22 },
    wind: { level: 18, lp: 420 }, thunder: { level: 0, every: [35, 70], distance: .75 } },
  { id: 'night_rain', name: 'Soft Night Rain', icon: '🌙', blurb: 'Gentle rain heard through a closed window. Deep and calm.',
    rain: { level: 64, lp: 5200, hp: 200, gust: .14 }, drops: { level: 30, rate: 18 },
    wind: { level: 14, lp: 360 }, thunder: { level: 0, every: [35, 70], distance: .8 }, muffle: 1600 },
  { id: 'downpour', name: 'Heavy Downpour', icon: '💧', blurb: 'A thick wall of rain with gusts rolling through.',
    rain: { level: 82, lp: 4200, hp: 180, gust: .3 }, drops: { level: 46, rate: 48 },
    wind: { level: 42, lp: 520 }, thunder: { level: 0, every: [30, 60], distance: .7 } },
  { id: 'gusty', name: 'Windswept Rain', icon: '🌬', blurb: 'Rain driven in waves by a strong, steady wind.',
    rain: { level: 66, lp: 4800, hp: 250, gust: .45 }, drops: { level: 34, rate: 30 },
    wind: { level: 62, lp: 650 }, thunder: { level: 0, every: [30, 60], distance: .7 } },
  { id: 'distant_storm', name: 'Distant Thunderstorm', icon: '🌩', blurb: 'Steady rain with thunder rolling far off.',
    rain: { level: 55, lp: 5000, hp: 350, gust: .16 }, drops: { level: 34, rate: 20 },
    wind: { level: 22, lp: 420 }, thunder: { level: 55, every: [18, 38], distance: .85 } },
  { id: 'close_storm', name: 'Thunderstorm Overhead', icon: '⛈', blurb: 'Hard rain and sharp cracks right above you.',
    rain: { level: 74, lp: 4600, hp: 220, gust: .26 }, drops: { level: 44, rate: 40 },
    wind: { level: 36, lp: 500 }, thunder: { level: 72, every: [12, 28], distance: .2 } },
  { id: 'monsoon', name: 'Rolling Monsoon', icon: '🌀', blurb: 'Torrential rain, strong wind and near-constant rumbling.',
    rain: { level: 90, lp: 3900, hp: 150, gust: .38 }, drops: { level: 50, rate: 60 },
    wind: { level: 60, lp: 600 }, thunder: { level: 64, every: [7, 16], distance: .5 } },
  { id: 'thunder_far', name: 'Far Thunder Only', icon: '☁', blurb: 'No rain, just low thunder rumbling across the distance.',
    rain: { level: 0, lp: 5000, hp: 350, gust: .16 }, drops: { level: 0, rate: 20 },
    wind: { level: 18, lp: 380 }, thunder: { level: 80, every: [10, 24], distance: .85 } },
  { id: 'thunder_near', name: 'Close Thunder Only', icon: '⚡', blurb: 'No rain, just big nearby claps and long rolling echoes.',
    rain: { level: 0, lp: 5000, hp: 350, gust: .16 }, drops: { level: 0, rate: 20 },
    wind: { level: 20, lp: 420 }, thunder: { level: 75, every: [10, 22], distance: .3 } }
];

var RADIO = {
  audio: null,
  songIndex: 0,
  musicOn: false,
  mode: 'all',
  musicVol: 70,
  music: null,
  fileEl: null,
  ambId: 'steady',
  ambOn: false,
  amb: null,
  mix: {},
  panelOpen: false
};

/* ---- settings --------------------------------------------------------------- */

function radioLoadSettings() {
  try {
    var saved = JSON.parse(localStorage.getItem(RADIO_STORE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return;
    var songs = radioSongs();
    var index = songs.findIndex(function (song) { return song.id === saved.songId; });
    if (index >= 0) RADIO.songIndex = index;
    if (saved.mode === 'one' || saved.mode === 'all') RADIO.mode = saved.mode;
    if (typeof saved.musicVol === 'number') RADIO.musicVol = radioClamp(saved.musicVol);
    if (radioAmbience(saved.ambId)) RADIO.ambId = saved.ambId;
    if (saved.mix && typeof saved.mix === 'object') RADIO.mix = saved.mix;
  } catch (error) { }
}

function radioSaveSettings() {
  try {
    localStorage.setItem(RADIO_STORE_KEY, JSON.stringify({
      songId: (radioSongs()[RADIO.songIndex] || {}).id, mode: RADIO.mode,
      musicVol: RADIO.musicVol, ambId: RADIO.ambId, mix: RADIO.mix
    }));
  } catch (error) { }
}

function radioClamp(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

/* ---- song list ---------------------------------------------------------------- */

var RADIO_SONG_CACHE = null;

function radioScore(text) {
  if (Array.isArray(text)) return text;
  return String(text || '').trim().split(/\s+/).filter(function (token) {
    return token && token !== '|';
  }).map(function (token) {
    return token === '.' ? null : Number(token);
  });
}

function radioResolveSong(entry) {
  if (!entry || !entry.id) return null;
  var track = null;
  if (entry.from === 'town:bootstrap' && typeof HUMAN_MUSIC_TRACK !== 'undefined') {
    track = Object.assign({}, HUMAN_MUSIC_TRACK, { voice: 'lead', arpeggio: true, sparkle: true });
  } else if (entry.from && entry.from.indexOf('kingdom:') === 0 && typeof KINGDOM_MUSIC_TRACKS !== 'undefined') {
    track = KINGDOM_MUSIC_TRACKS[entry.from.slice(8)] || null;
  } else if (entry.melody) {
    track = {
      name: entry.name, bpm: entry.bpm || 80, root: entry.root || 72, stepsPerBar: entry.stepsPerBar || 8,
      scale: entry.scale || [0, 2, 4, 5, 7, 9, 11], chords: entry.chords || [0],
      voice: entry.voice || 'flute', melody: radioScore(entry.melody),
      arpeggio: !!entry.arpeggio, sparkle: !!entry.sparkle
    };
  }
  if (entry.file) {
    return { id: entry.id, name: entry.name || entry.file.split('/').pop(), artist: entry.artist || '', file: entry.file };
  }
  if (!track || !track.melody || !track.melody.length) return null;
  return { id: entry.id, name: entry.name || track.name, artist: entry.artist || '', track: track };
}

function radioSongs() {
  if (RADIO_SONG_CACHE) return RADIO_SONG_CACHE;
  var seen = {};
  RADIO_SONG_CACHE = (window.RADIO_SONGS || []).map(radioResolveSong).filter(function (song) {
    if (!song || seen[song.id]) return false;
    seen[song.id] = true;
    return true;
  });
  return RADIO_SONG_CACHE;
}

function radioCurrentSong() {
  return radioSongs()[RADIO.songIndex] || null;
}

function radioAmbience(id) {
  return RADIO_AMBIENCES.find(function (preset) { return preset.id === id; }) || null;
}

/* ---- audio graph ---------------------------------------------------------------- */

function radioAudio() {
  if (RADIO.audio) {
    if (RADIO.audio.context.state === 'suspended') RADIO.audio.context.resume().catch(function () { });
    return RADIO.audio;
  }
  var AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  try {
    var context = new AudioContextClass();
    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 20;
    compressor.ratio.value = 3;
    compressor.attack.value = .02;
    compressor.release.value = .5;
    // A fast limiter after the compressor keeps stacked thunder from clipping.
    var limiter = context.createDynamicsCompressor();
    limiter.threshold.value = -4;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = .002;
    limiter.release.value = .25;
    // Then a soft clipper: untouched below 0.7, bending smoothly to never pass 1.
    var clipper = context.createWaveShaper();
    var shape = new Float32Array(2049);
    for (var i = 0; i < shape.length; i++) {
      var x = i / 1024 - 1, mag = Math.abs(x);
      shape[i] = Math.sign(x) * (mag <= .7 ? mag : .7 + .3 * Math.tanh((mag - .7) / .3));
    }
    clipper.curve = shape;
    compressor.connect(limiter);
    limiter.connect(clipper);
    clipper.connect(context.destination);

    var musicBus = context.createGain();
    var musicTone = context.createBiquadFilter();
    musicBus.gain.value = radioMusicGain();
    musicTone.type = 'lowpass';
    musicTone.frequency.value = 7000;
    musicTone.Q.value = .25;
    musicBus.connect(musicTone);
    musicTone.connect(compressor);

    RADIO.audio = {
      context: context, out: compressor, musicBus: musicBus,
      white: radioNoiseBuffer(context, 'white'), pink: radioNoiseBuffer(context, 'pink'),
      brown: radioNoiseBuffer(context, 'brown')
    };
    return RADIO.audio;
  } catch (error) {
    return null;
  }
}

/* Six seconds of stereo noise per colour; the two channels are independent so
   the rain sounds wide rather than coming from a single point. */
function radioNoiseBuffer(context, colour) {
  var frames = Math.floor(context.sampleRate * 6);
  var buffer = context.createBuffer(2, frames, context.sampleRate);
  for (var channel = 0; channel < 2; channel++) {
    var data = buffer.getChannelData(channel);
    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (var i = 0; i < frames; i++) {
      var white = Math.random() * 2 - 1;
      if (colour === 'white') {
        data[i] = white * .5;
      } else if (colour === 'pink') {
        b0 = .99886 * b0 + white * .0555179; b1 = .99332 * b1 + white * .0750759;
        b2 = .969 * b2 + white * .153852; b3 = .8665 * b3 + white * .3104856;
        b4 = .55 * b4 + white * .5329522; b5 = -.7616 * b5 - white * .016898;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * .5362) * .11;
        b6 = white * .115926;
      } else {
        last = (last + .02 * white) / 1.02;
        data[i] = last * 3.5;
      }
    }
  }
  return buffer;
}

function radioMusicGain() {
  var level = RADIO.musicVol / 100;
  return level * level * 2.2;
}

/* Background tabs only run timers about once a second, so schedule further
   ahead while hidden to keep the sound continuous. */
function radioLookahead() {
  return document.hidden ? 1.6 : .42;
}

/* ---- music: synthesized songs --------------------------------------------------- */

var RADIO_VOICES = {
  flute: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .07, attack: .075, cutoff: 3200 },
  chime: { wave: 'sine', harmonic: 'sine', ratio: 2.01, harmonicGain: .22, attack: .008, cutoff: 6900 },
  pluck: { wave: 'triangle', harmonic: 'square', ratio: 2, harmonicGain: .055, attack: .006, cutoff: 2450 },
  glass: { wave: 'sine', harmonic: 'sine', ratio: 3, harmonicGain: .13, attack: .018, cutoff: 6100 },
  reed: { wave: 'triangle', harmonic: 'sine', ratio: 2, harmonicGain: .065, attack: .045, cutoff: 2800 },
  bell: { wave: 'sine', harmonic: 'sine', ratio: 2.5, harmonicGain: .18, attack: .01, cutoff: 6500 },
  lead: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .055, attack: .055, cutoff: 3900, vibrato: 4 },
  pizz: { wave: 'triangle', harmonic: 'sine', ratio: 2, harmonicGain: .045, attack: .008, cutoff: 2300 },
  pad: { wave: 'sine', harmonic: 'triangle', ratio: 2, harmonicGain: .03, attack: .34, cutoff: 2000 },
  bass: { wave: 'triangle', harmonic: 'sine', ratio: .5, harmonicGain: .06, attack: .03, cutoff: 720 }
};

function radioMidi(track, degree, shift) {
  var length = track.scale.length;
  var octave = Math.floor(degree / length);
  var index = ((degree % length) + length) % length;
  return track.root + track.scale[index] + octave * 12 + (shift || 0);
}

function radioTone(context, bus, midi, time, duration, voiceName, volume) {
  var voice = RADIO_VOICES[voiceName] || RADIO_VOICES.flute;
  var frequency = 440 * Math.pow(2, (midi - 69) / 12);
  var envelope = context.createGain();
  var filter = context.createBiquadFilter();
  var primary = context.createOscillator();
  var overtone = context.createOscillator();
  var overtoneGain = context.createGain();
  var stopAt = time + duration + .08;

  primary.type = voice.wave;
  primary.frequency.setValueAtTime(frequency, time);
  overtone.type = voice.harmonic;
  overtone.frequency.setValueAtTime(frequency * voice.ratio, time);
  overtoneGain.gain.value = voice.harmonicGain;
  filter.type = 'lowpass';
  filter.frequency.value = voice.cutoff;
  filter.Q.value = .35;
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.linearRampToValueAtTime(volume, time + Math.min(voice.attack, duration * .3));
  envelope.gain.setValueAtTime(volume * .74, time + Math.max(voice.attack + .03, duration * .54));
  envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);

  if (voice.vibrato) {
    var vibrato = context.createOscillator();
    var depth = context.createGain();
    vibrato.frequency.value = 5.1;
    depth.gain.value = voice.vibrato;
    vibrato.connect(depth);
    depth.connect(primary.detune);
    depth.connect(overtone.detune);
    vibrato.start(time + Math.min(.22, duration * .3));
    vibrato.stop(stopAt);
  }

  primary.connect(filter);
  overtone.connect(overtoneGain);
  overtoneGain.connect(filter);
  filter.connect(envelope);
  envelope.connect(bus);
  primary.start(time);
  overtone.start(time);
  primary.stop(stopAt);
  overtone.stop(stopAt);
}

function radioScheduleStep(player) {
  var track = player.track;
  var context = player.context;
  var bus = player.bus;
  var at = player.nextTime;
  var step = player.step;
  var stepSeconds = 60 / track.bpm / 2;
  var withinBar = step % track.stepsPerBar;
  var bar = Math.floor(step / track.stepsPerBar);
  var chord = track.chords[bar % track.chords.length];

  if (withinBar === 0) {
    [chord, chord + 2, chord + 4].forEach(function (degree) {
      radioTone(context, bus, radioMidi(track, degree, -12), at, stepSeconds * (track.stepsPerBar - .3), 'pad', .0072);
    });
    radioTone(context, bus, radioMidi(track, chord, -24), at, stepSeconds * Math.max(2.4, track.stepsPerBar * .5), 'bass', .02);
  } else if (withinBar === Math.floor(track.stepsPerBar / 2)) {
    radioTone(context, bus, radioMidi(track, chord + 4, -24), at, stepSeconds * 2.2, 'bass', .012);
  }

  if (track.arpeggio) {
    var shape = [0, 2, 4, 2, 0, 2, 5, 4];
    radioTone(context, bus, radioMidi(track, chord + shape[withinBar % shape.length], -12), at, stepSeconds * .82, 'pizz', .006);
  }

  var degree = track.melody[step % track.melody.length];
  if (degree !== null && degree !== undefined && !isNaN(degree)) {
    if (player.cycle % 2 === 1 && step % (track.stepsPerBar * 4) === track.stepsPerBar * 3) degree += 7;
    var ringing = track.voice === 'bell' || track.voice === 'glass';
    radioTone(context, bus, radioMidi(track, degree, 0), at, stepSeconds * (ringing ? 2.7 : 1.68), track.voice || 'flute',
      track.voice === 'pluck' ? .027 : .024);
  }

  if (track.sparkle && withinBar === track.stepsPerBar - 2 && bar % 4 === 3) {
    radioTone(context, bus, radioMidi(track, chord + 7, 0), at, stepSeconds * 2.3, 'bell', .0065);
  }
}

function radioSynthTick(player) {
  if (RADIO.music !== player) return;
  var horizon = player.context.currentTime + radioLookahead();
  while (player.nextTime < horizon) {
    radioScheduleStep(player);
    player.nextTime += 60 / player.track.bpm / 2;
    player.step++;
    if (player.step >= player.track.melody.length) {
      player.step = 0;
      player.cycle++;
      // "Play all" moves on after two passes through a synthesized tune.
      if (RADIO.mode === 'all' && player.cycle >= 2) {
        var endAt = player.nextTime;
        setTimeout(function () { if (RADIO.music === player) radioStep(1); },
          Math.max(0, (endAt - player.context.currentTime) * 1000));
        player.done = true;
        return;
      }
    }
  }
}

/* ---- music: transport ----------------------------------------------------------- */

function radioStopMusicPlayer(fade) {
  var player = RADIO.music;
  RADIO.music = null;
  if (player && player.bus) {
    clearInterval(player.timer);
    var now = player.context.currentTime;
    player.bus.gain.cancelScheduledValues(now);
    player.bus.gain.setValueAtTime(Math.max(.0001, player.bus.gain.value), now);
    player.bus.gain.linearRampToValueAtTime(.0001, now + fade);
    setTimeout(function () { try { player.bus.disconnect(); } catch (error) { } }, fade * 1000 + 200);
  }
  if (RADIO.fileEl) {
    RADIO.fileEl.pause();
    RADIO.fileEl.removeAttribute('src');
    RADIO.fileEl.load();
    RADIO.fileEl = null;
  }
}

function radioStartMusicPlayer() {
  var song = radioCurrentSong();
  var audio = radioAudio();
  if (!song || !audio) return false;
  radioStopMusicPlayer(.6);

  if (song.file) {
    var element = new Audio();
    element.src = song.file;
    element.loop = RADIO.mode === 'one';
    element.volume = Math.min(1, radioMusicGain() / 2.2);
    element.addEventListener('ended', function () { if (RADIO.fileEl === element) radioStep(1); });
    element.addEventListener('error', function () {
      if (RADIO.fileEl !== element) return;
      toast('Could not play ' + song.name + '. Check the file path in js/data/radio-songs.js.');
      radioPause();
    });
    RADIO.fileEl = element;
    RADIO.music = { file: true, song: song };
    element.play().catch(function () { });
    return true;
  }

  var context = audio.context;
  var bus = context.createGain();
  bus.gain.setValueAtTime(.0001, context.currentTime);
  bus.gain.linearRampToValueAtTime(1, context.currentTime + 1.2);
  bus.connect(audio.musicBus);
  var player = {
    song: song, track: song.track, context: context, bus: bus,
    step: 0, cycle: 0, nextTime: context.currentTime + .1, timer: 0
  };
  RADIO.music = player;
  radioSynthTick(player);
  player.timer = setInterval(function () { if (!player.done) radioSynthTick(player); }, 110);
  return true;
}

function radioPlay() {
  if (!radioStartMusicPlayer()) {
    toast('The radio needs a browser with Web Audio.');
    return;
  }
  RADIO.musicOn = true;
  // Area themes step aside while the radio has the floor.
  if (typeof humanStopMusic === 'function') humanStopMusic(false);
  if (typeof kingdomStopMusic === 'function') kingdomStopMusic(false);
  radioSaveSettings();
  radioRefresh();
}

function radioPause() {
  RADIO.musicOn = false;
  radioStopMusicPlayer(.5);
  radioResumeAreaMusic();
  radioRefresh();
}

function radioResumeAreaMusic() {
  if (typeof CUR === 'undefined') return;
  if (CUR === 'human' && typeof HUMAN_MUSIC_ON !== 'undefined' && HUMAN_MUSIC_ON) humanStartMusic();
  if (CUR === 'kingdom' && typeof KINGDOM_MUSIC_ON !== 'undefined' && KINGDOM_MUSIC_ON) kingdomStartMusic(KINGDOM_LOCATION);
}

function radioMusicPlaying() {
  return RADIO.musicOn;
}

function radioTogglePlay() {
  if (RADIO.musicOn) radioPause();
  else radioPlay();
}

function radioStep(direction) {
  var count = radioSongs().length;
  if (!count) return;
  RADIO.songIndex = (RADIO.songIndex + direction + count) % count;
  if (RADIO.musicOn) radioStartMusicPlayer();
  radioSaveSettings();
  radioRefresh();
}

function radioPick(index) {
  if (!radioSongs()[index]) return;
  RADIO.songIndex = index;
  radioPlay();
}

function radioSetMode(mode) {
  RADIO.mode = mode === 'one' ? 'one' : 'all';
  if (RADIO.fileEl) RADIO.fileEl.loop = RADIO.mode === 'one';
  if (RADIO.music && RADIO.music.track && RADIO.mode === 'all' && RADIO.music.cycle >= 2) RADIO.music.cycle = 1;
  radioSaveSettings();
  radioRefresh();
}

function radioSetMusicVolume(value) {
  RADIO.musicVol = radioClamp(value);
  if (RADIO.audio) {
    var now = RADIO.audio.context.currentTime;
    RADIO.audio.musicBus.gain.setTargetAtTime(radioMusicGain(), now, .05);
  }
  if (RADIO.fileEl) RADIO.fileEl.volume = Math.min(1, radioMusicGain() / 2.2);
  radioLabel('radio-music-vol-out', RADIO.musicVol + '%');
  radioSaveSettingsSoon();
}

/* ---- rain and thunder ----------------------------------------------------------- */

function radioMix(preset) {
  var saved = RADIO.mix[preset.id] || {};
  var pick = function (key, fallback) {
    return typeof saved[key] === 'number' ? radioClamp(saved[key]) : fallback;
  };
  return {
    volume: pick('volume', 70),
    rain: pick('rain', preset.rain.level),
    drops: pick('drops', preset.drops.level),
    wind: pick('wind', preset.wind.level),
    thunder: pick('thunder', preset.thunder.level)
  };
}

/* Perceptual curve: slider 50 is roughly a quarter of full power. */
function radioLevel(value, scale) {
  var x = value / 100;
  return x * x * scale;
}

var RADIO_LAYER_SCALE = { volume: 1.25, rain: 1.1, drops: 9, wind: 3.2, thunder: 3.2 };

function radioLoopLayer(context, buffer, rate, destination) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.loopStart = Math.random() * 2;
  source.playbackRate.value = rate;
  source.connect(destination);
  source.start(context.currentTime, Math.random() * 5);
  return source;
}

function radioLfo(context, target, rate, depth) {
  var lfo = context.createOscillator();
  var amount = context.createGain();
  lfo.frequency.value = rate;
  amount.gain.value = depth;
  lfo.connect(amount);
  amount.connect(target);
  lfo.start();
  return lfo;
}

function radioBuildAmbience(preset) {
  var audio = radioAudio();
  if (!audio) return null;
  var context = audio.context;
  var mix = radioMix(preset);
  var sources = [];

  var master = context.createGain();
  master.gain.setValueAtTime(.0001, context.currentTime);
  master.gain.linearRampToValueAtTime(radioLevel(mix.volume, RADIO_LAYER_SCALE.volume), context.currentTime + 1.8);
  var tone = context.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = Math.min(preset.muffle || 16000, context.sampleRate / 2 - 100);
  tone.Q.value = .5;
  master.connect(tone);
  tone.connect(audio.out);

  var layer = function (key) {
    var gain = context.createGain();
    gain.gain.value = radioLevel(mix[key], RADIO_LAYER_SCALE[key]);
    gain.connect(master);
    return gain;
  };
  var gains = { rain: layer('rain'), drops: layer('drops'), wind: layer('wind'), thunder: layer('thunder') };

  // Rain hiss: two pink-noise beds at slightly different speeds, band-limited,
  // with a slow swell so it breathes like real weather.
  var rainGust = context.createGain();
  rainGust.gain.value = 1 - preset.rain.gust;
  sources.push(radioLfo(context, rainGust.gain, .09 + Math.random() * .05, preset.rain.gust));
  var rainHp = context.createBiquadFilter();
  rainHp.type = 'highpass';
  rainHp.frequency.value = preset.rain.hp;
  var rainLp = context.createBiquadFilter();
  rainLp.type = 'lowpass';
  rainLp.frequency.value = preset.rain.lp;
  rainHp.connect(rainLp);
  rainLp.connect(rainGust);
  rainGust.connect(gains.rain);
  sources.push(radioLoopLayer(context, audio.pink, 1, rainHp));
  sources.push(radioLoopLayer(context, audio.white, .93, rainHp));

  // Wind: brown noise through a low-pass whose cutoff drifts, plus a slow swell.
  var windLp = context.createBiquadFilter();
  windLp.type = 'lowpass';
  windLp.frequency.value = preset.wind.lp;
  windLp.Q.value = 1.4;
  sources.push(radioLfo(context, windLp.frequency, .05, preset.wind.lp * .45));
  var windSwell = context.createGain();
  windSwell.gain.value = .65;
  sources.push(radioLfo(context, windSwell.gain, .037, .35));
  windLp.connect(windSwell);
  windSwell.connect(gains.wind);
  sources.push(radioLoopLayer(context, audio.brown, .8, windLp));

  var amb = {
    preset: preset, context: context, master: master, gains: gains, sources: sources,
    nextDrop: context.currentTime + .2,
    nextThunder: context.currentTime + 3 + Math.random() * 6,
    timer: 0
  };
  amb.timer = setInterval(function () { radioAmbienceTick(amb); }, 80);
  return amb;
}

function radioAmbienceTick(amb) {
  if (RADIO.amb !== amb) return;
  var context = amb.context;
  var now = context.currentTime;
  var preset = amb.preset;
  var horizon = now + radioLookahead();
  var rate = preset.drops.rate;
  if (amb.nextDrop < now) amb.nextDrop = now + .02;
  while (amb.nextDrop < horizon) {
    radioDrop(amb, amb.nextDrop);
    var gap = -Math.log(1 - Math.random()) / rate;
    amb.nextDrop += gap;
  }
  if (now >= amb.nextThunder) {
    var mix = radioMix(preset);
    if (mix.thunder > 0) radioThunder(amb, now + .05, preset.thunder.distance);
    var every = preset.thunder.every;
    amb.nextThunder = now + every[0] + Math.random() * (every[1] - every[0]);
  }
}

function radioPanner(context, destination, spread) {
  if (!context.createStereoPanner) return destination;
  var pan = context.createStereoPanner();
  pan.pan.value = (Math.random() * 2 - 1) * spread;
  pan.connect(destination);
  return pan;
}

function radioNoiseBurst(amb, time, duration, filterType, frequency, q, volume, destination) {
  var context = amb.context;
  var source = context.createBufferSource();
  var filter = context.createBiquadFilter();
  var envelope = context.createGain();
  source.buffer = RADIO.audio.white;
  filter.type = filterType;
  filter.frequency.value = frequency;
  filter.Q.value = q;
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.linearRampToValueAtTime(volume, time + Math.min(.004, duration * .2));
  envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
  source.connect(filter);
  filter.connect(envelope);
  envelope.connect(destination);
  source.start(time, Math.random() * 5, duration + .02);
}

function radioDrop(amb, time) {
  var out = radioPanner(amb.context, amb.gains.drops, .85);
  var loud = .45 + Math.random() * .55;
  radioNoiseBurst(amb, time, .012 + Math.random() * .03, 'bandpass', 1300 + Math.random() * 4200, 1.1, .5 * loud, out);
}

/* A thunder clap is a long brown-noise rumble whose low-pass cutoff falls as it
   rolls away, with irregular swells. Close strikes add a bright crack first. */
function radioThunder(amb, time, distance) {
  var context = amb.context;
  var dest = radioPanner(context, amb.gains.thunder, .6);
  var duration = 5 + Math.random() * 4 + distance * 3;
  var source = context.createBufferSource();
  var filter = context.createBiquadFilter();
  var envelope = context.createGain();
  source.buffer = RADIO.audio.brown;
  source.loop = true;
  source.playbackRate.value = .55 + Math.random() * .3;
  filter.type = 'lowpass';
  filter.Q.value = .8;
  var bright = 1600 - distance * 1200;
  filter.frequency.setValueAtTime(bright, time);
  filter.frequency.exponentialRampToValueAtTime(90 + (1 - distance) * 60, time + duration);

  var points = 64;
  var curve = new Float32Array(points);
  var swells = [];
  for (var s = 0; s < 3 + Math.floor(Math.random() * 4); s++) {
    swells.push({ at: Math.random() * .7, width: .04 + Math.random() * .12, size: .3 + Math.random() * .7 });
  }
  var attack = .01 + distance * .08;
  for (var i = 0; i < points; i++) {
    var x = i / (points - 1);
    var body = Math.min(1, x / attack) * Math.pow(1 - x, 1.6);
    var roll = swells.reduce(function (sum, swell) {
      var d = (x - swell.at) / swell.width;
      return sum + swell.size * Math.exp(-d * d);
    }, 0);
    curve[i] = Math.max(.0001, Math.min(1, body * (.55 + roll * .6)) * (1.1 - distance * .35));
  }
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.setValueCurveAtTime(curve, time + .001, duration);

  source.connect(filter);
  filter.connect(envelope);
  envelope.connect(dest);
  source.start(time, Math.random() * 5);
  source.stop(time + duration + .1);

  if (distance < .5) {
    radioNoiseBurst(amb, time, .25 + Math.random() * .2, 'highpass', 900, .5, (.5 - distance) * 1.1, dest);
    radioNoiseBurst(amb, time + .05, .6, 'lowpass', 2500, .6, (.5 - distance) * .6, dest);
  }
}

function radioThunderNow() {
  if (!RADIO.ambOn || !RADIO.amb) {
    toast('Turn the rain on first.');
    return;
  }
  var amb = RADIO.amb;
  if (radioMix(amb.preset).thunder === 0) {
    toast('Raise the Thunder slider to hear it.');
    return;
  }
  radioThunder(amb, amb.context.currentTime + .05, amb.preset.thunder.distance);
  var every = amb.preset.thunder.every;
  amb.nextThunder = amb.context.currentTime + every[0];
}

function radioStopAmbience(fade) {
  var amb = RADIO.amb;
  RADIO.amb = null;
  if (!amb) return;
  clearInterval(amb.timer);
  var now = amb.context.currentTime;
  amb.master.gain.cancelScheduledValues(now);
  amb.master.gain.setValueAtTime(Math.max(.0001, amb.master.gain.value), now);
  amb.master.gain.linearRampToValueAtTime(.0001, now + fade);
  setTimeout(function () {
    amb.sources.forEach(function (source) { try { source.stop(); } catch (error) { } });
    try { amb.master.disconnect(); } catch (error) { }
  }, fade * 1000 + 250);
}

function radioStartAmbience() {
  var preset = radioAmbience(RADIO.ambId);
  if (!preset) return false;
  radioStopAmbience(1.2);
  var amb = radioBuildAmbience(preset);
  if (!amb) return false;
  RADIO.amb = amb;
  return true;
}

function radioToggleAmbience() {
  if (RADIO.ambOn) {
    RADIO.ambOn = false;
    radioStopAmbience(1.2);
  } else if (radioStartAmbience()) {
    RADIO.ambOn = true;
  } else {
    toast('The radio needs a browser with Web Audio.');
  }
  radioRefresh();
}

function radioPickAmbience(id) {
  if (!radioAmbience(id)) return;
  RADIO.ambId = id;
  if (radioStartAmbience()) RADIO.ambOn = true;
  radioSaveSettings();
  radioRefresh();
}

function radioSetAmbienceLevel(key, value) {
  var preset = radioAmbience(RADIO.ambId);
  if (!preset || !RADIO_LAYER_SCALE[key]) return;
  var mix = radioMix(preset);
  mix[key] = radioClamp(value);
  RADIO.mix[preset.id] = mix;
  var amb = RADIO.amb;
  if (amb && amb.preset === preset) {
    var target = key === 'volume' ? amb.master.gain : amb.gains[key].gain;
    var now = amb.context.currentTime;
    target.cancelScheduledValues(now);
    target.setTargetAtTime(radioLevel(mix[key], RADIO_LAYER_SCALE[key]), now, .06);
  }
  radioLabel('radio-amb-' + key + '-out', mix[key] + '%');
  radioSaveSettingsSoon();
}

function radioResetMix() {
  var preset = radioAmbience(RADIO.ambId);
  if (!preset) return;
  delete RADIO.mix[preset.id];
  var mix = radioMix(preset);
  var amb = RADIO.amb;
  if (amb && amb.preset === preset) {
    var now = amb.context.currentTime;
    Object.keys(RADIO_LAYER_SCALE).forEach(function (key) {
      var target = key === 'volume' ? amb.master.gain : amb.gains[key].gain;
      target.cancelScheduledValues(now);
      target.setTargetAtTime(radioLevel(mix[key], RADIO_LAYER_SCALE[key]), now, .08);
    });
  }
  radioSaveSettings();
  radioRefresh();
}

/* ---- panel ---------------------------------------------------------------------- */

var RADIO_SAVE_TIMER = 0;
function radioSaveSettingsSoon() {
  clearTimeout(RADIO_SAVE_TIMER);
  RADIO_SAVE_TIMER = setTimeout(radioSaveSettings, 300);
}

function radioLabel(id, text) {
  var node = document.getElementById(id);
  if (node) node.textContent = text;
}

/* The chip rendered into the top bar by renderTopbar(). */
function radioChip() {
  var song = radioCurrentSong();
  var amb = radioAmbience(RADIO.ambId);
  var status = [];
  if (RADIO.musicOn && song) status.push('♪ ' + song.name);
  if (RADIO.ambOn && amb) status.push(amb.icon + ' ' + amb.name);
  return '<button type="button" id="radio-chip" class="chip radio-chip' + (status.length ? ' live' : '') + '" ' +
    'aria-haspopup="dialog" aria-expanded="' + RADIO.panelOpen + '" aria-controls="radio-panel" ' +
    'onclick="radioTogglePanel(event)" title="StudyMon Radio">' +
    '<span aria-hidden="true">📻</span> Radio' +
    (status.length ? '<span class="radio-chip-now">' + esc(status.join(' · ')) + '</span>' : '') + '</button>';
}

function radioSlider(id, label, value, handler) {
  return '<label class="radio-slider" for="' + id + '"><span>' + esc(label) + '</span>' +
    '<input type="range" id="' + id + '" min="0" max="100" step="1" value="' + value + '" oninput="' + handler + '">' +
    '<output id="' + id + '-out">' + value + '%</output></label>';
}

function radioPanelHTML() {
  var songs = radioSongs();
  var song = radioCurrentSong();
  var preset = radioAmbience(RADIO.ambId) || RADIO_AMBIENCES[0];
  var mix = radioMix(preset);

  return '<div class="radio-head"><h2 id="radio-title"><span aria-hidden="true">📻</span> StudyMon Radio</h2>' +
    '<button type="button" class="radio-close" onclick="radioClosePanel(true)" aria-label="Close radio">×</button></div>' +

    '<section class="radio-sec" aria-labelledby="radio-music-h">' +
      '<h3 id="radio-music-h">Music</h3>' +
      '<div class="radio-now"><span class="radio-now-label">' + (RADIO.musicOn ? 'Now playing' : 'Paused') + '</span>' +
        '<b>' + esc(song ? song.name : 'No songs') + '</b>' +
        (song && song.artist ? '<span class="radio-artist">' + esc(song.artist) + '</span>' : '') + '</div>' +
      '<div class="radio-transport">' +
        '<button type="button" onclick="radioStep(-1)" aria-label="Previous song">⏮</button>' +
        '<button type="button" class="primary radio-play" onclick="radioTogglePlay()" aria-label="' + (RADIO.musicOn ? 'Pause' : 'Play') + '">' +
          (RADIO.musicOn ? '❚❚ Pause' : '▶ Play') + '</button>' +
        '<button type="button" onclick="radioStep(1)" aria-label="Next song">⏭</button>' +
        '<div class="radio-mode" role="group" aria-label="Playback order">' +
          '<button type="button" aria-pressed="' + (RADIO.mode === 'all') + '" onclick="radioSetMode(\'all\')">Play all</button>' +
          '<button type="button" aria-pressed="' + (RADIO.mode === 'one') + '" onclick="radioSetMode(\'one\')">Repeat one</button>' +
        '</div></div>' +
      radioSlider('radio-music-vol', 'Volume', RADIO.musicVol, 'radioSetMusicVolume(this.value)') +
      '<ol class="radio-songs">' + songs.map(function (item, index) {
        var current = index === RADIO.songIndex;
        return '<li><button type="button" class="' + (current ? 'current' : '') + '" onclick="radioPick(' + index + ')"' +
          (current ? ' aria-current="true"' : '') + '><span class="radio-song-name">' +
          (current && RADIO.musicOn ? '♪ ' : '') + esc(item.name) + '</span>' +
          (item.artist ? '<span class="radio-artist">' + esc(item.artist) + '</span>' : '') + '</button></li>';
      }).join('') + '</ol>' +
      '<details class="radio-help"><summary>Add your own songs</summary>' +
        '<p>Put an audio file (mp3, ogg, wav or m4a) in <code>assets/music/</code>, then add one line to ' +
        '<code>js/data/radio-songs.js</code>:</p>' +
        '<pre>{ id: \'my_song\', name: \'My Song\', file: \'assets/music/my-song.mp3\' },</pre>' +
        '<p>Reload the game and it appears here. The top of that file also explains how to write a new synthesized tune.</p>' +
      '</details>' +
    '</section>' +

    '<section class="radio-sec" aria-labelledby="radio-amb-h">' +
      '<div class="radio-sec-head"><h3 id="radio-amb-h">Rain &amp; Thunder</h3>' +
        '<button type="button" class="radio-switch" aria-pressed="' + RADIO.ambOn + '" onclick="radioToggleAmbience()">' +
          (RADIO.ambOn ? 'On' : 'Off') + '</button></div>' +
      '<div class="radio-presets" role="group" aria-label="Rain type">' + RADIO_AMBIENCES.map(function (item) {
        var picked = item.id === preset.id;
        return '<button type="button" aria-pressed="' + picked + '" class="' + (picked && RADIO.ambOn ? 'live' : '') + '" ' +
          'onclick="radioPickAmbience(\'' + item.id + '\')"><span aria-hidden="true">' + item.icon + '</span>' +
          '<span>' + esc(item.name) + '</span></button>';
      }).join('') + '</div>' +
      '<p class="radio-blurb"><b>' + esc(preset.name) + '.</b> ' + esc(preset.blurb) + '</p>' +
      '<div class="radio-mixer">' +
        radioSlider('radio-amb-volume', 'Overall', mix.volume, 'radioSetAmbienceLevel(\'volume\',this.value)') +
        radioSlider('radio-amb-rain', 'Rain', mix.rain, 'radioSetAmbienceLevel(\'rain\',this.value)') +
        radioSlider('radio-amb-drops', 'Raindrops', mix.drops, 'radioSetAmbienceLevel(\'drops\',this.value)') +
        radioSlider('radio-amb-wind', 'Wind', mix.wind, 'radioSetAmbienceLevel(\'wind\',this.value)') +
        radioSlider('radio-amb-thunder', 'Thunder', mix.thunder, 'radioSetAmbienceLevel(\'thunder\',this.value)') +
      '</div>' +
      '<div class="radio-actions">' +
        '<button type="button" onclick="radioThunderNow()">⚡ Thunder now</button>' +
        '<button type="button" class="ghost" onclick="radioResetMix()">Reset this mix</button>' +
      '</div>' +
    '</section>';
}

function radioPanelEl() {
  var panel = document.getElementById('radio-panel');
  if (panel) return panel;
  panel = document.createElement('div');
  panel.id = 'radio-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'radio-title');
  panel.hidden = true;
  document.body.appendChild(panel);
  return panel;
}

function radioPlacePanel() {
  var panel = document.getElementById('radio-panel');
  var chip = document.getElementById('radio-chip');
  if (!panel || panel.hidden) return;
  var gutter = 16;
  var width = Math.min(440, window.innerWidth - gutter * 2);
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

function radioRefresh() {
  if (RADIO.panelOpen) {
    var panel = radioPanelEl();
    var scroll = panel.scrollTop;
    var focusId = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.id : '';
    panel.innerHTML = radioPanelHTML();
    panel.scrollTop = scroll;
    if (focusId && document.getElementById(focusId)) document.getElementById(focusId).focus({ preventScroll: true });
  }
  var chip = document.getElementById('radio-chip');
  if (chip) chip.outerHTML = radioChip();
  radioPlacePanel();
}

function radioOpenPanel() {
  var panel = radioPanelEl();
  RADIO.panelOpen = true;
  panel.hidden = false;
  radioRefresh();
  var play = panel.querySelector('.radio-play');
  if (play) play.focus({ preventScroll: true });
}

function radioClosePanel(returnFocus) {
  var panel = document.getElementById('radio-panel');
  RADIO.panelOpen = false;
  if (panel) panel.hidden = true;
  radioRefresh();
  var chip = document.getElementById('radio-chip');
  if (returnFocus && chip) chip.focus({ preventScroll: true });
}

function radioTogglePanel(event) {
  if (event) event.stopPropagation();
  if (RADIO.panelOpen) radioClosePanel(true);
  else radioOpenPanel();
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && RADIO.panelOpen) {
    event.stopPropagation();
    radioClosePanel(true);
  }
}, true);

document.addEventListener('pointerdown', function (event) {
  if (!RADIO.panelOpen) return;
  var panel = document.getElementById('radio-panel');
  var chip = document.getElementById('radio-chip');
  if ((panel && panel.contains(event.target)) || (chip && chip.contains(event.target))) return;
  radioClosePanel();
});

window.addEventListener('resize', radioPlacePanel);
window.addEventListener('scroll', radioPlacePanel, { passive: true });

radioLoadSettings();
