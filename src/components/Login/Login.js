import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'
import Wrapper from '../Editable/Wrapper'
const Field = connectField()(Wrapper)

// import ProviderLinks from './ProviderLinks'

function Login({ description, field, id, title }) {
  return (
    <div>
      { title && <h2>{ title }</h2> }
      { description && <p className="lead">{ description }</p> }
      <Field field={field.email} formId={id} open />
    </div>
  )
}

Login.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}
Login.defaultProps = {
}
export default Login
