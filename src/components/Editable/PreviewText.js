import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import PreviewTextStatic from './PreviewTextStatic'
import PreviewTextEditable from './PreviewTextEditable'

// The preview of a field value. Used for really simple text fields.

class PreviewText extends Component {
  render() {
    const { className, editable, value, ...rest } = this.props
    const cssClasses = {
      'editable-click': editable,
      'editable-empty': !value,
      'form-value': true,
    }

    const PreviewEl = editable ? PreviewTextEditable : PreviewTextStatic
    return (
      <div className={classNames(cssClasses, className)}>
        <PreviewEl value={value} {...rest} />
      </div>
    )
  }
}
PreviewText.defaultProps = {
  editable: true,
}
PreviewText.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

export default PreviewText
