import { connect } from 'react-redux'
// import forEach from 'lodash/forEach'
import Component from '../components/Mixer/Edit'
import { selectUid } from '../redux/auth'
import { selectEntity, selectSXXincludeObject } from '../redux/graph'

function mapStateToProps(state) {
  const entityId = selectUid(state)
  const subject = selectEntity(selectUid)(state)
  // console.log(entityId, subject)
  if (!subject) return {}
  const objects = selectSXXincludeObject(selectUid)(state)
  const selectField = {
    editable: true,
    label: 'Add new field',
    id: entityId,
    formId: 'writeObject',
    options: [
      'name',
      'email',
      'description',
    ],
    required: true,
    type: 'select',
  }

  return {
    selectField,
    objects,
    subject,
  }
}

export default connect(mapStateToProps)(Component)
