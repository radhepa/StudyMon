/* Characters and scenes. Friendship is platonic. No scene depends on real-world time. */
window.FRIEND_GATES = [1,2,3,4,6,8,10];
window.FRIEND_BADGES = [0,1,2,3,5,7,10];
window.TRAINERS = [
{
 id:'rowan', name:'Rowan', role:'Your rival', partner:447, team:[447,396,403,66,216,246], chapters:[3,5,6], color:'#ad644b',
 bio:'Keeps a notebook of battle results. Claims the losses are useful data. Has underlined yours twice.',
 intro:'There you are. I saved you a spot at the practice field. The good side, actually. No excuses.',
 talk:['I rewrote my opening strategy. No, you cannot see it yet.','Riolu keeps copying my stretches. His form is better.','I lost to a kid with a Bidoof yesterday. We are calling it a learning experience.'],
 win:'All right. That was a good read. I want another match when you have time.',
 lose:'You nearly had me on that last turn. Come on, I will walk you to the Center.',
 events:[
 ['The spare pencil','Practice field','Rowan is leaning over a notebook. His pencil snaps just as you arrive. He hides the page with his elbow. "It is a plan. Not a diary."',[
 ['Offer your spare pencil.','He tests the point against his thumb. "Thanks. I will bring it back." He does, sharpened.',25],
 ['Ask to see the plan first.','"It costs one pencil to mind your business." He smiles, but the notebook stays closed.',5]]],
 ['The erased score','Noticeboard','Someone has rubbed out Rowan\'s name on the practice rankings. He stands with the chalk in his hand. "It was only a practice match. Still."',[
 ['Write the missing result beside his name.','"You remember the score?" He looks at you, then at the board. "Huh. Thanks."',25],
 ['Tell him the board is pointless.','"I know it is not everything. I still worked for that spot." He puts the chalk down.',-10]]],
 ['A bad afternoon','Old bridge','Rowan has lost three matches. Riolu is asleep against his shoe. "I keep making him try the same opening. It worked last week."',[
 ['Suggest one change and a rest.','You draw positions in the dirt. Rowan crosses out half his plan. "We can test this tomorrow."',25],
 ['Offer to battle him right now.','"Maybe later." He lifts Riolu carefully. "I think we are both done for today."',0]]],
 ['The letter home','Post office','Rowan has written that he won every match this month. He folds the letter before you can finish reading. "My brother was good at this. Really good."',[
 ['Ask what he actually wants to tell his brother.','He unfolds the page. "That I am getting better. Slowly." He starts a new letter.',30],
 ['Say nobody will check the results.','"That is not really the problem." He slips the letter back into his bag.',-15]]],
 ['Your corner','Gym steps','Your next gym challenge is close. Rowan arrives carrying two sandwiches and a page of notes. "These are observations. Do not make it weird."',[
 ['Share lunch and go through the notes.','He points out a habit in your opening moves. You catch one in his. Lunch lasts an hour.',25],
 ['Say you want to prepare alone.','"Fair." He leaves one sandwich beside you. "Good luck in there."',5]]],
 ['The empty line','Practice field','Rowan\'s old notebook has one blank line left. "I used to think I would stop keeping score once I passed you." He turns the page over.',[
 ['Ask for a fresh notebook and a rematch.','"Two notebooks." He grins. "You should keep track of my good turns too."',30],
 ['Suggest taking a break from competing.','He thinks about it. "A short one. We could watch the younger trainers instead."',20]]],
 ['Same time tomorrow','Hill above town','Rowan hands you the pencil you lent him, now very short. "I kept buying new ones so I would not use this up. Ridiculous, right?" Riolu nudges his knee.',[
 ['Tell him to keep it.','He tucks it into the new notebook. "Same time tomorrow? I still owe you a proper win."',20],
 ['Trade it for one of his pencils.','"A fair trade." He chooses the best one in his bag. Your names are on each other\'s first page now.',20]]]
 ],
 outings:[
 ['Dumplings after practice','Market stall','Rowan is counting coins. The last order is barely enough for one person.',[
 ['Split the order.','"You take the bigger one. I already had breakfast." His stomach disagrees.',45],
 ['Find a cheaper stall together.','You find soup and enough bread for both of you. Rowan writes down the stall name.',25],
 ['Order for yourself and leave.','He says he will catch up. He does not.',-25]]],
 ['A match in the rain','Covered court','Rain starts halfway through the warm-up. Rowan asks whether you still want to play.',[
 ['Move under the shelter and work on footwork.','"Indoor rules. No burning the roof." You invent a very small, very serious tournament.',45],
 ['Call it off and pick another day.','"Tomorrow, then." He offers you the dry half of his umbrella.',15],
 ['Insist he play in the mud.','Riolu slips before the first turn. Rowan ends the match.',-25]]],
 ['Secondhand books','Bookshop','Rowan finds a battle guide with handwritten corrections in the margins.',[
 ['Compare the notes with your own ideas.','You spend half an hour arguing quietly over page twelve. The shopkeeper brings chairs.',45],
 ['Buy him a clean copy instead.','"Thanks, but I liked the notes." He reads both on the way home.',15],
 ['Read his private notebook while he shops.','He takes it back without a word. You walk home separately.',-30]]]
 ]
},
{
 id:'mira',name:'Mira',role:'The town gardener',partner:43,team:[43,406,187,191,114,546],chapters:[2,8,12],color:'#78895b',
 bio:'Grows herbs behind the Center. Remembers everyone\'s tea order, but forgets where she put her gloves.',
 intro:'Could you hold this pot a second? Thanks. I meant to introduce myself before the heavy lifting. I am Mira.',
 talk:['Oddish has chosen a new pot. It already belonged to a basil plant.','I made mint tea. There is a clean cup on the shelf.','The beans are climbing the fence. At least somebody listens when I say grow.'],
 win:'That was lovely. Oddish disagrees, but only because she wanted to win.',
 lose:'Good match. Let us get everyone some water before we try again.',
 events:[
 ['One empty pot','Center garden','Mira has a pot, a packet of seeds, and no free hands. "Pick a spot. Somewhere you will remember to visit."',[
 ['Choose a sunny spot beside the path.','"We will see it every day." She presses a wooden label into the soil with your name on it.',25],
 ['Let Mira choose the spot.','She picks the same patch she had been eyeing all morning. "You can choose the next one."',15]]],
 ['Too much water','Center garden','Your seedlings are drooping. Mira checks the soil twice. "I watered them after you did. I thought you had forgotten."',[
 ['Make a watering chart together.','She hangs it on the fence. Oddish adds a muddy footprint to the first square.',25],
 ['Tell her to leave your plants alone.','"I should have asked." She puts the watering can away and gives you some room.',-10]]],
 ['A table for six','Garden gate','Mira has promised herbs to six neighbors. There are only four baskets. "I said yes before I counted."',[
 ['Help her explain the shortage.','You make the rounds together. Nobody minds waiting. Mira looks surprised every time.',25],
 ['Offer to do all the deliveries yourself.','She thanks you, then catches up at the first house. "I ought to tell them myself."',10]]],
 ['Winter plans','Potting shed','Mira is sketching a greenhouse she cannot afford. The smallest drawing has been rubbed almost through the paper.',[
 ['Ask what the first small step would cost.','"A cold frame. Old windows would do." By supper, you have a list of people to ask.',30],
 ['Promise to build the whole thing immediately.','She laughs, then checks whether you are serious. "Please do not promise more than you can manage."',0]]],
 ['The seed exchange','Town square','Mira\'s stall is busy. A visitor dismisses her plain paper packets. She starts putting them out of sight.',[
 ['Ask her to explain the plants to you.','A few people stop to listen. Soon she is talking about soil, not packaging.',25],
 ['Argue with the visitor.','Mira pulls you aside. "I would rather spend today with the people who want to be here."',-10]]],
 ['The first pane','New greenhouse','The donated windows do not match. Mira holds up the crooked blue one. "This is going to look ridiculous."',[
 ['Give the blue window the best view.','Sunlight falls through it onto your old pot. Mira decides not to paint the frame.',25],
 ['Sort them by size before choosing.','The two of you find a pattern that fits. There is one pane left for a little door.',25]]],
 ['A key on a string','Greenhouse','Mira places a spare key beside your tea. "You do not have to knock. Even if you just need somewhere quiet."',[
 ['Offer to take the early watering shift.','"Only if you want it." You add your name to the chart. Oddish is already waiting by the can.',20],
 ['Plan a quiet afternoon here together.','Mira brings another chair inside. Your plant has outgrown its first pot.',20]]]
 ],
 outings:[
 ['Seeds at the market','Market','A seller offers a rare seed with no label. Mira looks curious, then doubtful.',[
 ['Ask where it came from and how to grow it.','The seller finds the missing tag. It is a common bean. Mira buys it anyway.',45],
 ['Stick to the seeds on your list.','You leave with exactly what the garden needs, and enough coins for tea.',20],
 ['Laugh at Mira for believing the seller.','"I was asking." She goes quiet for the rest of the market.',-25]]],
 ['Picnic among the herbs','Garden','Oddish knocks over a cup. Tea runs across Mira\'s sketchbook.',[
 ['Save the dry pages and help clean up.','Some drawings survive. Mira pins the others up to dry and sketches you holding a towel.',45],
 ['Offer her your notebook.','"I will try not to water this one." She copies the planting dates first.',25],
 ['Blame Oddish for ruining lunch.','Mira scoops Oddish into her lap. "It was an accident."',-25]]],
 ['A walk for cuttings','Riverside','Mira spots a plant beyond a closed garden gate.',[
 ['Knock and ask the owner for a cutting.','The owner sends you home with three, plus a very long story about tomatoes.',45],
 ['Sketch it from the path.','Mira adds it to her list. "We can ask another time."',20],
 ['Reach over the fence and take it.','Mira asks you to put it back. The walk home is short.',-30]]]
 ]
},
{
 id:'theo',name:'Theo',role:'The repair shop apprentice',partner:81,team:[81,100,599,436,374,137],chapters:[4,9,14],color:'#638699',
 bio:'Can repair a radio with three spare screws. Gets nervous when someone watches over his shoulder.',
 intro:'The doorbell works now. It also opens the till. I am fixing that part next. Theo, by the way.',
 talk:['Magnemite sorted my screws by size. Then stuck them all to the ceiling.','I found the fault. It was the wire I was certain was fine.','There is a spare stool here if you want to sit. Just not the one with the loose leg.'],
 win:'I saw what you did there. About two turns too late, but I saw it.',
 lose:'That worked? Sorry. Good match. I was not sure it would.',
 events:[
 ['The stuck drawer','Repair shop','Theo is struggling with a drawer while customers wait. "It opens if you lift the left side. Usually."',[
 ['Hold the drawer while he checks the runner.','A loose screw drops out. "I have been fighting that all week." He saves you a stool.',25],
 ['Pull it hard enough to get it open.','The drawer opens. Its contents go everywhere. Theo finds a broom.',-10]]],
 ['The quiet bench','Repair shop','Theo has finished a radio. He keeps adjusting it whenever you look over. "It sounded better a minute ago."',[
 ['Ask if he would rather have some space.','"Five minutes? Then I can show you." When he calls you back, the station is clear.',25],
 ['Tell him every adjustment you would make.','His hands stop moving. "I had a plan. Let me try it first."',-10]]],
 ['An unsigned ticket','Shop counter','A repaired kettle comes back with a thank-you note addressed to the shop owner. Theo folds the work ticket into a tiny square.',[
 ['Ask whether he signed his work.','"I did not think I should." He writes his name on the next ticket, very carefully.',25],
 ['Tell the customer Theo did it without asking him.','The customer thanks him. He is pleased, but later asks for a little warning next time.',10]]],
 ['The wrong part','Workshop','Theo ordered the wrong motor. "If I tell the owner, she will know I do not belong here." Magnemite nudges the unopened box.',[
 ['Offer to sit with him while he explains.','The owner finds the return label. Theo had prepared a much longer apology.',30],
 ['Suggest hiding it under the bench.','"Then I will still have the wrong motor tomorrow." He takes the box to the counter.',-10]]],
 ['A little signal','Hill path','Theo has built two pocket radios. One works only when you stand on a particular stone. "This is not the demonstration I planned."',[
 ['Stay on the stone and test one change at a time.','By sunset you can hear each other from the footbridge. Theo writes the working settings on both cases.',25],
 ['Say the radios are perfect already.','He looks at the silent receiver. "They are not. But I think they can be."',0]]],
 ['Open workshop','Town hall','Theo has agreed to teach a repair class. He checks his notes while the first neighbors arrive. "What if they ask something I do not know?"',[
 ['Suggest saying you will find out together.','That is exactly what happens. A broken lamp becomes everyone\'s problem, then everyone\'s success.',30],
 ['Offer to answer all the questions for him.','"Could you help with the chairs instead? I want to try." He steps up to the workbench.',5]]],
 ['Your frequency','Repair shop','Theo hands you a pocket radio with your initials scratched into the back. "Same channel as mine. If it stops working, bring it over."',[
 ['Test it from just outside the door.','"I can still see you," he says through the speaker. You keep talking until you reach the bridge.',20],
 ['Ask him to show you how to repair it.','He clears half his bench. There is room for two sets of tools now.',20]]]
 ],
 outings:[
 ['The salvage shelf','Junk shop','Theo finds a battered radio. The seller says nobody has managed to fix it.',[
 ['Ask Theo what he would check first.','He turns it over, already smiling. You carry the spare parts home.',45],
 ['Look for an easier repair.','You choose a lamp with a broken switch. It is working by lunch.',20],
 ['Tell the seller Theo can definitely fix anything.','Theo puts the radio down. "Please do not sell my work before I have looked at it."',-25]]],
 ['Lunch by the workshop','Bakery steps','Theo starts explaining a circuit, then apologizes for talking too much.',[
 ['Ask about the bit you did not understand.','He draws it on the paper bag. You finally see why the switch matters.',45],
 ['Suggest talking about something else today.','"Sure. Have you tried the apple buns?" He has been saving you one.',15],
 ['Pretend to listen while checking your phone.','He trails off halfway through the explanation.',-25]]],
 ['The model fair','Town hall','Theo\'s model train stops just before the judges arrive.',[
 ['Help him check the track connections.','One piece is loose. The train starts with seconds to spare.',45],
 ['Stay beside him while he decides what to do.','He takes a breath and starts at the power supply. You keep curious hands off the model.',25],
 ['Announce that his design must be wrong.','He asks you to step back from the table.',-30]]]
 ]
},
{
 id:'june',name:'June',role:'The trail guide',partner:133,team:[133,58,198,179,234,214],chapters:[6,7,10],color:'#ba8752',
 bio:'Knows every path out of town. Always packs an extra lunch, even when she says she is walking alone.',
 intro:'You headed out? Take the left path after the bridge. The right one ends in mud. Ask me how I know.',
 talk:['Eevee found a shortcut. It took us straight back to breakfast.','The bridge is dry again. I checked both sides this time.','I packed too much bread. This is your problem now.'],
 win:'Nice one. Eevee, we are taking the scenic route home to think about that.',
 lose:'You made us work for it. Water break?',
 events:[
 ['A spare lunch','Trail entrance','June hands you a wrapped sandwich before asking your name. "I always pack two. Bad habit." Eevee noses the second bundle.',[
 ['Offer to carry the drinks.','"Deal." By the first bend, you know each other\'s names and least favorite sandwich fillings.',25],
 ['Say you prefer to walk alone.','"No problem. Keep the sandwich." She points out the muddy turn before leaving.',5]]],
 ['The washed-out path','Stream crossing','The stepping stones are underwater. June keeps looking between the map and the current. "It was fine yesterday."',[
 ['Suggest marking the closure and turning back.','You leave a clear sign at the fork. June draws a new route on the back of the map.',25],
 ['Dare her to cross anyway.','"No." She folds the map. "Not with you or Eevee in that water."',-20]]],
 ['A map full of blanks','Lookout','June shows you a map from her first solo trip. Most of the page is blank. "I came home early. I told everyone I saw the whole valley."',[
 ['Ask about the part she did see.','She tells you about a tiny lake and a terrible campsite. The story is better without the invented miles.',25],
 ['Ask why she lied.','"I was embarrassed." She looks down at the map. You finish lunch quietly.',-5]]],
 ['The invitation','Town gate','A guide from another town has offered June a place on a long expedition. "I wanted this. Now I keep finding reasons not to answer."',[
 ['Help her list what she needs to know.','You write questions about the route, the team, and Eevee. June sends a reply before dinner.',30],
 ['Ask her to stay because you would miss her.','"I would miss you too." She puts the invitation away, still undecided.',-10]]],
 ['Packing light','June\'s porch','June has packed four maps, three jackets, and a heavy old cooking pot. Her bag will not close.',[
 ['Let her choose what matters, then help repack.','The pot stays. Two jackets go. "I make very good soup," she explains.',25],
 ['Remove things while she is inside.','She notices at once. "Please ask before you decide what I need."',-20]]],
 ['A letter from the road','Post office','June is home for a short visit. She brings the letter she tried to send you, stained by rain. "Apparently waterproof ink is a suggestion."',[
 ['Ask her to read the parts she remembers.','You hear about the ridge, the soup, and the day Eevee refused to leave a warm inn.',25],
 ['Tell her about town while you dry the pages.','She listens with her boots on the doorstep. "I missed the ordinary stuff."',25]]],
 ['A place on the map','Lookout','June unfolds a new map. The little lake from her first trip has a path drawn all the way around it. "I would like to go back. With you this time."',[
 ['Pick a day and pack the lunches.','June adds your initials beside the trail. Eevee claims the middle of the picnic blanket.',20],
 ['Ask her to show you her favorite stop first.','She takes you to a bend you would have walked past. There is room for both of you on the flat rock.',20]]]
 ],
 outings:[
 ['A fork in the trail','Pine woods','June offers a steep shortcut or a longer walk by the stream.',[
 ['Take the stream path and stop for lunch.','You find a dry bank with space for Eevee to nap. Nobody checks the time.',45],
 ['Choose the climb and check that everyone is comfortable.','June sets a steady pace. The view is worth the pauses.',30],
 ['Race ahead without telling her.','She spends the next ten minutes calling your name.',-30]]],
 ['Rain at the lookout','Lookout shelter','Your picnic is rained out. June unwraps some very damp bread.',[
 ['Make up names for the clouds while you eat.','The worst one looks like her cooking pot. She laughs hard enough to drop a crust.',45],
 ['Head back for hot soup.','You reach town soaked but hungry. June knows a place with spare towels.',25],
 ['Complain that she ruined the outing.','"I checked the forecast." She packs the blanket in silence.',-25]]],
 ['Wildlife on the path','Meadow','A nervous wild Pokémon is blocking the path with its young.',[
 ['Wait quietly and give them space.','They move on after a few minutes. June points out the tiny tracks they leave behind.',45],
 ['Take a different route.','It adds a little distance. June finds flowers she has not seen here before.',25],
 ['Try to scare them away.','June steps between you and the meadow. "We can walk around."',-30]]]
 ]
},
{
 id:'ellis',name:'Ellis',role:'The sketchbook regular',partner:235,team:[235,280,175,300,358,517],chapters:[1,11,15],color:'#95788b',
 bio:'Draws at the café window. Smeargle considers every empty wall an invitation. Ellis disagrees with varying success.',
 intro:'Hold still. Sorry, that sounded strange. Smeargle likes your hat. I was trying to draw him looking at it.',
 talk:['Smeargle painted my shoes. They were not matching before, so I suppose he helped.','The café changed its mugs. I had only just learned to draw the old ones.','I left a page blank on purpose today. It is bothering me less than expected.'],
 win:'I thought I had that one. The sketch of your last move is going to be very dramatic.',
 lose:'Good match. Hold that expression a second. No? Worth asking.',
 events:[
 ['An unfinished sketch','Café window','Ellis turns the sketchbook away as you sit down. "It is not finished. Most of them are not."',[
 ['Ask what they are working on.','They show you Smeargle asleep under a chair. One paw is still a circle. "That bit is difficult."',25],
 ['Reach for the book to take a look.','Ellis holds it closer. "You can ask, you know."',-15]]],
 ['The wrong color','Art stall','Ellis has mixed a sky that looks more green than blue. Smeargle seems delighted. "He is not a reliable critic."',[
 ['Ask whether they want to keep the strange sky.','Ellis paints one green cloud, then another. "Maybe it rained leaves."',25],
 ['Tell them to paint over it before anyone sees.','"I could." They close the paint box instead.',-10]]],
 ['Someone else\'s wall','Café courtyard','Smeargle has painted the courtyard wall without permission. Ellis has a bucket and a very worried look.',[
 ['Help them talk to the owner before cleaning.','The owner asks for a small border and the rest washed off. Smeargle accepts the compromise badly.',25],
 ['Say it looks good, so permission does not matter.','"It is still their wall." Ellis picks up the bucket.',-10]]],
 ['The entry form','Café window','An exhibition form sits under Ellis\'s cup. "They want a finished piece. That seems personal."',[
 ['Offer to help carry the painting when it is ready.','"You are assuming I will enter." The next morning they ask how much your bag can hold.',30],
 ['Fill in the form for them.','Ellis crosses out the entry. "I need to choose this myself."',-20]]],
 ['Opening night','Town gallery','Ellis is hiding behind a display board. Two visitors are discussing their painting. Neither has noticed them.',[
 ['Stay nearby and let them decide when to step out.','After a minute, Ellis introduces themself. You hold the coat they nearly forgot to take off.',25],
 ['Call the visitors over immediately.','Ellis answers politely, then asks you for some air outside.',-10]]],
 ['A place for mistakes','Art room','Ellis pins a rejected painting above the workbench. "I keep trying to make this corner perfect. It is where I am supposed to spill things."',[
 ['Bring an old shirt and paint beside them.','Your sleeves acquire several new colors. Smeargle approves of both paintings without hesitation.',25],
 ['Ask about the rejected piece.','Ellis shows you what they would change, then what they still like. Both lists are quite long.',25]]],
 ['The window seat','Café','A small framed sketch is waiting at your usual seat. It shows five trainers squeezed around a table, with your chair pulled close.',[
 ['Ask Ellis to sign it.','They sign the corner without apologizing for a single line. "There. Finished."',20],
 ['Offer a sketch of your own in return.','Ellis finds a place for it above the workbench. The crooked table legs are their favorite part.',20]]]
 ],
 outings:[
 ['Sketching at the café','Café','Ellis asks what you think of a new drawing. One hand is clearly unfinished.',[
 ['Point out a detail you like, then ask about the hand.','"I was hoping you would notice the coat." They turn the page back to the difficult bit.',45],
 ['Say you are not sure how to judge art.','"You can just tell me what you see." You spend a while doing exactly that.',25],
 ['Say it is perfect without looking.','Ellis closes the book. "You do not have to pretend."',-25]]],
 ['The gallery bench','Gallery','Ellis is studying a painting you do not like.',[
 ['Ask what catches their eye.','You still dislike the colors, but now you notice the tiny figure in the doorway.',45],
 ['Explain your opinion without dismissing theirs.','You disagree for ten happy minutes. Ellis buys a postcard of the painting.',30],
 ['Say only an idiot would like it.','They move to another room. You give them some space.',-30]]],
 ['Chalk on the square','Town square','Children ask to join Ellis\'s chalk drawing. The careful border is already smudged.',[
 ['Ask Ellis where everyone can add something.','The border becomes a whole street of uneven houses. Smeargle paints himself a very large door.',45],
 ['Offer to hand out chalk and keep the path clear.','Ellis gets to draw while you manage a small, colorful queue.',25],
 ['Send the children away without asking.','Ellis puts down the chalk. "I wanted to make room for them."',-25]]]
 ]
}
];

window.TRAINER_PORTRAITS = {"rowan":"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20156%22%3E%3Crect%20width%3D%22128%22%20height%3D%22156%22%20rx%3D%2210%22%20fill%3D%22%23eddbb7%22%2F%3E%3Ccircle%20cx%3D%2265%22%20cy%3D%2272%22%20r%3D%2251%22%20fill%3D%22%23f9edcf%22%2F%3E%3Cpath%20d%3D%22M14%20156V131Q17%20105%2050%20102H80Q112%20107%20116%20136V156%22%20fill%3D%22%23ad644b%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M53%2088v23l11%2012%2013-12V88%22%20fill%3D%22%23d9a878%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M29%2075L28%2044%2048%2023%2075%2018%2098%2035%2094%2072%2080%2045%2069%2059%2056%2045%2038%2077Z%22%20fill%3D%22%2356372c%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2264%22%20cy%3D%2268%22%20rx%3D%2229%22%20ry%3D%2237%22%20fill%3D%22%23d9a878%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M34%2057Q31%2024%2065%2025Q96%2024%2095%2055L82%2043%2066%2052%2048%2043Z%22%20fill%3D%22%2356372c%22%2F%3E%3Cpath%20d%3D%22M47%2068h5m25%200h5%22%20stroke%3D%22%233e2e24%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M58%2085q7%206%2014-1%22%20fill%3D%22none%22%20stroke%3D%22%2370452f%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M42%20108l22%2020%2021-20M64%20128v27%22%20fill%3D%22none%22%20stroke%3D%22%23f8e8c7%22%20stroke-width%3D%224%22%2F%3E%3C%2Fsvg%3E","mira":"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20156%22%3E%3Crect%20width%3D%22128%22%20height%3D%22156%22%20rx%3D%2210%22%20fill%3D%22%23eddbb7%22%2F%3E%3Ccircle%20cx%3D%2265%22%20cy%3D%2272%22%20r%3D%2251%22%20fill%3D%22%23f9edcf%22%2F%3E%3Cpath%20d%3D%22M14%20156V131Q17%20105%2050%20102H80Q112%20107%20116%20136V156%22%20fill%3D%22%2378895b%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M53%2088v23l11%2012%2013-12V88%22%20fill%3D%22%23e8b58d%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M26%2092V53Q23%2016%2061%2018Q103%2014%2099%2064L108%20111%2084%20111%2083%2050Q64%2074%2037%2051L41%20108%2022%20108Z%22%20fill%3D%22%23643b26%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2264%22%20cy%3D%2268%22%20rx%3D%2229%22%20ry%3D%2237%22%20fill%3D%22%23e8b58d%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M34%2057Q31%2024%2065%2025Q96%2024%2095%2055L82%2043%2066%2052%2048%2043Z%22%20fill%3D%22%23643b26%22%2F%3E%3Cpath%20d%3D%22M47%2068h5m25%200h5%22%20stroke%3D%22%233e2e24%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M58%2085q7%206%2014-1%22%20fill%3D%22none%22%20stroke%3D%22%2370452f%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M42%20108l22%2020%2021-20M64%20128v27%22%20fill%3D%22none%22%20stroke%3D%22%23f8e8c7%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M87%2045q-12-15%204-18q14%206-1%2020%22%20fill%3D%22%23e4b578%22%20stroke%3D%22%2387683d%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E","theo":"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20156%22%3E%3Crect%20width%3D%22128%22%20height%3D%22156%22%20rx%3D%2210%22%20fill%3D%22%23eddbb7%22%2F%3E%3Ccircle%20cx%3D%2265%22%20cy%3D%2272%22%20r%3D%2251%22%20fill%3D%22%23f9edcf%22%2F%3E%3Cpath%20d%3D%22M14%20156V131Q17%20105%2050%20102H80Q112%20107%20116%20136V156%22%20fill%3D%22%23638699%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M53%2088v23l11%2012%2013-12V88%22%20fill%3D%22%23bc8965%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M27%2069L25%2038Q63%202%2099%2038L99%2072%2084%2050%2040%2052Z%22%20fill%3D%22%23303631%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2264%22%20cy%3D%2268%22%20rx%3D%2229%22%20ry%3D%2237%22%20fill%3D%22%23bc8965%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M34%2057Q31%2024%2065%2025Q96%2024%2095%2055L82%2043%2066%2052%2048%2043Z%22%20fill%3D%22%23303631%22%2F%3E%3Cpath%20d%3D%22M47%2068h5m25%200h5%22%20stroke%3D%22%233e2e24%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M58%2085q7%206%2014-1%22%20fill%3D%22none%22%20stroke%3D%22%2370452f%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M42%20108l22%2020%2021-20M64%20128v27%22%20fill%3D%22none%22%20stroke%3D%22%23f8e8c7%22%20stroke-width%3D%224%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23493a30%22%20stroke-width%3D%223%22%3E%3Crect%20x%3D%2238%22%20y%3D%2259%22%20width%3D%2223%22%20height%3D%2219%22%20rx%3D%224%22%2F%3E%3Crect%20x%3D%2269%22%20y%3D%2259%22%20width%3D%2223%22%20height%3D%2219%22%20rx%3D%224%22%2F%3E%3Cpath%20d%3D%22M61%2065h8%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E","june":"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20156%22%3E%3Crect%20width%3D%22128%22%20height%3D%22156%22%20rx%3D%2210%22%20fill%3D%22%23eddbb7%22%2F%3E%3Ccircle%20cx%3D%2265%22%20cy%3D%2272%22%20r%3D%2251%22%20fill%3D%22%23f9edcf%22%2F%3E%3Cpath%20d%3D%22M14%20156V131Q17%20105%2050%20102H80Q112%20107%20116%20136V156%22%20fill%3D%22%23ba8752%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M53%2088v23l11%2012%2013-12V88%22%20fill%3D%22%23e3aa7c%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M26%2088L24%2052Q29%2012%2067%2017Q102%2019%2098%2064L113%20103%2090%20113%2082%2053%2037%2061%2042%2098Z%22%20fill%3D%22%23804628%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2264%22%20cy%3D%2268%22%20rx%3D%2229%22%20ry%3D%2237%22%20fill%3D%22%23e3aa7c%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M34%2057Q31%2024%2065%2025Q96%2024%2095%2055L82%2043%2066%2052%2048%2043Z%22%20fill%3D%22%23804628%22%2F%3E%3Cpath%20d%3D%22M47%2068h5m25%200h5%22%20stroke%3D%22%233e2e24%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M58%2085q7%206%2014-1%22%20fill%3D%22none%22%20stroke%3D%22%2370452f%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M42%20108l22%2020%2021-20M64%20128v27%22%20fill%3D%22none%22%20stroke%3D%22%23f8e8c7%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M18%2039h89L91%2025H42Z%22%20fill%3D%22%23bc9561%22%20stroke%3D%22%2363482e%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E","ellis":"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20156%22%3E%3Crect%20width%3D%22128%22%20height%3D%22156%22%20rx%3D%2210%22%20fill%3D%22%23eddbb7%22%2F%3E%3Ccircle%20cx%3D%2265%22%20cy%3D%2272%22%20r%3D%2251%22%20fill%3D%22%23f9edcf%22%2F%3E%3Cpath%20d%3D%22M14%20156V131Q17%20105%2050%20102H80Q112%20107%20116%20136V156%22%20fill%3D%22%2395788b%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M53%2088v23l11%2012%2013-12V88%22%20fill%3D%22%23d8aa8a%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M25%2088L23%2043Q40%2013%2075%2020L102%2044%2097%2089%2082%2072%2083%2047%2057%2062%2038%2051%2040%2090Z%22%20fill%3D%22%2349362f%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cellipse%20cx%3D%2264%22%20cy%3D%2268%22%20rx%3D%2229%22%20ry%3D%2237%22%20fill%3D%22%23d8aa8a%22%20stroke%3D%22%23593e2d%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20d%3D%22M34%2057Q31%2024%2065%2025Q96%2024%2095%2055L82%2043%2066%2052%2048%2043Z%22%20fill%3D%22%2349362f%22%2F%3E%3Cpath%20d%3D%22M47%2068h5m25%200h5%22%20stroke%3D%22%233e2e24%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M58%2085q7%206%2014-1%22%20fill%3D%22none%22%20stroke%3D%22%2370452f%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M42%20108l22%2020%2021-20M64%20128v27%22%20fill%3D%22none%22%20stroke%3D%22%23f8e8c7%22%20stroke-width%3D%224%22%2F%3E%3Cpath%20d%3D%22M26%2035Q32%209%2072%2015L95%2031%2080%2040Z%22%20fill%3D%22%236d5b79%22%20stroke%3D%22%23513947%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E"};

// Supplied trainer artwork. Keep original files unchanged.
window.TRAINER_PORTRAITS.rowan = "assets/trainers/rowan-portrait.png";
window.TRAINER_PORTRAITS.mira = "assets/trainers/mira-portrait.png";

window.TRAINER_PORTRAITS.theo = "assets/trainers/theo-portrait.png";
window.TRAINER_PORTRAITS.june = "assets/trainers/june-portrait.png";
window.TRAINER_PORTRAITS.ellis = "assets/trainers/ellis-portrait.png";

/* How far each trainer's head sits right(+)/left(-) of the centre of its own
   image file, as a percentage of image width. The portraits are already cropped
   around the face by tools/make-trainer-heads.py, so these are only the small
   leftovers. Measured by skin tone, because a ponytail drags a silhouette
   measure sideways: June's hair reads 6% off while her face is 0.7% off. */
window.TRAINER_HEAD_SHIFT = {rowan:0,mira:0,theo:0,june:0,ellis:0};
