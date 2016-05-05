import React, { PropTypes } from 'react'
import { Link } from 'redux-history-sync'

function Home({ authenticated, logout }) {
  return (
    <div className="home">
      <h2>CAPE</h2>
      <p>One place to manage all your profiles.</p>
      { authenticated &&
        <ul>
          <li><Link to="/mixer/">Mixer</Link></li>
          <li><Link to="/mixer/create/">Mixer Create</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      }
      { !authenticated && <Link to="/login/">Login</Link> }
    </div>
  )
}
Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
Home.defaultProps = {
}
export default Home
