import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'

import { fieldValidation } from '../../utils/formValidation'
import EditField from './Field'
import Placeholder from './Placeholder'

function Field({ onPlaceholderClick, field, fieldEvent, justCreated, schema, ...rest }) {
  const { name, description, inputType, validators } = schema
  if (field) {
    return (
      <EditField
        {...rest}
        fieldEvent={fieldEvent}
        help={description}
        id={field.id}
        justCreated={justCreated}
        label={name}
        type={ inputType || 'text' }
        initialValue={field.value}
        validate={fieldValidation(validators)}
      />
    )
  }
  const onClick = onPlaceholderClick || fieldEvent.open
  return <Placeholder label={name} onClick={onClick} title={description} />
}
Field.propTypes = {
  onPlaceholderClick: PropTypes.func,
  field: PropTypes.object,
  fieldEvent: PropTypes.object.isRequired,
  justCreated: PropTypes.bool.isRequired,
  schema: PropTypes.object.isRequired,
}
Field.defaultProps = {
  justCreated: false,
}
export default connectField()(Field)
