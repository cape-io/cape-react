import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

// Display a list of content types the user can edit.
function Mixer({contentTypes}) {
  return (
    <div className="container">
      <h1>Mixer</h1>
      <DocumentMeta title="CAPE: Mixer"/>
      <ul>
      {
        contentTypes.map( ({ groupId, typeId, title }) => (
          <li key={groupId + '-' + typeId}>
            <Link to={`/mixer/${groupId}/${typeId}`}>{ title }</Link>
          </li>
        ))
      }
      </ul>
    </div>
  );
}
Mixer.propTypes = {
  contentTypes: PropTypes.array.isRequired,
};

export default Mixer;
