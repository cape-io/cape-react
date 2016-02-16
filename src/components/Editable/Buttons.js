import React, { Component, PropTypes } from 'react'
import Icon from './Icon'

class EditableButtons extends Component {

  render() {
    const {onSubmit, onClose, disabled} = this.props

    return (
      <div className="editable-buttons">
        <button
          className="editable-submit"
          disabled={disabled}
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <span>Save</span>
          <Icon symbol="check" />
        </button>
        <button
          className="editable-close"
          type="button"
          onClick={onClose}
        >
          <span>Cancel</span>
          <Icon symbol="ban" />
        </button>
      </div>
    )
  }
}
EditableButtons.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default EditableButtons
