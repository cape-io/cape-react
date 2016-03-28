import React, { PropTypes } from 'react'
import FieldGroup from '../Editable/FieldGroup'

function Person({ entity, schema }) {
  return (
    <div className="container">
      <FieldGroup entity={entity} schema={schema} />
    </div>
  )
}
Person.propTypes = {
  entity: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}

export default Person
