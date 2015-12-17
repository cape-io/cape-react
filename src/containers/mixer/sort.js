import { connect } from 'react-redux'
import { compose } from 'redux'
import forEach from 'lodash/collection/forEach'
// import { DragDropContext } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'

import Component from '../../components/Mixer/Container'
// import { loadForm } from '../../redux/actions'
import { getContentInfo, moveCard, saveCards } from '../../redux/modules/mixer'

// Redux connections.
function mapStateToProps(state, props) {
  const { form, initialValues } = getContentInfo(state, props)
  let collections = []
  if (form.field) {
    forEach(form.field, (fieldInfo) => {
      if (fieldInfo.type === 'collection') {
        collections.push({
          fieldInfo,
          values: initialValues[fieldInfo.id],
        })
      }
    })
  }
  return {
    collections,
    cards: state.mixer.cards,
  }
}

const mapDispatchToProps = {
  moveCard,
  saveCards,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // DragDropContext(HTML5Backend)
)(Component)
