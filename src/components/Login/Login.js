import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'
import Wrapper from '../Editable/Wrapper'
const Field = connectField()(Wrapper)

import ProviderLinks from './ProviderLinks'

function Login(props) {
  const { description, field, status, title, ...rest } = props
  return (
    <div>
      { title && <h2>{ title }</h2> }
      { description && <p className="lead">{ description }</p> }
      { !status.startsWith('token') &&
        <Field
          {...rest}
          open
          validate={field.email.validate}
        />
      }
      { props.gravatar &&
        <img className="col-md-2" src={props.gravatar} alt="user image" style={{ width: 100 }} />
      }
      { status === 'valid' &&
        <ProviderLinks {...rest} />
      }
    </div>
  )
}

Login.propTypes = {
  description: PropTypes.string,
  emailToken: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  gravatar: PropTypes.string,
  prefix: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string,
  userId: PropTypes.string,
}
Login.defaultProps = {
}
export default Login
