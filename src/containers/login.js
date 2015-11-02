import { connect } from 'react-redux';
import Component from '../components/Login/Login';
import * as authActions from 'redux/modules/auth';

function mapStateToProps({auth: {user, status}, db}) {
  const path = 'login-join';

  let headerMsg = db[path].headerMsg;
  if (status === 1) {
    headerMsg = 'Link or Create New Account';
  } else if (status === 2) {
    headerMsg = 'Logged In';
  }
  return {
    headerMsg,
    leadMsg: db[path].leadMsg,
    status,
    user,
  };
}

export default connect(mapStateToProps, authActions)(Component);
