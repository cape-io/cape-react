import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

function Mixer({contentTypes}) {
  return (
    <div className="container">
      <h1>Mixer</h1>
      <DocumentMeta title="CAPE: Mixer"/>
      <ul>
      {
        contentTypes.map( ({id, title}) => (
          <li key={id}><Link to={`/mixer/${id}`}>{ title }</Link></li>
        ))
      }
      </ul>
    </div>
  );
}
Mixer.propTypes = {
  contentTypes: PropTypes.object.isRequired,
};

export default Mixer;
