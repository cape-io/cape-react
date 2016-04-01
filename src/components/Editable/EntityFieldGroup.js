import React, { PropTypes } from 'react'
import map from 'lodash/map'

import Field from './FieldEditable'

// Edit native entity fields. These are usually set by machine like image width or file size.
function EntityFieldGroup({ entity, fields, schema }) {
  return (
    <div style={{ display: 'flex' }}>
    { map(fields, fieldId =>
        <Field
          key={fieldId}
          field={{ id: fieldId, value: entity[fieldId] }}
          prefix={[ entity.id, fieldId ]}
          schema={schema[fieldId]}
        />
      )
    }
    </div>
  )
}
EntityFieldGroup.propTypes = {
  entity: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
}
EntityFieldGroup.defaultProps = {}

export default EntityFieldGroup
