import React, { PropTypes } from 'react'

import Form from './Form/Form'
import LoginGoogle from './LoginGoogle'

function Login({ user, login, ...rest }) {
  if (user && user.user.id) {
    if (user.googleApps) {
      return (
        <div>
          <h2>Login</h2>
          <LoginGoogle login={login} />
        </div>
      )
    }
  }
  return (
    <Form {...rest} />
  )
}

Login.propTypes = {
  user: PropTypes.object,
}
Login.defaultProps = {
}
export default Login
