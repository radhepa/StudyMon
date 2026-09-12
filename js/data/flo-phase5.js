/* Phase 5 Slice 9: sixth Tier 2 relationship/location batch - Flo, the
   meadow's quiet Bug Catcher (see ari-phase5.js's header comment for the
   full shared design and the mirrored-growth device this batch is built
   around). Flo is Tier 2, so she gets no CAST_BIBLES entry - her voice and
   arc live entirely in this file and in her dedicated
   FOLK_EVENTS['hush'] arc (see folk-events.js). She was carved out of the
   shared 'Bug Catcher' cls alongside Ari, so this content does not leak
   onto the Calculus region's 'c-adia', the only other 'Bug Catcher' in the
   game. Flo's own arc turns on years spent protecting the meadow's quiet
   by watching everything and catching nothing herself - see her Event 1
   and 2, and Ari's own file for the mirrored angle. Cross-referenced by
   ordinary narrative mention only, not the relationshipIds gate; see
   oz-phase5.js's header comment and the Phase 5 handoff's "Known risks"
   for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'flo-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Shh. There is a really good one in the grass and you are scaring it.',
      'Flo. Bug Catcher, meadow regular, unofficial keeper of every quiet patch out here.',
      'Ask Ari about collecting six of everything. Ask me about protecting the one you have not scared off yet.',
      'Careful where you step. Half of what lives in this grass has never once been disturbed, and I would like to keep it that way.',
      'Welcome to the meadow. Move slowly, speak softly, and I will tell you where not to look, which is usually more useful than where to.',
      'Ari collects loudly. I watch quietly. Between us the meadow is thoroughly covered.',
      'Three visits and you will know my whole patch by sight. Whether you will ever see me actually catch anything is a separate question entirely.',
      'There is exactly one thing out here I have wanted to catch for longer than I am comfortable admitting. Ask me about it sometime. I will tell you, eventually.',
      'Go on, then. If you scare something off by accident, do not worry too much. It happens to everyone, eventually, including me.',
      'I have been watching this grass longer than most people watch anything at all. Catching from it is, apparently, a separate hobby I have not started yet.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You asked why I hush people before you ask what I am hushing them for. Different question. Better one.',
      'You move slowly through the grass now without being told. Small thing. Correctly careful, in my estimation.',
      'I have started pointing out the good rustles to you specifically. Small thing, from someone who mostly keeps this to herself.',
      'You thanked me properly instead of just walking past the hush. Rare, that.',
      'Ari mentioned you asked about him too. I will pretend that does not please me. It does.',
      'You did not laugh at how seriously I take one patch of grass. Most people do, at least a little.',
      'Come by again. There will be something newly rustling, or the same old patch, watched more carefully.',
      'I remember your name without needing to hush you for it twice. Unusually good going, for me and how little I say to most people.',
      'You have not yet asked why I never actually catch anything myself. I am choosing not to test that patience.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking what I am actually protecting, not just what I am hushing. Good instinct, around me specifically.',
      'I caught you noticing I watch more than I catch before you asked me about it. Fair. I would notice that too.',
      'Ari asked, in his way, who the visitor who actually stays quiet was. I told him your name properly, for once.',
      'You have not once suggested I just try catching something already. I notice the restraint, and I appreciate it.',
      'I have started explaining more than the usual one sentence about a patch, for you specifically.',
      'You come back to this same stretch of grass now. I have noticed. I have decided to enjoy it.',
      'You ask what actually happens to something once I have watched it a while, not just how careful I am. Correct order.',
      'I trust your eye for what is actually there nearly as much as my own, at this point.',
      'You ask what I actually do with all this watching, beyond keeping it quiet. Uncomfortably good question.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you about the one I have wanted for years. Most people just get the joke about how much I shush.',
      'You asked why I never simply try catching it myself, and I actually answered instead of deflecting for once.',
      'Ari lets you stand near my patch without commentary now. That almost never happens for anyone I bring along.',
      'I have stopped performing "endlessly patient Flo" quite so hard around you specifically.',
      'You sat through an entire slow afternoon of watching nothing happen without once suggesting I hurry it along.',
      'I trust your judgment on whether something is actually worth catching nearly as much as my own eye.',
      'There is a spot in the grass that is basically yours now, if you ever want to just sit there a while.',
      'Ari would call this "unusually generous access to my actual thoughts," and for once he would not be wrong.',
      'You ask what is actually going on with me before you ask what is new in the grass today. I have noticed, and I like it.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the fear properly, for once, and you did not make it bigger than it was.',
      'You said protecting something is still a kind of distance, and I have not entirely stopped thinking about that since.',
      'The grass has your visit attached to it now, somehow, in my own head if nowhere else.',
      'I have started actually picturing what it would feel like to finally catch one of my own.',
      'You do not flinch when I admit the watching is not really about the quiet. Most people just say "just try it, then," which helps less than they think.',
      'Ari wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I told you the plain version of why I never caught anything before now. It is a smaller reason than the years make it look.',
      'You are welcome to question any excuse I give about the watching. I would rather be caught out than trusted by mistake.',
      'There is a list in my head now of reasons I told myself for waiting that turned out not to be reasons at all.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which patience is real and which one is just fear dressed up quietly. I have stopped hiding the difference from you.',
      'I let you see how much I actually want to catch one of my own. Most people never get shown that at all.',
      'You bring up the one I have wanted for years before I can change the subject again. I have started letting you win that race.',
      'I trust your judgment on whether I am actually being careful or just avoiding it nearly as much as Ari\'s, and I do not say that lightly.',
      'The watching has stopped feeling like the whole point of me being out here. I choose to believe that means something.',
      'I have stopped performing calm I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally said out loud what I am actually afraid of, instead of just calling it "being careful." Consider this the thanks I am bad at giving directly.',
      'We should walk the whole patch together sometime, properly, quietly. Not to catch everything. Just to see it.',
      'Ari calls you "the visitor who actually gets her talking." Coming from him, that is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared that catching one would make me one more person who disturbed this place, before I had worked out whether that fear was fair. You did not rush me to an answer.',
      'You get the honest account of how long I actually wanted this, not the tidy version I give most people.',
      'I do not need you to confirm trying is right anymore before I trust that myself. That took a while to build.',
      'You know the two things that actually make me admit I am avoiding it out of fear, without me listing them again.',
      'I told you about the morning I almost tried and did not. The uncomfortable parts included.',
      'We disagree about whether watching this long was ever really protecting anyone. I have started thinking you might have a point either way.',
      'I trust you with an unfulfilled want now, which is further than I extend most people who only hear the finished ones.',
      'You are one of maybe two people who have seen me genuinely uncertain about something in this grass.',
      'I trust you with a decision before I know how it turns out. That is further than I extend most people who only hear how it ended.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The grass has one fewer thing I am only watching now, and you were there for that, which felt correct rather than incidental.',
      'You ask what I actually want before you ask what is easiest. I have started expecting that, and preferring it.',
      'I do not perform the endlessly-patient bit for you at all anymore. You have seen me actually uncertain, plainly, and never once made it smaller than it was.',
      'There is no version of a hard decision out here that I do not want to tell you about, plain or otherwise.',
      'I still watch more carefully than most Bug Catchers bother to. I have simply stopped mistaking that for the only kind of care there is.',
      'You are allowed to call out when I am avoiding something out of fear now, not just afterward. I have extended that to exactly one other person, and he does it constantly, loudly, and eventually gets there.',
      'Ask me the plain version of anything I am avoiding trying. I would rather you heard it true than heard it comfortable.',
      'Same patch tomorrow, probably a slightly braver version of me after that, and somehow you make either version feel worth visiting for.',
      'Years of treating the watching like the whole answer, and you are the reason I finally understand it was always partly about letting myself be part of it too.'
    ]),
    pool('post-shh-always', 'postEvent', { completedEventIds: ['flo-folk-hush-event-shh-always'], recentEventIds: ['flo-folk-hush-event-shh-always'] }, 90, [
      'I hushed the same patch twice today, out of old habit, before remembering I finally said the plain part out loud.',
      'You still ask what I am actually protecting before you ask how quiet it is. Fair, given what actually mattered that week.',
      'I have not gone back to calling it "just being careful" since. Small habit. Sticking, so far.',
      'Ari asked if I had actually meant it about wanting to catch one. I told him yes, which is apparently rare enough that he checked twice.',
      'I caught myself about to just watch and say nothing again last week. I said the plain thing instead, on purpose.',
      'The grass has not gotten any less quiet overall. I have decided that is fine either way, for now.',
      'You were there for the plain version of that conversation. I still think about that more than I let on.',
      'A newer trainer asked why I never just try catching something. I gave them the honest answer this time, not just the tidy one.',
      'I have not needed a whole speech to explain the watching since. Turns out naming it plainly works better.',
      'The joke about how much I hush people still gets a laugh. It just is not the only thing people say about it anymore.'
    ], { acknowledgesEventId: 'flo-folk-hush-event-shh-always' }),
    pool('post-the-first-one-she-keeps', 'postEvent', { completedEventIds: ['flo-folk-hush-event-the-first-one-she-keeps'], recentEventIds: ['flo-folk-hush-event-the-first-one-she-keeps'] }, 91, [
      'The catch happened properly, by the way, in case Ari has not already told everyone in the meadow.',
      'You still ask how it felt before you ask if the grass stayed quiet. Fair, given what actually mattered that day.',
      'I try, sometimes now. Most weeks. I am working on making it more than sometimes.',
      'I do not need every want to sit here for years anymore. Turns out I get to actually have some of it.',
      'You watched me hold the ball a long moment, the first time. I have not forgotten who was there for that.',
      'Ari still credits himself more than one sentence of his really deserves. I am, reluctantly, letting him have this one.',
      'A newer trainer asked if I ever catch anything now. I got to say sometimes, properly, for once.',
      'The grass is still quiet. It has one very real catch in it now, though, and I am glad of it.',
      'I have started telling people what I am watching before just staying silent about it. Turns out that lands better.'
    ], { acknowledgesEventId: 'flo-folk-hush-event-the-first-one-she-keeps' }),
    pool('location-meadow', 'location', { location: 'meadow' }, 60, [
      'This patch is mine, mostly by habit, and because somebody has to keep it as quiet as it deserves.',
      'Ari lines his six up near the tree line, same as always, before anything I have watched gets disturbed.',
      'Pim wears the same shorts every day and calls that his whole personality. I have decided not to argue.',
      'Wisp always has enough lunch for two, out here, on principle. I have quietly accepted the offer more than once.',
      'Holt has been out past the tree line for three nights running, naming things. I let him. It is a harmless kind of quiet.',
      'Wynn watches the sky the same way I watch the grass. Different targets, same patience, mostly.',
      'This whole meadow runs on the same handful of regulars finding their spot every single day. I am, unmistakably, one of them.',
      'Ask anyone here how much I hush people and you will get a slightly different, slightly exaggerated answer every time.',
      'There is exactly one thing out here I have wanted for longer than I am comfortable admitting. Ask me about it if you want the real story.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I leave the meadow rarely, and usually only to actually ask someone about something I noticed out there.',
      'Half of town assumes I am always out here watching something. Mostly correct, admittedly.',
      'The meadow does not miss me for an afternoon. It used to feel like it would. I have decided that is progress.',
      'People expect a Bug Catcher to always be catching. I specialize in the opposite, historically, on principle rather than necessity.',
      'If I am not at my patch, ask Ari. He will know, generally, before I do.',
      'The general store keeps a small box for me now, for anything found in town that might belong back out in the grass. New arrangement. I am still getting used to it.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad day in the grass. Nothing was actually wrong and I still hushed half the meadow anyway.',
      'I almost talked myself out of trying again today. Did not. Barely.',
      'Give me a minute before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Ari asked about the one I want again today and I deflected harder than usual. That is more about me than him.',
      'Something about today did not sit right, and I have not worked out why. Give it time.',
      'I need quiet, not encouragement, for a while today. Stay if you like. Do not fill the silence on my behalf.',
      'A newer trainer asked why I never just try catching something, bluntly, today, and I had no good answer ready. That one stung more than it should have.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good day. I actually tried, and the grass stayed exactly as quiet as I always insisted it should.',
      'Ari actually laughed today, briefly, at something I said. Rare enough to mention on its own.',
      'Nobody needed the heavy version of anything from me today. The plain version was enough, and it was good.',
      'I said the plain thing out loud today without even flinching about it. Progress, apparently.',
      'A trainer came back after a good catch and thanked me for the quiet tip I gave without expecting anything for it. Small thing. Made my whole week.',
      'A genuinely good day here, by my standard, which admittedly has a quiet bar most days.',
      'Ari said one sentence of mine cost him less courage to act on than years of stalling ever did. Coming from him, that is a full parade.'
    ]),
    pool('item-pressedflower', 'itemPokemon', { itemIds: ['pressedFlower'] }, 72, [
      'A tiny route flower, pressed carefully enough that it survived the trip. I understand this kind of carefulness better than most.',
      'Ari will ask if I am going to just look at it or actually keep it out where I will see it. Fair question, honestly.',
      'I collect a few of these, quietly, from places I have watched long enough to trust.',
      'This might be the gentlest kind of keepsake anyone has given me here, and it did not require me to disturb a single thing to receive it.',
      'Fair warning: I will absolutely tell people this came from someone who understood exactly how much I notice small things.',
      'A good keepsake and a good week pair well. Thank you, genuinely.',
      'I am difficult to buy for, apparently, since half my attention already goes toward things I never take home. This one I mean to keep, out where I will see it.',
      'This is going somewhere I will actually notice it daily, not tucked away out of sight. Small change, on purpose.'
    ]),
    pool('pokemon-wurmple-meadow', 'itemPokemon', { pokemonSeen: [265] }, 70, [
      'One of these has lived in this exact patch longer than Ari has been coming out here to try and catch it.',
      'Ari insists it likes me specifically. I have watched it. He may not be wrong.',
      'It startles at absolutely everything, which is exactly why I have never once rushed toward it.',
      'It showed up the same season I started watching this particular stretch of grass. I have decided that means something, sentimentally.',
      'Ari says it feels calmer near me than near him. I choose to take that as a compliment, mostly.',
      'It is, against all expectation, good company for a long afternoon of not deciding anything. Steady, in its own small way.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same patch, same question on your face. No, nothing new has rustled since this morning.',
      'You know the routine by now. Same hushing, same story about the one I want, same offer to just watch a while together.',
      'Come on in. Mind the tall grass near the tree line; Ari has been meaning to introduce you to his sixth catch for weeks.',
      'Grass talk, a story about a rustle, or just standing here while nothing happens for a while. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep turning up at this patch. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Ari if you want the loud version; ask me if you want to know what is actually out here.',
      'Come on down. Ari is near the tree line, being considerably more talkative than usual lately.',
      'The stories get a little longer every time you ask. I have noticed. I am choosing to allow it.',
      'You have a standing welcome at this patch now. I do not extend those to just anyone who walks through.',
      'Same patch, same quiet grass, same general refusal to rush anything that lives here. I would not trade it for a tidier conscience.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'meadow', completedEventIds: ['flo-folk-hush-event-the-first-one-she-keeps'], minStage: 'trusted' }, 108, [
      'Ari sent a newer trainer my way on purpose, for the quiet specifically. That is new, coming from him.',
      'I have tried twice now without needing a whole speech about it beforehand. I am choosing to be alarmed about that later.',
      'The want, the years of only watching it, and a trainer who came back after a good catch to say the quiet actually helped: apparently this is what letting yourself be part of a place looks like, close up.',
      'Sit a while, if Bug Catchers sit. The grass can wait, the oldest hesitation already broken once, and today, for once, so did I.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.flo = D;
})();
