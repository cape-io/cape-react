import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadForm } from '../redux/actions'
import JoinLogin from '../components/JoinLogin'
import Loading from '../components/Loading'

// Move into a constants file or something.
const FORM_ID = 'cape/login'

// This is called from within the container component class.
function loadData(props) {
  // Load up information about the login form.
  props.loadForm(FORM_ID)
  // Also load information about the user/email?
}

class UserPage extends Component {
  componentWillMount() {
    loadData(this.props)
  }
  render() {
    const { form, ...rest } = this.props
    if (!form) {
      return <Loading message="Loading the login form..." />
    }
    return <JoinLogin form={form} {...rest} />
  }
}
UserPage.propTypes = {
  form: PropTypes.object,
}

// This is where we define computed fields (reselect module) or make other changes.
// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const {
    entities: { forms },
  } = state
  // Decide what headerMsg and leadMsg to have based on the route.
  // Is it better to have different templates or different data?
  return {
    // The details needed to build the form dynamically.
    // See object here: http://v5.api.cape.io/api/content/type/cape/login
    form: forms[FORM_ID],
  }
}

// Which action creators does it want to receive by props?
// This gets merged into props too.
// Not sure why it needs to happen here.
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch)
// }
const mapDispatchToProps = {
  loadForm,
}

// Do not merge in most ownProps.
// function mergeProps(stateProps, dispatchProps, { children }) {
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     children,
//   }
// }
export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
