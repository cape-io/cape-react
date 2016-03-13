import isFunction from 'lodash/isFunction'
import { createSelector } from 'reselect'

import { graphSelector } from '../select'
export const entitySelector = state => graphSelector(state).entity
export function selectEntity(entityIdSelect) {
  return state => {
    const entityId = isFunction(entityIdSelect) ? entityIdSelect(state) : entityIdSelect
    return entitySelector(state)[entityId]
  }
}
