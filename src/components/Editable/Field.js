import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'

import Placeholder from './Placeholder'
import Input from './input/Input'
import EditableButtons from './Buttons'
import Help from './Help'

function EditField(props) {
  const { fieldEvent, form, formEvent, help, id, justCreated, label, type, ...other } = props
  const { errorMessage, hasError, open, savedValue, suggestion, value } = form
  const helpTxt = hasError ? errorMessage : help
  const openNewField = justCreated && !savedValue
  if (!open && !openNewField) {
    const color = props.value ? 'black' : 'lightgrey'
    const text = props.value || label
    return <Placeholder color={color} label={text} onClick={fieldEvent.open} title={help} />
  }
  return (
    <form onSubmit={formEvent.onSubmit}>
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
            value={value || props.value}
          />
        }
        <EditableButtons
          {...fieldEvent}
          {...formEvent}
          disabled={hasError}
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
    </form>
  )
}

EditField.propTypes = {
  className: PropTypes.string,
  fieldEvent: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  help: PropTypes.string,
  id: PropTypes.string.isRequired,
  justCreated: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  preventClose: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export default connectField()(EditField)
