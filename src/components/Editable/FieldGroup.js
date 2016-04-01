import React, { PropTypes } from 'react'
import map from 'lodash/map'
import partial from 'lodash/partial'

import { getField, getPrefix } from '../../redux/select/mixer'
import Field from './FieldEditable'

function FieldGroup({ createNewField, entity, fields, prefix, schema, selectField }) {
  return (
    <div style={{ display: 'flex' }}>
    {
      map(fields, fieldId => {
        const field = getField(entity[fieldId])
        return (
          <Field
            key={fieldId}
            onPlaceholderClick={partial(createNewField, schema[fieldId].alternateName)}
            field={field}
            justCreated={selectField.state.value === fieldId}
            prefix={getPrefix(field, prefix)}
            schema={schema[fieldId]}
          />
        )
      })
    }
    </div>
  )
}
FieldGroup.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  prefix: PropTypes.string,
  selectField: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}
FieldGroup.defaultProps = {
}

export default FieldGroup
