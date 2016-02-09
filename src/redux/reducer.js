import * as ActionTypes from './actions'
import merge from 'lodash/merge'
// import pick from 'lodash/object/pick'
// Handle saving url to state.
import socket, { idReducer as id } from 'cape-redux-socket'
import { historyReducer } from 'redux-history-sync'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import mixer from './modules/mixer'
import db from './modules/db'

// Updates an entity cache in response to any action with response.entities.
// Define our default entities collection database.
const defaultEntityState = {
  forms: {},
  repos: {},
  users: {},
  session: {
    me: { isAuthenticated: null },
  },
  url: {},
  urlIndex: {},
}
function entities(state = defaultEntityState, action) {
  if (action.response && action.response.entities) {
    const entityData = action.response.entities
    if (action.response.urlIndex) {
      entityData.urlIndex = action.response.urlIndex
    }
    return merge({}, state, entityData)
  }
  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

export default combineReducers({
  db,
  entities,
  errorMessage,
  form: formReducer,
  history: historyReducer,
  id,
  mixer,
  // Special place to save url. { changeId, path }
  socket,
})
