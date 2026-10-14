/* The Periodic Coast's question bank, and the one helper every chem question
   file feeds it through.

   Record shape (one array per question, so the files stay compact):
     [id, chapter, lesson, tier, tag, kind, question, choices|accepted, answer, why, [h1, h2, h3], opts?]

   kind 'mcq'  choices is the option list (five, like the exam's a-e) and
               answer is the index of the right one.
   kind 'num'  a typed numeric answer. choices holds the display answer(s) with
               units, answer is the number in the units the question asks for,
               and opts.tol is the relative tolerance (default 0.01 = 1%) or
               opts.abs an absolute one. "5.61e-19", "5.61 x 10^-19",
               "5.61×10⁻¹⁹" and "5.61 × 10^-19 J" all match.
   kind 'fill' a short typed word or phrase; choices lists every accepted
               spelling (matched lower-cased, whitespace collapsed).

   Tier is difficulty, because tier is what a move asks for:
     1 recall, 2 one-step application, 3 multi-step problem, 4 exam-level.
   Tags: Concept, Calculation, Exam, Worksheet, Lecture, Trap.

   Text is plain Unicode (H₂O, SO₄²⁻, 6.626 × 10⁻³⁴, ΔH°f, →). Question text is
   escaped before it reaches the page, so no markup. */
window.CHEM_QBANK = window.CHEM_QBANK || {};

function chemAddQuestions(list) {
  list.forEach(function (r) {
    var rec = { id: r[0], chapter: r[1], lesson: r[2], t: r[3], tag: r[4], q: r[6],
                why: r[9], hints: r[10] || [], code: '' };
    var kind = r[5], opts = r[11] || {};
    if (opts.src) rec.source = opts.src;   // what a past-exam twin was modelled on
    if (kind === 'mcq') { rec.k = 'mcq'; rec.c = r[7]; rec.a = r[8]; }
    else if (kind === 'num') {
      rec.k = 'fill'; rec.match = 'number'; rec.a = r[7]; rec.num = r[8];
      if (opts.abs != null) rec.abs = opts.abs; else rec.tol = opts.tol != null ? opts.tol : 0.01;
    } else { rec.k = 'fill'; rec.a = r[7]; }
    (CHEM_QBANK[r[1]] = CHEM_QBANK[r[1]] || []).push(rec);
  });
}

window.chemAddQuestions = chemAddQuestions;
