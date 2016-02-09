// Redux.
import { applyMiddleware, createStore, compose } from 'redux'
import merge from 'lodash/merge'
// Redux Middleware.
// Allow function action creators.
import thunk from 'redux-thunk'

import {
  syncHistoryWithStore,
} from 'redux-history-sync'

// Socket.io linking
import io from 'socket.io-client'
import { middleware as createSocketMiddleware } from 'cape-redux-socket'

const location = 'http://edit.l.cape.io/'
const socket = createSocketMiddleware(io(location))
// Redux Reducers.
// Our reducer index.
import rootReducer from './reducer'

// Custom api.
import api from './middleware/api'

import DevTools from '../containers/DevTools'

// Define the middeware we want to apply to the store.
const middleware = [
  api,
  socket,
  thunk,
]

const history = createHistory()
function initLocation() {
  let locationBeforeTransitions
  history.listen(loc => locationBeforeTransitions = loc)()
  return locationBeforeTransitions
}
const calculatedState = {
  db: {
    currentYear: new Date().getFullYear(),
  },
  routing: {
    locationBeforeTransitions: initLocation(),
  },
}
// Configure and create Redux store.
// Allow the function to accept an initialState object.
export default function configureStore(initialState) {
  const initState = merge(initialState, calculatedState)
  const store = createStore(
    rootReducer,
    initState,
    compose(
      applyMiddleware(...middleware),
      // Logger must be last middleware in chain(#20).
      // applyMiddleware(createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }
  syncHistoryWithStore(history, store, { adjustUrlOnReplay: false })
  // reduxRouterMiddleware.listenForReplays(store)
  return store
}
