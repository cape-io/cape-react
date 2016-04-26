import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Textarea from 'react-textarea-autosize'
import { connectField } from 'redux-field'

import Placeholder from './Placeholder'
import Input from './input/Input'
import EditableButtons from './Buttons'
import Help from './Help'

function EditField(props) {
  const { buttons, fieldEvent, form, formEvent, help, id, justCreated, label, type, ...other,
  } = props
  const { errorMessage, hasError, open, status, suggestion, touched, value } = form
  const helpTxt = hasError ? errorMessage : help
  const openNewField = justCreated && !touched
  if (!open && !openNewField) {
    const color = props.initialValue ? 'black' : 'lightgrey'
    const text = props.initialValue || label
    return <Placeholder color={color} label={text} onClick={fieldEvent.open} title={help} />
  }
  const cssClasses = {
    'has-error': (status === 'error'),
    'has-success': (status === 'success'),
    'has-warning': (status === 'warning'),
    'has-feedback': !!status,
  }
  return (
    <form onSubmit={formEvent.onSubmit} className={classNames(cssClasses)}>
      <div className="editable-row" style={{ display: 'flex' }}>
        { type !== 'textarea' &&
          <Input
            {...other}
            {...formEvent}
            className="form-control"
            id={id}
            placeholder={label}
            style={{ maxWidth: 400 }}
            type={type}
            value={value || props.initialValue}
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
        { buttons &&
          <EditableButtons
            {...fieldEvent}
            {...formEvent}
            disabled={hasError}
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
    </form>
  )
}

EditField.propTypes = {
  buttons: PropTypes.bool.isRequired,
  className: PropTypes.string,
  fieldEvent: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  help: PropTypes.string,
  id: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  justCreated: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  preventClose: PropTypes.bool,
  type: PropTypes.string.isRequired,
}
EditField.defaultProps = {
  buttons: true,
}
export default connectField()(EditField)
