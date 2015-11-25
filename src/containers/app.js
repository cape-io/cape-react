import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { resetErrorMessage } from '../redux/actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleDismissClick = this.handleDismissClick.bind(this)
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
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children } = this.props
    return (
      <div className="container">
        { this.renderErrorMessage() }
        { children }
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  pushState,
})(App)
