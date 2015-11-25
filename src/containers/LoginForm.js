import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { pushState } from 'redux-router'

import FieldGroup from '../components/Form/Form'
// import * as actions from '../../redux/modules/email'
import { createValidator } from '../utils/formValidation'

// Move into a constants file or something.
const FORM_ID = 'cape/login'

// This is where we define computed fields (reselect module) or make other changes.
// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const {
    entities: { forms },
  } = state
  const form = forms[FORM_ID]
  return {
    // A unique name for this form.
    form: form.id,
    // All the fields in your form.
    fields: form.fields,
    // Details needed for the form html elements.
    formInfo: form,
  }
}

// Which action creators does it want to receive by props?
// This gets merged into props too.
const mapDispatchToProps = {
  pushState,
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  function handleSubmit({ email }) {
    dispatchProps.pushState(null, `/user/${email}`)
  }
  const otherProps = {
    onSubmit: handleSubmit,
    validate: createValidator(stateProps.formInfo),
  }
  return Object.assign(otherProps, ownProps, stateProps, dispatchProps)
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  reduxForm()
)(FieldGroup)
