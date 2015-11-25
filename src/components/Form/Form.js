import React, { PropTypes } from 'react'

import Input from './Input'
import ReduxFormProps from './ReduxFormProps'
import SubmitButtons from './SubmitButtons'

function Form(props) {
  const {
    asyncValidating,
    dirty,
    fields,
    active,
    handleSubmit,
    formInfo,
    invalid,
    resetForm,
    pristine,
    showFlags,
    valid,
    } = props
  const styles = {}

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {
          formInfo.fields.map( fieldId => {
            const { id, hasAsyncValidate, ...other } = formInfo.field[fieldId]
            return (
              <Input
                key={fieldId}
                asyncValidating={hasAsyncValidate && asyncValidating}
                field={fields[fieldId]}
                styles={styles}
                showFlags={showFlags}
                {...other}
              />
            )
          })
        }
        <SubmitButtons
          {...formInfo.submit}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />
      </form>

      <ReduxFormProps {...{ active, dirty, pristine, valid, invalid }} />
    </div>
  )
}
Form.propTypes = {
  active: PropTypes.string,
  asyncValidating: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  showFlags: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  formInfo: PropTypes.object.isRequired,
}
Form.defaultProps = {
  showFlags: false,
}

export default Form
