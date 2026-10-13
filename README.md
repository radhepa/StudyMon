<div align="center">

<img src="docs/screenshots/banner.png" alt="StudyMon's current title screen, with a blue sky, grassy hills and Pokémon companions" width="100%">

### A Pokémon-style adventure where every attack is a question.

**Learn C programming and Calculus II by catching, battling and exploring your way through two whole regions.**

<br>

![1,046 Pokémon](https://img.shields.io/badge/Pok%C3%A9mon-1%2C046-F2C14E?style=for-the-badge&labelColor=1B1B2F)
![2,760 questions](https://img.shields.io/badge/questions-2%2C760-2F6FD0?style=for-the-badge&labelColor=1B1B2F)
![49 side quests](https://img.shields.io/badge/side%20quests-49-5DB04A?style=for-the-badge&labelColor=1B1B2F)
![Runs offline](https://img.shields.io/badge/runs-offline-2F6FD0?style=for-the-badge&labelColor=1B1B2F)
![No build step](https://img.shields.io/badge/build%20step-none-8a6d9c?style=for-the-badge&labelColor=1B1B2F)

<br>

[**Play it**](#-play-it) &nbsp;·&nbsp; [How battles work](#-every-attack-is-a-question) &nbsp;·&nbsp; [Two regions](#-two-regions-two-courses) &nbsp;·&nbsp; [Midterm revision](#-c-midterm-revision-route) &nbsp;·&nbsp; [Study tools](#-the-study-tools) &nbsp;·&nbsp; [Side Quests](#-side-quests-write-real-c) &nbsp;·&nbsp; [Collecting](#-gotta-study-em-all) &nbsp;·&nbsp; [Kingdom](#-pokémon-kingdom) &nbsp;·&nbsp; [Under the hood](#-under-the-hood)

</div>

<br>

## ✦ What is StudyMon?

StudyMon turns course revision into a creature-collecting RPG. Pick a starter, explore a route, and meet a wild Pokémon. To use a move you have to **answer a question** from your course, and stronger moves ask harder questions. Win battles to level up and evolve your team, earn gym badges, and track your collection in a 1,046-entry Pokédex.

The current app has a bright **handheld-inspired design**: a sky-and-grass title screen, crisp pixel labels, readable question text, and battle plates with gender markers, caught indicators, numeric HP and an EXP bar. Routes highlight your next chapter or weakest topic, and you can switch between **Course order** and **Weakest first**.

It is built around two real university courses:

| | **The C-Region** | **The Converging Isles** |
|---|---|---|
| **Subject** | C programming | Calculus II |
| **Follows** | *Computer Science: A Structured Programming Approach in C*, Forouzan & Afyouni, 4th ed. | The Calculus II syllabus: vectors through series, Taylor and polar coordinates |
| **World** | 15 chapter routes, 15 gyms, a Midterm Revision Route, an Elite Four and a Champion | 10 quiz routes, 10 gyms, 3 evening exams and a Final, each with a revision route |
| **Questions** | 1,025 | 1,735 |

Everything runs locally in your browser, with no account or build step. Once the repository is downloaded, the game, music and C compiler work offline. Progress is saved in that browser.

<br>

## ✦ At a glance

| Feature | What you get |
|---|---|
| 🐾 **1,046 Pokémon** | All 1,025 official species, each with front, back and shiny sprites and cries, plus **21 original StudyMon creatures** |
| 📚 **2,760 questions** | Every one with an explanation of *why*, not just which letter was right |
| 🏟 **25 gyms** | One per chapter in the C-Region, one per quiz in the Converging Isles, each led by a named Gym Leader |
| 📝 **C midterm revision** | 498 existing questions and the 60 Pokémon from Routes 1–5, in a practice route between Chapters 7 and 8 |
| 💻 **49 Side Quests** | Write real C in the game, compiled by Clang inside your browser and graded against hidden tests |
| 🎬 **98 cutscenes** | Every Side Quest has an opening and a closing scene, with portraits and painted backdrops |
| 🌿 **Pokémon Kingdom** | A living pixel-art forest town where your whole collection wanders, with day, night and rain |
| 🎧 **Radio and Pokédoro** | 117 radio tracks and an adjustable focus timer that awards party XP |
| 🧪 **Automated checks** | Data checks and browser suites covering battles, catches, evolutions, saves and graded labs |

*Screenshots below were captured from the current app in October 2026 using an isolated demo save.*

<br>

## ✦ Every attack is a question

Choose a move and answer a question from its difficulty tier. Read the explanation, then press **Continue** to resolve the turn. Right answers land the hit; wrong answers fizzle it and give the opponent a stronger counter-attack.

<table>
<tr>
<td width="50%" valign="top"><img src="docs/screenshots/battle-c.jpg" alt="A wild battle in the C-Region asking a pointer question"></td>
<td width="50%" valign="top"><img src="docs/screenshots/battle-calc.jpg" alt="A Calculus II battle after a wrong answer, showing hints and a worked solution"></td>
</tr>
<tr>
<td align="center"><sub><b>C-Region.</b> A pointer trace on Route 9, with the current handheld battle plates.</sub></td>
<td align="center"><sub><b>Converging Isles.</b> A wrong answer reveals stepped hints and the full worked solution.</sub></td>
</tr>
</table>

| Move tier | Unlocks at | What it asks |
|:---:|:---:|---|
| ★☆☆☆ | Lv 1 | **Recall:** definitions, syntax, which header |
| ★★☆☆ | Lv 8 | **Apply:** short traces, single-concept output |
| ★★★☆ | Lv 18 | **Analyse:** multi-step traces, bug hunts |
| ★★★★ | Lv 30 | **Synthesis:** undefined behaviour, subtle gotchas |

- **Right answer:** your move lands and the counter-attack only does 35% damage.
- **Wrong answer:** your move fizzles and the opponent hits for 150%.
- **Speed and streaks** earn bonus damage, and a run of correct answers boosts your prize money.
- **Levels scale to you.** Wild Pokémon and gym leaders stay near your own party's level, so any route is playable on the night you are actually studying that chapter.
- **Calculus reads like calculus.** Converging Isles questions are typeset as you go: stacked fractions, raised powers, square roots with a bar, and integrals and sums with their limits in place.
- **Stay on the route.** Winning or catching leads straight into the next wild encounter. Running, losing, using a Poké Doll or pressing **Routes** returns you to the map position where you set off.
- **Stuck? Copy it.** The **Copy** button at the top right of every question card copies the question and its lettered choices, ready to paste into Gemini or any other assistant.

Keyboard friendly: `1`–`4` or `A`–`D` to answer, `Enter` to continue.

<br>

## ✦ Two regions, two courses

<table>
<tr>
<td width="50%" valign="top"><img src="docs/screenshots/map.jpg" alt="The current C-Region map, with a weakest-chapter focus card, review queue and chapter routes"></td>
<td width="50%" valign="top"><img src="docs/screenshots/calc-map.jpg" alt="The current Converging Isles map, with quiz routes and chapter controls"></td>
</tr>
<tr>
<td align="center"><sub><b>The C-Region.</b> One route per chapter. Every route is open from day one.</sub></td>
<td align="center"><sub><b>The Converging Isles.</b> Gym leaders have portraits, and every gym and evening exam is open from day one.</sub></td>
</tr>
</table>

Each chapter is a **route** (wild battles to catch Pokémon and practise) with a **gym** at the end (a Gym Leader and a badge). Chapters map to Pokémon types as a memory aid: Pointers are Ghost because of *indirection*, Arrays are Rock because they are *one contiguous block*, and Structures are Steel because of *padding*.

The **Ferry** in the top bar sails you between regions, with a short pixel-art voyage before you land on the destination's route map. Your Pokémon, money and bag travel with you; each region keeps its own badges and review progress. The crossing is available as soon as you have a starter, and reduced-motion settings skip the animation.

<div align="center">
<img src="docs/screenshots/ferry.jpg" alt="The pixel-art ferry crossing to the Converging Isles, with a Wingull and an island on the horizon" width="500">
</div>

<details>
<summary><b>The C-Region: all fifteen gyms</b></summary>

<br>

| Ch | Topic | Type | Gym Leader | Badge |
|:-:|---|:-:|---|---|
| 1 | Introduction to Computers | Normal | Byte | Boot |
| 2 | Introduction to the C Language | Grass | Vera Bell | Hello |
| 3 | Structure of a C Program | Electric | Ohma | Operand |
| 4 | Functions | Fighting | Callum | Return |
| 5 | Selection: Making Decisions | Psychic | Elsie Fitz | Branch |
| 6 | Repetition | Flying | Willa Doo | Loop |
| 7 | Text Input/Output | Water | Scanlon Prince | Stream |
| 8 | Arrays | Rock | Indira Bounds | Index |
| 9 | Pointers | Ghost | Astrid Starr | Deref |
| 10 | Strings | Fairy | Nula Terminel | NUL |
| 11 | Enumerated, Structure and Union Types | Steel | Padma Align | Struct |
| 12 | Binary Input/Output | Ice | Fee Seeker | Seek |
| 13 | Bitwise Operators | Bug | Xora Mask | Mask |
| 14 | Lists | Dragon | Linka Head | Node |
| 15 | Recursion | Psychic | Reva Call | Base Case |

All fifteen badges open the **Elite Four**: Seg Fault, Ida Overflow, Fee Seeker II and Uma Bee, then **Champion ANSI**.

</details>

<details>
<summary><b>The Converging Isles: all ten gyms and the evening exams</b></summary>

<br>

| Ch | Topic | Type | Gym Leader | Badge |
|:-:|---|:-:|---|---|
| 1 | Vectors | Flying | Rhea Dexter | Arrow |
| 2 | Areas and Slices | Grass | Della Twain | Between |
| 3 | Shells, Arc Length and Work | Steel | Axel Turner | Revolution |
| | *Evening Exam I* | | Elara Slate | |
| 4 | Trigonometric Integrals | Electric | Cosima Wave | Identity |
| 5 | Substitution and Partial Fractions | Ghost | Thea Sinclair | Triangle |
| 6 | Improper Integrals and Sequences | Dragon | Lim Everard | Infinity |
| | *Evening Exam II* | | Otto Graff | |
| 7 | Series and the First Tests | Poison | Cora Verge | Convergence |
| 8 | Alternating Series and Choosing a Test | Dark | Alta Rennick | Alternating |
| | *Evening Exam III* | | Sera Conn | |
| 9 | Power Series and Taylor Series | Psychic | Rae Diuss | Radius |
| 10 | Taylor at Work and Polar Coordinates | Fairy | Rose Kardia | Rose |
| | ***The Final*** | | Dean Aster | |

Across the 35 lessons, the quizzes cover most of the course. The **evening exams** test the lessons that no quiz asks about, so there is nowhere to hide. Nothing is locked behind badges: every gym, route and exam is open from the start, so you can study whatever your class is on this week, in any order. A gym fights like the next badge you are due, whichever one you pick. Each exam also has a **Revision Route** for practice.

</details>

<br>

## ✦ C Midterm Revision Route

The **Midterm Revision Route** sits **between Chapters 7 and 8** in Course order and is open for practice from the start.

<div align="center">
<img src="docs/screenshots/midterm.jpg" alt="The Midterm Revision Route between Chapters 7 and 8, showing its question pool and Pokémon from Routes 1–5" width="850">
</div>

- **498 existing questions.** All of Chapters 1–5, plus selected questions from later chapters on formatted and character I/O, characters and pointers. This covers the midterm's computers, data types, operators, prefix/postfix, modulus, functions, selection, logical expressions, `rand`/`srand`, `printf`/`scanf` and pointer topics.
- **60 Pokémon from Routes 1–5.** Their original rarities are preserved. Roaming legendaries do not enter this route.
- **Shared study progress.** Answers update the original questions and chapters, so revision, chapter drills and ordinary routes share one review history. No duplicate or additional questions are needed.
- **Choose how to revise.** Wild battles, a plain drill, Route Info and **See all questions** use the same selected pool.

The quest board also has a separate **19-job Midterm review** set for practising real C programs.

<br>

## ✦ The study tools

Study with battles, chapter notes, plain drills or a mock exam, and use your Trainer Card to choose what to revisit.

<table>
<tr>
<td width="50%" valign="top"><img src="docs/screenshots/stats.jpg" alt="The Trainer Card and Weakness Report showing accuracy per chapter"></td>
<td width="50%" valign="top"><img src="docs/screenshots/exam.jpg" alt="A mock exam question with no feedback until the end"></td>
</tr>
<tr>
<td align="center"><sub><b>Trainer Card.</b> Accuracy per chapter, weakest first. This is the list to study from.</sub></td>
<td align="center"><sub><b>Mock Exam.</b> 25 or 50 shuffled questions, no feedback, a worked review at the end.</sub></td>
</tr>
</table>

- 🔁 **Spaced repetition.** A Leitner box system runs under everything. A missed question drops to box 1 and comes back in two questions. One you keep getting right climbs to box 5 and will not return for a hundred. It works across battles, drills and exams alike, and the top bar shows how many reviews are due.
- 🧮 **A different schedule for Calculus.** A right answer returns after about 50 questions and a wrong one after about 25, with some variation. New questions are picked by *problem type*. Answer one right three times running and it is hidden; **Bring hidden back** in Route Info restores it when you want another pass.
- 🪜 **Hints that teach.** Calculus problems reveal stepped hints and then a complete worked solution, so the study loop never depends on an outside tutor.
- 📖 **Move Tutor.** A condensed, exam-focused notes sheet for every chapter, with a self-check coding task and one-click jumps to a wild battle, the gym or a plain drill.
- 🔍 **Review Center and chapter drills.** Pure Q&A with no battle, on whatever is due or on one chapter.
- 📝 **Route Info and question catalogue.** See the route's encounter roster, rarities and question coverage. Uncaught Pokémon are silhouettes, seen species reveal their names, and catches show in colour. **See all questions** lists the actual question pool with answers and explanations.

<table>
<tr>
<td width="50%" valign="top"><img src="docs/screenshots/notes.jpg" alt="The Move Tutor chapter notes for Pointers"></td>
<td width="50%" valign="top"><img src="docs/screenshots/route.jpg" alt="Route info showing silhouettes of uncaught Pokémon and a question base counter" width="70%"></td>
</tr>
<tr>
<td align="center"><sub><b>Move Tutor.</b> Exam-focused notes for each chapter.</sub></td>
<td align="center"><sub><b>Route Info.</b> Silhouettes until caught, plus how many of the route's questions you have met.</sub></td>
</tr>
</table>

<br>

## ✦ Side Quests: write real C

Forty-nine programming jobs, handed out by the people of the region, from a quick receipt to a working field journal. **18 easy, 15 medium and 16 hard**, including a nineteen-job midterm review set.

<table>
<tr>
<td width="50%" valign="top"><img src="docs/screenshots/labscene.jpg" alt="Wren, the Mart Clerk, introducing a Side Quest in a painted cutscene"></td>
<td width="50%" valign="top"><img src="docs/screenshots/editor.jpg" alt="A C program in the current editor, with a real eight-of-eight passing autograder result"></td>
</tr>
<tr>
<td align="center"><sub><b>The brief.</b> Every job opens and closes with a cutscene.</sub></td>
<td align="center"><sub><b>The workshop.</b> Write C, Run an input, then Submit. This screenshot follows a real 8/8 passing submission.</sub></td>
</tr>
</table>

- **Real compilation.** Your program is compiled by **Clang running as WebAssembly inside the page**, with C11 and strict warnings (`-Wall -Wextra -Werror -pedantic-errors`). Nothing is uploaded and you need no compiler installed.
- **Real grading.** Submit runs your code against every hidden test, in a fresh in-memory sandbox, with limits on time, memory and output. The reward is paid out **once, and only when every test passes**.
- **Two styles of lab.** Some ask for a whole program. Others hand you function signatures to implement while the game supplies `main()`.
- **Saved drafts, hints and a chapter guide** sit beside every job, and rewards (money and berries) can be used from the Party screen.
- **Story.** Each job comes with an opening and a closing scene, with portraits and painted backdrops. Finishing jobs earns keepsakes.

<details>
<summary><b>The current quest board</b></summary>

<br>
<img src="docs/screenshots/quests.jpg" alt="The Side Quest board with set, difficulty, progress and search filters">

Every job is available immediately. Filter by the midterm set, difficulty or progress, or search by title, chapter or character.

</details>

<br>

## ✦ Gotta study 'em all

<table>
<tr>
<td width="50%" valign="top"><img src="docs/screenshots/dex.jpg" alt="The Pokédex grid"></td>
<td width="50%" valign="top"><img src="docs/screenshots/party.jpg" alt="Party and Boxes, a Pokémon storage system"></td>
</tr>
<tr>
<td align="center"><sub><b>Pokédex.</b> 1,046 entries and counting.</sub></td>
<td align="center"><sub><b>Party and Boxes.</b> A proper storage system with nicknames and evolution paths.</sub></td>
</tr>
</table>

- **A full Pokédex roster.** 1,025 official species plus the originals below, with local front, back and shiny sprites. Route Info shows which species are available on each route.
- **The real catch formula.** Catching uses the Generation III/IV maths with four 16-bit shake checks, not an invented one. A Caterpie and a Lugia are as far apart here as they are in the games. Your *study* replaces the status condition: a wrong answer is a penalty, a right answer is a bonus, and three correct in a row is a "focus" bonus. To catch something rare, be answering well when you throw.
- **Choose your starter.** 29 distinct species: the nine regional trios from Kanto through Paldea, plus Pikachu and Eevee. Hisui and Legends Z-A filter groups reuse their featured species. Preview before you commit.
- **Legendaries roam.** After five badges, about 3% of wild encounters turn up something that should not be there. They arrive above your level and resist the ball hard.
- **Shinies** appear at 1 in 1,000, and a shiny encounter announces itself in the battle log and a toast.
- **Evolve and choose.** Branching evolutions let you pick the path when you are ready.
- **A Poké Mart.** Poké Balls are free and unlimited. Money buys *better* balls and potions, so "is this one worth an Ultra Ball?" is a real decision. Prize money comes from battles, and it grows once your streak reaches five.

### 21 originals

Besides the official roster there are **21 original StudyMon creatures** (#1026–#1046), including the Papyrunt → Codexal → Lexidrake line and the Isles' regional starter line, Drenchic → Condusken → Blitziken.

<div align="center">
<img src="docs/screenshots/originals.png" alt="The 21 original StudyMon species together in an in-game storage box" width="760">
</div>

<br>

## ✦ Pokémon Kingdom

Your collection does not just sit in a box. In the **Pokémon Kingdom**, every Pokémon you own lives a life in a ten-district pixel-art forest town: Kingdom Green, Lantern Square, Berry Market, Riverside Walk, Hearthside Lane, Moonbell Hill, Mossroot Gym, Honeywind Orchard, Emberstone Springs and Starglass Observatory.

<div align="center">
<img src="docs/screenshots/kingdom-map.jpg" alt="The connected Kingdom town map with resident counts for all ten districts" width="760">
<br><br>
<img src="docs/screenshots/kingdom.jpg" alt="Pokémon residents at Berry Market in the current Kingdom" width="760">
</div>

- 🚶 **They have individual itineraries.** A resident can stay for five minutes or several days, then walk the connected paths through nearby districts. The town map shows residents travelling between places, and their itineraries continue while the game is closed. Your party wears a gold star.
- 🌗 **Day, night and rain.** The town follows Eastern Time through dawn, day, dusk and night. Rain brings falling streaks, splashes, mist and a layered rain sound. Lanterns flicker once the sun goes down.
- 🎵 **Original music.** Each district has its own low-fatigue procedural score with its own tempo, harmony and lead voice, and moving between districts crossfades the themes.
- ✋ **Pick one up.** Tap a Pokémon to say hello, or hold the hand on it to lift it and carry it somewhere else. Mossroot Gym has training stations: a climbing wall, hanging bags, balance logs and agility hurdles.
- 🧱 **Solid ground.** Hand-authored walkable areas keep residents off buildings, water, stalls and benches, while Pokémon themselves stay non-solid so friends can bunch up naturally.

<br>

## ✦ Radio and Pokédoro

<table>
<tr>
<td width="50%" align="center" valign="top"><img src="docs/screenshots/radio.jpg" alt="The StudyMon Radio panel with a track list" width="300"></td>
<td width="50%" align="center" valign="middle"><img src="docs/screenshots/pokedoro.jpg" alt="The Pokedoro focus timer" width="340"></td>
</tr>
</table>

- 📻 **StudyMon Radio** has **117 tracks**, play-all and repeat-one, a volume slider and ambient sound controls. Each Kingdom district has its own theme. Add your own files by following [`assets/music/README.md`](assets/music/README.md).
- 🍅 **Pokédoro** is a Pomodoro timer with a twist: **your whole party earns XP for every focused minute**, and breaks do not. The timer is adjustable.

<br>

## ✦ Also built, currently switched off

Some systems are fully built and saved, but their menu buttons are hidden for now (`TOWN_UI_ENABLED = false` in [`js/engine/ui.js`](js/engine/ui.js)). Nothing was deleted.

- 🏘 **Bootstrap Town:** an 18-scene walkable community with 45 homes, 17 public buildings and a connected town map.
- 💛 **Friendship:** a large cast of townspeople and companions who can become friends, with heart-event scenes, gifts, rumours and mail.
- 📔 **A journal and collection:** one notebook page per day, plus a chest, an aquarium and a terrarium for keepsakes ([design notes](COLLECTABLES.md)).

<br>

## ✦ Play it

### The easy way (Windows)

Double-click **`Play StudyMon.bat`**. It starts a tiny local server and opens your browser. Leave the black window open while you play and close it when you are done.

### Any platform

You only need [Node.js](https://nodejs.org) or Python 3 to serve the folder:

```bash
git clone https://github.com/radhepa/StudyMon.git
cd StudyMon
node tools/serve.js 8777
```

Then open <http://localhost:8777>. If you prefer Python, `python tools/serve.py 8777` does the same job.

> **Heads up:** the full Pokédex art and cries live in the repo so the game works offline, which makes a fresh clone large (several hundred MB).

Use the launcher or a local server. Opening `index.html` directly can block browser storage or the C compiler's worker and asset requests.

### Your save

Progress lives in your browser's local storage under keys that start with `studymon.`. From the **Trainer Card** screen you can **export** your save to a file, **import** one, or erase everything. Export before you clear your browser data. Use the same browser, hostname and port to return to the same save: `localhost:8777` and `127.0.0.1:8780` have separate storage.

<details>
<summary><b>On a phone-sized screen</b></summary>

<br>
<img src="docs/screenshots/mobile.jpg" alt="The current StudyMon routes screen at a 390-pixel phone viewport" width="300">

</details>

<br>

## ✦ Under the hood

StudyMon is plain **HTML, CSS and JavaScript** with no framework, no bundler and no build step. Open the folder and it runs.

```text
index.html               the game
Play StudyMon.bat        Windows launcher (starts a local server, opens the browser)
css/                     feature styles and the current daylight handheld theme
js/data/                 species, questions, gyms, side quests, cast, songs, scenes
js/data/questions/       the C question bank, merged at load time
js/data/c-midterm.js     the revision route's references to existing questions and encounters
js/data/calc/            the Calculus II lessons, questions and world
js/engine/               state, battle, quiz and spaced repetition, UI, kingdom, radio
assets/                  sprites, cries, portraits, painted scenes, the WASM compiler
docs/screenshots/        current app screenshots used in this README
tools/                   data builders, local servers, screenshot capture and checks
```

- **Offline by design.** Pokémon data, sprites and cries were fetched from [PokéAPI](https://pokeapi.co) once and live in `assets/`.
- **The compiler** is [wasm-clang](https://github.com/binji/wasm-clang) (Clang and LLD compiled to WebAssembly) with a [browser WASI shim](https://github.com/bjorn3/browser_wasi_shim) running the result in an in-memory sandbox. See [`assets/compiler/ATTRIBUTION.md`](assets/compiler/ATTRIBUTION.md).
- **Tested against a real browser.** `node tools/check-all.cjs` drives real wild and gym battles to completion, catches, evolutions, the ferry, the PC, the spaced-repetition boxes, friend scenes and the Side Quest autograder. Every run seeds its own save in throwaway storage, so your own save is never touched. See [`TESTING.md`](TESTING.md).
- **Saves are migrated.** Older saves are upgraded on load, and old question IDs stay valid.

### Add your own questions

Open the file for a chapter group and add an entry. The game picks it up on reload.

```js
{ id: 'c9-24', t: 2, k: 'mcq', tag: 'Trace',
  q: 'What is printed?',
  code: 'int x = 5;\nint *p = &x;\nprintf("%d", *p);',
  c: ['5', 'The address of x', 'Garbage', '0'], a: 0,
  why: 'p holds the address of x, so *p reads the value stored there.' },
```

`t` is the tier (1–4), `k` is `'mcq'` or `'fill'`, and `why` is the part that teaches, so always fill it in.

### Refresh these screenshots

With the local server running and Playwright available:

```bash
node tools/capture-readme.cjs http://127.0.0.1:8777/
```

The capture tool opens a disposable browser context, seeds demo progress, reports current content counts, and captures the actual app into `docs/screenshots/`. The editor image requires a real passing submission. It uses Microsoft Edge by default; set `STUDYMON_BROWSER` to another Chromium browser executable if needed. See [`tools/playwright.cjs`](tools/playwright.cjs) for dependency discovery, including `PLAYWRIGHT_PATH`.

### More documentation

| | |
|---|---|
| [`docs/DEVELOPER-NOTES.md`](docs/DEVELOPER-NOTES.md) | How each system was built and the maths behind it |
| [`TESTING.md`](TESTING.md) | Every check suite and what it proves |
| [`COLLECTABLES.md`](COLLECTABLES.md) | The collection and keepsake design |
| [`assets/compiler/ATTRIBUTION.md`](assets/compiler/ATTRIBUTION.md) | Third-party toolchain credits and licences |

<br>

## ✦ Credits and legal

- **StudyMon is an unofficial, non-commercial fan and study project.** Pokémon and Pokémon character names are trademarks of Nintendo, Creatures Inc. and GAME FREAK. This project is not affiliated with or endorsed by any of them.
- Official Pokémon data, sprites and cries come from [PokéAPI](https://pokeapi.co).
- The course-aligned practice questions and labs are study material, not an official textbook answer key. C notes follow the fourth-edition chapter order and use C99/C11/C17 rules unless a question says otherwise.
- The StudyMon creatures, the characters and portraits, the painted scenes and the music are original to this project.
- Clang, LLD, the WASI shim and their licences are credited in [`assets/compiler/ATTRIBUTION.md`](assets/compiler/ATTRIBUTION.md).

<div align="center">
<br>

*Study a little. Stay for a battle.*

</div>
