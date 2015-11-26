import * as ActionTypes from './actions'
import merge from 'lodash/object/merge'
// Handle saving url to state.
import { routeReducer } from 'redux-simple-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import paginate from './reducers/paginate'
import db from './modules/db'

// Updates an entity cache in response to any action with response.entities.
// Define our default entities collection database.
const defaultEntityState = {
  forms: {},
  repos: {},
  users: {},
  session: {},
}
function entities(state = defaultEntityState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
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

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE,
    ],
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE,
    ],
  }),
})

const rootReducer = combineReducers({
  db,
  entities,
  errorMessage,
  form: formReducer,
  pagination,
  // Special place to save url. { changeId, path }
  routing: routeReducer,
})

export default rootReducer
