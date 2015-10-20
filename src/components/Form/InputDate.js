import React, { PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import moment from 'moment';
import localizers from 'react-widgets/lib/localizers/moment';
localizers(moment);

function editFormatToISO(string, editFormats, previousValue) {
  // Can we just return the previousValue always?
  // So far this is working as expected...
  return previousValue;
  // // Do not do anything.
  // if (!string) {
  //   return null;
  // }
  // // Just return previous value?
  // if (string.length < 5 || string === 'false') {
  //   console.log('wtf', string, previousValue);
  //   return previousValue;
  // }
  // const value = moment(string, editFormats);
  // if (value.isValid()) {
  //   const isoString = value.toISOString();
  //   console.log(string, isoString, previousValue);
  //   return isoString;
  // }
}

// Not sure we need to pass other to DateTimePicker.
function InputDate({editFormat, parse, field: {onBlur, onChange, value, ...other} }) {
  // @TODO I need to figure out why setting editFormat makes things crazy.
  return (
    <DateTimePicker
      parse={parse}
      format={editFormat}
      {...other}
      value={ value && moment(value).toDate() }
      onChange={ date => { onChange(moment(date).toISOString()); }}
      onBlur={ event => { onBlur(editFormatToISO(event.target.value, parse, value)); }}
    />
  );
}

InputDate.propTypes = {
  field: PropTypes.object.isRequired,
};
InputDate.defaultProps = {
  defaultText: 'Please select a date',
  // inputFormat: 'DD/MM/YYYY h:mm A',
  editFormat: 'L LT',
  format: 'MMM DD, YYYY h:mm A',
  parse: ['M/D/YY', 'L LT', 'MM/DD/YYYY h:mm A', 'M/D/YYYY h:mm A', 'M/D/YY h:mm A'],
};
export default InputDate;
