import React, { PropTypes } from 'react'
import { humanFileSize } from '../../../redux/select'

function ImageUploading({ progress, meta, url, width }) {
  const { contentSize } = meta
  const progressStr = `${progress}%`
  const humanSize = humanFileSize(contentSize)
  // const resizeTxt = '[ Resizing... ]'
  // <div className="progress-resize">{resizeTxt}</div>

  return (
    <div className="dz-preview dz-processing dz-image-preview col-md-2">
      <div className="dz-details">
        <div className="dz-filename"><span>{name}</span></div>
        { url && <img alt={name} src={url} style={{ width }} width={width} /> }
        <div className="dz-size">
          <span className="dz-size-value">{humanSize.value}</span>
          <span className="dz-size-unit">{humanSize.unit}</span>
        </div>
      </div>
      { progress &&
        <div className="dz-progress progress">
          <div className="progress-bar" role="progressbar"
            style={{ width: progressStr }}
            aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"
          >
            { progressStr }
          </div>
        </div>
      }
      <button role="button" className="dz-remove">Remove File</button>
    </div>
  )
}
ImageUploading.propTypes = {
  meta: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}
ImageUploading.defaultProps = {
  width: 300,
}
export default ImageUploading
