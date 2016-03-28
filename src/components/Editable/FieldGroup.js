import React, { PropTypes } from 'react'
import map from 'lodash/map'
import partial from 'lodash/partial'
import values from 'lodash/values'

import Placeholder from './Placeholder'

function Field({ createNewField, description, label, value }) {
  if (value) return <div title={label}>{ value }</div>
  return <Placeholder label={label} title={description} onClick={createNewField} />
}
Field.propTypes = {
  createNewField: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}
function getValue(entityField) {
  if (!entityField) return entityField
  return values(entityField)[0].value
}
function FieldGroup({ createNewField, entity, fields, schema, subject }) {
  return (
    <div className="row person-name">
    { map(fields, fieldId =>
        <Field
          key={fieldId}
          createNewField={partial(createNewField, subject.id, schema[fieldId].alternateName)}
          value={getValue(entity[fieldId])}
          label={schema[fieldId].name}
          description={schema[fieldId].description}
        />
      )
    }
    </div>
  )
}
FieldGroup.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
}
FieldGroup.defaultProps = {}

export default FieldGroup
