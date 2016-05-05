import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import identity from 'lodash/identity'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import some from 'lodash/some'
import values from 'lodash/values'
import { getState } from 'redux-field'
import { createSelector } from 'reselect'

import { selectUid } from '../auth'
import {
  entitySelector, selectSXXincludeObject, selectXXOentity, tripleSelector,
} from 'redux-graph'

import { classIndex, getSchema } from '../schema'
import { fieldValidation } from '../../utils/formValidation'

export function activeEntityIdSelector(state, props) {
  return props.route.params && props.route.params.entityId
}
export function buildEntity(subject) {
  const entity = {}
  forEach(subject, obj => {
    if (!entity[obj.predicate]) entity[obj.predicate] = {}
    entity[obj.predicate][obj.object.id] = obj.object
  })
  return entity
}
const selectUserSubject = selectSXXincludeObject(selectUid)
export function selectMyFields(state) {
  return buildEntity(selectUserSubject(state))
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

const selectEntitySubject = selectSXXincludeObject(selectEntityId)
export function selectEntityFields(state, props) {
  return buildEntity(selectEntitySubject(state, props))
}
export function createObjectPrefix(subjectId) {
  return [ 'CreateObjectAction', subjectId ]
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

export const selectTriples = createSelector(
  selectEntityId,
  entitySelector,
  tripleSelector,
  classIndex,
  selectEntityFields,
  selectNewField(selectEntityId),
  (id, entity, triple, classList, subject, selectField) => ({
    entity: subject,
    selectField,
    subject: entity[id],
    objects: selectObjects(id, entity, triple),
    schema: getSchema(classList[entity[id].type], entity, triple),
    subjects: selectSubjects(id, entity, triple),
  })
)

export function createSubjectPrefix(objectId) {
  return [ 'CreateSubjectAction', objectId ]
}

export function getField(entityField) {
  if (!entityField) return entityField
  const fields = values(entityField)
  return find(fields, 'value') || fields[0]
}
export function getPrefix(field, prefix = 'UpdateFieldAction') {
  if (isArray(prefix)) return prefix
  return [ prefix, field.id ]
}

export function peopleFields(domainIncludes) {
  return filter(domainIncludes, item =>
    some(item.rangeIncludes, { alternateName: 'Person' })
  )
}
export function toOptions(fields) {
  return map(fields, ({ alternateName, name }) => ({ value: alternateName, label: name }))
}
export function schemaProps(schema) {
  const { name, description, inputType, validators } = schema
  return {
    help: description,
    label: name,
    type: inputType || 'text',
    validate: fieldValidation(validators),
  }
}
