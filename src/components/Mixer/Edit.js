import React, { PropTypes } from 'react'
import map from 'lodash/map'

import CreateSelect from './CreateSelect'
import { connectField } from 'redux-field'

import StaticVal from '../Editable/StaticVal'
import Wrapper from '../Editable/Wrapper'
import ImageUpload from '../Editable/ImageUpload/ImageUpload'
const Field = connectField()(Wrapper)
const ImageField = connectField()(ImageUpload)

// Display a list of content types the user can edit.
function Mixer({ entityUpdate, selectField, objects, subject }) {
  return (
    <div className="container">
      <h1>{subject.type}</h1>
      <ul>
        <StaticVal label="ID" value={subject.id} />
        <StaticVal label="Date Created" value={subject.dateCreated} />
      </ul>
      <p>Select the kind of field you want to add.</p>
      <CreateSelect
        {...selectField}
        id={`create-obj-${selectField.id}`}
        prefix={[ 'CreateObjectAction', subject.id ]}
      />
      {
        map(objects, ({ object, predicate }) => (
          object.schemaInfo.inputType === 'image' ?
          <ImageField
            entityUpdate={entityUpdate}
            key={object.id}
            {...object}
            prefix={[ 'UpdateFieldAction', object.id ]}
          /> :
          <Field
            key={object.id}
            {...object}
            label={`${predicate} (${object.id})`}
            type={object.schemaInfo.inputType}
            prefix={[ 'UpdateFieldAction', object.id ]}
          />
        ))
      }
    </div>
  )
}
Mixer.propTypes = {
  entityUpdate: PropTypes.func.isRequired,
  selectField: PropTypes.object.isRequired,
  objects: PropTypes.array,
  subject: PropTypes.object.isRequired,
}

export default Mixer
