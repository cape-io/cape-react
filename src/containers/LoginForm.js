import { connect } from 'react-redux'
// import { connectField } from 'redux-field'
import select from '../redux/select'

import Login from '../components/Login/Login'

const FORM_ID = 'cape/login'

function mapStateToProps(state) {
  return {
    ...select(state, 'form', { id: FORM_ID }),
  }
}

export default connect(mapStateToProps)(Login)
