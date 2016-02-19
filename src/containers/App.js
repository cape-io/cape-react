import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectActiveKeyDefault } from 'redux-history-sync'

import Router from './Router'
import Footer from './Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: {},
    }
  }
  componentWillMount() {
    const { history, router: { match } } = this.props
    const route = match(history)
    console.log('INIT ROUTE', route)
    this.setState(route)
  }
  componentWillReceiveProps(nextProps) {
    const { history, router: { match } } = nextProps
    // Compare state history with props history. Return new route if no match.
    const route = match(history)
    console.log('NEW ROUTE.', route)
    this.setState(route)
  }
  render() {
    const { route } = this.state
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
  router: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    history: selectActiveKeyDefault(state),
  }
}
export default connect(mapStateToProps)(App)
