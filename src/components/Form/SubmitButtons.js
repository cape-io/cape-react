import React, { PropTypes } from 'react'

import Icon from '../Icon'

function SubmitButtons(props) {
  const { invalid, showReset, icon, text, resetForm, handleSubmit, pristine, showSubmit } = props
  const resetText = 'Reset'
  return (
    <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
        { showSubmit &&
          <button className="btn btn-success" onClick={handleSubmit} disabled={invalid}>
            <Icon symbol={ icon || 'check' } hidden />
            { ' ' }
            { text || 'Submit' }
          </button>
        }
        {
          showReset && resetForm &&
          <button
            className="btn btn-warning"
            onClick={resetForm} style={{ marginLeft: 15 }} disabled={pristine}
          >
            <Icon symbol="remove" hidden />
            { ' ' }
            { resetText }
          </button>
        }

      </div>
    </div>
  )
}

SubmitButtons.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string,
  invalid: PropTypes.bool,
  text: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  resetForm: PropTypes.func,
  showReset: PropTypes.bool.isRequired,
  showSubmit: PropTypes.bool.isRequired,
}
SubmitButtons.defaultProps = {
  showSubmit: true,
}
export default SubmitButtons
