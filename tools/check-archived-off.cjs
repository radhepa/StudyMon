/* Friendships are archived (docs/ARCHIVED-FEATURES.md). As a player sees the
   game - no test switch - nothing social may surface: no friendship points,
   no heart scenes, no Friends screens, and a beaten gym leader's hub offers
   only the rematch.
     node tools/check-archived-off.cjs   (needs the local server on 8780) */
const { chromium } = require('./playwright.cjs');

let passed = 0, failed = 0;
function check(name, ok, detail) {
  if (ok) passed++; else failed++;
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (ok || detail === undefined ? '' : '  [' + detail + ']'));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:8780/');
    const r = await page.evaluate(() => {
      S = freshSave(); bindProgress('c'); ensureFriends();
      S.party = [makeMon(4, 20)];
      const out = { flag: FRIENDS_ENABLED, archivedMarker: !!window.STUDYMON_ARCHIVED_FEATURES };
      const before = JSON.stringify(S.friends);
      const award = awardFriendship('c-gym-1', 'meet', { source: 'town' });
      out.awardReason = award.reason;
      out.awardAccepted = award.accepted;
      S.badges[1] = true; S.badges[2] = true;
      syncFriendStory();
      out.pointsUnchanged = JSON.stringify(S.friends) === before;
      showScreen('map'); renderMap();
      openFriends();
      out.friendsScreen = CUR === 'friends';
      openFriend('rowan');
      out.friendScreen = CUR === 'friends' || !!document.querySelector('#modal.on .friend-hearts');
      startFriendScene('rowan', 'event', 0);
      out.scene = !!S.friendScene;
      out.navFriends = [...document.querySelectorAll('#nav button')].some(b => /friend/i.test(b.textContent) && !b.hidden);
      leaderRecordFirstDefeat(leaderForGym(1));
      openLeader(leaderForGym(1));
      const hub = document.querySelector('#modal').innerHTML;
      out.hubOpen = /leader-hub/.test(hub);
      out.hubChat = /Have a chat/.test(hub);
      out.hubFriendship = /Friendship and gifts/.test(hub) || /friend-hearts|♥ ·/.test(hub);
      out.hubRematch = /Rematch /.test(hub);
      out.metAfterVisit = !!(S.friends['c-gym-1'] && S.friends['c-gym-1'].met);
      closeModal();
      return out;
    });
    check('the switch is off for a player (no test override)', r.flag === false && !r.archivedMarker, JSON.stringify(r));
    check('friendship points are never awarded', r.awardReason === 'archived' && !r.awardAccepted && r.pointsUnchanged && !r.metAfterVisit, JSON.stringify(r));
    check('the Friends roster, friend screens and heart scenes cannot open', !r.friendsScreen && !r.friendScreen && !r.scene && !r.navFriends, JSON.stringify(r));
    check('a beaten leader offers the rematch and nothing social', r.hubOpen && r.hubRematch && !r.hubChat && !r.hubFriendship, JSON.stringify(r));
    check('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  } finally {
    await browser.close();
  }
  console.log(passed + '/' + (passed + failed) + ' checks passed');
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
