import React, { PropTypes } from 'react'
import classnames from 'classnames'

import InputDate from './InputDate'
import Url from './Url'
import InputFlags from './InputFlags'
import InputRadios from './InputRadios'
import InputSelect from './InputSelect'
import InputTextarea from './InputTextarea'
// import Photo from '../imageUpload/imageUpload'
import Dimensions from './Dimensions'

function Input(props) {
  const {
    asyncValidating,
    field, fieldId,
    help,
    label,
    option, options,
    required,
    showFlags, showErrors,
    styles, type,
    uploadInfo,
    ...other,
    } = props
  const { active, dirty, error, name, touched, visited, ...inputProps } = field
  // `name` is like 'foo[0].bar'. Use `fieldId` for css things instead.
  // checked, defaultChecked, defaultValue, invalid, pristine, valid, value
  // handleBlur, handleChange, handleFocus
  // onBlur, onChange, onDrag, onDrop, onFocus, onUpdate
  const isTypeText = type === 'text' || type === 'url' || type === 'email'
  const inputGroupStyle = ''

  let InputEl = false
  switch (type) {
    case 'radio':
      InputEl = (
        <InputRadios
          styles={styles.radioLabel}
          field={field}
          type={type}
          options={options}
        />)
      break
    case 'select':
      InputEl = <InputSelect option={option} options={options} {...field} />
      break
    case 'datetime':
      InputEl = <InputDate field={field} {...other} />
      break
    case 'dimensions':
      InputEl = <Dimensions {...inputProps} {...other} fieldId={fieldId} />
      break
    case 'url':
      InputEl = (
        <Url
          {...field}
          {...other}
          fieldId={fieldId}
          uploadInfo={uploadInfo}
        />
      )
      break
    case 'textarea':
      InputEl = <InputTextarea {...field} {...other} />
      break

    default:
      InputEl = (
        <input
          {...other}
          type={type}
          className={isTypeText && 'form-control'}
          id={fieldId}
          {...inputProps}
        />
      )
  }
  const className = classnames(
    'form-group',
    'field-type-' + type,
    'filed-name-' + fieldId.split('-').pop(),
    {
      'has-error': showErrors && !!error,
    }
  )
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="col-sm-2">
        { label }
        { required && '*' }
      </label>
      <div className={type === 'url' ? 'col-sm-10' : 'col-sm-6 ' + inputGroupStyle}>
        { asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/> }
        { InputEl }
        { showErrors && error && <div className="text-danger">{error}</div> }
        { showFlags && type !== 'datetime' && <InputFlags {...{ dirty, active, visited, touched, styles }} /> }
      </div>
      { help && <span className="help-block">{ help }</span> }
    </div>
  )
}

Input.propTypes = {
  contentType: PropTypes.string.isRequired,
  entityId: PropTypes.string,
  field: PropTypes.object.isRequired,
  fieldId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  asyncValidating: PropTypes.bool.isRequired,
  showErrors: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
}
Input.defaultProps = {
  asyncValidating: false,
  showErrors: false,
  type: 'text',
}
export default Input
