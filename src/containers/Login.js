import { connect } from 'react-redux'
// import get from 'lodash/get'
import select from '../redux/select'
import pick from 'lodash/pick'
import Login from '../components/Login/Login'
import { emailToken } from '../redux/modules/auth'

const FORM_ID = 'cape/login'

function mapStateToProps(state) {
  const auth = pick(state.auth, 'emailingToken', 'email', 'provider', 'userId', 'emailedToken')
  if (auth.userId) {
    const title = 'Login'
    if (auth.emailingToken) {
      return {
        auth,
        description: `Emailing a login link to ${auth.emailingToken}.`,
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
    ...select(state, 'form', { id: FORM_ID }),
  }
}
const mapDispatchToProps = {
  emailToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
