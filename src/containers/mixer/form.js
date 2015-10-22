import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import find from 'lodash.find';
import pluck from 'lodash.pluck';
import DocumentMeta from 'react-document-meta';
import { connectReduxForm } from 'redux-form';
import validate from '../../utils/formValidation';
import Form from '../../components/Form/Form';
import { updateMe } from '../../redux/modules/mixer';

// Redux connections.

function mapStateToProps(state, {params: {groupId, typeId}}) {
  const {fields, ...rest} = find(state.db.contentTypes, {groupId, typeId});
  // console.log(id);
  // state.db.contentTypes.find();
  return {
    ...rest,
    formFields: fields,
  };
}

// I'd really like to make this nicer. I hate the DocumentMeta thing.
// For now it is easier.
function Component({groupId, typeId, title, description, formFields, onSubmit, ...rest}) {
  const id = groupId + '/' + typeId;
  const formOptions = {
    form: id,
    fields: pluck(formFields, 'id'),
    validate: validate(formFields),
  };
  function handleSubmit(data) {
    console.log({id, ...data});
    onSubmit(groupId, typeId, data);
  }
  const FormEl = connectReduxForm(formOptions)(Form);
  return (
    <div className="container">
      <DocumentMeta title={title} />
      <h1>{ title }</h1>
      <p className="lead">{ description }</p>
      <FormEl
        formFields={formFields}
        onSubmit={handleSubmit}
        {...rest}
      />
    </div>
  );
}
Component.props = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  formFields: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, {onSubmit: updateMe})(Component);
