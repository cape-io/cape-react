import React, { PropTypes } from 'react'

import Editable from './Editable'
import PreviewText from './PreviewText'
import EditField from './EditField'

function Wrapper(props) {
  const { action, field, form, value } = props
  const { onBlur, onChange, onClose, onOpen, onSubmit } = action
  const { editable, id, type } = field
  const { errorMessage, hasError, open } = form
  function handleOpen() {
    onOpen(form.value || value)
  }
  return (
    <Editable {...props}>
      { !open &&
        <PreviewText
          editable={editable}
          onClick={handleOpen}
          value={form.value || value}
        />
      }
      {
        open &&
        <EditField
          defaultValue={value}
          id={id}
          key={id}
          hasError={hasError}
          onBlur={onBlur}
          onChange={onChange}
          onClose={onClose}
          onSubmit={onSubmit}
          errorMessage={errorMessage}
          type={type}
          value={form.value}
        />
      }
    </Editable>
  )
}

Wrapper.propTypes = {
  action: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  value: PropTypes.any,
}

export default Wrapper
