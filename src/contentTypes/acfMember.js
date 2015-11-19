import createField from '../utils/createField';

export default {
  groupId: 'acf',
  typeId: 'member',
  title: 'ACF Member',
  description: 'Bulk add members.',
  fields: [
    createField('Email', 'text', { required: true }),
    createField('Display Name', 'text', { required: true }),
    createField('Expiration Date', 'datetime', { id: 'expires', required: true }),
  ],
  submit: {
    icon: 'plus',
    text: 'Create',
  },
};
