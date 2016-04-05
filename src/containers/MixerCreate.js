import { connect } from 'react-redux'
// import groupBy from 'lodash/groupBy'
// import values from 'lodash/values'
// import { getFieldState } from 'redux-field'

import Component from '../components/Mixer/CreateSelect'
// import { selectUid } from '../redux/auth'
// import { selectEntity } from '../redux/graph'
import { classOptions } from '../redux/schema'

function mapStateToProps(state) {
  // const me = selectEntity(selectUid)(state)
  // Pick an entity to edit or create a new one.
  const formId = 'writeEntity'
  const classList = classOptions(state)
  // const { entity: { cape }, form } = state
  // const fieldState = getFieldState(form, [ formId, 'type' ])
  // console.log(fieldState)
  return {
    editable: true,
    label: 'Entity Class Type',
    id: 'type',
    options: classList,
    required: true,
    type: 'select',
    formId,
    title: 'Create Entity',
    // entity: groupBy(values(cape), 'type'),
  }
}

export default connect(mapStateToProps)(Component)
