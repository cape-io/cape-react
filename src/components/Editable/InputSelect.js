import React, { PropTypes } from 'react'
import Select from './Select'
import { connectField } from 'redux-field'

function InputSelect({ form, formEvent, options, schema }) {
  return (
    <div>
      <Select
        value={form.value}
        {...formEvent}
        options={options}
      />
    { form.value && schema && schema[form.value] &&
        <p dangerouslySetInnerHTML={{ __html: schema[form.value].description }} />
      }
    </div>
  )
}

InputSelect.propTypes = {
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  schema: PropTypes.object,
}
InputSelect.defaultProps = {
  value: '', // Because react-select doesn't like the initial value of undefined.
}
export default connectField()(InputSelect)
