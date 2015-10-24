import createField, { genderOptions, usStates } from '../utils/createField';

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
    createField('Intro', 'textarea', {minRows: 3}),
    createField('Biography', 'textarea', {id: 'bio', minRows: 6}),
    createField('Artist Statement', 'textarea', {id: 'statement', minRows: 7}),
  ],
};

// Recordings.
// Compositions. title, program note, year.
// Reviews.
// Links.
