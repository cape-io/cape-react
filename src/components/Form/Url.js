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
        { !upload && info && info.preview && info.preview.image &&
          <div className="col-md-6">
            <img
              className="thumbnail"
              src={info.preview.image.url}
              alt={info.title}
              style={{ maxWidth: 300 }}
            />
          </div>
        }
        {
          url &&
          <div className="col-md-6">
            <input
              className="form-control"
              {...rest}
              disabled={upload && info && info.provider && info.provider.id === 'cape'}
              id={fieldId}
              type="url"
              placeholder="https://"
              value={inputValue}
            />
            <span className="help-block">{ url.help }</span>
            { info &&
              <ul className="list-group">
                <li className="list-group-item"><strong>Catalog ID: </strong>{info.id}</li>
                { info.data && info.data.title && <li className="list-group-item"><strong>Title: </strong>{info.data.title}</li> }
                { info.data && info.data.description && <li className="list-group-item"><strong>Description: </strong>{info.data.description}</li> }
              </ul>
            }
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
