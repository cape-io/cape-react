export const ERROR = 'auth/ERROR'
export const LOGIN = 'auth/LOGIN'
export const LOGOUT = 'auth/LOGOUT'
export const PROVIDERS = 'auth/PROVIDERS'
export const TOKEN_SEND = 'auth/TOKEN_SEND'
export const TOKEN_SENT = 'auth/TOKEN_SENT'
export const TOKEN_VALIDATE = 'auth/TOKEN_VALIDATE'
export const USER_ID = 'auth/USER_ID'

export function errorMsg(message) {
  return {
    type: ERROR,
    payload: message,
  }
}
export function login(usr) {
  return {
    type: LOGIN,
    payload: usr,
  }
}
export function tokenSend(email) {
  return {
    type: TOKEN_SEND,
    // Email choice if user has more than one email. Must be associated with account.
    payload: email,
  }
}
export function tokenSent(email) {
  return {
    type: TOKEN_SENT,
    payload: email,
  }
}
export function user(userId) {
  return {
    type: USER_ID,
    payload: userId,
  }
}
