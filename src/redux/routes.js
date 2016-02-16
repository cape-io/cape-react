import createRouter from 'location-info'
import { selectActiveKeyDefault } from 'redux-history-sync'

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
router.addRoute('user', '/login/(:token)')
router.addRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId')

// Pass in the state object and return some info about a "route".
export default function getRouteInfo(state) {
  const history = selectActiveKeyDefault(state)
  // Location object gets sent to locationInfo
  const route = router.locationInfo(history.location)
  // I think this would be a good place to get/create title and meta information.
  return {
    history,
    route,
  }
}
