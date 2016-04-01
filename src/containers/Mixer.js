import { connect } from 'react-redux'
import { createElement } from 'react'
import { onSubmit } from 'redux-field'
// import Inspector from 'react-json-inspector'

import Component from '../components/Mixer/Person'
import { isAuthenticated, selectUid } from '../redux/auth'
import { entityPut, selectEntity, triplePut } from '../redux/graph'
import { selectFieldPrefix, selectFields, selectNewField } from '../redux/select/mixer'
import { entitySchema } from '../redux/schema'
import Loading from '../components/Loading'

const personSchemaSelector = entitySchema('Person')
const postalAddressSchema = entitySchema('PostalAddress')

function mapStateToProps(state) {
  return {
    authenticated: isAuthenticated(state),
    entity: selectFields(state),
    selectField: selectNewField(selectUid)(state),
    schema: {
      Person: personSchemaSelector(state),
      PostalAddress: postalAddressSchema(state),
    },
    subject: selectEntity(selectUid)(state),
  }
}
// Create a new triple. Predicate is used as default type on backend.
function createNewField(subjectId, predicate, type) {
  return onSubmit(selectFieldPrefix(subjectId), { type, predicate })
}
const mapDispatchToProps = {
  createNewField,
  entityPut,
  triplePut,
}

function SelectComponent(props) {
  const { authenticated, schema } = props
  if (!authenticated) return createElement(Loading, { message: 'Not authenticated.' })
  if (!schema.Person || !schema.PostalAddress) {
    return createElement(Loading, { message: 'No schema.' })
  }
  // return createElement(Inspector, { data: props })
  return createElement(Component, props)
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent)
