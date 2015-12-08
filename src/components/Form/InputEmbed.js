import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUrl } from '../../redux/actions'

function mapStateToProps(state, { defaultValue, value }) {
  const {
    entities: { url, urlIndex },
  } = state
  const val = value || defaultValue
  const id = urlIndex[val] ? urlIndex[val] : val
  return {
    info: url[id] && url[id] || undefined,
  }
}
const mapDispatchToProps = {
  loadUrl,
}

// This is called from within the container component class.
function loadData(props) {
  const { defaultValue, value, valid } = props
  // Fetch embed info when valid value is found.
  if (valid && value || defaultValue) {
    props.loadUrl(value || defaultValue)
  }
}

// Print RadioOption for each options.
class InputEmbed extends Component {
  componentWillMount() {
    loadData(this.props)
  }
  componentWillReceiveProps(nextProps) {
    loadData(nextProps)
  }
  render() {
    const { fieldId, loadUrl, info, ...rest } = this.props

    return (
      <div>
        <input className="form-control" {...rest} id={fieldId} type="url" />
        { info && info.preview && info.preview.image &&
          <img className={'col-sm-10'} src={info.preview.image.url} alt={info.title} />
        }
      </div>
    )
  }
}
InputEmbed.propTypes = {
  fieldId: PropTypes.string.isRequired,
  info: PropTypes.object,
  loadUrl: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  value: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputEmbed)
