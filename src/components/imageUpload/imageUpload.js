import React, { Component, PropTypes } from 'react'
// import pick from 'lodash/object/pick'
import { connect } from 'react-redux'
import { addContent } from '../../redux/actions'

function mapStateToProps(state, { defaultValue, value }) {
  const {
    entities: { url },
  } = state
  const fileId = value || defaultValue
  return {
    fileInfo: url[fileId] && url[fileId].entity || undefined,
  }
}
const mapDispatchToProps = {
  addContent,
}

import { processImgFile, uploadFile } from './process'
import Photo from './Photo'

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileHover: false,
      fileUploading: null,
      progress: 0,
      errorMsg: null,
      warningMsg: null,
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleFileHover = this.handleFileHover.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.handleUploaded = this.handleUploaded.bind(this)
  }

  handleProgress(progress) {
    // console.log('progress', progress)
    this.setState({ progress })
    if (progress === 101) {
      const { onChange, value } = this.props
      onChange(value.replace('$uploading:', '$uploaded:'))
    }
  }

  // File has been uploaded to cloud storage.
  handleUploaded(fileInfo) {
    // console.log('handleUploaded', imgInfo)
    const { id } = fileInfo
    // What values do we save into the entity, field?
    // Just the id because the fileInfo is a file entity.
    const fieldValue = id
    this.setState({
      fileUploading: null,
      errorMsg: null,
      warningMsg: null,
    })
    // Save to redux state.
    this.props.addContent({ url: { [id]: fileInfo } })
    this.props.onBlur(fieldValue)
    // console.log('onChange', fieldValue)
    return
  }
  // This is just to (un)set the hover class.
  handleFileHover(event) {
    const { active, onFocus } = this.props
    if (event.preventDefault) {
      event.preventDefault()
    }
    if (event.stopPropagation) {
      event.stopPropagation()
    }

    if (event.type === 'dragover') {
      event.dataTransfer.dropEffect = 'copy'
      if (!this.state.fileHover) {
        this.setState({
          fileHover: true,
        })
      }
    } else if (this.state.fileHover === true) {
      this.setState({
        fileHover: false,
      })
    }
    if (!active) {
      onFocus()
    }
    return
  }
  handleFileSelect(event) {
    const {
      accept, contentType, display,
      entityId, fieldId, maxFiles,
      onChange,
      uploadInfo,
    } = this.props

    const metadata = {
      contentType,
      display,
      entityId,
      fieldId,
      userId: uploadInfo.userId,
    }
    console.log('handleFileSelect')
    // # Disable defaults. Toggle off 'hover' class.
    this.handleFileHover(event)
    let warningMsg = null
    // # Fetch file list object.
    const files = event.target.files || event.dataTransfer.files
    if (files.length > maxFiles) {
      warningMsg = `Please only upload ${maxFiles} image at a time.`
    }
    // # Process the first file.
    const file = files[0]
    processImgFile(
      { file },
      accept,
      (err, fileInfo) => {
        if (err) {
          return this.setState({ errorMsg: err, warningMsg })
        }
        // Tell form that we have a new value.
        onChange(`$uploading:${fileInfo.name}`)
        this.setState({
          fileUploading: fileInfo,
          warningMsg,
        })
        uploadFile(fileInfo, uploadInfo, metadata, this.handleProgress, this.handleUploaded)
      })
  }
  render() {
    // Need to exchange the value string for file entity.
    const { accept, ...rest, fileInfo } = this.props
    return (
      <Photo
        {...rest}
        {...this.state}
        accept={accept.join(', ')}
        handleFileSelect={this.handleFileSelect}
        handleFileHover={this.handleFileHover}
        value={fileInfo}
      />
    )
  }
}
ImageUpload.propTypes = {
  active: PropTypes.bool.isRequired,
  addContent: PropTypes.func.isRequired,
  accept: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  display: PropTypes.object,
  entityId: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  fileInfo: PropTypes.object,
  maxFiles: PropTypes.number.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  uploadInfo: PropTypes.object.isRequired,
  value: PropTypes.string,
}
ImageUpload.defaultProps = {
  accept: [ 'image/jpg', 'image/jpeg' ],
  maxFiles: 1,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
