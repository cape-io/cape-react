import React, { PropTypes } from 'react'

import Form from '../Form/Form'
import ProviderLinks from './ProviderLinks'

function Login({ user, login, ...rest }) {
  if (user && user.user) {
    return <ProviderLinks {...user.user} login={login} />
  }
  return (
    <div>
      { user &&
        <div className="alert alert-info" role="alert">
          <p>
            {`No user found with the email of ${login}.`}
          </p>
        </div>
      }
      <Form {...rest} />
    </div>
  )
}

Login.propTypes = {
  user: PropTypes.object,
}
Login.defaultProps = {
}
export default Login
