import React, { PropTypes } from 'react'
import map from 'lodash/map'

import FieldGroup from '../Editable/EntityFieldGroup'
import Placeholder from './Placeholder'

function EntityList({ createNewField, entity, entitySchema, fields, schema }) {
  const addLabel = entity ? '+' : schema.name
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      { map(entity, (field, entityId) =>
          <FieldGroup
            key={entityId}
            entity={field}
            fields={fields}
            schema={entitySchema}
          />
        )
      }
      <Placeholder label={addLabel} onClick={createNewField} title={schema.description} />
    </div>
  )
}
EntityList.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object,
  entitySchema: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  selectField: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  // subject: PropTypes.object.isRequired,
}
EntityList.defaultProps = {}

export default EntityList
