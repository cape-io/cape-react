import immutable from 'seamless-immutable'
import isFunction from 'lodash/isFunction'

import { DEL, PUT, PUT_ALL } from './actions'

const reducers = {
  [DEL]: (state, { payload }) => state.without(payload),
  [PUT]: (state, { payload }) => state.set(payload.id, payload),
  [PUT_ALL]: (state, { payload }) => state.merge(payload),
}

// Updates an entity cache in response to any action with response.entity.
export default function reducer(state = {}, action) {
  if (action.error || !action.type || !isFunction(reducers[action.type])) return state
  return reducers[action.type](state.asMutable ? state : immutable(state), action)
}
