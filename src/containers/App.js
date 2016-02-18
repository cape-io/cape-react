import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Router from './Router'
import Footer from './Footer'

class App extends Component {
  render() {
    const { route } = this.props
    return (
      <div className="container">
        <Router route={route} />
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}

function mapStateToProps(state, { router: { match } }) {
  const route = match()
  // console.log(route)
  return {
    ...route,
  }
}

export default connect(mapStateToProps)(App)
