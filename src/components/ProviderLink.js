import React, { PropTypes } from 'react'

// Basic suggestion button.
function ProviderLink({ type, label, onClick, link }) {
  let ButtonEl = false
  if (link) {
    ButtonEl = <a href={link}>{ label }</a>
  } else {
    ButtonEl = <button onClick={() => onClick(type)}>{ label }</button>
  }
  return (
    <li className={type}>
      { ButtonEl }
    </li>
  )
}

ProviderLink.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string,
}
ProviderLink.defaultProps = {}
export default ProviderLink
