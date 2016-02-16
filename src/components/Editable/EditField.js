import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Input from './input/Input'

import EditableButtons from './Buttons'
import Help from './Help'

// Manage help text.
// Bubble hasError (and value?) up.

class EditField extends Component {

  render() {
    const {
      className, errorMessage, hasError, help, id,
      onBlur, onChange, onSubmit, onClose, suggestion, type,
      value, ...other
    } = this.props

    const helpTxt = hasError ? errorMessage : help

    return (
      <div className={classNames('editable-form col-md-9', className)}>
        <div className="editable-row">
          <Input
            {...other}
            className="form-control"
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            value={value}
          />
          <EditableButtons
            disabled={hasError}
            onSubmit={onSubmit}
            onClose={onClose}
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
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default EditField
