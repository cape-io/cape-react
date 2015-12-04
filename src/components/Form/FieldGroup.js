import React, { PropTypes } from 'react'

function FieldGroup(props) {
  const { children, type, id, label, help } = props
  const addItemTxt = type === 'collection' ? `Add ${label} Item` : null
  return (
    <div id={id} className={'form-' + type}>
      { label && <h4>{ label }</h4> }
      { help && <p className="help">{ help }</p> }
      { addItemTxt && <button>{ addItemTxt }</button> }
      { children ? children : <p>No Items</p>}
    </div>
  )
}

FieldGroup.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
}
FieldGroup.defaultProps = {
}
export default FieldGroup
