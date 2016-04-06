import { connect } from 'react-redux'
// import groupBy from 'lodash/groupBy'
// import values from 'lodash/values'
// import { getFieldState } from 'redux-field'

import Component from '../components/Mixer/CreateSelect'
import { classOptions } from '../redux/schema'
import { selectMyCreated } from '../redux/select/mixer'

function mapStateToProps(state) {
  // const me = selectEntity(selectUid)(state)
  // Pick an entity to edit or create a new one.
  const classList = classOptions(state)
  const created = selectMyCreated(state)
  // console.log('created', created)
  return {
    created,
    editable: true,
    label: 'Entity Class Type',
    id: 'type',
    options: classList,
    required: true,
    type: 'select',
    prefix: [ 'writeEntity', 'type' ],
    title: 'Create Entity',
    // entity: groupBy(values(cape), 'type'),
  }
}

export default connect(mapStateToProps)(Component)
