import { combineReducers } from 'redux'

import * as reducer from './redux/reducer'

export * as auth from './redux/auth'
export * as graph from './redux/graph'

export const capeReducer = combineReducers(reducer)
export capeRoutes, { locationInfo as capeLocationInfo } from './redux/routes'
