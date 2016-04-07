import createRouter from 'location-info'
import { selectActiveKeyDefault } from 'redux-history-sync'
import { createSelector } from 'reselect'

import { tokenValidate } from './auth'
// import { selectSXXincludeObject } from './graph'

// This takes a state object and returns current history slice and route information.

const router = createRouter()
const { addRoute, locationInfo } = router
addRoute('home', '/')
addRoute('about')
addRoute('login', '/login/(:token)',
  {
    onServerLoad({ params: { token } }, { dispatch, getState }) {
      if (token && getState().id) dispatch(tokenValidate(token))
    },
    // isLoading(state) {
    //   return !get(state, 'entity.form.cape/login', false)
    // },
  },
  {
    segmentValueCharset: 'a-zA-Z0-9-_~ %.*',
  }
)
addRoute('mixer', '/mixer/',
  {
    // isLoading(state) {
    //   const triple = selectSXXincludeObject(selectUid)(state)
    //   console.log(triple)
    //   return !(selectUid(state) && triple.length)
    // },
  }
)
addRoute('mixerCreate', '/mixer/create/')
addRoute('mixerEdit', '/mixer/edit/:entityId', {}, { segmentValueCharset: 'a-zA-Z0-9-_~.,+*()!$' })
addRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId')

// We are using the redux-history-sync to put location into state.
function routeSelector(history) {
  if (!history) return history
  return {
    history,
    // Location object gets sent to locationInfo
    route: locationInfo(history.location),
  }
}
export { locationInfo }
// Pass in the state object and return some info about a "route".
// selectActiveKeyDefault() is a helper function to grab the current location info.
export default createSelector(selectActiveKeyDefault, routeSelector)
