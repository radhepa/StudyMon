/* Phase 5 Slice 3: Tier 2 batch, pier fishermen (2 of 2) - Sal (the "sal"
   cast entry). Every string is a complete contextual response; categories
   count responses rather than fragments, same convention as
   sci-oak-phase5.js. Sal is Tier 2, so he gets no CAST_BIBLES entry - his
   voice and arc live entirely in this file and in his dedicated
   FOLK_EVENTS['patient-angler'] arc (see folk-events.js). He was carved out
   of the shared 'angler' archetype alongside Oz (see oz-phase5.js) in the
   same batch, so this content does not leak onto the other angler-archetype
   townsfolk. Sal and Oz's arcs complete each other by ordinary narrative
   reference only - see each character's Event 2 - not the relationshipIds
   gate; see oz-phase5.js's header comment and the Phase 5 handoff's "Known
   risks" for why. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'sal-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Two badges to reach this pier. You have them, so sit if you like. Or stand. The fish do not mind either way.',
      'Sal. I have fished this exact spot longer than most of the boards have been replaced under me.',
      'Oz talks. I do not, much. Between the two of us the pier gets fully covered either way.',
      'The trick is the wait. I will say that once and mean it, rather than repeat it constantly like Oz claims I do.',
      'Ask me something if you have a real question. I answer plainly, and slowly, in that order.',
      'Most people find the silence uncomfortable at first. It passes, if you let it.',
      'I have been out here since before most of the current regulars were trainers themselves.',
      'Sit if you want the company. I will not perform conversation for you, but I will not ignore you either.',
      'Two badges to get here. Patience to stay. The second one takes considerably longer to earn.',
      'Oz will tell you a story about me eventually. Assume it is at least half true.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You came back. Most people try the silence once and decide it is not for them.',
      'You did not ask if anything had bitten yet. Good. The answer is usually no, and the question rarely helps.',
      'I have started setting aside a spot for you without deciding to, particularly.',
      'You waited a while before speaking. I noticed, and I appreciated it.',
      'I remember you from yesterday, which for me at this stage of knowing someone is a genuine data point.',
      'You did not fill the silence with noise. Rare, that, in someone your age.',
      'Oz mentioned you were decent company. From him that is either a high compliment or means nothing at all.',
      'Come back if you like. I am not difficult to find.',
      'You have not once asked if anything is biting today. I am beginning to trust you.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You have stopped checking whether my line moved every few seconds. Good. Watching too closely spoils it.',
      'I let you sit at the actual spot today, not just nearby. Small thing. Meant deliberately.',
      'You asked what the wait is actually for, rather than assuming you already knew. Correct order.',
      'Oz asked, in his way, who the trainer who could sit quietly was. I told him your name properly.',
      'You have not once suggested I try Oz\'s approach instead. I appreciate the restraint.',
      'I have started explaining things at slightly more than one word at a time, for you specifically.',
      'You return a borrowed hook in the same condition you found it. Uncommon, in my experience.',
      'I keep your visits in the same mental ledger as the ones worth remembering.',
      'You wait the correct length of time before asking a question. Longer than most, shorter than forever.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I showed you the old line I keep. Most people get told it is "just an old line." You got the actual story.',
      'You asked why I never use it, and I gave you the real reason rather than the short one.',
      'The spot beside mine is, at this point, simply your spot. I have stopped pretending otherwise.',
      'I trust your judgment on when a silence has gone on long enough nearly as much as my own.',
      'You sat through an entire unproductive morning without once suggesting we do something else.',
      'I have started keeping a second stool down here. It is, unmistakably, for you.',
      'You ask good questions about a subject most people find boring within a minute. I find that a rarer skill than fishing.',
      'Oz would call this "unusually talkative, for you." He would not be wrong.',
      'You have earned the actual explanation of the wait now, not the short version I give people passing through.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the line I lost eleven years ago. You did not once try to make me feel better about it, which was correct.',
      'You said the wait sounded like something learned the hard way, and you were right, and I did not particularly enjoy the question. I answered it anyway.',
      'The spare coil of line has your visits attached to it now, somehow, in my own head if nowhere else.',
      'I revised how I explain the wait to Oz because of a question you asked me first.',
      'You do not flinch when I go quiet mid-sentence. Most people fill the gap. You let it sit.',
      'I have started reading you the parts of the story I usually keep to myself.',
      'You are welcome to disagree with me about the fish, the weather, or the wait itself. I would rather be corrected properly than agreed with out of politeness.',
      'Oz wants your opinion on something now too, apparently. That is not nothing, coming secondhand through him.',
      'You caught a genuine mistake in something I told you, gently, and I revised it rather than defending it. That took less effort than I expected.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'You know which silences are comfortable and which ones mean something is actually wrong. I have stopped explaining the difference.',
      'I let you see the old coil of line before I decided what to do with it. Most people never get shown that drawer at all.',
      'You bring me a real question now instead of small talk, and I answer it properly every time.',
      'I trust your patience nearly as much as my own at this point, and I do not extend that comparison lightly.',
      'The far spot has stopped feeling like mine alone. I choose to think that is a good thing.',
      'I have stopped performing calm around you specifically. It is, unexpectedly, easier than performing it.',
      'You are the reason I finally started teaching Oz properly rather than just being a fixture he watches from a distance. Consider this the thanks I am not naturally inclined to give out loud.',
      'We should sit out here again sometime. Not to teach anyone anything. Just to sit.',
      'Oz calls you "the one who actually sits still." From him, meant entirely as a compliment.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you I worried I had simply become a man who waits, before I had worked out whether that worry was fair. You did not rush me to an answer.',
      'You get the honest version of how the losing actually felt, not the tidy version I give most people.',
      'I do not need you to confirm the wait is worth it anymore. Once was enough, from you.',
      'You know the two things that actually make me talk at length, without me listing them again.',
      'I told you about the morning I genuinely doubted myself out here. The uncomfortable parts included.',
      'We disagree about whether Oz\'s stories are harmless or worth correcting. I have started thinking you might be right that it depends on the day.',
      'I trust you with an unfinished thought now, which is further than I extend most people who have heard my finished ones.',
      'You are one of perhaps two people who have seen me genuinely uncertain about something.',
      'I trust you with an unfinished silence now, which is further than I extend most people who only know the comfortable ones.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The spare coil of line went to Oz in the end, and you were there for it, which felt correct rather than incidental.',
      'You ask what I actually think before you ask what the wisest thing to say would be. I am still adjusting to being asked that.',
      'I do not perform patience for you anymore. You have seen me restless once or twice, and you never once treated it as a contradiction.',
      'There is no version of a good morning out here that does not include you being somewhere nearby.',
      'I still keep the memory of the lost catch. It has simply stopped being the only thing I keep out here.',
      'You are permitted to interrupt my silences now, not just sit inside them. I have extended that to exactly one other person before you, and he does it constantly.',
      'Ask me the difficult question about the losing. I would rather you did than that you waited for a gentler morning.',
      'Same spot tomorrow, same wait, and somehow it is never actually the same morning twice.',
      'Eleven years of carrying that one loss quietly, and you are the reason I finally understand what carrying it was actually for.'
    ]),
    pool('post-what-the-pier-remembers', 'postEvent', { completedEventIds: ['sal-folk-patient-angler-event-what-the-pier-remembers'], recentEventIds: ['sal-folk-patient-angler-event-what-the-pier-remembers'] }, 90, [
      'The old coil of line is still beside the tackle box. I still have not used it for anything ordinary.',
      'I still think about the thing I never saw, occasionally. Less than I used to. That feels like the honest measure of progress.',
      'You still ask what the wait actually taught me, rather than assuming it was only ever about fish.',
      'I told Oz part of the story since then. Not all of it yet. That will come when it comes.',
      'The spare line I started coiling that day is finished now. It has somewhere to go.',
      'You were there when I said the part about worrying I had simply become a man who waits. I have not forgotten that.',
      'I do not turn the old coil over in my hands quite so often anymore. It sits there, remembered, not worried at.',
      'A visiting trainer asked about the old line once. I gave her the short version. You got the real one first.',
      'I still do not know what it was. I have stopped needing to know, most days.',
      'The coil sits exactly where it always has. I have simply stopped needing to check on it constantly.'
    ], { acknowledgesEventId: 'sal-folk-patient-angler-event-what-the-pier-remembers' }),
    pool('post-teaching-the-wait', 'postEvent', { completedEventIds: ['sal-folk-patient-angler-event-teaching-the-wait'], recentEventIds: ['sal-folk-patient-angler-event-teaching-the-wait'] }, 91, [
      'Oz sits at the spot beside mine most mornings now. Neither of us has made a particular point of it.',
      'You still ask how the teaching is going before you ask how the fishing is. Fair, given what actually mattered that day.',
      'I told him the old story once. I have not needed to tell it again since; he remembers it properly.',
      'The silence between us has gotten longer and considerably more comfortable. That was rather the entire point.',
      'You watched me hand him the spare line. I have not forgotten who was standing there for that.',
      'He still moves around more than I do. Considerably less than he used to, though.',
      'A younger trainer asked me to teach her the wait too, the way I taught Oz. I am considering it, mostly because of how the first attempt went.',
      'I do not worry, quite so often, about being only a man who waits. Teaching someone else the wait turned out to answer that question better than sitting with it alone ever did.',
      'Oz still tells the story of that morning plainly, no extra parts. I notice, every time.'
    ], { acknowledgesEventId: 'sal-folk-patient-angler-event-teaching-the-wait' }),
    pool('location-pier', 'location', { location: 'pier' }, 60, [
      'This spot has been mine for longer than most of the current boards have existed under it.',
      'Oz has the near end. Always has, for as long as I have known him, which is a considerable while now.',
      'The water changes constantly and looks the same every day. I have stopped finding that strange.',
      'Skiff runs the crossing just past that post. Good company, when either of us feels like talking, which is rarely at the same time.',
      'The weather turns fast out here. I have learned to read it before it costs me anything.',
      'Most people rush the walk out to the end of the boards. I have never understood the hurry.',
      'This whole pier runs on patience, whether or not the people on it realize that is what they are practicing.',
      'Ask anyone out here for the story version and they will point you to Oz. That is as it should be.',
      'The near end of the boards belongs to him. I have never once fished there, out of respect more than preference.'
    ]),
    pool('location-town', 'location', { location: 'town' }, 55, [
      'I come into town rarely, and only for what the pier genuinely cannot supply.',
      'Half of town assumes I am always at the pier. They are usually correct.',
      'People expect a quiet fisherman to have nothing to say. I have plenty to say. I simply say very little of it.',
      'The walk into town feels longer than it is, mostly because I would rather be sitting still.',
      'If you need me and I am not at the pier, wait. I will be back at the pier.',
      'The general store keeps my line in stock without my needing to ask. Small consistency I have come to rely on.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'The old memory surfaced again today, uninvited. I would rather not discuss the specifics yet.',
      'Something about today\'s wait did not sit right, and I have not worked out why. Give it time.',
      'Give me a moment before you ask how it is going. The honest answer needs more thought than I currently have for it.',
      'Oz moved spots four times today and it bothered me more than it usually does. That is more about me than him.',
      'I need quiet, not conversation, for a while. Stay if you like. Do not fill the silence on my behalf.',
      'A visiting trainer questioned the wait today, dismissively. I am still, mildly, annoyed about it.',
      'The old coil felt heavier in my hands today than it usually does. I cannot explain why. I am not trying very hard to.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Good morning. The wait paid off, and I did not need to explain to anyone why that mattered.',
      'Oz stayed still for nearly an hour today without being told to. I will take that quietly and gladly.',
      'Nobody needed the wait explained to them today. Everyone simply sat with it. Restful, that.',
      'The line held, the weather stayed fair, and I sat here longer than strictly necessary. Recommended.',
      'I am in an unusually good mood and have decided not to interrogate it too closely.',
      'A good day out here, by my measure, which mostly just requires nothing going wrong.',
      'Oz told a story today that turned out to be entirely true. I told him so. He seemed almost disappointed.'
    ]),
    pool('item-carvedwhistle', 'itemPokemon', { itemIds: ['carvedWhistle'] }, 72, [
      'A carved thing, made slowly and properly. I recognize the discipline in it.',
      'I will keep this where I can see it, not tucked away. It deserves that much.',
      'Thank you. Plainly, the way I mean most things.',
      'Oz would have talked about a gift like this for a week. I will simply keep it, and that will be my version of the same thing.',
      'Whoever carved this understood the value of taking longer than necessary. I approve, on principle.',
      'I have little use for ornaments generally. This one I will make an exception for.',
      'Oz would have found a way to make noise about receiving something like this. I will simply keep it, quietly, which suits it better.'
    ]),
    pool('pokemon-magikarp-pier', 'itemPokemon', { pokemonSeen: [129] }, 70, [
      'Most people are disappointed by these. I have never understood the disappointment.',
      'Oz catches more of these than anything else and leaves them out of every story he tells. I have never understood that either.',
      'They are underrated. Say what you like about the wait; at least it is honest about what it usually produces.',
      'I have caught thousands of these over the years. I have never once minded.',
      'The pier would be quieter, and worse, without them.',
      'Oz insists his stories are never about these. I have counted. They almost always are.',
      'A patient morning and one of these turning up is, to me, a complete and satisfying outcome.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same spot, same quiet. Sit if you like.',
      'You know the routine by now. I will not repeat the trick out loud again; you have heard it.',
      'The stool is where it always is. Mind the loose board on the way out; I keep meaning to mention it to someone who can fix it.',
      'Talk if you want to talk. Sit quietly if you do not. Either suits me equally.',
      'Nothing dramatic happened since we last spoke. I noticed the small things anyway, because you would ask.',
      'You keep coming back to this end of the pier. I have stopped being surprised by that.',
      'Same question, same answer: the wait is still the trick, and most people still cannot do it.',
      'Come sit. Oz is two spots down, being considerably louder about considerably less.',
      'The wait has not gotten any faster. I would be concerned if it had.',
      'You have a standing welcome at this spot now. I do not extend those often.',
      'Same wait, same water, same general lack of urgency. It suits me. It seems to suit you too, lately.'
    ]),
    pool('rare-full-circle', 'rare', { location: 'pier', completedEventIds: ['sal-folk-patient-angler-event-teaching-the-wait'], minStage: 'trusted' }, 108, [
      'Oz stayed in one spot for over an hour today. I did not say anything. I did not need to.',
      'The old coil of line found somewhere to go after eleven years of sitting beside my tackle box.',
      'I taught someone the wait properly, for the first time. I did not expect that to answer as much as it did.',
      'Sit a while. The fish are not the point today, and for once, neither is the silence.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.sal = D;
})();
