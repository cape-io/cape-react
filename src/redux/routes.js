import createRouter from 'location-info'
import partial from 'lodash/partial'

import { isAuthenticated } from './modules/auth'

// Include status of user authentication.
function authState(getState) {
  return {
    // Is the user logged in?
    isAuthenticated: isAuthenticated(getState()),
  }
}

/**
 * Please keep routes in order of importance/processing.
 */
export default function createRoutes({ getState }) {
  const router = createRouter()
  const authOptions = {
    getState: partial(authState, getState),
  }
  router.makeRoute('home', '/')
  router.makeRoute('about', '/about/')
  router.makeRoute('user', '/login/(:token)')
  router.makeRoute('mixer', '/mixer', authOptions)
  router.makeRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId', authOptions)
  return router
}
