import React, { PropTypes } from 'react'

// import ProviderLinks from './ProviderLinks'

function Login({ description, title }) {
  return (
    <div>
      { title && <h2>{ title }</h2> }
      { description && <p className="lead">{ description }</p> }
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
