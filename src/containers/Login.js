import { connect } from 'react-redux'
import get from 'lodash/get'
import select from '../redux/select'
import pick from 'lodash/pick'
import Login from '../components/Login/Login'
import { tokenSend } from '../redux/auth'

const FORM_ID = 'cape/login'

function mapStateToProps(state, ownProps) {
  const title = 'Login'
  const { email, tokenValid } = state.auth
  const token = get(ownProps.route, 'params.token')
  if (token && tokenValid === null) {
    return {
      description: 'Preparing to validate your login link. Hold tight.',
      title,
    }
  }
  const auth = pick(state.auth, 'email', 'provider', 'tokenSending', 'tokenSent', 'userId')
  if (auth.userId) {
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
    }
  }
  return {
    email,
    ...select(state, 'form', { id: FORM_ID }),
  }
}
const mapDispatchToProps = {
  emailToken: tokenSend,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
