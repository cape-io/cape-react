import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { isAuthenticated, isLoaded as isAuthLoaded } from './redux/modules/auth'
import { loadSession } from './redux/actions'

import {
    App,
    List,
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
    console.log('requireLogin')
    function checkAuth() {
      console.log('checkAuth!')
      if (!isAuthenticated(store.getState())) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/user', { destination: location.pathname })
      }
      cb()
    }

    if (!isAuthLoaded(store.getState())) {
      // Perform an async action and do something on the result.
      store.dispatch(loadSession()).then(checkAuth)
    } else {
      checkAuth()
    }
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={List} />
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
        <Route path="mixer/:groupId/:typeId" component={MixerForm} />
      </Route>

    </Route>
  )
}
