import { connect } from 'react-redux'
import Component from '../../components/Mixer/Mixer'
import { loadForm } from '../../redux/actions'

// Redux connections.
function mapStateToProps({ entities }) {
  const { session } = entities
  const { contentType, contentTypes } = session.me.user
  const types = contentTypes.map( id => contentType[id] )
  return {
    contentTypes: types.filter( info => info.entityId ),
  }
}

const mapDispatchToProps = {
  loadForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
