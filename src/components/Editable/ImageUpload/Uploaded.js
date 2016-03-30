import React, { PropTypes } from 'react'
// import Inspector from 'react-json-inspector'
// <Inspector className="col-md-8" data={entity} />

function PhotoUploaded({ entity, width }) {
  const { url, id } = entity
  const src = url && `${url}?w=${width}` || null
  return (
    <div>
      <img className="thumbnail" src={src} alt={id} style={{ width }} width={width} />
    </div>
  )
}

PhotoUploaded.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  width: PropTypes.number.isRequired,
}
PhotoUploaded.defaultProps = {
  width: 300,
}
export default PhotoUploaded
