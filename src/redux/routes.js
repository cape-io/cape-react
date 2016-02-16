import createRouter from 'location-info'
import { selectActiveKeyDefault } from 'redux-history-sync'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
// import { isAuthenticated } from './modules/auth'

// Include status of user authentication.
// function authState(getState) {
//   return {
//     // Is the user logged in?
//     isAuthenticated: isAuthenticated(getState()),
//   }
// }

const router = createRouter()
router.addRoute('home', '/')
router.addRoutes([
  'about',
  'mixer',
])
router.addRoute('login', '/login/(:token)', {
  isLoading: (state) => !get(state, [ 'entity', 'form', 'cape/login' ], false),
})
router.addRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId')

// Pass in the state object and return some info about a "route".
export default function getRouteInfo(state) {
  const history = selectActiveKeyDefault(state)
  // Location object gets sent to locationInfo
  const route = router.locationInfo(history.location)
  if (isFunction(route.isLoading) && route.isLoading(state)) {
    return { history, route: { id: 'loading' } }
  }
  // I think this would be a good place to get/create title and meta information.
  return {
    history,
    route,
  }
}
