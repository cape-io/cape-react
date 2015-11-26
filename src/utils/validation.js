import isEmpty from 'lodash/lang/isEmpty'
import emailValidate from './emailValidate'

// Functions should return error message string.

export function isEmail(value) {
  if (!value) {
    return undefined
  }
  const { errorMsg, hasErrors } = emailValidate(value)
  if (hasErrors) {
    return errorMsg
  }
}

export function isInteger(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
}

export function isRequired(value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

// returns function.

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
  }
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match'
      }
    }
  }
}
