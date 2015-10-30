import createField from '../utils/createField';

export default {
  groupId: 'cape',
  typeId: 'login',
  title: 'Login or Join',
  description: 'Blah blah description.',
  fields: [
    createField('Email', 'text', { required: true }),
  ],
  submit: {
    icon: 'sign-in',
    text: 'Log In',
  },
};
