import React, { PropTypes } from 'react'

function Authenticated({ name, logout }) {
  return (
    <div>
      <p>You are currently logged in as {name}.</p>
      <div>
        <button className="btn btn-danger" onClick={logout}>
          <i className="fa fa-sign-out"/>{' Log Out'}
        </button>
      </div>
    </div>
  )
}
Authenticated.propTypes = {
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Authenticated
