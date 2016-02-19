import createRouter from 'location-info'
import get from 'lodash/get'
import { tokenValidate } from './auth'

export function handleLoginToken({ dispatch, getState }, { token }) {
  if (!token) {
    return undefined
  }
  const { id } = getState()
  if (id) {
    // A dispatch can only happen on the server or .
    dispatch(tokenValidate(token))
  }
}

export default function createRoutes(store) {
  const { getState } = store
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
        validatingToken: handleLoginToken(store, params),
      }),
      isLoading: () => !get(getState(), 'entity.form.cape/login', false),
    },
    {
      segmentValueCharset: 'a-zA-Z0-9-_~ %.*',
    }
  )
  addRoute('mixerLegacy', '/mixer/:groupId/:typeId/:entityId')

  // Pass in the state object and return some info about a "route".
  function match(history) {
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
