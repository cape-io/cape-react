import createRouter from 'location-info'
import { selectActiveKeyDefault } from 'redux-history-sync'
import get from 'lodash/get'
// import { isAuthenticated } from './modules/auth'

// Include status of user authentication.
// function authState(getState) {
//   return {
//     // Is the user logged in?
//     isAuthenticated: isAuthenticated(getState()),
//   }
// }
export default function createRoutes({ dispatch, getState }) {
  const router = createRouter()
  const { addRoute, addRoutes, locationInfo } = router
  addRoute('home', '/')
  addRoutes([
    'about',
    'mixer',
  ])
  addRoute('login', '/login/(:token)',
    {
      getState: ({ params }) => ({
        loading: !get(getState(), 'entity.form.cape/login', false),
        // validatingToken: params.token && ? 
      }),
    },
    {
      segmentValueCharset: 'a-zA-Z0-9-_~ %.*',
    }
  )
  addRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId')

  // Pass in the state object and return some info about a "route".
  function match() {
    const state = getState()
    const history = selectActiveKeyDefault(state)
    // Location object gets sent to locationInfo
    const route = locationInfo(history.location)

    // console.log(route)
    // I think this would be a good place to get/create title and meta information.
    return {
      history,
      route,
    }
  }
  return {
    ...router,
    match,
  }
}
