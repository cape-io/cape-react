import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import {
    App,
    About,
    Login,
    LoginSuccess,
    Mixer,
    MixerForm,
    NotFound,
  } from './containers/index';
import Logout from './components/Logout';

export default (store) => {
  function requireLogin({location}, replaceState, cb) {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login-join', {destination: location.pathname});
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  }

  function handleLogout(nextState, replaceState, next) {
    const { auth: { user }} = store.getState();
    if (user) {
      store.dispatch(logout());
    } else {
      // oops, not logged in, so can't be here!
      replaceState(null, '/login');
    }
    next();
  }
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Login}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess} />
        <Route path="mixer" component={Mixer} />
        <Route path="mixer/:groupId/:typeId" component={MixerForm} />
      </Route>

      { /* Routes */ }
      <Route path="about" component={About} />
      <Route path="login-join" component={Login} />
      <Route onEnter={handleLogout} path="logout" component={Logout} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
