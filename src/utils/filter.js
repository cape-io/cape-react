import compact from 'lodash/compact'
import every from 'lodash/every'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import values from 'lodash/values'

export function filterItem(item, { fieldId, compare, value }) {
  if (!value) return true
  const itemValue = get(item, fieldId)
  switch (compare) {
    case 'is':
    case 'equal':
      return itemValue === value
    case 'includes':
      return every(compact(value.split(' ')), searchTxt =>
        itemValue && itemValue.toLowerCase().includes(searchTxt)
      )
    default:
      return true
  }
}

export function filterCollection(items, filterParams) {
  if (isEmpty(filterParams)) {
    return values(items)
  }
  // Filter based on an array of params.
  if (isArray(filterParams)) {
    return filter(items, item =>
      every(filterParams, (fParam) => filterItem(item, fParam))
    )
  }
  // Filter collection against single filterParams.
  if (isObject(filterParams)) {
    return filter(items, item => filterItem(item, filterParams))
  }
  // Error filterParams are not object or array.
  return items
}

// Create new index with quantity of each. Simple reduce like function.
export function itemCount(items, fieldId) {
  const optionCountIndex = {}
  forEach(items, item => {
    const indexId = get(item, fieldId)
    const preVal = get(optionCountIndex, indexId, 0)
    optionCountIndex[indexId] = preVal + 1
  })
  return optionCountIndex
}
