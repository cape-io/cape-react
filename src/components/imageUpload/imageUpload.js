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
  }

  handleProgress(progress) {
    console.log('progress', progress)
    this.setState({ progress })
  }
  handleUploaded(imgInfo) {
    console.log('handleUploaded')
    if (imgInfo.id && imgInfo.previewUrl) {
      console.log('imgResized')
      this.props.onChange(pick(imgInfo, 'id', 'path', 'previewUrl'))
      return this.setState({
        fileUploading: null,
        errorMsg: null,
        warningMsg: null,
      })
    }
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
    const { accept, metadata, maxFiles, uploadInfo } = this.props
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
        console.log(fileInfo)
        this.setState({
          fileUploading: fileInfo,
          warningMsg,
        })
        uploadFile(fileInfo, uploadInfo, metadata, this.handleProgress, this.handleUploaded)
      })
  }
  render() {
    const { accept, ...rest } = this.props
    return (
      <Photo
        {...rest}
        {...this.state}
        accept={accept.join(', ')}
        handleFileSelect={this.handleFileSelect}
        handleFileHover={this.handleFileHover}
      />
    )
  }
}
ImageUpload.propTypes = {
  accept: PropTypes.array.isRequired,
  maxFiles: PropTypes.number.isRequired,
  metadata: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  uploadInfo: PropTypes.object.isRequired,
}
ImageUpload.defaultProps = {
  accept: [ 'image/jpg', 'image/jpeg' ],
  maxFiles: 1,
}

export default ImageUpload
