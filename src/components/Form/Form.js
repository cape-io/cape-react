import React, { PropTypes } from 'react'
import get from 'lodash/object/get'

import Input from './Input'
import ReduxFormProps from './ReduxFormProps'
import SubmitButtons from './SubmitButtons'
import Submitting from './Submitting'
import FieldGroup from './FieldGroup'

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
    submitting,
    valid,
    } = props
  const styles = {}
  const {
    description, entityId, formElements,
    uploadInfo, submit, title, id,
  } = formInfo

  return (
    <div>
      { title && <h2>{ title }</h2> }
      { description && <p className="lead">{ description }</p> }
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {
          formElements.map( elementGroup => {
            // Extract the fields we want access to from the element group.
            const groupInputs = elementGroup.type !== 'collection' &&
            elementGroup.fields.map( ({ infoKey, dataKey }) =>{
              // Grab the cape-form field stuff.
              const { hasAsyncValidate, ...other } = get(formInfo.field, infoKey)
              // Grab the redux-form stuff.
              const field = get(fields, dataKey)
              if (!field) {
                console.error(dataKey)
              }
              return (
                <Input
                  key={other.id}
                  asyncValidating={hasAsyncValidate && asyncValidating}
                  entityId={entityId}
                  field={field}
                  fieldId={dataKey}
                  styles={styles}
                  showFlags={showFlags}
                  {...other}
                  showErrors={dirty && (!!field.value || !active)}
                  uploadInfo={uploadInfo}
                  contentType={id}
                />
              )
            })
            return (
              <FieldGroup {...elementGroup} key={elementGroup.id}>
                { groupInputs }
              </FieldGroup>
            )
          })
        }
        {
          submitting ?
          <Submitting />
          :
          <SubmitButtons
            {...submit}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            invalid={invalid}
            pristine={pristine}
          />
        }
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
  showFlags: PropTypes.bool,
  valid: PropTypes.bool.isRequired,
  formInfo: PropTypes.object.isRequired,
}
Form.defaultProps = {
  showFlags: false,
}

export default Form
