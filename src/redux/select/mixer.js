import forEach from 'lodash/forEach'
import identity from 'lodash/identity'
import values from 'lodash/values'
import { getState } from 'redux-field'
import { createSelector } from 'reselect'

import { selectUid } from '../auth'
import { selectSXXincludeObject } from '../graph'

export function activeEntityIdSelector(state, props) {
  return props.route.params && props.route.params.entityId
}

const selectSXX = selectSXXincludeObject(selectUid)
export function selectFields(state) {
  const entity = {}
  forEach(selectSXX(state), obj => {
    if (!entity[obj.predicate]) entity[obj.predicate] = {}
    entity[obj.predicate][obj.object.id] = obj.object
  })
  return entity
}
export function selectFieldPrefix(subjectId) {
  return [ 'CreateObjectAction', subjectId ]
}
function selectFieldInfo(id, state) {
  return {
    editable: true,
    label: 'Add new field',
    id,
    options: [],
    required: true,
    state: getState(state, { prefix: selectFieldPrefix(id) }),
    type: 'select',
  }
}

export function selectNewField(entityIdSelect) {
  return createSelector(
    entityIdSelect,
    identity,
    selectFieldInfo
  )
}

export function getField(entityField) {
  if (!entityField) return entityField
  const fields = values(entityField)
  return find(fields, 'value') || fields[0]
}
export function getPrefix(field, prefix = 'UpdateFieldAction') {
  return [ prefix, field.id ]
}
