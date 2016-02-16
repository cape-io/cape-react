import React, { Component, PropTypes } from 'react';

import validateEmail from 'email-validate';
import Input from './Input'

// An email validation wrapper around text input.
// Turns the onChange value to a full object of info. @see validateEmail().

class InputEmail extends Component {
  // Check validation on value.
  componentDidMount() {
    const {apiKey, value} = this.props;
    validateEmail(apiKey, value, (res) => this.handleValidateResult(res));
  }

  // Only update when the state changes.
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  // Handle the response from the validateEmail function after the async.
  handleValidateResult(result) {
    const {onChange, value} = this.props;
    if (result.value === value) {
      onChange(result);
    }
  }

  // Every change to the input field.
  handleChange(newValue) {
    const {apiKey, onChange} = this.props;
    // Validate the input.
    const initResult = validateEmail(apiKey, newValue, this.handleValidateResult.bind(this));
    // Update the value state on this component.

    // Pass sync validation results imediately to parent component.
    onChange(initResult);
  }

  render() {
    const {onChange, ...other} = this.props;

    return (
      <Input
        {...other}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
InputEmail.propTypes = {
  // key needed for validateEmail.
  apiKey: PropTypes.string.isRequired,
  // Function that we send a full object to.
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

InputEmail.defaultProps = {
  apiKey: 'pubkey-1j0fplia8gwp3t6ibvr20t325us652y5',
  placeholder: 'you@domain.com',
  type: 'email'
}

export default InputEmail;
