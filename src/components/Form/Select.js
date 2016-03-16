import React, { PropTypes } from 'react'

function SelectOption(props) {
  const value = props.value || props
  const label = props.label || props
  return <option key={value} value={value}>{label}</option>
}
SelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

function Select({ options, value, ...props }) {
  return (
    <select
      {...props}
      value={value}
    >
      { options.map(SelectOption) }
    </select>
  )
}

Select.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}
Select.defaultProps = {
}
export default Select
