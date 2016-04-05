import React, { PropTypes } from 'react'
import { Link } from 'redux-history-sync'

function Home({ authenticated }) {
  return (
    <div className="home">
      <h2>CAPE</h2>
      <p>One place to manage all your profiles.</p>
      { authenticated && <Link to="/mixer/">Mixer</Link> }
      { !authenticated && <Link to="/login/">Login</Link> }
    </div>
  )
}
Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}
Home.defaultProps = {
}
export default Home
