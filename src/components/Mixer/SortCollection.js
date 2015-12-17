import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import Card from './Card'
// Display a list of content types the user can edit.
function SortCollection({ fieldInfo, values, moveCard }) {
  // What is the fieldId of the image?
  return (
    <div>
      <div key={fieldInfo.id}>{fieldInfo.id}</div>
      {
        values &&
        values.map( (value, index) => (
          <Card
            key={index}
            index={index}
            moveCard={moveCard}
            text={value.title}
          />
        ))
      }
    </div>
  )
}
SortCollection.propTypes = {
  fieldInfo: PropTypes.object,
  moveCard: PropTypes.func.isRequired,
  values: PropTypes.array,
}

export default SortCollection
