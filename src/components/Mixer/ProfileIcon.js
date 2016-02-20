import React, { PropTypes } from 'react'

// Display a list of content types the user can edit.
function ProfileIcon({ message }) {
  return (
    <div className="container">
      { message }
    </div>
  )
}
ProfileIcon.propTypes = {
  message: PropTypes.string.isRequired,
}
ProfileIcon.defaultProps = {
  message: 'Edit your profile.',
}
export default ProfileIcon
