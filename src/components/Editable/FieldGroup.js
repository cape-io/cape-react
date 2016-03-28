import React, { PropTypes } from 'react'
import map from 'lodash/map'
import partial from 'lodash/partial'
import values from 'lodash/values'

import EditField from './Field'
import Placeholder from './Placeholder'

function Field({ createNewField, field, justCreated, schema }) {
  const { name, description } = schema
  if (field) {
    return (
      <EditField
        help={description}
        id={field.id}
        justCreated={justCreated}
        label={name}
        prefix={[ 'UpdateFieldAction', field.id ]}
        type="text"
        value={field.value}
      />
    )
  }
  return <Placeholder label={name} onClick={createNewField} title={description} />
}
Field.propTypes = {
  createNewField: PropTypes.func.isRequired,
  field: PropTypes.object,
  justCreated: PropTypes.bool.isRequired,
  schema: PropTypes.object.isRequired,
}
function getField(entityField) {
  if (!entityField) return entityField
  const fields = values(values(entityField))
  return find(fields, 'value') || fields[0]
}
function FieldGroup({ createNewField, entity, fields, schema, selectField, subject }) {
  return (
    <div className="row person-name">
    { map(fields, fieldId =>
        <Field
          key={fieldId}
          createNewField={partial(createNewField, subject.id, schema[fieldId].alternateName)}
          field={getField(entity[fieldId])}
          justCreated={selectField.state.value === fieldId}
          schema={schema[fieldId]}
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
  selectField: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
}
FieldGroup.defaultProps = {}

export default FieldGroup
