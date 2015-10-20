import { connect } from 'react-redux';
import Component from '../components/Login/Login';
import * as authActions from 'redux/modules/auth';

function mapStateToProps({auth: {user}, db}) {
  const path = 'login-join';
  return {
    user,
    headerMsg: db[path].headerMsg,
    leadMsg: db[path].leadMsg,
  };
}

export default connect(mapStateToProps, authActions)(Component);
