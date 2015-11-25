import React from 'react'
import { IndexRoute, Route } from 'react-router'

import {
    App,
    List,
    Login,
    LoginForm,
    User,
  } from './containers'

/**
 * Please keep routes in alphabetical order
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={List} />
    <Route path="user" component={User}>
      <IndexRoute component={LoginForm} />
      <Route
        path=":login"
        component={Login}
      />
    </Route>
  </Route>
)
