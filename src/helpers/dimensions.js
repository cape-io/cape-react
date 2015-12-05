import isObject from 'lodash/lang/isObject'

export const options = [
  {
    value: 'x',
    name: 'Select...',
  },
  {
    value: 'none',
    name: 'Not applicable',
  },
  {
    value: 'variable',
    name: 'Variable',
  },
  {
    value: 'fixed',
    name: 'Specific Dimensions',
  },
]

function _size(height = null, width = null, depth = null) {
  return { h: height, w: width, d: depth }
}

// Using this serialization so it is more human readable.
export function parseSize(str, defaultSize) {
  if (!str || str === 'x') {
    return null
  }
  if (str === 'none' || str === 'variable' ) {
    return str
  }
  if (str === 'fixed') {
    if (isObject(defaultSize)) return defaultSize
    return _size()
  }
  const size = str.replace('size-', '').split('x')
  return _size(...size)
}

export function encodeSize(arg) {
  if (!isObject(arg)) {
    return arg
  }
  const { h, w, d } = arg
  return 'size-' + h + 'x' + w + 'x' + d
}
