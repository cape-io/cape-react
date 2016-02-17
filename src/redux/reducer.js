import { combineReducers } from 'redux'
import socket, { idReducer as id } from 'cape-redux-socket'

import auth from './modules/auth'
import db from './modules/db'
import entity from './modules/entity'
import errorMessage from './modules/errorMessage'
import form from 'redux-field'
import { historyReducer as history } from 'redux-history-sync'
import mixer from './modules/mixer'

export defaultState from './defaultState'

export default combineReducers({
  auth,
  db,
  entity,
  errorMessage,
  form,
  history,
  id,
  mixer,
  socket,
})
