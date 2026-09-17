/* StudyMon Radio — the song list.

   Everything the 📻 Radio button (next to the StudyMon logo) can play lives
   here. Songs play in the order listed. Reload the game after editing.

   ── HOW TO ADD A SONG ──────────────────────────────────────────────────────

   Option A: a real audio file (easiest)
     1. Copy the file into  assets/music/  (mp3, ogg, wav or m4a).
     2. Add a line to RADIO_SONGS below:

          { id: 'my_song', name: 'My Song', artist: 'Someone', file: 'assets/music/my-song.mp3' },

        `id` must be unique (letters, numbers, underscores). `artist` is optional.
        The file loops until you press Next, unless the radio is set to "Play all".

   Option B: reuse a theme that is already in the game
          { id: 'x', name: 'Lantern Waltz', from: 'kingdom:square' },
        `from` can be 'town:bootstrap' or 'kingdom:<district>'
        (green, square, market, riverside, hearth, hill).

   Option C: write a new synthesized tune, the same way the town themes are written
          { id: 'rainy_study', name: 'Rainy Study', artist: 'StudyMon',
            bpm: 70,              // beats per minute (each step is half a beat)
            root: 72,             // MIDI note of the key (60 = middle C, 72 = C an octave up)
            stepsPerBar: 8,       // 8 = 4/4 feel, 6 = waltz feel
            scale: [0, 2, 4, 5, 7, 9, 11],      // major; minor is [0, 2, 3, 5, 7, 8, 10]
            chords: [0, 5, 3, 4],               // one scale degree per bar, loops
            voice: 'flute',       // flute, chime, pluck, glass, reed, bell, lead
            melody: '0 . 2 4 | 5 . 4 2 | ...'   // scale degrees; '.' is a rest, '|' is ignored
          }
        Melody numbers are positions in `scale` (0 = root, 7 = root an octave up,
        -1 = one step below the root). Optional extras: `arpeggio: true` adds a soft
        plucked broken chord, `sparkle: true` adds a bell every fourth bar.

   Rain and thunder presets are in js/engine/radio.js (RADIO_AMBIENCES).
   ─────────────────────────────────────────────────────────────────────────── */

var RADIO_SONGS = [
  { id: 'sunlit_steps', from: 'town:bootstrap', artist: 'Bootstrap Town' },
  { id: 'meadow_lullaby', from: 'kingdom:green', artist: 'Kingdom · The Green' },
  { id: 'lantern_waltz', from: 'kingdom:square', artist: 'Kingdom · Town Square' },
  { id: 'berry_stroll', from: 'kingdom:market', artist: 'Kingdom · Market' },
  { id: 'riverglass', from: 'kingdom:riverside', artist: 'Kingdom · Riverside' },
  { id: 'homeward_lights', from: 'kingdom:hearth', artist: 'Kingdom · Hearth' },
  { id: 'moonbell_reverie', from: 'kingdom:hill', artist: 'Kingdom · The Hill' },

  /* Radio originals, written in the same style as the town themes. */
  { id: 'library_lamplight', name: 'Library Lamplight', artist: 'StudyMon Radio',
    bpm: 74, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 3, 4, 0, 3, 4, 0], voice: 'flute',
    melody: '4 . 2 . 0 . 2 4 | 5 . 4 . 2 . . . | 3 . 5 . 7 . 5 3 | 4 . . 2 1 . . . | ' +
            '0 . 2 4 7 . 6 4 | 5 . 3 . 7 . 5 . | 4 . 6 . 8 . 6 4 | 2 . 1 . 0 . . .' },
  { id: 'pointer_parade', name: 'Pointer Parade', artist: 'StudyMon Radio',
    bpm: 104, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 4, 3, 0], voice: 'pluck',
    melody: '0 2 4 . 7 . 4 2 | 1 . 4 . 6 5 4 . | 0 2 5 . 7 . 5 4 | 3 . 5 3 0 . . . | ' +
            '4 5 7 . 4 . 2 . | 6 . 4 . 1 2 4 . | 5 . 3 . 7 . 5 3 | 2 . 1 . 0 . . .' },
  { id: 'rainy_recursion', name: 'Rainy Recursion', artist: 'StudyMon Radio',
    bpm: 68, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 2, 6, 0, 3, 4, 0], voice: 'glass',
    melody: '4 . . 2 . 0 . . | 5 . . 7 . 5 . . | 4 . 2 . 6 . 4 . | 3 . . 1 . 6 . . | ' +
            '7 . 4 . 2 . 4 . | 5 . . 3 . 0 . . | 1 . 4 . 6 . 4 . | 2 . . 1 . 0 . .' },
  { id: 'semicolon_waltz', name: 'Semicolon Waltz', artist: 'StudyMon Radio',
    bpm: 84, root: 72, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 4, 0, 5, 1, 4, 0], voice: 'chime',
    melody: '0 . 2 4 . 2 | 3 . 5 7 . 5 | 4 . 6 8 . 6 | 4 . 2 0 . . | ' +
            '5 . 7 9 . 7 | 5 . 3 1 . 3 | 6 . 4 1 . 2 | 2 . 1 0 . .' },
  { id: 'heap_of_stars', name: 'Heap of Stars', artist: 'StudyMon Radio',
    bpm: 66, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 1, 0, 4, 0, 1, 5, 0], voice: 'bell',
    melody: '0 . . 4 . 7 . . | 8 . . 5 . 3 . . | 7 . 6 . 4 . 2 . | 4 . . 6 . 8 . . | ' +
            '7 . . 9 . 11 . . | 10 . . 8 . 5 . . | 7 . . 5 . 2 . . | 4 . . 2 . 0 . .' },
  { id: 'market_morning_jig', name: 'Market Morning Jig', artist: 'StudyMon Radio',
    bpm: 112, root: 74, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 6, 0, 4, 0, 6, 3, 0], voice: 'pluck',
    melody: '0 2 4 7 4 2 | 1 3 1 6 . 3 | 4 5 4 2 . 0 | 1 2 4 6 . 4 | ' +
            '7 6 4 2 4 7 | 8 6 3 6 . 8 | 7 5 3 5 . 7 | 4 2 1 0 . .' },
  { id: 'stack_lullaby', name: 'Stack Frame Lullaby', artist: 'StudyMon Radio',
    bpm: 64, root: 69, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 0, 4, 5, 3, 4, 0], voice: 'flute',
    melody: '2 . . 1 0 . . . | 3 . . 5 5 . 3 . | 4 . . 2 2 . 0 . | 1 . . 2 1 . . . | ' +
            '0 . . 2 5 . 4 . | 3 . . 5 7 . 5 . | 6 . . 4 4 . 1 . | 2 . . 1 0 . . .' },
  { id: 'compile_quest', name: 'Compile Quest', artist: 'StudyMon Radio',
    bpm: 98, root: 74, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 0, 6, 0, 3, 4, 0], voice: 'reed',
    melody: '0 . 0 2 4 . 2 0 | 3 . 5 . 7 . 5 3 | 4 . 2 4 7 . 4 2 | 1 . 3 . 6 . 3 1 | ' +
            '0 2 4 . 7 . 9 . | 7 . 8 7 5 . 3 . | 4 . 6 . 8 . 6 4 | 2 . 1 . 0 . . .' },
  { id: 'sunset_ferry', name: 'Sunset Ferry', artist: 'StudyMon Radio',
    bpm: 72, root: 70, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 3, 4, 0, 5, 4, 0], voice: 'glass',
    melody: '4 . . 2 . 0 | 5 . . 7 . 5 | 3 . . 5 . 3 | 4 . 2 1 . . | ' +
            '2 . . 4 . 7 | 9 . . 7 . 5 | 6 . . 4 . 1 | 2 . 1 0 . .' },
  { id: 'midnight_debugger', name: 'Midnight Debugger', artist: 'StudyMon Radio',
    bpm: 78, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 4, 0, 5, 4, 0], voice: 'chime',
    melody: '0 . 2 . 4 . 2 . | 0 . 5 . 7 . 5 . | 5 . 3 . 0 . 3 . | 4 . 1 . 6 . . . | ' +
            '7 . 6 . 4 . 2 . | 5 . 7 . 9 . 7 . | 8 . 6 . 4 . 1 . | 2 . 1 . 0 . . .' },
  { id: 'kettle_notebook', name: 'Kettle & Notebook', artist: 'StudyMon Radio',
    bpm: 88, root: 76, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'reed',
    melody: '0 . 4 . 2 . 4 . | 1 . 4 . 6 . 4 . | 5 . 2 . 0 . 2 . | 3 . 5 . 0 . . . | ' +
            '2 . 4 . 7 . 4 . | 3 . 5 . 8 . 5 . | 6 . 4 . 1 . 2 . | 0 . 2 . 0 . . .' },
  { id: 'gym_tea_break', name: "Gym Leader's Tea Break", artist: 'StudyMon Radio',
    bpm: 92, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 6, 3, 0, 4, 6, 3, 0], voice: 'flute', arpeggio: true,
    melody: '0 2 4 . 2 . 0 . | 1 . 3 . 6 . 3 . | 5 . 3 . 7 . 5 . | 4 . 2 . 0 . . . | ' +
            '4 . 6 . 8 . 6 . | 6 . 8 . 10 . 8 . | 7 . 5 . 3 . 5 . | 4 . 2 . 0 . . .' },
  { id: 'cavern_echoes', name: 'Cavern Echoes', artist: 'StudyMon Radio',
    bpm: 60, root: 64, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 4, 0, 5, 6, 0], voice: 'glass',
    melody: '0 . . . 7 . . . | 5 . . . 2 . . . | 3 . . . 7 . . . | 6 . . . 4 . . . | ' +
            '4 . . 7 9 . . . | 7 . . 5 5 . . . | 6 . . 3 1 . . . | 2 . . 1 0 . . .' },
  { id: 'bicycle_route', name: 'Bicycle Route', artist: 'StudyMon Radio',
    bpm: 116, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 0, 4, 0, 3, 4, 0], voice: 'pluck', sparkle: true,
    melody: '0 2 4 7 4 2 4 7 | 5 . 3 5 7 . 5 3 | 4 2 0 2 4 . 7 . | 6 . 4 . 1 2 4 . | ' +
            '7 6 4 2 0 2 4 . | 3 5 7 5 3 . 0 . | 1 2 4 6 8 . 6 . | 7 . 4 . 0 . . .' },
  { id: 'snowfall_syntax', name: 'Snowfall Syntax', artist: 'StudyMon Radio',
    bpm: 70, root: 77, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 0, 4, 5, 3, 4, 0], voice: 'bell',
    melody: '7 . . 4 . . | 5 . . 7 . . | 4 . 2 0 . . | 1 . . 4 . . | ' +
            '2 . . 5 . 7 | 7 . . 5 . 3 | 4 . . 6 . 8 | 7 . . . . .' },
  { id: 'harbor_lights', name: 'Harbor Lights', artist: 'StudyMon Radio',
    bpm: 80, root: 70, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 2, 5, 4, 0, 2, 3, 4], voice: 'chime',
    melody: '0 . 4 . 7 . 4 . | 6 . 4 . 2 . 4 . | 5 . 7 . 9 . 7 . | 8 . 6 . 4 . . . | ' +
            '4 . 7 . 9 . 7 . | 6 . 4 . 9 . 6 . | 7 . 5 . 3 . 5 . | 4 . 6 . 1 . . .' },
  { id: 'evolution_dawn', name: 'Evolution Dawn', artist: 'StudyMon Radio',
    bpm: 90, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 1, 0, 1, 5, 1, 4, 0], voice: 'lead', arpeggio: true, sparkle: true,
    melody: '0 . 2 . 4 . 6 7 | 8 . 5 . 3 . 5 . | 7 . 4 . 2 . 4 . | 5 . 3 . 1 . . . | ' +
            '0 . 2 . 5 . 7 . | 8 . 10 . 12 . 10 . | 11 . 8 . 6 . 4 . | 4 . 2 . 0 . . .' },
  { id: 'quiet_study_hall', name: 'Quiet Study Hall', artist: 'StudyMon Radio',
    bpm: 62, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 1, 4, 0, 5, 4, 0], voice: 'flute',
    melody: '4 . . 2 2 . . . | 0 . . 2 2 . . . | 3 . . 1 1 . . . | 1 . . -1 -1 . . . | ' +
            '0 . . 4 4 . 7 . | 7 . . 5 5 . 2 . | 4 . . 1 1 . . . | 2 . . 1 0 . . .' },
  { id: 'rival_bridge', name: 'Rival on the Bridge', artist: 'StudyMon Radio',
    bpm: 120, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 6, 3, 4, 0, 6, 3, 0], voice: 'pluck',
    melody: '0 0 2 4 7 4 2 4 | 6 . 3 1 6 . 8 . | 7 5 3 5 7 . 5 . | 6 4 1 4 6 . . . | ' +
            '7 7 9 11 9 7 4 . | 8 . 6 . 3 . 6 . | 5 . 7 . 10 . 7 . | 7 . 4 2 0 . . .' },
  { id: 'homework_done', name: 'Homework Done!', artist: 'StudyMon Radio',
    bpm: 100, root: 74, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'chime', sparkle: true,
    melody: '0 2 4 7 . 4 | 6 . 4 8 . 6 | 7 . 5 9 . 7 | 5 . 3 7 . . | ' +
            '4 5 7 9 . 7 | 8 . 5 3 . 5 | 6 . 8 11 . 8 | 7 . 4 0 . .' }
];
