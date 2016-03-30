import React, { Component, PropTypes } from 'react'
import includes from 'lodash/includes'
import { loadImageUrl } from './process'
import Photo from './Photo'
function getInputId(id) {
  return `fileselect-${id}`
}
class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleFileHover = this.handleFileHover.bind(this)
    this.handleUploaded = this.handleUploaded.bind(this)
  }
  // File has been uploaded to cloud storage.
  handleUploaded(fileInfo) {
    // Save to redux state.
    this.props.addContent({ url: { [id]: fileInfo } })
    this.props.formEvent.onBlur(fieldValue)
    // console.log('onChange', fieldValue)
    return
  }
  // This is just to (un)set the focus.
  handleFileHover(event) {
    const { form: { focus }, formEvent: { onBlur, onFocus } } = this.props
    if (event.preventDefault) event.preventDefault()
    if (event.stopPropagation) event.stopPropagation()
    if (event.type === 'dragover') {
      event.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
      if (!focus) {
        onFocus()
      }
    } else if (focus) {
      onBlur()
    }
  }
  handleFileSelect(event) {
    const { accept, fieldEvent, form, maxFiles } = this.props
    this.handleFileHover(event)
    // # Fetch file list object.
    const files = event.target.files || event.dataTransfer.files
    const file = files[0]
    if (!file.type.startsWith('image')) {
      return fieldEvent.error('Only image uploads are allowed.')
    }
    if (!includes(accept, file.type)) {
      return fieldEvent.error(
        `Not a valid image file type. Found ${file.type} but expected ${accept}.`
      )
    }
    if (files.length > maxFiles) {
      fieldEvent.error({
        message: `Please only upload ${maxFiles} image at a time.`,
        status: 'warning',
      })
    }
    if (form.error) fieldEvent.clearError()
    loadImageUrl(this.props, file)
    return undefined
  }
  render() {
    // Need to exchange the value string for file entity.
    const { accept, form, id, url } = this.props
    return (
      <Photo
        {...form}
        accept={accept.join(', ')}
        handleFileSelect={this.handleFileSelect}
        handleFileHover={this.handleFileHover}
        id={id}
        inputId={getInputId(id)}
        url={url}
      />
    )
  }
}
ImageUpload.propTypes = {
  accept: PropTypes.array.isRequired,
  entityUpdate: PropTypes.func.isRequired,
  fieldEvent: PropTypes.object.isRequired,
  form: PropTypes.shape({
    defaultValue: PropTypes.string,
    focus: PropTypes.bool.isRequired,
    meta: PropTypes.object,
    value: PropTypes.string,
  }).isRequired,
  formEvent: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  maxFiles: PropTypes.number.isRequired,
  url: PropTypes.string,
}
ImageUpload.defaultProps = {
  accept: [ 'image/jpg', 'image/jpeg' ],
  maxFiles: 1,
}

export default ImageUpload
