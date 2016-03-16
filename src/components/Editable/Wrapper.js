import React, { PropTypes } from 'react'

import Editable from './Editable'
import PreviewText from './PreviewText'
import EditField from './EditField'

function Wrapper(props) {
  const { editable, id, type, fieldEvent, formEvent, form, value } = props
  const { saving } = form
  function handleOpen() {
    fieldEvent.open(form.value || value)
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
          fieldEvent={fieldEvent}
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
  editable: PropTypes.bool.isRequired,
  fieldEvent: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
}
Wrapper.defaultProps = {
  editable: true,
  type: 'text',
}
export default Wrapper
