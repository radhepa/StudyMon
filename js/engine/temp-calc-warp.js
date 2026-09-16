/* ============================================================================
   TEMPORARY: one-click region warp chip in the topbar.

   Why this exists: Bootstrap Town is being revamped and the Riverside Pier -
   the in-world way to reach the ferry berth and cross to the Converging Isles -
   is gone for now. Without it there is no reliable route to the calculus
   region, and the whole point of that region is that it must never be
   unreachable before a calculus exam.

   HOW TO DELETE THIS (four steps, nothing else touches it):
     1. delete this file:  js/engine/temp-calc-warp.js
     2. delete its <script> tag in index.html (marked TEMP)
     3. delete the one line in renderTopbar() in js/engine/ui.js (marked TEMP)
     4. delete the .temp-warp-chip block in css/ui.css (marked TEMP)

   Step 1 alone is enough to make the button vanish - every call site is
   guarded with `typeof ... === 'function'` - the rest just tidies up.
   Nothing else in the game reads anything defined here. The two checks that
   mention it are in tools/check-house.cjs, under "the temporary warp chip";
   delete that block too.
   ========================================================================== */

/* The chip sails to whichever region you are not currently standing in, so it
   can never strand you on the far side of a missing pier. sailTo() already
   carries your team, money and friends and leaves badges where they were
   earned, so this is a shortcut to the existing crossing, not a new mechanic. */
function tempCalcWarpChip() {
  if (typeof SUBJECTS === 'undefined' || typeof activeSubject !== 'function') return '';
  var here = activeSubject();
  var target = here === 'calc' ? 'c' : 'calc';
  var def = SUBJECTS[target];
  if (!def) return '';
  return '<button class="chip temp-warp-chip" onclick="tempCalcWarp()" ' +
    'title="Temporary shortcut while the pier is rebuilt">⇥ ' +
    esc(def.short || def.name) + '</button>';
}

function tempCalcWarp() {
  var target = activeSubject() === 'calc' ? 'c' : 'calc';
  if (typeof sailTo !== 'function') { toast('The crossing is not loaded.'); return; }
  sailTo(target);
}
