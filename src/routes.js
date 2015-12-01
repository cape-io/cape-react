import React from 'react'
import { IndexRoute, Route, IndexRedirect } from 'react-router'
import { isAuthenticated, isLoaded as isAuthLoaded } from './redux/modules/auth'
import { fetchSession } from './redux/actions'

import {
    App,
    LoginForm,
    Mixer,
    MixerForm,
    User,
  } from './containers'

/**
 * Please keep routes in alphabetical order
 */
export default function createRoutes(store) {
  function requireLogin({ location }, replaceState, cb) {
    function checkAuth() {
      console.log('checkAuth')
      if (!isAuthenticated(store.getState())) {
        // oops, not logged in, so can't be here!
        console.log('redirect')
        replaceState(null, '/user', { destination: location.pathname })
      }
      cb()
    }

    if (!isAuthLoaded(store.getState()) && location.action === 'POP') {
      // Perform an async action and do something on the result.
      console.log('load sess info', location)
      store.dispatch(fetchSession()).then(checkAuth)
    } else {
      checkAuth()
      cb()
    }
  }

  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/user" />
      <Route path="user" component={User}>
        <IndexRoute component={LoginForm} />
        <Route
          path=":login"
          component={LoginForm}
        />
      </Route>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="mixer" component={Mixer} />
        <Route path="mixer/:groupId/:typeId/:entityId" component={MixerForm} />
      </Route>

    </Route>
  )
}
