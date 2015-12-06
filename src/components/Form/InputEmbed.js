import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadEmbed } from '../../redux/actions'

function mapStateToProps(state, { defaultValue, value }) {
  const {
    entities: { embed },
  } = state
  const id = value || defaultValue
  return {
    info: embed[id] && embed[id] || undefined,
  }
}
const mapDispatchToProps = {
  loadEmbed,
}

// Print RadioOption for each options.
class InputEmbed extends Component {
  componentWillReceiveProps(nextProps) {
    const { value, valid } = nextProps
    // Fetch embed info when valid value is found.
    if (valid && value) {
      loadEmbed(value)
    }
  }
  render() {
    const { fieldId, loadEmbed, info, ...rest } = this.props

    return (
      <div>
        <input className="form-control" {...rest} id={fieldId} type="url" />
        { info && info.thumbnailUrl &&
          <img className={'col-sm-10'} src={info.thumbnailUrl} alt={info.title} />
        }
      </div>
    )
  }
}
InputEmbed.propTypes = {
  fieldId: PropTypes.string.isRequired,
  info: PropTypes.object,
  loadEmbed: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  value: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputEmbed)
