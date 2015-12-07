import React, { PropTypes } from 'react'

function Google({ login }) {
  const linkText = `Sign in using your ${login} Google Apps account.`
  return (
    <a href="/api/user/login/google">
      <img
        src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
        title={linkText}
        alt={linkText}
      />
    </a>
  )
}

Google.propTypes = {
  login: PropTypes.string.isRequired,
}
Google.defaultProps = {
}
export default Google
