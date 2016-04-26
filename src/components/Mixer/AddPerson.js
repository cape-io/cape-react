import React, { PropTypes } from 'react'
import map from 'lodash/map'

import SelectEl from '../Editable/InputSelect'
import Input from '../Editable/Field'

import { schemaProps, toOptions } from '../../redux/select/mixer'

function AddPerson({ fields, schema }) {
  const options = toOptions(fields, schema)
  return (
    <div>
      <h3>Add Person</h3>
      <ul>
        { map(fields, item => <li key={item.id}>{item.alternateName}</li>) }
      </ul>
      <SelectEl options={options} prefix={[ 'AddPerson', 'predicate' ]} schema={schema} />
      <Input
        prefix={[ 'AddPerson', 'email' ]}
        id="email"
        {...schemaProps(schema.email)}
      />
    </div>
  )
}
AddPerson.propTypes = {
  fields: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
}
AddPerson.defaultProps = {
}
export default AddPerson
