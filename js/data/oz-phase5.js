/* Phase 5 Slice 3: Tier 2 batch, pier fishermen (1 of 2) - Oz (the "oz" cast
   entry). Every string is a complete contextual response; categories count
   responses rather than fragments, same convention as sci-oak-phase5.js
   (the Tier 2 template from Slice 2). Oz is Tier 2, so he gets no
   CAST_BIBLES entry - his voice and arc live entirely in this file and in
   his dedicated FOLK_EVENTS['restless-angler'] arc (see folk-events.js). He
   was carved out of the shared 'angler' archetype first (cls changed from
   'Fisherman' to 'Restless Fisherman' in townsfolk.js) alongside Sal (see
   sal-phase5.js) in the same batch, so this content does not leak onto the
   other angler-archetype townsfolk (Coral, Brine, Perl, Skiff). Oz and Sal's
   arcs are written to complete each other - see each character's Event 2 -
   entirely through ordinary narrative reference, not the relationshipIds
   gate (Tier 2 has no bible, so that gate cannot fire for it; see the Phase
   5 handoff's "Known risks" for why this is a deliberate choice, not a gap
   to fix here). */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'oz-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Two badges to get out here, and the fish still will not cooperate. Welcome to the pier.',
      'Name is Oz. Ask Sal about me and he will tell you I move around too much. He is not wrong.',
      'Been fishing this spot since dawn most days. Results vary. Mostly they do not vary; mostly it is nothing.',
      'You want the honest version of my morning or the good version? I can do either on request.',
      'Caught a boot once. A genuine boot. I have never lived it down and I bring it up myself constantly.',
      'Sal has the patience for this. I have the enthusiasm. We balance out, theoretically.',
      'Stick around long enough and I will tell you a fishing story. Several, probably, each one slightly larger than the last.',
      'Watch your footing near the edge. The boards get slick, and I speak from research.',
      'Ask Sal for advice and me for entertainment. Between us you get the full pier experience.',
      'Two badges gets you out here. Staying interested gets you the good stories, eventually.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people hear one of my stories and decide that is plenty.',
      'You asked what actually happened, not just the exciting version. Rare, that.',
      'I have started saving you the better spot when I see you coming. Small thing.',
      'You did not laugh at the boot story. Well - you laughed, but kindly. There is a difference.',
      'I remember your name, which for me is unusually good going this early in knowing someone.',
      'You listen to the whole story before asking if any of it is true. I appreciate the order.',
      'Sal noticed you talking to me and did not immediately warn you off. Small vote of confidence, from him.',
      'Come by again. I will have a new story, or the same one, larger.',
      'You have not yet told me a story is unbelievable. I am choosing not to test that patience just yet.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have started asking for the plain version up front now. I am learning to just give it to you.',
      'I caught you checking whether my rod had actually moved before I announced a bite. Fair. I would check too.',
      'You have seen me move spots three times in one visit and did not say anything. Diplomatic of you.',
      'I told you the truth about something and you seemed more interested than when I embellish it. Filing that away.',
      'Sal asked, in passing, who the trainer who actually listens to me was. I told him your name correctly, for once.',
      'You have not once told me to just sit still like Sal does. I appreciate the restraint.',
      'I have started keeping the bent hook where you can see it instead of hiding it in the tackle box.',
      'Come find me before you head off. I like having someone to report the results to, good or not.',
      'You have started asking what actually bit, not just what I claim nearly got away.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I showed you the notebook where I write the plain versions down now. Most people just get the loud version.',
      'You asked why the stories grow, and I actually answered honestly instead of making a joke of it.',
      'Sal lets you stand near his spot now without commenting. That almost never happens for anyone I bring round.',
      'I have stopped performing the whole "unlucky fisherman" bit quite so hard around you.',
      'You sat through an entire unsuccessful morning without once suggesting I try Sal\'s approach. Good instinct.',
      'I trust your read on whether a story needs the extra parts or not. That is a strange thing to trust someone with, and I do.',
      'The tackle box has a spot for your things now, if you ever want to leave a spare hook or two.',
      'Sal would call this "unusually generous access to the good spot," and for once he would be right.',
      'You ask what actually happened before you ask if it is a good story. I trust that instinct more than my own by now.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about actually catching something by waiting, for once, and you did not make it a bigger deal than it was.',
      'You said the plain version was worth more than the loud one, and I have not entirely stopped thinking about that since.',
      'The notebook has your name in it now, next to the entry about standing still. You were there for that one.',
      'I have started telling stories the plain way first and only adding the extra parts if someone actually asks for them.',
      'You do not flinch when I admit a story was mostly invented. Most people just look disappointed. You just ask what really happened.',
      'Sal wants your opinion on something now too, apparently. That is not nothing, coming through him.',
      'I revised the boot story down to what actually happened, for you specifically. It is a worse story and a better one.',
      'You are welcome to argue with any version of any story I tell. I would rather be caught out than believed by mistake.',
      'The notebook has a page dedicated to the stories that turned out true after all. It is shorter than I would like.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which spot I actually settle at when I mean it, versus which ones are just restlessness. I have stopped hiding the difference.',
      'I let you see the notebook before I decided what to do with the newest entry. Most people never get shown that at all.',
      'You bring up the plain version of a story before I can inflate it. I have started letting you win that race.',
      'I trust your judgment on whether I actually waited long enough nearly as much as Sal\'s, and I do not say that lightly.',
      'The moving-spots thing has slowed down around you. I choose to believe that means something.',
      'I have stopped performing confidence I do not have, around you specifically. It is a relief, oddly.',
      'You are the reason I finally wrote the true version down instead of just retelling it looser each time. Consider this the thanks I am bad at giving directly.',
      'We should fish the same spot again sometime. Not for a story. Just to see what happens when nobody is trying to make one.',
      'Sal calls you "the trainer who slows him down properly." Coming from Sal, slowing him down is the whole compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I was scared the whole "unlucky fisherman" bit was actually just true, before I managed to test it. You did not rush me to test it.',
      'You get the honest count of how many mornings actually produce nothing, not the version where it is always almost something.',
      'I do not need you to confirm a story anymore before I believe it myself. That took a while to build.',
      'You know the two things that actually make me admit a story was invented, without me spelling them out again.',
      'I told you about the morning that genuinely scared me a little, the uncomfortable parts included.',
      'We disagree about whether the boot story is funny or sad. I have started thinking you might have a point.',
      'I trust you with an unfinished story now, which is further than I extend most people who have heard the finished ones.',
      'You are one of maybe two people who have seen me actually uncertain whether something was worth telling at all.',
      'I trust you with a story before I know how it ends. That is further than I extend most people who only hear the finished ones.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The notebook has entries with both our names near each other now, and I did not need to inflate a single one of them.',
      'You ask what actually happened before you ask how good the story is. I have started expecting that, and I have started preferring it.',
      'I do not perform the unlucky-fisherman bit for you at all anymore. You have seen me actually catch things, plainly, and never once made it smaller than it was.',
      'There is no version of a good morning out here that I do not want to tell you about, plain or otherwise.',
      'I still tell the big versions of the old stories. They have simply stopped being the only versions I have.',
      'You are allowed to call out an exaggeration mid-sentence now, not just afterward. I have extended that to exactly one other person, and he does it constantly.',
      'Ask me the plain version of anything. I would rather you heard it true than heard it impressive.',
      'Same spot tomorrow, probably a different spot after that, and somehow you make either one feel worth turning up for.',
      'Years of embellishing everything, and you are the reason I finally understand why the plain version mattered all along.'
    ]),
    pool('post-one-that-possibly-existed', 'postEvent', { completedEventIds: ['oz-folk-restless-angler-event-the-one-that-possibly-existed'], recentEventIds: ['oz-folk-restless-angler-event-the-one-that-possibly-existed'] }, 90, [
      'The notebook still has the plain version written down. I have not let it grow since.',
      'I still keep the bent hook where I can see it. It is still the most honest thing in the tackle box.',
      'You still ask what actually happened before you ask how good the story is. I have started expecting that question first, from anyone.',
      'I have stopped telling the big version of that particular story. The plain one earned its place.',
      'Sal read the notebook entry and did not say much. From him, reading it at all is the compliment.',
      'I caught myself starting to inflate a different story last week. I stopped and told it plain instead.',
      'The tackle box still has the same bent hook in it. I have decided that is fine. It does not need replacing with something bigger.',
      'You were there when I wrote the plain version down. I still think about that more than I let on.',
      'A new trainer asked to see the bent hook. I let her, which surprised me more than it surprised her.',
      'I have not needed to invent a bigger version of anything since. Turns out the plain ones hold up fine on their own.'
    ], { acknowledgesEventId: 'oz-folk-restless-angler-event-the-one-that-possibly-existed' }),
    pool('post-standing-still', 'postEvent', { completedEventIds: ['oz-folk-restless-angler-event-standing-still-for-once'], recentEventIds: ['oz-folk-restless-angler-event-standing-still-for-once'] }, 91, [
      'I stayed in one spot again yesterday. Did not catch anything that time. I stayed anyway.',
      'You still ask whether I moved spots today before you ask what I caught. Fair question, historically.',
      'Sal has not said a word about it, which from him is practically applause.',
      'I told the plain version of that day to someone new. No bigger fish, no longer fight. Just what happened.',
      'You watched me actually wait, properly, for the first time. I have not forgotten who was there for that.',
      'I still move around plenty. I have just started noticing when I am doing it out of habit instead of hope.',
      'The notebook entry from that day does not have a single extra sentence in it. I am oddly proud of that.',
      'I do not need to catch something every time to call the morning worth it anymore. Most days. I am working on the rest.',
      'Sal asked how the waiting felt, days later, out of nowhere. I actually had a real answer ready for him.'
    ], { acknowledgesEventId: 'oz-folk-restless-angler-event-standing-still-for-once' }),
    pool('location-pier', 'location', { location: 'pier' }, 60, [
      'This end of the boards is mine, mostly by habit rather than any actual claim.',
      'Sal has the far spot. Has had it for longer than I have been coming out here.',
      'The boards creak in a specific order if you walk them at low tide. I have never told anyone why I know that.',
      'Skiff runs the crossing from just past that post. Quiet fellow. Good company if you are patient enough for the silences.',
      'Weather turns fast out here. I have learned that the expensive way, several times.',
      'The water looks the same every day and is apparently never actually the same twice. Sal told me that. I believe him.',
      'This whole pier runs on people pretending the previous day\'s luck does not matter today. It mostly works.',
      'Ask anyone out here and they will point you to Sal for the real advice. They would not be wrong to.',
      'The far end catches better light in the evening. I have never once managed to be patient enough to notice from there for long.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I come into town mostly for bait and to tell the story to people who have not already heard it.',
      'Half of town has heard some version of the boot story. I am not sorry about that.',
      'The pier does not miss me for an afternoon. It rarely misses anyone.',
      'People expect a fisherman to be quiet and weathered. I am neither, and I have made my peace with disappointing that expectation.',
      'If I am not at the pier, I am probably telling someone in town a story about the pier instead.',
      'The bait shop in town knows my order by heart, which says more about my consistency than my luck.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'Bad morning. Nothing bit, nothing moved, and I moved spots four times for no reward at all.',
      'I told a story too big today and someone actually checked the facts on me. Fair, honestly. Still stings.',
      'Give me a minute before you ask how it is going. The honest answer is not a fun one right now.',
      'Sal told me to sit still today and I could not manage it, and I am more annoyed at myself than at him.',
      'Something did not add up with today\'s count, and it will sort itself out, and I remain irritated regardless.',
      'I need to just sit with it for a bit rather than talk it through. Stay if you like.',
      'Someone questioned the boot story today, in detail, and I had no good answer ready. That one might actually be true. I am unsettled by that.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good morning today. Caught something real and did not need to add a single extra sentence to the story.',
      'Sal actually laughed at something I said today. Rare enough to mention on its own.',
      'Nobody needed the loud version of anything today. The plain version was enough, and it was good.',
      'I stayed in one spot longer than usual and did not even mind it. Progress, possibly.',
      'The notebook got a new page today, and none of it needed inventing.',
      'A genuinely good day out here, by my standard, which admittedly has a lower bar than most people\'s.',
      'Sal actually asked me a follow-up question today instead of just nodding. I am choosing to be pleased about that.'
    ]),
    pool('item-hotsauce', 'itemPokemon', { itemIds: ['hotSauce'] }, 72, [
      'Cold mornings out here need exactly this. Thank you, genuinely.',
      'Sal will pretend not to want any and then finish half of it by lunch. Watch.',
      'I will ration this properly rather than use it all in one sitting, which is exactly what I did with the last one.',
      'This might be the first thing anyone has given me out here that I have not exaggerated the value of afterward.',
      'Fair warning: I will absolutely tell people this is spicier than it actually is.',
      'Cold mornings and bad luck pair badly. This helps with exactly one of the two, which is still an improvement.',
      'A hot morning on a cold pier is a genuinely good trade. I will take it.',
      'I am difficult to buy for, apparently, since I claim to want everything loudly and mean almost none of it. This one I mean.'
    ]),
    pool('pokemon-magikarp-pier', 'itemPokemon', { pokemonSeen: [129] }, 70, [
      'That is roughly what I am always fishing for and roughly never what I get. Story of the pier.',
      'Sal says they are underrated. I say that is exactly what someone says about the thing they keep catching instead of what they wanted.',
      'I have caught more of these than anything else out here, and somehow every story still leaves them out.',
      'It flops around dramatically enough that half my stories about "the fight" are technically about one of these.',
      'Skiff says the ferry crossing is full of them this time of year. Explains a great deal about my week.',
      'One of these outsmarted me for a solid ten minutes once. I have never told that story properly, since nobody would believe the fish won.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same spot, same question on your face. No, nothing new since this morning.',
      'You know the story already. I will tell you anyway, plain version, promise.',
      'Come sit. The boards are slick near the edge, same as always; mind your footing.',
      'Fishing talk, a story, or just sitting while I fail to catch anything. All three remain on offer.',
      'Nothing dramatic happened since we last spoke. I wrote the small things down anyway, because you would ask.',
      'You keep turning up at this end of the pier. I have stopped being surprised and started simply expecting it.',
      'Same question, same honest answer: ask Sal if you want the real advice; ask me if you want the story.',
      'Come on down. Mind the loose board by the third post; I have been meaning to mention that for weeks.',
      'The story gets bigger or smaller depending on my mood. Ask twice and you might get two different fish.',
      'You have a standing invitation to this spot now. I do not extend those to just anyone out here.',
      'Same boots, same cold, same general lack of dignity out here. I would not trade it for a drier hobby.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'pier', completedEventIds: ['oz-folk-restless-angler-event-standing-still-for-once'], minStage: 'trusted' }, 108, [
      'Sal handed me a spare coil of line today, out of nowhere, and told me to keep it for when something of mine snaps.',
      'I have not moved from this spot in over an hour. I am choosing to be alarmed about that later.',
      'The notebook, Sal\'s old story, and a coil of line I did not ask for: apparently this is what patience actually looks like, close up.',
      'Sit a while. The fish are not biting, the story can wait to be told, and today, for once, so can I.',
      'I still tell the boot story exactly as big as ever. Some things are allowed to stay exactly as ridiculous as they were.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.oz = D;
})();
