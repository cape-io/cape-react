import React, { PropTypes } from 'react'

function Anonymous({ leadMsg, handleSubmit }) {
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" ref="username" placeholder="you@example.com"/>
        <button className="btn btn-success" onClick={handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
        </button>
      </form>
      <p>{ leadMsg }</p>
    </div>
  )
}
Anonymous.propTypes = {
  leadMsg: PropTypes.string.isRequired,
}

export default Anonymous
