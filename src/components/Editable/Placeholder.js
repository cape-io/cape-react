import React, { PropTypes } from 'react'
import radium from 'radium'

const style = {
  base: {
    background: 'transparent',
    border: 0,
    color: 'grey',
    fontSize: '1.8rem',
  },
}

function Placeholder({ color, label, ...props }) {
  return (
    <button {...props} style={[ style.base, { color } ]}>
      { label }
    </button>
  )
}

Placeholder.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
Placeholder.defaultProps = {
  color: 'grey',
}

export default radium(Placeholder)
