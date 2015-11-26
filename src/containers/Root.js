import React, { Component, PropTypes } from 'react'
// Component makes Redux store available to the connect() calls in children.
import { Provider } from 'react-redux'

// Router component.
import { Router } from 'react-router'
// Our custom routes.
import getRoutes from '../routes'

// Will uglify be smart enough to remove this code in prod?
import DevTools from './DevTools'

const devEnv = process.env.NODE_ENV !== 'production'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    // Why do we need a div around Router and DevTools?
    // Provider only wants a single child?
    return (
      <Provider store={store}>
        <div>
          <Router routes={getRoutes(store)} history={history} />
          { devEnv && <DevTools /> }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object,
}
