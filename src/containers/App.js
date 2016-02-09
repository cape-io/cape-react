import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadSchema, loadSession, resetErrorMessage } from '../redux/actions'
import { isLoaded } from '../redux/modules/auth'
import Router from './Router'
import Footer from './Footer'
import Loading from '../components/Loading'

// This is called from within the container component class.
function loadData(props) {
  // Load info about the user session.
  props.loadSession()
  props.loadSchema()
}

class App extends Component {
  constructor(props) {
    super(props)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }
  componentWillMount() {
    loadData(this.props)
  }

  handleDismissClick(err) {
    this.props.resetErrorMessage()
    err.preventDefault()
  }
  // @TODO make this its own component!
  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <div className="alert alert-danger" role="alert">
        <b>{errorMessage}</b>
        {' '}
        <a href="#" onClick={this.handleDismissClick}>Dismiss</a>
      </div>
    )
  }

  render() {
    const { children, loaded, props } = this.props
    return (
      <div className="container">
        { this.renderErrorMessage() }
        {
          loaded ? <Router {...props} /> : <Loading message="Loading your session info..." />
        }
        { children }
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  loaded: PropTypes.bool.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  pushPath: PropTypes.func.isRequired,
  props: PropTypes.object,
  // Injected by React Router
  children: PropTypes.node,
}

function mapStateToProps(state) {
  const {
    errorMessage,
  } = state
  return {
    errorMessage,
    loaded: isLoaded(state),
  }
}

export default connect(mapStateToProps, {
  loadSchema,
  loadSession,
  resetErrorMessage,
})(App)
