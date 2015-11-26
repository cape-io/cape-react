import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class List extends Component {

  static propTypes = {
    routes: PropTypes.array,
  }

  render() {
    const pages = this.props.routes[0].childRoutes
    return (
      <div>
        <h1>Route Index</h1>
        <ul>
          { pages.map( route => ( route.path &&
            <li key={route.path}>
              <Link to={'/' + route.path}>{route.path}</Link>
            </li>
          )) }
        </ul>
      </div>
    )
  }
}
