import { connect } from 'react-redux'
// import get from 'lodash/get'
// import forEach from 'lodash/forEach'
// import { getFieldState } from 'redux-field'
// import Component from 'react-json-inspector'

// import Component from '../components/Loading'
import Component from '../components/Mixer/Edit'
import { selectTriples } from '../redux/select/mixer'

function mapStateToProps(state, ownProps) {
  // const { entity: { cape }, triple } = state
  // const graph = {
  //   entity: cape,
  //   triple,
  // }
  // const kids = selectSXXincludeObject(graph, ownProps)
  // const entityId = activeEntityIdSelector(state, ownProps)
  // const entity = cape[entityId]
  // // Get everything where entity is a subject.
  // // const formState = form[formId]
  // const field = {
  //   type: {
  //     editable: true,
  //     label: 'Add new field',
  //     id: entityId,
  //     formId: 'writeObject',
  //     options: [
  //       'name',
  //       'email',
  //       'description',
  //     ],
  //     required: true,
  //     type: 'select',
  //   },
  //   dateCreated: {
  //     editable: false,
  //     id: 'dateCreated',
  //     label: 'Date Created',
  //     type: 'text',
  //   },
  // }
  // const fields = [ 'dateCreated' ]
  // forEach(kids, kid => {
  //   const obj = kid.object
  //   field[obj.id] = {
  //     id: `${obj.id}/value`,
  //     editable: true,
  //     formId: obj.id,
  //     label: obj.type,
  //     type: 'text',
  //   }
  //   entity[obj.id] = obj.value
  //   fields.push(obj.id)
  // })
  // return {
  //   entity,
  //   field,
  //   fields,
  // }
  return selectTriples(state, ownProps)
}

export default connect(mapStateToProps)(Component)
