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
            '4 5 7 9 . 7 | 8 . 5 3 . 5 | 6 . 8 11 . 8 | 7 . 4 0 . .' },

  /* Calm study set, added 2026-09-23. Same synthesized style as above, kept
     slower and more spacious (58-78bpm, plenty of rests) so they sit under
     focused reading without pulling attention. Voices stay soft — flute,
     chime, glass, reed, bell, pad, pluck. A few extra modes (dorian,
     mixolydian, lydian, major/minor pentatonic) keep this many tracks from
     blurring into each other while still matching the town/Kingdom vibe. */
  { id: 'rainy_window_seat', name: 'Rainy Window Seat', artist: 'StudyMon Radio',
    bpm: 64, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 5, 4, 0, 3, 4, 0], voice: 'glass',
    melody: '0 . 2 . 3 . 2 . | 0 . . 3 . 2 . . | 5 . 3 . 2 . 3 . | 4 . 2 . 0 . . . | ' +
            '0 . 2 3 5 . 3 . | 7 . 5 . 3 . 2 . | 3 . 5 . 7 . 9 . | 7 . 5 . 3 2 0 .' },
  { id: 'paper_lanterns', name: 'Paper Lanterns', artist: 'StudyMon Radio',
    bpm: 70, root: 74, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 4, 3, 0], voice: 'chime', sparkle: true,
    melody: '4 . 2 4 . 5 | 4 . 2 . 0 . | 2 . 4 5 . 7 | 6 . 4 . 2 . | ' +
            '0 2 4 . 5 4 | 2 . 4 . 5 . | 7 . 6 4 . 2 | 1 . 2 . 0 .' },
  { id: 'cocoa_theorem', name: 'Cocoa Theorem', artist: 'StudyMon Radio',
    bpm: 62, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 3, 4, 0, 1, 4, 0], voice: 'flute', arpeggio: true,
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 3 . 5 . 4 . 2 . | 1 . . 2 . . . . | ' +
            '4 . . 5 . 7 . . | 6 . . 5 . 4 . . | 2 . 4 . 5 . 4 . | 2 . 1 . 0 . . .' },
  { id: 'graphite_moonlight', name: 'Graphite & Moonlight', artist: 'StudyMon Radio',
    bpm: 60, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 6, 0, 4, 3, 0], voice: 'bell',
    melody: '0 . . 3 . 5 . . | 7 . . 5 . 3 . . | 6 . . 5 . 3 . . | 2 . . 0 . . . . | ' +
            '3 . . 5 . 8 . . | 7 . . 5 . 3 . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'long_division_lullaby', name: 'Long Division Lullaby', artist: 'StudyMon Radio',
    bpm: 66, root: 67, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'reed',
    melody: '0 . 2 . 3 . 2 . | 0 . . . 2 . . . | 3 . 5 . 3 . 2 . | 3 . . 2 . 0 . . | ' +
            '5 . 3 . 2 . 3 . | 5 . 7 . 5 . 3 . | 4 . 3 . 2 . 3 . | 2 . . 0 . . . .' },
  { id: 'attic_archive', name: 'Attic Archive', artist: 'StudyMon Radio',
    bpm: 58, root: 65, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 6, 3, 4, 0, 6, 4, 0], voice: 'glass',
    melody: '0 . . . 2 . . 3 | . 3 . 2 . 0 . . | 5 . . 3 . 2 . . | 3 . 2 . 0 . . . | ' +
            '7 . . 5 . 3 . . | 6 . . 5 . 3 . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'footnote_in_amber', name: 'Footnote in Amber', artist: 'StudyMon Radio',
    bpm: 72, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 1, 5, 4, 0, 1, 4, 0], voice: 'flute',
    melody: '0 . 2 . 4 . 6 . | 7 . . 6 . 4 . . | 2 . 4 . 6 . 7 . | 6 . 4 . 2 . . . | ' +
            '0 2 4 . 6 7 . . | 9 . 7 . 6 . 4 . | 4 . 2 . 4 . 2 . | 2 . 1 . 0 . . .' },
  { id: 'slow_synthesis', name: 'Slow Synthesis', artist: 'StudyMon Radio',
    bpm: 64, root: 70, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 4 . . . | 5 . . . 4 . . . | 3 . . . 2 . . . | 0 . . . . . . . | ' +
            '4 . . . 7 . . . | 5 . . . 4 . . . | 2 . . . 4 . . . | 2 . . 1 . 0 . .' },
  { id: 'margin_notes', name: 'Margin Notes', artist: 'StudyMon Radio',
    bpm: 76, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 3, 4, 0, 2, 4, 0], voice: 'pluck',
    melody: '0 2 4 . 2 0 . . | 2 4 5 . 4 2 . . | 4 5 7 . 5 4 . . | 2 . 0 . . . . . | ' +
            '0 2 4 5 7 . 5 4 | 2 . 4 . 2 . 0 . | 2 4 2 0 . 2 0 . | 2 . 0 . . . . .' },
  { id: 'ink_and_embers', name: 'Ink and Embers', artist: 'StudyMon Radio',
    bpm: 68, root: 71, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 6, 4, 0, 3, 4, 0], voice: 'reed',
    melody: '0 . 2 . 3 . 2 . | 0 . . 2 . 3 . . | 5 . 3 . 2 . 0 . | 2 . . . . . . . | ' +
            '3 . 5 . 7 . 5 . | 6 . 5 . 3 . 2 . | 3 . 2 . 3 . 5 . | 3 . 2 . 0 . . .' },
  { id: 'tea_steeping', name: 'Tea, Steeping', artist: 'StudyMon Radio',
    bpm: 66, root: 76, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 3, 5, 0, 1, 4, 0], voice: 'chime',
    melody: '4 . 5 4 . 2 | 0 . 2 4 . 2 | 5 . 7 6 . 4 | 5 . 4 2 . . | ' +
            '2 4 5 . 4 2 | 1 . 2 4 . 2 | 6 . 5 4 . 2 | 1 . 2 . 0 .' },
  { id: 'quiet_quad', name: 'Quiet Quad', artist: 'StudyMon Radio',
    bpm: 70, root: 69, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 5, 1, 4, 0, 5, 4, 0], voice: 'bell', sparkle: true,
    melody: '0 . . 4 . 6 . . | 7 . . 6 . 4 . . | 9 . . 7 . 6 . . | 4 . . 2 . 0 . . | ' +
            '0 . 2 . 4 . 6 . | 7 . . 9 . 7 . . | 6 . 4 . 2 . 4 . | 2 . 1 . 0 . . .' },
  { id: 'dog_eared_page', name: 'Dog-Eared Page', artist: 'StudyMon Radio',
    bpm: 62, root: 74, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'flute',
    melody: '0 . 2 3 . 2 . . | 0 . . . 2 . 3 . | 5 . 3 . 2 . 3 . | 2 . . 0 . . . . | ' +
            '3 . 5 . 7 . 5 . | 4 . 3 . 2 . 0 . | 3 . 2 . 0 . 2 . | 2 . . 0 . . . .' },
  { id: 'candlelit_proof', name: 'Candlelit Proof', artist: 'StudyMon Radio',
    bpm: 60, root: 72, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 4, 0, 5, 4, 0], voice: 'glass',
    melody: '0 . . 2 . 3 . . | 5 . . 3 . 2 . . | 3 . . 2 . 0 . . | 2 . . . . . . . | ' +
            '7 . . 5 . 3 . . | 6 . . 5 . 3 . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'soft_recursion', name: 'Soft Recursion', artist: 'StudyMon Radio',
    bpm: 64, root: 69, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 2, 3, 0, 4, 2, 3, 0], voice: 'reed',
    melody: '0 . 2 . 3 . 2 . | 0 . . 2 . 0 . . | 3 . 4 . 3 . 2 . | 0 . . . . . . . | ' +
            '2 . 3 . 5 . 3 . | 4 . 3 . 2 . 0 . | 2 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'sunday_study_hall', name: 'Sunday Study Hall', artist: 'StudyMon Radio',
    bpm: 68, root: 71, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 3, 4, 0, 1, 4, 0], voice: 'flute',
    melody: '0 . 2 4 . 2 | 1 . 2 . 0 . | 4 . 5 7 . 5 | 4 . 2 . 0 . | ' +
            '5 . 7 . 6 4 | 5 . 4 2 . . | 2 4 5 . 4 2 | 1 . 2 . 0 .' },
  { id: 'lofi_library', name: 'Lo-Fi Library', artist: 'StudyMon Radio',
    bpm: 78, root: 74, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 3, 2, 0, 4, 3, 2, 0], voice: 'pluck',
    melody: '0 . 2 0 . 2 . . | 3 . 2 . 0 . . . | 2 . 3 . 4 . 3 . | 2 . 0 . . . . . | ' +
            '0 2 3 . 2 0 . . | 3 . 4 . 3 . 2 . | 2 . 0 . 2 . 3 . | 2 . 0 . . . . .' },
  { id: 'whispering_stacks', name: 'Whispering Stacks', artist: 'StudyMon Radio',
    bpm: 66, root: 70, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 5, 4, 0, 3, 4, 0], voice: 'glass',
    melody: '0 . . 2 . 3 . . | 5 . . 3 . 2 . . | 3 . 2 . 0 . 2 . | 3 . . . . . . . | ' +
            '5 . 7 . 9 . 7 . | 5 . . 4 . 3 . . | 4 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'gentle_gradient', name: 'Gentle Gradient', artist: 'StudyMon Radio',
    bpm: 72, root: 76, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 4, 3, 0], voice: 'bell',
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 4 . . 5 . 7 . . | 6 . . 5 . 4 . . | ' +
            '2 . 4 . 5 . 7 . | 6 . . 4 . 2 . . | 4 . 2 . 1 . 2 . | 1 . . 0 . . . .' },
  { id: 'overcast_office_hours', name: 'Overcast Office Hours', artist: 'StudyMon Radio',
    bpm: 64, root: 67, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 4, 6, 0, 3, 6, 0], voice: 'reed',
    melody: '0 . 2 . 3 . 2 . | 0 . . . . . . . | 5 . 3 . 2 . 0 . | 2 . 3 . . . . . | ' +
            '6 . 5 . 3 . 2 . | 3 . 2 . 0 . . . | 5 . 3 . 2 . 3 . | 2 . . 0 . . . .' },
  { id: 'star_chart_sleepy', name: 'Sleepy Star Chart', artist: 'StudyMon Radio',
    bpm: 60, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 5, 4, 1, 0, 5, 1, 0], voice: 'chime',
    melody: '0 . . 4 . 6 . . | 7 . . 6 . 4 . . | 2 . 4 . 6 . 4 . | 2 . . 0 . . . . | ' +
            '9 . . 7 . 6 . . | 4 . . 6 . 7 . . | 6 . 4 . 2 . 4 . | 2 . 1 . 0 . . .' },
  { id: 'faded_highlighter', name: 'Faded Highlighter', artist: 'StudyMon Radio',
    bpm: 74, root: 75, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'flute',
    melody: '0 2 . 4 . 2 . . | 1 . 3 . 2 . . . | 4 . 5 . 7 . 5 . | 4 . 2 . 0 . . . | ' +
            '5 . 4 . 2 . 4 . | 5 . 7 . 6 . 4 . | 2 . 4 . 2 . 1 . | 2 . 1 . 0 . . .' },
  { id: 'midnight_oil', name: 'Midnight Oil', artist: 'StudyMon Radio',
    bpm: 58, root: 65, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 6, 4, 0, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 2 . . . | 3 . . . 2 . . . | 0 . . . . . . . | 5 . . . 3 . . . | ' +
            '2 . . . 0 . . . | 6 . . . 5 . . . | 3 . . . 2 . . . | 2 . . 0 . . . .' },
  { id: 'cursor_blink', name: 'Cursor Blink', artist: 'StudyMon Radio',
    bpm: 70, root: 74, stepsPerBar: 6, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 4, 5, 3, 0, 4, 3, 0], voice: 'glass',
    melody: '0 . 2 3 . 2 | 0 . . 2 . . | 3 . 5 . 3 2 | 3 . 2 . 0 . | ' +
            '5 . 7 . 5 3 | 4 . 3 . 2 . | 3 . 2 . 0 2 | 2 . . 0 . .' },
  { id: 'soft_serif', name: 'Soft Serif', artist: 'StudyMon Radio',
    bpm: 66, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 4, 0, 3, 2, 4, 0], voice: 'bell', sparkle: true,
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 4 . . 5 . 7 . . | 5 . . 4 . 2 . . | ' +
            '2 . 4 . 5 . 4 . | 2 . . 4 . 2 . . | 4 . 2 . 0 . 2 . | 2 . . 0 . . . .' },
  { id: 'last_page_tonight', name: 'Last Page Tonight', artist: 'StudyMon Radio',
    bpm: 62, root: 70, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 4, 0, 5, 4, 0], voice: 'flute',
    melody: '0 . 2 . 3 . 2 . | 0 . . . . . . . | 5 . 3 . 2 . 0 . | 2 . . . . . . . | ' +
            '7 . 5 . 3 . 2 . | 3 . 2 . 0 . . . | 5 . 3 . 2 . 3 . | 2 . . 0 . . . .' },
  { id: 'thermos_of_calm', name: 'Thermos of Calm', artist: 'StudyMon Radio',
    bpm: 68, root: 67, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'reed',
    melody: '0 . 2 . 4 . 2 . | 0 . . 2 . 4 . . | 5 . 4 . 2 . 4 . | 5 . . 4 . 2 . . | ' +
            '4 . 5 . 7 . 5 . | 4 . 2 . 4 . 5 . | 4 . 2 . 1 . 2 . | 1 . . 0 . . . .' },
  { id: 'thesis_daydream', name: 'Thesis Daydream', artist: 'StudyMon Radio',
    bpm: 64, root: 77, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 1, 4, 5, 0, 1, 5, 0], voice: 'chime', arpeggio: true,
    melody: '0 . . 4 . 2 . . | 1 . . 2 . 4 . . | 5 . . 4 . 2 . . | 1 . . 0 . . . . | ' +
            '4 . 5 . 7 . 5 . | 6 . 5 . 4 . 2 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'thinking_cap', name: 'Thinking Cap', artist: 'StudyMon Radio',
    bpm: 72, root: 72, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'pluck',
    melody: '0 2 . 3 . 2 . . | 0 . 2 . . . . . | 3 5 . 3 . 2 . . | 3 . 2 . 0 . . . | ' +
            '5 7 . 5 . 3 . . | 4 . 3 . 2 . . . | 3 . 2 . 3 . 5 . | 3 . 2 . 0 . . .' },
  { id: 'thin_blanket_fort', name: 'Thin Blanket Fort', artist: 'StudyMon Radio',
    bpm: 60, root: 69, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 3, 2, 4, 0, 3, 4, 0], voice: 'glass',
    melody: '0 . . 2 . 3 . . | 4 . . 3 . 2 . . | 0 . . . . . . . | 3 . . 2 . 0 . . | ' +
            '4 . . 5 . 4 . . | 3 . . 2 . 0 . . | 2 . 3 . 2 . 0 . | 2 . . 0 . . . .' },

  /* Second calm study set, added 2026-09-23. Same rules as the batch above:
     58-78bpm, soft voices only, 8 bars that settle back on the tonic. */
  { id: 'chalk_dust_afternoon', name: 'Chalk Dust Afternoon', artist: 'StudyMon Radio',
    bpm: 66, root: 71, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'flute',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 5 . 7 . 9 . 7 . | 5 . 4 . 2 . . . | ' +
            '0 2 4 5 . 4 2 . | 4 . 5 . 7 . 5 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'loose_leaf_nocturne', name: 'Loose-Leaf Nocturne', artist: 'StudyMon Radio',
    bpm: 58, root: 68, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 6, 0, 3, 4, 0], voice: 'bell',
    melody: '0 . . 3 . 5 . . | 7 . . 8 . 7 . . | 5 . . 3 . 2 . . | 0 . . . . . . . | ' +
            '3 . . 5 . 7 . . | 6 . . 5 . 3 . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'back_row_window', name: 'Back Row Window', artist: 'StudyMon Radio',
    bpm: 64, root: 72, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'glass',
    melody: '0 . . 2 . 3 . . | 5 . . 3 . 2 . . | 0 . 2 . 3 . 5 . | 4 . . 3 . 2 . . | ' +
            '7 . . 5 . 3 . . | 5 . 4 . 3 . 2 . | 3 . 2 . 0 . 2 . | 2 . . 0 . . . .' },
  { id: 'dim_desk_lamp', name: 'Dim Desk Lamp', artist: 'StudyMon Radio',
    bpm: 60, root: 66, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 6, 4, 0, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 2 . . . | 3 . . . 2 . . . | 0 . . . 3 . . . | 5 . . . 3 . . . | ' +
            '2 . . . 0 . . . | 6 . . . 5 . . . | 3 . . . 2 . . . | 2 . . 0 . . . .' },
  { id: 'pencil_shavings', name: 'Pencil Shavings', artist: 'StudyMon Radio',
    bpm: 74, root: 76, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 3, 4, 0, 3, 4, 0], voice: 'pluck',
    melody: '0 2 4 . 2 0 . . | 4 5 7 . 5 4 . . | 2 4 5 . 4 2 . . | 2 . 0 . . . . . | ' +
            '0 2 4 5 . 4 2 . | 4 . 5 . 4 . 2 . | 2 4 2 0 . 2 0 . | 2 . 0 . . . . .' },
  { id: 'highlighter_haze', name: 'Highlighter Haze', artist: 'StudyMon Radio',
    bpm: 68, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 1, 4, 5, 0, 1, 5, 0], voice: 'chime',
    melody: '0 . 2 . 4 . 6 . | 7 . 6 . 4 . 2 . | 2 . 4 . 6 . 7 . | 9 . 7 . 6 . . . | ' +
            '0 2 4 . 6 . 7 . | 6 . 4 . 6 . 7 . | 6 . 4 . 2 . 1 . | 2 . 1 . 0 . . .' },
  { id: 'sleepy_semicolons', name: 'Sleepy Semicolons', artist: 'StudyMon Radio',
    bpm: 62, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 5, 4, 0, 3, 4, 0], voice: 'reed',
    melody: '0 . 2 . 3 . 2 . | 0 . . . 2 . 3 . | 5 . 3 . 2 . 0 . | 2 . . . . . . . | ' +
            '3 . 5 . 7 . 5 . | 4 . 3 . 2 . 3 . | 2 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'whiteboard_fog', name: 'Whiteboard Fog', artist: 'StudyMon Radio',
    bpm: 58, root: 70, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 4, 0, 5, 4, 0], voice: 'glass',
    melody: '0 . . . 2 . . . | 3 . . . 2 . . . | 5 . . . 3 . . . | 2 . . . 0 . . . | ' +
            '7 . . . 5 . . . | 6 . . . 3 . . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'eraser_dust', name: 'Eraser Dust', artist: 'StudyMon Radio',
    bpm: 72, root: 71, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 2, 3, 0, 4, 2, 3, 0], voice: 'pluck',
    melody: '0 2 . 3 . 2 . . | 0 . 2 . . . . . | 3 . 4 . 3 . 2 . | 0 . . . . . . . | ' +
            '2 3 . 4 . 3 . . | 2 . 0 . 2 . 3 . | 2 . 0 . 2 . 3 . | 2 . 0 . . . . .' },
  { id: 'between_chapters', name: 'Between Chapters', artist: 'StudyMon Radio',
    bpm: 64, root: 74, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 4, 5, 0, 1, 4, 0], voice: 'flute',
    melody: '4 . 2 . 0 . | 2 . 4 . 5 . | 7 . 5 . 4 2 | 4 . 2 . 0 . | ' +
            '0 . 2 4 . 5 | 4 . 2 . 1 . | 2 . 4 . 5 7 | 5 . 2 . 0 .' },
  { id: 'notebook_margin', name: 'Notebook Margin', artist: 'StudyMon Radio',
    bpm: 70, root: 77, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'chime',
    melody: '0 . 4 . 2 . 4 . | 5 . 4 . 2 . . . | 4 . 5 . 7 . 5 . | 6 . 5 . 4 . 2 . | ' +
            '1 . 3 . 4 . 6 . | 5 . 4 . 2 . 4 . | 5 . 4 . 2 . 1 . | 2 . 1 . 0 . . .' },
  { id: 'late_bus_home', name: 'Late Bus Home', artist: 'StudyMon Radio',
    bpm: 60, root: 65, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'reed',
    melody: '0 . . 2 . 3 . . | 2 . . 0 . . . . | 5 . 4 . 3 . 5 . | 4 . . 3 . 2 . . | ' +
            '6 . . 5 . 3 . . | 7 . 6 . 5 . 3 . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'radiator_hum', name: 'Radiator Hum', artist: 'StudyMon Radio',
    bpm: 58, root: 67, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 2 . . . | 3 . . . 2 . . . | 0 . . . 5 . . . | 4 . . . 3 . . . | ' +
            '2 . . . 0 . . . | 5 . . . 4 . . . | 3 . . . 2 . . . | 2 . . 0 . . . .' },
  { id: 'flashcard_snow', name: 'Flashcard Snow', artist: 'StudyMon Radio',
    bpm: 66, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 5, 4, 1, 0, 5, 1, 0], voice: 'bell',
    melody: '0 . . 4 . 6 . . | 7 . . 6 . 4 . . | 6 . 7 . 9 . 7 . | 6 . 4 . 2 . . . | ' +
            '4 . 6 . 7 . 9 . | 7 . . 6 . 4 . . | 6 . 4 . 2 . 4 . | 2 . 1 . 0 . . .' },
  { id: 'overdue_book', name: 'Overdue Book', artist: 'StudyMon Radio',
    bpm: 62, root: 69, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'glass',
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 0 . . 4 . 5 . . | 4 . . 2 . 0 . . | ' +
            '4 . 5 . 7 . 5 . | 4 . 2 . 4 . 5 . | 4 . 2 . 1 . 2 . | 1 . . 0 . . . .' },
  { id: 'underlined_twice', name: 'Underlined Twice', artist: 'StudyMon Radio',
    bpm: 76, root: 74, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'pluck',
    melody: '0 2 . 3 . 2 . . | 0 . 2 . 3 . . . | 5 . 3 . 2 . 0 . | 2 . . . . . . . | ' +
            '3 5 . 3 . 2 . . | 4 . 3 . 2 . . . | 3 . 2 . 3 . 5 . | 3 . 2 . 0 . . .' },
  { id: 'study_group_of_one', name: 'Study Group of One', artist: 'StudyMon Radio',
    bpm: 60, root: 70, stepsPerBar: 6, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'flute',
    melody: '2 . 3 . 2 . | 0 . . . . . | 5 . 4 . 3 2 | 0 . . . . . | ' +
            '3 . 5 . 3 2 | 4 . 5 . 4 3 | 2 . 3 . 2 0 | 2 . . 0 . .' },
  { id: 'sticky_note_sky', name: 'Sticky Note Sky', artist: 'StudyMon Radio',
    bpm: 72, root: 76, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 4, 0, 3, 2, 4, 0], voice: 'chime',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 2 . 4 . 5 . 4 . | 2 . . 0 . . . . | ' +
            '4 5 . 4 . 2 . . | 2 . 4 . 5 . 4 . | 2 . 0 . 2 . 4 . | 2 . 0 . . . . .' },
  { id: 'textbook_spine', name: 'Textbook Spine', artist: 'StudyMon Radio',
    bpm: 64, root: 67, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 3, 4, 0, 1, 4, 0], voice: 'reed',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 1 . . . | 0 . 4 . 5 . 7 . | 6 . 5 . 4 . 2 . | ' +
            '1 . 2 . 4 . 5 . | 4 . 2 . 4 . 5 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'drowsy_derivative', name: 'Drowsy Derivative', artist: 'StudyMon Radio',
    bpm: 58, root: 65, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 3, 2, 4, 0, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 2 . . . | 3 . . . 2 . . . | 0 . . . . . . . | 4 . . . 3 . . . | ' +
            '2 . . . 0 . . . | 3 . . . 2 . . . | 0 . . . . . . . | 2 . . 0 . . . .' },
  { id: 'half_finished_essay', name: 'Half-Finished Essay', artist: 'StudyMon Radio',
    bpm: 62, root: 71, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 4, 5, 0, 6, 4, 0], voice: 'glass',
    melody: '0 . 2 . 3 . 2 . | 3 . . . . . . . | 5 . 3 . 2 . 3 . | 5 . . . . . . . | ' +
            '7 . 5 . 3 . 2 . | 3 . 2 . 0 . . . | 3 . 5 . 3 . 2 . | 2 . . 0 . . . .' },
  { id: 'paperback_corner', name: 'Paperback Corner', artist: 'StudyMon Radio',
    bpm: 66, root: 74, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 5, 3, 4, 0, 5, 4, 0], voice: 'flute',
    melody: '0 . 2 . 3 . 5 . | 4 . 3 . 2 . 0 . | 2 . 3 . 5 . 7 . | 5 . 4 . 3 . 2 . | ' +
            '0 2 . 3 . 5 . . | 7 . 5 . 4 . 3 . | 4 . 3 . 2 . 3 . | 2 . . 0 . . . .' },
  { id: 'rainy_recess', name: 'Rainy Recess', artist: 'StudyMon Radio',
    bpm: 68, root: 70, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'bell',
    melody: '0 . . 4 . 5 . . | 7 . . 5 . 4 . . | 2 . 4 . 5 . 7 . | 6 . . 5 . 4 . . | ' +
            '5 . 7 . 9 . 7 . | 5 . . 4 . 2 . . | 4 . 2 . 0 . 2 . | 1 . . 0 . . . .' },
  { id: 'thermos_steam', name: 'Thermos Steam', artist: 'StudyMon Radio',
    bpm: 60, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 4, 3, 0], voice: 'reed',
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 4 . . 5 . 4 . . | 2 . . 0 . . . . | ' +
            '4 . 5 . 4 . 2 . | 5 . 7 . 6 . 4 . | 5 . 4 . 2 . 1 . | 2 . 1 . 0 . . .' },
  { id: 'wool_sweater_weather', name: 'Wool Sweater Weather', artist: 'StudyMon Radio',
    bpm: 64, root: 76, stepsPerBar: 6, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'chime',
    melody: '0 . 2 3 . 2 | 3 . . . . . | 5 . 3 . 2 3 | 2 . . 0 . . | ' +
            '3 . 5 . 3 2 | 3 . 2 . 0 . | 5 . 3 2 . 3 | 2 . . 0 . .' },
  { id: 'graph_paper_garden', name: 'Graph Paper Garden', artist: 'StudyMon Radio',
    bpm: 78, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'pluck',
    melody: '0 2 4 . 2 0 . . | 2 4 5 . 4 2 . . | 4 5 7 . 5 4 . . | 2 . 0 . . . . . | ' +
            '4 . 5 7 . 5 4 . | 2 . 4 . 5 . 4 . | 2 4 2 0 . 2 0 . | 2 . 0 . . . . .' },
  { id: 'binder_ring_chime', name: 'Binder Ring Chime', artist: 'StudyMon Radio',
    bpm: 70, root: 69, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 3, 4, 0, 2, 4, 0], voice: 'bell', sparkle: true,
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 2 . 4 . 5 . 4 . | 2 . . 0 . . . . | ' +
            '4 . . 5 . 4 . . | 2 . 4 . 2 . 0 . | 4 . 2 . 0 . 2 . | 2 . . 0 . . . .' },
  { id: 'desk_lamp_halo', name: 'Desk Lamp Halo', artist: 'StudyMon Radio',
    bpm: 60, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 4, 1, 5, 0, 4, 5, 0], voice: 'glass',
    melody: '0 . . 4 . 6 . . | 7 . . 6 . 4 . . | 4 . 6 . 7 . 9 . | 7 . 6 . 4 . . . | ' +
            '2 . 4 . 6 . 7 . | 6 . 4 . 2 . . . | 4 . 2 . 4 . 2 . | 2 . 1 . 0 . . .' },
  { id: 'chalk_line_horizon', name: 'Chalk Line Horizon', artist: 'StudyMon Radio',
    bpm: 66, root: 75, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'flute',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 2 . 4 . 5 . 7 . | 6 . 5 . 4 . 2 . | ' +
            '0 2 4 5 . 7 . . | 6 . 5 . 4 . 2 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'evening_equation', name: 'Evening Equation', artist: 'StudyMon Radio',
    bpm: 62, root: 67, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'pad',
    melody: '0 . . . 4 . . . | 5 . . . 4 . . . | 2 . . . 4 . . . | 0 . . . . . . . | ' +
            '4 . . . 7 . . . | 5 . . . 4 . . . | 2 . . . 1 . . . | 2 . . 1 . 0 . .' },

  /* Third calm study set, added 2026-09-23. Same rules again: 58-76bpm, soft
     voices, 8 bars settling on the tonic. */
  { id: 'amber_desk_glow', name: 'Amber Desk Glow', artist: 'StudyMon Radio',
    bpm: 66, root: 70, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'flute',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 5 . 7 . 9 . 7 . | 5 . 4 . 2 . . . | ' +
            '0 2 4 5 . 7 . . | 6 . 5 . 4 . 2 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'quiet_quiz_night', name: 'Quiet Quiz Night', artist: 'StudyMon Radio',
    bpm: 58, root: 68, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 5, 3, 6, 0, 3, 4, 0], voice: 'bell',
    melody: '0 . . 3 . 5 . . | 7 . . 8 . 7 . . | 6 . . 5 . 3 . . | 2 . . 0 . . . . | ' +
            '3 . . 5 . 7 . . | 6 . . 5 . 3 . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'folded_corner', name: 'Folded Corner', artist: 'StudyMon Radio',
    bpm: 64, root: 72, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'glass',
    melody: '0 . 2 . 3 . 5 . | 4 . 3 . 2 . 0 . | 2 . 3 . 5 . 7 . | 5 . 4 . 3 . 2 . | ' +
            '0 2 . 3 . 5 . . | 7 . 5 . 4 . 3 . | 4 . 3 . 2 . 3 . | 2 . . 0 . . . .' },
  { id: 'gentle_recall', name: 'Gentle Recall', artist: 'StudyMon Radio',
    bpm: 60, root: 67, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 4 . . . | 5 . . . 4 . . . | 2 . . . 0 . . . | 4 . . . 5 . . . | ' +
            '7 . . . 5 . . . | 4 . . . 2 . . . | 1 . . . 2 . . . | 2 . . 1 . 0 . .' },
  { id: 'warm_static', name: 'Warm Static', artist: 'StudyMon Radio',
    bpm: 68, root: 69, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'reed',
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 0 . 2 . 4 . 5 . | 4 . . 2 . 0 . . | ' +
            '4 . 5 . 4 . 2 . | 5 . 7 . 6 . 4 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'bookmark_ribbon', name: 'Bookmark Ribbon', artist: 'StudyMon Radio',
    bpm: 72, root: 76, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 3, 4, 0, 2, 4, 0], voice: 'chime',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 2 . 4 . 5 . 4 . | 2 . . 0 . . . . | ' +
            '4 5 . 4 . 2 . . | 2 . 4 . 5 . 4 . | 2 . 0 . 2 . 4 . | 2 . 0 . . . . .' },
  { id: 'low_battery_focus', name: 'Low Battery Focus', artist: 'StudyMon Radio',
    bpm: 74, root: 71, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 3, 2, 4, 0, 3, 4, 0], voice: 'pluck',
    melody: '0 2 4 . 2 0 . . | 3 . 2 . 0 . . . | 4 5 . 4 . 2 . . | 2 . 0 . . . . . | ' +
            '0 2 . 3 4 . 3 . | 2 . 4 . 2 . 0 . | 3 . 2 . 3 . 4 . | 2 . 0 . . . . .' },
  { id: 'soft_spoken_proof', name: 'Soft-Spoken Proof', artist: 'StudyMon Radio',
    bpm: 62, root: 74, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 4, 5, 3, 0, 4, 3, 0], voice: 'flute',
    melody: '0 . 2 . 3 . 5 . | 4 . 3 . 2 . 0 . | 5 . 3 . 2 . 3 . | 5 . . 4 . 2 . . | ' +
            '0 2 . 3 . 5 . . | 7 . 5 . 4 . 3 . | 4 . 3 . 2 . 3 . | 2 . . 0 . . . .' },
  { id: 'frost_on_the_window', name: 'Frost on the Window', artist: 'StudyMon Radio',
    bpm: 58, root: 65, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 6, 3, 4, 0, 6, 4, 0], voice: 'glass',
    melody: '0 . . . 3 . . . | 5 . . . 3 . . . | 7 . . . 5 . . . | 3 . . . 2 . . . | ' +
            '0 . . . 3 . . . | 5 . . . 2 . . . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'creaky_floorboards', name: 'Creaky Floorboards', artist: 'StudyMon Radio',
    bpm: 58, root: 67, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 4, 5, 0, 3, 4, 5, 0], voice: 'pad',
    melody: '0 . . . 3 . . . | 5 . . . 3 . . . | 0 . . . 4 . . . | 3 . . . 2 . . . | ' +
            '5 . . . 0 . . . | 4 . . . 3 . . . | 0 . . . 2 . . . | 2 . . 0 . . . .' },
  { id: 'study_nook', name: 'Study Nook', artist: 'StudyMon Radio',
    bpm: 66, root: 72, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'bell',
    melody: '4 . 2 . 0 . | 0 . 2 . 4 . | 5 . 7 . 5 4 | 2 . . 0 . . | ' +
            '0 . 2 4 . 5 | 4 . 2 . 1 . | 2 . 4 . 5 7 | 5 . 2 . 0 .' },
  { id: 'quiet_corridor', name: 'Quiet Corridor', artist: 'StudyMon Radio',
    bpm: 60, root: 70, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 6, 4, 0, 3, 4, 0], voice: 'reed',
    melody: '0 . . 2 . 3 . . | 5 . . 3 . 2 . . | 0 . 2 . 3 . 5 . | 4 . . 3 . 2 . . | ' +
            '6 . . 5 . 3 . . | 7 . 6 . 5 . 3 . | 5 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'sepia_notes', name: 'Sepia Notes', artist: 'StudyMon Radio',
    bpm: 68, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 1, 4, 5, 0, 1, 5, 0], voice: 'chime',
    melody: '0 . 2 . 4 . 6 . | 7 . 6 . 4 . 2 . | 2 . 4 . 6 . 7 . | 9 . 7 . 6 . 4 . | ' +
            '0 2 4 . 6 . 9 . | 7 . 6 . 4 . 2 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'late_night_formula', name: 'Late Night Formula', artist: 'StudyMon Radio',
    bpm: 62, root: 69, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'glass',
    melody: '0 . . 2 . 4 . . | 5 . . 4 . 2 . . | 0 . . 4 . 5 . . | 7 . . 5 . 4 . . | ' +
            '4 . 5 . 7 . 9 . | 7 . . 5 . 4 . . | 4 . 2 . 0 . 2 . | 1 . . 0 . . . .' },
  { id: 'cardigan_weather', name: 'Cardigan Weather', artist: 'StudyMon Radio',
    bpm: 64, root: 75, stepsPerBar: 6, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'flute',
    melody: '4 . 2 . 0 . | 5 . 4 . 2 . | 7 . 5 . 4 2 | 4 . 2 . 0 . | ' +
            '0 . 2 4 . 5 | 7 . 5 . 4 2 | 2 . 4 . 5 7 | 5 . 2 . 0 .' },
  { id: 'paper_crane_break', name: 'Paper Crane Break', artist: 'StudyMon Radio',
    bpm: 76, root: 74, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 2, 4, 0, 3, 2, 4, 0], voice: 'pluck',
    melody: '0 2 4 . 2 0 . . | 4 5 . 4 . 2 . . | 2 4 5 . 4 2 . . | 2 . 0 . . . . . | ' +
            '0 2 4 5 . 4 2 . | 4 . 5 . 4 . 2 . | 2 4 2 0 . 2 0 . | 2 . 0 . . . . .' },
  { id: 'hushed_hallway', name: 'Hushed Hallway', artist: 'StudyMon Radio',
    bpm: 58, root: 66, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 6, 4, 0, 3, 4, 0], voice: 'pad',
    melody: '0 . . . 2 . . . | 3 . . . 2 . . . | 0 . . . 3 . . . | 6 . . . 5 . . . | ' +
            '3 . . . 2 . . . | 0 . . . . . . . | 5 . . . 3 . . . | 2 . . 0 . . . .' },
  { id: 'tea_gone_cold', name: 'Tea Gone Cold', artist: 'StudyMon Radio',
    bpm: 60, root: 69, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 4, 3, 5, 0, 4, 5, 0], voice: 'reed',
    melody: '0 . . 2 . 3 . . | 2 . . 0 . . . . | 5 . 4 . 3 . 5 . | 4 . . 3 . 2 . . | ' +
            '0 2 . 3 . 5 . . | 7 . 5 . 4 . 3 . | 4 . 3 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'sunlit_syllabus', name: 'Sunlit Syllabus', artist: 'StudyMon Radio',
    bpm: 70, root: 77, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'chime',
    melody: '0 . 4 . 2 . 4 . | 5 . 4 . 2 . . . | 4 . 5 . 7 . 9 . | 7 . 5 . 4 . 2 . | ' +
            '1 . 3 . 4 . 6 . | 5 . 4 . 2 . 4 . | 5 . 4 . 2 . 1 . | 2 . 1 . 0 . . .' },
  { id: 'second_cup_of_tea', name: 'Second Cup of Tea', artist: 'StudyMon Radio',
    bpm: 68, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 3, 2, 4, 0, 3, 4, 0], voice: 'bell',
    melody: '0 2 . 4 . 2 . . | 0 . 2 . . . . . | 4 . 5 . 4 . 2 . | 0 . . . . . . . | ' +
            '2 4 . 5 . 4 . . | 2 . 0 . 2 . 4 . | 2 . 0 . 2 . 4 . | 2 . 0 . . . . .' },
  { id: 'gentle_proofread', name: 'Gentle Proofread', artist: 'StudyMon Radio',
    bpm: 60, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 1, 4, 5, 0, 4, 1, 0], voice: 'glass',
    melody: '0 2 . 4 . 6 . . | 7 . . 9 . 7 . . | 6 . 4 . 2 . 4 . | 6 . 7 . 9 . . . | ' +
            '7 . 6 . 4 . 2 . | 4 . 6 . 7 . 6 . | 4 . 2 . 4 . 2 . | 2 . 1 . 0 . . .' },
  { id: 'low_hum_of_focus', name: 'Low Hum of Focus', artist: 'StudyMon Radio',
    bpm: 58, root: 65, stepsPerBar: 8, scale: [0, 3, 5, 7, 10], chords: [0, 2, 4, 3, 0, 2, 3, 0], voice: 'pad',
    melody: '0 . . . 3 . . . | 5 . . . 3 . . . | 0 . . . 2 . . . | 3 . . . 0 . . . | ' +
            '4 . . . 2 . . . | 0 . . . . . . . | 3 . . . 2 . . . | 2 . . 0 . . . .' },
  { id: 'threadbare_sweater', name: 'Threadbare Sweater', artist: 'StudyMon Radio',
    bpm: 62, root: 71, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 4, 3, 6, 0, 4, 6, 0], voice: 'flute',
    melody: '0 . 2 . 3 . 5 . | 4 . 3 . 2 . 0 . | 6 . 5 . 3 . 2 . | 3 . . . . . . . | ' +
            '5 . 3 . 2 . 3 . | 5 . . 4 . 2 . . | 3 . 2 . 0 . 2 . | 2 . . 0 . . . .' },
  { id: 'quiet_kettle', name: 'Quiet Kettle', artist: 'StudyMon Radio',
    bpm: 64, root: 67, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 5, 3, 4, 0, 1, 4, 0], voice: 'reed',
    melody: '0 . . 4 . 2 . . | 1 . . 2 . 4 . . | 5 . . 4 . 2 . . | 1 . . 0 . . . . | ' +
            '2 . 4 . 5 . 7 . | 6 . 5 . 4 . 2 . | 4 . 2 . 1 . 2 . | 1 . 2 . 0 . . .' },
  { id: 'chapter_seven', name: 'Chapter Seven', artist: 'StudyMon Radio',
    bpm: 72, root: 74, stepsPerBar: 8, scale: [0, 2, 3, 5, 7, 9, 10], chords: [0, 3, 4, 5, 0, 3, 5, 0], voice: 'pluck',
    melody: '0 . 2 3 . 2 . . | 0 . . 2 . 3 . . | 5 3 . 2 . 0 . . | 2 . 3 . . . . . | ' +
            '3 5 . 3 . 2 . . | 4 . 3 . 2 . . . | 3 . 2 . 3 . 5 . | 3 . 2 . 0 . . .' },
  { id: 'gentle_rewrite', name: 'Gentle Rewrite', artist: 'StudyMon Radio',
    bpm: 66, root: 70, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'chime',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 4 . 5 . 7 . 5 . | 4 . 2 . 4 . 5 . | ' +
            '7 . . 5 . 4 . . | 5 . 4 . 2 . 4 . | 4 . 2 . 1 . 2 . | 1 . . 0 . . . .' },
  { id: 'faint_pencil_lines', name: 'Faint Pencil Lines', artist: 'StudyMon Radio',
    bpm: 64, root: 76, stepsPerBar: 8, scale: [0, 2, 4, 7, 9], chords: [0, 3, 4, 2, 0, 3, 2, 0], voice: 'glass',
    melody: '0 . 2 . 4 . 5 . | 4 . 2 . 0 . . . | 2 4 . 5 . 4 . . | 2 . 0 . . . . . | ' +
            '4 . 5 . 4 . 2 . | 4 5 . 4 . 2 . . | 2 . 4 . 2 . 0 . | 2 . . 0 . . . .' },
  { id: 'overnight_notes', name: 'Overnight Notes', artist: 'StudyMon Radio',
    bpm: 60, root: 69, stepsPerBar: 6, scale: [0, 2, 3, 5, 7, 8, 10], chords: [0, 3, 4, 0, 5, 3, 4, 0], voice: 'bell',
    melody: '0 . 3 . 5 . | 7 . . . . . | 8 . 7 . 5 3 | 2 . . 0 . . | ' +
            '0 . 2 3 . 2 | 5 . 3 . 2 . | 3 5 . 3 . 2 | 3 . 2 . 0 .' },
  { id: 'warm_windowsill', name: 'Warm Windowsill', artist: 'StudyMon Radio',
    bpm: 66, root: 72, stepsPerBar: 8, scale: [0, 2, 4, 6, 7, 9, 11], chords: [0, 4, 5, 1, 0, 4, 1, 0], voice: 'flute',
    melody: '0 . 2 . 4 . 6 . | 7 . 6 . 4 . 2 . | 4 . 6 . 7 . 9 . | 7 . 6 . 4 . 2 . | ' +
            '0 2 4 . 6 . 7 . | 9 . 7 . 6 . 4 . | 4 . 2 . 4 . 2 . | 2 . 1 . 0 . . .' },
  { id: 'calm_before_the_quiz', name: 'Calm Before the Quiz', artist: 'StudyMon Radio',
    bpm: 62, root: 70, stepsPerBar: 8, scale: [0, 2, 4, 5, 7, 9, 11], chords: [0, 4, 5, 3, 0, 1, 4, 0], voice: 'pad',
    melody: '0 . . . 2 . . . | 4 . . . 2 . . . | 0 . . . . . . . | 5 . . . 4 . . . | ' +
            '2 . . . 0 . . . | 4 . . . 5 . . . | 4 . . . 2 . . . | 2 . . 1 . 0 . .' }
];
