export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Updates error message to notify about the failed fetches.
export default function errorMessage(state = null, action) {
  const { type, error, payload } = action

  if (type === RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    const { message, name } = payload
    return `[${type}] ${name || 'Error'}: ${message || 'Please try again.'}`
  } else if (state && state.startsWith(`[${type}]`)) {
    return null
  }

  return state
}

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE,
  }
}
