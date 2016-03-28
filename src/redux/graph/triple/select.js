import immutable from 'seamless-immutable'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { createSelector } from 'reselect'

import { graphSelector } from '../select'
import { entitySelector } from '../entity/select'

// SPO
export const tripleSelector = state => graphSelector(state).triple

export function getSPO(state, tripleId) {
  return immutable(get(state.spo, tripleId, null))
}

// Query the store for all facts with specific subject
export function getSXX(state, tripleId) {
  const pred = state.spo[tripleId[0]]
  if (!pred) return null
  const res = []
  forEach(pred, predicate => {
    forEach(predicate, value => {
      res.push(immutable(value))
    })
  })
  return res
}
export function getXPO(state, path) {
  const subjects = get(state.pos, path, null)
  if (!subjects) return subjects
  return map(subjects, (nil, id) => getSPO(state, [ id, ...path ]))
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
export function selectXPO(path) {
  return createSelector(
    tripleSelector,
    state => getXPO(state, path)
  )
}
export function selectXPOentity(path) {
  return createSelector(
    selectXPO(path),
    entitySelector,
    (res, entity) => map(res, triple =>
      triple ? triple.set('subject', entity[triple.id[0]]) : null
    )
  )
}
