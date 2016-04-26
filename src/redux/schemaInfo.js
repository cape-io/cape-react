const inputType = {
  text: 'text',
  longText: 'textarea',
  ImageObject: 'image',
}
// A place to experiement with custom values before putting them in the database.
// Property info.
export const schemaInfo = {
  email: {
    description: 'An email identifies a location to which email messages are delivered.',
    dataType: 'text',
    validators: [ 'isEmail' ],
  },
  description: {
    description: 'A short description of the item/person.',
    dataType: 'longText',
  },
  name: {
    description: 'The label or full name of the item/person.',
    dataType: 'text',
  },
  image: {
    dataType: 'ImageObject',
    description: 'An image of the item. This can be a URL or a fully described ImageObject.',
  },
}
export function propertyInfo(property, rangeIncludes) {
  const info = schemaInfo[property.alternateName] || { dataType: 'text' }
  info.inputType = inputType[info.dataType] || 'text'
  // const range = rangeIncludes.length === 1 ? rangeIncludes[0] : rangeIncludes
  return property.merge(info).set('rangeIncludes', rangeIncludes)
}
