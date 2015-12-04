import React, { PropTypes } from 'react'

function FieldGroup(props) {
  const { children, groupData, type, id, label, help } = props
  const addItemTxt = type === 'collection' ? `Add ${label} Item` : null
  function addCollectionItem(event) {
    event.preventDefault()
    groupData.addField()
  }
  return (
    <div id={id} className={'panel panel-default form-' + type}>
      { label && <div className="panel-heading"><h4>{ label }</h4></div> }
      <div className="panel-body">
      { help && <p className="help">{ help }</p> }
      { addItemTxt &&
        <button onClick={addCollectionItem}>
          { addItemTxt }
        </button>
      }
      { !!groupData.length && `${groupData.length} Items` }
      { children ? children : <p>No Items</p>}
      </div>
    </div>
  )
}

FieldGroup.propTypes = {
  children: PropTypes.node,
  groupData: PropTypes.object,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
}
FieldGroup.defaultProps = {
}
export default FieldGroup
