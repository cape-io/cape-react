import React, { PropTypes } from 'react'

import EditField from './Field'
import Placeholder from './Placeholder'
import { getPrefix, schemaProps } from '../../redux/select/mixer'

function Field({ onPlaceholderClick, field, justCreated, prefix, schema, ...rest }) {
  if (field) {
    return (
      <EditField
        {...rest}
        {...schemaProps(schema)}
        id={field.id}
        justCreated={justCreated}
        initialValue={field.value}
        prefix={getPrefix(field, prefix)}
      />
    )
  }
  const { description, name } = schema
  return <Placeholder label={name} onClick={onPlaceholderClick} title={description} />
}
Field.propTypes = {
  onPlaceholderClick: PropTypes.func,
  field: PropTypes.object,
  justCreated: PropTypes.bool.isRequired,
  prefix: PropTypes.string,
  schema: PropTypes.object.isRequired,
}
Field.defaultProps = {
  justCreated: false,
}
export default Field
