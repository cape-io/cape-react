import { combineReducers } from 'redux'
import socket, { idReducer as id } from 'cape-redux-socket'
import { historyReducer as history } from 'redux-history-sync'
import { reducer as form } from 'redux-form'

import db from './modules/db'
import entity from './modules/entity'
import errorMessage from './modules/errorMessage'
import mixer from './modules/mixer'

export defaultState from './defaultState'

export default combineReducers({
  db,
  entity,
  errorMessage,
  form,
  history,
  id,
  mixer,
  socket,
})
