import React, { PropTypes } from 'react'
import classnames from 'classnames'
import isString from 'lodash/isString'
import map from 'lodash/map'

function SelectOption({ value, label, active }) {
  return (
    <option key={value} className={classnames({ active })} value={value}>
      {label}
    </option>
  )
}
SelectOption.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

function opts(arg) {
  return isString(arg) ? { value: arg, label: arg } : arg
}

function Select({ options, value, ...props }) {
  return (
    <select
      {...props}
      value={value}
    >
      {map(options, opt =>
        <SelectOption {...opts(opt)} active={value === opt.value} key={opt.value} />
      )}
    </select>
  )
}

Select.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}
Select.defaultProps = {
  value: '-',
}
export default Select
