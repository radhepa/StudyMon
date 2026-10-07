/* Phase 6: gym leaders and bosses as people who stay in the world.

   GYM_LEADER_PROFILES is keyed by the stable cast IDs cast.js already assigns
   (`c-gym-<n>`, `c-boss-<id>`, `calc-gym-<n>`, `calc-boss-<id>`). Nothing here
   changes a gym, badge, boss gate, question bank or reward; it only describes
   who the leader is once the match is over:

   - bio        one social sentence for the friend screens (no course talk)
   - hangouts   location IDs in the leader's own subject where they are
                sometimes found after being beaten (must exist in that
                subject's LOCATIONS)
   - signature  a species the leader adds to a rematch team from rematch tier 2.
                It is a base form; later tiers walk it forward by legal
                evolution, never by inventing stats.
   - related    other leader cast IDs this person has a stated connection to
   - lines      state pools read by js/engine/gym-leaders.js:
                justDefeated, settled, laterBadges, regionCleared, away (with a
                {place} token), chat, rematchWin (the player won), rematchLoss

   Social lines deliberately stay off the course material: they are about the
   leaders' lives, Pokemon, places and one another. tools/check-gym-leaders.cjs
   rejects course vocabulary the same way the Phase 5 cast checks do. */
(function () {
  window.GYM_LEADER_PROFILES = {

    /* ---- The C-Region gyms --------------------------------------------- */

    'c-gym-1': {
      bio: 'Runs the Boot Sector Gym and, in the quiet hours, a small archive of old machines that she insists should be handled, not admired.',
      hangouts: ['archive', 'cafe'], signature: 137, related: ['calc-gym-1'],
      lines: {
        justDefeated: [
          'Match logged. Snorlax is already asleep on the result, which is its way of saying well played. Come by whenever. The door here does not lock behind anyone.',
          'You looked nervous at the start and steady at the end. I like watching that happen. It is most of the reason this gym exists.'
        ],
        settled: [
          'Status report: one old terminal repaired, two cables relabeled, one Snorlax refusing to move off the warm spot by the radiator. A productive morning.',
          'People treat the first gym like a doormat. I prefer to think of it as a door. Doors need hinges, hinges need oil, and guess who oils them.',
          'A kid brought me a crayon drawing of a startup screen yesterday. Very accurate blinking cursor. It is pinned above the counter now, next to the others.'
        ],
        laterBadges: [
          'Every time a challenger I met at the start goes further, I add a tick to a card behind the desk. Yours is getting crowded. I may need a second card.',
          'You walk in differently these days. Less like you are asking permission. Good. You never needed it here.'
        ],
        regionCleared: [
          'Every badge. The clipping is taped to the old monitor with a note underneath that says: started here. I hope you do not mind being on display.'
        ],
        away: [
          'Off hours. I come to {place} to remember that the town exists outside my gym. Snorlax comes to find somewhere new to nap.',
          'Found me at {place}. I am supposed to be resting. I brought a screwdriver anyway, just in case something here needs me.'
        ],
        chat: [
          'Rhea sent another chart from the Isles. Hand-drawn, wind arrows everywhere, one note in the corner: you are here, probably. I am framing it.',
          'The oldest machine in the archive takes four minutes to wake up. I could replace it. Then who would remember how patient things used to be?',
          'Do not tell anyone, but I name the cables. The long grey one is Gerald. Gerald has never once let me down.',
          'Keeping a place open for beginners is quiet work. Nobody notices the hinges until they squeak. I have decided I am fine with that. Mostly.'
        ],
        rematchWin: [
          'Clean run. Snorlax stayed awake for the whole second half, which it has not done for anyone in months.',
          'Result recorded. I am putting a small star beside it, which breaks my own filing rules. Worth it.'
        ],
        rematchLoss: [
          'That one got away from you. It happens to everyone, including me, often, in front of an audience. Sit a minute. Snorlax will share the warm spot.'
        ]
      }
    },

    'c-gym-2': {
      bio: 'Keeps the Declaration Grove gym half greenhouse, half battle floor, and knows every seedling by the date it went into the soil.',
      hangouts: ['meadow', 'town'], signature: 191,
      lines: {
        justDefeated: ['You stepped around the seedlings on your way out of that last exchange. Most challengers flatten at least one. I noticed.'],
        settled: [
          'The tomatoes by the east window finally set fruit. Venusaur has been guarding them like treasure. I have not had the heart to tell it they are mine.',
          'Come in, wipe your feet, mind the trays. Everything in here started as something smaller than your thumbnail.'
        ],
        laterBadges: ['Look at you. I planted a row of sunflowers the week you came through here, and they are taller than me now. Seems fitting.'],
        regionCleared: ['I saved you a cutting from the grove. Put it somewhere with morning light and it will outlive both of us.'],
        away: ['You found me at {place}, looking for wild seed heads. Do not tell the gym trainers. They think I buy everything in packets.'],
        chat: [
          'My grandmother told me you learn a garden by kneeling in it. My knees disagree. The garden does not care.',
          'Sunkern are shy until the light is right, and then they will not stop turning to follow it. I understand them completely.'
        ],
        rematchWin: ['Well grown. That was a harvest, not a lucky break.'],
        rematchLoss: ['Some seasons are thin. Rest the soil, then plant again. You know the way back here.']
      }
    },

    'c-gym-3': {
      bio: 'Leads the Operator Current gym with a quiet voice and a Raichu that has never once waited patiently for anything.',
      hangouts: ['cafe', 'pier'], signature: 81,
      lines: {
        justDefeated: ['Raichu is sulking in the corner. That is the highest compliment it gives. Sit down, the kettle is on.'],
        settled: [
          'I rewired the gym lights last night so they dim slowly instead of snapping off. Raichu hates it. Everyone else sleeps better.',
          'People expect a loud person running an Electric gym. I think the current does enough shouting for both of us.'
        ],
        laterBadges: ['Raichu perks up whenever someone mentions your name on the dock radio. It has decided you are a rival. I am staying out of it.'],
        regionCleared: ['All of them, then. I lit every lamp in the gym the night I heard. The bill will be terrible. I do not regret it.'],
        away: ['Found me at {place}. I like somewhere with a hum in the background that is not mine to fix.'],
        chat: [
          'Magnemite drift toward the harbour cranes when I am not looking. I think they are trying to make friends. The cranes remain unmoved.',
          'I keep a notebook of thunderstorms: date, time, how long between flash and sound. Nobody asked me to. It calms me down.'
        ],
        rematchWin: ['Steady from the first spark to the last. Raichu will be impossible all evening.'],
        rematchLoss: ['Too much charge, not enough ground. Happens. Breathe out, then try again when you have settled.']
      }
    },

    'c-gym-4': {
      bio: 'Runs the Callers Dojo, where every visitor, champion or delivery rider, leaves their shoes on the same mat.',
      hangouts: ['meadow', 'ridge'], signature: 447,
      lines: {
        justDefeated: ['Bow out, then sit. We do not leave the mat angry here, win or lose. You fought with a clear head. Thank you for that.'],
        settled: [
          'Morning practice starts before sunrise. Machamp does the first set with two arms behind its back so the students feel better.',
          'Someone left a single sandal on the mat last week. We have been holding it for eight days. Nobody has come back for it.'
        ],
        laterBadges: ['You keep moving forward and you keep your footing. That is rarer than people think. Most people only manage one of those.'],
        regionCleared: ['You finished. Now the hardest part: coming back to the basics without feeling like you went backwards. The mat is always here.'],
        away: ['You found me at {place}. Every so often I train somewhere uneven to remind my feet that not every floor is flat.'],
        chat: [
          'Riolu arrived at the dojo on its own one winter and simply started copying the drills. We never sent it away. It is better at the stances than I am.',
          'My teacher said the loudest person in a room is rarely the strongest. I repeat it to students. I also repeat it to myself on bad days.'
        ],
        rematchWin: ['One move at a time, and not one wasted. Good match.'],
        rematchLoss: ['You rushed the last exchange. Reset your stance and come back tomorrow. The mat will still be here.']
      }
    },

    'c-gym-5': {
      bio: 'Leads the Branch Mindscape gym and is locked in a long, friendly argument with an Alakazam about which of them is smarter.',
      hangouts: ['archive', 'cafe'], signature: 177,
      lines: {
        justDefeated: ['Alakazam insists it predicted that ending. It says that about everything afterwards. You surprised us both. Take the compliment.'],
        settled: [
          'I have started choosing lunch by coin toss. Alakazam is furious. It likes to know things in advance.',
          'A good afternoon here is a pot of tea, a thick novel, and nobody asking me to guess what happens next.'
        ],
        laterBadges: ['I had a hunch you would go far. Alakazam claims it had the hunch first. We are no longer speaking about it.'],
        regionCleared: ['Every badge. I would say I saw it coming, but I promised myself to stop saying that to people. It is insufferable.'],
        away: ['Found me at {place}. I come here to be somewhere where I do not already know how the afternoon ends.'],
        chat: [
          'Natu stares at the horizon for hours. I used to think it saw the future. Now I think it just likes the view. I respect both.',
          'I read the last page of a book first. Knowing the ending lets me pay attention to everything else. My friends consider this a crime.'
        ],
        rematchWin: ['I will admit it plainly: I did not see that coming. Alakazam is pretending it did.'],
        rematchLoss: ['You second-guessed yourself near the end. Your first instinct was right. Trust it next time.']
      }
    },

    'c-gym-6': {
      bio: 'Runs the Loop Updraft gym at a sprint and is trying, with mixed results, to learn how to sit still.',
      hangouts: ['meadow', 'ridge'], signature: 396,
      lines: {
        justDefeated: ['That was great, that was so great, one more lap to cool down, sorry, habit. Seriously though. Well flown.'],
        settled: [
          'My doctor told me to take one rest day a week. I have taken three this month. Pidgeot is very proud of me. I am climbing the walls.',
          'I ran to the ridge and back before breakfast. Then I remembered I had meant to sleep in. Next week.'
        ],
        laterBadges: ['You keep going and going. I recognise that. Just make sure you stop when the day is done. I am still learning that one.'],
        regionCleared: ['You did it! I ran a victory lap when I heard. Then another. Then I sat down, on purpose, for the first time in ages.'],
        away: ['You found me at {place}, and I am sitting. Look. Sitting. Pidgeot is timing it. We are up to eleven minutes.'],
        chat: [
          'Starly flock follows me on my morning runs. I think they are racing me. I am losing, but nobody told them it was a race.',
          'Someone gave me a hammock as a joke. I have slept in it twice. It was the best sleep of my life. Do not tell them.'
        ],
        rematchWin: ['You kept the pace right to the end! Okay. Okay. I am sitting down now. On purpose.'],
        rematchLoss: ['You pushed too hard in the middle. Believe me, I know that feeling. Rest, then fly again.']
      }
    },

    'c-gym-7': {
      bio: 'Keeps the Stream Delta gym dry and welcoming in a town where it rains more days than not, and remembers how everyone takes their tea.',
      hangouts: ['pier', 'cafe'], signature: 270,
      lines: {
        justDefeated: ['There is a towel on the hook and a cup by the door. You earned both. Gyarados is sulking in the pool, which means you did well.'],
        settled: [
          'The river rose a hand-width overnight. The ferry crew came in to dry off and stayed for three hours. That is how I like the place.',
          'Lotad sit on my hat when it rains. I have stopped taking the hat off. It seems to mean a lot to them.'
        ],
        laterBadges: ['I have heard your name in every dockside conversation this month. I pour an extra cup when someone mentions you, just in case.'],
        regionCleared: ['All the way through. Come in out of the weather properly. There is a chair by the stove with your name on it now. Literally. I had it carved.'],
        away: ['Found me at {place}. I wanted to watch the water come in without having to mop it up afterwards.'],
        chat: [
          'Gyarados is gentle with the little ones in the delta. It lets them ride on its back when the current is slow. It would be mortified if you mentioned it.',
          'A good host remembers the small things. You take your seat by the window when you visit. I noticed the first time.'
        ],
        rematchWin: ['Clear water from start to finish. Come dry off and tell me how you managed it.'],
        rematchLoss: ['Caught in the current that time. Warm up by the stove. The river will be calmer tomorrow.']
      }
    },

    'c-gym-8': {
      bio: 'Runs the Index Quarry gym, where every trainer has a numbered spot on the floor and everyone, somehow, is happier for it.',
      hangouts: ['ridge', 'archive'], signature: 524,
      lines: {
        justDefeated: ['You stayed inside your lines the whole match and still found room to move. That is the trick. Onix is impressed. You can tell by the rumbling.'],
        settled: [
          'I repainted the floor markings this week. Same places, brighter paint. Some changes are just maintenance, and maintenance is its own kind of care.',
          'My students tease me for labelling the snack shelf. Then they never run out of snacks. I rest my case.'
        ],
        laterBadges: ['I keep a spot on the floor marked for you. It is empty, obviously. It is still yours. That is how spots work here.'],
        regionCleared: ['All the badges, in order, or near enough. I made a small plaque for your spot on the floor. Do not argue. It is already screwed down.'],
        away: ['Found me at {place}. Every so often I go somewhere nobody has drawn lines on yet, just to see how that feels.'],
        chat: [
          'Roggenrola stack themselves in neat rows when they sleep. I did not teach them that. I just feel very understood.',
          'People think order is about control. For me it is about knowing where everyone is, so nobody gets left behind.'
        ],
        rematchWin: ['Every step placed exactly where it belonged. I have nothing to correct. That almost never happens.'],
        rematchLoss: ['You drifted out of your lines near the end. It happens when you are tired. Rest, then come back and find your spot.']
      }
    },

    'c-gym-9': {
      bio: 'Keeps the Indirection Tower gym lit by candles and haunted by a Gengar that thinks sneaking up on people is a form of friendship.',
      hangouts: ['cavern', 'archive'], signature: 200,
      lines: {
        justDefeated: ['Gengar is behind you. No, the other side. It wanted to congratulate you in person. Well played, truly.'],
        settled: [
          'I lost Gengar for two days last week. It was in my coat the whole time. I have decided that counts as a hug.',
          'Everyone expects the tower to be gloomy. It is actually very cosy. Candles, blankets, a Misdreavus that hums when the kettle boils.'
        ],
        laterBadges: ['I have been following your progress from a distance. Gengar has been following it from rather closer. Did you notice?'],
        regionCleared: ['All of them. I held a small candlelit party for you in the tower. You were not there, but Gengar wore your hat. You were missing a hat, right?'],
        away: ['Found me at {place}. I like places with echoes. It feels like the walls are keeping me company.'],
        chat: [
          'People ask whether ghost Pokemon are scary to live with. The only scary thing in my house is the laundry pile.',
          'Misdreavus steals one sock from every pair. I have stopped fighting it and started buying odd socks on purpose.'
        ],
        rematchWin: ['You always knew exactly where it was. Gengar is delighted to have finally met its match.'],
        rematchLoss: ['Lost track of things halfway through, did you? Gengar does that to everyone. Come back when you have your bearings.']
      }
    },

    'c-gym-10': {
      bio: 'Runs the Terminator Glade gym with a Blissey, a wall of neatly named lockers, and a firm belief that everyone deserves to be remembered correctly.',
      hangouts: ['town', 'cafe'], signature: 173,
      lines: {
        justDefeated: ['Your locker label is still on the door. I will never take it down. Blissey wants to give you an egg. Please take the egg.'],
        settled: [
          'I have rewritten every locker label in the gym by hand. The old ones were printed. It felt too cold for names.',
          'Someone asked why I care so much about names. Because a name is where a person begins. Getting it right is a small kindness.'
        ],
        laterBadges: ['I added a little star next to your name on the locker. Do not tell the others. They will all want stars.'],
        regionCleared: ['All the badges! I had a proper brass nameplate made for your locker. It is heavier than the door. We are working on it.'],
        away: ['Found me at {place}. I come here to listen to people call each other by name. It is my favourite sound in town.'],
        chat: [
          'Cleffa came to the glade one night during a meteor shower and simply stayed. I think it was looking for someone. I hope it found me.',
          'Blissey tends to half the town when they are poorly. People bring it flowers afterwards. It keeps every single one.'
        ],
        rematchWin: ['You finished strong and clean. I am writing the date on your locker. You will see.'],
        rematchLoss: ['That ended sooner than you wanted. Take a breath and an egg. Blissey insists.']
      }
    },

    'c-gym-11': {
      bio: 'Runs a gym that doubles as a working foundry, where every trainer and Pokemon has a job, and nothing ever gets built by one pair of hands.',
      hangouts: ['quarter', 'lab'], signature: 304,
      lines: {
        justDefeated: ['Your team fit together better than mine did today. I will be rearranging our formation all night. Thank you for that. Honestly.'],
        settled: [
          'Steelix carries beams, Magnemite hold the joins, and I bring the tea. Every job matters. Mine is the most important. Do not tell Steelix.',
          'We forged new railings for the ferry this week. Took the whole team. Nobody could have done it alone. That is the point.'
        ],
        laterBadges: ['People say your team has grown. I can tell. You move like a group now, not a crowd.'],
        regionCleared: ['You finished. I forged you a small iron token in the shape of your first badge. Carry it or put it on a shelf. Either way it lasts.'],
        away: ['Found me at {place}, watching other people work for once. It is instructive. Also relaxing.'],
        chat: [
          'Aron chew through our scrap pile every night. They are the cleanest recyclers in the region. Also the loudest.',
          'My father ran this foundry. He did everything himself. I promised myself I would build a team instead. It took longer. It was worth it.'
        ],
        rematchWin: ['Every piece in its place, every job done. That was a well-built win.'],
        rematchLoss: ['One piece slipped and the rest followed. Check the joins and come back. Every build takes a few tries.']
      }
    },

    'c-gym-12': {
      bio: 'Keeps the Binary Glacier gym shut against the cold and a filing cabinet shut against everyone, and is fiercely proud of a namesake relative.',
      hangouts: ['archive', 'pier'], signature: 361, related: ['c-boss-e3'],
      lines: {
        justDefeated: ['Door is shut, record is filed, and you won fair and square. Lapras wants to see you out. It is a very courteous Lapras.'],
        settled: [
          'I reorganised the filing cabinet. Again. Nobody else is allowed to touch it. That is not paranoia, that is policy.',
          'Snorunt keep sneaking into the gym to sit by the ice wall. I have stopped chasing them out. They seem to be keeping it company.'
        ],
        laterBadges: ['My namesake is up on Victory Road now. When you get there, do not tell them I cheered for you. I will deny it.'],
        regionCleared: ['You beat my namesake too, I hear. Good. They needed humbling. So did I, once. It helps.'],
        away: ['Found me at {place}. I do leave the gym sometimes. I lock the cabinet first.'],
        chat: [
          'My relative was named after me. Fee Seeker the Second. We both skate, we both fight with Lapras, and we both hate being compared.',
          'I keep a record of every match I have ever fought. It is not for anyone else. It just helps me sleep to know it is all written down.'
        ],
        rematchWin: ['I have filed that one under well deserved. Do not expect a copy.'],
        rematchLoss: ['That was a cold result. Warm up, check your footing, and try again when the ice is thicker.']
      }
    },

    'c-gym-13': {
      bio: 'Runs the Bitmask Hollow gym and tinkers with tiny adjustments, one small switch at a time, until the whole hollow sings.',
      hangouts: ['meadow', 'quarter'], signature: 123,
      lines: {
        justDefeated: ['You flipped the result. I was hoping you would. Heracross wants to shake your hand. Well, horn. It is the thought that counts.'],
        settled: [
          'I spent all day moving one stone in the stream two inches to the left. Now the water sounds completely different. Totally worth it.',
          'Scyther trim the hollow hedges for me. Precisely. Terrifyingly precisely. The hedges have never looked better.'
        ],
        laterBadges: ['Small changes add up. You are proof. I can hear it in how you talk about your team now.'],
        regionCleared: ['You did it. I tuned the wind chimes in the hollow to play a little chord when you walk in. Come and hear it.'],
        away: ['Found me at {place}, looking for a spot where one small adjustment would change everything. I always find one.'],
        chat: [
          'The Bug Catchers on the meadow trade me beetles for advice. The beetles are always better than the advice.',
          'I built a music box from spare parts. It plays one song, badly. I love it more than anything I have ever bought.'
        ],
        rematchWin: ['One small switch at the right moment, and everything flipped. Beautiful.'],
        rematchLoss: ['One thing out of place changes everything. Find it and come back. You will.']
      }
    },

    'c-gym-14': {
      bio: 'Keeps the gym on the Endless Chain and believes every path in the region, however far apart, eventually links back up.',
      hangouts: ['quarter', 'ridge'], signature: 371,
      lines: {
        justDefeated: ['There. Our paths crossed and now they are linked. That is how it works here. Dragonite wants to fly you home. It insists.'],
        settled: [
          'I walked the whole region last spring, gym to gym. Every leader made me tea. I think that was the best journey I have ever taken.',
          'People think a gym this far out must be lonely. It is the opposite. Everyone passes through eventually, and most of them stay for tea.'
        ],
        laterBadges: ['You are a long way down the chain now. Do not forget the first links. They are still holding everything up.'],
        regionCleared: ['You reached the end and came back to visit. That is the whole chain, complete. Thank you for closing the loop.'],
        away: ['Found me at {place}. I like to check in on the other links now and then. Everything is connected. Especially the tea.'],
        chat: [
          'Bagon keep jumping off the ridge trying to fly. One day one of them will. I will be there to catch whoever falls first.',
          'I write letters to every leader who ever beat me. Most of them write back. A few are still thinking about it.'
        ],
        rematchWin: ['Connected all the way through. That was the whole chain, unbroken.'],
        rematchLoss: ['One link gave. It happens to every chain. Mend it and come back.']
      }
    },

    'c-gym-15': {
      bio: 'Keeps the last gym at the top of the Returning Steps, climbs them every morning with an Espeon, and tells stories that fold neatly back into themselves.',
      hangouts: ['ridge', 'archive'], signature: 325,
      lines: {
        justDefeated: ['You made it up every step and all the way through me. Espeon has not stopped purring. Sit on the top stair a while. The view back down is the best part.'],
        settled: [
          'I climb the Returning Steps every morning and count them on the way back down. Always the same number. It is oddly comforting.',
          'My grandmother told stories where someone in the story tells a story. I tell them to the children who visit now. They always ask how deep it goes.'
        ],
        laterBadges: ['People on the steps keep asking about you. I tell them the same thing each time: one step, then the next. They find it very unsatisfying.'],
        regionCleared: ['You finished the whole climb. Now look back down the steps. Every single one is yours. Take your time on the way down.'],
        away: ['Found me at {place}. I needed somewhere flat for a change. The steps will still be there when I get back.'],
        chat: [
          'I collect nesting dolls. The smallest one in my favourite set is the size of a grain of rice. Espeon guards it like treasure.',
          'Spoink bounce up the steps every morning, one at a time, never skipping. They are the most patient creatures I know, and the loudest.'
        ],
        rematchWin: ['Every step placed, every step carried you home. Beautifully done.'],
        rematchLoss: ['Missed a step near the top. It happens. Walk back down, catch your breath, and climb again.']
      }
    },

    /* ---- The C-Region's Victory Road ------------------------------------ */

    'c-boss-e1': {
      bio: 'Plays the menacing first guard of Victory Road with total commitment, then goes home to read gentle mystery novels to a Duskull.',
      hangouts: ['cavern', 'archive'], signature: 355,
      lines: {
        justDefeated: ['Ah. You survived me. Most people are too busy being frightened to notice I am actually very polite. Tea? I have tea.'],
        settled: [
          'The cape is for the job. At home I wear a knitted cardigan with a Duskull on it. My niece made it. It is my finest garment.',
          'Menace is a performance. The trick is to make it convincing, then hand out biscuits afterwards.'
        ],
        laterBadges: ['You got past me and kept going. I told the others to expect you. They did not listen. They never do.'],
        regionCleared: ['You beat all of us. I am so proud I almost broke character. Almost.'],
        away: ['Found me at {place}. Off duty. You may call me by my real name. It is also Seg Fault. My parents had a sense of humour.'],
        chat: [
          'Duskull likes the mysteries where the butler did it. I prefer the ones where nobody did it and it was the weather all along.',
          'The other three think I overdo the entrance. Yes. That is the point of an entrance.'
        ],
        rematchWin: ['You walked straight through my best haunting. Magnificent. Truly, I am honoured.'],
        rematchLoss: ['Ha! Boo! Sorry. Force of habit. Come back when you have caught your breath.']
      }
    },

    'c-boss-e2': {
      bio: 'Holds the second post on Victory Road and always, without fail, packs one more thing than the bag can fit.',
      hangouts: ['quarter', 'town'], signature: 111,
      lines: {
        justDefeated: ['Well. That did not fit how I planned it. Very little does, with me. Congratulations. Mind the spare boots on your way out.'],
        settled: [
          'I brought three umbrellas to the post today. It did not rain. I regret nothing. One day it will rain three times at once.',
          'Tyranitar carries my extra bags. It never complains. I suspect it enjoys having a job.'
        ],
        laterBadges: ['I heard you are travelling light. I respect it. I could never. I have a bag for my bags.'],
        regionCleared: ['You made it to the top. I packed you a celebration hamper. It is enormous. It will not close. That is how you know it is from me.'],
        away: ['Found me at {place}, buying another bag. For the bags. Do not look at me like that.'],
        chat: [
          'Rhyhorn once carried my entire camping kit up the ridge. Then it sat on it. I think that was a comment.',
          'My friends say I always overdo it. Maybe. But nobody ever goes hungry on a trip with me.'
        ],
        rematchWin: ['You packed exactly what you needed and nothing more. I am jealous. Deeply.'],
        rematchLoss: ['Too much at once, was it? I know that feeling. Put something down and try again.']
      }
    },

    'c-boss-e3': {
      bio: 'Guards the third post on Victory Road, skates better than anyone in the region, and hates being mistaken for the relative they were named after.',
      hangouts: ['pier', 'archive'], signature: 363, related: ['c-gym-12'],
      lines: {
        justDefeated: ['You got past me. Fine. Do not tell the other Fee. They will be unbearable about it.'],
        settled: [
          'I am named after my relative at the glacier gym. We have the same name, the same Lapras, and the same temper. Nobody believes we are different people.',
          'I skate the harbour every morning before anyone is awake. It is the only time the ice belongs to me.'
        ],
        laterBadges: ['You are going further than either of us did at your age. Both Fees agree on that, which never happens.'],
        regionCleared: ['You beat the Champion. The other Fee sent me a note. It said: told you. I have framed it, out of spite.'],
        away: ['Found me at {place}. I come here where nobody knows which Fee I am. It is restful.'],
        chat: [
          'Spheal roll down the pier in a line when the tide goes out. I have timed them. They are getting faster.',
          'People call me the Second as if it is a ranking. It is a name. I intend to make it the better one.'
        ],
        rematchWin: ['Smooth as ice from start to finish. Do not expect me to say that twice.'],
        rematchLoss: ['You lost your footing. It happens on the ice. Get up and skate again.']
      }
    },

    'c-boss-e4': {
      bio: 'Holds the last Elite post with a wild, improvised style and a standing rule that no two afternoons should ever go the same way.',
      hangouts: ['cafe', 'meadow'], signature: 607,
      lines: {
        justDefeated: ['Oh, that was fun. You never did what I expected. I love that. Almost nobody manages it.'],
        settled: [
          'Today I decided to walk everywhere backwards. I have only fallen over twice. Latias thinks I have lost my mind. Latias is not wrong.',
          'I run an improv night at the café. Nobody knows what happens next, including me. That is the whole appeal.'
        ],
        laterBadges: ['You keep changing things up. Good. The day you get predictable, I will come and find you.'],
        regionCleared: ['Champion! I lit a Litwick candle for you and it set my curtains on fire. A little. We are fine. It was worth it.'],
        away: ['Found me at {place}. I did not plan to be here. I never plan to be anywhere. And yet, here I am.'],
        chat: [
          'Litwick follow me around at night like a string of lanterns. Honestly the best company I have ever had.',
          'I never cook the same recipe twice. Some nights are wonderful. Some nights are soup. Soup is still a win.'
        ],
        rematchWin: ['You surprised me again. I did not think anyone could do that twice.'],
        rematchLoss: ['Ha, that went sideways. Everything does, eventually. Come back and surprise me.']
      }
    },

    'c-boss-champ': {
      bio: 'The region\'s Champion: formal, meticulous, deeply fond of tradition, and secretly unbeatable at the most chaotic board games in town.',
      hangouts: ['quarter', 'archive'], signature: 374,
      lines: {
        justDefeated: ['You have met the standard. More than met it. Please, take a seat. I have waited a long time for a proper conversation up here.'],
        settled: [
          'I keep the Champion\'s hall exactly as my predecessor left it. It is not reverence. I simply have never found a better arrangement.',
          'Lugia visits the rooftop at dawn. I leave the skylight open. We have an understanding.'
        ],
        laterBadges: ['You have been busy since we met. The whole region talks about it. So do I, at dinner. I apologise to no one.'],
        regionCleared: ['You hold every badge and the Champion\'s title. What you do with it now is entirely up to you. That is the best part.'],
        away: ['Found me at {place}. Even the Champion needs somewhere to sit where nobody expects a speech.'],
        chat: [
          'On Thursdays I play board games at the café. The chaotic ones. The ones with dragons and trading and backstabbing. I have not lost in three years.',
          'Beldum came to me as a student\'s gift. It follows me everywhere in perfect silence. We get along wonderfully.'
        ],
        rematchWin: ['The standard holds, and you have raised it. Well done.'],
        rematchLoss: ['Not today. The title is not going anywhere, and neither am I. Come back when you are ready.']
      }
    },

    /* ---- The Converging Isles gyms --------------------------------------- */

    'calc-gym-1': {
      bio: 'Keeps the Landfall Gym and the coastal lookout above it, and can navigate anything except the inside of a building.',
      hangouts: ['harbour', 'helix'], signature: 278, related: ['c-gym-1'],
      lines: {
        justDefeated: [
          'Good bearing, that last exchange. You committed and did not second-guess the heading. Stay a minute and let the wind settle.',
          'I am checking this knot while I talk because my hands need something to do after a match like that. Well fought.'
        ],
        settled: [
          'Morning wind is out of the south-west. Kite weather. If you see a red one over the lookout, that is me pretending I am not working.',
          'I got lost in the harbour office again. Three doors, all identical. Give me open water any day.',
          'Rescue drill this afternoon. Somebody always pretends to drown badly on purpose. It is usually me.'
        ],
        laterBadges: [
          'People on the docks say you have gone a long way up the chain of isles. I keep a pin in my chart for you. It keeps moving. Keep it moving.',
          'You check where you are before you move now. I noticed. That habit will save you more trouble than any badge.'
        ],
        regionCleared: [
          'You have been over every stretch of water out here. Some days I stand at the lookout and trace your whole route with my finger. Good thing to be able to see.'
        ],
        away: [
          'You found me at {place}. I come here to face into the weather for a while. It sorts my head out better than sitting down ever has.',
          'Found me at {place}. I told the lookout crew I was checking the wind. I am mostly watching the gulls.'
        ],
        chat: [
          'Byte sent me a map of her gym wiring. The most orderly thing I have ever seen. I sent back a chart with a coffee ring on it. We are even.',
          'Confession: I cannot go below deck on the ferry. I navigate from the rail in any weather. The crew stopped arguing years ago.',
          'Machamp likes to stand in the wind with me and flex at the gulls. The gulls are not impressed. Machamp is undeterred.',
          'Wingull follow the fishing boats home. I follow the Wingull when the fog is thick. It has never once let me down.'
        ],
        rematchWin: [
          'You read that one like a coastline you already knew. Bearing held, right to the end.',
          'Clean crossing. I would put you on my rescue crew any day.'
        ],
        rematchLoss: [
          'Rough water. Everyone meets it. Check your footing, pick a landmark, and come back when the wind turns.'
        ]
      }
    },

    'calc-gym-2': {
      bio: 'Tends the allotments on the Fenced Strip and has settled more arguments between neighbours than anyone else on the Isles.',
      hangouts: ['flats', 'sliderule'], signature: 597,
      lines: {
        justDefeated: ['You found the gap and went straight through it. Leafeon is flattered. It likes a challenger who reads the ground.'],
        settled: [
          'Two neighbours argued about a fence line again. I measured it, fed them both soup, and now they share the tomatoes. Good day.',
          'Ferroseed grow along the fence posts if I let them. The fence has never been sturdier. Or spikier.'
        ],
        laterBadges: ['You are halfway out across the Isles now. I hear your name on the harbour wall. Somebody chalked it there.'],
        regionCleared: ['All the way. I planted a row of something for you. It is either beans or peas. We will find out together.'],
        away: ['Found me at {place}. Someone asked me to help settle a disagreement. It was about sandwiches. It is always about sandwiches.'],
        chat: [
          'My allotment is exactly between my two sisters\' plots. I did that on purpose. Someone has to keep the peace.',
          'Leafeon sleeps in the shade of the runner beans. I plant them taller every year so it never has to move.'
        ],
        rematchWin: ['You found exactly where to stand. That was a match between two good neighbours.'],
        rematchLoss: ['Caught on the wrong side of the fence that time. Walk around and try again.']
      }
    },

    'calc-gym-3': {
      bio: 'Runs the boatyard gym at Lathe Point, where every hull is turned by hand and every conversation is shouted over machinery.',
      hangouts: ['lathe', 'harbour'], signature: 204,
      lines: {
        justDefeated: ['WHAT? Sorry. The lathe is running. I said well done! Klinklang agrees. It is spinning faster. That means happy.'],
        settled: [
          'Finished a rowing boat this morning. Took eleven weeks. It is not perfect. It floats beautifully. That is what counts.',
          'I have not heard a quiet room in about fifteen years. I do not miss it. Much.'
        ],
        laterBadges: ['You have been around the Isles a few times now, I hear. Come see what we have built since you were last here.'],
        regionCleared: ['You did it! I named a boat after you. It is small and it leaks a little, but it is very brave.'],
        away: ['Found me at {place}. I came to see a boat I built three summers ago. Still afloat. Still leaking. Still proud of it.'],
        chat: [
          'Pineco keep rolling into the wood shavings and coming out covered. Then they fall asleep. I sweep around them.',
          'My hands are covered in splinters and scars. Each one is a boat. I can tell you which ones.'
        ],
        rematchWin: ['Turned true from start to finish! I am shouting because I am happy, not because of the lathe.'],
        rematchLoss: ['Came off true that time! Happens to every hull. Set it back on the lathe and try again.']
      }
    },

    'calc-gym-4': {
      bio: 'Keeps the lighthouse gym on the Standing Wave, plays three instruments badly, and keeps exactly one keepsake of everything worth remembering.',
      hangouts: ['harbour', 'sliderule'], signature: 170,
      lines: {
        justDefeated: ['Well played. Ampharos wants to light the tower for you tonight. It does not have to. It is going to anyway.'],
        settled: [
          'I keep one ticket from every concert, one shell from every beach, one letter from every friend. The rest I let go. One is enough to remember.',
          'Chinchou gather under the lighthouse at night and glow along with the lamp. The fishers call it the second light.'
        ],
        laterBadges: ['I hear you are sailing further out. Keep an eye on the lighthouse when you pass. It is keeping an eye on you.'],
        regionCleared: ['You crossed every stretch. I saved one thing for you: a shell from the rock where the lighthouse stands. Keep it somewhere safe.'],
        away: ['Found me at {place}. I am playing the fiddle for anyone who will listen. So far, two gulls and a very patient Wingull.'],
        chat: [
          'Ampharos and I practise harmony every evening. It hums. I play. The neighbours have learned to accept this.',
          'When I was little I wanted to keep everything. Now I keep one of each. It is surprisingly freeing.'
        ],
        rematchWin: ['You held the note all the way to the end. Beautiful. Truly.'],
        rematchLoss: ['A few notes out of tune. Everyone has those nights. Come back and play it again.']
      }
    },

    'calc-gym-5': {
      bio: 'Leads the Broken Fraction gym and sews costumes for every festival on the Isles, most of them for Pokemon that refuse to wear them.',
      hangouts: ['sliderule', 'helix'], signature: 478,
      lines: {
        justDefeated: ['You saw through every disguise I tried. Mimikyu is very upset. Its costume took me three nights. Well done.'],
        settled: [
          'I am making a festival costume for a Wailord. The fabric budget is horrifying. The Wailord is delighted.',
          'Mimikyu has a new costume every season. This one has a little hat. It will not take the hat off, even to sleep.'
        ],
        laterBadges: ['You are getting further every week. I saw your name on the festival board. Someone made you a costume. It is not very good.'],
        regionCleared: ['You finished! I am making you a costume for the next festival. You get no say in the colour. That is part of the gift.'],
        away: ['Found me at {place}, measuring someone for a costume. They did not ask. I did not wait.'],
        chat: [
          'Froslass helps me sew in winter. It keeps the needles cold and my tea warm. I have no idea how.',
          'Everybody wears some kind of costume. Mine happens to be made of velvet and sequins.'
        ],
        rematchWin: ['Not fooled for a moment. I will have to try a new disguise next time.'],
        rematchLoss: ['Fooled you with that last one! Come back and see through it next time.']
      }
    },

    'calc-gym-6': {
      bio: 'Guards the gym Where the Bound Runs Out and has spent years walking toward the far end of the Isles, never in any hurry to arrive.',
      hangouts: ['helix', 'flats'], signature: 333,
      lines: {
        justDefeated: ['Good. You kept going when it would have been easy to stop. That is most of what I care about. Rayquaza is very old and very impressed.'],
        settled: [
          'I have been walking to the far end of the Isles for twelve years. I am getting closer. I am not in a hurry. The walk is the good part.',
          'Swablu nest in my hat on long walks. I have given up on the hat. It is their hat now.'
        ],
        laterBadges: ['You are further along than I am, and I have been walking for years. I am not jealous. The view is the same from here.'],
        regionCleared: ['You reached the end. How was it? Do not tell me everything. I want some of it to be a surprise.'],
        away: ['Found me at {place}. I am on my way somewhere. I will get there eventually. Probably.'],
        chat: [
          'People ask what I will do when I reach the end of the path. I will turn around and walk back. There is a lot I missed on the way out.',
          'Rayquaza sleeps on the cliff above the gym. It has been there longer than me. I try not to wake it.'
        ],
        rematchWin: ['You went the whole distance. No shortcuts. I respect that more than anything.'],
        rematchLoss: ['You stopped a little short. That is all right. The path will still be here tomorrow.']
      }
    },

    'calc-gym-7': {
      bio: 'Runs the First Soundings gym and dives the tide pools every morning to see which creatures made it through the night.',
      hangouts: ['deep', 'flats'], signature: 72,
      lines: {
        justDefeated: ['You held on. Most challengers fade halfway through. Toxapex is impressed. That is saying something. Toxapex is never impressed.'],
        settled: [
          'Dived the pools at dawn. Everything survived the storm. Even the little anemone I have been worried about. Good morning.',
          'Tentacool drift into the gym pool when the tide is high. We have given up asking them to leave.'
        ],
        laterBadges: ['You keep lasting longer than anyone expected. I like that. Staying power is underrated.'],
        regionCleared: ['You made it through everything. I have a tide-pool creature named after you now. It is small, tough and very stubborn.'],
        away: ['Found me at {place}, checking on the pools. Something always needs checking on.'],
        chat: [
          'I count the creatures in the pools every morning. Not for science. I just like knowing everyone is still there.',
          'Toxapex hides in its shell when it is sad. It came out when you arrived today. I think that means something.'
        ],
        rematchWin: ['You lasted all the way. That is the whole point.'],
        rematchLoss: ['Did not quite hold out that time. Come back and try again. You will.']
      }
    },

    'calc-gym-8': {
      bio: 'Leads the Sign and Size gym by night and paints shop signs by day, and cannot decide which of the two is the better job.',
      hangouts: ['sliderule', 'deep'], signature: 434,
      lines: {
        justDefeated: ['Well fought. Crobat is sulking. It likes to win at night. That is when it feels most itself.'],
        settled: [
          'Painted the new sign for the tavern this morning. Took three tries to get the lettering right. Every letter is a little different. That is the charm.',
          'Nights at the gym, days on a ladder with a paintbrush. Some weeks I forget what sleep is.'
        ],
        laterBadges: ['I painted your name in tiny letters on the corner of the harbour sign. Look for it next time you pass.'],
        regionCleared: ['You did it! I am painting a mural. You are in it. You look very heroic. Your nose is slightly wrong. I am working on it.'],
        away: ['Found me at {place}, touching up a sign. Nobody asked me to. It was bothering me.'],
        chat: [
          'Stunky follow me home from the gym. The neighbours complain about the smell. The Stunky complain about the neighbours.',
          'A good sign should be readable from across the harbour and still look nice up close. Most things should, really.'
        ],
        rematchWin: ['Every stroke landed exactly where it belonged. Beautiful work.'],
        rematchLoss: ['Smudged that one. Happens. Clean the brush and try again.']
      }
    },

    'calc-gym-9': {
      bio: 'Leads the Radius of Belief gym, keeps a map of how far every friend has ever wandered from home, and rarely leaves the observatory steps.',
      hangouts: ['observatory', 'harbour'], signature: 677,
      lines: {
        justDefeated: ['You came a long way to get here, and you did not lose track of where you started. Alakazam and I both noticed.'],
        settled: [
          'I keep a map with a pin for every friend who has left the Isles. Some pins are very far away now. I check on them every evening.',
          'I have not left the observatory in three weeks. It is very comfortable. People visit me. That is the trick.'
        ],
        laterBadges: ['Your pin on my map keeps moving outward. I like watching it. Come back and tell me what it is like out there.'],
        regionCleared: ['You have been everywhere on the Isles now. Your pin is off the edge of my map. I had to tape on more paper.'],
        away: ['You found me at {place}. I do go out. Sometimes. I brought a flask of tea in case it gets too exciting.'],
        chat: [
          'Espurr sits on my windowsill and stares at the harbour. I think it wants to go somewhere. I am trying to be brave for both of us.',
          'Home is wherever you know how far you have come. That is my theory. Nobody has argued me out of it yet.'
        ],
        rematchWin: ['You knew exactly how far to go. Not an inch too far. Lovely.'],
        rematchLoss: ['Strayed a bit too far that time. Come back to the centre and start again.']
      }
    },

    'calc-gym-10': {
      bio: 'Tends the spiral rose beds at the last gym on the Isles and believes that any path, walked slowly enough, turns into a garden.',
      hangouts: ['helix', 'observatory'], signature: 280,
      lines: {
        justDefeated: ['You found your angle and then reached for it. Florges is delighted. It wants to give you a rose. Please take the rose.'],
        settled: [
          'The spiral beds are in full bloom. I walk them every morning from the centre outwards. Takes an hour. Best hour of the day.',
          'Ralts hide among the roses and pop out to surprise visitors. I have given up pretending I do not find it delightful.'
        ],
        laterBadges: ['You have almost walked the whole spiral of the Isles now. Just one more turn. Then you get to see the centre from outside.'],
        regionCleared: ['You finished. I planted you a rose at the outermost edge of the spiral. It will grow inward, towards the rest of us.'],
        away: ['Found me at {place}, looking for a spot for a new rose bed. The whole Isles would be a garden if I had my way.'],
        chat: [
          'Every rose in my beds came from a cutting a friend gave me. The garden is really just all my friends, arranged nicely.',
          'Florges and I argue about pruning. It likes everything wild. I like everything wild but tidy. We compromise on wild.'
        ],
        rematchWin: ['Angle and reach, both perfect. That was a beautiful match.'],
        rematchLoss: ['A few petals fell that time. They grow back. Come and try again.']
      }
    },

    /* ---- The Converging Isles' evening papers ------------------------------ */

    'calc-boss-x1': {
      bio: 'Presides over the first evening paper with a stern clock-watching calm, then swims the Long Reservoir at dawn with a Wailord the size of a boathouse.',
      hangouts: ['deep', 'harbour'], signature: 318,
      lines: {
        justDefeated: ['Pens down. You did well. I do not say that often, so please do not ask me to repeat it. Wailord says it too. Loudly.'],
        settled: [
          'I swam the reservoir end to end this morning. Wailord followed me the whole way. It made quite a wave.',
          'People think I am strict. I am. I am also very good company once the clock is not running.'
        ],
        laterBadges: ['You kept going after the hall. Good. That room is only one evening. The rest of the Isles are yours.'],
        regionCleared: ['You finished all of it. I am retiring the clock from the hall for one night in your honour. Just one.'],
        away: ['Found me at {place}. Off duty. You may sit down and talk as loudly as you like.'],
        chat: [
          'Carvanha follow my swims from a respectful distance. I think they are hoping I drop my lunch.',
          'Nobody believes it, but I cry at weddings. Every one. Even strangers\' weddings.'
        ],
        rematchWin: ['Composed from start to finish. That is exactly how it should be done.'],
        rematchLoss: ['Time ran against you tonight. Rest. The reservoir is patient, and so am I.']
      }
    },

    'calc-boss-x2': {
      bio: 'Oversees the second evening paper and performs sleight-of-hand at the tavern on weekends, never once explaining how a trick is done.',
      hangouts: ['sliderule', 'lathe'], signature: 302,
      lines: {
        justDefeated: ['You saw through the trick. Every one of them. Zoroark is shocked. So am I. Congratulations.'],
        settled: [
          'I do card tricks at the tavern on Saturdays. People always ask how. I always say: practice. That is the whole secret.',
          'Zoroark likes to sit in the audience disguised as someone else. It laughs at all my jokes. That is how I know it is Zoroark.'
        ],
        laterBadges: ['You have been through a lot of rooms since mine. I hear you name every trick before it happens now.'],
        regionCleared: ['All of it, done. I made a coin vanish in your honour last Saturday. It has not come back. That was not the plan.'],
        away: ['Found me at {place}. Pick a card. Any card. No, not that one. Fine, that one.'],
        chat: [
          'Sableye steal my props. Rings, coins, one pocket watch. I think they are building a collection. I think I might be in it.',
          'Magic is just paying attention to what other people are not paying attention to. And a lot of sleeve pockets.'
        ],
        rematchWin: ['You saw every trick coming. I am going to have to learn new ones.'],
        rematchLoss: ['Got you with the old switch. Come back and see if you can catch it next time.']
      }
    },

    'calc-boss-x3': {
      bio: 'Oversees the third evening paper, delights in exact numbers of every kind, and keeps the most precise bird tally on the Isles.',
      hangouts: ['observatory', 'table'], signature: 574,
      lines: {
        justDefeated: ['Precise, from beginning to end. I am delighted. Reuniclus is delighted. We are both writing it down.'],
        settled: [
          'Forty-three gulls on the harbour wall this morning. Last Tuesday it was forty-one. I have been waiting all week to tell someone.',
          'People think exact numbers are cold. I think they are the warmest thing there is. They never lie to you.'
        ],
        laterBadges: ['You have covered so much ground since we met. I have been counting. Of course I have been counting.'],
        regionCleared: ['You finished. I have the exact date and time written down. Forever. That is my version of a trophy.'],
        away: ['Found me at {place}, counting. I will be done in a moment. Four hundred and twelve. Done. Hello.'],
        chat: [
          'Gothita watch the birds with me. They are terrible at counting but excellent at spotting. We make a good team.',
          'My friends gave me a clicker counter for my birthday. It was the best gift I have ever received. I have worn out three.'
        ],
        rematchWin: ['Exactly right, every time. You have no idea how happy that makes me.'],
        rematchLoss: ['Not quite the number you wanted. Try again. It is always worth trying again.']
      }
    },

    'calc-boss-final': {
      bio: 'Keeps the great hall at the end of the Isles, and is in private a tired, kind traveller who gardens by lamplight long after everyone has gone home.',
      hangouts: ['table', 'harbour'], signature: 704,
      lines: {
        justDefeated: ['Sit down. Not for another round. Just to sit. You have earned a quiet minute, and so, I think, have I.'],
        settled: [
          'I garden at night, after the hall is locked. The moonflowers open around ten. I have seen every one of them open this summer.',
          'Mewtwo keeps its own counsel. We have that in common. We also both enjoy a very strong cup of tea.'
        ],
        laterBadges: ['You kept going after the hardest night in the hall. Most people take a long rest. You took a short one. Good.'],
        regionCleared: ['That is everything. The whole of the Isles. I am very glad I got to see it. Come and see the moonflowers some evening.'],
        away: ['Found me at {place}. I needed an evening that was not about anyone\'s last chance. It is lovely out here.'],
        chat: [
          'I travelled for twenty years before I took this job. I have been to more places than I can remember. I remember the people, though.',
          'Goomy came to the hall garden during a rainstorm and never left. It sleeps under the moonflowers. I let it.'
        ],
        rematchWin: ['That was a very good evening. Thank you. Truly.'],
        rematchLoss: ['Not tonight. That is all right. The hall will be here, and so will I.']
      }
    }
  };
})();
