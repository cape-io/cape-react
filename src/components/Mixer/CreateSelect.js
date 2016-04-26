import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'
import isString from 'lodash/isString'
import map from 'lodash/map'
import { Link } from 'redux-history-sync'

import Editable from '../Editable/Editable'
import EditableButtons from '../Editable/Buttons'
import Select from '../Editable/Select'
// Display a list of content types the user can edit.
function CreateSelect({ created, form, formEvent, id, label, options, type }) {
  const { value } = form

  return (
    <div>
      <Editable form={form} id={id} label={label} type={type}>
        <Select options={options} {...formEvent} />
        <EditableButtons
          onSubmit={formEvent.onSubmit}
          preventClose
          value={isString(value) ? value : options[0]}
        />
      </Editable>
      { created &&
        <ul>
          {
            map(created, entity => (
              <li key={entity.id}>
                {entity.type}
                <Link href={`/mixer/edit/${entity.id}`}>{entity.id}</Link>
              </li>
            ))
          }
        </ul>
      }
    </div>
  )
}
CreateSelect.propTypes = {
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  options: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
}
CreateSelect.defaultProps = {
  id: 'create-select-default',
}
export default connectField()(CreateSelect)
