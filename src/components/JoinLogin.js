import React, { PropTypes } from 'react'

// Basic suggestion button.
function JoinLogin({ form, children, ...rest }) {
  const { title, intro } = form
  return (
    <div>
      <h2>{ title }</h2>
      <p className="lead">{ intro }</p>
      { children }
    </div>
  )
}

JoinLogin.propTypes = {
  form: PropTypes.object.isRequired,
  // leadMsg: PropTypes.string.isRequired,
  // headerMsg: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
JoinLogin.defaultProps = {}

export default JoinLogin
