import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { InfoBar } from 'components';

const title = 'React Redux Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@CAPE_io',
      'twitter:creator': '@kaicurry',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200',
    },
  },
};

const NavbarLink = ({to, className, component, children}) => {
  const Comp = component || Link;

  return (
    <Comp to={to} className={className} activeStyle={{
      color: '#33e0ff',
    }}>
      {children}
    </Comp>
  );
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    navLinks: PropTypes.array.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    support: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    // This feels like a hack. I want to trigger the redirect within Redux action.
    // Perhaps it should happen in the login component?
    if (!this.props.user && nextProps.user) {
      // Redirect after login.
      this.props.pushState(null, '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  // Is that really the best way to decide what menu items to display?
  render() {
    const { user, navLinks, support } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <NavbarLink to="/" className="navbar-brand" component={IndexLink}>
              <div className={styles.brand}/>
              React Redux Example
            </NavbarLink>

            <ul className="nav navbar-nav">
              {
                navLinks.map( ({id, to, className, text}) => (
                  <li key={id} className={className}>
                    <NavbarLink to={to}>{text}</NavbarLink>
                  </li>
                ))
              }
            </ul>
            {user &&
            <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://github.com/erikras/react-redux-universal-hot-example"
                   target="_blank" title="View on Github"><i className="fa fa-github"/></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          {'Have questions? Ask for help in the '}
          <a href={support.chat} target="_blank">
            {'CAPE Support HipChat Room'}
          </a>
          {' or file bugs via '}
          <a href={support.bugs} target="_blank">
            {'Github Issues'}
          </a>.
        </div>
      </div>
    );
  }
}
