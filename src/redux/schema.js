import { createSelector } from 'reselect'
import concat from 'lodash/concat'
import flatten from 'lodash/flatten'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import keys from 'lodash/keys'
import map from 'lodash/map'

import { entitySelector, filterEntityFirst, tripleSelector } from './graph'
import { propertyInfo } from './schemaInfo'

function selectByKey(collection) {
  return (nil, id) => collection[id]
}
function getRangeIncludes(entity, triple, fieldId) {
  const dataTypes = get(triple.pso, [ 'rangeIncludes', fieldId ], {})
  return map(dataTypes, selectByKey(entity))
}
export function entitySchema(alternateName) {
  return createSelector(
    filterEntityFirst({ type: 'Class', alternateName }),
    entitySelector,
    tripleSelector,
    (classEntity, entity, triple) => {
      if (!classEntity) return null
      const subClassOf = get(triple.spo, [ classEntity.id, 'subClassOf' ], {})
      const subClassFields = flatten(map(subClassOf, (nil, id) =>
        keys(get(triple.pos, [ 'domainIncludes', id ], {}))
      ))
      const classFields = keys(get(triple.pos, [ 'domainIncludes', classEntity.id ], {}))
      const fieldIds = concat(classFields, subClassFields)
      const fields = map(fieldIds, fieldId =>
        propertyInfo(entity[fieldId], getRangeIncludes(entity, triple, fieldId))
      )
      return {
        ...entity[classEntity.id],
        domainIncludes: keyBy(fields, 'alternateName'),
      }
    }
  )
}
export default {
  form: {
    selector: 'entity.form',
    validators: true,
  },
}
