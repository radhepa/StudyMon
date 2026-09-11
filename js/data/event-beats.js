/* Extra beats for the heart events, so each one plays as a short scene rather
   than a single choice.

   trainers.js holds beat one of every event. This file holds beats two and
   three: EVENT_BEATS[trainerId][eventIndex] is an array of further beats, each
   { s: prose, c: [[choice, reply, points], ...] }. The engine plays beat one
   from trainers.js and then walks these, so nothing here changes an existing
   save; a save that has already completed an event keeps it completed.

   Beat one carries most of the friendship. These are smaller swings, because by
   then you are inside the scene rather than deciding whether to enter it. */

window.EVENT_BEATS = {

  rowan: [
    /* 0 - The spare pencil */
    [
      { s: 'He writes for a while, then stops and taps the pencil against the page. "Can I ask you something without you making it a whole thing?"',
        c: [['Say yes.', '"How do you decide when a plan is finished?" You admit you mostly do not. He looks relieved.', 15],
            ['Make it a whole thing.', 'You put a hand on your heart. Rowan groans and goes back to writing, but he is smiling.', 8]] },
      { s: 'At the bottom of the page he has written one line and underlined it twice. He turns the notebook so you can see.',
        c: [['Read it aloud.', '"Ask more questions." He takes the book back quickly, as if that settles it.', 15],
            ['Read it and say nothing.', 'He nods once, satisfied. Some things do not need a comment.', 15]] }
    ],
    /* 1 - The erased score */
    [
      { s: 'A younger trainer is hovering by the water fountain, watching the board and not drinking anything.',
        c: [['Leave it alone.', 'Rowan follows your eyes, then deliberately looks away. "Everyone loses badly once."', 18],
            ['Point them out to Rowan.', 'He walks over. You cannot hear it, but the conversation is short and neither of them looks angry.', 12]] },
      { s: 'Rowan picks the chalk back up and holds it out to you. "Put your own name up. You beat me last week and you never wrote it down."',
        c: [['Write your result.', 'He inspects your handwriting critically. "Now the board is correct."', 18],
            ['Write his name above yours.', '"That is not what happened." He fixes it, then leaves both names there.', 12]] }
    ],
    /* 2 - A bad afternoon */
    [
      { s: 'The next morning Riolu tries the new opening and gets it wrong twice. Rowan\'s jaw tightens.',
        c: [['Remind him it is the first try.', 'He breathes out. "Right. First try." The third attempt is much closer.', 18],
            ['Suggest going back to the old plan.', '"No. The old plan is why we are here." He stays with it, and so does Riolu.', 10]] },
      { s: 'By the fourth attempt it works. Riolu sits down hard, extremely pleased with himself.',
        c: [['Congratulate Riolu, not Rowan.', 'Rowan pretends to be offended for about two seconds. Riolu accepts the praise as his due.', 18],
            ['Tell Rowan he coached that well.', 'He does not know where to put his hands. "It was mostly him." It was not mostly him.', 18]] }
    ],
    /* 3 - The letter home */
    [
      { s: 'The new letter takes him three attempts. He reads a line back to you: "I lost more than I won this month, and I am not going to stop."',
        c: [['Tell him that is the whole letter.', 'He puts the pen down. "It is quite short." He sends it anyway.', 20],
            ['Suggest adding what he is working on.', 'He adds two lines about the opening you tested together, and stops apologising in the third paragraph.', 20]] },
      { s: 'A reply comes back eight days later. Rowan reads it twice on the post office steps before saying anything.',
        c: [['Wait.', '"He wants to know the opening." Rowan is already reaching for the notebook.', 20],
            ['Ask if it is good news.', '"He asked a question about my battling." From Rowan, that appears to be the highest possible outcome.', 18]] }
    ],
    /* 4 - Your corner */
    [
      { s: 'Through the gym doors you can hear the leader calling the first match. Rowan checks his watch, then the doors, then his watch.',
        c: [['Ask him to wait out here.', '"Obviously I am waiting." He sits down on the step like it was his idea.', 18],
            ['Tell him to go home and rest.', '"I will decide that." He does not go home.', 10]] },
      { s: 'When you come out he is on his feet before the door has finished swinging.',
        c: [['Show him the badge.', 'He looks at it far longer than politeness requires. "Right. My turn next week."', 20],
            ['Ask how his own match went.', '"Do not change the subject." He tells you anyway, on the walk back.', 18]] }
    ],
    /* 5 - The empty line */
    [
      { s: 'The new notebook is stiff and blank. Rowan holds it open at the first page without writing anything.',
        c: [['Suggest starting with today.', 'He writes the date, then "bought two notebooks", then looks embarrassed. It stays in.', 18],
            ['Tell him to start with a loss.', 'He writes down the match against the kid with the Bidoof. "For accuracy."', 18]] },
      { s: '"Second notebook is yours," he says, and slides it across. "Good turns only. I want to see if you can fill it."',
        c: [['Write his name on the first line.', 'He reads it upside down and does not argue.', 20],
            ['Give it back and ask him to keep both.', '"That defeats the point." He puts it in your bag while you are not looking.', 15]] }
    ],
    /* 6 - Same time tomorrow */
    [
      { s: 'You battle on the hill. It goes long, and it is the best either of you have moved all season.',
        c: [['Play it out to the end.', 'You win by a margin nobody would call comfortable. Rowan is grinning before the dust settles.', 20],
            ['Call it a draw and sit down.', '"Coward." He sits down too. Riolu collapses between you.', 18]] },
      { s: 'He writes the result down properly, in the new notebook, under both your names.',
        c: [['Ask him to read it back.', '"Good match. Same time tomorrow." He closes the book on the pencil to mark the page.', 20],
            ['Tell him you will be here.', 'He nods like it was never in question. It was not.', 20]] }
    ]
  ],

  mira: [
    /* 0 - One empty pot */
    [
      { s: 'A week later there is one green thread in the soil, and Mira has clearly been checking it more often than she admits.',
        c: [['Say you noticed the watering.', '"It was only twice." It was more than twice. She looks pleased to be caught.', 18],
            ['Pretend you had not noticed.', 'She lets you have that. Oddish, standing in the watering can, does not.', 12]] },
      { s: '"It needs a name for the label," she says, holding the pencil out. "Yours got the pot. You get the name."',
        c: [['Name it after the day you met.', 'She writes it out in careful capitals and props the label up with a stone.', 18],
            ['Ask her to name it.', 'She thinks for a long moment and picks something plain and slightly silly. It suits it.', 15]] }
    ],
    /* 1 - Too much water */
    [
      { s: 'The chart works for four days. On the fifth you both arrive with full cans and meet at the gate.',
        c: [['Laugh and swap days.', 'She redraws the chart with a thick line down the middle. Oddish adds a second footprint.', 18],
            ['Insist it is your day.', 'It is not your day. Mira points at the chart. You water the herbs instead.', 8]] },
      { s: 'The drooping seedlings come back. Mira crouches to look at them at eye level for a long time.',
        c: [['Sit down beside her.', '"I do that. I fix things nobody asked me to fix." You watch the plants together until the light goes.', 20],
            ['Tell her they were always going to survive.', '"You do not know that." She smiles anyway, and stops worrying at the soil.', 15]] }
    ],
    /* 2 - A table for six */
    [
      { s: 'The sixth neighbour is not home. Mira stands at the gate holding a basket she cannot deliver.',
        c: [['Suggest leaving it with a note.', 'She writes one on a seed packet. It comes back the next day with a jar of honey in it.', 18],
            ['Offer to come back tomorrow with her.', '"Together, then." She takes the basket home and does not fret about it all evening.', 18]] },
      { s: 'On the walk back she says, quietly, "I said yes to all six because I did not want to be the person who says no."',
        c: [['Tell her four baskets is not a failure.', 'She counts them again. "Four is quite a lot of baskets, actually."', 20],
            ['Offer to help her count next time first.', '"Before I answer. Yes." She writes that down too, on the back of her hand.', 20]] }
    ],
    /* 3 - Winter plans */
    [
      { s: 'Asking people for windows turns out to be the hard part. Mira has the list in her pocket and has walked past the first house twice.',
        c: [['Knock on the door yourself.', 'She talks once it is open. The neighbour has four panes in a shed and is glad to lose them.', 15],
            ['Wait until she is ready.', 'She knocks on the third pass. It goes fine, and it was hers to do.', 20]] },
      { s: 'By the end of the week there are nine windows leaning against the shed. None of them match.',
        c: [['Say that is more than enough to start.', '"It is a cold frame. It only has to keep the frost off." She starts measuring.', 20],
            ['Suggest asking for a few more.', '"I would rather build the small thing than plan the big one." She is right, and she knows it.', 18]] }
    ],
    /* 4 - The seed exchange */
    [
      { s: 'The dismissive visitor comes back at the end of the day, when the stall is quiet.',
        c: [['Let Mira handle it.', 'They buy two packets and ask what to do with clay soil. Mira talks for ten minutes without noticing.', 20],
            ['Stand close by.', 'She glances at you once, then does all the talking. You just hold the box.', 18]] },
      { s: 'Packing up, she looks at the plain paper packets. "I could print proper labels. I keep thinking I should."',
        c: [['Say the handwriting is the point.', 'She turns one over. Her mother\'s writing is on the back of the oldest ones. She keeps them plain.', 20],
            ['Offer to help design some.', 'You draw one together that evening. It has her handwriting on it, scanned in slightly crooked.', 18]] }
    ],
    /* 5 - The first pane */
    [
      { s: 'Fitting the frames takes two days and most of the good weather. The blue pane goes in last.',
        c: [['Let her set it herself.', 'She lines it up three times before it satisfies her. Then she stands back and does not say anything for a while.', 20],
            ['Hold it steady for her.', 'It takes both of you. Mira marks the frame underneath with the date, very small.', 20]] },
      { s: 'The greenhouse is warm before it is finished. Mira carries your pot inside first, before any of her own.',
        c: [['Ask why yours went first.', '"It was the first thing that was ours." She goes back out for the rest.', 20],
            ['Move it to the spot under the blue pane.', 'The light on it is faintly, ridiculously blue. She leaves it exactly there.', 20]] }
    ],
    /* 6 - A key on a string */
    [
      { s: 'You use the key for the first time on a grey afternoon when you did not particularly want to talk to anyone.',
        c: [['Just sit with the plants.', 'Mira comes in an hour later, says nothing, and starts potting on at the other bench.', 20],
            ['Do the watering while you are there.', 'She finds the chart ticked off in your handwriting and leaves a note under the can: thank you.', 20]] },
      { s: 'Later she hangs a second key by the door. "For whoever needs it next. You are still the first one."',
        c: [['Ask who she has in mind.', 'She lists half the town, then stops. "I might just leave it there and see."', 20],
            ['Put your key back on its string by the door.', '"You keep yours." She moves it back to your side of the bench.', 20]] }
    ]
  ],

  theo: [
    /* 0 - The stuck drawer */
    [
      { s: 'With the runner out on the bench the problem is obvious. Theo looks at it and then at the week he has spent fighting the drawer.',
        c: [['Say it was hidden.', '"It was hidden," he repeats, trying it out. He decides to believe you.', 18],
            ['Say nothing and hand him the screw.', 'He fits it, tests the drawer four times, and finally lets his shoulders down.', 18]] },
      { s: 'A customer comes in mid-repair. Theo stands up too fast and knocks the runner off the bench.',
        c: [['Pick it up so he can serve them.', 'He handles the counter smoothly. The drawer is back in its frame before they leave.', 18],
            ['Let him deal with both.', 'He manages, barely, and apologises to the drawer under his breath.', 10]] }
    ],
    /* 1 - The quiet bench */
    [
      { s: 'When he calls you back the station is clean and steady. He does not say anything; he just watches your face.',
        c: [['Tell him it sounds good.', '"It does, does it not." He allows himself about four seconds of open pride.', 20],
            ['Ask what he changed.', 'He explains for a full minute without hedging once, which you have not heard him do before.', 20]] },
      { s: '"I nearly took it apart again this morning," he admits. "It was working. I just wanted to be sure."',
        c: [['Ask what stopped him.', '"I thought about you asking to hear it." He puts the screwdriver in the drawer.', 20],
            ['Suggest a rule about finished things.', 'You agree on one: if it works twice, it is done. He writes it on a card above the bench.', 20]] }
    ],
    /* 2 - An unsigned ticket */
    [
      { s: 'Two weeks later a woman comes in asking for "the young man who fixed the kettle". Theo looks behind himself.',
        c: [['Say nothing and let him answer.', '"That is me." He says it as a plain fact, and the sky does not fall.', 20],
            ['Point at him.', 'He gets there a half-second after you do. He would rather have had the half-second.', 12]] },
      { s: 'She leaves. Theo takes the folded work ticket out of his apron pocket, where it has been all along.',
        c: [['Ask if he kept it.', '"I keep them all." He shows you a tin. There are quite a lot of tins.', 20],
            ['Suggest pinning it up.', 'It goes on the board above the bench. The next one goes up without discussion.', 20]] }
    ],
    /* 3 - The wrong part */
    [
      { s: 'The right motor arrives on Thursday. Theo checks the part number against the order four times before opening the box.',
        c: [['Check it with him.', 'You read the digits out; he ticks them off. It takes twenty seconds and settles something.', 18],
            ['Tell him it will be fine.', 'He checks it anyway, then laughs at himself. "Fine, but checked."', 15]] },
      { s: 'The owner passes the bench, glances at the returned box, and says only: "Good catch on the return label."',
        c: [['Wait until she has gone.', 'Theo exhales. "That is the whole conversation I was dreading." It was.', 20],
            ['Tell her Theo sorted it himself.', 'She says she knows. Theo goes slightly red and gets a great deal of work done that afternoon.', 20]] }
    ],
    /* 4 - A little signal */
    [
      { s: 'Off the stone, the receiver hisses. Theo starts swapping parts at random, which is not like him.',
        c: [['Suggest changing one thing at a time.', 'He resets, writes down each change, and finds it on the fourth. It was the aerial length.', 20],
            ['Let him work it out.', 'He gets there eventually, and rebuilds it twice more than he needed to.', 12]] },
      { s: 'From the footbridge his voice comes through clearly. There is a pause, then: "Say something else. I want to check it was not luck."',
        c: [['Read him the shop sign.', 'He makes you read it three times, from three distances, and writes all of them down.', 20],
            ['Tell him it works.', '"Data, please." You can hear him grinning through the static.', 20]] }
    ],
    /* 5 - Open workshop */
    [
      { s: 'The lamp defeats everyone for twenty minutes. Then a woman at the back says she thinks it is the switch, and it is.',
        c: [['Ask her to show the room.', 'Theo hands over the bench without hesitating. He takes notes like a student.', 20],
            ['Let Theo take it from there.', 'He explains what she found so everyone can see it, and credits her twice.', 20]] },
      { s: 'Afterwards he is stacking chairs and clearly replaying the whole thing. "I did not know the answer to four questions."',
        c: [['Point out that four questions got answered.', 'He stops stacking. "By the room." He writes that on a card too.', 20],
            ['Ask what he will do next month.', '"Next month?" He had not thought there would be one. He starts a list.', 20]] }
    ],
    /* 6 - Your frequency */
    [
      { s: 'The radio lives in your bag for a fortnight. It crackles at odd hours, usually when Theo has finished something.',
        c: [['Answer every time.', 'Most of it is nonsense about capacitors. You would not trade it.', 20],
            ['Tell him to save them up for the evening.', 'He does, and the evening calls get longer instead of fewer.', 20]] },
      { s: 'One night it goes quiet mid-sentence. You find him at the bench with it open, entirely unbothered.',
        c: [['Ask to fix it yourself.', 'He talks you through it and keeps his hands in his lap, which costs him something.', 20],
            ['Watch him work.', '"Loose joint. My soldering." He fixes it and signs the inside of the case this time.', 20]] }
    ]
  ],

  june: [
    /* 0 - A spare lunch */
    [
      { s: 'The first climb is steeper than she said it would be. June slows down without making a point of it.',
        c: [['Admit you need a minute.', '"Good. Me too." She sits on a rock and produces a second sandwich from somewhere.', 20],
            ['Push on to the top.', 'You make it. June arrives a minute later with both bags and no comment.', 12]] },
      { s: 'At the top the valley opens up. Eevee immediately goes to sleep facing the wrong way.',
        c: [['Ask her to name what you can see.', 'She names six ridges and admits she made one of them up years ago and it stuck.', 20],
            ['Say nothing for a while.', 'You sit there long enough for the light to change. She says it is the best kind of guiding.', 20]] }
    ],
    /* 1 - The washed-out path */
    [
      { s: 'The new route adds an hour and a very muddy field. June keeps apologising for it.',
        c: [['Tell her the sign was the important part.', 'She stops apologising. "Someone would have tried the stones tonight."', 20],
            ['Complain cheerfully about the mud.', 'She joins in. By the second gate you are ranking the worst fields in the valley.', 18]] },
      { s: 'Back in town she writes up the closure for the trail board, then hesitates over signing it.',
        c: [['Tell her to sign it.', '"It is only a sign." She signs it. Two other guides ask her about the route that week.', 20],
            ['Sign it with her.', 'Both names go on. She looks at that for a moment longer than she needs to.', 20]] }
    ],
    /* 2 - A map full of blanks */
    [
      { s: 'She spreads the old map out again that evening and looks at the blank half of the page.',
        c: [['Offer to walk it with her.', '"It is not a good route." She is already reaching for a pencil.', 20],
            ['Ask what she thinks is out there.', 'She guesses, out loud, for twenty minutes. Most of it turns out to be right.', 20]] },
      { s: 'You walk a piece of it the next week. She fills in one small corner of the blank and stops.',
        c: [['Ask why she is stopping there.', '"Because that is where we got to." She dates the corner. It is the first honest thing on the map.', 20],
            ['Suggest finishing the whole page.', '"Not today." She folds it carefully, blank half and all, and keeps it.', 18]] }
    ],
    /* 3 - The invitation */
    [
      { s: 'The answers come back. The route is real, the team is small, and they want her for six weeks.',
        c: [['Tell her to go.', '"You are supposed to talk me out of it." She is already checking her boots.', 20],
            ['Ask what she wants.', '"I want to go. I wanted someone to know I was scared first." Now someone does.', 20]] },
      { s: 'On the morning she leaves, the bag is packed and she is standing in the doorway not picking it up.',
        c: [['Pick it up and hand it to her.', 'She takes it. "Right." Eevee is already halfway down the path.', 20],
            ['Wait with her.', 'You wait. When she moves, she moves quickly, and does not look back until the gate.', 20]] }
    ],
    /* 4 - Packing light */
    [
      { s: 'A letter three weeks in: the pot has been used every night, and two people on the team now want one.',
        c: [['Write back about the pot.', 'You get a full page in reply about soup, which is really a full page about being useful.', 20],
            ['Ask about the route instead.', 'She answers in two lines and then writes another page about soup anyway.', 18]] },
      { s: 'When she comes home the pot has a dent in it and she will not hear a word against it.',
        c: [['Ask how it happened.', '"A Snorlax sat on it." She refuses to elaborate, then elaborates for an hour.', 20],
            ['Suggest keeping the dent.', '"Obviously I am keeping the dent." It goes on the shelf, dent forward.', 20]] }
    ],
    /* 5 - A letter from the road */
    [
      { s: 'The pages dry out crinkled. Half a paragraph in the middle is gone for good.',
        c: [['Ask her to invent the missing part.', 'She makes it up outrageously. You write the invented version in the margin.', 20],
            ['Ask what was really there.', '"That I was homesick." She says it lightly, and then does not take it back.', 20]] },
      { s: 'She stays four days. On the last evening she asks whether you will still be here when she next comes through.',
        c: [['Say yes.', '"Good." She writes the date on her hand so she does not lose it in a map.', 20],
            ['Ask her to send a date first.', 'She does, from three towns away, on a postcard with no picture on it.', 18]] }
    ],
    /* 6 - A place on the map */
    [
      { s: 'The walk to the lake takes most of a day. June says almost nothing for the last hour, which from June means something.',
        c: [['Let her lead.', 'She takes the last bend first and stops. It is exactly as small as she remembered.', 20],
            ['Walk beside her.', 'You come round the bend together. She does not let go of the map.', 20]] },
      { s: 'The terrible campsite is still terrible. June puts the blanket down in the middle of it anyway.',
        c: [['Stay the night.', 'It is cold and uneven and neither of you sleeps much. She calls it the best night on the map.', 20],
            ['Walk the path all the way round first.', 'It takes forty minutes. She has drawn it correctly, for the first time, from memory.', 20]] }
    ]
  ],

  ellis: [
    /* 0 - An unfinished sketch */
    [
      { s: 'They turn a few more pages than they meant to. Almost every drawing stops somewhere.',
        c: [['Ask which one they nearly finished.', 'They find it: Smeargle, three pages back, missing only a background. "I liked it too much."', 20],
            ['Ask why they stop.', '"Because then it is what it is." They say it fast, like a rehearsed answer, then look unsure.', 18]] },
      { s: 'Ellis picks up the pencil and looks at the unfinished paw for a while.',
        c: [['Wait.', 'They draw it. It takes four seconds. They stare at it like it might complain.', 20],
            ['Offer to hold the book still.', 'You do. The paw gets finished. Smeargle, the actual one, is asleep under the actual chair.', 20]] }
    ],
    /* 1 - The wrong color */
    [
      { s: 'The green sky painting takes three days and gets steadily stranger. Ellis will not put it away.',
        c: [['Ask to see it every day.', 'They start setting it out before you arrive. By day three there are leaves falling upward.', 20],
            ['Leave them to it.', 'They bring it to you finished, which they have never done before.', 18]] },
      { s: 'A stranger at the next table asks whether the sky is meant to be like that.',
        c: [['Let Ellis answer.', '"Yes," they say, with no qualifier at all. You have never heard them do that.', 20],
            ['Say you like it.', 'Ellis adds, quietly, "So do I." The stranger buys a small one.', 20]] }
    ],
    /* 2 - Someone else's wall */
    [
      { s: 'The agreed border is a metre of wall by the door. Smeargle regards this as a grave insult.',
        c: [['Let Smeargle plan the border.', 'It is loud, crowded and slightly wonky. The owner asks for a second metre.', 20],
            ['Sketch it with Ellis first.', 'They plan it properly, then let Smeargle put the last mark on. Honour is restored.', 20]] },
      { s: 'Washing the rest off takes all afternoon. Ellis keeps stopping to look at the parts about to disappear.',
        c: [['Photograph it before it goes.', 'They pin the photo above the workbench. "It existed. That is enough."', 20],
            ['Wash it off together without stopping.', 'It goes quickly with two brushes. The border looks better once it is alone.', 18]] }
    ],
    /* 3 - The entry form */
    [
      { s: 'Choosing the piece is worse than filling in the form. Four canvases go on the floor and none of them stay there.',
        c: [['Ask which one they would keep.', 'They point immediately, then argue with themself about it for ten minutes. It goes in.', 20],
            ['Ask which one is finished.', '"None of them." Then, more quietly: "That one is the closest."', 20]] },
      { s: 'At the gallery door the attendant asks for a title. Ellis has not thought about a title.',
        c: [['Suggest naming it after the day.', 'They write it down. It is the least dramatic title on the wall and they are happy with it.', 20],
            ['Say they can leave it untitled.', '"No, I want a name on it." They think, then write one. It is a good one.', 20]] }
    ],
    /* 4 - Opening night */
    [
      { s: 'The visitors ask Ellis a question about the brushwork. Ellis answers it, then keeps going for another minute.',
        c: [['Stay quiet and let them talk.', 'They talk about the green sky, unprompted, to strangers. You hold the coat.', 20],
            ['Ask a question of your own.', 'It gives them somewhere to go next. The three of them end up in front of a different painting.', 20]] },
      { s: 'Outside afterwards, Ellis sits on the gallery steps with the coat over their knees.',
        c: [['Sit down too.', '"That was fine," they say, sounding astonished. "That was fine."', 20],
            ['Ask if they want to go back in.', 'They do, after five minutes. They stay until the lights go off.', 20]] }
    ],
    /* 5 - A place for mistakes */
    [
      { s: 'Painting beside them is not restful. Ellis works fast and talks to the canvas.',
        c: [['Paint badly and enjoy it.', 'They look over once and say your tree is honest. It is a terrible tree.', 20],
            ['Ask them to teach you one thing.', 'One thing turns into an hour. They are a patient teacher and a hopeless timekeeper.', 20]] },
      { s: 'By evening the corner is comprehensively ruined and both of you are covered in paint.',
        c: [['Leave it exactly as it is.', '"It is supposed to look like this." They pin your tree next to the rejected painting.', 20],
            ['Clean up together.', 'You get about half of it. The other half stays, which Ellis says is correct.', 20]] }
    ],
    /* 6 - The window seat */
    [
      { s: 'You look at the sketch properly. There are five chairs at the table and every one of them has someone in it.',
        c: [['Ask when they drew it.', '"Over about a year." They had been adding people as they arrived.', 20],
            ['Ask who is in the fifth chair.', '"You were, from the second week. I just did not draw you in until I was sure."', 20]] },
      { s: 'Ellis takes the sketchbook out and turns to a clean page, then pushes it across the table to you.',
        c: [['Draw the table.', 'You draw it badly. Ellis adds nothing and changes nothing and keeps the page.', 20],
            ['Ask them to draw with you.', 'You both work on it. It is the first thing in the book with two hands in it.', 20]] }
    ]
  ]
};
