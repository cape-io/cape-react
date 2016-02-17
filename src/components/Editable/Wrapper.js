import React, { PropTypes } from 'react'

import Editable from './Editable'
import PreviewText from './PreviewText'
import EditField from './EditField'

function Wrapper(props) {
  const { action, field, form, value } = props
  const { onOpen } = action
  const { editable, id, type } = field
  const { saving } = form
  function handleOpen() {
    onOpen(form.value || value)
  }
  const preventClose = !saving && props.open
  const open = preventClose || form.open
  return (
    <Editable {...props}>
      { !open &&
        <PreviewText
          editable={!saving && editable}
          onClick={handleOpen}
          value={form.value || value}
        />
      }
      {
        open &&
        <EditField
          action={action}
          defaultValue={value}
          form={form}
          id={id}
          key={id}
          preventClose={preventClose}
          type={type}
        />
      }
    </Editable>
  )
}

Wrapper.propTypes = {
  action: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  open: PropTypes.bool,
  value: PropTypes.any,
}

export default Wrapper
