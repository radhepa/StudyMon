/* The Periodic Coast's gym leaders and evening-paper proctors as people who
   stay in the world once the match is over.

   Same contract as js/data/gym-leaders.js (read its header): each profile is
   keyed by the stable cast ID (`chem-gym-<n>`, `chem-boss-<id>`) and carries a
   bio, hangouts (ids from CHEM_LOCATIONS), a signature base-form species, the
   leaders it is connected to (reciprocal, and kept inside the Coast) and the
   eight line pools js/engine/gym-leaders.js reads.

   The lines stay off the course material. They are about the leaders' lives,
   their Pokemon, the Coast and one another: glassware, lighthouses, quarries,
   weather balloons and crystals are fair game, the vocabulary that
   validateGymLeaderRegistry rejects is not. This file loads after
   gym-leaders.js and only adds keys. */
(function () {
  var P = window.GYM_LEADER_PROFILES = window.GYM_LEADER_PROFILES || {};

  /* ---- The Periodic Coast gyms ----------------------------------------- */

  P['chem-gym-1'] = {
    bio: 'Calibrates every flask, burette and rain gauge on Avogadro Landing by hand, and crouches to eye level for anything with a waterline, including puddles.',
    hangouts: ['landing', 'brown'], signature: 599,
    lines: {
      justDefeated: [
        'Steady hands, level eyes. You did not rush the last turn, and Bronzong noticed. It rang once, very quietly. That is applause, from Bronzong.',
        'Good match. Stay a moment while I recheck the cylinders on the shelf. I always do after a close one. They never move. I check anyway.'
      ],
      settled: [
        'Recalibrated forty pieces of glassware this morning. Thirty-nine were perfect. The fortieth had a chip at the lip and is now a very honest vase.',
        'I crouched to read a puddle on the pier yesterday and a ferry passenger asked if I had lost something. I had not. I just like to see where the line sits.',
        'Bronzong hums when the gym is too warm. I keep a little card on the wall of what each hum means. The card is getting long.'
      ],
      laterBadges: [
        'I keep a slim glass by the door and add one drop of coloured water for every badge a challenger I met here goes on to win. Yours is filling up nicely.',
        'You stand differently now. Feet planted, chin level. Whatever you have been doing out on the Coast, keep doing it.'
      ],
      regionCleared: [
        'All thirteen, and the proctors besides. I marked your glass right to the brim and then, very carefully, one drop over. Do not tell anyone I let it spill.'
      ],
      away: [
        'Found me at {place}. Someone told me there was a leaning shelf here. There was. It is level now. I feel much better.',
        'You caught me at {place} with a spirit level in my pocket. I do not go anywhere without it. Klink thinks this is very sensible.'
      ],
      chat: [
        'Evangelista sends me readings from the bluff every morning. I send back notes about how she squints at her barometer. We have done this for nine years.',
        'Klink spin faster when they are pleased and slower when they are sulking. Mine has been spinning very fast since you arrived. Make of that what you will.',
        'My grandmother blew glass on this pier. I still have her first cylinder. Lopsided, slightly green, and the most accurate thing I own.',
        'People think precision is cold. It is the opposite. Getting something exactly right for someone is one of the kindest things you can do.'
      ],
      rematchWin: [
        'Level from the first move to the last. I could not have read it more cleanly myself.',
        'Spot on. Bronzong rang twice that time, which it has never done for anybody.'
      ],
      rematchLoss: [
        'Read that one from a little too high, I think. Everyone does now and then. Crouch down, take another look, and come back.'
      ]
    }
  };

  P['chem-gym-2'] = {
    bio: 'Keeps the gym on Gold Foil Pass almost entirely empty on purpose, hammers gold leaf for the Coast’s sign painters, and owns exactly one chair.',
    hangouts: ['crystal', 'landing'], signature: 299,
    lines: {
      justDefeated: [
        'Most of what I threw at you went straight past, and the bits that did not came straight back. That is a fine way to fight. Sit down. You may have the chair.',
        'Probopass has turned its nose to face you. It only does that for people it has decided to keep track of.'
      ],
      settled: [
        'I gave away another box of things this week. The gym echoes beautifully now. Probopass likes to listen to its own magnets click.',
        'Beat a sheet of gold so thin this morning that the light came through it green. I held it up to the window for an hour. Then I sold it to a sign painter.',
        'A visitor asked where I keep everything. I said, nowhere. That is the point. They looked worried for me. I am perfectly happy.'
      ],
      laterBadges: [
        'I hear your name out on the far side of the pass now. Nosepass keeps turning toward wherever you are. It is a better compass than any I own.',
        'You travel lighter than you did. I can tell from how you walk in. Good. Most of what we carry, we never needed.'
      ],
      regionCleared: [
        'The whole Coast. I have bought a second chair. It is yours. It sits in the middle of the empty floor, and I will not be putting anything else near it.'
      ],
      away: [
        'You found me at {place}. I come here for a crowd now and then. It reminds me why I like my quiet gym so much.',
        'Found me at {place}, leaning on a wall and watching the light. There is a lot of nothing between here and the far side. I find that restful.'
      ],
      chat: [
        'Marie and I trained under the same old keeper in the Hollow. She glows a little when she laughs. Only a little. I have never said so to her face.',
        'Nosepass always points north. I bought a map once to check. It was right and the map was wrong. I kept the Nosepass and gave away the map.',
        'People knock on my door, see the empty room, and assume I have just moved in. I have lived here twenty-two years.',
        'Geodude roll in from the pass and sleep in the corners of the gym. I never tidy them up. They are the closest thing I have to furniture.'
      ],
      rematchWin: [
        'Straight through and out the other side. I would expect nothing less from you now.',
        'You barely touched anything you did not have to. That is the cleanest kind of win.'
      ],
      rematchLoss: [
        'Bounced off that one. It happens to the best of us, more often than we say. Pick yourself up and walk the pass again.'
      ]
    }
  };

  P['chem-gym-3'] = {
    bio: 'Runs the quarry gym on Avogadro’s Quarry, counts everything by weighing it, and has never once lost an argument about how many beans are in a jar.',
    hangouts: ['brown', 'resource'], signature: 50,
    lines: {
      justDefeated: [
        'Weighed and measured, and you came out heavier than me. Donphan agrees. It has curled up in the corner to think about it.',
        'I would shake your hand but mine is covered in quarry dust. Consider it shaken. Well fought, and properly fought.'
      ],
      settled: [
        'The bakery asked how many rolls they sold today. I put the basket on my scale and told them in four seconds. They have started calling me in every evening.',
        'Diglett tunnel under the quarry floor all morning. I hear them before I see them. A little scratching, then a little face, then gone.',
        'Moved eleven tonnes of stone this week. Donphan did most of it. I mostly carried the clipboard and said encouraging things.'
      ],
      laterBadges: [
        'Every time someone tells me you won another badge, I drop one pebble in a jar on my desk. I do not count them. I weigh the jar. It is getting heavy.',
        'You do things in the right order now, I can see it. First the small steps, then the big ones. Good habits outlast talent.'
      ],
      regionCleared: [
        'Done, all of it. I weighed your pebble jar this morning and wrote the number on the lid in paint. That jar is staying on my desk for good.'
      ],
      away: [
        'Found me at {place}. Somebody here owes me a bet about a bag of marbles. I weighed it. I was right. I usually am.',
        'You caught me at {place}, out of the dust for once. Donphan is outside guarding the cart, and very proud of it.'
      ],
      chat: [
        'Lena and I have a running bet about whether pouring or weighing is faster. We have been timing each other for six years. The score is level.',
        'My father ran this quarry and counted the stone in carts. I count it in kilograms. My daughter wants to count it in Diglett. I am not stopping her.',
        'Phanpy follow the carts down to the shore and roll in the shallows. Someone told me that is not what a quarry Pokémon should do. I disagree.',
        'People think counting is slow. Counting one at a time is slow. A good scale counts a thousand things in the time it takes to sneeze.'
      ],
      rematchWin: [
        'Every piece in its place, and the total came out exactly right. That is a well-balanced match.',
        'Heavier than me again. I am going to need a bigger Donphan.'
      ],
      rematchLoss: [
        'Lost track somewhere in the middle there. Go back to the start, take it one cart at a time, and the count will come right.'
      ]
    }
  };

  P['chem-gym-4'] = {
    bio: 'Keeps the gym beside Precipitate Falls, makes tea one patient drop at a time, and can tell from across a room the second a cup turns the right colour.',
    hangouts: ['brown', 'landing'], signature: 747,
    lines: {
      justDefeated: [
        'There. The exact moment it turned. I felt it from here. Tentacruel is drifting in the pool looking very thoughtful. Well matched.',
        'You waited for your moment instead of pouring everything in at once. Most people do not. That is why the falls look so calm from where you stand.'
      ],
      settled: [
        'Made a pot of tea this morning drop by drop. Took forty minutes. Amedeo says I am mad. Amedeo has never tasted it.',
        'The falls run cloudy for a few hours after rain. I sit on the flat rock and watch everything settle to the bottom. It takes the edge off a long day.',
        'Mareanie climbed into the rinse tray again and refused to come out. I washed around it. It seemed to enjoy the attention.'
      ],
      laterBadges: [
        'I hear about you from the ferry every few days now. A little news at a time, drop by drop. I like hearing it that way.',
        'You have learned to slow down at the end of things. I can tell. That last careful bit is where all the difference is.'
      ],
      regionCleared: [
        'Every badge. I made you a cup of tea the slow way the night I heard. It is cold now. I am keeping it on the shelf anyway.'
      ],
      away: [
        'Found me at {place}, sitting very still. Something here is just about to change colour. I can feel it. Wait with me.',
        'You found me at {place}. I needed somewhere that was not the sound of water falling. Lovely, is it not? Ask me again in an hour.'
      ],
      chat: [
        'Raoul brings me cuttings from the marsh and I bring him tea. Neither of us has ever said thank you. We both know.',
        'Tentacool wash up below the falls after storms. I carry them back into the deep pool in a bucket. They sting. I carry them anyway.',
        'My mother used to say: a watched pot will boil eventually, so you may as well watch it properly. I have taken that very seriously.',
        'Amedeo times our bet with a stopwatch. I time it with how many breaths it takes. We have never once agreed on a winner.'
      ],
      rematchWin: [
        'Right on the turn. Not a drop too early, not a drop too late. Beautifully done.',
        'Clear as the falls on a dry morning. I have nothing to add.'
      ],
      rematchLoss: [
        'Went one drop too far that time. Happens to everyone. Rinse out, start fresh, and come back slower.'
      ]
    }
  };

  P['chem-gym-5'] = {
    bio: 'Runs the coffee stall on the rim of the Coffee-Cup Caldera with a thermometer in every mug, and always walks home the long way.',
    hangouts: ['brown', 'resource'], signature: 322,
    lines: {
      justDefeated: [
        'Well, that warmed me up. Magmortar is steaming, which means it enjoyed itself. Have a coffee. It is exactly as hot as it should be. I checked.',
        'You kept your temper and turned up the heat at the same time. That is harder than it looks. Most people manage one or the other.'
      ],
      settled: [
        'Sold ninety-one coffees on the caldera rim this morning. Every one at the right temperature. Two people complained anyway. One was Clausia.',
        'Numel sleep against the warm rocks by the stall. Customers think they are decorations. One tried to put a mug on its back. Numel allowed it.',
        'Walked home through the hills, along the shore and round past the pier last night. Took two hours. Got home just as warm as if I had gone straight.'
      ],
      laterBadges: [
        'Every time your name comes up at the stall, somebody buys a second cup. You are very good for business. Keep winning.',
        'You do not flinch when things heat up now. I can see it in how you stand. Good. The Coast is warmer than people expect.'
      ],
      regionCleared: [
        'The whole Coast. I am naming a blend after you. It is strong, a little smoky, and it takes a while to cool down. That felt right.'
      ],
      away: [
        'Found me at {place}, taking the long way round. It always comes out the same in the end, so I might as well enjoy the scenery.',
        'You caught me at {place} with a flask and a spare mug. Someone always needs warming up. Today it is you.'
      ],
      chat: [
        'Clausia jumps into the frozen lake every morning and then comes to warm up at my stall. She says it is for her health. I say it is for my coffee.',
        'Slugma cluster around the stall on cold evenings. The customers love it. The stall’s wooden legs are less keen.',
        'My grandmother measured coffee by the ladle and heat by the back of her hand. I use a thermometer. Her coffee was better. I will never admit it.',
        'People ask why I take the long way home when the short way gets me there just the same. That is exactly why. Nothing is lost by wandering.'
      ],
      rematchWin: [
        'Hot from start to finish and never boiled over. That is the whole art of it.',
        'Magmortar is cheering, in its way. Mostly sparks. Have another coffee.'
      ],
      rematchLoss: [
        'Ran a bit hot in the middle there and lost the thread. Cool off for a minute, then come back and try it again.'
      ]
    }
  };

  P['chem-gym-6'] = {
    bio: 'Keeps the lamp at Spectral Point lit every night, counts the flashes in neat little bundles, and insists that no light anywhere is ever wasted.',
    hangouts: ['spectra', 'landing'], signature: 702,
    lines: {
      justDefeated: [
        'Every flash landed exactly where it meant to. Lanturn has turned its lamp all the way up for you. The fishing boats will think it is a festival.',
        'Bright, sharp and in neat little bursts. That is how I like a match to go. Come up to the lamp room some evening and see the Coast from above.'
      ],
      settled: [
        'Polished the lighthouse prism this morning. Every colour you can name and a few you cannot came off it onto the wall. I stood there grinning like a child.',
        'Dedenne has learned to switch the lamp-room light on and off with its tail. It does this all evening. I have stopped minding.',
        'Counted the lamp’s flashes last night as I always do. Same rhythm as yesterday, and the day before. There is something reassuring in that.'
      ],
      laterBadges: [
        'I hear about your wins from the boats. They signal the news to the lighthouse with their deck lamps. I always flash back. Three short, one long.',
        'You keep going further out along the Coast. Look back at the Point sometimes, after dark. I will be lighting the way.'
      ],
      regionCleared: [
        'All of it, end to end. I ran the lamp in four colours for you the night I heard. The harbour master was not pleased. I was very pleased.'
      ],
      away: [
        'Found me at {place}, off the tower for an afternoon. I miss the lamp already. Dedenne has gone back to keep it company.',
        'You found me at {place}, looking for a good spot to watch the sunset. It is the one light I do not have to keep lit myself.'
      ],
      chat: [
        'Dmitra lives at the foot of the staircase below the Point. She lets visitors climb only one step at a time, in order. I respect that enormously.',
        'Chinchou gather below the rocks on dark nights and glow in time with the lamp. The fishers call them the little keepers. I call them the night shift.',
        'Somebody asked me once if I get lonely on the tower. I have a lamp, a Lanturn, a Dedenne and a whole Coast to watch. I have never been less lonely.',
        'Every light I see out on the water, I count. Boats, lanterns, a candle in a window. Nothing that shines is ever too small to notice.'
      ],
      rematchWin: [
        'Clean, bright and right on the beat. I could not have timed it better from the tower.',
        'That one lit up the whole Point. Lanturn is still glowing about it.'
      ],
      rematchLoss: [
        'Flickered a little at the end there. Everyone does on a long night. Rest your eyes and come back when the lamp is lit.'
      ]
    }
  };

  P['chem-gym-7'] = {
    bio: 'Keeps the boarding house at the foot of Mendeleev’s Staircase, fills it from the ground floor up, and puts one guest in every room before anyone has to share.',
    hangouts: ['spectra', 'resource'], signature: 605,
    lines: {
      justDefeated: [
        'You built that up one step at a time and never skipped a stair. Metagross approves. It approves of very few things.',
        'Well fought. Wipe your feet on the way out. The bottom step gets all the traffic and I have only just swept it.'
      ],
      settled: [
        'Three new guests last night. Ground floor first, one to a room, as always. A gentleman asked for the top floor. I told him to wait his turn.',
        'Elgyem sit on the banisters of the staircase and stare at visitors. Most visitors find this unsettling. The Elgyem find most visitors unsettling.',
        'Spent the morning repainting the stair numbers. One to a hundred and eighteen, bottom to top. The paint is still wet on the high ones.'
      ],
      laterBadges: [
        'You have climbed a good way up the Coast now. One step at a time, by the sound of it, the way it ought to be done.',
        'Every guest who passes through my house, I write on the hall wall. You are on there too, near the bottom. I am saving you a space higher up.'
      ],
      regionCleared: [
        'All the way to the top. I have moved your name from the bottom of my wall to the very last row. It is the only name up there.'
      ],
      away: [
        'Found me at {place}. Every room in the house is full, and in exactly the right order. I can afford one afternoon off.',
        'You found me at {place}, inspecting the stairs. Someone told me one creaks. Somebody always says that. None of them ever do.'
      ],
      chat: [
        'Max thinks my house rules are fussy. Then he sends his lighthouse visitors to stay with me because they always sleep well. I let him draw his own conclusions.',
        'Metagross will not take the stairs two at a time, however late we are running. It is the most patient creature I have ever lived with.',
        'Every new guest asks why they cannot have the top room. I tell them: because there is a perfectly good one underneath it.',
        'My father built the staircase and numbered every step. He told me the gaps on the left side were on purpose. I have never once questioned him.'
      ],
      rematchWin: [
        'Every step, bottom to top, and not a single one skipped. Beautiful work.',
        'Built from the ground floor up and nothing out of place. You make my house look untidy.'
      ],
      rematchLoss: [
        'You jumped a stair there. Happens when you are in a hurry. Go back down to the bottom and come up again properly.'
      ]
    }
  };

  P['chem-gym-8'] = {
    bio: 'Leads the climbers’ gym on Lattice Ridge, has two old trophies he refuses to talk about, and never lets anyone climb without sharing a rope.',
    hangouts: ['crystal', 'brown'], signature: 532,
    lines: {
      justDefeated: [
        'Strong grip, and you knew when to hold on and when to let go. Lucario is satisfied. It flicked its ears, which is high praise from Lucario.',
        'Well climbed. Come and share the rope sometime. The ridge is safer with two, and the view is better with company.'
      ],
      settled: [
        'Up the north face at dawn with three new climbers. Everyone tied in, everyone shared the rope, everyone came down. That is a perfect morning.',
        'Timburr carry beams up the ridge for the new shelter. I offered to help. They looked at me like I had insulted their whole family.',
        'Someone asked about the two trophies on my shelf again. I told them I won both for being stubborn. That is close enough to the truth.'
      ],
      laterBadges: [
        'I hear you have been climbing the Coast steadily. Good. Strong holds, short reaches, and never alone. That is all there is to it.',
        'You stand like someone who knows where their weight is now. That will keep you safe on any ridge.'
      ],
      regionCleared: [
        'The whole Coast. I carved your name in the summit post on Lattice Ridge. It sits right next to mine. You will have to climb up to see it.'
      ],
      away: [
        'Found me at {place} with a coil of rope on my shoulder. Always carry one. You never know who might need to tie in.',
        'You caught me at {place}, resting my hands. Even stubborn people need a day off. Lucario is not convinced.'
      ],
      chat: [
        'Gillespie and I climb together every week. He insists we keep exactly the same distance on the rope. I tease him about it. We have never once fallen.',
        'Riolu followed me up the ridge one spring and has been climbing beside me ever since. It grew into the Lucario you just faced. Still climbs better than me.',
        'Some people climb alone and some climb tied together. Some swap gear with anyone on the ledge. I have done all three. Sharing is best.',
        'The two trophies are both for a race up the ridge, twenty years apart. I lost the third. I still go up every year to try again.'
      ],
      rematchWin: [
        'Firm holds and not a slip all the way up. That is how you reach a summit.',
        'Tied in and steady to the very top. I would rope up with you any day.'
      ],
      rematchLoss: [
        'Lost your grip on that last pitch. It happens. Chalk up, check your knot and try the climb again.'
      ]
    }
  };

  P['chem-gym-9'] = {
    bio: 'Leads the gym on Tetrahedral Glacier, spaces every chair in the house exactly evenly, and keeps a snowflake collection in a cold box no one else is allowed to open.',
    hangouts: ['crystal', 'resource'], signature: 698,
    lines: {
      justDefeated: [
        'Good. You kept your distance when you needed to and closed in when it mattered. Cryogonal has stopped spinning, which means it is impressed.',
        'Please do not stand quite so close to the ice wall on your way out. It is not unsafe. I simply like to keep everything evenly spaced.'
      ],
      settled: [
        'Rearranged the gym benches this morning. They were a finger’s width out on the left. Nobody else noticed. I noticed.',
        'Caught a perfect six-sided snowflake on a black glove this morning and kept it in the cold box. That makes four hundred and twelve.',
        'Amaura graze along the glacier edge in the mornings. They keep a polite distance from each other. I find this enormously soothing.'
      ],
      laterBadges: [
        'You keep a good distance from trouble now. I can see it in how you move. That is not timidity. That is good sense.',
        'I hear about you all the way up on the glacier. The news arrives cold, which is how I prefer it.'
      ],
      regionCleared: [
        'The whole Coast. I have set out a new chair in the gym for you, exactly the same distance from every other chair. It took me most of the afternoon.'
      ],
      away: [
        'Found me at {place}. I needed somewhere a little crowded to remind me why I like the glacier. It is working.',
        'You found me at {place}, measuring the gap between two benches. They are fine. I just wanted to be sure.'
      ],
      chat: [
        'Linus ties us into the rope at exactly the same spacing every week. He says it is for safety. I say it is for symmetry. We are both right.',
        'Snorunt peek into the gym when it snows and huddle evenly round the door. I did not teach them to do that. I like to think they picked it up from me.',
        'My sister says I am a difficult person to hug. That is unfair. I simply like a little advance notice and enough room on either side.',
        'No two snowflakes are alike, they say. True. But every one of them is perfectly balanced. I think that is the more interesting part.'
      ],
      rematchWin: [
        'Evenly paced and perfectly balanced, start to finish. Exactly as it should be.',
        'Everything in its proper place and not a step crowded. I could frame that match.'
      ],
      rematchLoss: [
        'Crowded yourself a little near the end. Step back, give it room, and come back up the glacier when you are ready.'
      ]
    }
  };

  P['chem-gym-10'] = {
    bio: 'Lives in a cabin on Triple Point Lake, swims through the ice every dawn, and has opinions about steam, frost and fog that nobody can talk her out of.',
    hangouts: ['crystal', 'landing'], signature: 582,
    lines: {
      justDefeated: [
        'You held steady while everything around you was changing. That is the trick. Walrein has rolled onto its back, which is how it says well done.',
        'Good match. You look warm. Come down to the lake and fix that. No? Next time, then.'
      ],
      settled: [
        'Broke the ice for my swim this morning and found the water, the mist and the frost all on the lake at once. I stood there far too long and got very cold.',
        'Vanillite drift onto the cabin porch when the lake freezes. I leave a bowl of snow out for them. It is gone by morning. I assume they ate it.',
        'Hessa says her coffee is the right temperature. It is not. It is far too hot. I drink it anyway, after the swim.'
      ],
      laterBadges: [
        'I hear your name on the shore whenever the mist lifts. You keep getting further along the Coast. Good. Do not lose your head when things change.',
        'You do not panic when the weather turns now. I noticed straight away. That is worth more than any badge.'
      ],
      regionCleared: [
        'The whole Coast. I cut a new hole in the ice the morning I heard and swam a lap in your honour. It was freezing. It was perfect.'
      ],
      away: [
        'Found me at {place}, warming up at last. Do not tell Hessa. She already thinks she is the only reason I survive the winter.',
        'You caught me at {place}. The lake is half frozen and half not today, and I could not decide which half to swim in.'
      ],
      chat: [
        'Raoul lives just down the shore where the lake turns to marsh. Every spring we argue about where the lake ends. We have never settled it.',
        'Spheal roll down the bank onto the ice every morning and slide all the way across. I clap every time. So do they.',
        'People ask why I swim in the ice. I tell them the cold makes the morning feel like it has started properly. Nobody believes me. Try it.',
        'Hessa and I have a deal. I swim, then I drink her coffee and complain. She pretends to mind. We have been doing this for years.'
      ],
      rematchWin: [
        'Calm right through every change. The lake could learn something from you.',
        'Steady from the first move to the last. Walrein is on its back again.'
      ],
      rematchLoss: [
        'Melted a little near the end there. It happens to all of us. Cool off, get your footing and try again.'
      ]
    }
  };

  P['chem-gym-11'] = {
    bio: 'Keeps the gym in Osmotic Marsh, counts every creature that lives there without caring what kind it is, and pickles whatever the marsh grows too much of.',
    hangouts: ['resource', 'landing'], signature: 283,
    lines: {
      justDefeated: [
        'Well. That was a lot of you, all at once. Ludicolo is dancing, which it does after any match it enjoyed. It enjoyed that one a great deal.',
        'You did not care what was thrown at you, only how much of it. Very sensible. Come and try a pickle before you go.'
      ],
      settled: [
        'Counted the marsh this morning. Three hundred and six creatures. I do not write down what they are. Only that they are here.',
        'Put up forty jars of pickled reed shoots this week. The cellar is full. The neighbours are getting nervous every time I come round with a basket.',
        'Surskit skate on the still pools in the evenings. They never break the surface. I have spent whole afternoons watching them do it.'
      ],
      laterBadges: [
        'I count you in my marsh tally now, even though you never stay. I count you as one. You might be more than one by now.',
        'You do not worry about what kind of trouble is coming, only how much. That is how you get through a marsh in one piece.'
      ],
      regionCleared: [
        'The whole Coast. I gave you your own line in the marsh tally. It just says one, and a little star. That is the first star in forty years of counting.'
      ],
      away: [
        'You found me at {place}, counting. Twelve, thirteen. Hello. Fourteen. I count visitors too.',
        'Found me at {place}, handing out pickles. People keep saying they do not need any. I keep saying everyone needs some.'
      ],
      chat: [
        'Lena brings me tea and I bring her cuttings. She always pretends the cuttings are for her gym. I have seen them on her kitchen windowsill.',
        'Clausia and I have argued about where her lake ends and my marsh begins for nine springs now. I suspect the reeds are on my side.',
        'Lotad float through the marsh in little rafts. I counted one raft of twenty-three. They were all very calm about it.',
        'My mother counted the marsh before me, and her father before her. None of us ever cared what anything was. Only that it was counted, and welcome.'
      ],
      rematchWin: [
        'More of you than there was of me, all the way through. Well counted.',
        'Ludicolo has not stopped dancing. That is the best review I can give.'
      ],
      rematchLoss: [
        'Ran a little thin that time. Happens. Come back to the marsh and build up again, one by one.'
      ]
    }
  };

  P['chem-gym-12'] = {
    bio: 'Launches a weather balloon off Barometer Bluff every dawn, reads a tall glass barometer before breakfast, and has never once been caught in the rain unprepared.',
    hangouts: ['spectra', 'landing'], signature: 351,
    lines: {
      justDefeated: [
        'The pressure dropped the moment you walked in. I should have read that sooner. Drifblim has floated up to the rafters to sulk. Well flown.',
        'You read the wind better than I did today. That does not happen often on my own bluff. Stay for the evening balloon if you like.'
      ],
      settled: [
        'Launched the dawn balloon at six. It went up, up, up and burst at the usual height. I wrote it down. Then I went back to bed for an hour.',
        'Castform changes shape with every turn in the weather. This morning it was a raindrop. By lunch it was a little sun. I trust it more than the radio.',
        'Read the barometer, then the clouds, then my knees. All three said storm. My knees were right first, as usual.'
      ],
      laterBadges: [
        'I tie a little paper tag to the dawn balloon with each new badge you win. Somewhere out over the sea there is a very long trail of your name.',
        'You can feel a change coming now before it arrives. I see it in how you move. That is a weather sense. Keep it.'
      ],
      regionCleared: [
        'All of it. I sent up two balloons the morning I heard, one for you and one just to watch it go. Both came down somewhere past the Point.'
      ],
      away: [
        'Found me at {place}, watching the sky. Pressure is dropping. You have about three hours before the rain. Do not ask how I know.',
        'You caught me at {place} with a balloon under one arm. I am looking for somewhere with a better wind. This is not it.'
      ],
      chat: [
        'Vera reads my barometer from my letters better than I can read it standing next to it. She says I squint. She is right. I will not tell her that.',
        'Drifloon drift up from the hollow on windy days and tug on the balloon strings. I let a few hold on. They come back eventually.',
        'My grandfather built the barometer on the bluff. Taller than me, and older than the lighthouse. It has never once been wrong about a storm.',
        'People ask how I know when the rain is coming. I tell them I watch the air. They think I am being mysterious. I am being entirely literal.'
      ],
      rematchWin: [
        'Read the pressure perfectly from start to finish. I could not have forecast it better.',
        'Clear skies all the way through. Drifblim is drifting about in a very good mood.'
      ],
      rematchLoss: [
        'Caught out by a change in the wind. Happens to every forecaster. Check the sky and come back when it clears.'
      ]
    }
  };

  P['chem-gym-13'] = {
    bio: 'Keeps the gym in Half-Life Hollow, gives away half of everything she owns every spring, and has a drawer of old photographic plates fogged by something she will not name.',
    hangouts: ['crystal', 'spectra'], signature: 885,
    lines: {
      justDefeated: [
        'Half of what I had was gone before I noticed, and then half of what was left. That is a fine way to win. Dragalge has gone very quiet in the reeds.',
        'Sit down a moment. You fought well and you look like you could use the rest. Dreepy will keep you company. It likes new people.'
      ],
      settled: [
        'Gave away half my books this spring, as I always do. Next spring I will give away half of what remains. I will never run out. That is the beauty of it.',
        'Opened the old drawer again and the plates are as foggy as ever. Something in this hollow leaves its mark quietly. I find that oddly comforting.',
        'Dreepy dart about in the dusk like little sparks. They never stay in one place long. I count them before bed. The count is always different.'
      ],
      laterBadges: [
        'I hear your name drifting through the Hollow now. Half the people who say it are surprised. The other half are not. I am in the second half.',
        'You do not waste anything now. I can see it. You give it away or you use it, and you know which is which.'
      ],
      regionCleared: [
        'All of it. I gave you half of what I was saving for the spring. The other half I am keeping, in case you come back. I think you will.'
      ],
      away: [
        'Found me at {place}, out of the Hollow for a day. The light up here is very different. I am enjoying it far more than I expected.',
        'You found me at {place} with a basket of things to give away. Take one. Take two if you like. There is always half of something left.'
      ],
      chat: [
        'Ernest and I trained under the same old keeper. He gives everything away at once. I give away half each spring. We both think the other is mad.',
        'Skrelp hide among the kelp in the hollow pool. They look like weed until they move. Visitors scream. The Skrelp seem pleased.',
        'Someone once asked if I worry about running out of things. I have been giving away half for thirty years. I have never yet reached nothing.',
        'The fogged plates were my grandmother’s. She left a rock on top of them overnight and found them clouded in the morning. She kept the rock too.'
      ],
      rematchWin: [
        'Half, and then half again, and then nothing left on my side. Well done.',
        'You wore me down patiently and steadily. Dragalge respects patience above everything.'
      ],
      rematchLoss: [
        'Ran down a little early that time. It happens. Rest up and come back with everything you had at the start.'
      ]
    }
  };

  /* ---- The Periodic Coast's evening papers ------------------------------ */

  P['chem-boss-x1'] = {
    bio: 'Proctors the first evening paper in the great hall, keeps forty sharpened pencils in a tin, and spends her mornings off watching wrens along the landing.',
    hangouts: ['hall', 'landing'], signature: 393,
    lines: {
      justDefeated: [
        'Pencils down. You did well. I do not say that lightly, and I will not be saying it twice. Blastoise is nodding, which is generous of it.',
        'Hand in your sheet on the way out. Neatly, if you please. Then go and get something to eat. You look like you forgot dinner.'
      ],
      settled: [
        'Sharpened all forty pencils again this morning. Twenty were already sharp. I sharpened them anyway. That is how you keep a calm hand.',
        'Counted wrens along the landing at dawn. Seven. One was sitting on the brass sign, looking as though it had read every number on it.',
        'People think the hall is grim. It is only quiet. Very few places on the Coast are truly quiet. I am grateful for this one.'
      ],
      laterBadges: [
        'You kept going after my evening in the hall. Most do. The ones who do not are the ones I worry about. I do not worry about you.',
        'I heard your name read out at the landing again. You are becoming very difficult to forget.'
      ],
      regionCleared: [
        'All of it. I have put one pencil aside in the tin and will not sharpen it again. That one is yours. It will stay exactly as it is.'
      ],
      away: [
        'Found me at {place}. Off duty. You may talk at an ordinary volume. Even laugh, if you must.',
        'You caught me at {place} with a notebook of birds. Wrens, mostly. They are smaller than people and far less nervous.'
      ],
      chat: [
        'The Provost asks after every person who sat in my hall. Not the score. How they looked when they left. I tell the truth. It is not always kind.',
        'Piplup waddle up from the pier to sit in the empty hall seats. I leave them there. They behave better than most people do.',
        'I have never once lost a pencil. People think I am joking. I keep a list. Forty in, forty out, every evening for eleven years.',
        'Blastoise used to sit at the back of the hall and watch the clock with me. It still does. It is very good at being silent.'
      ],
      rematchWin: [
        'Composed from first mark to last. That is all I ever ask of anyone.',
        'Neat, calm and finished with time to spare. You may leave the hall.'
      ],
      rematchLoss: [
        'Time got away from you this evening. It does that. Rest, eat something, and come back when the clock feels slower.'
      ]
    }
  };

  P['chem-boss-x2'] = {
    bio: 'Proctors the second evening paper by the light of a single candle she lights before anyone arrives, and reads the shapes in the flame when no one is watching.',
    hangouts: ['hall', 'spectra'], signature: 653,
    lines: {
      justDefeated: [
        'The candle burned down evenly the whole time you sat. That only happens when someone is not afraid. Charizard has lowered its wings. Well done.',
        'You may go. Leave the candle. I will put it out myself. I always do. It is the part of the evening I like best.'
      ],
      settled: [
        'Lit the hall candle at seven, as always. The flame leaned east for an hour, then stood straight up. I took that as a good sign. I take most things as signs.',
        'Fennekin sit by the hearth in my rooms and stare into the fire with me. We do not discuss what we see. It feels impolite.',
        'Some people find the hall frightening at night. I find it honest. Everyone sits in the same light, and the clock treats them all alike.'
      ],
      laterBadges: [
        'The flame bends toward the door whenever your name comes up. I do not say that to frighten you. I say it because it is true.',
        'You have walked a long way from my hall. I watched you leave that night. You did not look back. Good.'
      ],
      regionCleared: [
        'All of it. I lit a second candle in the hall the night I heard and let it burn right down. I have never done that for anyone before.'
      ],
      away: [
        'Found me at {place}, out in daylight for once. It is very bright. I am not sure I approve.',
        'You found me at {place}. I came to watch the lighthouse lamp. It is the only flame on the Coast larger than mine.'
      ],
      chat: [
        'Cassius plays chess with me between sittings. He never speaks during a game. I read his moves in the candle before he makes them. I still lose.',
        'Litwick drift into the hall corridors at night and sit in the empty candle holders. The cleaners are terrified. I have told them to leave the Litwick alone.',
        'People say I am ominous. I light a candle and I watch a clock. If that is ominous, then so is every grandmother on the Coast.',
        'Charizard keeps its tail flame low in the hall so it never outshines the candle. It worked that out entirely by itself.'
      ],
      rematchWin: [
        'Steady flame, start to finish. You may put out the candle this time, if you like.',
        'Not a flicker of doubt. I watched closely. Go and rest.'
      ],
      rematchLoss: [
        'The flame guttered near the end. That is all right. Candles can be relit. Come back when you are ready.'
      ]
    }
  };

  P['chem-boss-x3'] = {
    bio: 'Proctors the third evening paper without saying a word more than he must, fishes through the ice in winter, and has never lost a game of chess he started.',
    hangouts: ['hall', 'crystal'], signature: 739,
    lines: {
      justDefeated: [
        'Finished. Good. Gardevoir bowed to you. It does not do that often. Neither do I, but consider this a nod.',
        'You may go. Close the hall door quietly. The echo carries all the way to the caverns.'
      ],
      settled: [
        'Cut a hole in the lake ice before dawn. Fished three hours. Caught nothing. Excellent morning.',
        'Crabrawler climb the hall steps on winter nights and punch the frost off the railings. Nobody asked them to. I am grateful.',
        'Ione beat me at chess last week. She says I started that game. I did not. She did. That is the only reason she won.'
      ],
      laterBadges: [
        'You kept going. Good. The hall is one evening. The Coast is much longer than that.',
        'I hear your name in the caverns now. Echoes carry. So does news.'
      ],
      regionCleared: [
        'All of it. I set up a chessboard in the hall with your name on the white side. I have not moved a piece. You may have the first move.'
      ],
      away: [
        'Found me at {place}. Off duty. You may speak first. I will listen.',
        'You caught me at {place}, with a fishing line and nothing on it. That is not a complaint.'
      ],
      chat: [
        'Ione reads the candle and tells me what I am about to do. She is usually right. I do it anyway. It is my move to make.',
        'Snover gather round the ice hole while I fish. They watch the line. They never say anything either. Good company.',
        'People think I am stern. I am quiet. They are different things, though I admit they look alike from across a hall.',
        'My father taught me chess and fishing in the same winter. Both taught me to wait. Only one of them ever let me win.'
      ],
      rematchWin: [
        'Every move with purpose. Nothing wasted. That is how it is done.',
        'Checkmate, on your side of the board. Well played.'
      ],
      rematchLoss: [
        'Ran out of moves that time. It happens. Reset the board and come back.'
      ]
    }
  };

  P['chem-boss-final'] = {
    bio: 'Holds the office of Provost of the Periodic Coast, keeps a cabinet of medals that are mostly other people’s, and walks the whole shoreline alone after the hall is locked.',
    hangouts: ['hall', 'resource'], signature: 371,
    lines: {
      justDefeated: [
        'Sit. Not for another round. Simply sit. That was the whole Coast, all at once, and you are still upright. Dragonite is bringing you tea.',
        'I have watched a great many people walk out of that hall. Very few walked out the way you just did. I will remember it.'
      ],
      settled: [
        'Walked the whole shoreline last night after the hall was locked. Landing to lighthouse, lighthouse to caverns. Back by dawn. A fine evening.',
        'The medal cabinet gained another piece this week. Not mine. Someone left their grandfather’s with me for safekeeping. I keep a great many things safe.',
        'Bagon keeps leaping off the hall steps trying to fly. It has not managed yet. It will. Things worth doing usually take a while.'
      ],
      laterBadges: [
        'You went on after the hall. Most do not, not at once. You took one breath and kept walking. I noticed.',
        'I hear your name from every corner of the Coast now. The landing, the lighthouse, the caverns. It is quite a thing, to be talked about everywhere.'
      ],
      regionCleared: [
        'The whole Coast, every gym and every sitting. I have put an empty space in the medal cabinet. It is not for a medal. It is for whatever you choose to leave there.'
      ],
      away: [
        'Found me at {place}. Out of the office. You may call me by my first name here. I will not tell you what it is, but you may.',
        'You found me at {place}, walking. I walk a great deal. It is the only time anyone on this Coast leaves me alone.'
      ],
      chat: [
        'Wren tells me how every person looked as they left her hall. I ask because the rest of the evening tells me nothing worth knowing.',
        'Dragonite carried the mail along the Coast for years before it came to the hall. It still stops at every door on the way home.',
        'Every medal in the cabinet has a story. Not one of them is about the person who won it. They are about who was waiting when they came home.',
        'People find me severe. I find most things worth taking seriously. Those can look alike in a long coat and poor lighting.'
      ],
      rematchWin: [
        'The whole Coast again, and steadier than last time. That is all I could ask.',
        'Well done. Dragonite has put the kettle on. You may as well stay.'
      ],
      rematchLoss: [
        'Not tonight. No matter. The hall keeps its hours and I keep mine. Walk the shoreline first, then come back to me.'
      ]
    }
  };
})();
