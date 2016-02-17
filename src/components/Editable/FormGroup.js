import React, { Component, PropTypes } from 'react'

import classNames from 'classnames'

// Editable formGroup.

class FormGroup extends Component {
  render() {
    const { label, status, id, required, children, editable, className } = this.props
    const cssClasses = {
      editable,
      'form-group': true,
      'has-error': (status === 'error'),
      'has-success': (status === 'success'),
      'has-warning': (status === 'warning'),
      'has-feedback': status,
    }

    return (
      <div className={classNames(cssClasses, className)} id={`${id}-group`}>
        { label &&
          <label className="control-label col-md-3" htmlFor={ id }>
            { label }
            { required ? '*' : false }
          </label>
        }
        {children}
      </div>
    )
  }
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  editable: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  status: PropTypes.string,
}

FormGroup.defaultProps = {
}

export default FormGroup
