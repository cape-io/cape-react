import React, { PropTypes } from 'react'
import map from 'lodash/map'

import DropZone from './DropZone'
import Uploaded from './Uploaded'

function Images({ entity, width, subject }) {
  return (
    <div style={{ display: 'flex' }}>
      <DropZone prefix={[ 'dropZone', subject.id ]} subjectId={subject.id} predicate="image" />
      <div className="image-grid" style={{ display: 'flex' }}>
        { map(entity, (field, fieldId) =>
            <Uploaded
              key={fieldId}
              entity={field}
              width={width}
            />
          )
        }
      </div>
    </div>
  )
}
Images.propTypes = {
  // createNewField: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  // selectField: PropTypes.object.isRequired,
  // schema: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
}
Images.defaultProps = {
  width: 300,
}

export default Images
