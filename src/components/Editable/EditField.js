import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Textarea from 'react-textarea-autosize'

import Input from './input/Input'

import EditableButtons from './Buttons'
import Help from './Help'

// Manage help text.
// Bubble hasError (and value?) up.

function EditField(props) {
  const { fieldEvent, formEvent, className, id, form, preventClose, type, ...other } = props
  const { hasError, errorMessage, help, suggestion, value } = form
  const helpTxt = hasError ? errorMessage : help
  return (
    <div className={classNames('editable-form col-md-9', className)}>
      <div className="editable-row">
        { type !== 'textarea' &&
          <Input
            {...other}
            {...formEvent}
            className="form-control"
            id={id}
            type={type}
            value={value}
          />
        }
        { type === 'textarea' &&
          <Textarea
            {...other}
            {...formEvent}
            className="form-control"
            id={id}
            type={type}
            value={value}
          />
        }
        { props.buttons &&
          <EditableButtons
            {...fieldEvent}
            {...formEvent}
            disabled={hasError}
            preventClose={preventClose}
          />
        }
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

EditField.propTypes = {
  buttons: PropTypes.bool.isRequired,
  fieldEvent: PropTypes.object.isRequired,
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
EditField.defaultProps = {
  buttons: true,
}
export default EditField
