// Redux.
import { applyMiddleware, createStore, compose } from 'redux'
// Redux Middleware.
// Allow function action creators.
import thunk from 'redux-thunk'
// Log state changes to console.
// import createLogger from 'redux-logger'
// Custom api.
import api from './middleware/api'
// Redux Reducers.
// Our reducer index.
import rootReducer from './reducer'
// Redux Dev stuff.
// The redux state sidebar thing store enhancer.
import DevTools from '../containers/DevTools'

// Define the middeware we want to apply to the store.
const middleware = [
  api,
  thunk,
]

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  // Logger must be last middleware in chain(#20).
  // applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore)

// Configure and create Redux store.
// Allow the function to accept an initialState object.
export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
