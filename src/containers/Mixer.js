import { connect } from 'react-redux'
import { createElement } from 'react'
import { onSubmit } from 'redux-field'

import Component from '../components/Mixer/Person'
import { isAuthenticated, selectUid } from '../redux/auth'
import { entityPut, selectEntity, triplePut } from 'redux-graph'
import {
  createObjectPrefix, createSubjectPrefix, selectMyFields, selectMySubjects, selectNewField,
} from '../redux/select/mixer'
import { selectSchema } from '../redux/schema'
import Loading from '../components/Loading'

function mapStateToProps(state) {
  return {
    authenticated: isAuthenticated(state),
    entity: selectMyFields(state),
    selectField: selectNewField(selectUid)(state),
    subjects: selectMySubjects(selectUid)(state),
    schema: {
      Person: selectSchema('Person', state, 'domainIncludes'),
      PostalAddress: selectSchema('PostalAddress', state, 'domainIncludes'),
      WebSite: selectSchema('WebSite', state),
    },
    subject: selectEntity(selectUid)(state),
  }
}
// Create a new triple. Predicate is used as default type on backend.
function createNewField(subjectId, predicate, type) {
  console.log(subjectId, predicate, type)
  return onSubmit(createObjectPrefix(subjectId), { type, predicate })
}
function createNewSubject(objectId, predicate, type) {
  return onSubmit(createSubjectPrefix(objectId), { type, predicate })
}
const mapDispatchToProps = {
  createNewField,
  createNewSubject,
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
