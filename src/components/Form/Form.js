import React, { PropTypes } from 'react';
import Input from './Input';
import ReduxFormProps from './ReduxFormProps';

function SurveyForm(props) {
  const {
    asyncValidating,
    dirty,
    fields,
    active,
    handleSubmit,
    formFields,
    invalid,
    resetForm,
    pristine,
    valid,
    } = props;
  const styles = require('./Form.scss');

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {
          formFields.map( ({id, hasAsyncValidate, ...other}) => (
            <Input
              key={id}
              asyncValidating={hasAsyncValidate && asyncValidating}
              field={fields[id]}
              styles={styles}
              showFlags
              {...other}
            />
          ))
        }

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-success" onClick={handleSubmit}>
              <i className="fa fa-paper-plane"/> Submit
            </button>
            <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
              <i className="fa fa-undo"/> Reset
            </button>
          </div>
        </div>
      </form>

      <ReduxFormProps {...{active, dirty, pristine, valid, invalid}} />
    </div>
  );
}
SurveyForm.propTypes = {
  active: PropTypes.string,
  asyncValidating: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  formFields: PropTypes.array.isRequired,
};
SurveyForm.defaultProps = {};

export default SurveyForm;
