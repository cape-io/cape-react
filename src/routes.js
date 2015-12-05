import React from 'react'
import { IndexRoute, Route, IndexRedirect } from 'react-router'
import { isAuthenticated } from './redux/modules/auth'
// import { fetchSession } from './redux/actions'

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
  function requireLogin({ location }, replaceState) {
    // Ensure the user is logged in before enter.
    function checkAuth() {
      if (!isAuthenticated(store.getState())) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/user', { destination: location.pathname })
      }
    }
    checkAuth()
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
