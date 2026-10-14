# Archived features

These systems are switched off in the game but kept intact - code, data, art
and any progress already stored in a save - so they can be brought back by
flipping one switch. Nothing below is deleted.

## Friendships and heart scenes

**Switch:** `FRIENDS_ENABLED` in `js/engine/ui.js` (currently `false`).

While it is off:

- No heart scenes play: townsfolk heart events, companion events and outings,
  and gym-leader scenes (`startFriendScene` returns at once).
- No friendship points are awarded from badges, battles, talks, heals, gifts
  or rematches (`awardFriendship` returns `reason: 'archived'`, and
  `syncFriendStory` does nothing).
- The Friends roster and individual friend screens cannot open
  (`openFriends`, `openFriend`), which also closes off gifting.
- A beaten gym leader's "Visit" hub shows only the leader and the optional
  rematch: the friendship line, "Have a chat" and "Friendship and gifts" are
  hidden. Rematches, their rewards and their tiers are unchanged.

Kept as data, ready for re-enabling:

- `js/engine/friends.js`, `js/engine/gifts.js`, `js/engine/social-context.js`
- `js/data/folk-events.js`, `cast-bibles.js`, `core-cast-production.js`, the
  Phase 4/5 character files (`*-phase4.js`, `*-phase5.js`), `relationship-web.js`
- Gym-leader profiles: `js/data/gym-leaders.js` and, for the Periodic Coast,
  `js/data/chem/chem-leaders.js`, `chem-townsfolk.js`
- Saved `S.friends` records are never read for gameplay while archived and
  are never cleared, so a player's old hearts return with the feature.

The keepsake "Lamplighter's Taper" can only be found through a friendship, so
it cannot be collected while friendships are archived.

**Testing.** The suites that exercise friendships (friend progression, friend
scenes, gifts, social context, the Phase 4/5 cast suites, Phase 6/7 social
checks) set `window.STUDYMON_ARCHIVED_FEATURES = true` before the page loads,
which turns the switch on for that test page only, so the archived code stays
verified.

**To restore:** set `FRIENDS_ENABLED = true` in `js/engine/ui.js`.

## Bootstrap Town

**Switch:** `TOWN_UI_ENABLED` in `js/engine/ui.js` (currently `false`), and the
hidden "Bootstrap Town" button in `index.html`'s `#nav`. The town, its
villagers, scenes and saves are intact; only the way in is hidden.
