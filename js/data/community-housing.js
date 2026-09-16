/* Bootstrap Town community housing.
   A home is an address, not a movement restriction: later schedules may send
   any resident anywhere in the connected town. This registry exists now so
   every current community member has somewhere credible to return to before
   the wider villager simulation is built. */

window.COMMUNITY_HOMES = [
  /* Cottage Row and the original town centre. */
  { id:'nurse-house', name:'Nurse House', scene:'residence', doorstep:[50,29], kind:'family-house', residents:[
    'nurse','nurse-cafe','nurse-meadow','nurse-pier','nurse-ridge','nurse-archive','nurse-lab','nurse-cavern','nurse-quarter'
  ]},
  { id:'mart-cottage', name:'Mart Cottage', scene:'residence', doorstep:[19,52], kind:'cottage', residents:['mart','tam'] },
  { id:'bell-cottage', name:'Bell’s Cottage', scene:'residence', doorstep:[78,49], kind:'cottage', residents:['postie'] },
  { id:'kern-room', name:'Kern’s Room', scene:'residence', doorstep:[74,27], kind:'boarding-house', residents:['aide'] },
  { id:'ren-family-home', name:'Ren’s Family Home', scene:'residence', doorstep:[79,27], kind:'family-cottage', residents:['ren'] },
  { id:'opal-family-home', name:'Opal’s Family Home', scene:'residence', doorstep:[85,27], kind:'family-cottage', residents:['opal'] },
  { id:'gus-cottage', name:'Gus’s Cottage', scene:'residence', doorstep:[16,81], kind:'cottage', residents:['gus'] },
  { id:'rowan-family-home', name:'Rowan’s Family Home', scene:'residence', doorstep:[79,81], kind:'family-cottage', residents:['rowan'] },

  /* Café apartments and nearby study houses. */
  { id:'cafe-loft', name:'Café Loft', scene:'cafe', doorstep:[46,28], kind:'workplace-flat', residents:['barista','kip'] },
  { id:'cafe-east-apartments', name:'East Café Apartments', scene:'cafe', doorstep:[53,28], kind:'apartments', residents:['dax','juno','sasha'] },
  { id:'study-house', name:'Study House', scene:'cafe', doorstep:[32,28], kind:'shared-house', residents:['nel','rook'] },
  { id:'ellis-studio', name:'Ellis’s Studio Flat', scene:'cafe', doorstep:[57,28], kind:'flat', residents:['ellis'] },

  /* Meadow Homesteads. Family-home names leave room for parents later without
     inventing or generating those characters during the location pass. */
  { id:'bug-garden-cottage', name:'Bug Garden Cottage', scene:'meadowHomes', doorstep:[24,23], kind:'shared-cottage', residents:['ari','flo'] },
  { id:'pim-family-home', name:'Pim’s Family Home', scene:'meadowHomes', doorstep:[74,23], kind:'family-cottage', residents:['pim'] },
  { id:'picnic-cottage', name:'Picnic Cottage', scene:'meadowHomes', doorstep:[16,52], kind:'shared-cottage', residents:['wisp','holt'] },
  { id:'wynn-orchard-home', name:'Orchard House', scene:'meadowHomes', doorstep:[82,52], kind:'shared-cottage', residents:['birdy','mo2'] },
  { id:'tilda-family-home', name:'Seed House', scene:'meadowHomes', doorstep:[23,81], kind:'family-cottage', residents:['tilda','quill'] },
  { id:'mira-garden-home', name:'Mira’s Garden Home', scene:'meadowHomes', doorstep:[76,81], kind:'cottage', residents:['mira'] },

  /* Riverside Row. */
  { id:'fisher-row-west', name:'Fisher Row West', scene:'riversideHomes', doorstep:[25,27], kind:'duplex', residents:['oz','sal'] },
  { id:'river-house', name:'River Townhouse', scene:'riversideHomes', doorstep:[19,53], kind:'house', residents:['coral'] },
  { id:'diver-cottage', name:'Diver Cottage', scene:'riversideHomes', doorstep:[20,81], kind:'cottage', residents:['perl'] },
  { id:'sailor-cottage', name:'Sailor Cottage', scene:'riversideHomes', doorstep:[80,81], kind:'cottage', residents:['brine','skiff'] },
  { id:'pier-shop-flat', name:'Waterkeeper Cottage', scene:'riversideHomes', doorstep:[81,53], kind:'workplace-flat', residents:['nemo','wade'] },
  { id:'repair-cottage', name:'Repair Cottage', scene:'riversideHomes', doorstep:[73,27], kind:'cottage', residents:['theo'] },

  /* Hillcrest Terrace. */
  { id:'hiker-duplex', name:'Hiker House', scene:'hillHomes', doorstep:[26,27], kind:'duplex', residents:['burl','crag'] },
  { id:'ridge-guide-house', name:'Ridge Guide House', scene:'hillHomes', doorstep:[72,27], kind:'shared-house', residents:['roan','june'] },
  { id:'stoneworkers-cottage', name:'Stoneworkers’ Chalet', scene:'hillHomes', doorstep:[22,76], kind:'shared-cottage', residents:['flint','moss'] },
  { id:'highland-house', name:'Highland Lodge', scene:'hillHomes', doorstep:[36,82], kind:'house', residents:['kes'] },
  { id:'veteran-house', name:'Veteran’s Tower House', scene:'hillHomes', doorstep:[76,75], kind:'shared-house', residents:['ida','tor'] },

  /* Archive boarding houses. */
  { id:'archive-blue-house', name:'Blue Scholar House', scene:'archive', doorstep:[16,29], kind:'boarding-house', residents:['libr','tutor','shelf'] },
  { id:'archive-red-house', name:'Red Scholar House', scene:'archive', doorstep:[84,29], kind:'boarding-house', residents:['sci1','sci2','psy'] },
  { id:'archive-copy-flat', name:'Archive Keeper’s Flat', scene:'archive', doorstep:[50,29], kind:'flat', residents:['clerk2','ink'] },

  /* Research staff lodge. */
  { id:'linden-staff-lodge-a', name:'Linden Staff Lodge A', scene:'linden', doorstep:[14,27], kind:'staff-lodge', residents:['linden','sci-ash','sci-holly'] },
  { id:'linden-staff-lodge-b', name:'Linden Staff Lodge B', scene:'linden', doorstep:[22,27], kind:'staff-lodge', residents:['sci-yew','sci-birk','sci-nim'] },
  { id:'linden-visiting-house', name:'Linden Visiting House', scene:'linden', doorstep:[30,27], kind:'staff-lodge', residents:['sci-oak','lab-shop'] },

  /* Cavern Hollow. The rock duplex has two real entrances and therefore two
     separate addresses; the lamplighter also has a dedicated workshop-home. */
  { id:'cavern-guide-lodge', name:'Cavern Guide Lodge', scene:'cavernHomes', doorstep:[20,34], kind:'lodge', residents:['null'] },
  { id:'cavern-workers-house', name:'Cavern Workers’ Duplex', scene:'cavernHomes', doorstep:[73,33], kind:'duplex', residents:['leak','geo'] },
  { id:'cavern-east-cottage', name:'Crystal Rock Home', scene:'cavernHomes', doorstep:[83,33], kind:'duplex', residents:['spook','echo'] },
  { id:'lamplighter-house', name:'Lamplighter Workshop-Home', scene:'cavernHomes', doorstep:[18,77], kind:'workshop-home', residents:['lamp'] },
  { id:'fen-cottage', name:'Fen’s Moss-Roof Cottage', scene:'cavernHomes', doorstep:[74,75], kind:'cottage', residents:['deep'] },

  /* Upper Quarter townhouses. These are community residents, not gym leaders. */
  { id:'quarter-blue-townhouse', name:'Blue Quarter Townhouse', scene:'quarter', doorstep:[10,76], kind:'townhouse', residents:['ace1','ace2'] },
  { id:'quarter-training-house', name:'Training House', scene:'quarter', doorstep:[23,28], kind:'shared-house', residents:['blk','rocker'] },
  { id:'quarter-garden-house', name:'Quarter Garden House', scene:'quarter', doorstep:[20,76], kind:'shared-house', residents:['beauty','referee'] },
  { id:'quarter-trader-flat', name:'Quarter Trader Flat', scene:'quarter', doorstep:[64,29], kind:'workplace-flat', residents:['shopq'] },
  { id:'odile-cottage', name:'Odile’s Cottage', scene:'quarter', doorstep:[79,76], kind:'cottage', residents:['champ'] }
];

/* Public buildings and work sites receive the same gameplay contract as homes:
   an exact, walkable approach point and an interaction. This prevents a painted
   structure from becoming unreachable scenery. */
window.COMMUNITY_BUILDINGS = [
  { id:'compiler-cafe', name:'Compiler Café', scene:'cafe', doorstep:[50,31], description:'The community café, terrace, and busiest neighborhood meeting place.' },
  { id:'meadow-shelter', name:'Meadow Field Shelter', scene:'meadow', doorstep:[80,29], description:'A staffed shelter for fieldwork, first aid, and bad weather.' },
  { id:'pier-watermill', name:'Riverside Watermill', scene:'pier', doorstep:[20,31], description:'The working watermill, now linked to the main pier by boardwalk.' },
  { id:'pier-supply-kiosk', name:'Pier Supply Kiosk', scene:'pier', doorstep:[30,39], description:'Fishing tackle, repair supplies, and river notices.' },
  { id:'pier-ferryman-hut', name:'Ferryman Hut', scene:'pier', doorstep:[76,39], description:'The river crew’s hut beside the eastern landing.' },
  { id:'ridge-guide-shelter', name:'Stack Ridge Guide Shelter', scene:'ridge', doorstep:[27,28], description:'Maps, climbing gear, and a warm place to rest.' },
  { id:'ridge-overlook', name:'Ridge Training Overlook', scene:'ridge', doorstep:[80,28], description:'A public highland practice ground overlooking the valley.' },
  { id:'archive-library', name:'Community Archive', scene:'archive', doorstep:[50,25], description:'The town library, records room, and public reading hall.' },
  { id:'linden-greenhouse', name:'Linden Greenhouse Laboratory', scene:'linden', doorstep:[72,29], description:'Research greenhouse and specimen laboratory.' },
  { id:'linden-field-shed', name:'Linden Equipment Shed', scene:'linden', doorstep:[82,64], description:'Survey tools and field equipment are stored here.' },
  { id:'cavern-lodge', name:'Null Cavern Miners’ Lodge', scene:'cavern', doorstep:[20,30], description:'A staffed lodge for cavern workers and visitors.' },
  { id:'cavern-guide-station', name:'Cavern Guide Station', scene:'cavern', doorstep:[76,31], description:'Guides, helmets, lamps, and safety briefings.' },
  { id:'cavern-ore-workshop', name:'Ore Workshop', scene:'cavern', doorstep:[18,69], description:'The settlement’s shared ore-sorting workshop.' },
  { id:'cavern-mouth', name:'Null Cavern Entrance', scene:'cavern', doorstep:[50,25], description:'The lantern-lit entrance to the working cavern.' },
  { id:'quarter-training-hall', name:'Community Training Hall', scene:'quarter', doorstep:[28,28], description:'An ordinary public practice hall—not a gym.' },
  { id:'quarter-clinic', name:'Upper Quarter Clinic', scene:'quarter', doorstep:[84,28], description:'A small neighborhood health clinic.' },
  { id:'quarter-trader', name:'Quarter Trader', scene:'quarter', doorstep:[66,30], description:'A covered neighborhood produce and supply stall.' }
];

window.VILLAGER_HOME = {};
window.COMMUNITY_HOMES.forEach(function (home) {
  home.residents.forEach(function (id) { window.VILLAGER_HOME[id] = home.id; });
});
