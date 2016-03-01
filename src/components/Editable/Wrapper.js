import React, { PropTypes } from 'react'

import Editable from './Editable'
import PreviewText from './PreviewText'
import EditField from './EditField'

function Wrapper(props) {
  const { fieldEvent, formEvent, field, form, value } = props
  const { editable, id, type } = field
  const { saving } = form
  function handleOpen() {
    fieldEvent.onOpen(form.value || value)
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
          formEvent={formEvent}
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
  field: PropTypes.object.isRequired,
  fieldEvent: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  open: PropTypes.bool,
  value: PropTypes.any,
}

export default Wrapper
