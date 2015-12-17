import { combineReducers } from 'redux'
// import { routerStateReducer } from 'redux-router'

import db from './db'
// import email from './email'

// Define what part of the store the reducer is responsible for.
export default combineReducers({
  db,
  // email,
  // router: routerStateReducer,
})
