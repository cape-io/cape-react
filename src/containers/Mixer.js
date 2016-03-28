import { connect } from 'react-redux'
import { createElement } from 'react'
import { onSubmit } from 'redux-field'
// import Inspector from 'react-json-inspector'

import Component from '../components/Mixer/Me'
import { isAuthenticated, selectUid } from '../redux/auth'
import { entityUpdate, selectEntity } from '../redux/graph'
import { selectFieldPrefix, selectFields, selectNewField } from '../redux/select/mixer'
import { entitySchema } from '../redux/schema'
import Loading from '../components/Loading'

const personSchemaSelector = entitySchema('Person')

function mapStateToProps(state) {
  return {
    authenticated: isAuthenticated(state),
    entity: selectFields(state),
    selectField: selectNewField(selectUid)(state),
    schema: personSchemaSelector(state),
    subject: selectEntity(selectUid)(state),
  }
}

function createNewField(subjectId, type) {
  return onSubmit(selectFieldPrefix(subjectId), type)
}
const mapDispatchToProps = {
  createNewField,
  entityUpdate,
}

function SelectComponent(props) {
  const { authenticated, schema } = props
  if (!authenticated) return createElement(Loading, { message: 'Not authenticated.' })
  if (!schema) return createElement(Loading, { message: 'No schema.' })
  // return createElement(Inspector, { data: props })
  return createElement(Component, props)
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent)
