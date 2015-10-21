import createField, { genderOptions, usStates } from './createField';

export default {
  id: 'acf-profile',
  title: 'ACF Profile',
  type: 'profile',
  description: 'Profile displayed in the Members Section of composersforum.org',
  fields: [
    createField('First Name', 'text', {required: true}),
    createField('Middle Name'),
    createField('Last Name', 'text', {required: true}),
    createField('Birthday', 'datetime', {help: 'Used for password resets.'}),
    createField('Gender', 'radio', {options: genderOptions}),
    createField('State', 'select', {options: usStates}),
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
  ],
};
