import React, { PropTypes } from 'react'

// import { Link } from 'react-router'
import SortCollection from './SortCollection'

// Display a list of content types the user can edit.
function Sort({ collections, sortCard }) {
  return (
    <div className="container">
      <h1>Sorting</h1>
      {
        collections.map( ({ fieldInfo, values }) => (
          <SortCollection fieldInfo={fieldInfo} values={values} />
        ))
      }
    </div>
  )
}
Sort.propTypes = {
  collections: PropTypes.array,
}

export default Sort
