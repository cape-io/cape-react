import React, { PropTypes } from 'react'
import FieldGroup from '../Editable/FieldGroup'

const nameFields = [
  'honorificPrefix', 'givenName', 'additionalName', 'familyName', 'honorificSuffix',
]

function Person(props) {
  return (
    <div className="container">
      <FieldGroup {...props} fields={nameFields} />
    </div>
  )
}
Person.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}

export default Person
