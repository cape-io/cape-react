import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { createSelector } from 'reselect'

// SPO
export const graphSelector = state => state.graph
export const tripleSelector = state => state.triple
export const entitySelector = state => state.entity

// Query the store for all facts with specific subject
export function getSXX(state, triple) {
  const subjectId = triple[0]
  const pred = state.spo[subjectId]
  if (!pred) {
    return null
  }
  const res = []
  forEach(pred, predicate => {
    forEach(predicate, value => {
      res.push(value)
    })
  })
  return res
}

export const selectEntity = (entity, entityId) => entity[entityId]
export const selectObject = (triple) => triple.id[2]

export function mergeObject(triple, entity) {
  if (!entity) {
    return triple
  }
  const tripleObjField = triple.object || {}
  return {
    ...triple,
    object: {
      ...tripleObjField,
      ...entity,
    },
  }
}
function getSXXincludeObject(tripleState, entityState, subjectId) {
  const results = getSXX(tripleState, [ subjectId ])
  return map(results, triple =>
    mergeObject(triple, selectEntity(entityState, selectObject(triple)))
  )
}
export function activeEntityIdSelector(state, props) {
  return props.route.params && props.route.params.entityId
}

export const selectSXXincludeObject = createSelector(
  tripleSelector,
  entitySelector,
  activeEntityIdSelector,
  getSXXincludeObject
)
