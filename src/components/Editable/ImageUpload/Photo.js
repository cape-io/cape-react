import React, { PropTypes } from 'react'
import classNames from 'classnames'
import map from 'lodash/map'

import ImageUploading from './ImageUploading'
import StaticVal from '../StaticVal'

function Photo(props) {
  const { accept, error, focus, handleFileHover, handleFileSelect, id, inputId, meta,
    progress, url, warningMsg,
  } = props
  const width = 300
  const className = classNames('dropzone', 'jumbotron', {
    'alert-danger': error,
    'alert-info hover': focus,
  })

  let txtClassName = 'help'
  let imgTxt = 'Click here or drop in a new JPG to upload.'
  if (error) {
    txtClassName = 'error'
    imgTxt = error
  } else if (warningMsg) {
    txtClassName = 'warning'
    imgTxt = warningMsg
  }

  function activateFileSelect() {
    document.getElementById(inputId).click()
  }

  return (
    <div
      className={className} onDragOver={handleFileHover}
      onDragLeave={handleFileHover} onDrop={handleFileSelect}
      onClick={ activateFileSelect } id="filedrag"
    >
      <div className="row">
        { progress && url &&
          <div className="dz-images thumbnail col-md-6">
            <ImageUploading progress={progress} meta={meta} url={url} width={width} />
          </div>
        }
        { url && !progress &&
          <div className="dz-image col-md-6">
            <img className="thumbnail" src={url} alt={id} style={{ width }} width={width} />
          </div>
        }
        <ul className="col-md-6">
          <StaticVal value={id} label="ID" />
          { meta && map(meta, (val, label) => <StaticVal key={label} value={val} label={label} />) }
        </ul>
      </div>
      { !meta && <p className={txtClassName}>{ imgTxt }</p> }
      <input type="file" id={inputId} name="fileselect"
        accept={accept} onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  )
}

Photo.propTypes = {
  accept: PropTypes.string.isRequired,
  error: PropTypes.string,
  focus: PropTypes.bool.isRequired,
  handleFileHover: PropTypes.func.isRequired,
  handleFileSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  meta: PropTypes.object,
  imgInfo: PropTypes.object,
  progress: PropTypes.number,
  url: PropTypes.string,
  value: PropTypes.object,
}

export default Photo
