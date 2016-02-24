import { connect } from 'react-redux'
import mapValues from 'lodash/mapValues'
import merge from 'lodash/merge'

import Component from '../components/Profile'
import { fieldValidation } from '../utils/formValidation'

function mapStateToProps(state) {
  const id = {
    id: 'id',
    editable: false,
    label: 'ID',
    index: 0,
  }
  const email = {
    id: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    validators: [ 'isRequired', 'isEmail' ],
    index: 1,
  }
  const name = {
    id: 'name',
    type: 'text',
    label: 'Name',
    required: true,
    validators: [ 'isRequired' ],
    index: 2,
  }
  const info = {
    field: {
      email,
      id,
      name,
    },
    // The calculated order of the fields based on index property.
    fields: [ 'id', 'email', 'name' ],
  }
  // Apply validate function.
  const field = mapValues(info.field, item =>
    merge(item, { validate: fieldValidation(item.validators) })
  )
  return {
    entity: state.entity && state.entity.profile,
    field,
    fields: info.fields,
    // form: state.form.profile,
    prefix: 'profile',
    profile: state.profile,
  }
}
// const mapDispatchToProps = {
// }
export default connect(mapStateToProps)(Component)
