import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Login extends Component {
  static propTypes = {
    headerMsg: PropTypes.string.isRequired,
    leadMsg: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  handleSubmit(event) {
    event.preventDefault();
    const { login } = this.props;
    const input = this.refs.username;
    login(input.value);
    input.value = '';
  }

  render() {
    const { headerMsg, user, logout, leadMsg } = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="React Redux Example: Login"/>
        <h1>{ headerMsg }</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input type="text" ref="username" placeholder="you@example.com"/>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>{ leadMsg }</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
