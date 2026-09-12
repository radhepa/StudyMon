/* Phase 5 Slice 8: fifth Tier 2 relationship/location batch - Vell and Ink,
   the archive's "breadth versus precision" pair. Both carved out of the
   shared 'scholar' archetype into their own dedicated archetypes ('catalog' /
   'facsimile'), same Tier 2 shape as every prior batch (sci-oak-phase5.js,
   oz-phase5.js/sal-phase5.js, barista-phase5.js/dax-phase5.js,
   ace1-phase5.js/ace2-phase5.js, burl-phase5.js/crag-phase5.js,
   null-phase5.js/leak-phase5.js/geo-phase5.js): a 150-line target each,
   Tier 2-scaled category minimums, and two active heart events each. Vell
   indexes everything broadly and is quietly terrified of a single
   unresolved gap in her own record; Ink reproduces things exactly and is
   quietly terrified of the one old copy she has never gone back to correct.
   Their two events are the same joint effort - tracking down every copy
   made from Ink's one flawed original, using Vell's index - told from each
   woman's own angle, the same "one shared effort, two angles" device this
   project used for Nils/Sump/Geode's shared incident in Phase 5's prior
   slice, scaled down to two characters instead of three. Cross-referenced
   by ordinary narrative mention only, not the relationshipIds gate - Tier 2
   has no bible, so that gate cannot fire for it (see the Phase 5 handoff's
   "Known risks"). This suite also confirms the carve-out did not leak onto
   the remaining scholar-archetype townsfolk who still share the plain
   Scientist/Archivist/Data Analyst/etc. classes. Neither Vell nor Ink has a
   personal badge gate, so both use the standard Tier 2 badge floor (2/5). */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'libr-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Everything here is indexed. Ask me for chapter nine and I will not go looking through chapter one.',
      'Vell. I keep this archive in order, which is a smaller job than it sounds and a larger one than most people guess.',
      'Ask Ink about copying something exactly. Ask me about knowing exactly where it is afterward.',
      'A sorted list is worth the cost of sorting it the moment you search twice. I have never once regretted the first hour spent indexing.',
      'Welcome to the archive. If you misplace something in here, tell me immediately. I would rather know today than discover it in a year.',
      'Ink handles the copying. I handle knowing which copy is which, and where every original actually lives.',
      'Three visits and you will know my desk by sight. Cards, cross-references, and exactly one system that I trust completely.',
      'There is precisely one gap in my index that I have never fully closed. Ask me about it sometime. I will tell you plainly.',
      'Go on, then. If you need to find something later, come back and ask. I will already know roughly where to look.',
      'I have kept an exact record of this place longer than most people keep anything at all. Old habit. A useful one, mostly.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back and asked how the index actually works, not just where the shelves are. Different question. Better one.',
      'You return things to the desk instead of the nearest shelf now. Small thing. Correctly filed, in my estimation.',
      'I have started setting aside anything unusual for you to see specifically. Small thing, from someone who mostly keeps this to herself.',
      'You thanked me properly instead of just taking the answer and leaving. Rare, that.',
      'Ink mentioned you asked about her too. I will pretend that does not please me. It does.',
      'You did not laugh at how particular I am about the shelving order. Most people do, at least a little.',
      'Come by again. There will be something newly indexed, or the same old system, checked more carefully.',
      'I remember your name without needing the card twice. Unusually good going, for me and how little I say to most people.',
      'You have not yet asked about the one gap in my index. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking whose records these actually are, not just what they say. Good instinct, in an archive.',
      'I caught you reading a cross-reference properly before you asked me about it. Fair. I would read it too.',
      'Ink asked, in her way, who the visitor who actually reads the index card was. I told her your name properly, for once.',
      'You have not once suggested I simplify the system. I notice the restraint, and I appreciate it.',
      'I have started explaining more than the usual one sentence about a record, for you specifically.',
      'You come back to this same desk now. I have noticed. I have decided to enjoy it.',
      'You ask what actually happens to a record once it is closed, not just how many there are. Correct order.',
      'I trust your read on whether a detail matters nearly as much as my own, at this point.',
      'You ask what I actually do with all of this, beyond keeping it tidy. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the gap. Most people just get the joke about the shelves being crowded.',
      'You asked why I never simply let an unresolved entry go, and I actually answered instead of deflecting for once.',
      'Ink lets you stand at my desk without commentary now. That almost never happens for anyone I bring along.',
      'I have stopped performing "endlessly organized Vell" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of cross-referencing without once suggesting I hurry it along.',
      'I trust your judgment on whether a record is actually complete nearly as much as my own instinct.',
      'There is a chair by my desk that is basically yours now, if you ever want to just sit there a while.',
      'Ink would call this "unusually generous access to my actual thoughts," and for once she would not be wrong.',
      'You ask what is actually going on with me before you ask what is new in the index today. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the missing item properly, for once, and you did not make it bigger than it was.',
      'You said an unresolved gap is still a kind of waiting, and I have not entirely stopped thinking about that since.',
      'The index has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing what it would feel like to finally close every open entry.',
      'You do not flinch when I admit the keeping is not really about the shelves. Most people just say "stop worrying, then," which helps less than they think.',
      'Ink wants your opinion on something now too, apparently. That is not nothing, coming through her.',
      'I told you the plain version of why one entry stayed open this long. It is a smaller reason than the years make it look.',
      'You are welcome to question any explanation I give about the system. I would rather be caught out than trusted by mistake.',
      'There is a list in my head now of reasons I told myself for waiting that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which order is real and which one is just anxiety dressed up neatly. I have stopped hiding the difference from you.',
      'I let you see how nervous I actually am about an entry I have never closed. Most people never get shown that at all.',
      'You bring up the gap before I can deflect the subject again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually being thorough or just stalling nearly as much as Ink\'s, and I do not say that lightly.',
      'The index has stopped feeling like the whole point of me being here. I choose to believe that means something.',
      'I have stopped performing calm I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said out loud what I am actually afraid of, instead of just calling it "an open question." Consider this the thanks I am bad at giving directly.',
      'We should walk the whole archive together sometime, properly, shelf by shelf. Not to audit it. Just to see it.',
      'Ink calls you "the visitor who actually gets her talking." Coming from her, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that closing the gap would cost me a reason to keep checking everything, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how long that entry actually sat open, not the tidy version I give most people.',
      'I do not need you to confirm closing it is right anymore before I trust that myself. That took a while to build.',
      'You know the two things that actually make me admit I am stalling out of fear, without me listing them again.',
      'I told you about the morning I almost closed the entry and did not. The uncomfortable parts included.',
      'We disagree about whether keeping a record open this long was ever really protecting anyone. I have started thinking you might have a point either way.',
      'I trust you with an unfinished entry now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something in this archive.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The index has one fewer open entry on it now, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is easiest. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-organized bit for you at all anymore. You have seen me actually uncertain, plainly, and never once made it smaller than it was.',
      'There is no version of a hard decision in here that I do not want to tell you about, plain or otherwise.',
      'I still keep more detail than most archivists bother to. I have simply stopped mistaking that for the only kind of care there is.',
      'You are allowed to call out when I am stalling out of fear now, not just afterward. I have extended that to exactly one other person, and she does it constantly.',
      'Ask me the plain version of anything I am avoiding closing. I would rather you heard it true than heard it comfortable.',
      'Same desk tomorrow, probably a slightly lighter version of me after that, and somehow you make either version feel worth visiting for.',
      'Years of treating the keeping like the whole answer, and you are the reason I finally understand it was always partly about trusting someone else\'s record too.'
    ]),
    pool('post-the-gap-in-the-index', 'postEvent', { completedEventIds: ['libr-folk-catalog-event-the-gap-in-the-index'], recentEventIds: ['libr-folk-catalog-event-the-gap-in-the-index'] }, 90, [
      'I moved the same card twice today, out of old habit, before remembering the entry is finally logged, not hidden.',
      'You still ask what is actually missing before you ask how big the index is. Fair, given what actually mattered that week.',
      'I have not gone back to calling it "a small discrepancy" since. Small habit. Sticking, so far.',
      'Ink asked if I had actually meant it about writing gaps down honestly. I told her yes, which is apparently rare enough that she checked twice.',
      'I caught myself about to quietly resolve something without logging it last week. I wrote it down instead, on purpose.',
      'The index has not gotten any smaller overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer visitor asked why I bother logging every gap. I gave them the honest answer this time, not just the tidy one.',
      'I have not needed a whole speech to explain the open entry since. Turns out naming it plainly works better.',
      'The joke about my exactness still gets a laugh. It just is not the only thing people say about it anymore.'
    ], { acknowledgesEventId: 'libr-folk-catalog-event-the-gap-in-the-index' }),
    pool('post-what-ink-found', 'postEvent', { completedEventIds: ['libr-folk-catalog-event-what-ink-found'], recentEventIds: ['libr-folk-catalog-event-what-ink-found'] }, 91, [
      'The gap closed properly, by the way, in case Ink has not already told everyone in the archive.',
      'You still ask how it felt before you ask if the cross-reference held up. Fair, given what actually mattered that day.',
      'I check Ink\'s copy log against my own index now, sometimes. Most weeks. I am working on making it standard.',
      'I do not need every open question to sit here for years anymore. Turns out I get to actually close some of it, jointly.',
      'You watched me file the joint credit, the first time. I have not forgotten who was there for that.',
      'Ink still thanks me more than one afternoon of checking really deserves. I am, reluctantly, letting her have this one.',
      'A newer visitor asked if I ever trust another person\'s record now. I got to say sometimes, properly, for once.',
      'The index is still thorough. It has one very old gap closed properly in it now, though, and I am glad of it.',
      'I have started crediting help before just filing a correction away. Turns out that lands better.'
    ], { acknowledgesEventId: 'libr-folk-catalog-event-what-ink-found' }),
    pool('location-archive', 'location', { location: 'archive' }, 60, [
      'This desk is mine, mostly by habit, and because somebody has to remember exactly where everything actually is.',
      'Ink copies at the table by the window, same as always, before anything gets filed under my system.',
      'Dr. Ohm runs the reproducibility bench near the back. We nod. Neither of us questions the other\'s exactness unprompted.',
      'Dr. Hale groups related specimens and gives the group a name. I would do the same with paper, if paper cooperated as well.',
      'Marn reads the room for what might happen next. I only deal in what already happened and is properly filed.',
      'Ms. Lin teaches one thing at a time down the hall. I have cross-referenced her teaching order more than once, for my own curiosity.',
      'This whole archive runs on the same handful of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how particular I am about the shelving and you will get a slightly different, slightly exaggerated answer every time.',
      'There is exactly one entry in my index that has never been fully closed. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the archive rarely, and usually only to actually go looking for a record kept somewhere else.',
      'Half of town assumes I am always indexing something. Mostly correct, admittedly.',
      'The archive does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect an archivist to be buried in paper somewhere. I specialize in knowing exactly where the paper is instead.',
      'If I am not at my desk, ask Ink. She will know, generally, before I do.',
      'The general store keeps a small box for me now, for anything found in town that might belong on a shelf here. New arrangement. I am still getting used to it.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the desk. Nothing was actually wrong and I still re-checked half the index anyway.',
      'I almost talked myself out of logging an open gap again today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Ink asked about the old entry again today and I deflected harder than usual. That is more about me than her.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer visitor asked why I never just close every open entry, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I actually closed an old entry and the record finally reads the way it should.',
      'Ink actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The plain version was enough, and it was good.',
      'I logged a gap today without even flinching about it. Progress, apparently.',
      'A visitor came back for a record after years and thanked me for keeping it exactly as they left it. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a quiet bar most days.',
      'Ink told me the cross-check saved her more worry than the years of hiding it ever cost her. Coming from her, that is a full parade.'
    ]),
    pool('item-circuittoken', 'itemPokemon', { itemIds: ['circuitToken'] }, 72, [
      'A stamped copper trace, precisely reproduced each time it was struck. I understand this object better than most.',
      'Ink will ask if I am going to catalog it exactly, and the honest answer is probably yes, out of pure habit.',
      'I collect a few of these, quietly, cross-referenced against where each one was actually found.',
      'This might be the tidiest kind of keepsake anyone has given me here: identical by design, easy to file.',
      'Fair warning: I will absolutely tell people this came from someone who understands exactly what precision means to me.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since half my desk is things I catalogued rather than chose. This one I mean to keep, un-filed, just for myself.',
      'This is going somewhere I will actually notice it daily, not buried under older records. Small change, on purpose.'
    ]),
    pool('pokemon-bronzor-archive', 'itemPokemon', { pokemonSeen: [436] }, 70, [
      'One of these sits so still near the back shelves that I nearly filed it as an ornament, twice.',
      'Dr. Hale insists it reacts to being catalogued incorrectly. I have not tested that claim, out of respect for the shelves.',
      'It has never once misplaced itself, as far as I can tell. I find that almost enviable, given my line of work.',
      'It showed up the same season I started this index. I have decided that means something, sentimentally.',
      'Marn says it feels older than it looks. From her, that counts as a real observation.',
      'It is, against all expectation, good company at a quiet desk. Steady, in its own particular way.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same desk, same question on your face. No, nothing new has been logged since this morning.',
      'You know the routine by now. Same cross-referencing, same story about the gap, same offer to show you the oldest entries.',
      'Come on in. Mind the stack near the window; Ink has been meaning to move it for weeks.',
      'Desk talk, a story about an entry, or just standing here while I finish indexing one more thing. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this desk. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Ink if you want something copied exactly; ask me if you want to know where anything actually is.',
      'Come on down. Ink is at her table, being considerably more talkative than usual lately.',
      'The stories get a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this desk now. I do not extend those to just anyone who walks through.',
      'Same desk, same crowded shelves, same general refusal to leave anything unindexed. I would not trade it for a tidier conscience.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'archive', completedEventIds: ['libr-folk-catalog-event-what-ink-found'], minStage: 'trusted' }, 108, [
      'Ink sent a newer visitor my way on purpose, for the index specifically. That is new, coming from her.',
      'I have closed two open entries now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The gap, the empty line it left behind, and a visitor who came back after years to find their old record waiting: apparently this is what actually trusting the system looks like, close up.',
      'Sit a while, if archivists sit. The desk can wait, the oldest gap already closed once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.libr = D;
})();
