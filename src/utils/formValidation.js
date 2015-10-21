import memoize from 'lru-memoize';
import mapValues from 'lodash.mapvalues';
import isArray from 'lodash.isarray';

import * as validation from './validation';

function fieldValidation({required, validators}) {
  const validationMethods = [];
  if (required) {
    validationMethods.push(validation.isRequired);
  }
  if (validators) {
    validators.forEach(item => {
      if (isArray(item)) {
        validationMethods.push(validation[item[0]](item[1]));
      } else {
        validationMethods.push(validation[item]);
      }
    });
  }
  return validationMethods;
}

export default function formValidation(fields) {
  const validator = validation.createValidator(mapValues(fields, fieldValidation));
  return memoize(10)(validator);
}
