import { combineReducers } from 'redux'

import * as reducer from './redux/reducer'

export * as auth from './redux/auth'

export const capeReducer = combineReducers(reducer)
export capeRoutes, { locationInfo as capeLocationInfo } from './redux/routes'
