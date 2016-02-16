import { connect } from 'react-redux'
import Component from '../components/Login/Login'

function mapStateToProps(state) {
  const { login } = state.router.params
  const {
    entity: { users },
  } = state

  const user = users[login]

  return {
    user,
  }
}

export default connect(mapStateToProps)(Component)
