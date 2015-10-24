import React, { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

function InputTextarea(props) {
  return (
    <Textarea className="form-control" {...props} />
  );
}

InputTextarea.propTypes = {
  onBlur: PropTypes.func.isRequired,
};
InputTextarea.defaultProps = {};
export default InputTextarea;
