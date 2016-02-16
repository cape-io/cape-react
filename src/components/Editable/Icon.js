import React, { Component, PropTypes } from 'react';
import classNames from 'classnames'

class Icon extends Component {
  render() {
    const {symbol, className, hidden} = this.props;
    const classStr = `fa fa-${symbol}`

    return (
      <i
        className={classNames(classStr, className)}
        aria-hidden={hidden}
      />
    );
  }
};
Icon.propTypes = {
  symbol: PropTypes.string.isRequired,
  className: PropTypes.string
};
Icon.defaultProps = {
  hidden: 'false'
};
export default Icon;
