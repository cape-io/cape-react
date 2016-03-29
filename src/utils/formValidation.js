// import mapValues from 'lodash/object/mapValues'
import forEach from 'lodash/forEach'

import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import map from 'lodash/map'
import memoize from 'lodash/memoize'

import * as validatorFunctions from './validation'
// Stupid eslint thing.
const validationFuncs = validatorFunctions

function getValidateFunc(methodName) {
  if (!isString(methodName)) {
    throw new Error(`${methodName} must be a string or an array!`)
  }
  if (!validationFuncs[methodName]) {
    throw new Error(`${methodName} is not a validation function!`)
  }
  return validationFuncs[methodName]
}

// Take a validation string or array and turn it into a validation function.
function _validatorToFunc(validator) {
  if (isArray(validator)) {
    const [ methodName, args ] = validator
    // Call function with args and then return result function.
    return getValidateFunc(methodName)(args)
  }
  // Strings are simple functions. Just return the method by key.
  return getValidateFunc(validator)
}

export const validatorToFunc = memoize(_validatorToFunc)

// Return any errors.
export function fieldValidation(validators) {
  if (!validators || !validators.length) {
    return undefined
  }
  // Turn each string/array into a validation function.
  const validatorFuncs = map(validators, validatorToFunc)
  return (value) => {
    let errorResult = null
    // Loop validatorFuncs. Assign first error to `errorResult` and quit loop.
    forEach(validatorFuncs, validator => {
      errorResult = validator(value)
      // If we find an error quit early.
      return !errorResult
    })
    // Return the first error or undefined.
    return errorResult || undefined
  }
}
