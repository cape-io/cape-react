import React, { PropTypes, Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { updatePath } from 'redux-simple-router'
import { createValidator } from '../../utils/formValidation'
import { loadContent, loadForm, saveContent } from '../../redux/actions'
import Loading from '../../components/Loading'
import Form from '../../components/Form/Form'

// import { updateMe, load as loadFormValues, formInfo } from '../../redux/modules/mixer'

// Redux connections.

function mapStateToProps(state, { params }) {
  const {
    entities: { forms },
  } = state
  const { groupId, typeId, entityId } = params
  const contentType = `${groupId}/${typeId}`
  const defaultForm = {
    fields: [],
    id: contentType,
    loading: true,
  }
  const form = forms[contentType] || defaultForm
  form.entityId = entityId
  // Grab the values for the form.
  const entities = state.entities[contentType] || {}
  const initialValues = entities[entityId] || { loading: true }
  // console.log(id)
  // state.db.contentTypes.find()
  return {
    entity: params,
    fields: form.fields,
    form: form.id,
    formInfo: form,
    initialValues,
  }
}
// Which action creators does it want to receive by props?
// This gets merged into props too.
const mapDispatchToProps = {
  loadContent,
  loadForm,
  saveContent,
  updatePath,
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  function handleSubmit(data) {
    // id is the content type id.
    const { id, entityId } = stateProps.formInfo
    console.log(id, entityId, data)
    dispatchProps.saveContent({ id, entityId, body: data })
  }
  // if (stateProps.session.isAuthenticated) {
  //   dispatchProps.updatePath('mixer')
  // }
  // More props that we need for reduxForm().
  const otherProps = {
    destroyOnUnmount: false,
    onSubmit: handleSubmit,
    validate: createValidator(stateProps.formInfo),
  }
  return Object.assign(otherProps, ownProps, stateProps, dispatchProps)
}


function loadData(props) {
  const { formInfo } = props
  // Load up information about the login form.
  props.loadForm(formInfo.id)
  props.loadContent(formInfo)
}

class MixerForm extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    formInfo: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formInfo.id !== this.props.formInfo.id) {
      loadData(nextProps)
    }
  }

  render() {
    const { formInfo, values } = this.props
    if (formInfo.loading) {
      const msgTxt = `Loading the ${formInfo.id} form...`
      return <Loading message={msgTxt} />
    }
    if (values.loading) {
      const msgTxt = `Loading previously saved ${formInfo.id} data...`
      return <Loading message={msgTxt} />
    }
    // There should be a wrapper component and then the FormEl should be the child.
    return (
      <Form {...this.props} />
    )
  }
}

// Component.props =
export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  reduxForm()
)(MixerForm)
