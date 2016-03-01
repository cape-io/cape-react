import { Component, createElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { createHistory } from 'redux-history-sync'

import select from '../redux/select'
import Login from '../components/Login/Login'
import { tokenSend } from '../redux/auth'

const FORM_ID = 'cape/login'

function mapStateToProps(state, ownProps) {
  const title = 'Login'
  const { authenticated, user, tokenValid } = state.auth
  if (authenticated) {
    return { authenticated }
  }
  const token = get(ownProps.route, 'params.token')
  if (token && tokenValid === null) {
    return {
      description: 'Preparing to validate your login link. Hold tight.',
      title,
    }
  }
  const auth = pick(state.auth, 'tokenSending', 'tokenSent')
  if (user.userId) {
    if (auth.tokenSending) {
      return {
        auth,
        description: `Emailing a login link to ${auth.tokenSending}.`,
        title,
      }
    }
    if (auth.tokenSent) {
      return {
        description: `Login link has been sent to ${auth.tokenSent}.`,
        title,
      }
    }
    return {
      auth,
      description: 'Select an option to authenticate with',
      title,
      user,
    }
  }
  return {
    email: user.email,
    ...select(state, 'form', { id: FORM_ID }),
    prefix: [ FORM_ID, 'email' ],
  }
}
const mapDispatchToProps = {
  createHistory,
  emailToken: tokenSend,
}
class LoginWrapper extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.createHistory({ pathname: '/mixer/' })
    }
  }
  componentWillReceiveProps(nextProps) {
    const { authenticated } = nextProps
    if (authenticated) {
      nextProps.createHistory({ pathname: '/mixer/' })
    }
  }
  render() {
    return createElement(Login, this.props)
  }
}
LoginWrapper.propTypes = {
  authenticated: PropTypes.bool,
  createHistory: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginWrapper)
