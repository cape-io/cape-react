import React, { PropTypes } from 'react'
import map from 'lodash/map'
import partial from 'lodash/partial'

import FieldGroup from '../Editable/FieldGroup'
import Images from '../Editable/ImageUpload/Images'
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
function MixerEdit({ entity, objects, schema, subject, subjects, ...props }) {
  if (!schema || !entity) {
    return <Loading message="missing schema or entity" />
  }
  const { description, domainIncludes } = schema
  const personFields = peopleFields(domainIncludes)
  const newSubjField = partial(props.createNewField, subject.id)
  return (
    <div className="container">
      <h1>{subject.type}</h1>
      <p>{description}</p>
      <ul>
        <StaticVal label="ID" value={subject.id} />
        <StaticVal label="Date Created" value={subject.dateCreated} />
      </ul>
      <Images
        {...props}
        entity={entity.image} schema={schema.domainIncludes.image} subject={subject} width={200}
      />
      <FieldGroup
        {...props}
        createNewField={newSubjField}
        entity={entity}
        fields={[ 'name' ]} schema={schema.domainIncludes}
      />
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
MixerEdit.propTypes = {
  createNewField: PropTypes.func.isRequired,
  createNewSubject: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  objects: PropTypes.object,
  subject: PropTypes.object.isRequired,
  subjects: PropTypes.object,
}

export default MixerEdit
