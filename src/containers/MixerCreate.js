import { connect } from 'react-redux'
import groupBy from 'lodash/groupBy'
import values from 'lodash/values'
import { getFieldState } from 'redux-field'
import Component from '../components/Mixer/Mixer'
import { selectUid } from '../redux/auth'
import { selectEntity } from '../redux/graph'

function mapStateToProps(state) {
  console.log(selectEntity(selectUid)(state))
  // Pick an entity to edit or create a new one.
  const formId = 'writeEntity'
  const { entity: { cape }, form } = state
  const { id } = getFieldState(form, [ formId, 'type' ])
  return {
    create: {
      field: {
        editable: true,
        label: 'Entity Class',
        id: 'type',
        options: [
          'Person',
          'Organization',
          'WebApplication',
        ],
        required: true,
        type: 'select',
      },
      formId,
    },
    id,
    title: 'Create Entity',
    entity: groupBy(values(cape), 'type'),
  }
}

export default connect(mapStateToProps)(Component)
