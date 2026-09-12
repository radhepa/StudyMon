/* Phase 4 character batch: Mira. Every string is a complete contextual
   response; categories count responses rather than fragments. */
(function () {
  function pool(id, category, when, priority, lines, extra) {
    var value = { id: 'mira-dialogue-' + id, category: category, when: when || {}, priority: priority || 0, lines: lines };
    if (extra) Object.keys(extra).forEach(function (key) { value[key] = extra[key]; });
    return value;
  }

  var D = [
    pool('first-meeting', 'firstMeeting', { firstMeeting: true }, 120, [
      'Could you take the bottom of this pot? Good. I am Mira; introductions are easier when nothing is falling.',
      'Welcome. Mind the thyme by your left boot; it has only just forgiven the wheelbarrow.',
      'I am Mira, and the Oddish inside that watering can is pretending we have never met.',
      'You found the Center garden. That makes you either observant or in need of mint tea.',
      'There is a clean cup on the shelf and a muddy chair beside it. Choose according to your standards.',
      'Before you offer, I can carry this. I would still enjoy the company to the gate.',
      'The path is narrow because the squash ignored my drawing. We work around each other here.',
      'I saved one empty pot for whoever arrived next. Today that seems to be you.',
      'Oddish likes your shoelaces. She is curious, not helpful, whatever she claims.',
      'You need not know anything about gardens to sit in one. Come in.'
    ]),
    pool('stage-acquaintance', 'friendshipStages', { stage: 'acquaintance' }, 40, [
      'The mint is spreading again. If you want some, take roots as well as leaves.',
      'Your pot is by the path. I left the watering to you, even when the soil looked dry.',
      'Oddish remembers your bag because it once contained an apple.',
      'The bench is damp, but the upturned crate is perfectly respectable seating.',
      'I made too much tea. That is an invitation, not an emergency.',
      'Please latch the gate behind you. Warm welcomes and firm fences can coexist.',
      'Those seedlings look untidy because seedlings are untidy. They are doing well.',
      'If you pass the market, tell the honey seller I found her blue jar.',
      'You may pull the little weeds by the stones. The tall purple one belongs there.',
      'There is no task waiting for you today. You can simply stay a moment.'
    ]),
    pool('stage-recognition', 'friendshipStages', { stage: 'recognition' }, 40, [
      'I heard your step and poured the second cup before checking who it was. Fortunately, I was right.',
      'Your plant has a new leaf. I did not water it for you, though I considered meddling.',
      'Oddish buried one glove and returned the other as if that solved everything.',
      'The beans need tying up. Would you rather help, watch, or tell me about your day?',
      'I kept the chipped cup because you always choose it first.',
      'The riverside soil is still damp. We could look for cuttings without taking any.',
      'I said no to three extra baskets this morning. The word gets easier with use.',
      'Your name is on the watering chart now, in your handwriting rather than mine.',
      'Sit where the rosemary smells strongest. It improves most ordinary complaints.',
      'You notice what needs doing, and you are learning to ask before doing it.'
    ]),
    pool('stage-comfortable', 'friendshipStages', { stage: 'comfortable' }, 40, [
      'I have lost my gloves again. Check the obvious places while I check inside the bread box.',
      'Your pot is leaning toward the path, as though it expects you.',
      'Kern is bringing crates later. I promised to let him carry exactly half.',
      'I need an honest opinion: does the nettle soup taste green or merely hostile?',
      'Oddish moved every label one row east. We are identifying seedlings by character now.',
      'I can spare an hour for the river, provided neither of us turns it into an errand.',
      'You may tell me I am fussing. Say what I am fussing about so I know you mean it.',
      'The garden managed yesterday without me. I am trying to sound pleased instead of offended.',
      'There is bread under the cloth. Take the end piece; I know you like it.',
      'We can work quietly today. Comfortable silence is still company.'
    ]),
    pool('stage-beginning', 'friendshipStages', { stage: 'beginning' }, 40, [
      'I nearly agreed to host another supper, then remembered I wanted an evening of my own.',
      'Will you water the south bed tomorrow? I am asking instead of arranging it invisibly.',
      'The greenhouse drawing is back on the table. This version has other names beside mine.',
      'Oddish is sulking because I closed the seed cupboard. Boundaries are unpopular before lunch.',
      'I saved you the last honey biscuit without inventing a reason.',
      'Tell me if you need help, and tell me if you only need a chair.',
      'I used to think being needed and being loved would feel the same. They do not.',
      'Kern brought lunch and refused to accept a task in exchange. Very suspicious behavior.',
      'The unruly bed is flowering. I did nothing to improve it, which may be why.',
      'Stay through closing? I would like the walk home to be shared.'
    ]),
    pool('stage-friend', 'friendshipStages', { stage: 'friend' }, 40, [
      'I told the committee the garden gets smaller unless the helper list gets longer.',
      'Your key is on the blue string. The red string is Oddish-proof in theory.',
      'I can ask you for help without offering tea as payment. There will still be tea.',
      'The first peas are ready. Take some now, before I distribute all of them politely.',
      'You know which bed I leave wild. Thank you for never straightening it.',
      'Kern says I hover. I told him he eats lunch standing up. We reached a useful truce.',
      'I was cross yesterday and did not disguise it as tiredness. Progress can be inelegant.',
      'Oddish waits by the gate when your usual visiting day comes around.',
      'The greenhouse needs a shelf, but today I would rather go to the river.',
      'You are welcome when I am generous and when I have nothing to give.'
    ]),
    pool('stage-trusted', 'friendshipStages', { stage: 'trusted' }, 40, [
      'I left the committee meeting before cleanup. Four capable adults remained, and the roof stayed up.',
      'Take the garden ledger home. I trust your notes and your crossed-out mistakes.',
      'I need you to hear this without solving it: I am tired of being everyone’s easy yes.',
      'The greenhouse can open while I am away. That sentence no longer frightens me.',
      'Oddish dug up the private bed. I cried, replanted half, and left half changed.',
      'Kern asked me to rest, and I asked him to sit down while asking. Fair is fair.',
      'If I become quiet at supper, do not turn me into the host again.',
      'Your plant has survived my help and my restraint. Both mattered.',
      'I put my own name first on next week’s free afternoon.',
      'You may use the key when you need shelter, not only when the beds need water.'
    ]),
    pool('stage-close', 'friendshipStages', { stage: 'close' }, 40, [
      'The kettle is already on. At this point, asking whether you will stay would be theater.',
      'Our first pot needs a larger corner. I refuse to call that a problem.',
      'You know the garden well enough to disagree with me in it.',
      'I can leave the gate in your hands without making a second list.',
      'Oddish considers your coat communal property. I have failed to establish a boundary there.',
      'The town maintains the beds now. I still come because I want to.',
      'I kept one blue pane above our bench; shared things may still have private meanings.',
      'When I say no, you hear the whole sentence and remain beside me.',
      'Let us take tea to the river and leave every useful tool at home.',
      'You are part of what grows here, which is practical language for something very dear.'
    ]),
    pool('post-pot', 'postEvent', { completedEventIds: ['mira-event-one-empty-pot'], recentEventIds: ['mira-event-one-empty-pot'] }, 90, [
      'The first shoot is up. I checked twice, which is fewer times than Oddish did.',
      'Your label survived the rain, though the last letter now has a tail.',
      'I almost watered your pot this morning. Then I remembered whose responsibility it is.',
      'The sunny patch was the right choice; the leaves turn toward the path by noon.',
      'Our seed has become a plant without asking either of us for permission.',
      'I wrote the planting date down, but the crooked label remembers it better.',
      'Oddish sits beside the pot as if she personally arranged the germination.',
      'There is room beside your seedling, but I am leaving it room rather than filling it.',
      'You came back. I hoped you would, and I did not water in your place.',
      'The pot is still small enough to carry and already too important to move casually.'
    ], { acknowledgesEventId: 'mira-event-one-empty-pot' }),
    pool('post-water', 'postEvent', { completedEventIds: ['mira-event-too-much-water'], recentEventIds: ['mira-event-too-much-water'] }, 91, [
      'The watering chart has survived a full week and three Oddish footprints.',
      'I asked before touching your seedlings today. They had no opinion, so I waited for you.',
      'The drooping leaves recovered once we stopped rescuing them from each other.',
      'I crossed my name off your row and felt oddly brave about it.',
      'One can was enough this morning. The second stayed full, and nothing terrible happened.',
      'Oddish cannot read the chart, but she respects the pencil as a snack hazard.',
      'I am practicing the phrase “I thought you had it.” It saves remarkable amounts of water.',
      'The soil tells the truth when we stop pressing it every hour.',
      'We made a mistake together without appointing a guilty person.',
      'Your plants needed air more than attention. I understand the temptation.'
    ], { acknowledgesEventId: 'mira-event-too-much-water' }),
    pool('post-table', 'postEvent', { completedEventIds: ['mira-event-a-table-for-six'], recentEventIds: ['mira-event-a-table-for-six'] }, 92, [
      'Four baskets went out, two neighbors waited, and everyone still ate supper.',
      'I counted before promising today. The answer was three, not every person who asked.',
      'The honey jar came back with a note offering help next week.',
      'I said the herbs were short at the meeting, plainly and before anyone thanked me.',
      'Two neighbors brought their own baskets this time. Useful embarrassment has a season.',
      'The table seats six only when six people carry something to it.',
      'I kept enough mint for myself. It felt selfish for almost a minute.',
      'The visitor returned for seeds and listened when I explained the limits.',
      'Nobody was angry about waiting; I had prepared for a storm that did not exist.',
      'My hand still says “count first,” though the ink has reached my wrist.'
    ], { acknowledgesEventId: 'mira-event-a-table-for-six' }),
    pool('post-key', 'postEvent', { completedEventIds: ['mira-event-a-key-on-a-string'], recentEventIds: ['mira-event-a-key-on-a-string'] }, 93, [
      'Three names are on the greenhouse rota now, and mine is not written larger.',
      'Your key turned up beside the blue pane. Oddish denies moving it.',
      'The greenhouse opened yesterday while I was still at the market.',
      'Someone repaired the loose shelf without waiting for me to notice it.',
      'I sat inside for an hour and completed no useful task at all.',
      'The mismatched windows make six different colors on the floor after rain.',
      'Kern has the heavy-lifting key; I have finally stopped hiding the heavy things first.',
      'A neighbor left seedlings on the shared bench with their own clear label.',
      'The spare key stays by the door because trust needs somewhere practical to live.',
      'It is our greenhouse now. I can say that without hearing my work disappear.'
    ], { acknowledgesEventId: 'mira-event-a-key-on-a-string' }),
    pool('pre-gym', 'gymStory', { homeBadgeBand: 'early', location: 'town:gym-steps' }, 70, [
      'Your shoulders are nearly touching your ears. Put them down before you go inside.',
      'I brought mint water, not advice. The bottle is yours if you want it.',
      'A first challenge is allowed to feel large without becoming a verdict.',
      'Your team keeps looking at the door and then at you. Give them an honest face.',
      'I will be in the garden afterward, whether you bring a badge or a difficult story.',
      'The steps are warmer on this side. Sit until your hands stop hurrying.',
      'Do not promise me a win. Promise everyone gets water when it is over.',
      'You packed three remedies and no lunch. Take this bread before heroism becomes dizziness.',
      'Oddish wanted to come, but her encouragement involves shouting at doors.',
      'Go when you are ready, not when the people behind you begin to fidget.'
    ]),
    pool('story-middle', 'gymStory', { homeBadgeBand: 'middle' }, 50, [
      'You have traveled far enough that the dust in your bag comes from several roads.',
      'The middle badges look less shiny because you touch them when deciding where to go.',
      'Your team has grown around habits you did not have when we met.',
      'Everyone asks what comes next. You may finish your tea before answering.',
      'Long routes require someone who remembers the walk home as carefully as the destination.',
      'The town speaks of you as if you are always departing. It notices every return too.',
      'Bring back one ordinary thing from the next place, not only proof you conquered it.',
      'You are experienced enough to change your mind without calling it failure.',
      'There is still a place on the watering chart while your journeys get larger.',
      'Halfway is a real place. You need not treat it like a hallway.'
    ]),
    pool('post-gym', 'gymStory', { homeBadgeBand: 'late', location: 'town:gym-steps' }, 70, [
      'You came out smiling before anyone saw the badge. Keep that part.',
      'The steps remember your first challenge even if your boots do not.',
      'Your team looks tired and pleased. Those states can share a bench.',
      'People will want the grand version. Tell me the small turn that mattered.',
      'I saved the last pear for after the challenge, regardless of the result.',
      'More badges have not made you too important to carry empty cups inside.',
      'The garden heard the cheering. Oddish has assumed it concerned her.',
      'You know how to win now; remember how to arrive somewhere gently afterward.',
      'Let the town celebrate you. Receiving care is also community work.',
      'Tomorrow can ask what is next. Tonight has soup and enough chairs.'
    ]),
    pool('location-garden', 'location', { location: 'center-garden' }, 60, [
      'The thyme by the stones is for walking on; it releases its scent when stepped upon.',
      'Please leave the fallen leaves. The beetles are using them more wisely than we would.',
      'That empty patch is resting, not neglected. Soil deserves a season without demands.',
      'Oddish planted those bulbs upside down. Most of them corrected the arrangement.',
      'The south bench catches afternoon warmth and every interesting piece of gossip.',
      'Someone tied the beans with blue ribbon. It is impractical and very cheerful.',
      'Take rosemary from the older bush; the young one is still deciding its shape.',
      'The gate sticks after rain. Lift first, then push, and spare us both the noise.',
      'Your row has fewer weeds because three children adopted it yesterday.',
      'I know every bed here, including the one that does better when I walk past.'
    ]),
    pool('location-market', 'location', { location: 'market' }, 60, [
      'The best apples are scarred from the branch. The seller keeps them under the table.',
      'We need twine, onions, and nothing from the mysterious-seed basket.',
      'That herb is wilted, not rare. A silver label does not change its thirst.',
      'The honey seller saved the dark jar for us, which means she expects tea.',
      'Ask before sampling the berries. Last week Oddish misunderstood the arrangement.',
      'I brought exact coins and will still come home with an unnecessary clay pot.',
      'Market noise makes it easier to say no; nobody expects a long explanation.',
      'The seed packets in plain paper have the clearest planting notes.',
      'Kern is buying lunch somewhere nearby and pretending a pastry counts twice.',
      'Let us finish the list before the flower stall weakens my judgment.'
    ]),
    pool('location-river', 'location', { location: 'riverside' }, 60, [
      'The water is high enough that we should admire the far-bank mint from here.',
      'Those cuttings belong behind a fence. Looking is permitted; taking is not.',
      'The flat stone stays warm long after the path cools.',
      'Oddish likes the mud and dislikes every consequence of entering it.',
      'Willow roots hold this bank together more patiently than the old wall did.',
      'We came without baskets on purpose. Not every walk needs to provide something.',
      'A kingfisher uses that branch near noon. We can wait without speaking.',
      'The reeds sound dry even when their feet are underwater.',
      'I bring scissors out of habit. Today they can remain closed.',
      'Sit where the path widens; bicycles take the corner too quickly.'
    ]),
    pool('location-shed', 'location', { location: 'potting-shed' }, 60, [
      'The roof leaks into the blue bucket precisely enough to seem intentional.',
      'My gloves are under the seed catalog, where I already looked twice.',
      'The clay pots go on the low shelf because ambition is not stronger than gravity.',
      'Rain on this roof makes every pause sound occupied.',
      'Oddish has a nest behind the compost sacks and no authority to keep one there.',
      'The kettle takes longer here. The little stove resents being hurried.',
      'That greenhouse sketch is the smallest version, which is why it may become real.',
      'You can shake the dirt from that mat outside; inside merely rearranges it.',
      'The dry bench is narrow, but we have shared less sensible seats.',
      'I keep bent labels in this jar because old handwriting still answers questions.'
    ]),
    pool('mood-tense', 'recentMoodRumor', { mood: 'tense' }, 75, [
      'I am upset, and I would rather say so than pour tea around it.',
      'Please do not weed while we argue. Busy hands can make an escape look helpful.',
      'I heard your apology. I need time before I know what comes after it.',
      'Oddish is not responsible for the broken tray, and neither are you for my whole mood.',
      'You may stay, but let the quiet belong to both of us for a while.',
      'I said yes when I meant not today. I am correcting the sentence now.',
      'Gentleness is not agreement. I disagree, gently and completely.',
      'We can finish this conversation without finishing it in one sitting.',
      'The garden does not need us to be cheerful in order to keep growing.',
      'I am not punishing you by needing space. I will tell you when I am ready.'
    ]),
    pool('mood-content', 'recentMoodRumor', { mood: 'content' }, 55, [
      'The rain stopped, the kettle boiled, and nobody needs anything urgently.',
      'Oddish fell asleep in the empty basket before I could fill it.',
      'All four watering shifts happened without a reminder from me.',
      'The first tomato split, so we ate it over the sink. Perfect timing.',
      'I have dirt under every fingernail and no wish to improve the afternoon.',
      'The garden is noisy with bees and quiet with people today.',
      'Kern brought lunch before I could ask whether he had eaten.',
      'Your plant has two new leaves and no dramatic explanation.',
      'Sit down. The bench is warm and the chores can see themselves out.',
      'Nothing was rescued today. Several things went well anyway.'
    ]),
    pool('rumor-greenhouse', 'recentMoodRumor', { worldFlags: ['rumor:greenhouse-keys'] }, 78, [
      'The rumor says I gave away the greenhouse. Shared keys are not surrender papers.',
      'Someone claims Oddish chooses keyholders. She chooses pockets containing crumbs.',
      'The market version has twelve keys; we made four, and one still sticks.',
      'People are worried the door will stay open. People can learn to close a door.',
      'I would rather correct the rota than correct every story told about it.',
      'The useful part of the rumor is that three neighbors finally volunteered.',
      'Kern heard I had retired. He found me moving compost and seemed unconvinced.',
      'A shared greenhouse still has rules, especially the one about clean tools.',
      'Let them talk until the seedlings need potting. Work makes better invitations.',
      'Nobody stole my place. We made more places and kept mine among them.'
    ]),
    pool('item-tea', 'itemPokemon', { itemIds: ['teaTin'] }, 72, [
      'That tea tin smells of bergamot through the lid. Keep it away from the seed drawer.',
      'You brought tea, so I will contribute hot water and unreasonable cup choices.',
      'The tin is dented now. Good; objects look calmer after they stop being precious.',
      'Steep that blend briefly unless you prefer drinking a hedge.',
      'Kern likes it strong and then complains it is strong. Pour his first.',
      'There is enough in that tin for three quiet afternoons.',
      'Oddish dislikes the leaves and adores the paper label.',
      'Set it on the high shelf; damp soil improves many things, but not tea.',
      'The lid clicks properly when it is closed. I checked after your last visit.',
      'Bring the tin to the river next time. I have two cups that travel well.'
    ]),
    pool('pokemon-oddish', 'itemPokemon', { pokemonSeen: [43] }, 73, [
      'Oddish is not lost; she is under the leaves, listening to us look for her.',
      'You have seen how she tests fresh soil with both feet before settling.',
      'She pulls weeds only when their roots are more entertaining than mine.',
      'Oddish makes accidents at full confidence and apologies at a distance.',
      'Your team gives her room without treating her like garden equipment.',
      'She sleeps more deeply after rain, with soil still between her leaves.',
      'Do not lift her by the leaves. Ask, and she may climb into your arms.',
      'Oddish chose the wild bed because nobody tells it which direction to grow.',
      'She knows every visitor who has blamed her and every one who cleaned up beside her.',
      'The garden is her home and her work, but she is allowed to be idle in both.'
    ]),
    pool('relationship-kern', 'relationships', { relationshipIds: ['aide'] }, 35, [
      'Kern brought the heavy crates and accepted half a sandwich without negotiating.',
      'I remind Kern to eat; he reminds me that sitting down is available to gardeners too.',
      'He labels lab drawers as if future confusion is a personal enemy.',
      'Kern fixed the shed latch, then let me show him why it sticks after rain.',
      'We have known each other long enough to recognize disguised offers of help.',
      'He carries too much because people ask; I carry too much before they can.',
      'Kern has a field survey plan with his name on the first page. It suits him.',
      'I packed his lunch, and he scheduled my afternoon off. Mutual interference.',
      'He never assumes the garden needs rescuing. He asks which end of the crate is his.',
      'When Kern says he is fine, I offer a chair instead of an argument.',
      'Kern knows which favors are gifts and which ones quietly create another obligation.',
      'We trade care in both directions; otherwise one of us would eventually call it a job.'
    ]),
    pool('rare-blue-pane', 'rare', { location: 'potting-shed', completedEventIds: ['mira-event-a-key-on-a-string'], pokemonCaught: [43], minStage: 'trusted' }, 110, [
      'Your Oddish found mine behind the seed sacks. Apparently the shed has a committee now.',
      'The blue pane colors both Oddish purple at this hour, which they find completely ordinary.',
      'Two Oddish can empty a labeled shelf faster than four adults can restore it.',
      'Your key and mine hang together, but neither of us had to unlock the door today.',
      'The shared rota includes both our names and a muddy mark no one admits making.',
      'Our first pot sits beneath the blue light, with two Oddish asleep beside it.',
      'I once imagined this room finished and empty. I prefer this untidy version.',
      'If both Oddish refuse the watering cans, we are permitted to take the hint.',
      'Leave the spilled seeds until morning. Some surprises deserve a chance.',
      'This is the quiet I wanted: inhabited, shared, and asking nothing of me.'
    ]),
    pool('repeat-talk', 'repeatInteraction', { repeatAtLeast: { talks: 8 } }, 45, [
      'We know each other well enough to skip welcome. Tea, walk, or quiet?',
      'Your cup is on the usual shelf, though Oddish has moved it one place left.',
      'Nothing important happened. I saved the small stories for you.',
      'You may come in without carrying something. We established this several visits ago.',
      'The bench still creaks, the mint still spreads, and I am glad you are here.',
      'I already told you about the gloves. Today I found them in my own pocket.',
      'Same path to the river? We can notice different things this time.',
      'No garden news worth announcing. Sit down anyway.',
      'Oddish heard you at the gate and prepared her most innocent expression.',
      'Stay until the kettle cools. Familiar company does not need a special occasion.'
    ])
  ];

  window.CORE_CAST_DIALOGUE = window.CORE_CAST_DIALOGUE || {};
  window.CORE_CAST_DIALOGUE.mira = D;

  var trainer = (window.TRAINERS || []).find(function (item) { return item.id === 'mira'; });
  if (trainer) trainer.heartEventIds = (window.MIRA_ACTIVE_HEART_EVENT_IDS || []).slice();

  /* Keep every original opening and extra beat stable. Appended beats make the
     four retained scenes substantial without invalidating pending saves. */
  function appendBeats(eventId, beats) {
    var groups = (window.EVENT_BEATS && window.EVENT_BEATS.mira) || [];
    var group = groups.find(function (item) { return item.sceneId === eventId; });
    if (group) Array.prototype.push.apply(group, beats);
  }
  appendBeats('mira-event-one-empty-pot', [
    { s: 'At the next watering, a child reaches for your can. Mira waits for you to answer instead of deciding for you.', c: [['Offer the child the second handle.', 'The three of you walk a crooked circle around the pot and spill only a little.', 10], ['Ask them to fill the bird dish instead.', 'Mira nods. “A real task of their own.” The dish is filled to the brim.', 12]] },
    { s: 'A hot day curls the first leaves. Mira places a shade cloth nearby but does not put it up.', c: [['Use the cloth for the afternoon.', 'You tie it loosely together. The leaves lift before sunset.', 12], ['Wait and check the soil first.', 'The roots are damp. By evening the plant has recovered without more water.', 12]] },
    { s: 'Mira writes both your names in the garden ledger beside one small, living plant.', c: [['Add Oddish as witness.', 'Oddish stamps the page with one muddy foot and perfect timing.', 15], ['Leave room for the next helper.', 'Mira draws a blank line beneath yours. “Then we have started something.”', 15]] }
  ]);
  appendBeats('mira-event-too-much-water', [
    { s: 'The next morning a neighbor waters the row without checking the new chart. Mira takes a breath before speaking.', c: [['Let Mira explain the chart.', 'She is kind and unmistakably firm. The neighbor chooses a different morning.', 12], ['Point to the blank Saturday shift.', 'The neighbor writes a name there and returns the can to its hook.', 12]] },
    { s: 'Oddish tips the full can while everyone is talking. Water runs harmlessly down the path.', c: [['Clean it up without blaming her.', 'Oddish brings a cloth much too small for the job.', 10], ['Ask Oddish to help refill it later.', 'She taps the empty can solemnly, accepting a task rather than a scolding.', 12]] },
    { s: 'Mira erases the tiny notes she had added under everyone else’s names.', c: [['Keep only the weather note.', '“Useful, not watchful.” She leaves one line about the coming heat.', 15], ['Leave the margins empty.', 'The white space bothers her for a moment, then begins to look restful.', 15]] }
  ]);
  appendBeats('mira-event-a-table-for-six', [
    { s: 'At the garden meeting, three more people request weekly baskets. Mira sets her pencil down before answering.', c: [['Wait while she counts aloud.', '“Two baskets, if two people harvest with us.” The room stays quiet long enough to hear her.', 15], ['Offer the current harvest numbers.', 'Mira uses them, then states the limit in her own words.', 12]] },
    { s: 'One neighbor complains that the garden used to provide more. Oddish rustles angrily beneath the table.', c: [['Ask what the neighbor can contribute.', 'After an awkward pause, they offer Saturday mornings and a cart.', 12], ['Let Mira answer the complaint.', '“It provided more of me,” she says. “That is no longer available.”', 15]] },
    { s: 'Six people finally sit down, each with dirt on their hands and something on the table.', c: [['Raise a cup to the new rota.', 'Nobody calls it Mira’s rota. She notices and smiles into her tea.', 15], ['Pass Mira the first plate.', 'She serves herself before checking whether everyone else has enough.', 15]] }
  ]);
  appendBeats('mira-event-a-key-on-a-string', [
    { s: 'Opening morning arrives with a jammed door and four volunteers offering four different repairs.', c: [['Ask Mira which plan she trusts.', 'She names the carpenter’s plan, then hands over the tools.', 12], ['Suggest lifting before pushing.', 'The old trick works. Everyone laughs, including the carpenter.', 10]] },
    { s: 'Kern delivers the final bench, then asks where Mira wants him to put it.', c: [['Let Mira choose her own resting place.', 'She points beneath the blue pane and sits there before anyone can stack supplies on it.', 15], ['Ask Kern where the shared workbench belongs.', 'He chooses the center, where nobody can quietly claim every task.', 12]] },
    { s: 'At dusk, Mira locks the door, then places three more keys on strings beside yours.', c: [['Ask who opens tomorrow.', 'She reads a neighbor’s name from the rota. For once, morning does not belong to her.', 15], ['Leave your key with the others.', 'She returns it gently. “Shared does not mean your place is temporary.”', 15]] }
  ]);

  if (typeof window.labelEventBeatIds === 'function') window.labelEventBeatIds();

  function markOutcome(eventId, beatIndex, choiceIndex, flag) {
    var group = ((window.EVENT_BEATS || {}).mira || []).find(function (item) { return item.sceneId === eventId; });
    var choice = group && group[beatIndex] && group[beatIndex].c[choiceIndex];
    if (choice) choice.outcomeFlags = [flag];
  }
  markOutcome('mira-event-one-empty-pot', 4, 1, 'leave-room');
  markOutcome('mira-event-too-much-water', 3, 0, 'shared-chart');
  markOutcome('mira-event-a-table-for-six', 4, 0, 'shared-rota');
  markOutcome('mira-event-a-key-on-a-string', 4, 1, 'kept-key');

  if (trainer && window.CORE_CAST_PRODUCTION && CORE_CAST_PRODUCTION.mira) {
    CORE_CAST_PRODUCTION.mira.eventInventory.forEach(function (record) {
      var scene = trainer.events.find(function (event) { return event.id === record.eventId; });
      var group = ((window.EVENT_BEATS || {}).mira || []).find(function (item) { return item.sceneId === record.eventId; }) || [];
      record.beatIds = [scene.beatId].concat(group.map(function (beat) { return beat.id; }));
      record.choiceIds = (scene[3] || []).map(function (choice) { return choice.id; });
      group.forEach(function (beat) { record.choiceIds = record.choiceIds.concat(beat.c.map(function (choice) { return choice.id; })); });
    });
  }
})();
