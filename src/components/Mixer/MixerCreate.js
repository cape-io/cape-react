import React, { PropTypes } from 'react'
import CreateSelect from './CreateSelect'
import ProfileIcon from './ProfileIcon'
import EntitySelect from './EntitySelect'

// Display a list of content types the user can edit.
function Mixer({ create, entity, title }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      <EntitySelect entity={entity} />
      <CreateSelect {...create} />
      <ProfileIcon />
    </div>
  )
}
Mixer.propTypes = {
  create: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default Mixer
