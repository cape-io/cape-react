import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'
import Wrapper from '../Editable/Wrapper'
const Field = connectField()(Wrapper)

import ProviderLinks from './ProviderLinks'

function Login({ auth, email, emailToken, description, prefix, field, title, user }) {
  return (
    <div>
      { title && <h2>{ title }</h2> }
      { description && <p className="lead">{ description }</p> }
      { !auth && field &&
        <Field
          field={field.email}
          initialValue={email}
          open
          placeholder="you@example.com"
          prefix={prefix}
          validate={field.email.validate}
        />
      }
      { auth && !auth.tokenSending &&
        <ProviderLinks emailToken={emailToken} {...user} />
      }
    </div>
  )
}

Login.propTypes = {
  description: PropTypes.string,
  field: PropTypes.object.isRequired,
  title: PropTypes.string,
  userId: PropTypes.string,
}
Login.defaultProps = {
}
export default Login
