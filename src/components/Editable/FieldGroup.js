import React, { PropTypes } from 'react'
import map from 'lodash/map'
import partial from 'lodash/partial'

import { getField } from '../../redux/select/mixer'
import Field from './FieldEditable'

function FieldGroup({ createNewField, entity, fields, schema, selectField }) {
  return (
    <div style={{ display: 'flex' }}>
    { map(fields, fieldId =>
        <Field
          key={fieldId}
          createNewField={partial(createNewField, schema[fieldId].alternateName)}
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
}
FieldGroup.defaultProps = {}

export default FieldGroup
