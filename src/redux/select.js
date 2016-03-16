import each from 'lodash/each'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'
import values from 'lodash/values'

import { filterCollection } from '../utils/filter'
import { fieldValidation } from '../utils/formValidation'

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

function addFieldValidate(item) {
  const fieldValidate = {}
  each(item.fields, fieldId => {
    if (item.field[fieldId].validators) {
      fieldValidate[fieldId] = { validate: fieldValidation(item.field[fieldId].validators) }
    }
  })
  return merge({}, { field: fieldValidate }, item)
}

function getType(state, type, id) {
  const { children, validators } = info[type]
  if (id) {
    const item = getItem(state, type, id)
    if (validators && item && item.fields) {
      return addFieldValidate(item)
    }
    return item
  }
  const collection = getCollection(state, type)
  if (!children) {
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

export function humanFileSize(bytes) {
  const units = [ 'B', 'KB', 'MB', 'GB' ]
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = (bytes / Math.pow(1024, index)).toFixed(2) * 1
  return {
    value: size,
    unitText: units[index],
  }
}
