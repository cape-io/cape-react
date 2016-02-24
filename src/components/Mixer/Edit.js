import React, { PropTypes } from 'react'
import CreateSelect from './CreateSelect'
import { connectField } from 'redux-field'
import Wrapper from '../Editable/Wrapper'
const Field = connectField({ formId: 'profile' })(Wrapper)

// Display a list of content types the user can edit.
function Mixer({ field, fields, entity }) {
  return (
    <div className="container">
      <h1>{entity.type}</h1>
      <p>Select the kind of field you want to add.</p>
      <CreateSelect field={field.type} />
      {
        fields.map(id => <Field key={id} field={field[id]} id={id} value={entity[id]} />)
      }
    </div>
  )
}
Mixer.propTypes = {
  field: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default Mixer
