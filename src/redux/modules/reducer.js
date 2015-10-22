import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import db from './db';
import mixer from './mixer';

export default combineReducers({
  router: routerStateReducer,
  auth,
  db,
  form,
  info,
  mixer,
  widgets,
});
