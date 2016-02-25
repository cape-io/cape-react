import React, { PropTypes } from 'react'
import map from 'lodash/map'
import { Link } from 'redux-history-sync'
// Display a list of content types the user can edit.
function EntitySelect({ items, type }) {
  return (
    <div>
      <h3>{type}</h3>
      <ul>
        { map(items, item =>
          <li key={item.id}><Link to={`/mixer/${item.id}`}>{item.id}</Link></li>)
        }
      </ul>
    </div>
  )
}
EntitySelect.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}
EntitySelect.defaultProps = {
}
export default EntitySelect
