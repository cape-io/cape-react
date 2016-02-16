import React, { Component, PropTypes } from 'react'
// Component makes Redux store available to the connect() calls in children.
import { Provider } from 'react-redux'

import App from './App'
import DevTools from './DevTools'
import ErrorMessage from './ErrorMessage'

const devEnv = process.env.NODE_ENV !== 'production'

export default class Root extends Component {
  render() {
    const { store } = this.props
    // Provider only wants a single child.
    return (
      <Provider store={store}>
        <div>
          <ErrorMessage />
          <App />
          { devEnv && <DevTools /> }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
