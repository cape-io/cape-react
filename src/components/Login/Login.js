import React, { Component, PropTypes } from 'react'
import Anonymous from './Anonymous'
import Authenticated from './Authenticated'
import LinkOrJoin from './LinkOrJoin'

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

  render() {
    const { user, googleApps, hasErrors, errorMsg } = this.props.user
    const styles = {}
    let Content = false
    return <p>Hello</p>
    // Has user ID.
    if (!status) {
      Content = <Anonymous leadMsg={leadMsg} />
    } else if (status === 1) {
      Content = <LinkOrJoin {...user} {...provider} join={join} />
    } else if (status === 2) {
      Content = <Authenticated name={user.displayName} logout={logout} />
    } else {
      Content = <p>Error</p>
    }
    // No userId.

    // Auth.
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>{ headerMsg }</h1>
        { Content }
      </div>
    )
  }
}
