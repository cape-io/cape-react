import { connect } from 'react-redux';
import Component from '../components/App/App';
import { logout } from '../redux/modules/auth';
import { pushState } from 'redux-router';

// Filter out menu items based on authentication.
function checkAuthenticated(user) {
  return (item) => {
    const {authenticated} = item;
    if (authenticated === false && user) return false;
    if (authenticated === true && !user) return false;
    return true;
  };
}

function mapStateToProps({auth: {user}, db: {navLinks, support}}) {
  return {
    // The client only cares if the user is authenticated or not. Right?
    navLinks: navLinks.filter(checkAuthenticated(user)),
    support,
    user,
  };
}

const mapDispatchToProps = {
  logout,
  pushState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
