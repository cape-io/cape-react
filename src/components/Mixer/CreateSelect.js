import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'
import isString from 'lodash/isString'
import Editable from '../Editable/Editable'
import EditableButtons from '../Editable/Buttons'
import Select from '../Form/Select'
// Display a list of content types the user can edit.
function CreateSelect({ form, formEvent, id, label, options, type }) {
  const { value } = form
  const { onBlur, onFocus, onSelect, onSubmit } = formEvent

  return (
    <Editable form={form} id={id} label={label} type={type}>
      <Select onBlur={onBlur} onFocus={onFocus} options={options} onSelect={onSelect} />
      <EditableButtons
        onSubmit={onSubmit}
        preventClose
        value={isString(value) ? value : options[0]}
      />
    </Editable>
  )
}
CreateSelect.propTypes = {
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  options: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
}
CreateSelect.defaultProps = {
}
export default connectField()(CreateSelect)
