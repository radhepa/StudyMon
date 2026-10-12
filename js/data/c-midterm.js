/* Midterm practice reuses the existing bank. IDs below select only the extra
   I/O, character and pointer material; no questions or review IDs are created. */
window.C_REVISION_ROUTES = [{
  n: 91, revision: true, id: 'midterm',
  route: 'Midterm Revision Route', title: 'C Midterm Revision',
  type: 'normal', teamTypes: ['normal', 'grass', 'electric', 'fighting', 'psychic', 'water', 'ghost'],
  chapters: [1, 2, 3, 4, 5],
  blurb: 'All of Chapters 1–5, plus existing questions on printf/scanf, characters and pointers from later chapters.',
  questionIds: [
    // Formatted and character I/O. File opening, modes and file ownership are outside this exam.
    'c7-03', 'c7-04', 'c7-05', 'c7-06', 'c7-08', 'c7-09', 'c7-10', 'c7-11',
    'c7-12', 'c7-13', 'c7-14', 'c7-15', 'c7-16', 'c7-20', 'c7-21', 'c7-23', 'c7-24',
    'c7-32', 'c7-33', 'c7-34', 'c7-35', 'c7-36', 'c7-37', 'c7-38', 'c7-40',
    'c7-41', 'c7-42', 'c7-44', 'c7-45', 'c7-47', 'c7-48', 'c7-49', 'c7-51', 'c7-52', 'c7-54',
    'c7-ed4-001', 'c7-ed4-002', 'c7-ed4-003', 'c7-ed4-004',
    'c7-tf-001', 'c7-tf-002', 'c7-tf-003', 'c7-tf-004', 'c7-tf-005', 'c7-tf-006', 'c7-tf-007', 'c7-tf-008',
    // Array questions whose subject is pointer conversion or function parameters.
    'c8-04', 'c8-09', 'c8-10', 'c8-23', 'c8-41', 'c8-46', 'c8-53', 'c8-ed4-001', 'c8-tf-006',
    // Pointer declarations, addresses, dereferencing, parameter passing and lifetime.
    'c9-01', 'c9-02', 'c9-03', 'c9-04', 'c9-05', 'c9-06', 'c9-07', 'c9-08', 'c9-09',
    'c9-10', 'c9-11', 'c9-12', 'c9-13', 'c9-14', 'c9-15', 'c9-16', 'c9-17', 'c9-18',
    'c9-19', 'c9-20', 'c9-21', 'c9-22', 'c9-23',
    'c9-30', 'c9-31', 'c9-32', 'c9-33', 'c9-34', 'c9-35', 'c9-36', 'c9-37', 'c9-38',
    'c9-39', 'c9-40', 'c9-41', 'c9-42', 'c9-43', 'c9-44', 'c9-45', 'c9-46', 'c9-47',
    'c9-48', 'c9-49', 'c9-50', 'c9-51', 'c9-60', 'c9-61', 'c9-62', 'c9-63', 'c9-64',
    'c9-65', 'c9-66', 'c9-67', 'c9-68', 'c9-69',
    // These stable c10 IDs now belong to Chapter 9. Select arithmetic, not heap allocation.
    'c10-01', 'c10-02', 'c10-09', 'c10-10', 'c10-11', 'c10-12', 'c10-13', 'c10-15',
    'c10-18', 'c10-22', 'c10-30', 'c10-31', 'c10-36', 'c10-37', 'c10-38', 'c10-40',
    'c10-45', 'c10-52', 'c10-53', 'c9-ed4-004',
    'c9-tf-001', 'c9-tf-002', 'c9-tf-003', 'c9-tf-004', 'c9-tf-005',
    // Character literals, character pointers and printf/scanf questions parked with strings.
    'c11-01', 'c11-06', 'c11-07', 'c11-08', 'c11-09', 'c11-12', 'c11-13', 'c11-18',
    'c11-23', 'c11-30', 'c11-35', 'c11-38', 'c11-41', 'c11-43', 'c11-46', 'c11-52',
    'c11-60', 'c11-61', 'c11-65', 'c11-67', 'c10-ed4-003', 'c10-tf-001', 'c10-tf-003', 'c10-tf-005'
  ],
  // Official species already in the dex, grouped using the ordinary route rarity weights.
  encounters: [
    [133, 'common'], [25, 'common'], [1, 'common'], [4, 'common'], [7, 'common'],
    [92, 'common'], [63, 'common'], [66, 'common'], [54, 'common'], [43, 'common'],
    [81, 'common'], [129, 'common'], [172, 'common'], [179, 'common'], [298, 'common'],
    [2, 'uncommon'], [5, 'uncommon'], [8, 'uncommon'], [93, 'uncommon'], [64, 'uncommon'],
    [67, 'uncommon'], [82, 'uncommon'], [134, 'uncommon'], [135, 'uncommon'], [136, 'uncommon'],
    [280, 'uncommon'], [147, 'uncommon'],
    [3, 'rare'], [6, 'rare'], [9, 'rare'], [94, 'rare'], [65, 'rare'],
    [68, 'rare'], [196, 'rare'], [197, 'rare'], [282, 'rare']
  ]
}];
