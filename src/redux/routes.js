import createRouter from 'location-info'
import get from 'lodash/get'
import { createSelector } from 'reselect'
import { selectActiveKeyDefault } from 'redux-history-sync'

import { tokenValidate } from './auth'

// This takes a state object and returns current history slice and route information.

const router = createRouter()
const { addRoute, addRoutes, locationInfo } = router
addRoute('home', '/')
addRoutes([
  'about',
  'mixer',
])
addRoute('login', '/login/(:token)',
  {
    onServerLoad({ params: { token } }, { dispatch, getState }) {
      if (!token) return undefined
      if (getState().id) dispatch(tokenValidate(token))
    },
    isLoading(state) {
      return !get(state, 'entity.form.cape/login', false)
    },
  },
  {
    segmentValueCharset: 'a-zA-Z0-9-_~ %.*',
  }
)
addRoute('mixerEdit', '/mixer/:entityId')
addRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId')

function routeSelector(history) {
  return {
    history,
    // Location object gets sent to locationInfo
    route: locationInfo(history.location),
  }
}
// Pass in the state object and return some info about a "route".
export default createSelector(selectActiveKeyDefault, routeSelector)
