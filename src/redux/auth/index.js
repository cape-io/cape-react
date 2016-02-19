import reducer from './reducer'
export default reducer

export * from './actions'

export function isLoaded(globalState) {
  const { session: { me } } = globalState.entity
  return me && me.isAuthenticated !== null
}

export function isAuthenticated(globalState) {
  const { session: { me } } = globalState.entity
  return me && me.isAuthenticated === true
}
