import React, { Component, PropTypes } from 'react';

import DateTimeField from 'react-bootstrap-datetimepicker'

export default class Dates extends Component {
  handleChange(value) {
    const {onChange} = this.props;
    const hasErrors = isNaN(value);
    const help = hasErrors ? 'Invalid date. Please fix.' : null;
    console.log(value);
    onChange({hasErrors, value, help});
  }
  render() {
    const {onChange, defaultValue, ...other} = this.props;

    return (
      <DateTimeField
        dateTime={defaultValue || undefined}
        {...other}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
