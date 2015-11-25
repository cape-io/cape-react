import React, { PropTypes } from 'react'

import ProviderLink from './ProviderLink'

// Basic suggestion button.
function ProviderLinks({ providers, headerMsg }) {
  return (
    <div className="login-links">
      <h3>{ headerMsg }</h3>
      <ul>
        { providers.map(provider => <ProviderLink {...provider} />) }
      </ul>
    </div>
  )
}

ProviderLinks.propTypes = {
  providers: PropTypes.array.isRequired,
  headerMsg: PropTypes.string.isRequired,
}
ProviderLinks.defaultProps = {
  headerMsg: 'Select an option to authenticate with',
}
export default ProviderLinks
