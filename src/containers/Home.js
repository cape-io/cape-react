import React, { Component } from 'react'
import { Link } from 'redux-history-sync'
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <h2>Hello</h2>
        <Link to="/mixer/">Mixer</Link>
      </div>
    )
  }
}
