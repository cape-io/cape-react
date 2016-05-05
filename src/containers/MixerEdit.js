import { connect } from 'react-redux'
import { entityPut, triplePut } from 'redux-graph'

// import Component from '../components/Loading'
import Component from '../components/Mixer/Edit'
import { selectTriples } from '../redux/select/mixer'
import { createNewField, createNewSubject } from '../redux/mixer'

function mapStateToProps(state, ownProps) {
  return selectTriples(state, ownProps)
}
const mapDispatchToProps = {
  createNewField,
  createNewSubject,
  entityPut,
  triplePut,
}
export default connect(mapStateToProps, mapDispatchToProps)(Component)
