import each from 'lodash/each'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'
import values from 'lodash/values'

import { filterCollection } from '../utils/filter'

import info from './schema.js'

function getCollection(state, type) {
  return get(state, info[type].selector || type)
}

function getItem(state, type, id) {
  const collection = getCollection(state, type)
  return collection[id]
}

function getItemChildren(state, item, children) {
  const refs = {}
  each(children, (type, selector) => {
    if (selector.includes('[].')) {
      const [ prePath, postPath ] = selector.split('[].')
      const selection = get(item, prePath)
      if (isArray(selection)) {
        each(selection, (itemChild, index) => {
          const childId = get(itemChild, postPath)
          const childRef = getItem(state, type, childId)
          set(refs, `${prePath}[${index}].${postPath}`, childRef)
        })
        return
      }
    }
    const id = get(item, selector)
    set(refs, selector, getItem(state, type, id))
  })
  return refs
}

function getType(state, type, id) {
  const { children } = info[type]
  const collection = getCollection(state, type)
  if (!children) {
    if (id) return collection[id]
    return values(collection)
  }
  return map(collection, item =>
    merge({}, item, getItemChildren(state, item, children))
  )
}

function pick(source, fields) {
  const item = {}
  each(fields, (selector) => set(item, selector, get(source, selector)))
  return item
}

export default function select(state, type, options = {}) {
  let items = getType(state, type, options.id)

  const filter = get(state, [ 'filter', type ])
  if (filter) {
    const filterInfo = map(filter, ({ compare, value }, fieldId) =>
      ({ compare, value, fieldId })
    )
    items = filterCollection(items, filterInfo)
  }
  if (options.pick) {
    items = map(items, item => pick(item, options.pick))
  }
  return items
}
