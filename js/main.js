/* Boot. */

function fleeToMap() {
  if (B && !B.over && B.kind !== 'wild') {
    if (!confirm('Leave this battle? You will not earn a win or a battle reward.')) return;
  }
  if (B) { clearInterval(B.timer); B.over = true; }
  showScreen('map'); renderMap();
}

/* Keyboard: 1-4 or A-D answers, Enter continues. Makes drilling fast. */
document.addEventListener('keydown', function (e) {
  if ($('#modal').classList.contains('on')) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    // Enter uses the focused control, so it never chooses a different reply.
    return;
  }
  var tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea') return;

  if (CUR !== 'battle' && CUR !== 'drill') return;
  var prefix = CUR === 'drill' ? '#dch' : '#ch';
  var map = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
  var k = e.key.toLowerCase();
  if (k in map) {
    var el = $(prefix + map[k]);
    if (el && !el.disabled) { e.preventDefault(); el.click(); return; }
    // no question showing: 1-4 pick a move instead
    if (CUR === 'battle' && '1234'.indexOf(e.key) >= 0) {
      var mv = document.querySelectorAll('#quiz .move')[parseInt(e.key, 10) - 1];
      if (mv && !mv.disabled) { e.preventDefault(); mv.click(); }
    }
    return;
  }
  if (e.key === 'Enter') {
    var cont = $('#contbtn') || $('#dnext');
    if (cont) { e.preventDefault(); cont.click(); }
  }
});

/* Save import wiring. */
document.addEventListener('DOMContentLoaded', function () {
  var inp = document.getElementById('importfile');
  if (inp) {
    inp.addEventListener('change', function () {
      if (!this.files || !this.files[0]) return;
      var f = this.files[0];
      this.value = '';
      importSave(f, function (err) {
        if (err) { toast('Import failed: ' + err.message); return; }
        toast('Save imported.');
        showScreen('map'); renderMap();
      });
    });
  }

  // Fold every subject's data into the registry and virtualise the globals.
  // Must happen before anything reads CHAPTERS or QBANK.
  installSubjects();

  // sanity check the data files loaded (a bare file:// open with a missing file
  // would otherwise just show a blank screen)
  if (typeof DEX === 'undefined' || typeof CHAPTERS === 'undefined' || typeof QBANK === 'undefined') {
    document.getElementById('app').innerHTML =
      '<div class="panel" style="margin-top:40px"><h2>Data files did not load</h2>' +
      '<p>Make sure the whole StudyMon folder was kept together: index.html, css/, js/ and assets/.</p></div>';
    return;
  }

  // Progress lives in localStorage. Some browsers disable it for pages opened
  // straight off the disk, and silently losing a save is the worst outcome here,
  // so say so up front rather than after an hour of play.
  var storageOk = true;
  try {
    localStorage.setItem('cmon.probe', '1');
    localStorage.removeItem('cmon.probe');
  } catch (e) { storageOk = false; }
  if (!storageOk) {
    var warn = document.createElement('div');
    warn.className = 'panel';
    warn.style.cssText = 'margin:0 0 14px;border-color:#d3323c';
    warn.innerHTML = '<b>This browser will not let this page save your progress.</b>' +
      '<div class="small" style="margin-top:6px">Close this tab and start the game with ' +
      '<b>Play StudyMon.bat</b> instead (in the same folder). That serves the game over ' +
      'localhost, where saving works normally.</div>';
    document.getElementById('app').insertBefore(warn, document.getElementById('topbar'));
  }

  var lines = [];
  for (var sid in SUBJECTS) {
    var def = SUBJECTS[sid], n = 0;
    for (var ch in def.QBANK) n += def.QBANK[ch].length;
    lines.push(def.name + ': ' + n + ' questions, ' + def.CHAPTERS.length + ' gyms');
  }
  console.log('StudyMon ready: ' + DEX.length + ' species. ' + lines.join(' | '));

  renderTitle();
  showScreen('title');
});
