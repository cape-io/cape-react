import React, { PropTypes } from 'react'

// import ProviderLink from './ProviderLink'
import LoginGoogle from './Google'

function ProviderLinks({ email, emailToken, emailTokenTxt, provider }) {
  // @TODO Allow an array of emails to be used.
  function handleEmailClick() {
    console.log(email)
    emailToken(email)
  }
  return (
    <div className="login-links">
      <ul>
        { provider.email &&
          <li>
            {emailTokenTxt}
            <button onClick={handleEmailClick}>{email}</button>
          </li>
        }
        { provider.google && <li><LoginGoogle login={email} /></li> }
      </ul>
    </div>
  )
}

ProviderLinks.propTypes = {
  email: PropTypes.string.isRequired,
  emailToken: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
}
ProviderLinks.defaultProps = {
  emailTokenTxt: 'Send a login link to',
}
export default ProviderLinks
