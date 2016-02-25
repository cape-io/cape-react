import { createAction } from '../utils'

export const DEL = 'triple/DEL'
export const del = createAction(DEL)
export const PUT = 'triple/PUT'
// You can send it an array of three values or an object with an id.
export const put = createAction(PUT, value => {
  const triple = value.id ? value : { id: value }
  if (triple.id.length !== 3) {
    throw new Error('Triple id must have a length of three.')
  }
  return triple
})
