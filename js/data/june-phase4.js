/* Phase 4 character batch: June. Every string is a complete contextual
   response; categories count responses rather than fragments. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'june-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'You look like you are about to ask which path is faster. Left one saves ten minutes and costs you a clean pair of boots.',
      'I am June. If you are heading out today, take water even if the sky looks generous.',
      'Eevee, off the pack. Sorry—she treats every new person as luggage inspection.',
      'The trail board is behind me if you want the honest version instead of the postcard one.',
      'I guide the routes out of town. If you are only passing through, at least let me point you at the good view.',
      'Careful on the gate latch, it sticks. Everything else out here is more straightforward than it looks.',
      'You are welcome to ask me anything about the trails. I would rather answer twice than have you guess once.',
      'New in town? The mud after the bridge is worse than it looks. Ask me before anyone tells you it is fine.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You found the trail entrance without asking twice. That is a good sign, for you and for my mornings.',
      'Eevee remembers your scent now. That is either trust or she has simply catalogued you as furniture.',
      'I kept a spare map folded for you, in case you wanted the honest one instead of the printed one.',
      'The stream crossing is fine today, for the record. I checked before you asked.',
      'You do not have to bring anything to walk with me. I already over-pack for two.',
      'I noticed you read the whole trail sign instead of skimming it. Rare, and appreciated.',
      'Come by the entrance at dawn sometime. The light on the ridge is worth the early start.',
      'I still introduce you to Eevee like she has not met you six times already. Habit.',
      'You ask good questions about the weather. Most people only ask about the view.',
      'I have five minutes before my next group. Walk with me to the gate and we will use them.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You know which fork I mean now without me pointing. Saves us both a sentence.',
      'Eevee stopped waiting by the pack and started walking beside you instead. Noted, and not mentioned to her.',
      'I left the good map out for you this time, not the one I hand to strangers.',
      'The lookout bench dried out finally. Bring lunch and I will show you the second view, not just the first.',
      'You remembered to ask about the weather before the route. That is the correct order.',
      'I told a new hiker about the stream crossing the way you would tell it, mud and all.',
      'There is a second spare lunch in my bag now. It has your name on it, informally.',
      'You do not flinch at the exposed section anymore. Or you do, and you have gotten better at hiding it from me.',
      'I let you carry the map today. Try not to lose it in a river; I have grown fond of that one.',
      'Come earlier next time. The frost burns off the meadow by nine and you are missing the good part.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you the real reason I pack two lunches. You are the first person who did not laugh.',
      'Eevee sleeps facing the wrong way at every lookout. I have decided this is a personality trait, not an error.',
      'You can tell me when a route sounds like a bad idea. I would rather hear it from you than the ranger station.',
      'I redrew the trail map last night and left your handwriting on the margin notes. It looked right there.',
      'We should stop pretending the shortcut past the orchard is a shortcut. It is not. I like it anyway.',
      'I packed light today, on purpose, to see if I could. Ask me in an hour if that was a mistake.',
      'You noticed when I was quiet on the ridge and did not fill it with questions. That helped more than you know.',
      'There is a flat rock past the second bend with your name unofficially on it now.',
      'I trust your read on the weather almost as much as my own. Almost.',
      'Stay for the whole walk today. No shortcuts, no turning back early unless the sky says otherwise.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the crossing I lied about, years back. You are the first person outside my own head who has that story straight.',
      'Eevee lets you repack the shared bag now. She still audits it afterward, but she lets you.',
      'I asked what you actually thought about my turn-back rule, and meant it. Tell me if it is wrong.',
      'The ranger station knows your name now, informally, as "June\'s usual." I did not correct them.',
      'You caught the mistake on my map before I did. I redrew it and kept your initial in the corner.',
      'I do not perform confidence with you anymore. If I am unsure, I say so, and the sky has not fallen yet.',
      'We argued about the pace on the ridge and neither of us won cleanly. That felt like progress, oddly.',
      'I saved you the flat spot at the lookout without checking if you were coming. You were.',
      'Eevee brings you the good stick now, not the sad chewed one. That is practically a character reference.',
      'Tell me the plan you actually want, not the safe version you think I expect. I can work with either.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'I stopped double-checking your knots. You tie them the way I taught you, which is unreasonably satisfying.',
      'Eevee waits at the gate for you on days you are not even due. I have stopped explaining this to her.',
      'You have seen me turn back from something I wanted. Most people only ever see the summit version of me.',
      'I gave you the real trail board key. Lose it and I will make a joke about it exactly once.',
      'We should take the long way today. Nothing needs finishing before dinner.',
      'I let you plan the last three outings. You are annoyingly good at reading contour lines now.',
      'The new guide asked who taught you to read weather. I said you already knew half of it.',
      'You call the turn-back before I do sometimes now. That is not a small thing to hand someone.',
      'I keep the spare lunch in your size now, not a stranger\'s guess at appetite.',
      'Same trail, same gate, and somehow it is never actually the same walk. I like that about this.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you what I would do if the weather turned on the real expedition, before anyone asked me to plan for it.',
      'Eevee sleeps against your pack on the cold nights now, not just mine. Traitor, in the best way.',
      'You know the three things that would make me turn back without me listing them again.',
      'I read you the actual reply from the guide who offered me the six-week route, unedited, the scared parts included.',
      'You get the map with my mistakes still on it now, not the clean copy I hand to new hikers.',
      'I do not check twice when you tell me you are ready. Once is enough, from you.',
      'We split the planning on the expedition properly. Weather calls are mine. Almost everything else is not.',
      'You are the only person I have told about the corner of the map I left blank on purpose.',
      'I trust you with the turn-back decision on days I am too stubborn to trust myself with it.',
      'Come with me to file the permit this week. Both our names are going on it, not just mine.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The permit has both our names on it now. I checked it twice, and once was only habit.',
      'Eevee greets you before she greets me at the gate most mornings. I have made peace with this.',
      'You know the whole map now, blanks and all, including the corner I never planned to finish.',
      'I do not perform bravery for you. You have seen me turn back, and you never once called it failure.',
      'The six-week route starts soon. I want you at the send-off, not just at the map table.',
      'There is no version of the big crossing plan without your name on the second signature line.',
      'I still pack a spare lunch. It has just stopped being spare, is all.',
      'You ask me what I actually want before what is safe. I am still getting used to being asked that.',
      'The lookout bench has worn a shape for two people now. I noticed before you did.',
      'Same time tomorrow, same gate, and this time we are both bringing the good boots.'
    ]),
    pool('post-spare-lunch', 'postEvent', { completedEventIds: ['june-event-a-spare-lunch'], recentEventIds: ['june-event-a-spare-lunch'] }, 90, [
      'I still catch myself packing two lunches out of habit. At least now the second one has a name attached.',
      'Eevee stopped hovering over the food bag once she learned you would actually share it back.',
      'The new hiker from last week asked if I always feed strangers. I said only the ones who ask good questions.',
      'You know the trailhead sandwich rotation now. That is either friendship or a shared filing system.',
      'I repacked my bag out loud again yesterday, from habit. It felt right to keep doing that.',
      'The ranger asked why I only carry one lunch some days now. I told her the arithmetic finally changed.',
      'You still offer to carry the drinks. I still let you, which took some getting used to.',
      'I do not automatically hand over the extra share anymore. I ask first. Small change, correct one.',
      'Eevee has decided the shared lunch spot on the flat rock belongs to both of you now.',
      'That first climb was steeper than I let on. I have stopped doing that particular kind of not-letting-on.'
    ], { acknowledgesEventId: 'june-event-a-spare-lunch' }),
    pool('post-washed-out', 'postEvent', { completedEventIds: ['june-event-the-washed-out-path'], recentEventIds: ['june-event-the-washed-out-path'] }, 91, [
      'The stream crossing sign is still up. Two other guides copied the wording exactly, closure and all.',
      'I wrote "unconfirmed" on another sign last week without hesitating over the word this time.',
      'Nobody has complained about the honest signs yet. One person thanked me, which surprised us both.',
      'You still ask before I do whether a route needs marking. I have started expecting the question.',
      'The mud field from that day has a name now, unofficially. I am not proud of it, but it stuck.',
      'I do not soften a closure into "probably fine" anymore. It costs a little pride and saves a lot of guessing.',
      'Another guide asked how I rate an unfinished check. I told her the short version, then the long one.',
      'The trail board has three tiers now instead of two, because one washed-out crossing taught me the gap.',
      'You signed that first notice with me. I still glance for your name on the newer ones out of habit.',
      'Eevee refuses that particular field entirely now. I have started trusting her opinion on wet ground.'
    ], { acknowledgesEventId: 'june-event-the-washed-out-path' }),
    pool('post-map-blanks', 'postEvent', { completedEventIds: ['june-event-a-map-full-of-blanks'], recentEventIds: ['june-event-a-map-full-of-blanks'] }, 92, [
      'The map still has the blank corner. I have stopped feeling like I need to fill it to prove anything.',
      'I told the story straight this time, invented miles removed, to someone who was not you. It still worked.',
      'The turn-back point is marked in plain pencil now. No shading, exactly where it happened.',
      'You asked if I regretted not finishing the crossing. I do not, which took me a while to be sure of.',
      'Eevee sits at that blank corner of the map sometimes, like she is guarding the honest part.',
      'I am going back to look at the rest of it eventually. Not to finish it. Just to see.',
      'Someone asked about the lake with no path around it. I told them the true, smaller story.',
      'The old lie does not sit in my chest anymore. Replacing it with the real version was worth the embarrassment.',
      'You still ask what is actually out there, not what I claim is out there. I trust the question now.',
      'I keep the old map, blank half and all, folded in the same pocket. It is a better map than the finished one would have been.'
    ], { acknowledgesEventId: 'june-event-a-map-full-of-blanks' }),
    pool('post-place-on-map', 'postEvent', { completedEventIds: ['june-event-a-place-on-the-map'], recentEventIds: ['june-event-a-place-on-the-map'] }, 93, [
      'The expedition plan is filed, both names on the cover, exactly where I said it would be.',
      'I left the weather calls to myself and nothing else. You have not let me quietly take more back.',
      'The ranger station calls it "June\'s usual, plus one" now. I have decided I like the plus one.',
      'Eevee has claimed the middle of every planning blanket since the porch conversation. Full veto power, apparently.',
      'We disagreed about the turn-back threshold again this week. It went better than the first time.',
      'The little lake with the finished path around it gets visitors now. I tell people who drew the second half.',
      'You still ask which decisions I kept for myself. I still answer honestly: fewer than I used to.',
      'The six-week route starts soon, and for once I am not the only name on the paperwork.',
      'I read your notes on the plan before mine. That used to feel like losing control. It does not anymore.',
      'Same gate, same permit book, and this time it says "guides" instead of "guide." I like the plural.'
    ], { acknowledgesEventId: 'june-event-a-place-on-the-map' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'town:gym-steps' }, 70, [
      'You checked your bag twice already. I will not stop you from a third, but it will not change what is inside.',
      'Eevee keeps watching the gym doors like they might be a trailhead. She is not entirely wrong.',
      'Whatever happens in there, the walk back to the trailhead is still open after. Fresh air helps.',
      'You do not need to look calm. You need to look ready, and those are not the same face.',
      'I brought water. Nerves dry your mouth out faster than any climb I have guided.',
      'The gym steps are steadier than the trail ever is. Small comfort, but I will take it for you.',
      'If it goes badly, we walk it off on the pine loop after. If it goes well, same plan, faster pace.',
      'You have made harder calls than this on a bad crossing. Remember that going in.',
      'I cannot guide you through that door. I can wait right here until you come back out of it.',
      'Go on. The mountain will still be there this afternoon whether or not the badge is.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'You talk about routes differently now, less like a list and more like weather you have actually stood in.',
      'Halfway through anything is where you learn which plans were only ever hopeful guesses.',
      'Your pace has changed since we started. Steadier, which matters more than faster ever did.',
      'You ask about turning back before I bring it up now. That took longer to teach some people.',
      'I hear about you from other guides before you tell me yourself. The stories mostly hold up.',
      'You have started packing for the weather you might get, not just the one you want. Good instinct.',
      'Bring back an ordinary trail story sometime, not just the badge news. I like those better.',
      'You do not need to sound certain about the next stretch. Uncertain and prepared can share a sentence.',
      'Eevee has stopped checking whether you are keeping up. She just assumes it now.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'town:gym-steps' }, 70, [
      'You came out standing straighter than you went in, even tired. That is the part I actually watch for.',
      'Eevee ran two circles around the steps when the doors opened. That is her entire review of your match.',
      'The badge is heavier than it looks and lighter than it should be, all at once. Odd thing, badges.',
      'Tell me the part that nearly went wrong before the part everyone will ask about. I want the real one.',
      'You made a call in there nobody guided you through. That is the part I am proudest of, honestly.',
      'We can take the long way back to celebrate, or the short way if you would rather just sit down. Either is fine.',
      'The gym doors look smaller from this side every time. Funny how that works.',
      'I saved you a spot at the trail entrance for tomorrow, in case today made you want plain ground for a while.',
      'Whatever happened in there, the mountain did not move an inch. Neither did I.'
    ]),
    pool('location-trail-entrance', 'location', { location: 'trail-entrance' }, 60, [
      'The gate latch sticks if you pull instead of lift. Everyone learns this the same way, badly.',
      'This is where every route starts and about a third of them quietly end, if the weather turns.',
      'The board behind me lists closures honestly now. Read it before the map, not after.',
      'Eevee treats the first hundred steps as a formality. She saves her opinions for the ridge.',
      'Dawn is the best time to leave from here. Fewer people, better light, and the frost has its own smell.',
      'I keep a spare pair of laces on the post by the gate. Somebody always needs them.',
      'The mud starts right past that second post, not at the sign. The sign is optimistic.',
      'You can wait here as long as you need before deciding on a route. Nobody times you at a trailhead.',
      'This gate has seen more turned-back trips than finished ones, probably. I consider that a healthy ratio.'
    ]),
    pool('location-pine-woods', 'location', { location: 'pine-woods' }, 60, [
      'The pine woods swallow sound strangely. You can hear your own boots and almost nothing else.',
      'Watch the roots past the second clearing. They are exactly the color of the dirt and twice as rude.',
      'Eevee goes quiet in here, which for her counts as a warning worth listening to.',
      'The shortcut through here is not shorter, technically, but it feels like it, which I have stopped arguing with.',
      'Something always rustles in the low branches here. Ninety percent of the time it is nothing alarming.',
      'This is the stretch where people decide whether they actually like hiking or just liked the idea of it.',
      'The light changes fast under these trees. Bring more time than the map suggests.',
      'I know every fallen log on this path by name, informally, mostly through complaint.',
      'If it starts raining here, it is worse before it is better. Keep walking toward the clearing.'
    ]),
    pool('location-lookout', 'location', { location: 'lookout' }, 60, [
      'The bench up here dries out slowest after rain. Check before you sit, or accept the consequences cheerfully.',
      'From here you can see three ridges and, on a clear day, exactly how far you still have to go.',
      'Eevee sleeps facing the wrong way at every lookout in the region. I have given up correcting her.',
      'This is where I show people the honest map, not the one with the invented miles on it.',
      'The wind up here says more about tomorrow\'s weather than any forecast I have ever trusted.',
      'I have eaten more lunches on this rock than anywhere else in the valley, easily.',
      'Bring a jacket even on warm days. The lookout wind does not care what the trailhead felt like.',
      'This spot has heard most of the truths I have ever told out loud, one way or another.',
      'The view is worth the climb. I still say that every time, and it is still true every time.'
    ]),
    pool('location-market-shelter', 'location', { location: 'market-shelter' }, 60, [
      'The shelter roof leaks exactly one drip, always in the same spot. I have made peace with it.',
      'Storm days bring every guide in town under this one roof. Good gossip, bad coffee.',
      'Eevee claims the driest corner immediately and defends it without shame.',
      'I reroute half my week from under here when the weather turns. The map does not mind waiting.',
      'You can wait out the worst of it with me. The rain rarely outlasts good company.',
      'Someone always brings soup to the shelter on the bad days. I have strong, specific opinions about whose is best.',
      'The wind rattles this roof worse than it looks from outside. Structurally, I am assured it is fine.',
      'Storm days are for planning, not walking. Even I follow that rule, mostly.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am not in a state to plan a route right now. Ask me again once I have stopped pacing.',
      'Something did not go the way I planned today. I would rather say that plainly than pretend otherwise.',
      'I need quiet, not advice, for a few minutes. You can stay, just do not fix anything yet.',
      'Eevee is hiding behind the pack. That is usually an accurate read on the room.',
      'I turned back from something today and I am still annoyed about it, even knowing it was right.',
      'Give me a minute before you ask what happened. I am still deciding how much of it was my fault.',
      'I heard the apology. I am still upset. Both of those are allowed to be true at once.',
      'We can talk about the route later. Right now I would rather just walk and not narrate it.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Everything on today\'s route went exactly as planned, which happens rarely enough to mention.',
      'Eevee found a warm patch of grass and has not moved from it in an hour. Smart creature.',
      'I finished the week\'s maps early and did not immediately start next week\'s. Restful, honestly.',
      'Nobody needed rescuing, nothing washed out, and the soup turned out well. Good day, plainly.',
      'The trail board has nothing but green marks on it right now. I am enjoying it while it lasts.',
      'I sat at the lookout for an hour doing absolutely nothing useful. Recommended, occasionally.',
      'The new hikers this week actually read the signs. Small thing, big relief.',
      'I am in a good mood and have no particular reason. I am choosing not to question it.'
    ]),
    pool('rumor-crossing', 'recentMoodRumor', { worldFlags: ['rumor:the-far-crossing'] }, 78, [
      'The rumor says I finally crossed the far ridge alone at midnight. I did not, and I was not alone, and it was not midnight.',
      'Someone is telling people Eevee led the way across. She mostly led the way to a warm rock and stayed there.',
      'The exaggerated version has a storm in it. The real version has slightly aggressive drizzle.',
      'People keep asking if the crossing is finally open. I tell them the honest tier it actually earned.',
      'The market version says I refuse to guide anyone there now. I still guide the parts that are safe.',
      'Someone credited the whole route to bravery. Most of it was just checking the wind twice.',
      'I will correct the story about the crossing and let the rest become whatever it becomes.'
    ]),
    pool('item-trailpermit', 'itemPokemon', { itemIds: ['trailPermit'] }, 72, [
      'That permit means the ranger station actually trusts you on the back trails now. Do not lose it in a river.',
      'Keep the permit dry. Waterlogged paperwork is a whole separate conversation with the ranger.',
      'I remember signing off on that permit. It is not nothing, getting cleared for the marked back trails.',
      'The permit does not cover the unmarked routes. Ask me first, always, for those.',
      'You carry that like you understand what it means. Good. Most people just fold it into a pocket.',
      'The ranger station only hands those out after a real conversation. I am glad yours went well.',
      'That permit is the reason I will actually take you past the second gate now.',
      'Keep it somewhere you will find fast. A ranger checkpoint is not the place to search your whole bag.',
      'I still remember getting my own first permit. Different ranger, same particular kind of pride.',
      'That piece of paper opens more of the map than most people ever see. Use it well.'
    ]),
    pool('pokemon-eevee', 'itemPokemon', { pokemonSeen: [133] }, 73, [
      'Eevee decides who gets the good stick within about four seconds of meeting them.',
      'She sleeps facing away from every view I have ever shown her. I have stopped taking it personally.',
      'Eevee can smell weather changes before I can read them off the sky. I trust her over most forecasts.',
      'She audits every repacked bag afterward. Nothing gets past her, including my own mistakes.',
      'Eevee treats new hikers as luggage until proven otherwise. It usually only takes one shared sandwich.',
      'She refuses certain fields outright. I have learned to trust that instinct over my own optimism.',
      'Eevee claims the middle of every picnic blanket without exception. I have given up contesting it.',
      'She waits at the gate on days you are not even due. I have stopped trying to explain that to her.',
      'Eevee has an opinion about every crossing before I do. Usually correct, occasionally just stubborn.',
      'She hides behind the pack exactly when I am tense. Accurate mood reading, better than most people manage.'
    ]),
    pool('relationship-ellis', 'relationships', { relationshipIds: ['ellis'] }, 35, [
      'Ellis draws the ridgeline different every time. I have started trusting their version over the actual map.',
      'I bring Ellis landscape sketches instead of souvenirs now. Turns out that is the correct trade.',
      'Ellis never asks me to slow down for the view. They just start drawing and let me catch up.',
      'I do not pressure Ellis to show anyone the trail sketches. That was never mine to push.',
      'Ellis said my map was more honest than most paintings. I have decided to take that as a real compliment.',
      'We argue, gently, about whether a view is worth the climb. Ellis usually wins by drawing it anyway.',
      'Ellis brought a sketch of the washed-out crossing before I had even finished the trail report.',
      'I do not explain a route to Ellis the way I do to other people. They see it differently, and that is fine.',
      'Ellis asked what the blank corner of my old map looked like. I described it. They drew it anyway, softer.',
      'We compare notes after every trip: mine are directions, theirs are the color of the light. Both matter.',
      'Ellis never once asked me to pose at the summit. I have never once asked them to finish a sketch.',
      'I trust Ellis with the parts of a route I would not put in an official report. They keep them exactly that quiet.'
    ]),
    pool('rare-far-crossing', 'rare', { location: 'lookout', completedEventIds: ['june-event-a-place-on-the-map'], pokemonCaught: [133], minStage: 'trusted' }, 110, [
      'Your Eevee and mine are sitting at the exact spot on the map where I once stopped and turned around.',
      'Both Eevee agree this rock is the best one at the lookout. I am inclined to trust the unanimous vote.',
      'The permit, the finished map, and two Eevee sprawled in the same patch of sun. I did not plan this, but I will take it.',
      'I have shown a lot of people this view. Showing it to you, now, with all of this behind us, is different.',
      'Sit here a while. Nothing about this spot needs finishing today, and for once neither do I.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same gate, same question on your face. Yes, the trails are all still there.',
      'Eevee stopped bothering to inspect your bag. You have passed that particular test enough times.',
      'I already told you about the stream crossing. It has not changed its mind since yesterday.',
      'You know where the spare laces are. Help yourself; that is what the post is for.',
      'Trail talk, weather talk, or just walk quietly? All three are still on the table.',
      'Nothing dramatic happened since we last talked. I saved the small stuff anyway, because you would ask.',
      'You keep coming back to the gate. I have stopped being surprised and started just expecting it.',
      'Same question, same honest answer: check the board, then ask me if it is unclear.',
      'I have a route in mind for you, but it can wait until after whatever you actually came to ask.',
      'Come in out of the wind. We have done this enough times that the welcome does not need saying anymore.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.june = D;

  var trainer = (window.TRAINERS || []).find(function (item) { return item.id === 'june'; });
  if (trainer) trainer.heartEventIds = (window.JUNE_ACTIVE_HEART_EVENT_IDS || []).slice();

  function appendBeats(eventId, beats) {
    var groups = (window.EVENT_BEATS && window.EVENT_BEATS.june) || [];
    var group = groups.find(function (item) { return item.sceneId === eventId; });
    if (group) Array.prototype.push.apply(group, beats);
  }
  appendBeats('june-event-a-spare-lunch', [
    { s: 'Halfway up the ridge, June stops and checks her bag twice. "I only packed one lunch. First time in years." She looks almost offended at herself.', c: [['Split what you have with her.', 'She takes exactly half, no more, and calls it a fair trade for every sandwich she has ever handed you.', 12], ['Ask if she is all right.', '"I am fine. Just not used to needing anything." She eats the half anyway.', 12]] },
    { s: 'A new arrival at the trailhead eyes June\'s bag hopefully. She glances at you first instead of automatically producing a second lunch.', c: [['Tell her it is fine to share this time.', 'She hands it over easily and does not look for permission on the next one either.', 15], ['Say the extra is yours today.', '"Fair," she says, and the new hiker gets directions and a compliment on his boots instead.', 12]] },
    { s: 'That evening June re-packs her bag out loud, listing what she is bringing and asking what you want to carry instead of deciding for you.', c: [['Pick your own share of the load.', 'She adjusts her own pack to match. "Better. We are not guessing what the other one needs anymore."', 15], ['Ask why she is doing it out loud.', '"Because deciding quietly for both of us was never actually fair." She keeps listing.', 15]] }
  ]);
  appendBeats('june-event-the-washed-out-path', [
    { s: 'The bridge past the orchard has a plank missing. June stares at it for a long moment. "I do not know if the rest held or if this is the only bad part. I am not going to guess out loud until I have looked."', c: [['Offer to look with her.', 'You test the next three planks together. Two hold; one does not, and now you both know exactly which.', 12], ['Wait while she checks alone.', 'She comes back and says only, "one more bad board than I hoped." That is the whole report, and it is enough.', 12]] },
    { s: 'At the trail board, June writes a word she has never used on a sign before: "unconfirmed." She holds the marker over it a second longer.', c: [['Tell her that is more honest than "closed."', '"That is the idea," she says, and pins it up without crossing anything out.', 15], ['Ask if people will complain.', '"Some will. I would rather be asked than trusted by accident."', 15]] },
    { s: 'A visiting guide asks how June rates a route she has not finished checking. "I did not always. Ask me about the stream crossing sometime."', c: [['Say you were there for that one.', 'She grins. "Then you already know the short version."', 15], ['Let her tell the story herself.', 'She tells it well, closure sign and all, and does not skip the part where it was fine yesterday.', 15]] }
  ]);
  appendBeats('june-event-a-map-full-of-blanks', [
    { s: 'This time you are both walking toward the actual crossing from her old story, the one she never finished. June checks the sky more than the map.', c: [['Ask what would make her turn back today.', '"Wind past a certain point. Or you two looking tired before I do." She says it like a rule, not a doubt.', 12], ['Say you trust her judgment either way.', 'She nods once, like that was the answer she needed to hear before starting.', 12]] },
    { s: 'The wind picks up exactly at the ridge she has always wanted to finish. June stops, hand on the rock, and does not pretend to be calm about it.', c: [['Say turning back is the right call.', '"I know." She says it fast, like getting ahead of her own argument. You turn back together.', 15], ['Ask what she wants to do.', '"I want to keep going and I am not going to." She turns around before finishing the sentence.', 15]] },
    { s: 'That night June draws the turn-back point on the map in plain pencil, no shading, right where it happened.', c: [['Ask why she is marking a retreat.', '"Because knowing where I stopped is real information. The invented miles never were."', 15], ['Suggest trying again another day.', '"Yes. Not because I have to finish it. Because I want to see the rest, eventually."', 15]] }
  ]);
  appendBeats('june-event-a-place-on-the-map', [
    { s: 'On the porch, June spreads out a real proposal: dates, gear, a two-page route. Three lines are left blank. "Those are yours to decide, not mine."', c: [['Fill in the blanks together.', 'You argue over one of them for ten minutes. She writes down your answer, not her first instinct.', 12], ['Ask which decisions she kept for herself.', '"Weather calls. Only weather calls." She underlines it so there is no confusion later.', 12]] },
    { s: 'Planning the turn-back rule for the real expedition, you and June disagree about how much bad weather is too much.', c: [['Ask her to explain her reasoning fully.', 'She does, in detail, then asks for your read before deciding. The rule ends up somewhere between both.', 15], ['Defer to her experience.', '"No—say what you actually think first. I can talk you out of it later if I am right."', 15]] },
    { s: 'The finished plan goes into June\'s bag with both your names on the cover page, right where the trail permit usually rides alone.', c: [['Ask when you leave.', '"Same time as always. Just further than usual."', 15], ['Say you are ready.', '"Good," she says, "because I already told the ranger station there would be two of us."', 15]] }
  ]);

  if (typeof window.labelEventBeatIds === 'function') window.labelEventBeatIds();

  function markOutcome(eventId, beatIndex, choiceIndex, flag) {
    var group = ((window.EVENT_BEATS || {}).june || []).find(function (item) { return item.sceneId === eventId; });
    var choice = group && group[beatIndex] && group[beatIndex].c[choiceIndex];
    if (choice) choice.outcomeFlags = [flag];
  }
  markOutcome('june-event-a-spare-lunch', 4, 0, 'shared-provisions');
  markOutcome('june-event-the-washed-out-path', 4, 0, 'named-uncertainty');
  markOutcome('june-event-a-map-full-of-blanks', 4, 0, 'named-the-turn-back');
  markOutcome('june-event-a-place-on-the-map', 4, 0, 'shared-authority');

  if (trainer && window.CORE_CAST_PRODUCTION && CORE_CAST_PRODUCTION.june) {
    CORE_CAST_PRODUCTION.june.eventInventory.forEach(function (record) {
      var scene = trainer.events.find(function (event) { return event.id === record.eventId; });
      var group = ((window.EVENT_BEATS || {}).june || []).find(function (item) { return item.sceneId === record.eventId; }) || [];
      record.beatIds = [scene.beatId].concat(group.map(function (beat) { return beat.id; }));
      record.choiceIds = (scene[3] || []).map(function (choice) { return choice.id; });
      group.forEach(function (beat) { record.choiceIds = record.choiceIds.concat(beat.c.map(function (choice) { return choice.id; })); });
    });
  }
})();
