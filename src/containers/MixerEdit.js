import { connect } from 'react-redux'
import { getFieldState } from 'redux-field'
import Component from '../components/Mixer/Edit'

function mapStateToProps(state, ownProps) {
  const formId = 'writeEntity'
  const { entity: { cape }, form } = state
  const { entityId } = ownProps.route.params
  const entity = cape[entityId]
  const formState = form[formId]
  const field = {
    type: {
      editable: true,
      label: 'Add new field',
      id: 'type',
      options: [
        'name',
        'email',
        'description',
      ],
      required: true,
      type: 'select',
    },
    dateCreated: {
      editable: false,
      id: 'dateCreated',
      label: 'Date Created',
    },
  }
  const fields = [ 'dateCreated' ]
  return {
    entity,
    field,
    fields,
  }
}

export default connect(mapStateToProps)(Component)
