import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

export default class About extends Component {

  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <DocumentMeta title="CAPE: About Us"/>

        <p>Some text from something about us.</p>

      </div>
    );
  }
}
