import React, { Component, PropTypes } from 'react'
// Component makes Redux store available to the connect() calls in children.
import { Provider } from 'react-redux'
// Component renders a React Router app using router state from Redux.
import { ReduxRouter } from 'redux-router'
// Will uglify be smart enough to remove this code in prod?
import DevTools from './DevTools'

const devEnv = process.env.NODE_ENV !== 'production'

export default class Root extends Component {
  render() {
    const { store } = this.props
    // Why do we need a div around ReduxRouter and DevTools?
    // Provider only wants a single child.
    // Send routes to ReduxRouter?
    return (
      <Provider store={store}>
        <div>
          <ReduxRouter />
          { devEnv && <DevTools /> }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
