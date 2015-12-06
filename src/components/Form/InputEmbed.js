import React, { PropTypes } from 'react'

// Print RadioOption for each options.
function InputEmbed({ fieldId, loadEmbed, ...rest }) {
  const { value, valid } = rest
  // Fetch embed info when valid value is found.
  if (valid && value) {
    loadEmbed(value)
  }
  return (
    <div>
      <input className="form-control" {...rest} id={fieldId} type="url" />
    </div>
  )
}
InputEmbed.propTypes = {
  loadEmbed: PropTypes.func.isRequired,
}

export default InputEmbed
