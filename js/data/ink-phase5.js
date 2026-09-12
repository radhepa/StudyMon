/* Phase 5 Slice 8: fifth Tier 2 relationship/location batch - Ink, the
   archive's precision half of the "breadth versus precision" pair (see
   libr-phase5.js's header comment for the full shared design and the joint
   backstory this batch is built around). Ink is Tier 2, so she gets no
   CAST_BIBLES entry - her voice and arc live entirely in this file and in
   her dedicated FOLK_EVENTS['facsimile'] arc (see folk-events.js). She was
   carved out of the shared 'Copyist' cls, so this content does not leak
   onto the Calculus region's 'c-abel', the only other 'Copyist' in the
   game. Ink's own arc turns on one old copy with a single stray character
   she made years ago and never went back to correct - see her Event 1 and
   2, and Vell's own file for the other angle on the same joint effort.
   Cross-referenced by ordinary narrative mention only, not the
   relationshipIds gate; see oz-phase5.js's header comment and the Phase 5
   handoff's "Known risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'ink-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'I copy things exactly. One character out and the whole line means nothing.',
      'Ink. I make copies precise enough that nobody should ever need the original again, in theory.',
      'Ask Vell where something actually is. Ask me whether the copy you are holding is trustworthy.',
      'A single wrong character can change an entire meaning. I have built my whole life around not letting that happen twice.',
      'Welcome to the archive. If you ever need something reproduced exactly, bring it to my table. I will not rush it for you.',
      'Vell handles knowing where everything is. I handle making sure what she finds is actually correct.',
      'Three visits and you will know my table by sight. Ink, a straightedge, and considerably more patience than most people expect.',
      'There is precisely one old copy of mine I have never gone back to correct. Ask me about it sometime. I will tell you, eventually.',
      'Go on, then. If you ever doubt a copy\'s accuracy, bring it back. I would rather recheck it than have you wonder.',
      'I have compared originals against copies longer than most people compare anything at all. Old habit. Occasionally an exhausting one.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You asked how I actually check a copy for accuracy, not just how long it takes. Different question. Better one.',
      'You bring me things to compare instead of just assuming they match now. Small thing. Correctly cautious, in my estimation.',
      'I have started setting aside anything oddly reproduced for you to see specifically. Small thing, from someone who mostly keeps this to herself.',
      'You thanked me properly instead of just taking the copy and leaving. Rare, that.',
      'Vell mentioned you asked about her too. I will pretend that does not please me. It does.',
      'You did not laugh at how long I take over one page. Most people do, at least a little.',
      'Come by again. There will be something newly copied, or the same old page, checked more carefully.',
      'I remember your name without needing to check it twice. Unusually good going, for me and how little I say to most people.',
      'You have not yet asked about the one copy I have never corrected. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking whether a copy is verified, not just whether it exists. Good instinct, around me specifically.',
      'I caught you comparing two pages side by side before asking me about it. Fair. I would check them too.',
      'Vell asked, in her way, who the visitor who actually checks for accuracy was. I told her your name properly, for once.',
      'You have not once suggested I simply work faster. I notice the restraint, and I appreciate it.',
      'I have started explaining more than the usual one sentence about a correction, for you specifically.',
      'You come back to this same table now. I have noticed. I have decided to enjoy it.',
      'You ask what actually happens to a flawed copy once it is found, not just how rare that is. Correct order.',
      'I trust your eye for a mismatch nearly as much as my own, at this point.',
      'You ask what I actually do with a correction, beyond making it disappear quietly. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the old mistake. Most people just get the joke about how long I take over one page.',
      'You asked why I never simply let an old error go uncorrected, and I actually answered instead of deflecting for once.',
      'Vell lets you stand at my table without commentary now. That almost never happens for anyone I bring along.',
      'I have stopped performing "perfectly precise Ink" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of checking one page without once suggesting I hurry it along.',
      'I trust your judgment on whether a copy is actually accurate nearly as much as my own eye.',
      'There is a stool by my table that is basically yours now, if you ever want to just sit there a while.',
      'Vell would call this "unusually generous access to my actual thoughts," and for once she would not be wrong.',
      'You ask what is actually going on with me before you ask what is new on the table today. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the stray character properly, for once, and you did not make it bigger than it was.',
      'You said an uncorrected error is still a kind of hiding, and I have not entirely stopped thinking about that since.',
      'The table has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing what it would feel like to finally fix every flawed copy properly.',
      'You do not flinch when I admit the checking is not really about the pages. Most people just say "let it go, then," which helps less than they think.',
      'Vell wants your opinion on something now too, apparently. That is not nothing, coming through her.',
      'I told you the plain version of why I never corrected it before now. It is a smaller reason than the years make it look.',
      'You are welcome to question any explanation I give about the mistake. I would rather be caught out than trusted by mistake.',
      'There is a list in my head now of reasons I told myself for waiting that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which precision is real and which one is just fear dressed up neatly. I have stopped hiding the difference from you.',
      'I let you see how nervous I actually am about an error I have never corrected. Most people never get shown that at all.',
      'You bring up the old copy before I can deflect the subject again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually being careful or just avoiding it nearly as much as Vell\'s, and I do not say that lightly.',
      'The table has stopped feeling like the whole point of me being here. I choose to believe that means something.',
      'I have stopped performing calm I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said out loud what I am actually afraid of, instead of just calling it "an old page." Consider this the thanks I am bad at giving directly.',
      'We should go through the whole shelf of old copies together sometime, properly, page by page. Not to hide anything. Just to see it clearly.',
      'Vell calls you "the visitor who actually gets me talking." Coming from her, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that correcting the old copy would mean everyone finally seeing that I am not infallible, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how long that mistake actually sat there, not the tidy version I give most people.',
      'I do not need you to confirm correcting it is right anymore before I trust that myself. That took a while to build.',
      'You know the two things that actually make me admit I am avoiding it out of fear, without me listing them again.',
      'I told you about the morning I almost corrected it and did not. The uncomfortable parts included.',
      'We disagree about whether hiding it this long was ever really protecting anyone. I have started thinking you might have a point either way.',
      'I trust you with an uncorrected mistake now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something at this table.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The old copy has one fewer uncorrected line in it now, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is easiest. I have started expecting that, and preferring it.',
      'I do not perform the perfectly-precise bit for you at all anymore. You have seen me actually uncertain, plainly, and never once made it smaller than it was.',
      'There is no version of a hard correction in here that I do not want to tell you about, plain or otherwise.',
      'I still check more carefully than most copyists bother to. I have simply stopped mistaking that for the only kind of care there is.',
      'You are allowed to call out when I am avoiding something out of fear now, not just afterward. I have extended that to exactly one other person, and she does it constantly.',
      'Ask me the plain version of anything I am avoiding correcting. I would rather you heard it true than heard it comfortable.',
      'Same table tomorrow, probably a slightly lighter version of me after that, and somehow you make either version feel worth visiting for.',
      'Years of treating the hiding like the only option, and you are the reason I finally understand it was always partly about being willing to be seen fixing it.'
    ]),
    pool('post-the-one-stray-character', 'postEvent', { completedEventIds: ['ink-folk-facsimile-event-the-one-stray-character'], recentEventIds: ['ink-folk-facsimile-event-the-one-stray-character'] }, 90, [
      'I re-read the same old line twice today, out of old habit, before remembering it is finally written down, not hidden.',
      'You still ask what actually changed in the meaning before you ask how small the error was. Fair, given what actually mattered that day.',
      'I have not gone back to calling it "barely worth mentioning" since. Small habit. Sticking, so far.',
      'Vell asked if I had actually meant it about writing mistakes down honestly. I told her yes, which is apparently rare enough that she checked twice.',
      'I caught myself about to quietly let a small mismatch go last week. I wrote it down instead, on purpose.',
      'The shelf of old copies has not gotten any shorter overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer visitor asked why I bother writing down every small error. I gave them the honest answer this time, not just the tidy one.',
      'I have not needed a whole speech to explain the old mistake since. Turns out naming it plainly works better.',
      'The joke about how long I take over one page still gets a laugh. It just is not the only thing people say about it anymore.'
    ], { acknowledgesEventId: 'ink-folk-facsimile-event-the-one-stray-character' }),
    pool('post-correcting-it-out-loud', 'postEvent', { completedEventIds: ['ink-folk-facsimile-event-correcting-it-out-loud'], recentEventIds: ['ink-folk-facsimile-event-correcting-it-out-loud'] }, 91, [
      'The old copy is corrected properly, by the way, in case Vell has not already told everyone in the archive.',
      'You still ask how it felt before you ask if the count came out right. Fair, given what actually mattered that day.',
      'I check my oldest copies against Vell\'s index now, sometimes. Most weeks. I am working on making it standard.',
      'I do not need every mistake to stay hidden for years anymore. Turns out I get to actually fix it, in front of someone.',
      'You watched me correct the last one, the first time, out in the open. I have not forgotten who was there for that.',
      'Vell still credits me more than one afternoon of checking really deserves. I am, reluctantly, letting her have this one.',
      'A newer visitor asked if I ever let anyone watch me fix something now. I got to say sometimes, properly, for once.',
      'The shelf is still exact. It has one very old line corrected properly in it now, though, and I am glad of it.',
      'I have started explaining a correction before just filing it away. Turns out that lands better.'
    ], { acknowledgesEventId: 'ink-folk-facsimile-event-correcting-it-out-loud' }),
    pool('location-archive', 'location', { location: 'archive' }, 60, [
      'This table is mine, mostly by habit, and because somebody has to check every copy against its original.',
      'Vell keeps the index at her desk near the entrance, same as always, before anything I make gets filed under her system.',
      'Dr. Ohm runs the reproducibility bench near the back. We nod. Neither of us questions the other\'s exactness unprompted.',
      'Dr. Hale groups related specimens and gives the group a name. I would do the same with pages, if pages cooperated as well.',
      'Marn reads the room for what might happen next. I only deal in what is already written down and needs checking.',
      'Ms. Lin teaches one thing at a time down the hall. I have compared her handouts against the originals more than once, for my own curiosity.',
      'This whole archive runs on the same handful of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how long I take over one page and you will get a slightly different, slightly exaggerated answer every time.',
      'There is exactly one old copy of mine that has never been fully corrected. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the archive rarely, and usually only to actually compare something against a copy kept somewhere else.',
      'Half of town assumes I am always copying something. Mostly correct, admittedly.',
      'The archive does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect a copyist to work quickly. I specialize in the opposite, on principle rather than necessity.',
      'If I am not at my table, ask Vell. She will know, generally, before I do.',
      'The general store keeps a small box for me now, for anything found in town that might need comparing against an original here. New arrangement. I am still getting used to it.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day at the table. Nothing was actually wrong and I still re-checked half the page anyway.',
      'I almost talked myself out of writing down a small error again today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Vell asked about the old copy again today and I deflected harder than usual. That is more about me than her.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer visitor asked why I never just let a small mismatch go, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I actually corrected an old copy and the page finally reads the way it should.',
      'Vell actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The plain version was enough, and it was good.',
      'I wrote down a small error today without even flinching about it. Progress, apparently.',
      'A visitor came back for a copy after years and thanked me for making it exactly right the first time. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a quiet bar most days.',
      'Vell said finding it together cost her less than years of not knowing ever did. Coming from her, that is a full parade.'
    ]),
    pool('item-integraltoken', 'itemPokemon', { itemIds: ['integralToken'] }, 72, [
      'A weighty brass token, stamped the same way every single time it was made. I understand this object better than most.',
      'Vell will ask if I am going to catalog it exactly, and the honest answer is probably yes, out of pure habit.',
      'I collect a few of these, quietly, checking each one against the others for any variation at all.',
      'This might be the most reassuring kind of keepsake anyone has given me here: identical by design, easy to trust.',
      'Fair warning: I will absolutely tell people this came from someone who understands exactly what precision means to me.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since half my table is things I compared rather than chose. This one I mean to keep, unchecked, just for myself.',
      'This is going somewhere I will actually notice it daily, not buried under older pages. Small change, on purpose.'
    ]),
    pool('pokemon-bronzor-archive', 'itemPokemon', { pokemonSeen: [436] }, 70, [
      'One of these sits so still near my table that I nearly copied its outline once, out of habit, before catching myself.',
      'Dr. Hale insists it is unnervingly symmetrical. I have checked. It is unnervingly symmetrical.',
      'It has never once moved a fraction between visits, as far as I can measure. I find that almost comforting, given my line of work.',
      'It arrived the same season I made my worst copy. I try not to read too much into that.',
      'Marn says it feels older than it looks. From her, that counts as a real observation.',
      'It is, against all expectation, good company for a long afternoon of checking. Steady, in its own particular way.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same table, same question on your face. No, nothing new has been copied since this morning.',
      'You know the routine by now. Same checking, same story about the old copy, same offer to show you the oldest pages.',
      'Come on in. Mind the stack near the door; Vell has been meaning to reindex it for weeks.',
      'Table talk, a story about a correction, or just standing here while I finish one more line. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this table. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Vell if you want to know where something actually is; ask me if you want to know whether it is exact.',
      'Come on down. Vell is at her desk, being considerably more talkative than usual lately.',
      'The stories get a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this table now. I do not extend those to just anyone who walks through.',
      'Same table, same careful pages, same general refusal to let anything stay uncorrected. I would not trade it for a tidier conscience.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'archive', completedEventIds: ['ink-folk-facsimile-event-correcting-it-out-loud'], minStage: 'trusted' }, 108, [
      'Vell sent a newer visitor my way on purpose, for the table specifically. That is new, coming from her.',
      'I have corrected two old copies now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The stray character, the copy it changed, and a visitor who came back after years to find their old page waiting, finally right: apparently this is what actually being seen looks like, close up.',
      'Sit a while, if copyists sit. The table can wait, the oldest mistake already corrected once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.ink = D;
})();
