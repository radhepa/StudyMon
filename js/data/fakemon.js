/* Original StudyMon species. These extend the generated PokeAPI roster without
   changing its source data, so rebuilding the official dex remains safe. */
(function () {
  if (!window.DEX) return;

  window.DEX.push(
    {
      id: 1026,
      name: 'papyrunt',
      types: ['psychic'],
      bst: 310,
      stats: { hp: 46, atk: 42, def: 45, spa: 68, spd: 58, spe: 51 },
      height: 4,
      weight: 42,
      genus: 'Bookmark StudyMon',
      flavor: 'It chews discarded notes into soft paper scales. Each new idea makes the red ribbon on its tail curl with excitement.',
      rate: 90,
      legendary: false,
      cry: false,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ink-flick', label: 'Ink Flick', type: 'psychic', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'ribbon-snap', label: 'Ribbon Snap', type: 'normal', power: 55, acc: 100, pp: 20, tier: 2 },
        { id: 'mind-draft', label: 'Mind Draft', type: 'psychic', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'codex-burst', label: 'Codex Burst', type: 'dragon', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1027, level: 30, how: 'level-up' }]
    },
    {
      id: 1027,
      name: 'codexal',
      types: ['psychic', 'dragon'],
      bst: 420,
      stats: { hp: 62, atk: 54, def: 58, spa: 94, spd: 78, spe: 74 },
      height: 11,
      weight: 286,
      genus: 'Margin StudyMon',
      flavor: 'It stands upright to keep its foreclaws free. The ink-like marks on its hide rearrange whenever it solves a difficult problem.',
      rate: 60,
      legendary: false,
      cry: false,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ink-flick', label: 'Ink Flick', type: 'psychic', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'page-rush', label: 'Page Rush', type: 'dragon', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'mind-draft', label: 'Mind Draft', type: 'psychic', power: 80, acc: 100, pp: 15, tier: 3 },
        { id: 'codex-burst', label: 'Codex Burst', type: 'dragon', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1028, level: 55, how: 'level-up' }]
    },
    {
      id: 1028,
      name: 'lexidrake',
      types: ['psychic', 'dragon'],
      bst: 540,
      stats: { hp: 84, atk: 68, def: 82, spa: 126, spd: 104, spe: 76 },
      height: 21,
      weight: 910,
      genus: 'Archive StudyMon',
      flavor: 'Its wings preserve every lesson it has mastered. Lost travelers follow the red ribbon trailing behind it to find their way home.',
      rate: 45,
      legendary: false,
      cry: false,
      shiny: false,
      custom: true,
      moves: [
        { id: 'ink-flick', label: 'Ink Flick', type: 'psychic', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'page-rush', label: 'Page Rush', type: 'dragon', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'archive-beam', label: 'Archive Beam', type: 'psychic', power: 90, acc: 100, pp: 10, tier: 3 },
        { id: 'final-chapter', label: 'Final Chapter', type: 'dragon', power: 130, acc: 90, pp: 5, tier: 4 }
      ],
      evo: []
    },
    {
      id: 1029,
      name: 'abyssqueak',
      types: ['water', 'dark'],
      bst: 310,
      stats: { hp: 55, atk: 35, def: 50, spa: 65, spd: 70, spe: 35 },
      height: 3,
      weight: 18,
      genus: 'Stillwater StudyMon',
      flavor: 'It drifts without moving, letting its faint lure pulse only when the water grows completely still. Trainers earn its trust by sharing the silence.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'lure-flick', label: 'Lure Flick', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'shadow-current', label: 'Shadow Current', type: 'dark', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'pressure-wave', label: 'Pressure Wave', type: 'water', power: 85, acc: 95, pp: 15, tier: 3 },
        { id: 'blackwater-maw', label: 'Blackwater Maw', type: 'dark', power: 110, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1030, level: 16, how: 'level-up' }]
    },
    {
      id: 1030,
      name: 'trenchmaw',
      types: ['water', 'dark'],
      bst: 420,
      stats: { hp: 72, atk: 60, def: 72, spa: 90, spd: 76, spe: 50 },
      height: 14,
      weight: 350,
      genus: 'Trench Hunter StudyMon',
      flavor: 'Its three crown lights measure pressure changes before prey can move. One precise body pulse can shove an intruder away from the trench it guards.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'lure-flick', label: 'Lure Flick', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'trench-bite', label: 'Trench Bite', type: 'dark', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'pressure-wave', label: 'Pressure Wave', type: 'water', power: 85, acc: 95, pp: 15, tier: 3 },
        { id: 'midnight-surge', label: 'Midnight Surge', type: 'dark', power: 115, acc: 90, pp: 5, tier: 4 }
      ],
      evo: [{ to: 1031, level: 36, how: 'level-up' }]
    },
    {
      id: 1031,
      name: 'leviathorn',
      types: ['water', 'dragon'],
      bst: 540,
      stats: { hp: 105, atk: 85, def: 100, spa: 120, spd: 100, spe: 30 },
      height: 120,
      weight: 7800,
      genus: 'Abyss Crown StudyMon',
      flavor: 'Constellation-like lights travel along its body as it bends the pressure of an entire bay. It can crush stone or cradle its trainer in the same current.',
      rate: 45,
      legendary: false,
      cry: true,
      shiny: false,
      custom: true,
      moves: [
        { id: 'deep-current', label: 'Deep Current', type: 'water', power: 40, acc: 100, pp: 25, tier: 1 },
        { id: 'dragon-breath', label: 'Dragon Breath', type: 'dragon', power: 60, acc: 100, pp: 20, tier: 2 },
        { id: 'pressure-dominion', label: 'Pressure Dominion', type: 'water', power: 95, acc: 95, pp: 10, tier: 3 },
        { id: 'leviathan-crush', label: 'Leviathan Crush', type: 'dragon', power: 130, acc: 85, pp: 5, tier: 4 }
      ],
      evo: []
    }
  );
})();
