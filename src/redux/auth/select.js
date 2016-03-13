export function selectAuth(state) {
  return state.auth
}
export function selectUser(state) {
  return selectAuth(state).user
}
export function selectUid(state) {
  return selectUser(state).id
}
export function isAuthenticated(state) {
  return selectAuth(state).authenticated
}
