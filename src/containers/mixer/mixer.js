import { connect } from 'react-redux'
import Component from '../../components/Mixer/Mixer'
import { loadForm } from '../../redux/actions'

// Redux connections.
function mapStateToProps({ entities }) {
  const { session } = entities
  const contentTypes = session.me.user.contentTypes
  return {
    contentTypes,
  }
}

const mapDispatchToProps = {
  loadForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
