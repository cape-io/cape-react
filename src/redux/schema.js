import { createSelector } from 'reselect'
import keyBy from 'lodash/keyBy'
import map from 'lodash/map'

import { filterEntity, selectXPOentity } from './graph'

export function getByAltName(type, alternateName) {
  return filterEntity({ alternateName, type })
}
export function entitySchema(type) {
  const selectTypeEntity = filterEntity({ alternateName: type, type: 'Class' })
  return state => {
    const subj = selectTypeEntity(state)[0]
    if (!subj) return null
    const fields = selectXPOentity([ 'domainIncludes', subj.id ])(state)
    return keyBy(map(fields, 'subject'), 'alternateName')
  }
}
export default {
  form: {
    selector: 'entity.form',
    validators: true,
  },
}
