import React, { PropTypes } from 'react'

function Submitting({ text }) {
  return (
    <div className="submitting">
      { text }
    </div>
  )
}

Submitting.propTypes = {
  text: PropTypes.string,
}
Submitting.defaultProps = {
  text: 'Submitting...',
}

export default Submitting
