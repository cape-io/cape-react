import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import find from 'lodash.find';
import pluck from 'lodash.pluck';
import DocumentMeta from 'react-document-meta';
import { connectReduxForm } from 'redux-form';
import formValidation from '../../utils/formValidation';
import Form from '../../components/Form/Form';

// Define our custom functions and action handlers.
// Move to another file someday/somehow?

// function asyncValidate(data) {
//   // TODO: figure out a way to move this to the server. need an instance of ApiClient
//   if (!data.email) {
//     return Promise.resolve({});
//   }
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const errors = {};
//       if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
//         errors.email = 'Email address already used';
//       }
//       reject(errors);
//     }, 1000);
//   });
// }

// function handleSubmit(data) {
//   window.alert('Data submitted! ' + JSON.stringify(data));
//   return initialize('survey', {});
// }
//
// function handleInitialize() {
//   return initialize('survey', {
//     name: 'Little Bobby Curry',
//     email: 'bobby@gmail.com',
//     occupation: 'Redux Wizard',
//     currentlyEmployed: true,
//     sex: 'male',
//   });
// }

// const actionCreators = {
//   onSubmit: handleSubmit,
//   handleInitialize,
// };

// const reduxFormOptions = {
//   form: 'survey',
//   fields: pluck(formFields, 'id'),
//   validate: formValidation,
//   asyncValidate,
//   asyncBlurFields: ['email'],
// };

// Redux connections.

function mapStateToProps(state, {params: {id}}) {
  const {title, description, fields} = find(state.db.contentTypes, {id});
  // console.log(id);
  // state.db.contentTypes.find();
  return {
    id,
    title,
    description,
    formFields: fields,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     ...bindActionCreators(actionCreators, dispatch),
//     dispatch,
//   };
// }

// function handleSubmit(id) {
//   return (data) => {
//     window.alert('See console for data.');
//     console.log(data);
//     initialize(id, {});
//   };
// }

// I'd really like to make this nicer. I hate the DocumentMeta thing.
// For now it is easier.
function Component({id, title, description, formFields}) {
  const formOptions = {
    form: id,
    fields: pluck(formFields, 'id'),
    validate: formValidation(formFields),
  };
  const FormEl = connectReduxForm(formOptions)(Form);
  return (
    <div className="container">
      <DocumentMeta title={title} />
      <h1>{ title }</h1>
      <p className="lead">{ description }</p>
      <FormEl formFields={formFields} />
    </div>
  );
}
Component.props = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  formFields: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(Component);
