import React, { PropTypes } from 'react'
import map from 'lodash/map'

import CreateSelect from './CreateSelect'
import { connectField } from 'redux-field'
import Wrapper from '../Editable/Wrapper'
const Field = connectField({ formId: 'profile' })(Wrapper)

const styleFormValue = {
  paddingLeft: '.5rem',
}
function StaticVal({ label, value }) {
  return <li><label>{label}</label><span style={styleFormValue}>{value}</span></li>
}
// Display a list of content types the user can edit.
function Mixer({ selectField, objects, subject }) {
  return (
    <div className="container">
      <h1>{subject.type}</h1>
      <ul>
        <StaticVal label="ID:" value={subject.id} />
        <StaticVal label="Date Created:" value={subject.dateCreated} />
      </ul>
      <p>Select the kind of field you want to add.</p>
      <CreateSelect
        {...selectField}
        id={`create-obj-${selectField.id}`}
        prefix={[ 'CreateObjectAction', subject.id ]}
      />
      {
        map(objects, ({ object, predicate }) => (
          <Field
            key={object.id}
            {...object}
            label={predicate}
            type="text"
            prefix={[ 'UpdateFieldAction', object.id ]}
          />
        ))
      }
    </div>
  )
}
Mixer.propTypes = {
  selectField: PropTypes.object.isRequired,
  objects: PropTypes.array,
  subject: PropTypes.object.isRequired,
}

export default Mixer
