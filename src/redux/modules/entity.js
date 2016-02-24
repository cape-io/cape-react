import merge from 'lodash/merge'
import { SAVED } from 'redux-field'
// Updates an entity cache in response to any action with response.entity.
// Define our default entity collection database.
const defaultEntityState = {}
export default function reducer(state = defaultEntityState, action) {
  if (action.response && action.response.entity) {
    const entityData = action.response.entity
    if (action.response.urlIndex) {
      entityData.urlIndex = action.response.urlIndex
    }
    return merge({}, state, entityData)
  }
  if (action.type === SAVED && !action.error) {
    const { payload } = action
    const { id } = payload
    const entityData = {
      ['cape']: {
        [id]: payload,
      },
    }
    return merge({}, state, entityData)
  }
  return state
}
