import React, { PropTypes } from 'react'
import classNames from 'classnames'

function Icon({ symbol, className, hidden, ...rest }) {
  const classStr = `glyphicon glyphicon-${symbol}`
  return (
    <span
      className={classNames(classStr, className)}
      aria-hidden={hidden}
    />
  )
}

Icon.propTypes = {
  symbol: PropTypes.string.isRequired,
  className: PropTypes.string,
  hidden: PropTypes.bool,
}
Icon.defaultProps = {
  hidden: false,
}

export default Icon
