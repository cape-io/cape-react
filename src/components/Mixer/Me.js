import React, { PropTypes } from 'react'
import partial from 'lodash/partial'

import FieldGroup from '../Editable/FieldGroup'
import FieldList from '../Editable/FieldList'
// import Images from '../Editable/Images'

const nameFields = [
  'honorificPrefix', 'givenName', 'additionalName', 'familyName', 'honorificSuffix',
]

function Person(props) {
  const { createNewField, entity, schema, selectField, subject } = props
  const newSubjField = partial(createNewField, subject.id)
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
      <FieldGroup {...props} fields={nameFields} createNewField={newSubjField} />
      <FieldGroup {...props} fields={[ 'alternateName' ]} createNewField={newSubjField} />
      <FieldList
        entity={entity.email}
        schema={schema.email}
        selectField={selectField}
        createNewField={partial(newSubjField, 'email')}
      />
    </div>
  )
}
Person.propTypes = {
  createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  selectField: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
}

export default Person
