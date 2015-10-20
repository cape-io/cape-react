import React, { PropTypes } from 'react';

function RadioOption({id, field, label, styles, type, value}) {
  const checked = field.value === value;
  return (
    <span>
      <input type={type} id={id} {...field} value={value} checked={checked}/>
      <label htmlFor={id} className={styles}>{label}</label>
    </span>
  );
}
RadioOption.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

// Print RadioOption for each options.
function InputRadios({options, field, ...rest}) {
  return (
    <div>
      {
        options.map( ({value, label} )=> {
          const id = `{$field.name}-${value}`;
          return (
            <RadioOption
              id={id}
              key={id}
              field={field}
              value={value}
              label={label}
              {...rest}
            />
          );
        })
      }
    </div>
  );
}
InputRadios.propTypes = {
  options: PropTypes.array.isRequired,
};

export default InputRadios;
