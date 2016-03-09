import includes from 'lodash/includes'
import { isEmail } from 'validator'

// Sync result of email validation.
export default function emailValidate(value) {
  function makeStatus(status, message, hasErrors = true) {
    return {
      message,
      hasErrors,
      status,
      value,
    }
  }
  // Email is too short.
  if (value.length < 3) {
    return makeStatus(null, 'Email is too short.')
  }
  if (!includes(value, '@')) {
    return makeStatus('warning', 'The email must contain an "@" symbol.')
  }
  const parts = value.split('@')
  const local = parts[0]
  if (!local) {
    return makeStatus('warning', 'Please include the unique username part before the "@" symbol.')
  }
  const domain = parts[1]
  if (!domain) {
    return makeStatus('warning', 'Please include a valid domain for your email.')
  }
  if (!includes(domain, '.')) {
    return makeStatus('warning', 'The domain part of your email needs a tld.')
  }
  const tld = domain.split('.')[1]
  if (!(tld.length > 1)) {
    return makeStatus('warning', 'The email domain tld is too short.')
  }
  if (!isEmail(value)) {
    return makeStatus('error', 'Failed RFC checks.')
  }
  return makeStatus('success', null, false)
}
