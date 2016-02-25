import immutable from 'seamless-immutable'
import { DEL, PUT } from './actions'

const defaultState = immutable({
  spo: {},
  sop: {},
  osp: {},
  ops: {},
  pos: {},
  pso: {},
})

function del(state, triple) {
  const [ sub, pred, obj ] = triple.id

}

function put(state, triple) {
  const [ sub, pred, obj ] = triple.id
  // Store the full triple obj on the spo.
  state.setIn([ 'spo', sub, pred, obj ], triple)
  // Everything else is just an index.
  state.setIn([ 'sop', sub, obj ], pred)
  state.setIn([ 'osp', obj, sub ], pred)
  state.setIn([ 'ops', obj, pred ], sub)
  state.setIn([ 'pos', pred, obj ], sub)
  state.setIn([ 'pso', pred, sub ], obj)
  return state
}

export default function reducer(_state = defaultState, action) {
  if (!action.type) return _state
  const state = _state.asMutable ? _state : immutable(_state)

  switch (action.type) {
    case PUT:
      return put(state, action.payload)
    case DEL:
      return del(state, action.payload)
    default:
      return state
  }
}
