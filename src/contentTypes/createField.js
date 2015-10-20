import _ from 'lodash';
export { usStates } from './usStates';

export const genderOptions = [
  {value: 'male', label: 'Male'},
  {value: 'female', label: 'Female'},
  {value: 'transgender', label: 'Transgender'},
];

// Helper to create a field object.
function createField(label, type = 'text', rest) {
  const {id} = rest;
  return {
    id: id || _.camelCase(label),
    label,
    type,
    ...rest,
  };
}

export default createField;
