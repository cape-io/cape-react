import { Component, createElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { createHistory } from 'redux-history-sync'
import { getState as getFieldState } from 'redux-field'

import select from '../redux/select'
import Login from '../components/Login/Login'
import { tokenSend } from '../redux/auth'

const FORM_ID = 'cape/login'
function getDescription(status, props = {}) {
  const options = {
    welcome: 'Enter your email to start the login or join process.',
    tokenSending: `Emailing a login link to ${props.tokenSending}.`,
    tokenSent: `Login link has been sent to ${props.tokenSent}. Please check your email.`,
    tokenValidating: 'Preparing to validate your login link. Hold tight.',
    valid: 'Select an option to authenticate with.',
  }
  return options[status]
}
function mapStateToProps(state, ownProps) {
  const prefix = [ FORM_ID, 'email' ]
  const { valid, value } = getFieldState(state, { prefix })
  // console.log(valid)
  const formInfo = select(state, 'form', { id: FORM_ID })
  let title = formInfo.title
  let status = 'welcome'
  const token = get(ownProps.route, 'params.token')
  const { authenticated, tokenSending, tokenSent } = state.auth
  if (authenticated) status = 'authenticated'
  else if (token) status = 'tokenValidating'
  else if (tokenSending) status = 'tokenSending'
  else if (tokenSent) status = 'tokenSent'
  else if (valid) {
    status = 'valid'
    title = valid.memberOf ? 'Login' : 'Join'
  }
  return {
    ...formInfo,
    ...valid,
    authenticated,
    email: value,
    description: getDescription(status, { tokenSending, tokenSent }),
    prefix,
    status,
    title,
  }


  // if (token && tokenValid === null) {
  //   return {
  //     description: 'Preparing to validate your login link. Hold tight.',
  //     title,
  //   }
  // }
  // const auth = pick(state.auth, 'tokenSending', 'tokenSent')
  // if (user.userId) {
  //   if (auth.tokenSending) {
  //     return {
  //       auth,
  //       description: ,
  //       title,
  //     }
  //   }
  //   if (auth.tokenSent) {
  //     return {
  //       description: ,
  //       title,
  //     }
  //   }
  //   return {
  //     auth,
  //     description: 'Select an option to authenticate with',
  //     title,
  //     user,
  //   }
  // }
  // return {
  //   email: user.email,
  //   ...select(state, 'form', { id: FORM_ID }),
  //   prefix,
  // }
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
