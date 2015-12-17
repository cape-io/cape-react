import React, { PropTypes } from 'react'
import classNames from 'classnames'
import ImageUploading from './ImageUploading'

function Photo(props) {
  const {
    // active,
    accept,
    errorMsg,
    fieldId,
    fileHover, fileUploading,
    handleFileHover, handleFileSelect,
    // onFocus,
    progress,
    value,
    warningMsg,
  } = props

  const className = classNames({
    dropzone: true,
    jumbotron: true,
    ['alert-info hover']: !!fileHover,
  })

  let currentImg = null
  if (fileUploading) {
    currentImg = (
      <div className="dz-images thumbnail row">
        <ImageUploading progress={progress} fileInfo={fileUploading} width="300" />
      </div>
    )
  }
  else if (value && value.preview && value.preview.image) {
    currentImg = (
      <div className="dz-image thumbnail">
        <img src={value.preview.image.url} alt={value.id} />
      </div>
    )
  }

  let txtClassName = 'help'
  let imgTxt = 'Click on the image or drop a new JPG on top of it to replace it.'
  if (errorMsg) {
    txtClassName = 'error'
    imgTxt = errorMsg
  }
  else if (warningMsg) {
    txtClassName = 'warning'
    imgTxt = warningMsg
  }
  const inputId = 'fileselect-' + fieldId
  function activateFileSelect() {
    // this.refs.fileselect.click()
    document.getElementById(inputId).click()
    console.log('activateFileSelect', fieldId)
    // if (!active) {
    //   onFocus()
    // }
  }

  return (
    <div className={className} onDragOver={handleFileHover}
      onDragLeave={handleFileHover} onDrop={handleFileSelect}
      onClick={ activateFileSelect } id="filedrag">
      { currentImg }
      <p className={txtClassName}>{ imgTxt }</p>
      <input type="file" id={inputId} name="fileselect"
        accept={accept} onChange={handleFileSelect}
        style={{ display: 'none' }} />
    </div>
  )
}

Photo.propTypes = {
  active: PropTypes.bool.isRequired,
  accept: PropTypes.string.isRequired,
  handleFileSelect: PropTypes.func.isRequired,
  imgInfo: PropTypes.object,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.object,
}

export default Photo
