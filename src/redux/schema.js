import { createSelector } from 'reselect'
import concat from 'lodash/concat'
import flatten from 'lodash/flatten'
import identity from 'lodash/identity'
import keyBy from 'lodash/keyBy'
import map from 'lodash/map'

import { filterEntity, selectSPX, selectXPOentity } from './graph'

export function getByAltName(type, alternateName) {
  return filterEntity({ alternateName, type })
}
const selectClassEntities = filterEntity({ type: 'Class' })
const typeIndex = createSelector(
  selectClassEntities,
  items => keyBy(items, 'alternateName')
)
export function entitySchema(type) {
  return createSelector(
    typeIndex,
    identity,
    (classIndex, state) => {
      const subj = classIndex[type]
      if (!subj) return null
      const subClassOf = selectSPX([ subj.id, 'subClassOf' ])(state)
      const subClassFields = flatten(map(subClassOf, triple =>
        selectXPOentity([ 'domainIncludes', triple.id[2] ])(state)
      ))
      const classFields = selectXPOentity([ 'domainIncludes', subj.id ])(state)
      const fields = concat(classFields, subClassFields)
      return keyBy(map(fields, 'subject'), 'alternateName')
    }
  )
}
export default {
  form: {
    selector: 'entity.form',
    validators: true,
  },
}
