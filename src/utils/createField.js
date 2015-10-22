import _ from 'lodash';
export { usStates } from './usStates';

export const genderOptions = [
  {value: 'male', label: 'Male'},
  {value: 'female', label: 'Female'},
  {value: 'transgender', label: 'Transgender'},
];

// Helper to create a field object.
function createField(label, type = 'text', rest = {}) {
  const { id, validators, ...other } = rest;
  const idField = id || _.camelCase(label);
  const validationOptions = validators || [];

  switch (idField) {
    case 'email':
      validationOptions.push('isEmail');
      break;
    default:
      if (type === 'text') {
        validationOptions.push(['maxLength', 100]);
      }
      break;
  }
  return {
    id: idField,
    label,
    type,
    validators: validationOptions,
    ...other,
  };
}

export default createField;
