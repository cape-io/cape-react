import React, { Component, PropTypes } from 'react'

import FormGroup from './FormGroup'

// This is for an individual, edtiable field.
class EditableField extends Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    // this.props.action.submit()
  }
  render() {
    const { children, field, form, savingTxt } = this.props
    const { editable, label, id, required } = field
    const { saving, status } = form

    return (
      <div className="editable-form form-horizontal" onSubmit={this.handleSubmit}>
        <FormGroup
          id={id}
          label={label}
          editable={editable}
          required={required}
          status={status}
        >
          { children }
          { saving && <span>{savingTxt}</span>}
        </FormGroup>
      </div>
    )
  }
}

EditableField.propTypes = {
  // action: PropTypes.shape({
  //   submit: PropTypes.func.isRequired,
  // }).isRequired,
  // When not editing the children is what will show up inside the form group.
  children: PropTypes.node,
  // Information about the form field. Should not change.
  field: PropTypes.shape({
    editable: PropTypes.bool,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    type: PropTypes.oneOf([
      'email',
      'dateTime',
      'fullName',
      'select',
      'text',
    ]).isRequired,
    validators: PropTypes.array,
  }),
  // All the state related to editing the form field.
  form: PropTypes.shape({
    editing: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    status: PropTypes.string,
  }),
  // Prefix used to specify form state slice.
  prefix: PropTypes.array,
  savingTxt: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

EditableField.defaultProps = {
  savingTxt: 'Saving...',
}

export default EditableField
