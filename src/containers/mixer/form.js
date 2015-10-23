import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash.find';
import pluck from 'lodash.pluck';
import DocumentMeta from 'react-document-meta';
import { connectReduxForm } from 'redux-form';
import validate from '../../utils/formValidation';
import Form from '../../components/Form/Form';
import { updateMe, loadFormValues } from '../../redux/modules/mixer';

// Redux connections.

function mapStateToProps(state, {params: {groupId, typeId}}) {
  const { db: { contentTypes }, mixer } = state;
  const {fields, ...rest} = find(contentTypes, {groupId, typeId});
  // console.log(id);
  // state.db.contentTypes.find();
  return {
    ...rest,
    formFields: fields,
    initialValues: mixer[groupId] && mixer[groupId][typeId],
  };
}

// I'd really like to make this nicer. I hate the DocumentMeta thing.
// For now it is easier.
class MixerForm extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    formFields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
  }
  // This static method is called on the component before it is mounted.
  // Or so I'm told.
  static fetchDataDeferred(getState, dispatch) {
    // We need mixer and router from state.
    const { auth: { user }, mixer, router: { params } } = getState();
    // Pull group and type from router params.
    const { groupId, typeId } = params;
    // Check to see if we have data for this form already.
    const isLoaded = mixer[groupId] && mixer[groupId][typeId];
    if (!isLoaded) {
      return dispatch(loadFormValues(groupId, typeId, user.name));
    }
  }
  render() {
    const {
      description, formFields, groupId,
      typeId, title, initialValues,
      onSubmit,
      ...rest,
      } = this.props;
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
    // There should be a wrapper component and then the FormEl should be the child.
    return (
      <div className="container">
        <DocumentMeta title={title} />
        <h1>{ title }</h1>
        <p className="lead">{ description }</p>
        <FormEl
          formFields={formFields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          {...rest}
        />
      </div>
    );
  }
}

// Component.props = ;
export default connect(mapStateToProps, {onSubmit: updateMe})(MixerForm);
