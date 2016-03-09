import { combineReducers } from 'redux'

import entity from './entity/reducer'
export {
  del as entityDel,
  put as entityPut,
  putAll as entityPutAll,
} from './entity/actions'

import triple from './triple/reducer'
export {
  del as tripleDel,
  put as triplePut,
  putAll as triplePutAll,
} from './triple/actions'

export { activeEntityIdSelector, selectSXXincludeObject } from './select'

export default combineReducers({
  entity,
  triple,
})
