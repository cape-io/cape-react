import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadForm, loadSession, loadUser } from '../redux/actions'
import JoinLogin from '../components/JoinLogin'
import Loading from '../components/Loading'

// Move into a constants file or something.
const FORM_ID = 'cape/login'

// This is called from within the container component class.
function loadData(props) {
  const { login } = props
  // Load up information about the login form.
  props.loadForm(FORM_ID)
  // Load info about the user session.
  props.loadSession()
  // Also load information about the user/email.
  if (login) {
    // Load information about the login value.
    props.loadUser(login)
  }
}

class UserPage extends Component {
  componentWillMount() {
    loadData(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }
  render() {
    const { form, login, user, ...rest } = this.props
    if (!form) {
      return <Loading message="Loading the login form..." />
    }
    if (login && !user) {
      return <Loading message={`Loading information for ${login}...`} />
    }
    return <JoinLogin form={form} {...rest} />
  }
}
UserPage.propTypes = {
  form: PropTypes.object,
  user: PropTypes.object,
  loadForm: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  login: PropTypes.string,
}

// This is where we define computed fields (reselect module) or make other changes.
// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  const { login } = ownProps.params
  const {
    entities: { forms, users },
  } = state
  // Decide what headerMsg and leadMsg to have based on the route.
  // Is it better to have different templates or different data?
  return {
    // The details needed to build the form dynamically.
    // See object here: http://v5.api.cape.io/api/content/type/cape/login
    form: forms[FORM_ID],
    login,
    user: users[login],
  }
}

// Which action creators does it want to receive by props?
// This gets merged into props too.
const mapDispatchToProps = {
  loadForm,
  loadSession,
  loadUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
