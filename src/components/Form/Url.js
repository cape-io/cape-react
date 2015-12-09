import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addContent, loadUrl } from '../../redux/actions'
import ImageUpload from './imageUpload/imageUpload'

function mapStateToProps(state, { defaultValue, value }) {
  const {
    entities: { url, urlIndex },
  } = state
  const val = value || defaultValue
  const id = urlIndex[val] ? urlIndex[val] : val
  return {
    info: url[id] && url[id] || undefined,
    // value: val,
  }
}
const mapDispatchToProps = {
  addContent,
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
    if (nextProps.info && nextProps.value) {
      if (nextProps.value != nextProps.info.id) {
        nextProps.onChange(nextProps.info.id)
      }
    }
  }
  render() {
    const { fieldId, loadUrl, info, url, upload, value, ...rest } = this.props
    const inputValue = info && info.id === value ? info.url.href : value
    return (
      <div className="row">
        { upload &&
          <div className="col-md-6">
            <ImageUpload
              {...rest}
              {...upload}
              fieldId={fieldId}
              info={info}
              value={value}
            />
          </div>
        }
        {
          url &&
          <div className="col-md-6">
            { info &&
              <ul>
                <li>{info.id}</li>
                { info.title && <li>{info.title}</li> }
                { info.description && <li>{info.description}</li> }
              </ul>
            }
            <input
              className="form-control"
              {...rest}
              id={fieldId}
              type="url"
              placeholder="https://"
              value={inputValue}
            />
            <span className="help-block">{ url.help }</span>
          </div>
        }
      </div>
    )
  }
}
InputEmbed.propTypes = {
  fieldId: PropTypes.string.isRequired,
  info: PropTypes.object,
  loadUrl: PropTypes.func.isRequired,
  url: PropTypes.object,
  upload: PropTypes.object,
  valid: PropTypes.bool,
  value: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputEmbed)
