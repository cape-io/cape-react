import immutable from 'seamless-immutable'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { createSelector } from 'reselect'
import { graphSelector } from '../select'
import { entitySelector } from '../entity/select'

// SPO
export const tripleSelector = state => graphSelector(state).triple

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
      res.push(immutable(value))
    })
  })
  return res
}

export function mergeObject(triple, entity) {
  if (!entity) {
    return triple
  }
  return triple.set('object', triple.object.merge(entity))
}

export const selectObject = (triple) => triple.id[2]

function getSXXincludeObject(tripleState, entityState, subjectId) {
  const results = getSXX(tripleState, [ subjectId ])
  return map(results, triple =>
    mergeObject(triple, entityState[selectObject(triple)])
  )
}
export function selectSXXincludeObject(activeEntityIdSelector) {
  return createSelector(
    tripleSelector,
    entitySelector,
    activeEntityIdSelector,
    getSXXincludeObject
  )
}
