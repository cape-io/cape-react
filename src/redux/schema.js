import { createSelector } from 'reselect'
import { filterEntity, selectXPOentity } from './graph'

export function getByAltName(type, alternateName) {
  return filterEntity({ alternateName, type })
}
export function entitySchema(type) {
  const selectTypeEntity = filterEntity({ alternateName: type, type: 'Class' })
  return state => {
    const subj = selectTypeEntity(state)[0]
    if (!subj) return null
    return selectXPOentity([ 'domainIncludes', subj.id ])(state)
  }
}
export default {
  form: {
    selector: 'entity.form',
    validators: true,
  },
}
