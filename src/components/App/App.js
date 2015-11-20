import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import NavbarLink from './NavbarLink';

function makeMeta({title, description, image}) {
  return {
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
}

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    navLinks: PropTypes.array.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    support: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    // This feels like a hack. I want to trigger the redirect within Redux action.
    // Perhaps it should happen in the login component?
    if (!this.props.user && nextProps.user) {
      const redirectLocation = nextProps.location.query.destination;
      // Redirect after login.
      if (redirectLocation) {
        this.props.pushState(null, redirectLocation);
      } else {
        this.props.pushState(null, '/mixer');
      }
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  // Is that really the best way to decide what menu items to display?
  render() {
    const { user, navLinks, support, title, description, image } = this.props;
    const headMeta = makeMeta({title, description, image});
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta { ...headMeta } />

        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <NavbarLink to="/" className="navbar-brand" component={IndexLink}>
              <div className={styles.brand}/>
              { title }
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
            <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.displayName}</strong>.</p>}
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://github.com/cape-io/cape-editor"
                   target="_blank" title="View on Github"><i className="fa fa-github"/></a>
              </li>
            </ul>
          </div>
        </nav>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

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
