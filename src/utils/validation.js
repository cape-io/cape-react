import { isURL } from 'validator'
import isEmpty from 'lodash/isEmpty'
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

export function isFullName(value) {
  const valParts = value.split(' ')
  if (valParts.length < 2) {
    return 'Full name must include a first and last name.'
  }
  if (valParts[0].length < 2) {
    return 'First name is too short.'
  }
  if (valParts[valParts.length - 1].length < 2) {
    return 'Last name is too short.'
  }
  if (value.length < 5) {
    return 'Name is too short.'
  }
}

export function isRequired(value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

const urlOptions = {
  protocols: [ 'http', 'https' ],
  require_tld: true,
  require_protocol: true,
  require_valid_protocol: true,
  allow_underscores: false,
  host_whitelist: false,
  host_blacklist: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
}
export function isUrl(value) {
  if (!value) {
    return undefined
  }
  if (!isURL(value, urlOptions)) {
    return 'Invalid URL. Please check the formatting.'
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
