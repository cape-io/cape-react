import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updatePath } from 'redux-simple-router'

import { loadForm, loadUser } from '../redux/actions'
import { isAuthenticated } from '../redux/modules/auth'
import Page from '../components/Page'
import Loading from '../components/Loading'

// Move into a constants file or something.
const FORM_ID = 'cape/login'

// This is called from within the container component class.
function loadData(props) {
  const { login } = props
  // Load up information about the login form.
  props.loadForm(FORM_ID)
  // Also load information about the user/email.
  if (login) {
    // Load information about the login value.
    props.loadUser(login)
  }
}

class UserPage extends Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      if (this.props.location.query && this.props.location.query.destination) {
        return this.props.updatePath(this.props.location.query.destination)
      }
      this.props.updatePath('/mixer')
    }
  }
  componentDidMount() {
    // Redirect takes too fucking long in componentWillMount?!?
    // Only need to load things if we are anonymous.
    if (!this.props.isAuthenticated) {
      console.log('User loadData')
      loadData(this.props)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }
  render() {
    const { form, login, user, children, ...rest } = this.props
    if (!form) {
      return <Loading message="Loading the login form..." />
    }
    if (login && !user) {
      return <Loading message={`Loading information for ${login}...`} />
    }
    const title = 'User'
    return <Page children={children} title={title} />
  }
}
UserPage.propTypes = {
  children: PropTypes.node,
  form: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  loadForm: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  location: PropTypes.object,
  login: PropTypes.string,
  updatePath: PropTypes.func.isRequired,
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
    // @TODO Use redux/modules/auth for this
    isAuthenticated: isAuthenticated(state),
  }
}

// Which action creators does it want to receive by props?
// This gets merged into props too.
const mapDispatchToProps = {
  loadForm,
  loadUser,
  updatePath,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
