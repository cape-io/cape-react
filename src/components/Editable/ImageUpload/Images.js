import React, { PropTypes } from 'react'
import map from 'lodash/map'

import DropZone from './DropZone'
import Uploaded from './Uploaded'

function Images({ entity, entityPut, subject, triplePut, width }) {
  return (
    <div style={{ display: 'flex' }}>
      <DropZone
        entityPut={entityPut}
        predicate="image"
        prefix={[ 'dropZone', subject.id ]}
        subject={subject}
        triplePut={triplePut}
      />
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
  entityPut: PropTypes.func.isRequired,
  // selectField: PropTypes.object.isRequired,
  // schema: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  triplePut: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}
Images.defaultProps = {
  width: 300,
}

export default Images
