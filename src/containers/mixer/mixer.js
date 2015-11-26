import { connect } from 'react-redux'
import Component from '../../components/Mixer/Mixer'

// Redux connections.
function contentTypeInfo({ groupId, typeId, title }) {
  return { groupId, typeId, title }
}

function mapStateToProps({ entities }) {
  return {
    contentTypes: [],
  }
}

export default connect(mapStateToProps)(Component)
