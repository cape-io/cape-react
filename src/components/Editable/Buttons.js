import React, { Component, PropTypes } from 'react'
import Icon from './Icon'

class EditableButtons extends Component {

  render() {
    const { onSubmit, onClose, disabled, preventClose, closeTxt, submitTxt } = this.props

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
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  preventClose: PropTypes.bool,
  submitTxt: PropTypes.string.isRequired,
}
EditableButtons.defaultProps = {
  closeTxt: 'Cancel',
  submitTxt: 'Submit',
}
export default EditableButtons
