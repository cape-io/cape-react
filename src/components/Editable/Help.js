import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

// A simple span that displays help text.
// Optional class added when help is related to an error.

class Help extends Component {

  render() {
    const { help, hasErrors, id, suggestion, onClick } = this.props
    const preTxt = 'Do you mean '
    const postTxt = '? '

    const className = classNames({
      'help-block': true,
      'validation-message': hasErrors,
    })

    return (
      <span className={className} id={`${id}-helpBlock`}>
        { suggestion &&
          <span>
            { preTxt }
            <button onClick={onClick}>
              { suggestion }
            </button>
            { postTxt }
          </span>
        }
        { help }
      </span>
    )
  }
}

Help.propTypes = {
  help: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hasErrors: PropTypes.bool,
  onClick: PropTypes.func,
  suggestion: PropTypes.string,
}

export default Help
