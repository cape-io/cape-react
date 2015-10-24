import React, { PropTypes } from 'react';

import InputFlags from './InputFlags';
import InputRadios from './InputRadios';
import InputSelect from './InputSelect';
import InputDate from './InputDate';
import InputTextarea from './InputTextarea';

function Input({field, label, type, showFlags, options, required, asyncValidating, styles, ...other}) {
  const { active, dirty, error, name, touched, visited, ...inputProps } = field;
  // checked, defaultChecked, defaultValue, invalid, pristine, valid, value
  // handleBlur, handleChange, handleFocus
  // onBlur, onChange, onDrag, onDrop, onFocus, onUpdate
  const isTypeText = type === 'text';
  const inputGroupStyle = isTypeText ? styles.inputGroup : '';

  let InputEl = false;
  switch (type) {
    case 'radio':
      InputEl = (
        <InputRadios
          styles={styles.radioLabel}
          field={field}
          type={type}
          options={options}
        />);
      break;
    case 'select':
      InputEl = <InputSelect options={options} {...field} />;
      break;
    case 'datetime':
      InputEl = <InputDate field={field} {...other} />;
      break;
    case 'textarea':
      InputEl = <InputTextarea {...field} {...other} />;
      break;
    default:
      InputEl = (
        <input
          type={type}
          className={isTypeText && 'form-control'}
          id={name} {...inputProps}
        />);
  }

  return (
    <div className={'form-group' + (error && touched ? ' has-error' : '')}>
      <label htmlFor={name} className="col-sm-2">
        { label }
        { required && '*' }
      </label>
      <div className={'col-sm-6 ' + inputGroupStyle}>
        { asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/> }
        { InputEl }
        { error && touched && <div className="text-danger">{error}</div> }
        { showFlags && type !== 'datetime' && <InputFlags {...{dirty, active, visited, touched, styles}} /> }
      </div>
    </div>
  );
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  asyncValidating: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
};
Input.defaultProps = {
  asyncValidating: false,
  type: 'text',
};
export default Input;
