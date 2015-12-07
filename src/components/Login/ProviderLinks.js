import React, { PropTypes } from 'react'

// import ProviderLink from './ProviderLink'
import LoginGoogle from './Google'

function ProviderLinks({ provider, title, login }) {
  return (
    <div className="login-links">
      <h3>{ title }</h3>
      <ul>
        { provider.google && <li><LoginGoogle login={login} /></li> }
      </ul>
    </div>
  )
}

ProviderLinks.propTypes = {
  login: PropTypes.string.isRequired,
  provider: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}
ProviderLinks.defaultProps = {
  title: 'Select an option to authenticate with',
}
export default ProviderLinks
