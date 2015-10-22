import memoize from 'lru-memoize';
import isArray from 'lodash.isarray';

import * as validation from './validation';

// Take an item string or array and turn it into a validation function.
function itemToFunc(validators, item) {
  if (isArray(item)) {
    // Make sure the length is 2.
    if (!validators[item[0]]) {
      console.error(item[0], 'is not a validation function');
    }
    return validators[item[0]](item[1]);
  }
  if (!validators[item]) {
    console.error(item, 'is not a validation function');
  }
  return validators[item];
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
  if (validationMethods.length) {
    return validationMethods;
  }
}

export default function formValidation(fields) {
  // console.log(fields);
  const fieldValidatorObj = {};
  fields.forEach(field => {
    const fieldRules = fieldValidation(field);
    if (fieldRules) {
      fieldValidatorObj[field.id] = fieldRules;
    }
  });
  // console.log(fieldValidatorObj);
  const validator = validation.createValidator(fieldValidatorObj);
  return memoize(10)(validator);
}
