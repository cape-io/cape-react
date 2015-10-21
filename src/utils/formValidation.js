import memoize from 'lru-memoize';
import mapValues from 'lodash.mapvalues';
import isArray from 'lodash.isarray';

import * as validation from './validation';

// Take an item string or array and turn it into a validation function.
function itemToFunc(validators, item) {
  if (isArray(item)) {
    // Make sure the length is 2.
    return validators[item[0]](item[1]);
  }
  return validators[item[0]];
}

function fieldValidation({required, validators}) {
  const validationMethods = [];
  if (required) {
    validationMethods.push(validation.isRequired);
  }
  if (validators) {
    validators.forEach(item => {
      validationMethods.push(itemToFunc(validation, item));
    });
  }
  return validationMethods;
}

export default function formValidation(fields) {
  const validator = validation.createValidator(mapValues(fields, fieldValidation));
  return memoize(10)(validator);
}
