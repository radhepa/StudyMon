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
  { id: 'moonbell_reverie', from: 'kingdom:hill', artist: 'Kingdom · The Hill' }
];
