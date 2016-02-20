import React, { PropTypes } from 'react'
import ProfileIcon from './ProfileIcon'

// Display a list of content types the user can edit.
function Mixer({ }) {
  return (
    <div className="container">
      <h1>Mixer</h1>
      <ProfileIcon />
    </div>
  )
}
Mixer.propTypes = {
}

export default Mixer
