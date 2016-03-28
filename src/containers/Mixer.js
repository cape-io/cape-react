import { connect } from 'react-redux'
// import forEach from 'lodash/forEach'
import Component from '../components/Mixer/Me'
import { selectUid } from '../redux/auth'
import { entityUpdate, selectEntity } from '../redux/graph'
import { selectFields, selectNewField } from '../redux/select/mixer'
import { entitySchema } from '../redux/schema'

const personSchemaSelector = entitySchema('Person')

function mapStateToProps(state) {
  console.log(personSchemaSelector(state))
  return {
    selectField: selectNewField(selectUid)(state),
    objects: selectFields(state),
    subject: selectEntity(selectUid)(state),
  }
}
const mapDispatchToProps = {
  entityUpdate,
}
export default connect(mapStateToProps, mapDispatchToProps)(Component)
