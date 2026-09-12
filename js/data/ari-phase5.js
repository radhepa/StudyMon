/* Phase 5 Slice 9: sixth Tier 2 relationship/location batch - Ari and Flo,
   the meadow's two Bug Catchers, the first batch drawn from the `rookie`
   archetype family. Both carved out of the shared 'Bug Catcher' cls into
   their own dedicated archetypes ('stockpile' / 'hush'), same Tier 2 shape
   as every prior batch (sci-oak-phase5.js, oz-phase5.js/sal-phase5.js,
   barista-phase5.js/dax-phase5.js, ace1-phase5.js/ace2-phase5.js,
   burl-phase5.js/crag-phase5.js, null-phase5.js/leak-phase5.js/
   geo-phase5.js, libr-phase5.js/ink-phase5.js): a 150-line target each,
   Tier 2-scaled category minimums, and two active heart events each. Ari
   is a loud collector who has never once battled with any of his six
   catches, quietly afraid that using one and losing would prove the whole
   collection was avoidance; Flo is a quiet watcher who has never once
   caught anything herself, afraid that catching would make her one more
   person disturbing the place she has spent years protecting. Each is
   moved to finally act by the other's small example, the same "opposite
   philosophies, mirrored growth" device this project used for Corin/Delia
   and Burl/Crag. Cross-referenced by ordinary narrative mention only, not
   the relationshipIds gate - Tier 2 has no bible, so that gate cannot fire
   for it (see the Phase 5 handoff's "Known risks"). This suite also
   confirms the carve-out did not leak onto the remaining plain-rookie
   townsfolk (Pim, Wisp, Holt, Wynn, Tilda, Bram/mo2). Neither Ari nor Flo
   has a personal badge gate, so both use the standard Tier 2 badge floor
   (2/5). */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'ari-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'I have got six of these and I am going to use all of them eventually!',
      'Ari! Bug Catcher, meadow regular, proud owner of exactly six very good reasons to keep collecting instead of battling.',
      'Ask Flo about staying quiet. Ask me about staying exactly the same number of catches for entirely too long.',
      'Six so far. Every single one has a name, a story, and absolutely no battle experience whatsoever.',
      'Welcome to the meadow! Watch where you step, and ask me about my team if you want the long version of a short answer.',
      'Flo protects the quiet ones. I collect the loud ones. Between us the meadow is thoroughly covered.',
      'Three visits and you will know my whole roster by name. Whether you will ever see any of them battle is a separate question entirely.',
      'There is exactly one of my six I have never once sent out in a real fight. Ask me about it sometime. I will tell you, eventually.',
      'Go on, then. If you catch something good out here, come tell me about it. I am an excellent audience for other people\'s follow-through.',
      'I have been adding to this team longer than most people keep anything at all. Using it is, apparently, a separate hobby I have not started yet.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You asked which one I would actually use first, not just how many I have. Different question. Better one.',
      'You remembered all six names after one telling. Small thing. Deeply flattering, honestly.',
      'I have started saving the good meadow stories for you specifically. Small thing, from someone who mostly just talks at people.',
      'You said thank you properly instead of just nodding through the whole roster tour. Rare, that.',
      'Flo mentioned you asked about her too. I will pretend that does not amuse me. It does.',
      'You did not laugh at how long the introductions take. Most people do, at least a little.',
      'Come by again. There will be a seventh catch, or the same six, described in even more detail.',
      'I remember your name without needing the reminder twice. Unusually good going, for me and how much I usually talk over people.',
      'You have not yet asked why I have never actually used any of them. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking what each one is actually good at, not just how many I have. Good instinct, around me specifically.',
      'I caught you noticing I always change the subject before naming a favorite. Fair. I would notice that too.',
      'Flo asked, in her way, who the visitor who actually asks good questions was. I told her your name properly, for once.',
      'You have not once suggested I just pick one already. I notice the restraint, and I appreciate it more than I say.',
      'I have started explaining more than the usual one sentence about a catch, for you specifically.',
      'You come back to this same patch of grass now. I have noticed. I have decided to enjoy it.',
      'You ask what actually happens to a catch once it joins the six, not just how many there are. Correct order.',
      'I trust your read on which one I am actually avoiding nearly as much as my own, at this point.',
      'You ask what I actually do with all of this, beyond talking about it. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the line at the back. Most people just get the joke about how many I have.',
      'You asked why I never simply pick one to battle with, and I actually answered instead of deflecting for once.',
      'Flo lets you stand near my patch without commentary now. That almost never happens for anyone I bring along.',
      'I have stopped performing "endlessly cheerful Ari" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of roster introductions without once suggesting I hurry it along.',
      'I trust your judgment on which one is actually ready nearly as much as my own gut.',
      'There is a spot in the grass that is basically yours now, if you ever want to just sit there a while.',
      'Flo would call this "unusually generous access to my actual thoughts," and for once she would not be wrong.',
      'You ask what is actually going on with me before you ask how the collecting is going. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the one I set apart, properly, for once, and you did not make it bigger than it was.',
      'You said collecting without ever using any of it is still a kind of waiting, and I have not entirely stopped thinking about that since.',
      'The meadow has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing what it would feel like to send one out for real.',
      'You do not flinch when I admit the collecting is not really about the numbers. Most people just say "just pick one, then," which helps less than they think.',
      'Flo wants your opinion on something now too, apparently. That is not nothing, coming through her.',
      'I told you the plain version of why I have never used any of them. It is a smaller reason than the number makes it look.',
      'You are welcome to question any excuse I give about the roster. I would rather be caught out than believed by mistake.',
      'There is a list in my head now of reasons I told myself for waiting that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which enthusiasm is real and which one is just nerves dressed up loudly. I have stopped hiding the difference from you.',
      'I let you see how nervous I actually am about using one of these for real. Most people never get shown that at all.',
      'You bring up the one I set apart before I can change the subject again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually ready or just stalling nearly as much as Flo\'s, and I do not say that lightly.',
      'The roster has stopped feeling like the whole point of me being out here. I choose to believe that means something.',
      'I have stopped performing confidence I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said out loud what I am actually afraid of, instead of just calling it "not yet." Consider this the thanks I am bad at giving directly.',
      'We should introduce you to all six properly sometime, one at a time, no rush. Not to show off. Just because they deserve it.',
      'Flo calls you "the visitor who actually gets him to finish a sentence." Coming from her, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that sending one out would prove the whole collection was just avoidance, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how long I actually knew which one I trusted most, not the tidy version I give most people.',
      'I do not need you to confirm sending it out is right anymore before I trust that myself. That took a while to build.',
      'You know the two things that actually make me admit I am stalling out of fear, without me listing them again.',
      'I told you about the morning I almost sent one out and did not. The uncomfortable parts included.',
      'We disagree about whether collecting this long was ever really about being ready at all. I have started thinking you might have a point either way.',
      'I trust you with an unused catch now, which is further than I extend most people who only hear the finished stories.',
      'You are one of maybe two people who have seen me genuinely uncertain about something out here.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The roster has one fewer untested catch on it now, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is easiest. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-cheerful bit for you at all anymore. You have seen me actually scared, plainly, and never once made it smaller than it was.',
      'There is no version of a hard decision out here that I do not want to tell you about, plain or otherwise.',
      'I still collect more than most Bug Catchers bother to. I have simply stopped mistaking that for the only kind of readiness there is.',
      'You are allowed to call out when I am stalling out of fear now, not just afterward. I have extended that to exactly one other person, and she does it in one sentence flat.',
      'Ask me the plain version of anything I am avoiding using. I would rather you heard it true than heard it comfortable.',
      'Same patch of grass tomorrow, probably a slightly braver version of me after that, and somehow you make either version feel worth visiting for.',
      'Years of treating the collecting like the whole answer, and you are the reason I finally understand it was always partly about trusting one of them enough to try.'
    ]),
    pool('post-the-one-he-has-not-used', 'postEvent', { completedEventIds: ['ari-folk-stockpile-event-the-one-he-has-not-used'], recentEventIds: ['ari-folk-stockpile-event-the-one-he-has-not-used'] }, 90, [
      'I moved the same one to the front and back of the line twice today, out of old habit, before remembering it already had its turn.',
      'You still ask which one is next before you ask how many I have. Fair, given what actually mattered that week.',
      'I have not gone back to calling it "the one I am saving" since. Small habit. Sticking, so far.',
      'Flo asked if I had actually meant it about picking one already. I told her yes, which is apparently rare enough that she checked twice.',
      'I caught myself about to add a seventh instead of testing one of the six last week. I tested one instead, on purpose.',
      'The roster has not gotten any smaller overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer trainer asked why I never just use any of my catches. I gave them the honest answer this time, not just the tidy one.',
      'I have not needed a whole speech to explain the line at the back since. Turns out naming it plainly works better.',
      'The joke about how many I have still gets a laugh. It just is not the only thing people say about it anymore.'
    ], { acknowledgesEventId: 'ari-folk-stockpile-event-the-one-he-has-not-used' }),
    pool('post-sending-the-first-one-out', 'postEvent', { completedEventIds: ['ari-folk-stockpile-event-sending-the-first-one-out'], recentEventIds: ['ari-folk-stockpile-event-sending-the-first-one-out'] }, 91, [
      'The first real battle happened properly, by the way, in case Flo has not already told everyone in the meadow.',
      'You still ask how it felt before you ask who won. Fair, given what actually mattered that day.',
      'I ask myself which one is next now, sometimes, without waiting to be asked. Most days. I am working on the rest.',
      'I do not need every catch to sit untested for years anymore. Turns out I get to actually find out about some of them.',
      'You watched me send the first one out, the first time. I have not forgotten who was there for that.',
      'Flo still credits one sentence of hers for the whole thing. I am, reluctantly, letting her have this one.',
      'A newer trainer asked if I ever actually battle with my catches now. I got to say sometimes, properly, for once.',
      'The roster is still six. It has one very real result attached to it now, though, and I am glad of it.',
      'I have started telling the story behind a catch before just adding it to the line. Turns out that lands better.'
    ], { acknowledgesEventId: 'ari-folk-stockpile-event-sending-the-first-one-out' }),
    pool('location-meadow', 'location', { location: 'meadow' }, 60, [
      'This patch is mine, mostly by habit, and because somebody has to actually try catching things out here.',
      'Flo watches the quiet grass near the tree line, same as always, before anything gets added to my count.',
      'Pim wears the same shorts every day and calls that his whole personality. I respect the commitment, honestly.',
      'Wisp always has enough lunch for two, out here, on principle. I have been the two more than once.',
      'Holt has been out past the tree line for three nights running, naming things. I do not ask which things.',
      'Wynn watches the sky the same way I watch the grass. Different targets, same patience, mostly.',
      'This whole meadow runs on the same handful of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how many I have caught and you will get a slightly different, slightly generous number every time.',
      'There is exactly one catch of mine that has never once been sent out. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the meadow rarely, and usually only to actually show someone the roster in person.',
      'Half of town assumes I am always out here catching something new. Mostly correct, admittedly.',
      'The meadow does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect a Bug Catcher to be all action. I specialize in the opposite, historically, on principle rather than necessity.',
      'If I am not at my patch, ask Flo. She will know, generally, before I do.',
      'The general store keeps a small box for me now, for anything found in town that might round out the roster. New arrangement. I am still getting used to it.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day in the grass. Nothing was actually wrong and I still recounted the whole roster twice anyway.',
      'I almost talked myself out of testing one again today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Flo asked about the untested one again today and I deflected harder than usual. That is more about me than her.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer trainer asked why I never just use any of my catches, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I actually sent one out and the result finally happened instead of just getting postponed.',
      'Flo actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The plain version was enough, and it was good.',
      'I picked which one goes next today without even flinching about it. Progress, apparently.',
      'A trainer came back after a good battle and thanked me for the tip I gave without expecting anything for it. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a quiet bar most days.',
      'Flo said finding the courage cost me less than years of stalling ever did. Coming from her, that is a full parade.'
    ]),
    pool('item-circuittoken', 'itemPokemon', { itemIds: ['circuitToken'] }, 72, [
      'A stamped copper trace, the same kind I hand out for a good win. Odd, receiving one instead of giving it.',
      'Flo will ask if this one is going straight to the back of some line somewhere. The honest answer is probably yes, out of pure habit.',
      'I collect a few of these too, separately from the roster, so at least one collection of mine gets used properly and often.',
      'This might be the one keepsake I actually deploy right away instead of setting apart to worry about.',
      'Fair warning: I will absolutely tell people this came from someone who beat me fair and square.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since half my collecting energy already goes toward things I never use. This one I mean to actually carry.',
      'This is going somewhere I will actually notice it daily, not filed away at the back of anything. Small change, on purpose.'
    ]),
    pool('pokemon-wurmple-meadow', 'itemPokemon', { pokemonSeen: [265] }, 70, [
      'One of these has lived in this exact patch longer than I have been coming out here to bother it.',
      'Flo insists it recognizes her specifically. I have watched it. She may not be wrong.',
      'It startles at absolutely everything, which somehow has never once made it easier to actually catch.',
      'It showed up the same season I started the roster. I have decided that means something, sentimentally.',
      'Flo says it feels calmer near her than near me. I choose not to take that personally, mostly.',
      'It is, against all expectation, good company for a long afternoon of not deciding anything. Steady, in its own small way.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same patch, same question on your face. No, nothing new has been added since this morning.',
      'You know the routine by now. Same roster tour, same story about the untested one, same offer to show you all six.',
      'Come on in. Mind the tall grass near the tree line; Flo has been meaning to flag something there for weeks.',
      'Grass talk, a story about a catch, or just standing here while I decide absolutely nothing for a while. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this patch. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Flo if you want the quiet way in; ask me if you want to know what is new in the roster.',
      'Come on down. Flo is at the tree line, being considerably more talkative than usual lately.',
      'The stories get a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this patch now. I do not extend those to just anyone who walks through.',
      'Same patch, same six catches, same general refusal to leave anything untested for long. I would not trade it for a tidier conscience.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'meadow', completedEventIds: ['ari-folk-stockpile-event-sending-the-first-one-out'], minStage: 'trusted' }, 108, [
      'Flo sent a newer trainer my way on purpose, for the roster specifically. That is new, coming from her.',
      'I have sent out two of the six now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The untested one, the line it used to sit at the back of, and a trainer who finally found out what six catches with no results actually costs: apparently this is what readiness looks like, close up.',
      'Sit a while, if Bug Catchers sit. The grass can wait, the oldest hesitation already broken once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.ari = D;
})();
