/* Phase 4 character batch: Ellis. Every string is a complete contextual
   response; categories count responses rather than fragments. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'ellis-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Hold still—sorry, that sounded strange. I was only trying to get the light on your collar right.',
      'Smeargle likes your hat. I was attempting to draw him looking at it, with limited success.',
      'I am Ellis. If you sit still for exactly four minutes, you will end up in a sketchbook margin somewhere.',
      'The café window has the best light before noon. I have opinions about this that nobody asked for.',
      'Sorry, I was staring. You have a good jawline for charcoal. That is a compliment, mostly.',
      'Smeargle considers every blank wall an invitation. I spend a fair amount of my life apologizing for him.',
      'You can watch me draw if you like. I will warn you when a page is not ready to be looked at.',
      'New face, new angle. I am not going to sketch you without asking, for the record.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'You sat in the same seat as last time. I have already half-drawn it with you in it.',
      'Smeargle remembers you now. He only steals hats from people he has decided to like.',
      'I left a page blank on purpose today. It is bothering me less than I expected it to.',
      'You asked before touching the sketchbook. That should be ordinary, and somehow it is not.',
      'The café changed its mugs. I had only just learned to draw the old ones properly.',
      'I do not usually explain a drawing while I am making it. Ask anyway, if you want.',
      'Smeargle painted my shoes again. They match better now, honestly.',
      'You noticed the unfinished hand on the last page. Most people look at the face first.',
      'Come by in the mornings if you want the good light. Afternoons are for arguing with color.',
      'I am still working out whether you are a person or a subject. Possibly both, which is fine.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'You know which page I mean now without me turning the book around. Convenient.',
      'Smeargle stopped hiding his worst paintings from you specifically. That is a strange kind of trust.',
      'I showed you the green sky before I showed the gallery coordinator. Make of that what you will.',
      'You sit at an angle that is genuinely useful for drawing now. I did not ask you to; you just noticed.',
      'The courtyard mural is half washed off. I kept a photograph before it went, mostly for myself.',
      'I do not turn the sketchbook away from you anymore. That took longer than it should have.',
      'You asked what I was working on instead of what it was supposed to be. Better question.',
      'Smeargle has started painting near you instead of near the door. Promotion, of sorts.',
      'I left the entry form under my cup again. I have not decided yet. You do not have to ask.',
      'Stay while I finish this line. Talking mid-stroke ruins it, but the company does not.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I told you why I leave things unfinished. You did not immediately try to fix that about me.',
      'Smeargle sleeps against your bag now instead of the door. I have stopped mentioning it to him.',
      'You can tell me a piece is not working. I would rather hear it from you than guess alone.',
      'I filled in the entry form. Only halfway, but the half that matters is done.',
      'We should stop pretending the courtyard wall incident was entirely Smeargle\'s fault. It was mostly his fault.',
      'I let the green sky dry without touching it again, on purpose, to see if I could leave it alone.',
      'You noticed when I went quiet over a page and did not fill the silence with questions. That helped.',
      'There is a chair by the window that has started to feel like yours, unofficially.',
      'I trust your read on a drawing almost as much as my own. Almost.',
      'Stay for the whole sketch today. I will tell you when a line is actually finished, not just stopped.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I told you about the piece I never submitted three years ago. You are the first person outside my own head who has that story straight.',
      'Smeargle lets you hold the paints now. He still supervises, but he lets you.',
      'I asked what you actually thought about the green sky, and meant it. Tell me if it is wrong.',
      'The gallery coordinator knows your name now, informally, as "Ellis\'s usual company." I did not correct her.',
      'You caught the mistake in the window-seat sketch before I did. I left your correction in the margin.',
      'I do not perform confidence about a piece anymore. If I am unsure, I say so, and the paint has not minded.',
      'We argued about whether the courtyard border needed fixing and neither of us won cleanly. That felt like progress.',
      'I saved you a page in the sketchbook without checking if you were coming. You were.',
      'Smeargle brings you the good brush now, not the chewed one. That is practically a character reference.',
      'Tell me the piece you actually want to make, not the safe one you think I expect. I can work with either.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'I stopped hiding the rough pages from you. You look at them the way I wish more people would.',
      'Smeargle waits by the window on days you are not even due. I have stopped explaining this to him.',
      'You have seen me leave something deliberately unfinished. Most people only ever see the framed version of me.',
      'I gave you a key to the art room. Lose it and I will mention it exactly once, quietly.',
      'We should paint badly together again today. Nothing needs to be gallery-ready before dinner.',
      'I let you choose the last three pieces for the window display. You are annoyingly good at that now.',
      'The new regular asked who taught you to look at a painting properly. I said you already knew half of it.',
      'You call a piece finished before I do sometimes now. That is not a small thing to hand someone.',
      'I keep a page open for you in the good sketchbook now, not the spare one.',
      'Same window, same light, and somehow it is never actually the same drawing. I like that about this.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I told you what I would do if the next show went badly, before anyone asked me to plan for that.',
      'Smeargle lets you near the wet paintings now, not just mine. Traitor, in the best possible way.',
      'You know the three things that make a piece worth keeping unfinished, without me listing them again.',
      'I read you the actual rejection letter from the first gallery, unedited, the discouraging parts included.',
      'You get the sketchbook with my crossed-out pages still in it now, not the clean copy I show strangers.',
      'I do not check twice when you tell me a piece is done. Once is enough, from you.',
      'We split the opening-night nerves properly. You hold the coat. I hold everything else, mostly.',
      'You are the only person I have told about the page I left blank on purpose and never explained.',
      'I trust you with deciding when a piece is finished on days I am too stubborn to trust myself with it.',
      'Come with me to drop off the frame this week. Both our names are going on the little card, not just mine.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The little card under the frame has both our names on it now. I checked it twice, and once was only habit.',
      'Smeargle greets you before he greets me at the window most mornings. I have made peace with this.',
      'You know the whole sketchbook now, blank pages and all, including the one I never planned to finish.',
      'I do not perform ease about showing work anymore. You have seen me nervous, and you never once called it weak.',
      'The next show is soon. I want you in the room, not just in the sketch of the room.',
      'There is no version of the collaborative page without your crooked mug drawn on it.',
      'I still leave pages unfinished. They have just stopped being lonely about it, is all.',
      'You ask what I actually want to paint before what will sell. I am still getting used to being asked that.',
      'The window seat has worn a shape for two people now. I noticed before you did.',
      'Same seat tomorrow, same light, and this time we are both bringing something to add to the page.'
    ]),
    pool('post-unfinished-sketch', 'postEvent', { completedEventIds: ['ellis-event-an-unfinished-sketch'], recentEventIds: ['ellis-event-an-unfinished-sketch'] }, 90, [
      'I still leave a page unfinished on purpose sometimes. It bothers me less each time, which is the point.',
      'Smeargle stopped guarding the sketchbook from you specifically. High praise, from him.',
      'The single line you added to that overnight page is still there. I never painted over it.',
      'You know the difference between unfinished and abandoned now. Most people conflate the two.',
      'I left the book open on the table again yesterday, from habit. It felt right to keep doing that.',
      'A regular asked why I let you see the rough pages. I told her the arithmetic finally changed.',
      'You still wait for me to offer a page instead of reaching for it. I still notice, and appreciate it.',
      'I do not automatically hide the difficult hand anymore. I let it sit there, difficult, in view.',
      'Smeargle has decided the window seat sketch spot belongs to both of us now.',
      'That first page was steeper going than I let on. I have mostly stopped doing that particular kind of not-letting-on.'
    ], { acknowledgesEventId: 'ellis-event-an-unfinished-sketch' }),
    pool('post-wrong-color', 'postEvent', { completedEventIds: ['ellis-event-the-wrong-color'], recentEventIds: ['ellis-event-the-wrong-color'] }, 91, [
      'The green sky is still framed exactly as it dried. Two other painters have copied the color since.',
      'I told a stranger the sky was supposed to look like that without hesitating over the sentence this time.',
      'Nobody has complained about the strange colors yet. Someone bought one, which surprised us both.',
      'You still ask before I do whether a piece needs fixing. I have started expecting the question.',
      'The traditional sketch I almost submitted instead has a name now, unofficially. I am not proud of it, but it stuck around.',
      'I do not soften a strange choice into "a phase" anymore. It costs a little comfort and keeps the work honest.',
      'Another painter asked how I decide what to leave alone. I gave her the short version, then the long one.',
      'The art stall has three unusual pieces up now instead of one, because nobody stopped me after the first.',
      'You stood beside me for that conversation with the regular. I still glance over out of habit.',
      'Smeargle refuses to paint blue skies at all now. I have started trusting his opinion on the matter.'
    ], { acknowledgesEventId: 'ellis-event-the-wrong-color' }),
    pool('post-opening-night', 'postEvent', { completedEventIds: ['ellis-event-opening-night'], recentEventIds: ['ellis-event-opening-night'] }, 92, [
      'The gallery still has the green sky hanging in the same spot. I walk past it like it belongs there, because it does.',
      'I said four sentences to a full room once. I could probably manage five now.',
      'Someone asked about the brushwork and I kept talking past the first answer. Small thing, big relief.',
      'You still ask how a showing actually felt, not just how it went. I have started expecting the better question.',
      'The mixed review from opening night does not sting anymore. Not everyone has to want it.',
      'Another artist asked how I stayed in the room the whole night. I told her the short version, then the long one.',
      'The coat you held that night still has paint on the sleeve. I have not had it cleaned on purpose.',
      'I do not hide behind the display board anymore, not even for the first ten minutes.',
      'Smeargle attended the whole opening without incident, which the gallery owner still finds remarkable.',
      'The next show is already on the calendar. I put my own name on the list this time, first, before anyone asked.'
    ], { acknowledgesEventId: 'ellis-event-opening-night' }),
    pool('post-window-seat', 'postEvent', { completedEventIds: ['ellis-event-the-window-seat'], recentEventIds: ['ellis-event-the-window-seat'] }, 93, [
      'The café sketch is on the wall permanently now, exactly as crowded and uneven as it always was.',
      'I turned down a free "clean up" of the page and did not apologize once for the mess staying.',
      'Someone I do not know added a wobbly second table to the drawing. I let it stay, obviously.',
      'You still ask who added what to the page. I still do not always know, which is sort of the point.',
      'The pencil under the sketch gets used more than I expected. People add things when nobody is watching.',
      'I read your crooked mug drawing before mine some days. That used to feel like losing control of the page.',
      'The café owner calls it "the wall sketch" now, no other name needed. Everyone knows which one.',
      'I do not redraw the crowded parts neatly anymore. Crowded was always the honest version.',
      'Smeargle has added at least one unauthorized cat to the page. Nobody has removed it.',
      'Same table, same page, and for once it is not finished on purpose. I like the plural hands on it.'
    ], { acknowledgesEventId: 'ellis-event-the-window-seat' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'town:gym-steps' }, 70, [
      'You have checked your bag twice. A third check will mostly confirm you can still count to three.',
      'Smeargle keeps watching the gym doors like they might be a canvas. He is not entirely wrong about the drama.',
      'I brought the small sketchbook. If you want to see it after, however it goes, I will have something.',
      'You do not need to look calm in there. You need to look ready, and those are different expressions.',
      'The gym doors look heavier than they are. I checked the hinges while waiting, out of habit.',
      'You may be uncertain and prepared at the same time. I draw that particular expression often.',
      'I cannot go in there with you. I can have a very specific sketch ready for when you come out.',
      'The badge is small, not a verdict. Sorry—that sounded rehearsed because it was.',
      'Go in when you are ready. I will still be here, sketching the door if nothing else.',
      'Whatever happens, the light out here will still be good for drawing when you come back.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'You talk about your matches differently now, less like a list and more like something worth drawing.',
      'Halfway through anything is where you find out which plans were only ever hopeful sketches.',
      'Your expression has changed since we started. Steadier, which is more interesting to draw than confident ever was.',
      'You ask what I actually see in a match now, not just whether you won. Better question.',
      'I hear about your battles from other regulars before you tell me. The stories mostly hold up.',
      'You have started noticing the small details in a room. I take that as a compliment to my influence.',
      'Bring back an ordinary story sometime, not just the badge news. Those are easier to draw, honestly.',
      'You do not need to sound certain about the next gym. Uncertain and prepared can share a sentence, and a sketch.',
      'Smeargle has stopped checking whether you are still around. He just assumes it now.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'town:gym-steps' }, 70, [
      'You came out standing differently than you went in, even tired. That is the part I actually wanted to draw.',
      'Smeargle painted something suspiciously badge-shaped on the courtyard wall within the hour.',
      'The badge is heavier than it looks and lighter than it should be, all at once. Odd thing to sketch.',
      'Tell me the part that nearly went wrong before the part everyone will ask about. I want the real one.',
      'You made a call in there nobody could have drawn for you. That is the part I am proudest of, honestly.',
      'I already have three sketches of your expression from just now. None of them are flattering, and all of them are true.',
      'The gym doors look smaller from this side every time. Funny how that works.',
      'I saved you the good chair by the window, in case today made you want somewhere quiet to sit.',
      'Whatever happened in there, the light out here has not changed at all. Neither have I.'
    ]),
    pool('location-cafe', 'location', { location: 'cafe' }, 60, [
      'The café window has the best light before noon. Everything after that is a compromise I have learned to work with.',
      'That mug does not match the others anymore. I painted the replacement pattern myself, badly, on purpose.',
      'Smeargle has a designated chair here now, mostly because he refused every other option loudly.',
      'The corner table wobbles if you lean on it. I have sketched that wobble more than once out of spite.',
      'Someone spilled coffee on an early page once. I kept the stain; it looks like weather now.',
      'The owner lets me keep a sketchbook behind the counter for slow mornings. It is nearly full.',
      'This seat gets the window light at an angle nothing else in town matches. I am protective of it.',
      'The café changes its mugs more than any building has a right to. I am still adjusting.',
      'You can sit across from me here without being sketched. I will ask first, every time.'
    ]),
    pool('location-art-room', 'location', { location: 'art-room' }, 60, [
      'The art room smells like turpentine and, faintly, whatever Smeargle knocked over this week.',
      'That easel by the far wall has better light than mine. I have never once admitted that out loud until now.',
      'The rejected paintings live on that wall on purpose. I look at them more than the finished ones, honestly.',
      'Someone left a half-finished canvas on the drying rack for two years. Nobody has claimed it or moved it.',
      'Smeargle is not technically allowed in here. He is, in practice, allowed in here.',
      'The paint-stained floor tiles are a kind of record, if you know which color happened which year.',
      'This room has heard most of the doubts I have ever said out loud about my own work.',
      'The window here does not open properly. I have decided the smell of paint thinner is simply part of the room now.',
      'Bring an old shirt if you want to paint beside me. Your sleeves will not survive this room otherwise.'
    ]),
    pool('location-gallery', 'location', { location: 'gallery' }, 60, [
      'The gallery lighting flatters almost nothing honestly. I have strong opinions about the track lighting specifically.',
      'That corner by the door is where nervous artists hide. I have personal, extensive experience with that corner.',
      'The frames here cost more than most of the paintings inside them. I try not to think about that too hard.',
      'Smeargle attended one opening and behaved, which the gallery owner still brings up unprompted.',
      'The quiet room upstairs is for looking properly, not talking. I go there when the main room gets loud.',
      'This bench has the best sightline to three paintings at once. I did not choose my seat here by accident.',
      'The guest book fills up with names I do not recognize and, occasionally, small drawn hearts.',
      'I still get nervous walking in here, even when nothing of mine is on the wall.',
      'The gallery closes late on show nights. The walk home after is when the whole evening actually settles.'
    ]),
    pool('location-courtyard', 'location', { location: 'courtyard' }, 60, [
      'The courtyard wall still has the small border Smeargle was allowed to keep. He considers it a great victory.',
      'That bench gets full sun until noon, then none at all. I have timed several sketches around this fact.',
      'The washed-off mural left a faint shadow of itself on the brick. I like that it did not disappear cleanly.',
      'Children chalk on the courtyard stones most weekends now. Smeargle supervises with excessive enthusiasm.',
      'The courtyard is where I learned that permission matters more than the quality of the painting.',
      'That drainpipe has been half-painted for a year. I have decided it is finished, on purpose.',
      'The café spills out here on warm days. It is the loudest place I still manage to concentrate in.',
      'I keep a photograph of the mural before it was washed off. It existed. That is enough of a record.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am not in a state to talk about the work right now. Ask me again once I have stopped pacing the room.',
      'A piece did not go the way I wanted today. I would rather say that plainly than pretend otherwise.',
      'I need quiet, not feedback, for a few minutes. You can stay, just do not critique anything yet.',
      'Smeargle is hiding under the drying rack. That is usually an accurate read on the studio.',
      'I left a piece unfinished today and I am still annoyed about it, even knowing that was the right call.',
      'Give me a minute before you ask what happened. I am still deciding how much of it was actually my fault.',
      'I heard the compliment. I am still upset about the rest of it. Both of those are allowed to be true.',
      'We can talk about the painting later. Right now I would rather just sit with it quietly.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'Everything on today\'s page went exactly where I wanted, which happens rarely enough to mention.',
      'Smeargle found a sunny patch of floor and has not moved from it in an hour. Sensible creature.',
      'I finished a piece early and did not immediately start another. Restful, honestly, for once.',
      'Nobody critiqued anything today, nothing needed redoing, and the coffee was good. Fine day, plainly.',
      'The sketchbook has nothing but pages I actually like right now. I am enjoying it while it lasts.',
      'I sat at the gallery for an hour doing absolutely nothing useful. Recommended, occasionally.',
      'The new regular actually asked good questions about the work this week. Small thing, real relief.',
      'I am in a good mood and have no particular reason. I am choosing not to examine it too closely.'
    ]),
    pool('rumor-gallery', 'recentMoodRumor', { worldFlags: ['rumor:the-gallery-show'] }, 78, [
      'The rumor says I refused to hang anything at the next show out of principle. I am just still deciding, which is different.',
      'Someone is telling people Smeargle painted half the collection. He contributed exactly one unauthorized wall.',
      'The exaggerated version has me shouting at the gallery owner. The real version was one very quiet sentence.',
      'People keep asking if the green sky sold. I tell them the honest answer, which is more interesting than the rumor.',
      'The café version says I never let anyone see unfinished work. You are living evidence against that one.',
      'Someone credited the whole opening night to confidence. Most of it was just staying in the room.',
      'I will correct the story about the show and let the rest become whatever it becomes.'
    ]),
    pool('item-pressedflower', 'itemPokemon', { itemIds: ['pressedFlower'] }, 72, [
      'That pressed flower has the date pencilled under it. Whoever made that took the same kind of care I try to.',
      'Keep that flat in a book somewhere. Route flowers curl the moment you stop paying attention to them.',
      'I have sketched a few of those pressed pieces. The paper yellows in a way that is honestly better than white.',
      'That is proper art-supply-grade pressing, not the flatten-it-under-a-boot method most people use.',
      'You carry that like you understand it is fragile. Good. Most people just fold it into a pocket.',
      'I would frame that rather than keep it loose. Something that careful deserves the extra glass.',
      'The place and date pencilled on that are half the piece, honestly. I would not erase that part.',
      'Keep it out of direct light if you want the color to last. I learned that one the hard way, with paint.',
      'That kind of handmade paper takes ink differently. I have ruined at least two testing that theory.',
      'Someone took real care pressing that. I recognize the patience it takes, even in something small.'
    ]),
    pool('pokemon-smeargle', 'itemPokemon', { pokemonSeen: [235] }, 73, [
      'Smeargle finished a mural on the shed door before I even noticed he had started. I have stopped leaving blank surfaces unattended near him.',
      'He paints with his tail, which should not work as well as it does. I have stopped questioning it.',
      'Smeargle can copy almost anything he sees a move do. His taste in when to use that is questionable.',
      'He steals hats from people he has decided to like. Consider it a compliment, of sorts.',
      'Smeargle sleeps under whatever he painted most recently, like a small, smug gallery guard.',
      'He is not a reliable art critic. He is, however, an enthusiastic one, which counts for something.',
      'Smeargle has strong opinions about which walls deserve improvement. The courtyard incident was one of many.',
      'He recognizes your footsteps now and starts hiding the worst paintings preemptively. Progress, of a sort.',
      'Smeargle\'s tail is never quite clean. I have stopped trying to keep the studio spotless around him.',
      'He approves of nearly everything I paint, which makes him a terrible critic and a good companion.'
    ]),
    pool('relationship-june', 'relationships', { relationshipIds: ['june'] }, 35, [
      'June brings me landscape sketches instead of souvenirs now. Turns out that is the better trade.',
      'I never ask June to slow down for a view. She starts walking again the moment I look up from the page.',
      'June said my map sketches were more honest than most paintings. I have decided to take that as a real compliment.',
      'We argue, gently, about whether a view is worth the climb. I usually win by drawing it anyway.',
      'June brought me a sketch of a washed-out crossing before she had even finished the trail report.',
      'I do not explain a drawing to June the way I do to other people. She sees it differently, and that is fine.',
      'June asked what the blank corner of her old map looked like. I drew it for her, softer than she described it.',
      'We compare notes after every trip she guides: hers are directions, mine are the color of the light. Both matter.',
      'June never once asked me to finish a sketch before she was ready to see it. I extend her the same patience.',
      'I trust June with the pieces I would not show a gallery. She keeps them exactly that quiet.',
      'June never asks if a drawing is finished. She asks if I am done looking at it, which is a better question.',
      'I sketch June\'s routes without ever having walked them. She says I get the light right anyway.'
    ]),
    pool('rare-window-seat', 'rare', { location: 'gallery', completedEventIds: ['ellis-event-the-window-seat'], pokemonCaught: [235], minStage: 'trusted' }, 110, [
      'Your Smeargle and June\'s Eevee are both asleep on the café sketch page, right on top of the wobbly second table.',
      'The frame, the finished-on-purpose imperfect page, and both our names on the little card. I did not plan this, but I will take it.',
      'Smeargle approves of this table arrangement more than any gallery opening I have ever hosted.',
      'I have shown a lot of people this sketch. Showing it to you, now, with everyone\'s hands already on it, is different.',
      'Sit here a while. Nothing about this page needs finishing today, and for once neither do I.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'Same seat, same question in your expression. Yes, I am still drawing something.',
      'Smeargle stopped hiding the sketchbook from you specifically. You have passed whatever test that was.',
      'I already told you about the green sky. It has not changed its answer since yesterday.',
      'You know where the spare pencils are. Help yourself; that is what the shelf is for.',
      'Art talk, quiet company, or just sitting while I draw? All three are still available.',
      'Nothing dramatic happened since we last talked. I saved the small details anyway, because you would ask.',
      'You keep coming back to this window. I have stopped being surprised and started just expecting it.',
      'Same question, same honest answer: ask what I am working on, not what it is supposed to be.',
      'I have a piece in mind involving you, but it can wait until after whatever you actually came to say.',
      'Come sit. We have done this enough times that the invitation does not need saying anymore.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.ellis = D;

  var trainer = (window.TRAINERS || []).find(function (item) { return item.id === 'ellis'; });
  if (trainer) trainer.heartEventIds = (window.ELLIS_ACTIVE_HEART_EVENT_IDS || []).slice();

  function appendBeats(eventId, beats) {
    var groups = (window.EVENT_BEATS && window.EVENT_BEATS.ellis) || [];
    var group = groups.find(function (item) { return item.sceneId === eventId; });
    if (group) Array.prototype.push.apply(group, beats);
  }
  appendBeats('ellis-event-an-unfinished-sketch', [
    { s: 'Ellis sets the whole sketchbook on the table this time, spine toward you, and does not turn it away when you sit down.', c: [['Ask to look through it slowly.', 'You go page by page. Ellis narrates only when you stop; otherwise they let the drawings answer for themselves.', 12], ['Wait for them to offer a page.', 'They turn to a nearly-finished one and slide it over without being asked twice.', 12]] },
    { s: 'For the first time, Ellis starts a new sketch with you sitting right there, pencil moving before they can decide against it.', c: [['Stay quiet and let them work.', 'The page fills slowly. They do not apologize once for the parts that are still rough.', 15], ['Ask what they are drawing before it is clear.', '"Guess." You are wrong twice. The third guess is close enough that they laugh.', 15]] },
    { s: 'Ellis leaves an unfinished page with you overnight for the first time, saying only, "Do not finish it. Just keep it safe."', c: [['Return it exactly as it was.', 'They check the corner, find it untouched, and look oddly relieved.', 15], ['Ask if you can add one small mark.', '"One." You add a single line. They study it for a long moment, then keep the mark in.', 15]] }
  ]);
  appendBeats('ellis-event-the-wrong-color', [
    { s: 'A regular at the next table leans over uninvited. "You know skies are usually blue, right?" Ellis does not look up from the brush.', c: [['Wait to see how Ellis answers.', '"I know. This one is not usually." They keep painting, unbothered.', 12], ['Change the subject for them.', 'You ask the regular about their own order instead. Ellis mouths a silent thank-you and keeps painting.', 12]] },
    { s: 'The gallery coordinator suggests Ellis bring "something a bit more traditional" alongside the odd one. Ellis considers it for exactly one breath.', c: [['Ask which one Ellis actually wants to bring.', '"Just the green one." They say it before finishing the question.', 15], ['Suggest bringing both, to be safe.', '"No. If I hedge, it stops being mine." They put the traditional sketch away.', 15]] },
    { s: 'The green sky ends up framed exactly as it was mixed, leaves and all, with no correction anywhere on the canvas.', c: [['Ask if they ever considered fixing it.', '"Every day it dried. I did not, though. That is the part I am proud of."', 15], ['Say the leaves were the best part.', '"So do I," Ellis says, "which is why they are still there."', 15]] }
  ]);
  appendBeats('ellis-event-opening-night', [
    { s: 'A visitor says the green sky painting is "interesting, not really my taste" and moves on before Ellis can respond.', c: [['Ask how that landed.', '"Fine, actually. Not everyone has to want it." They sound like they mean it, mostly.', 12], ['Point out who did love it.', 'Ellis lists two people who stopped longest, unprompted. Small comfort, real one.', 12]] },
    { s: 'The gallery owner asks if Ellis will say a few words to the room before the doors close. Ellis goes very still.', c: [['Say you will stand right beside them.', 'They say four sentences, quietly, and do not look at their shoes once.', 15], ['Say they do not have to if they do not want to.', '"I want to. I am just scared." They go up anyway.', 15]] },
    { s: 'The lights come up at closing and Ellis is still in the room, not by the door, not already leaving.', c: [['Ask how it felt to stay the whole time.', '"Loud, then quiet, then fine. In that order, mostly."', 15], ['Say you noticed they did not disappear early.', '"I noticed too." They sound almost surprised at themself.', 15]] }
  ]);
  appendBeats('ellis-event-the-window-seat', [
    { s: 'More hands have added to the café sketch since you last looked. A wobbly second table appears where there was none before. Ellis has not smoothed any of it out.', c: [['Ask who added the new table.', '"Someone I do not even know well. I let them anyway."', 12], ['Add something small yourself.', 'You draw a crooked mug. Ellis pins the page back up without a single correction.', 12]] },
    { s: 'A visiting artist offers to "clean up" the crowded café sketch for Ellis, free of charge. Ellis looks at the page for a long moment.', c: [['Ask Ellis what they want to say.', '"No, but thank you." They say it kindly and mean every word of the refusal.', 15], ['Say the mess is the whole point.', '"Exactly that." Ellis pins the page back exactly where it was.', 15]] },
    { s: 'The café owner asks if the sketch can stay on the wall permanently, exactly as crowded and uneven as it already is.', c: [['Say it belongs there like that.', '"Good," Ellis says. "It was never supposed to be finished."', 15], ['Ask if Ellis will keep adding to it.', '"Only if other people do too." They leave a pencil on the little shelf beneath it.', 15]] }
  ]);

  if (typeof window.labelEventBeatIds === 'function') window.labelEventBeatIds();

  function markOutcome(eventId, beatIndex, choiceIndex, flag) {
    var group = ((window.EVENT_BEATS || {}).ellis || []).find(function (item) { return item.sceneId === eventId; });
    var choice = group && group[beatIndex] && group[beatIndex].c[choiceIndex];
    if (choice) choice.outcomeFlags = [flag];
  }
  markOutcome('ellis-event-an-unfinished-sketch', 4, 0, 'watched-unfinished');
  markOutcome('ellis-event-the-wrong-color', 4, 0, 'kept-the-strange-version');
  markOutcome('ellis-event-opening-night', 4, 0, 'spoke-to-the-room');
  markOutcome('ellis-event-the-window-seat', 4, 0, 'kept-it-imperfect');

  if (trainer && window.CORE_CAST_PRODUCTION && CORE_CAST_PRODUCTION.ellis) {
    CORE_CAST_PRODUCTION.ellis.eventInventory.forEach(function (record) {
      var scene = trainer.events.find(function (event) { return event.id === record.eventId; });
      var group = ((window.EVENT_BEATS || {}).ellis || []).find(function (item) { return item.sceneId === record.eventId; }) || [];
      record.beatIds = [scene.beatId].concat(group.map(function (beat) { return beat.id; }));
      record.choiceIds = (scene[3] || []).map(function (choice) { return choice.id; });
      group.forEach(function (beat) { record.choiceIds = record.choiceIds.concat(beat.c.map(function (choice) { return choice.id; })); });
    });
  }
})();
