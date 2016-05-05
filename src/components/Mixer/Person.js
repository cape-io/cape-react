import React, { PropTypes } from 'react'
import partial from 'lodash/partial'
import { Link } from 'redux-history-sync'

import FieldGroup from '../Editable/FieldGroup'
import FieldList from '../Editable/FieldList'
import Images from '../Editable/ImageUpload/Images'
import EntityList from '../Editable/EntityList'

const nameFields = [
  'honorificPrefix', 'givenName', 'additionalName', 'familyName', 'honorificSuffix',
]
const addressFields = [
  'streetAddress', 'postOfficeBoxNumber', 'addressLocality',
  'addressRegion', 'postalCode', 'addressCountry',
]
// <FieldGroup {...props} fields={[ 'name' ]} createNewField={newSubjField} />
function Person(props) {
  const { createNewField, createNewSubject, entity, schema, selectField, subject, subjects } = props
  const newSubjField = partial(createNewField, subject.id)
  const newSubject = partial(createNewSubject, subject.id)
  return (
    <div className="mixer" style={{ display: 'flex', flexDirection: 'column' }}>
      <Images {...props} entity={entity.image} schema={schema.Person.image} width={200} />
      <FieldGroup
        {...props}
        fields={nameFields}
        createNewField={newSubjField}
        schema={schema.Person}
      />
      <FieldList
        entity={entity.email}
        schema={schema.Person.email}
        selectField={selectField}
        createNewField={partial(newSubjField, 'email')}
      />
      <FieldGroup
        {...props}
        createNewField={newSubjField}
        fields={[ 'description' ]}
        schema={schema.Person}
      />
      <EntityList
        createNewField={partial(newSubjField, 'address', 'PostalAddress')}
        entity={entity.address}
        entitySchema={schema.PostalAddress}
        fields={addressFields}
        schema={schema.Person.address}
        selectField={selectField}
      />
      <EntityList
        createNewField={partial(newSubject, 'author', 'WebSite')}
        entity={subjects.WebSite}
        entitySchema={schema.WebSite.domainIncludes}
        fields={[ 'url' ]}
        schema={schema.WebSite}
        selectField={selectField}
      />
      <Link to="/mixer/create/">Mixer Create</Link>
    </div>
  )
}
Person.propTypes = {
  createNewField: PropTypes.func.isRequired,
  createNewSubject: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  entityPut: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  selectField: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
  triplePut: PropTypes.func.isRequired,
}

export default Person
