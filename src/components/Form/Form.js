import React, { PropTypes } from 'react'
import get from 'lodash/object/get'

import Input from './Input'
import ReduxFormProps from './ReduxFormProps'
import SubmitButtons from './SubmitButtons'
import { getField } from '../../utils/forms'

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
  const { uploadInfo, submit } = formInfo

  return (
    <div>
      <h2>{ formInfo.title }</h2>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {
          formInfo.fields.map( fieldId => {
            const { hasAsyncValidate, ...other } = getField(formInfo.field, fieldId)
            const field = get(fields, fieldId)
            return (
              <Input
                key={fieldId}
                asyncValidating={hasAsyncValidate && asyncValidating}
                field={field}
                styles={styles}
                showFlags={showFlags}
                {...other}
                showErrors={dirty && (field.value || !active)}
                uploadInfo={uploadInfo}
              />
            )
          })
        }
        <SubmitButtons
          {...submit}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          invalid={invalid}
        />
      </form>

      { showFlags &&
        <ReduxFormProps {...{ active, dirty, pristine, valid, invalid }} />
      }
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
