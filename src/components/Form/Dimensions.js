import React, { Component, PropTypes } from 'react'
import isString from 'lodash/lang/isString'

import { encodeSize, options, parseSize } from '../../helpers/dimensions'

function getInputId(fieldId, className) {
  return fieldId + '-' + className
}
// Grab the input value and clobber anything but numbers.
function getInputValue(fieldId, className) {
  const val = document.getElementById(getInputId(fieldId, className)).value
  if (val && isString(val)) {
    // Being double sure it's nothing but a number.
    return val.replace(/[^0-9.]/g, '')
  }
  return val
}

class Dimensions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Default size {} object.
      size: parseSize(props.value || props.initialValue || 'fixed'),
    }
    this.buildInput = this.buildInput.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSelectBlur = this.handleSelectBlur.bind(this)
  }
  // Used on select change and blur.
  handleSelect(event, updateFunc) {
    const option = event.target.value
    if (option === 'fixed') {
      // Fetch the value from state and use that.
      updateFunc(encodeSize(this.state.size))
    }
    else {
      // exchange 'x' for null before save.
      updateFunc(parseSize(option))
    }
  }
  handleSelectChange(event) {
    this.handleSelect(event, this.props.onChange)
  }
  handleSelectBlur(event) {
    this.handleSelect(event, this.props.onBlur)
  }
  // When any of the size input fields change.
  handleSizeChange() {
    const { fieldId, onChange } = this.props
    // Grab values from each input field.
    const size = {
      h: getInputValue(fieldId, 'height'),
      w: getInputValue(fieldId, 'width'),
      d: getInputValue(fieldId, 'depth'),
    }
    onChange(encodeSize(size))
    // Save a copy to state.
    this.setState({ size })
    // console.log(size)
  }
  buildInput(className, placeholder, value) {
    const { onFocus, fieldId } = this.props
    const sizeFieldId = getInputId(fieldId, className)
    return (
      <div className={className + ' form-group col-sm-3'}>
        <label className="sr-only" htmlFor={sizeFieldId}>{className}</label>
        <div className="input-group">
          <input
            id={sizeFieldId}
            className="form-control"
            value={value}
            min="0"
            onChange={this.handleSizeChange.bind(this)}
            onFocus={onFocus}
            placeholder={placeholder}
            type="number"
          />
          <span className="input-group-addon">
            {'in'}
          </span>
        </div>
      </div>
    )
  }
  showSizeFields() {
    const { value } = this.props
    // const { size } = this.state
    let showFields = false
    if (value === 'fixed' || value && value.startsWith('size-')) {
      showFields = true
    }
    // if (isObject(size)) {
    //   showFields = true
    // }
    return showFields
  }
  render() {
    const { onFocus, value, initialValue } = this.props
    // Send this.state.size as a default value.
    const size = parseSize(value || initialValue, this.state.size)
    const sizeFields = ( this.showSizeFields() &&
      <div className="dimensions form-inline">
        { this.buildInput('height', 'H', size.h) }
        <div className="plain bythis col-sm-1">
          {'x'}
        </div>
        { this.buildInput('width', 'W', size.w) }
        <div className="plain bythis col-sm-1">
          {'x'}
        </div>
        { this.buildInput('depth', 'D', size.d) }
      </div>
    )

    return (
      <div>
        <select
          className="form-control"
          name="dimension-type"
          onChange={this.handleSelectChange}
          onBlur={this.handleSelectBlur}
          onFocus={onFocus}
        >
          {
            options.map( ({ name, value }) => (
              <option value={value} key={value}>
                { name }
              </option>
            ))
          }
        </select>
        { sizeFields }
      </div>
    )
  }
}

Dimensions.propTypes = {
  fieldId: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.string,
}
Dimensions.defaultProps = {
  value: '',
}
export default Dimensions
