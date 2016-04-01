import React, { PropTypes } from 'react'

import { fieldValidation } from '../../utils/formValidation'
import EditField from './Field'
import Placeholder from './Placeholder'
import { getPrefix } from '../../redux/select/mixer'

function Field({ onPlaceholderClick, field, justCreated, prefix, schema, ...rest }) {
  const { name, description, inputType, validators } = schema
  if (field) {
    return (
      <EditField
        {...rest}
        help={description}
        id={field.id}
        justCreated={justCreated}
        label={name}
        type={ inputType || 'text' }
        initialValue={field.value}
        prefix={getPrefix(field, prefix)}
        validate={fieldValidation(validators)}
      />
    )
  }
  return <Placeholder label={name} onClick={onPlaceholderClick} title={description} />
}
Field.propTypes = {
  onPlaceholderClick: PropTypes.func.isRequired,
  field: PropTypes.object,
  justCreated: PropTypes.bool.isRequired,
  prefix: PropTypes.string,
  schema: PropTypes.object.isRequired,
}
Field.defaultProps = {
  justCreated: false,
}
export default Field
