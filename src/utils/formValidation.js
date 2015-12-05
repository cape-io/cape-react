// import mapValues from 'lodash/object/mapValues'
import forEach from 'lodash/collection/forEach'
import get from 'lodash/object/get'
import set from 'lodash/object/set'
import isArray from 'lodash/lang/isArray'
import isString from 'lodash/lang/isString'
// import memoize from 'lodash/function/memoize'

import * as validationFuncs from './validation'

const validators = validationFuncs

// Take a validation string or array and turn it into a validation function.
function validatorToFunc(validator) {
  if (isArray(validator)) {
    const [ methodName, args ] = validator
    // Make sure the length is 2.
    if (!validators[methodName]) {
      throw new Error(methodName + ' is not a validation function!')
    }
    // Call function with args and then return result function.
    return validators[methodName](args)
  }
  if (!isString(validator)) {
    throw new Error(validator + ' must be a string or an array!')
  }
  if (!validators[validator]) {
    throw new Error(validator + ' is not a validation function!')
  }
  // Strings are simple functions. Just return the method by key.
  return validators[validator]
}

// Return any errors.
function fieldValidation(value, validators) {
  if (!validators.length) {
    return undefined
  }
  let errorStr = null
  // Return the first error or undefined.
  forEach(validators, validator => {
    errorStr = validatorToFunc(validator)(value)
    // If we find an error quit early.
    if (errorStr) {
      return false
    }
  })
  // Return the error string or undefined.
  return errorStr || undefined
}

// Take the field info object and create a validation function.
export function createValidator({ field, formElements }) {
  // Create a function that accepts the form data object.
  return (data = {}) => {
    const fieldErrors = {}
    // Loop through every field in the form.
    // Returns an object of errors.
    forEach(formElements, ({ fields, id, type }) => {
      if (type === 'collection') {
        const collectionValues = get(data, id)
        if (collectionValues && collectionValues.length) {
          const collectionErrors = collectionValues.map( (item) => {
            const _fieldErrors = {}
            forEach(fields, ({ infoKey, dataKey }) => {
              const fieldInfo = get(field, infoKey)
              if (!fieldInfo) {
                console.error(infoKey, fields)
              }
              const { validators } = fieldInfo
              const value = get(item, dataKey)
              // Validate the field value.
              const validationErr = fieldValidation(value, validators)
              if (validationErr) {
                set(_fieldErrors, dataKey, validationErr)
              }
            })
            return _fieldErrors
          })
          set(fieldErrors, id, collectionErrors)
        }
        return
      }
      forEach(fields, ({ infoKey, dataKey }) => {
        const fieldInfo = get(field, infoKey)
        if (!fieldInfo) {
          console.error(infoKey, fields)
        }
        const { validators } = fieldInfo
        const value = get(data, dataKey)
        // Validate the field value.
        const validationErr = fieldValidation(value, validators)
        if (validationErr) {
          set(fieldErrors, dataKey, validationErr)
        }
      })
    })


    // fieldErrors._error = 'Missing required fields.'
    // console.log(fieldErrors)
    return fieldErrors
  }
}
