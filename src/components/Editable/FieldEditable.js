import React, { PropTypes } from 'react'

import { fieldValidation } from '../../utils/formValidation'
import EditField from './Field'
import Placeholder from './Placeholder'

function Field({ createNewField, field, justCreated, schema }) {
  const { name, description, inputType, validators } = schema
  if (field) {
    return (
      <EditField
        help={description}
        id={field.id}
        justCreated={justCreated}
        label={name}
        prefix={[ 'UpdateFieldAction', field.id ]}
        type={ inputType || 'text' }
        initialValue={field.value}
        validate={fieldValidation(validators)}
      />
    )
  }
  return <Placeholder label={name} onClick={createNewField} title={description} />
}
Field.propTypes = {
  createNewField: PropTypes.func,
  field: PropTypes.object,
  justCreated: PropTypes.bool.isRequired,
  schema: PropTypes.object.isRequired,
}
export default Field
