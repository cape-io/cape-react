import { connect } from 'react-redux'
import forEach from 'lodash/forEach'
// import { getFieldState } from 'redux-field'
import Component from '../components/Mixer/Edit'
import { activeEntityIdSelector, selectSXXincludeObject } from '../redux/triple'
function mapStateToProps(state, ownProps) {
  // const formId = 'writeEntity'
  const { entity: { cape }, triple } = state
  const graph = {
    entity: cape,
    triple,
  }
  const kids = selectSXXincludeObject(graph, ownProps)
  const entityId = activeEntityIdSelector(state, ownProps)
  const entity = cape[entityId]
  // Get everything where entity is a subject.
  // const formState = form[formId]
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
  forEach(kids, kid => {
    const obj = kid.object
    field[obj.id] = {
      id: obj.id,
      editable: true,
      label: obj.type,
    }
    entity[obj.id] = obj.value || obj.dateCreated
    fields.push(obj.id)
  })
  return {
    entity,
    field,
    fields,
  }
}

export default connect(mapStateToProps)(Component)
