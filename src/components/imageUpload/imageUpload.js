import React, { Component, PropTypes } from 'react'
import pick from 'lodash/object/pick'

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
    console.log('progress', progress)
    this.setState({ progress })
  }

  // File has been uploaded to cloud storage.
  handleUploaded(fileInfo) {
    // console.log('handleUploaded', imgInfo)
    const { cdnUrl, id, md5, entity: { display } } = fileInfo
    // What values do we save into the entity, field?
    const fieldValue = {
      cdnUrl,
      id,
      md5,
      display,
    }
    this.setState({
      fileUploading: null,
      errorMsg: null,
      warningMsg: null,
    })
    this.props.onChange(fieldValue)
    console.log('onChange', fieldValue)
    return
  }
  // This is just to (un)set the hover class.
  handleFileHover(event) {
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

    return
  }
  handleFileSelect(event) {
    const {
      accept, contentType, display,
      entityId, fieldId, maxFiles, uploadInfo,
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
      warningMsg = 'Please only upload one image at a time.'
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
        this.setState({
          fileUploading: fileInfo,
          warningMsg,
        })
        uploadFile(fileInfo, uploadInfo, metadata, this.handleProgress, this.handleUploaded)
      })
  }
  render() {
    const { accept, ...rest, value, defaultValue } = this.props
    return (
      <Photo
        {...rest}
        {...this.state}
        accept={accept.join(', ')}
        handleFileSelect={this.handleFileSelect}
        handleFileHover={this.handleFileHover}
        value={value || defaultValue}
      />
    )
  }
}
ImageUpload.propTypes = {
  accept: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  display: PropTypes.object,
  entityId: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  maxFiles: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  uploadInfo: PropTypes.object.isRequired,
  value: PropTypes.object,
}
ImageUpload.defaultProps = {
  accept: [ 'image/jpg', 'image/jpeg' ],
  maxFiles: 1,
}

export default ImageUpload
