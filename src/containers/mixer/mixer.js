import { connect } from 'react-redux';
import Component from '../../components/Mixer/Mixer';

// Redux connections.

function mapStateToProps(state) {
  return {
    contentTypes: state.db.contentTypes.map(({id, title}) => ({id, title})),
  };
}

export default connect(mapStateToProps)(Component);
