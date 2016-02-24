import React, { PropTypes } from 'react'
import map from 'lodash/map'
import EntityList from './EntityList'

// Display a list of content types the user can edit.
function EntitySelect({ entity }) {
  return (
    <div>
      { map(entity, (items, type) => <EntityList items={items} type={type} key={type} />) }
    </div>
  )
}
EntitySelect.propTypes = {
  entity: PropTypes.object.isRequired,
}
EntitySelect.defaultProps = {
}
export default EntitySelect
