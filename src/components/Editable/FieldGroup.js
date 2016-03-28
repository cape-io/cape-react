import React, { PropTypes } from 'react'
import { map } from 'lodash'

import Placeholder from '../Editable/Placeholder'

function Field({ description, label, value }) {
  if (value) return <div title={label}>{ value }</div>
  return <Placeholder label={label} description={description} />
}
Field.propTypes = {
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
}

function FieldGroup({ entity, fields, schema }) {
  return (
    <div className="row person-name">
    { map(fields, fieldId =>
        <Field
          value={entity[fieldId]}
          label={schema[fieldId].name}
          description={schema[fieldId].description}
        />
      )
    }
    </div>
  )
}
FieldGroup.propTypes = {
  entity: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
}
FieldGroup.defaultProps = {
  fields: [ 'additionalName', 'familyName', 'givenName', 'honorificPrefix', 'honorificSuffix' ],
}

export default FieldGroup
