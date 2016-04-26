import React, { PropTypes } from 'react'
import Input from './input/Input'
import { connectField } from 'redux-field'

function InputField({ form, formEvent, id, type }) {
  return (
    <Input
      value={form.value}
      id={id}
      {...formEvent}
      type={type}
    />
  )
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
}
InputField.defaultProps = {
}
export default connectField()(InputField)
