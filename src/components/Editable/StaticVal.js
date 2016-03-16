import React, { PropTypes } from 'react'

const style = {
  paddingLeft: '.5rem',
}

function StaticVal({ className, label, value }) {
  const val = value.value ? `${value.value} ${value.unitText || '?'}s` : value
  return (
    <li className={className}>
      <label>{label}</label>:
      <span style={style}>{val}</span>
    </li>
  )
}

StaticVal.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
}
StaticVal.defaultProps = {
}
export default StaticVal
