import React, { PropTypes } from 'react'
import Select from 'react-select'

function InputSelect({ onBlur, value, options, option, ...props }) {
  const optionInfoArr = options.map(id => option[id])
  return (
    <Select
      value={value}
      onBlur={() => onBlur(value)} // just pass the current value (updated on change)
      options={optionInfoArr}
      {...props} // options are part of other props
    />
  )
}

InputSelect.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
}
InputSelect.defaultProps = {
  value: '', // Because react-select doesn't like the initial value of undefined.
}
export default InputSelect
