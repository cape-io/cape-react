import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { connectField } from 'redux-field'
import radium from 'radium'
import flow from 'lodash/flow'

import {
  getInputId, handleFileHover, handleFileSelect,
} from './fileHandlers'
const style = {
  base: {
    backgroundColor: '#eee',
    color: '#31708f',
    maxWidth: 250,
  },
  error: {
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
    color: '#a94442',
  },
  focus: {
    backgroundColor: '#d9edf7',
    borderColor: '#bce8f1',
  },
  label: {
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'normal',
    padding: '2rem',
  },
}
function DropZone(props) {
  const {
    accept, form, help, subject, warningMsg,
  } = props
  const { errorMessage, focus, hasError } = form
  const className = classNames('dropzone', {
    'alert-danger': hasError,
    'alert-info hover': focus,
  })
  let txtClassName = 'help'
  let imgTxt = help
  if (hasError) {
    txtClassName = 'error'
    imgTxt = errorMessage
  } else if (warningMsg) {
    txtClassName = 'warning'
    imgTxt = warningMsg
  }
  const fileHover = handleFileHover(props)
  const fileSelect = handleFileSelect(props)
  const inputId = getInputId(subject.id)
  return (
    <div
      className={ className }
      onDragLeave={ fileHover }
      onDragOver={ fileHover }
      onDrop={ fileSelect }
      style={[ style.base, focus && style.focus, hasError && style.error ]}
    >
      <label
        className={txtClassName}
        htmlFor={inputId}
        style={style.label}
      >
        { imgTxt }
      </label>
      <input
        accept={ accept.join(', ') }
        id={ inputId }
        name="fileselect"
        onChange={ fileSelect }
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  )
}

DropZone.propTypes = {
  accept: PropTypes.array.isRequired,
  error: PropTypes.string,
  form: PropTypes.shape({
    defaultValue: PropTypes.string,
    focus: PropTypes.bool.isRequired,
    meta: PropTypes.object,
    value: PropTypes.str,
  }),
  formEvent: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }),
  help: PropTypes.string.isRequired,
  subject: PropTypes.object.isRequired,
  predicate: PropTypes.string.isRequired,
  progress: PropTypes.number,
  url: PropTypes.string,
  value: PropTypes.object,
  warningMsg: PropTypes.string,
}
DropZone.defaultProps = {
  accept: [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif' ],
  help: 'Click here or drop in a new image to upload.',
  predicate: 'image',
}
export default flow(radium, connectField({ prefix: 'dropZone' }))(DropZone)
