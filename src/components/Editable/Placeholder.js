import React, { PropTypes } from 'react'

const style = {
  base: {
    background: 'transparent',
    border: 0,
    color: 'grey',
  },
}

function Placeholder({ label, ...props }) {
  return (
    <button {...props} style={style.base}>
      { label }
    </button>
  )
}

Placeholder.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
Placeholder.defaultProps = {
}

export default Placeholder
