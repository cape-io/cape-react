import React, { PropTypes } from 'react'

// Basic suggestion button.
function Loading({ message }) {
  return (
    <div className="alert alert-info" role="alert">
      <h2 className="loading">
        { message }
      </h2>
    </div>
  )
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
}
Loading.defaultProps = {
  message: 'Loading...',
}
export default Loading
