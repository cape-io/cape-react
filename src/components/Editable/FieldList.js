import React, { PropTypes } from 'react'
import map from 'lodash/map'

import Field from './FieldEditable'
import Placeholder from './Placeholder'
import { getPrefix } from '../../redux/select/mixer'

function FieldList({ createNewField, entity, selectField, schema }) {
  const addLabel = entity ? '+' : schema.name
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      { map(entity, (field, fieldId) =>
          <Field
            key={fieldId}
            field={field}
            justCreated={selectField.state.id === fieldId}
            prefix={getPrefix(field)}
            schema={schema}
          />
        )
      }
      <Placeholder label={addLabel} onClick={createNewField} title={schema.description} />
    </div>
  )
}
FieldList.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object,
  selectField: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  // subject: PropTypes.object.isRequired,
}
FieldList.defaultProps = {}

export default FieldList
