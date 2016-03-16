import { connect } from 'react-redux'
// import forEach from 'lodash/forEach'
import Component from '../components/Mixer/Edit'
import { selectUid } from '../redux/auth'
import { entityUpdate, selectEntity } from '../redux/graph'
import { selectFields, selectNewField } from '../redux/select/mixer'

function mapStateToProps(state) {
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
