import React, { PropTypes } from 'react'

import Form from './Form/Form'

function Login({ user, login, ...rest }) {
  if (user && user.user.id) {
    if (user.googleApps) {
      const linkText = `Sign in using your ${login} Google Apps account.`
      return <a href="/api/user/login/google">{linkText}</a>
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
