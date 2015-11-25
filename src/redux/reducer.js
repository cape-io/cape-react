import * as ActionTypes from './actions'
import merge from 'lodash/object/merge'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import paginate from './reducers/paginate'
import db from './modules/db'
import email from './modules/email'

// Updates an entity cache in response to any action with response.entities.
// Define our default entities collection database.
const defaultEntityState = {
  forms: {},
  repos: {},
  users: {},
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
  email,
  entities,
  form: formReducer,
  pagination,
  errorMessage,
  router,
})

export default rootReducer
