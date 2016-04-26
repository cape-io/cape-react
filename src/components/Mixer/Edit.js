import React, { PropTypes } from 'react'
import map from 'lodash/map'
// import { connectField } from 'redux-field'

import StaticVal from '../Editable/StaticVal'
import Loading from '../Loading'
import AddPerson from './AddPerson'
// import Image from '../Editable/ImageUpload/Uploaded'
// import Wrapper from '../Editable/Wrapper'
// import ImageUpload from '../Editable/ImageUpload/ImageUpload'
import { peopleFields } from '../../redux/select/mixer'
// const Field = connectField()(Wrapper)
// const ImageField = connectField()(ImageUpload)

// Display a list of content types the user can edit.
function Mixer({ objects, schema, subject, subjects }) {
  if (!schema) {
    return <Loading message="missing schema" />
  }
  const { description, domainIncludes } = schema
  const personFields = peopleFields(domainIncludes)
  return (
    <div className="container">
      <h1>{subject.type}</h1>
      <p>{description}</p>
      <ul>
        <StaticVal label="ID" value={subject.id} />
        <StaticVal label="Date Created" value={subject.dateCreated} />
      </ul>
      { !!personFields.length && <AddPerson fields={personFields} schema={domainIncludes} /> }
      <h3>Objects</h3>
      { objects &&
        map(objects, (objs, predicate) => (
          <div key={predicate}>
            {predicate}
            <ul>
              { map(objs, obj => <li key={obj.entity.id}>{obj.entity.id}</li>)}
            </ul>
          </div>
        ))
      }
      <h3>Subjects</h3>
      { subjects &&
        map(subjects, (items, predicate) => (
          <div key={predicate}>
            {predicate}
            <ul>
              { map(items, item => <li key={item.id}>{item.id} - {item.type}</li>)}
            </ul>
          </div>
        ))
      }
    </div>
  )
}
Mixer.propTypes = {
  schema: PropTypes.object.isRequired,
  objects: PropTypes.object,
  subject: PropTypes.object.isRequired,
  subjects: PropTypes.object,
}

export default Mixer
