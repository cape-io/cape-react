import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Input from './input/Input'

import EditableButtons from './Buttons'
import Help from './Help'

// Manage help text.
// Bubble hasError (and value?) up.

class EditField extends Component {

  render() {
    const { action, className, id, form, preventClose, type, ...other } = this.props
    const { hasError, errorMessage, help, suggestion, value } = form
    const helpTxt = hasError ? errorMessage : help
    const { onBlur, onChange, onClose, onFocus, onSubmit } = action
    return (
      <div className={classNames('editable-form col-md-9', className)}>
        <div className="editable-row">
          <Input
            {...other}
            className="form-control"
            id={id}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            type={type}
            value={value}
          />
          <EditableButtons
            disabled={hasError}
            onSubmit={onSubmit}
            onClose={onClose}
            preventClose={preventClose}
          />
        </div>
        { (helpTxt || suggestion) &&
          <Help
            help={helpTxt}
            hasErrors={hasError}
            id={id}
            suggestion={suggestion}
          />
        }
      </div>
    )
  }
}

EditField.propTypes = {
  action: PropTypes.object.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  form: PropTypes.object.isRequired,
  help: PropTypes.string,
  id: PropTypes.string.isRequired,
  preventClose: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default EditField
