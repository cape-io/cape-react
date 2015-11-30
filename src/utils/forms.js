export function getField(fieldsInfoObj, fieldId) {
  const id = fieldId.split('.')
  if (id.length === 1) {
    return fieldsInfoObj[id[0]]
  }
  else if (id.length === 2) {
    return fieldsInfoObj[id[0]].field[id[1]]
  }
  else {
    throw new Error('invalid fieldId')
  }
}
