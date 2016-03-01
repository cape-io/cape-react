import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Input from './input/Input'

import EditableButtons from './Buttons'
import Help from './Help'

// Manage help text.
// Bubble hasError (and value?) up.

class EditField extends Component {

  render() {
    const { formEvent, className, id, form, preventClose, type, ...other } = this.props
    const { hasError, errorMessage, help, suggestion, value } = form
    const helpTxt = hasError ? errorMessage : help
    return (
      <div className={classNames('editable-form col-md-9', className)}>
        <div className="editable-row">
          <Input
            {...other}
            {...formEvent}
            className="form-control"
            id={id}
            type={type}
            value={value}
          />
          <EditableButtons
            {...formEvent}
            disabled={hasError}
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
  formEvent: PropTypes.object.isRequired,
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
