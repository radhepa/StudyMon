/* Revision combines the midterm syllabus with the uploaded source questions.
   Strings appear only in the official practice items. The full chapter banks
   retain their cards and saved review progress. */
window.C_REVISION_ROUTES = [{
  n: 91, revision: true, id: 'midterm', after: 7,
  route: 'Midterm Revision Route', title: 'C Midterm Revision',
  type: 'normal', teamTypes: ['normal', 'grass', 'electric', 'fighting', 'psychic', 'water', 'ghost'],
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  excludedQuestionIds: [
    // String literals, string input/output, and string-based pointer examples
    // parked outside Chapter 10 are also outside the authored midterm pool.
    'c2-03', 'c2-07', 'c2-21', 'c2-22', 'c2-35', 'c2-43', 'c2-50',
    'c2-tf-009', 'c2-tf-010', 'c5-41',
    'c7-15', 'c7-16', 'c7-20', 'c7-34', 'c7-47', 'c7-48', 'c7-51',
    'c7-ed4-004', 'c7-tf-004', 'c7-tf-005',
    'c10-18', 'c10-40', 'c10-48'
  ],
  encounterRoutes: [1, 2, 3, 4, 5], roaming: false,
  previewSpecies: [298, 172, 447],
  encounterBlurb: 'Catch the Pokémon from Routes 1–5, with their usual rarities.',
  blurb: 'Midterm topics and every uploaded practice question: functions, logic, I/O, loops, arrays, searching, sorting, pointers and memory allocation. Strings are limited to the official practice questions.',
  questionIds: (window.C_MIDTERM_SOURCES || []).reduce(function (ids, source) {
    return ids.concat(source.questionIds);
  }, [])
}];
