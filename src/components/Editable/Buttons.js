import React, { Component, PropTypes } from 'react'
import Icon from './Icon'

class EditableButtons extends Component {

  render() {
    const { closeTxt, disabled, onSubmit, onClose, preventClose, submitTxt, value } = this.props
    function handleSubmit(event) {
      event.preventDefault()
      onSubmit(value)
    }
    return (
      <div className="editable-buttons">
        <button
          className="editable-submit"
          disabled={disabled}
          type="submit"
          onClick={handleSubmit}
        >
          <span>{submitTxt}</span>
          <Icon symbol="check" />
        </button>
        { !preventClose &&
          <button
            className="editable-close"
            type="button"
            onClick={onClose}
          >
            <span>{closeTxt}</span>
            <Icon symbol="ban" />
          </button>
        }
      </div>
    )
  }
}
EditableButtons.propTypes = {
  closeTxt: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  preventClose: PropTypes.bool,
  submitTxt: PropTypes.string.isRequired,
  value: PropTypes.any,
}
EditableButtons.defaultProps = {
  closeTxt: 'Cancel',
  submitTxt: 'Submit',
}
export default EditableButtons
