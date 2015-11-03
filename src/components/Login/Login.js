import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import Anonymous from './Anonymous';
import Authenticated from './Authenticated';
import LinkOrJoin from './LinkOrJoin';

export default class Login extends Component {
  static propTypes = {
    headerMsg: PropTypes.string.isRequired,
    join: PropTypes.func.isRequired,
    leadMsg: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    status: PropTypes.number.isRequired,
    user: PropTypes.object,
    provider: PropTypes.object,
  }

  handleSubmit(event) {
    event.preventDefault();
    const { login } = this.props;
    const input = this.refs.username;
    login(input.value);
    input.value = '';
  }

  render() {
    const { headerMsg, join, logout, leadMsg, status, provider, user } = this.props;
    const styles = require('./Login.scss');
    let Content = false;
    // No auth.
    if (!status) {
      Content = <Anonymous leadMsg={leadMsg} />;
    } else if (status === 1) {
      Content = <LinkOrJoin {...user} {...provider} join={join} />;
    } else if (status === 2) {
      Content = <Authenticated name={user.displayName} logout={logout} />;
    } else {
      Content = <p>Error</p>;
    }
    // No userId.

    // Auth.
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="Login"/>
        <h1>{ headerMsg }</h1>
        { Content }
      </div>
    );
  }
}
