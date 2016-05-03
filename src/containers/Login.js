import { Component, createElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { createHistory } from 'redux-history-sync'
import { getState as getFieldState } from 'redux-field'

import Login from '../components/Login/Login'
import { tokenSend } from '../redux/auth'

const FORM_ID = 'cape/login'
function getDescription(status, props = {}) {
  const options = {
    welcome: 'Enter your email to start the login or join process.',
    tokenSending: `Emailing a login link to ${props.tokenSending}.`,
    tokenSent: `${props.tokenSent.message} Please check your email.`,
    tokenValidating: 'Preparing to validate your login link. Hold tight.',
    valid: 'Select an option to authenticate with.',
  }
  return options[status]
}
function mapStateToProps(state, ownProps) {
  const prefix = [ FORM_ID, 'email' ]
  const { saving, validValue, value } = getFieldState(state, { prefix })
  // console.log(valid)
  const formInfo = {
    description: 'Enter your email to start the login process.',
    field: {
      email: {
        type: 'email',
        label: 'Email',
        required: true,
      },
    },
    submit: {
      icon: 'log-in',
      text: 'Log In',
      showReset: false,
      showSubmit: false,
    },
  }
  let title = 'Login or Join'
  let status = 'welcome'
  const token = get(ownProps.route, 'params.token')
  const { authenticated, tokenSending, tokenSent } = state.auth
  if (authenticated) status = 'authenticated'
  else if (token) status = 'tokenValidating'
  else if (tokenSending) status = 'tokenSending'
  else if (tokenSent) status = 'tokenSent'
  else if (saving && validValue) {
    status = 'valid'
    title = validValue.memberOf ? 'Login' : 'Join'
  }
  return {
    ...formInfo,
    ...validValue,
    authenticated,
    email: value,
    description: getDescription(status, { tokenSending, tokenSent }),
    id: 'login-email',
    label: 'Email',
    prefix,
    required: true,
    status,
    type: 'email',
    title,
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
