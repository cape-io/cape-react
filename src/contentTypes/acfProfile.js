import createField, { genderOptions, usStates } from '../utils/createField';
const musicTypeOptions = [
  {value: 'composer', label: 'Composer'},
  {value: 'performer', label: 'Performer'},
  {value: 'ensemble', label: 'Ensemble'},
  {value: 'edu', label: 'Educator'},
  {value: 'org', label: 'Organization (arts presenter, school, library, foundation)'},
  {value: 'none', label: 'None of the above/Friend of ACF'},
];

export default {
  groupId: 'acf', // Space/Bin/Container/Database ID
  typeId: 'profile', // Content Type/Table ID
  title: 'ACF Profile',
  description: 'Profile displayed in the Members Section of composersforum.org',
  fields: [
    createField('First Name', 'text', {required: true}),
    createField('Middle Name'),
    createField('Last Name', 'text', {required: true}),
    createField('Display Name'),
    createField('Birthday', 'datetime', {help: 'Used for password resets.'}),
    createField('Gender', 'radio', {options: genderOptions}),
    createField('City'),
    createField('State', 'select', {options: usStates, required: true}),
    createField('Zip'),
    {
      id: 'genre',
      label: 'Musical Genre',
      type: 'select',
      // https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres
      options: [
        {value: '13', label: 'New Age'},
        {value: '11', label: 'Jazz'},
        {value: '6', label: 'Country'},
      ],
    },
    createField('Intro Text', 'textarea', {id: 'intro', minRows: 3}),
    createField('Brief Biography', 'textarea', {id: 'bio', minRows: 6}),
    createField('Artist Statement', 'textarea', {id: 'statement', minRows: 7}),
    createField('Profile Types', 'text', {options: musicTypeOptions}),
    createField('Search Image', 'file', {id: 'searchImg'}),
    createField('Profile Photo', 'file', {id: 'photo'}),
    // Recent Works - Compositions. title, program note, year.
    createField('Recent Works', 'textarea'),
    createField('Reviews', 'textarea'),
  ],
};

// Reviews.
// Links.

// Recordings.

// ACF Membership Fields.
  // active: Active Membership (bool)
  // userId: CAPE User Id
  // recurlyId: Recurly Id
  // uid: Drupal User Id
  // nid: Drupal Node Id
  // cfmUid: Old User Id
  // expires: Membership Expiration datetime
  // since: Member since
  // sortBy: Sort Text
  // lastImport: Last import from Drupal.
