import createField, { genderOptions } from '../utils/createField';

export default {
  id: 'survey',
  title: 'Survey Title',
  type: 'survey',
  description: 'Blah blah description.',
  fields: [
    createField('Name', 'text', {required: true}),
    createField('Email', 'text', {required: true, hasAsyncValidate: true }),
    createField('Occupation'),
    createField('Birthday', 'datetime', {help: 'Used for password resets.'}),
    createField('Sex', 'radio', {options: genderOptions}),
    createField('Currently Employed?', 'checkbox'),
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
