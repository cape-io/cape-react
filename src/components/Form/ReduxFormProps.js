import React, { PropTypes } from 'react'

function ReduxFormProps({ active, dirty, pristine, valid, invalid, submitting }) {
  return (
    <div>
      <h4>Props from redux-form!</h4>

      <table className="table table-striped">
        <tbody>
        <tr>
          <th>Active Field</th>
          <td>{active}</td>
        </tr>
        <tr>
          <th>Dirty</th>
          <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Pristine</th>
          <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Valid</th>
          <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Invalid</th>
          <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Submitting</th>
          <td className={submitting ? 'success' : 'warning'}>{submitting ? 'true' : 'false'}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
ReduxFormProps.propTypes = {
  active: PropTypes.string,
  dirty: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
}

export default ReduxFormProps
