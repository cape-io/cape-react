import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// Display a list of content types the user can edit.
function Mixer({ contentTypes }) {
  return (
    <div className="container">
      <h1>Mixer</h1>
      <ul>
      {
        contentTypes.map( ({ groupId, typeId, entityId, title }) => (
          <li key={groupId + '-' + typeId}>
            <Link
              to={`/mixer/${groupId}/${typeId}${entityId ? '/' + entityId : ''}`}>
              { title }
            </Link>
            {' - '}
            <Link
              to={`/mixer/sort/${groupId}/${typeId}${entityId ? '/' + entityId : ''}`}>
              { 'Sort' + title }
            </Link>
          </li>
        ))
      }
      </ul>
    </div>
  )
}
Mixer.propTypes = {
  contentTypes: PropTypes.array.isRequired,
}

export default Mixer
