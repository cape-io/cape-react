import forEach from 'lodash/forEach'
import identity from 'lodash/identity'
import { getState } from 'redux-field'
import { createSelector } from 'reselect'

import { selectUid } from '../auth'
import { filterEntity, selectSXXincludeObject } from '../graph'

export function activeEntityIdSelector(state, props) {
  return props.route.params && props.route.params.entityId
}
const inputType = {
  text: 'text',
  longText: 'textarea',
  ImageObject: 'image',
}
// Property info.
// const schemaInfo = {
//   email: {
//     description: 'An email identifies a location to which email messages are delivered.',
//     dataType: 'text',
//     label: 'Email address',
//     value: 'email',
//   },
//   description: {
//     description: 'A short description of the item.',
//     dataType: 'longText',
//     label: 'Bio or description',
//     value: 'description',
//   },
//   name: {
//     description: 'Full name as it should appear.',
//     dataType: 'text',
//     label: 'Display Name',
//     value: 'name',
//   },
//   image: {
//     dataType: 'ImageObject',
//     description: 'An image of the item. This can be a URL or a fully described ImageObject.',
//     label: 'An image of the item',
//     value: 'image',
//   },
// }
// export function selectSchemaInfo(predicate) {
//   const info = schemaInfo[predicate]
//   return { ...info, inputType: inputType[info.dataType] }
// }
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
