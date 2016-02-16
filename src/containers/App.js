import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import getRouteInfo from '../redux/routes'

import Router from './Router'
import Footer from './Footer'

class App extends Component {
  render() {
    const { route } = this.props
    return (
      <div className="container">
        <Router {...route} />
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    route: getRouteInfo(state),
  }
}

export default connect(mapStateToProps)(App)
