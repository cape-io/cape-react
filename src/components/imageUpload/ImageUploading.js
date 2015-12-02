import React, { PropTypes } from 'react'

function ImageUploading({ progress, fileInfo, ...other }) {
  const { humanSize, fileData, name } = fileInfo
  const width = other.width || '150'
  const progressStr = progress + '%'
  const resizeTxt = '[ Resizing... ]'

  let progressEl = null

  if (progress === 101) {
    progressEl = <div className="progress-resize">{resizeTxt}</div>
  }
  else {
    progressEl = (
      <div className="progress-bar" role="progressbar"
        style={{ width: progressStr }}
        aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        { progressStr }
      </div>
    )
  }

  return (
    <div className="dz-preview dz-processing dz-image-preview col-md-2">
      <div className="dz-details">
        <div className="dz-filename"><span>{name}</span></div>
        <img alt={name} src={fileData} width={width} />
        <div className="dz-size">
          <span className="dz-size-value">{humanSize.value}</span>
          <span className="dz-size-unit">{humanSize.unit}</span>
        </div>
      </div>
      <div className="dz-progress progress">
        { progressEl }
      </div>
      <button role="button" className="dz-remove">Remove File</button>
    </div>
  )
}
ImageUploading.propTypes = {
  progress: PropTypes.number.isRequired,
  fileInfo: PropTypes.object.isRequired,
  width: PropTypes.string,
}

export default ImageUploading
