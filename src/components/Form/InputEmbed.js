import React, { PropTypes } from 'react'

// Print RadioOption for each options.
function InputEmbed({ fieldId, ...rest }) {
  return (
    <div>
      <input className="form-control" {...rest} id={fieldId} type="url" />
    </div>
  )
}
InputEmbed.propTypes = {
}

export default InputEmbed
