# StudyMon Fakemon work

For any request to design, generate, revise, or integrate a Fakemon or original StudyMon creature, use the reusable `$studymon-fakemon` skill at `C:\Users\minal\.codex\skills\studymon-fakemon\SKILL.md`. Follow its concrete visual prompts, sprite audit, data contract, and browser QA gates rather than improvising a new pipeline.

# Project name and location

The game is **StudyMon** and lives at `C:\Users\minal\StudyMon` (GitHub: `radhepa/StudyMon`).
It was first called C-MON / Cmon; that name is retired. Do not use it in code, file names,
storage keys, docs or commit messages. The one exception is the in-game map, "The C-Region".
Browser storage keys start with `studymon.`; `js/engine/state.js` moves any old `cmon.` save
over once (`adoptLegacySaveKeys`).
