import forEach from 'lodash/forEach'
import get from 'lodash/get'
import identity from 'lodash/identity'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import values from 'lodash/values'
import { getState } from 'redux-field'
import { createSelector } from 'reselect'

import { selectUid } from '../auth'
import { entitySelector, selectSXXincludeObject, selectXXOentity, tripleSelector } from '../graph'
import { classIndex, getSchema } from '../schema'

export function activeEntityIdSelector(state, props) {
  return props.route.params && props.route.params.entityId
}

const selectSXX = selectSXXincludeObject(selectUid)
export function selectMyFields(state) {
  const entity = {}
  forEach(selectSXX(state), obj => {
    if (!entity[obj.predicate]) entity[obj.predicate] = {}
    entity[obj.predicate][obj.object.id] = obj.object
  })
  return entity
}
export function selectMySubjects(selector = selectUid) {
  return state => {
    const objectId = selector(state)
    if (!objectId) return objectId
    const getXXO = selectXXOentity(objectId)
    const subjects = {}
    forEach(getXXO(state), triple => {
      if (!subjects[triple.subject.type]) subjects[triple.subject.type] = {}
      subjects[triple.subject.type][triple.subject.id] = triple.subject
    })
    return subjects
  }
}
export const selectMyCreated = createSelector(
  selectUid,
  entitySelector,
  tripleSelector,
  (uid, entity, triple) => {
    const created = get(triple.ops, [ uid, 'creator' ], null)
    if (!created) return created
    return map(created, (nil, id) => entity[id])
  }
)

export function selectEntityId(state, props) {
  return get(props, 'route.params.entityId', null)
}
export function selectObjects(id, entity, triple) {
  if (!triple.spo[id]) return null
  return mapValues(triple.spo[id], triples =>
    mapValues(triples, trip => ({
      entity: entity[trip.object.id],
      objects: selectObjects(trip.object.id, entity, triple),
    }))
  )
}
export function selectSubjects(id, entity, triple) {
  if (!triple.ops[id]) return null
  return mapValues(triple.ops[id], (triples) =>
    mapValues(triples, (trip, objectId) =>
      entity[objectId]
    )
  )
}

export const selectTriples = createSelector(
  selectEntityId,
  entitySelector,
  tripleSelector,
  classIndex,
  (id, entity, triple, classList) => ({
    subject: entity[id],
    objects: selectObjects(id, entity, triple),
    schema: getSchema(classList[entity[id].type], entity, triple),
    subjects: selectSubjects(id, entity, triple),

  })
)
export function createObjectPrefix(subjectId) {
  return [ 'CreateObjectAction', subjectId ]
}
export function createSubjectPrefix(objectId) {
  return [ 'CreateSubjectAction', objectId ]
}

function selectFieldInfo(id, state) {
  return {
    editable: true,
    label: 'Add new field',
    id,
    options: [],
    required: true,
    state: getState(state, { prefix: createObjectPrefix(id) }),
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
