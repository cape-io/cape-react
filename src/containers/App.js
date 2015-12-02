import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updatePath } from 'redux-simple-router'
import { loadSession, resetErrorMessage } from '../redux/actions'
import Footer from './Footer'

// This is called from within the container component class.
function loadData(props) {
  // Load info about the user session.
  props.loadSession()
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

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <div className="alert alert-danger" role="alert">
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </div>
    )
  }

  render() {
    const { children } = this.props
    return (
      <div className="container">
        { this.renderErrorMessage() }
        { children }
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
  }
}

export default connect(mapStateToProps, {
  loadSession,
  resetErrorMessage,
  updatePath,
})(App)
