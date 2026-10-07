/* Phase 7 relationship web: who knows whom, as the player can learn it.

   Each edge is world truth. What the player sees is filtered by
   js/engine/relationship-web.js: an edge appears only once every person on it
   has been met (and `knownWhen`, if given, holds); its `deep` line appears
   only once one of `deepWhen` holds. Unmet people are never named.

   `source` records where the truth comes from, and validateRelationshipWeb()
   checks the web against those sources so it cannot drift:
     bible   Tier 1 CAST_BIBLES relationship edges (Phase 2)
     leader  GYM_LEADER_PROFILES[id].related (Phase 6)
     pair    Phase 5 Tier 2 batches written to complete each other
     thread  Phase 7 threads (js/data/walkins.js)
   Labels describe people's lives only. */
(function () {
  window.RELATIONSHIP_WEB_EDGES = [
    { id: 'rowan-theo', people: ['rowan', 'theo'], source: 'bible', public: 'Friendly rivals',
      deep: 'Rowan road-tests Theo\'s gadgets; Theo keeps reminding Rowan that not everything goes to plan.',
      deepWhen: ['stage:rowan:friend', 'stage:theo:friend'] },
    { id: 'mira-kern', people: ['mira', 'aide'], source: 'bible', public: 'Old friends',
      deep: 'Kern hauls the heavy lab deliveries; Mira makes sure he stops to eat. Neither is the other\'s caretaker.',
      deepWhen: ['stage:mira:friend', 'stage:aide:friend'] },
    { id: 'kern-linden', people: ['aide', 'linden'], source: 'bible', public: 'The Professor and her aide',
      deep: 'The respect is real on both sides. So is the workload, and it is not quite fair.',
      deepWhen: ['stage:aide:trusted', 'stage:linden:trusted'] },
    { id: 'june-ellis', people: ['june', 'ellis'], source: 'bible', public: 'Creative friends',
      deep: 'June brings Ellis sketches from the trails; Ellis treasures June\'s imperfect maps and never asks for neater ones.',
      deepWhen: ['stage:june:friend', 'stage:ellis:friend'] },
    { id: 'linden-hawthorn', people: ['linden', 'c-hawthorn'], source: 'bible', public: 'Colleagues who write to each other',
      deep: 'They disagree about how field work should be done, politely and at length, and admire each other for it.',
      deepWhen: ['stage:linden:friend', 'stage:c-hawthorn:friend'] },
    { id: 'byte-rhea', people: ['c-gym-1', 'calc-gym-1'], source: 'bible', public: 'Pen pals across the water',
      deep: 'They trade hand-drawn maps and charts as equals. Each keeps every one the other sends.',
      deepWhen: ['rewarded:mail:rhea-chart', 'thread-at:chart-exchange:first-visit', 'stage:c-gym-1:friend', 'stage:calc-gym-1:friend'] },
    { id: 'fee-seekers', people: ['c-gym-12', 'c-boss-e3'], source: 'leader', public: 'Share a name',
      deep: 'Family. One is fiercely proud of the other; the other would rather not be mistaken for them.',
      deepWhen: ['stage:c-gym-12:friend', 'stage:c-boss-e3:friend'] },

    { id: 'oz-sal', people: ['oz', 'sal'], source: 'thread', public: 'Fish the same pier, very differently',
      deep: 'They share the end post now. Each has picked up a little of the other\'s way of waiting.',
      deepWhen: ['thread-at:pier-post:shared-post', 'heart-event:oz:oz-folk-restless-angler-event-standing-still-for-once',
        'heart-event:sal:sal-folk-patient-angler-event-teaching-the-wait'] },
    { id: 'mo-dax', people: ['barista', 'dax'], source: 'thread', public: 'The counter and its most permanent customer',
      deep: 'The window table is his by an arrangement neither of them will call an arrangement. He wipes the counter now.',
      deepWhen: ['thread-at:window-table:settled', 'heart-event:barista:barista-folk-counter-event-the-other-side-of-the-counter',
        'heart-event:dax:dax-folk-fixture-event-leaving-the-chair-for-now'] },
    { id: 'corin-delia', people: ['ace1', 'ace2'], source: 'pair', public: 'Both warm up challengers in the Gym Quarter',
      deep: 'Each has seen exactly where the other\'s way of doing things runs out, and has stopped pretending not to.',
      deepWhen: ['heart-event:ace1:ace1-folk-warmup-event-knocking-for-once', 'heart-event:ace2:ace2-folk-standards-event-what-structure-cannot-reach'] },
    { id: 'burl-crag', people: ['burl', 'crag'], source: 'pair', public: 'Hike Stack Ridge together, at different paces',
      deep: 'Each carries something for the other on the climb, and neither of them mentions it.',
      deepWhen: ['thread-at:ridge-pace:summit', 'heart-event:burl:burl-folk-ballast-event-setting-the-kettle-down', 'heart-event:crag:crag-folk-stride-event-more-than-one-step'] },
    { id: 'cavern-keepers', people: ['null', 'leak', 'geo'], source: 'pair', public: 'Keep Null Cavern between them',
      deep: 'All three remember the same bad day underground. Each remembers it differently.',
      deepWhen: ['heart-event:null:null-folk-bearings-event-the-tunnel-he-closed-off', 'heart-event:leak:leak-folk-unclaimed-event-walking-it-back',
        'heart-event:geo:geo-folk-overflow-event-the-half-he-never-got-back'] },
    { id: 'vell-ink', people: ['libr', 'ink'], source: 'pair', public: 'Run the Archive desk together',
      deep: 'The same piece of work, seen from both sides of the desk. They finally talked about it.',
      deepWhen: ['heart-event:libr:libr-folk-catalog-event-what-ink-found', 'heart-event:ink:ink-folk-facsimile-event-correcting-it-out-loud'] },
    { id: 'ari-flo', people: ['ari', 'flo'], source: 'pair', public: 'The meadow\'s two bug catchers, one loud and one quiet',
      deep: 'Each is slowly learning the thing the other finds easy.',
      deepWhen: ['heart-event:ari:ari-folk-stockpile-event-sending-the-first-one-out', 'heart-event:flo:flo-folk-hush-event-the-first-one-she-keeps'] }
  ];
})();
