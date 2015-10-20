import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import db from './db';

export default combineReducers({
  router: routerStateReducer,
  auth,
  db,
  form,
  info,
  widgets,
});
