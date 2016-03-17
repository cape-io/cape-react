import React, { PropTypes } from 'react'
import Inspector from 'react-json-inspector'

function Photo(props) {
  const { url, id } = props
  const width = 300
  return (
    <div className="row">
      <div className="col-md-4">
        <img className="thumbnail" src={url} alt={id} style={{ width }} width={width} />
      </div>
      <Inspector className="col-md-8" data={props} />
    </div>
  )
}

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Photo
