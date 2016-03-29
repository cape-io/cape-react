import React, { PropTypes } from 'react'
import map from 'lodash/map'

import Field from './FieldEditable'
import Placeholder from './Placeholder'

function FieldList({ createNewField, entity, selectField, schema }) {
  return (
    <div style={{ display: 'flex' }}>
      { map(entity, (field, fieldId) =>
          <Field
            key={fieldId}
            field={field}
            justCreated={selectField.state.id === fieldId}
            schema={schema}
          />
        )
      }
      <Placeholder label="+" onClick={createNewField} title={schema.description} />
    </div>
  )
}
FieldList.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  selectField: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  // subject: PropTypes.object.isRequired,
}
FieldList.defaultProps = {}

export default FieldList
