/* Revision combines the introductory syllabus with the uploaded practice
   questions and their later topics. All cards keep their chapter/SRS identity. */
window.C_REVISION_ROUTES = [{
  n: 91, revision: true, id: 'midterm', after: 7,
  route: 'Midterm Revision Route', title: 'C Midterm Revision',
  type: 'normal', teamTypes: ['normal', 'grass', 'electric', 'fighting', 'psychic', 'water', 'ghost'],
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  encounterRoutes: [1, 2, 3, 4, 5], roaming: false,
  previewSpecies: [298, 172, 447],
  encounterBlurb: 'Catch the Pokémon from Routes 1–5, with their usual rarities.',
  blurb: 'Midterm topics and every uploaded practice question, including functions, logic, I/O, loops, arrays, searching, sorting, pointers, memory allocation and strings.',
  questionIds: (window.C_MIDTERM_SOURCES || []).reduce(function (ids, source) {
    return ids.concat(source.questionIds);
  }, [])
}];
