import React, { PropTypes } from 'react'

const style = {
  base: {
    color: 'grey',
  },
}

function Placeholder({ label, ...props }) {
  return (
    <div {...props} style={style.base}>
      { label }
    </div>
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
