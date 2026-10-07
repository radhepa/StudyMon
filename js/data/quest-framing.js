/* Phase 6 Slices 5-6: narrative framing for the substantial C labs.

   Only the ten hard labs are framed; the twenty easy and medium jobs keep their
   one-line story and get no forced wrapper. Framing sits AROUND the unchanged
   quest contracts in js/data/side-quests.js: nothing here touches starter code,
   tests, expected output, grading or rewards.

   Every frame is keyed by a stable frame ID and names the giver's cast ID.
   Stages:
     offer          the quest has not been started
     inProgress     started, or a submission still needs work
     complete       the first time the finished quest is opened, one line per
                    coarse outcome (see js/engine/quest-framing.js):
                      independent  passed without failed submissions or hints
                      persisted    at least one submission failed first
                      guided       opened the hints, no failed submission
     acknowledgment later visits, once some play has passed since completion

   Reactions are written to respect every route to a finished job. None of them
   ranks the player, and none of them can grant or withhold anything. */
(function () {
  window.QUEST_FRAMING = {
    'c-lab-09': {
      frameId: 'frame-c-lab-09', giverId: 'theo',
      offer: 'Um. The starter roster keeps running out of room. Every time a new trainer signs up, someone copies the whole list into a bigger book by hand. Could you make it grow on its own? Without losing anyone. That part matters.',
      inProgress: 'How is the roster coming? No rush. I checked the sign-up sheet three times this morning. Nobody new yet. You have time.',
      complete: {
        independent: 'It grew. It just grew, the moment it needed to. Nobody lost. I have been staring at it for ten minutes. Thank you.',
        persisted: 'You kept at it after it pushed back. I noticed that. The roster is safe now, and honestly, so am I. Thank you for not giving up on it.',
        guided: 'You used the notes. Good. That is what they are there for. I write notes for everything. The roster works, and that is what counts.'
      },
      acknowledgment: 'Three new trainers signed up this week and the roster just made room. I did not even have to watch it. Well. I watched it a little.'
    },
    'c-lab-10': {
      frameId: 'frame-c-lab-10', giverId: 'tam',
      offer: 'Power went out last week and the PC desk roster went with it. I rebuilt it from memory. Do not ask how that went. Can you make it save to a file and come back after a cut?',
      inProgress: 'Still on the backup? The lights flickered this morning and I nearly climbed under the counter. Take your time, though. Better right than fast.',
      complete: {
        independent: 'Pulled the plug on purpose to try it. Everything came back. Every name. I may have cheered. Customers looked.',
        persisted: 'Some of those runs must have been frustrating. You stuck with it anyway. The roster survived three pretend blackouts. I owe you.',
        guided: 'You followed the notes I left. Good call. The backup works and I sleep better. That is the whole job.'
      },
      acknowledgment: 'Storm knocked the power out again on Tuesday. The roster came right back. Nobody even noticed. That is how I know it is working.'
    },
    'c-lab-11': {
      frameId: 'frame-c-lab-11', giverId: 'linden',
      offer: 'A small evolution family. Every path from the first form to each final one, in order. Can it be listed without missing a branch? That is the question I want answered.',
      inProgress: 'Still tracing branches? Good. The ones that split three ways are where people miss things. Check those twice.',
      complete: {
        independent: 'Every path, in order, none missing. Clean. I have seen field teams take a season to do that on paper.',
        persisted: 'You were wrong a few times and corrected yourself each time. That is the job, frankly. Most of my career fits in that sentence.',
        guided: 'You used the notes. Sensible. I would rather someone read the notes than guess. The listing is correct, and that is what matters.'
      },
      acknowledgment: 'I used your path listing for the lab\'s new family charts. Kern says it saved him a week. Kern exaggerates. It saved him four days.'
    },
    'c-lab-12': {
      frameId: 'frame-c-lab-12', giverId: 'ellis',
      offer: 'I keep losing sightings between trips. Scraps of paper, backs of receipts. I would like one journal that keeps them, finds them, and survives the walk home. If you have the patience for it.',
      inProgress: 'I found a sighting from last spring in my coat pocket today. Faded. That is exactly why I asked. No pressure, though. Honestly.',
      complete: {
        independent: 'It kept every sighting and found them again. I added the one from my coat. It looks much less lonely in there.',
        persisted: 'You went back to it again and again. I noticed, because that is usually me. It works now. Thank you for staying with it.',
        guided: 'You leaned on the notes. I do that all the time, so I am in no position to judge, and I would not anyway. It works beautifully.'
      },
      acknowledgment: 'Forty sightings in the journal now. I read them back on the ferry sometimes. It is like flipping through a photo album of the whole region.'
    },
    'c-lab-25': {
      frameId: 'frame-c-lab-25', giverId: 'nurse',
      offer: 'On busy days the waiting room gets muddled, and someone who arrived early gets seen late. I want a list that keeps everyone in the order they came in. Fairness matters in a place like this.',
      inProgress: 'Busy morning. Four Pokémon with sniffles and one very dramatic Psyduck. Take your time with the list, though. Rest is part of the work.',
      complete: {
        independent: 'Everyone in the order they arrived, and nobody forgotten when they leave. That is exactly right. Thank you.',
        persisted: 'You kept at it through the rough runs. That is what my shifts feel like, most days. The list is fair now. That matters more than anything.',
        guided: 'You used the guidance. Good. Asking for help is not a weakness in here; it is how anyone gets better. The list works.'
      },
      acknowledgment: 'The waiting room has been calm all week. People trust that they will be seen in turn. You did that. It is a small thing that is not small at all.'
    },
    'c-lab-26': {
      frameId: 'frame-c-lab-26', giverId: 'mart',
      offer: 'The travelling stall takes stock on the road, and things come and go all day. I need an inventory that can add and drop items without the whole list falling apart. Interested?',
      inProgress: 'The stall sold six Potions and a very odd hat this morning. The inventory is still on paper. Whenever you are ready.',
      complete: {
        independent: 'Items come in, items go out, and the list holds together. I tried it with the odd hat. Twice.',
        persisted: 'That one fought back, huh? You did not let it win. The stall is running smoothly because of it. Thanks.',
        guided: 'You took the notes. Smart. The inventory works, the stall works, and I get a lunch break. Everyone wins.'
      },
      acknowledgment: 'The travelling stall has not lost track of a single item since you set it up. The odd hat finally sold, by the way. To Tam.'
    },
    'c-lab-27': {
      frameId: 'frame-c-lab-27', giverId: 'june',
      offer: 'There is a grotto behind the falls, but the way in is a maze of fallen rock. I want one safe route mapped before anyone tries it. Safety first, then adventure.',
      inProgress: 'Walked the edge of the rockfall this morning. It has not moved, so no hurry. Just do not guess. A guessed route is how people get stuck.',
      complete: {
        independent: 'One safe route, start to grotto. I walked it this morning with a lantern and your map. Exactly as mapped. The grotto is gorgeous, by the way.',
        persisted: 'You backed out of dead ends and tried again. That is exactly how you find a real route. Good instincts.',
        guided: 'You used the notes. That is what a careful climber does. The route is safe, and that is what counts.'
      },
      acknowledgment: 'Took a group into the grotto on Sunday using your route. Everyone came out dry and grinning. Your name is chalked on the entrance stone.'
    },
    'c-lab-28': {
      frameId: 'frame-c-lab-28', giverId: 'theo',
      offer: 'The archive needs to be readable on any PC in the region, even ones built differently from ours. Byte by byte, no surprises. I have been worrying about this for a while.',
      inProgress: 'I tried reading an old archive on the lab machine and it came out as nonsense. So. Yes. That is why. No pressure.',
      complete: {
        independent: 'Wrote it here, read it on the lab machine, and it came out exactly right. Exactly. I may frame the output.',
        persisted: 'That one takes patience, and you had it. Every mismatch you fixed is one I never have to worry about. Thank you.',
        guided: 'You checked the notes. I would have too. I did, actually, several times. It works now, on every machine we tried.'
      },
      acknowledgment: 'Byte asked for a copy of the archive for the Boot Sector gym. It read on her oldest machine on the first try. I nearly cried.'
    },
    'c-lab-29': {
      frameId: 'frame-c-lab-29', giverId: 'rowan',
      offer: 'I want to try battle plans without luck getting in the way. Same choices, same result, every time. Then I will know whether a plan is good or I just got lucky.',
      inProgress: 'Still building the simulator? Fine. I ran a plan in my head six times last night and got six different results. Which is exactly the problem.',
      complete: {
        independent: 'Same choices, same outcome, every run. Finally I can tell whether my plans are any good. Some are not. That is useful too.',
        persisted: 'You did not quit when it fought you. I respect that. More than I say out loud.',
        guided: 'You used the notes. Good. Preparation is not cheating. I would know; I prepare for everything.'
      },
      acknowledgment: 'Ran thirty plans through your simulator this week. Threw out twenty-two. The eight left are the best I have ever had.'
    },
    'c-lab-30': {
      frameId: 'frame-c-lab-30', giverId: 'mart',
      offer: 'Want to run the Mart for a day? On paper, I mean. Opening stock, sales, restocks, and a ledger at close that adds up to the cent. The whole job, start to finish.',
      inProgress: 'The Mart ledger is waiting whenever you are. Fair warning: the hardest part is the last cent. It always is.',
      complete: {
        independent: 'Opened, sold, restocked, closed, and the ledger matched to the cent. You could run this place. Please do not; I like my job.',
        persisted: 'Took some doing, but you got the ledger to balance. Every shopkeeper has a night like that. You earned your apron.',
        guided: 'You used the notes. The best shopkeepers keep a cheat sheet under the counter. Mine is very worn. The ledger balances.'
      },
      acknowledgment: 'I still use your ledger layout at closing time. It is neater than mine ever was. Do not tell the previous manager.'
    }
  };
})();
