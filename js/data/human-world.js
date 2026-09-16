/* Bootstrap Town living-world prototype.
   This file is deliberately data-only: the engine in human-world.js owns
   movement, time, interaction and rendering. Coordinates are percentages of
   the fixed scene so the same data works at every responsive size.

   Every x/y below is where a person's FEET go. Collision and routes come from
   the walk grids in human-world-nav.js (built by tools/build-human-nav.py from
   the art), and tools/check-human-world-nav.cjs proves each spot is on open
   ground, reachable from the door, and never shared by two people at once. */

/* New community districts use deliberately broad authored lanes for this first
   connected-world pass. tools/build-human-nav.py rasterises these polygons into
   the same deterministic 160 x 90 walk grids as the original Bootstrap scenes.
   Furniture-grade collision can be tightened after the location layout settles. */
var HUMAN_COMMUNITY_CROSS_NAV = {
  areas: [
    [[2,42],[98,42],[98,78],[2,78]],
    [[42,2],[58,2],[58,98],[42,98]],
    [[20,28],[80,28],[80,82],[20,82]],
    [[10,22],[90,22],[90,38],[10,38]]
  ],
  blocks: []
};

/* Residential roads are traced to the actual v2 doorsteps. These are narrower
   than the generic district cross so a character follows the painted lane to a
   house instead of cutting across its garden or through the building art. */
var HUMAN_COTTAGE_ROW_NAV = {
  areas: [
    [[45,2],[55,2],[55,98],[45,98]],
    [[18,24],[88,24],[88,43],[18,43]],
    [[12,40],[88,40],[88,57],[12,57]],
    [[12,63],[88,63],[88,84],[12,84]],
    [[17,20],[27,20],[27,45],[17,45]], [[72,20],[89,20],[89,45],[72,45]],
    [[13,45],[25,45],[25,72],[13,72]], [[73,42],[85,42],[85,72],[73,72]],
    [[13,70],[25,70],[25,85],[13,85]], [[73,70],[85,70],[85,85],[73,85]],
    [[30,34],[70,34],[70,43],[30,43]], [[30,63],[70,63],[70,72],[30,72]],
    [[30,38],[40,38],[40,68],[30,68]], [[60,38],[70,38],[70,68],[60,68]]
  ],
  blocks: [[[40,43],[60,43],[60,63],[40,63]]]
};

var HUMAN_MEADOW_HOMES_NAV = {
  areas: [
    [[45,2],[55,2],[55,98],[45,98]],
    [[18,17],[82,17],[82,31],[18,31]],
    [[10,40],[90,40],[90,56],[10,56]],
    [[17,66],[83,66],[83,84],[17,84]],
    [[19,17],[29,17],[29,32],[19,32]], [[69,17],[79,17],[79,32],[69,32]],
    [[11,40],[23,40],[23,58],[11,58]], [[77,40],[89,40],[89,58],[77,58]],
    [[18,64],[29,64],[29,84],[18,84]], [[70,64],[81,64],[81,84],[70,84]],
    [[33,30],[45,30],[45,63],[33,63]], [[55,30],[67,30],[67,63],[55,63]],
    [[33,30],[67,30],[67,39],[33,39]], [[33,57],[67,57],[67,68],[33,68]]
  ],
  blocks: [[[44,36],[56,36],[56,57],[44,57]]]
};

var HUMAN_RIVERSIDE_HOMES_NAV = {
  areas: [
    [[44,2],[56,2],[56,98],[44,98]],
    [[18,20],[82,20],[82,32],[18,32]],
    /* The public lane visibly reaches both edge exits. */
    [[2,42],[98,42],[98,57],[2,57]],
    [[14,68],[86,68],[86,84],[14,84]],
    [[19,20],[30,20],[30,35],[19,35]], [[68,20],[79,20],[79,35],[68,35]],
    [[13,42],[24,42],[24,60],[13,60]], [[76,42],[87,42],[87,60],[76,60]],
    [[14,67],[25,67],[25,84],[14,84]], [[75,67],[86,67],[86,84],[75,84]],
    [[34,30],[43,30],[43,65],[34,65]], [[61,30],[69,30],[69,65],[61,65]],
    [[34,30],[69,30],[69,38],[34,38]], [[34,59],[69,59],[69,70],[34,70]]
  ],
  blocks: [[[43,34],[61,34],[61,59],[43,59]]]
};

var HUMAN_HILLCREST_NAV = {
  areas: [
    [[44,2],[56,2],[56,98],[44,98]],
    [[17,18],[83,18],[83,33],[17,33]],
    [[2,40],[98,40],[98,57],[2,57]],
    [[15,65],[87,65],[87,84],[15,84]],
    [[20,18],[31,18],[31,38],[20,38]], [[68,18],[79,18],[79,38],[68,38]],
    [[17,64],[29,64],[29,85],[17,85]], [[31,64],[42,64],[42,87],[31,87]],
    [[70,60],[82,60],[82,82],[70,82]],
    [[35,30],[45,30],[45,63],[35,63]], [[55,30],[65,30],[65,63],[55,63]],
    [[35,30],[65,30],[65,40],[35,40]], [[35,55],[65,55],[65,68],[35,68]]
  ],
  blocks: [[[39,24],[61,24],[61,46],[39,46]]]
};

var HUMAN_CAVERN_HOLLOW_NAV = {
  areas: [
    /* Four edge routes meet a loop around the lantern garden. */
    [[2,42],[98,42],[98,56],[2,56]],
    [[45,2],[55,2],[55,98],[45,98]],
    [[16,28],[88,28],[88,37],[16,37]],
    [[14,64],[85,64],[85,81],[14,81]],
    /* Real front-door approaches, kept clear of fences and gardens. */
    [[16,30],[28,30],[28,46],[16,46]],
    [[68,29],[88,29],[88,46],[68,46]],
    [[14,48],[28,48],[28,81],[14,81]],
    [[68,48],[83,48],[83,81],[68,81]],
    /* Detours around the central crystal-and-lantern island. */
    [[30,33],[70,33],[70,42],[30,42]],
    [[30,56],[70,56],[70,67],[30,67]],
    [[30,33],[42,33],[42,67],[30,67]],
    [[58,33],[70,33],[70,67],[58,67]]
  ],
  blocks: [[[42,37],[58,37],[58,57],[42,57]]]
};

window.HUMAN_WORLD_SCENES = {
  square: {
    id: 'square', name: 'Bootstrap Town', subtitle: 'Town Square · outdoors',
    image: 'assets/ui/bootstrap-town-exterior-v1.png',
    imagePosition: 'center', imageSize: 'cover', indoors: false,
    spawns: {
      southGate: [50, 88], centerDoor: [22, 30], martDoor: [52.5, 30],
      labDoor: [75.5, 29.5], homeDoor: [9, 45], residenceDoor: [85.9, 51.7],
      fieldGate: [19.5, 40.5], fieldInside: [19, 52], cafeRoad: [92, 88]
    },
    nav: {
      // Legacy outline, kept for tools that only need a rough shape. The engine walks on HUMAN_WORLD_NAV.
      areas: [
        [[31,27],[68,27],[95,31],[96,69],[76,71],[61,93],[41,93],[33,71],[28,65],[28,44]],
        [[3,25],[31,25],[40,33],[39,62],[31,70],[3,70]]
      ],
      blocks: [],
      // The practice field is fenced; people cross at the stile by the rock.
      links: [['fieldGate', 'fieldInside']]
    },
    // Tall props whose tops hang over walkable ground. The engine redraws these pieces of
    // the scene art over anyone whose feet are above (north of) the prop's base line.
    foreground: [
      { id: 'westLamp', base: 42.5, shape: [[37.8,26.8],[40.8,25],[42,25.6],[42,31.8],[40,31.8],[39.6,30],[39.6,43],[38.3,43],[38.3,30],[37.8,29.8]] },
      { id: 'eastLamp', base: 42.5, shape: [[61.9,28],[64.2,25.8],[65.5,26.3],[66,28],[65.4,29.2],[65.4,43],[64.2,43],[64.2,30.5],[63.8,32.3],[61.9,32.3]] }
    ],
    portals: [
      { id: 'center', label: 'Poké Centre', x: 22, y: 25.5, to: 'center', spawn: 'door' },
      { id: 'mart', label: 'Poké Mart', x: 52.5, y: 24, to: 'mart', spawn: 'door' },
      { id: 'lab', label: 'Professor’s Lab', x: 76, y: 27.5, to: 'lab', spawn: 'door' },
      { id: 'home', label: 'Your Home', x: 7.5, y: 45, to: 'home', spawn: 'door' },
      { id: 'residence', label: 'Cottage Row', x: 85.9, y: 49.4, to: 'residence', spawn: 'door' },
      { id: 'fieldGate', label: 'Practice field', x: 19.5, y: 40.5, to: 'square', spawn: 'fieldInside' },
      { id: 'fieldExit', label: 'Leave the field', x: 18.5, y: 49.5, to: 'square', spawn: 'fieldGate' },
      { id: 'cafeRoad', label: 'Compiler Café district', x: 92, y: 88, to: 'cafe', spawn: 'west' },
      { id: 'meadowRoad', label: 'Meadow Route', x: 50, y: 88, to: 'meadow', spawn: 'north' }
    ]
  },
  mart: {
    id: 'mart', name: 'Poké Mart', subtitle: 'Wren and Tam keep the shelves moving',
    image: 'assets/ui/bootstrap-town-interiors-v2.png', imageSize: '200% 200%', imagePosition: '0% 0%', indoors: true,
    spawns: { door: [50, 86] },
    nav: { areas: [[ [5,38],[95,38],[95,92],[5,92] ]], blocks: [] },
    portals: [{ id: 'out', label: 'Town Square', x: 50, y: 91, to: 'square', spawn: 'martDoor' }]
  },
  center: {
    id: 'center', name: 'Poké Centre', subtitle: 'Rest is part of the work',
    image: 'assets/ui/bootstrap-town-interiors-v2.png', imageSize: '200% 200%', imagePosition: '100% 0%', indoors: true,
    spawns: { door: [50, 86] },
    nav: { areas: [[ [7,39],[93,39],[93,92],[7,92] ]], blocks: [] },
    portals: [{ id: 'out', label: 'Town Square', x: 50, y: 91, to: 'square', spawn: 'centerDoor' }]
  },
  lab: {
    id: 'lab', name: 'Professor’s Lab', subtitle: 'Field notes, specimens, and one tired computer',
    image: 'assets/ui/bootstrap-town-interiors-v2.png', imageSize: '200% 200%', imagePosition: '0% 100%', indoors: true,
    spawns: { door: [50, 86] },
    nav: { areas: [[ [6,34],[94,34],[94,93],[6,93] ]], blocks: [] },
    portals: [{ id: 'out', label: 'Town Square', x: 50, y: 91, to: 'square', spawn: 'labDoor' }]
  },
  home: {
    id: 'home', name: 'Your Home', subtitle: 'A quiet place to study and reset the day',
    image: 'assets/ui/bootstrap-town-interiors-v2.png', imageSize: '200% 200%', imagePosition: '100% 100%', indoors: true,
    spawns: { door: [50, 86] },
    nav: { areas: [[ [6,35],[94,35],[94,93],[6,93] ]], blocks: [] },
    portals: [{ id: 'out', label: 'Town Square', x: 50, y: 91, to: 'square', spawn: 'homeDoor' }],
    /* The four things in this room you can actually use. Each x/y is the spot
       the player stands on, not where the prop is painted - the chest sits
       against the back wall, the aquarium on the stand between the bed and the
       desk, the terrarium on the low cabinet by the right-hand wall. See
       COLLECTABLES.md for the art brief that keeps those three in step. */
    objects: [
      { id: 'bed', label: 'Sleep until morning', icon: '☾', x: 18, y: 56, action: 'sleep' },
      { id: 'desk', label: 'Study desk', icon: '✎', x: 53, y: 38, action: 'desk' },
      { id: 'chest', label: 'Collection chest', icon: '⌸', x: 77.5, y: 41, action: 'chest' },
      { id: 'aquarium', label: 'Aquarium', icon: '❈', x: 29, y: 41, action: 'aquarium' },
      { id: 'terrarium', label: 'Terrarium', icon: '❦', x: 87, y: 50, action: 'terrarium' }
    ]
  },
  residence: {
    id: 'residence', name: 'Cottage Row', subtitle: 'Several townsfolk rent rooms along this lane',
    image: 'assets/ui/bootstrap-town-cottage-row-v2.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { door: [50,86], square: [50,86], archive: [50,8] },
    nav: HUMAN_COTTAGE_ROW_NAV,
    portals: [
      { id: 'out', label: 'Town Square', x: 50, y: 92, to: 'square', spawn: 'residenceDoor' },
      { id: 'archiveRoad', label: 'Archive District', x: 50, y: 5, to: 'archive', spawn: 'south' }
    ]
  },
  cafe: {
    id: 'cafe', name: 'Compiler Café District', subtitle: 'Coffee, study tables, and the town’s busiest crossroads',
    image: 'assets/ui/bootstrap-town-compiler-cafe-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { west: [5,55], east: [95,55], south: [50,88] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'townRoad', label: 'Bootstrap Town', x: 3, y: 55, to: 'square', spawn: 'cafeRoad' },
      { id: 'pierRoad', label: 'Riverside Pier', x: 97, y: 55, to: 'pier', spawn: 'west' },
      { id: 'quarterRoad', label: 'Upper Quarter', x: 50, y: 92, to: 'quarter', spawn: 'north' }
    ]
  },
  meadow: {
    id: 'meadow', name: 'Meadow Route', subtitle: 'Wildflowers, training paths, and the field shelter',
    image: 'assets/ui/bootstrap-town-meadow-route-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { north: [50,7], south: [50,90], west: [5,55], east: [95,55] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'townRoad', label: 'Bootstrap Town', x: 50, y: 4, to: 'square', spawn: 'southGate' },
      { id: 'homesteadRoad', label: 'Meadow Homesteads', x: 50, y: 94, to: 'meadowHomes', spawn: 'north' },
      { id: 'pierRoad', label: 'Riverside Pier', x: 3, y: 55, to: 'pier', spawn: 'south' },
      { id: 'labRoad', label: 'Linden Research Grounds', x: 97, y: 55, to: 'linden', spawn: 'south' }
    ]
  },
  pier: {
    id: 'pier', name: 'Riverside Pier', subtitle: 'Boats, repairs, fishing, and the working riverfront',
    image: 'assets/ui/bootstrap-town-riverside-pier-v2.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { west: [5,55], east: [95,55], south: [50,90] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'cafeRoad', label: 'Compiler Café district', x: 3, y: 55, to: 'cafe', spawn: 'east' },
      { id: 'riverHomes', label: 'Riverside Row', x: 97, y: 55, to: 'riversideHomes', spawn: 'west' },
      { id: 'meadowRoad', label: 'Meadow Route', x: 50, y: 94, to: 'meadow', spawn: 'west' }
    ]
  },
  ridge: {
    id: 'ridge', name: 'Stack Ridge', subtitle: 'Terraced paths and a highland training overlook',
    image: 'assets/ui/bootstrap-town-stack-ridge-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { north: [50,7], south: [50,90], west: [5,55], east: [95,55] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'cavernRoad', label: 'Null Cavern settlement', x: 50, y: 4, to: 'cavern', spawn: 'south' },
      { id: 'archiveRoad', label: 'Archive District', x: 50, y: 94, to: 'archive', spawn: 'north' },
      { id: 'hillHomes', label: 'Hillcrest Terrace', x: 3, y: 55, to: 'hillHomes', spawn: 'east' },
      { id: 'labRoad', label: 'Linden Research Grounds', x: 97, y: 55, to: 'linden', spawn: 'north' }
    ]
  },
  archive: {
    id: 'archive', name: 'The Archive District', subtitle: 'Library gardens, study houses, and quiet public rooms',
    image: 'assets/ui/bootstrap-town-archive-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { north: [50,7], south: [50,90], west: [5,55], east: [95,55] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'ridgeRoad', label: 'Stack Ridge', x: 50, y: 4, to: 'ridge', spawn: 'south' },
      { id: 'cottageRoad', label: 'Cottage Row', x: 50, y: 94, to: 'residence', spawn: 'archive' },
      { id: 'quarterRoad', label: 'Upper Quarter', x: 97, y: 55, to: 'quarter', spawn: 'west' }
    ]
  },
  linden: {
    id: 'linden', name: 'Linden Research Grounds', subtitle: 'Greenhouses, field instruments, and staff housing',
    image: 'assets/ui/bootstrap-town-linden-grounds-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { north: [50,7], south: [50,90], west: [5,55], east: [95,55] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'ridgeRoad', label: 'Stack Ridge', x: 50, y: 4, to: 'ridge', spawn: 'east' },
      { id: 'meadowRoad', label: 'Meadow Route', x: 50, y: 94, to: 'meadow', spawn: 'east' }
    ]
  },
  cavern: {
    id: 'cavern', name: 'Null Cavern Settlement', subtitle: 'A safe, lantern-lit community at the cavern mouth',
    image: 'assets/ui/bootstrap-town-null-cavern-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { cave: [50,12], south: [50,90], west: [5,55], east: [95,55] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'ridgeRoad', label: 'Stack Ridge', x: 50, y: 94, to: 'ridge', spawn: 'north' },
      { id: 'hillRoad', label: 'Hillcrest Terrace', x: 3, y: 55, to: 'hillHomes', spawn: 'east' },
      { id: 'homesRoad', label: 'Cavern Hollow', x: 97, y: 55, to: 'cavernHomes', spawn: 'west' }
    ]
  },
  quarter: {
    id: 'quarter', name: 'Upper Quarter', subtitle: 'Homes, public training grounds, and neighborhood services',
    image: 'assets/ui/bootstrap-town-upper-quarter-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { north: [50,7], south: [50,90], west: [5,55], east: [95,55] },
    nav: HUMAN_COMMUNITY_CROSS_NAV,
    portals: [
      { id: 'archiveRoad', label: 'Archive District', x: 3, y: 55, to: 'archive', spawn: 'east' },
      { id: 'cafeRoad', label: 'Compiler Café district', x: 50, y: 94, to: 'cafe', spawn: 'south' },
      { id: 'hillRoad', label: 'Hillcrest Terrace', x: 97, y: 55, to: 'hillHomes', spawn: 'west' }
    ]
  },
  meadowHomes: {
    id: 'meadowHomes', name: 'Meadow Homesteads', subtitle: 'Gardens, orchards, and family cottages',
    image: 'assets/ui/bootstrap-town-meadow-homesteads-v2.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { north: [50,7] },
    nav: HUMAN_MEADOW_HOMES_NAV,
    portals: [{ id: 'meadowRoad', label: 'Meadow Route', x: 50, y: 4, to: 'meadow', spawn: 'south' }]
  },
  riversideHomes: {
    id: 'riversideHomes', name: 'Riverside Row', subtitle: 'River households, workshops, and a shared washhouse',
    image: 'assets/ui/bootstrap-town-riverside-row-v2.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { west: [5,50] },
    nav: HUMAN_RIVERSIDE_HOMES_NAV,
    portals: [{ id: 'pierRoad', label: 'Riverside Pier', x: 3, y: 50, to: 'pier', spawn: 'east' }]
  },
  hillHomes: {
    id: 'hillHomes', name: 'Hillcrest Terrace', subtitle: 'Highland cottages and a communal overlook',
    image: 'assets/ui/bootstrap-town-hillcrest-terrace-v2.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { west: [3,47], east: [97,47] },
    nav: HUMAN_HILLCREST_NAV,
    portals: [
      { id: 'ridgeRoad', label: 'Stack Ridge', x: 97, y: 55, to: 'ridge', spawn: 'west' },
      { id: 'quarterRoad', label: 'Upper Quarter', x: 3, y: 55, to: 'quarter', spawn: 'east' },
      { id: 'cavernRoad', label: 'Null Cavern settlement', x: 50, y: 4, to: 'cavern', spawn: 'west' }
    ]
  },
  cavernHomes: {
    id: 'cavernHomes', name: 'Cavern Hollow', subtitle: 'Guide lodges, rock homes, and the lamplighter’s lane',
    image: 'assets/ui/bootstrap-town-cavern-hollow-v1.png', imageSize: 'cover', imagePosition: 'center', indoors: false,
    spawns: { west: [3,50] },
    nav: HUMAN_CAVERN_HOLLOW_NAV,
    portals: [
      { id: 'settlementRoad', label: 'Null Cavern settlement', x: 3, y: 50, to: 'cavern', spawn: 'east' }
    ]
  }
};

/* The illustrated town map covers outdoor districts only. Interior rooms are
   represented by their parent district (Bootstrap Town). Edges intentionally
   mirror real bidirectional portals so the map can never promise a route the
   game does not provide. */
window.HUMAN_TOWN_MAP = {
  image: 'assets/ui/bootstrap-town-community-map-v1.png',
  nodes: [
    { id:'cavernHomes', label:'Cavern Hollow', x:50, y:7 },
    { id:'cavern', label:'Null Cavern', x:50, y:29 },
    { id:'hillHomes', label:'Hillcrest Terrace', x:22, y:13 },
    { id:'ridge', label:'Stack Ridge', x:31, y:29 },
    { id:'linden', label:'Linden Grounds', x:72, y:15 },
    { id:'archive', label:'Archive District', x:10, y:31 },
    { id:'quarter', label:'Upper Quarter', x:19, y:43 },
    { id:'residence', label:'Cottage Row', x:31, y:49 },
    { id:'square', label:'Bootstrap Town', x:49, y:49 },
    { id:'cafe', label:'Compiler Café', x:63, y:45 },
    { id:'pier', label:'Riverside Pier', x:85, y:52 },
    { id:'riversideHomes', label:'Riverside Row', x:90, y:37 },
    { id:'meadow', label:'Meadow Route', x:51, y:68 },
    { id:'meadowHomes', label:'Meadow Homesteads', x:58, y:88 }
  ],
  edges: [
    ['cavernHomes','cavern'], ['cavern','ridge'], ['cavern','hillHomes'],
    ['hillHomes','ridge'], ['hillHomes','quarter'], ['ridge','archive'],
    ['ridge','linden'], ['archive','quarter'], ['archive','residence'],
    ['quarter','cafe'], ['residence','square'], ['square','cafe'],
    ['square','meadow'], ['linden','meadow'], ['cafe','pier'],
    ['meadow','pier'], ['pier','riversideHomes'], ['meadow','meadowHomes']
  ]
};

/* Schedules cover the playable 06:00–24:00 day. The engine treats the first
   matching entry as authoritative and mathematically resolves unloaded actors.
   When an entry changes while you watch, the person walks the planned route to
   their next spot (or out through the door that leads where they are going). */
window.HUMAN_WORLD_NPCS = {
  mart: {
    id: 'mart', name: 'Wren', role: 'Mart Clerk', sprite: 'wren', proportion: 'adult', heightRatio: 1, services: ['chat','shop','restock'],
    schedule: [
      [360,470,'residence',35,60,'eating','I open at eight. Tam says breakfast counts as inventory.'],
      [470,480,'square',52.5,31,'walking','Morning. I am cutting it close.'],
      [480,720,'mart',50,47,'working','We have plenty of the red ones. Everything better costs.'],
      [720,840,'square',38,50,'lunch','Ten quiet minutes and then somebody remembers they need a Potion.'],
      [840,1080,'mart',50,47,'working','Afternoon stock always disappears faster.'],
      [1080,1260,'square',49,61,'walking','Closed sign is up. My feet are off duty.'],
      [1260,1440,'residence',35,60,'home','Tomorrow’s order can be tomorrow’s problem.']
    ]
  },
  nurse: {
    id: 'nurse', name: 'Nurse Ada', role: 'Centre Nurse', sprite: 'ada', proportion: 'adult', heightRatio: 1, services: ['chat','heal'],
    schedule: [
      [360,450,'residence',50,35,'home','The town is quiet before the first trainer wakes.'],
      [450,720,'center',50,48,'working','Set your team down here. I have them.'],
      [720,810,'square',63,52,'lunch','Fresh air is part of the prescription.'],
      [810,1080,'center',50,48,'working','You do not need to earn a rest.'],
      [1080,1200,'square',66,58,'watering','The planter needed water. Most things do, eventually.'],
      [1200,1440,'residence',50,35,'home','Centre is closed, but I am still a nurse.']
    ]
  },
  aide: {
    id: 'aide', name: 'Kern', role: 'Lab Aide', sprite: 'kern', proportion: 'adult', heightRatio: 1, services: ['chat'],
    schedule: [
      [360,480,'lab',24,41,'working','The samples do not know it is early.'],
      [480,720,'lab',38,41,'working','Professor Linden is in the field. Again.'],
      [720,810,'square',51,57.5,'lunch','The noticeboard has better handwriting than my notes.'],
      [810,1050,'square',74,42,'research','These flowers are responding to something. Maybe sunlight.'],
      [1050,1260,'lab',38,41,'working','One more result, then I stop. Probably.'],
      [1260,1440,'lab',62,41,'working','If the lights are on, the lab is technically awake.']
    ]
  },
  postie: {
    id: 'postie', name: 'Bell', role: 'Post Runner', sprite: 'bell', proportion: 'young-adult', heightRatio: .96, services: ['chat','delivery'],
    schedule: [
      [360,480,'residence',84,60,'sorting','Routes first, breakfast second.'],
      [480,570,'square',56,30.5,'walking','Mart delivery first. Wren likes punctual parcels.'],
      [570,660,'square',24.5,30.5,'walking','Centre next. Medical post gets the dry pocket.'],
      [660,750,'square',75.5,32,'walking','Kern ordered another stack of field cards.'],
      [750,840,'square',56.5,57.5,'lunch','I know every bench by how long it lets you sit.'],
      [840,1020,'square',50,76,'walking','South route, then the cottages.'],
      [1020,1200,'square',88,52.5,'walking','Last local letters. Then my own feet can be delivered home.'],
      [1200,1440,'residence',84,60,'home','All sorted for tomorrow.']
    ]
  },
  ren: {
    id: 'ren', name: 'Ren', role: 'Youngster', sprite: 'ren', proportion: 'child', heightRatio: .78, services: ['chat','battle'],
    schedule: [
      [360,480,'residence',65,60,'home','I was awake. I was just thinking with my eyes closed.'],
      [480,720,'square',8.5,59.5,'practicing','My Pokémon is extremely brave!'],
      [720,840,'square',46.5,31,'lunch','Training makes you hungry. Thinking also makes you hungry.'],
      [840,1080,'square',15,62,'practicing','One more lap. Then another one more lap.'],
      [1080,1260,'square',8.5,59.5,'practicing','Evening matches count double in my notebook.'],
      [1260,1440,'residence',65,60,'home','Tomorrow I am winning before lunch.']
    ]
  },
  opal: {
    id: 'opal', name: 'Opal', role: 'Lass', sprite: 'opal', proportion: 'child', heightRatio: .80, services: ['chat','battle'],
    schedule: [
      [360,510,'residence',75,60,'home','I am not late. Morning is early.'],
      [510,690,'lab',76,42,'studying','Kern lets me use the quiet desk if I label everything.'],
      [690,840,'square',63.5,61.5,'reading','I am testing whether fountain noise improves recall.'],
      [840,1020,'square',57.5,31,'walking','I only came for one thing. I forgot which thing.'],
      [1020,1260,'square',21.5,57.5,'practicing','Variables first. Battle second.'],
      [1260,1440,'residence',75,60,'home','I wrote tomorrow’s list twice, just in case.']
    ]
  },
  tam: {
    id: 'tam', name: 'Tam', role: 'Shop Hand', sprite: 'tam', proportion: 'adult', heightRatio: 1, services: ['chat','gift'],
    schedule: [
      [360,465,'residence',30,72,'home','Wren says I sleep like a dropped backpack.'],
      [465,720,'mart',21.5,74,'stocking','Front row labels out. Wren checks.'],
      [720,840,'square',33,50,'lunch','Do not tell Wren I brought the good biscuits.'],
      [840,1080,'mart',80,72,'stocking','The shelf was full ten minutes ago.'],
      [1080,1260,'square',15,62,'walking','Closed means I can finally train.'],
      [1260,1440,'residence',30,72,'home','My arms are made of boxes now.']
    ]
  },
  gus: {
    id: 'gus', name: 'Gus', role: 'Gentleman', sprite: 'gus', proportion: 'older-adult', heightRatio: 1.02, services: ['chat','battle'],
    schedule: [
      [360,600,'residence',42,72,'home','A civilized morning begins slowly.'],
      [600,780,'square',41,61.5,'reading','A bench, a book, and no appointment. Ideal.'],
      [780,1020,'square',8.5,59.5,'practicing','A battle settles the mind. Three badges settles the invitation.'],
      [1020,1200,'square',55,64,'walking','An evening constitutional.'],
      [1200,1440,'residence',42,72,'home','Good evening. Properly speaking, good night.']
    ]
  },
  rowan: {
    id: 'rowan', name: 'Rowan', role: 'Your Rival', sprite: 'rowan', proportion: 'teen', heightRatio: .90, services: ['chat','warmup','friend'], companion: true,
    schedule: [
      [360,480,'residence',58,72,'home','I was reviewing. In bed. It counts.'],
      [480,720,'square',13.5,54.5,'practicing','There you are. I saved the good side of the field.'],
      [720,840,'square',46,60,'lunch','Ren thinks lunch is a training category.'],
      [840,1080,'square',13.5,54.5,'practicing','I changed the course. The old record still counts.'],
      [1080,1320,'square',13.5,54.5,'practicing','Evening light makes every mistake look dramatic.'],
      [1320,1440,'residence',58,72,'home','I wrote down today’s losses. Yours too.']
    ]
  }
};

/* Where townsfolk wait out the rain in the Centre, one spot each (in HUMAN_WORLD_NPCS order). */
window.HUMAN_WORLD_RAIN_SPOTS = [[22,58],[32,58],[42,58],[58,58],[68,58],[78,58],[27,70],[37,70],[63,70]];

window.HUMAN_WORLD_ACTIVITY_DEFS = {
  bellRound: {
    name: 'Bell’s delivery round', giver: 'postie', minutes: 40,
    targets: ['mart','nurse','aide'], labels: ['Deliver to Wren','Deliver to Nurse Ada','Deliver to Kern']
  },
  restock: {
    name: 'Wren’s restock', giver: 'mart', minutes: 30, total: 3,
    crates: [[30,74],[38,74],[62,74]], shelf: [21.5,50]
  },
  warmup: {
    name: 'Rowan’s warm-up', giver: 'rowan', minutes: 20,
    markers: [[9,59.5],[16,52.5],[23,57],[15,62.5]]
  }
};
