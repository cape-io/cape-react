import React, { Component, PropTypes } from 'react'
import noop from 'lodash/noop'
import InputClear from './InputClear'
// Simple wrapper around an input field.
// 1. Checks for changes every 300ms. Useful for safari autocomplete.
// 2. Also has a clear button that changes input value to empty string.

class Input extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.clearInputValue = this.clearInputValue.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    // When initialized trigger the tick function every interval.
    this.interval = setInterval(() => this.tick(), 300)
  }
  // Only update when the props value changes.
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // The value has changed. Do stuff.
  changeValue(newValue) {
    const { value, onChange } = this.props
    // When it's a new value send it to parent.
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  // Extract new value from change event.
  handleChange(event) {
    const newValue = event.target.value
    // Pass it along.
    this.changeValue(newValue)
  }

  tick() {
    const { id } = this.props
    // Get the form field value. Not using refs so it's usable with Redux...
    // const fieldVal = this.refs[id].getDOMNode().value
    const fieldVal = document.getElementById(id).value
    // If the field has a value send it off.
    if (fieldVal) {
      this.changeValue(fieldVal)
    }
  }
  clearInputValue() {
    // console.log('clear')
    this.changeValue('')
  }
  handleKeyDown(event) {
    const { onClose, onNext } = this.props
    switch (event.keyCode) {
      // escape key.
      case 27:
        if (onClose) {
          event.preventDefault()
          onClose()
        }
        break
      case 9:
        if (onNext) {
          event.preventDefault()
          onNext()
        }
        break
      default:
        break
    }
    // return 13
    // tab 9
  }
  render() {
    const { id, value, ...other } = this.props

    return (
      // Is a blur the same as a save?
      <div className="editable-input">
        <input
          {...other}
          autoFocus
          aria-describedby={`${id}-helpBlock`}
          onKeyDown={this.handleKeyDown}
          onChange={noop}
          onInput={this.handleChange}
          id={id}
          value={value}
        />
        { value &&
          <InputClear onClick={this.clearInputValue} />
        }
      </div>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  // Needed in place of refs.
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}
export default Input
