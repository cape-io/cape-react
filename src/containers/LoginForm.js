import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { updatePath } from 'redux-simple-router'

import Login from '../components/Login'
// import * as actions from '../../redux/modules/email'
import { createValidator } from '../utils/formValidation'

// Move into a constants file or something.
const FORM_ID = 'cape/login'

// This is where we define computed fields (reselect module) or make other changes.
// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state, ownProps) {
  const { login } = ownProps.params || ''
  const {
    entities: { forms, users, session },
  } = state
  const form = forms[FORM_ID]
  const user = users[login]
  return {
    // A unique name for this form.
    form: form.id,
    // All the fields in your form.
    fields: form.fields,
    // Details needed for the form html elements.
    formInfo: form,
    initialValues: {
      email: login,
    },
    login,
    session: session.me,
    user,
  }
}

// Which action creators does it want to receive by props?
// This gets merged into props too.
const mapDispatchToProps = {
  updatePath,
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  function handleSubmit({ email }) {
    dispatchProps.updatePath(`/user/${email}`)
  }
  // if (stateProps.session.isAuthenticated) {
  //   dispatchProps.updatePath('mixer')
  // }
  // More props that we need for reduxForm().
  const otherProps = {
    destroyOnUnmount: true,
    showFlags: true,
    onSubmit: handleSubmit,
    validate: createValidator(stateProps.formInfo),
  }
  return Object.assign(otherProps, ownProps, stateProps, dispatchProps)
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  reduxForm()
)(Login)
