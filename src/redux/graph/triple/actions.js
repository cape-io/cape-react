import isArray from 'lodash/isArray'
import createAction from '../../createAction'

export const DEL = 'graph/triple/DEL'
export const del = createAction(DEL)

export const PUT = 'graph/triple/PUT'
// You can send it an array of three values or an object with an id.
export const put = createAction(PUT, value => {
  const triple = value.id ? value : { id: value }
  if (triple.id.length < 3 || triple.id.length > 5) {
    throw new Error('Triple id must have a length between three and five.')
  }
  return triple
})

export const PUT_ALL = 'graph/entity/PUT_ALL'
export const putAll = createAction(PUT_ALL, values => {
  if (!isArray(values)) {
    throw new Error('Must send putAll an array.')
  }
  return values
})
