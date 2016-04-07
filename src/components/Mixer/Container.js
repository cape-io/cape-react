import React, { Component } from 'react'
import update from 'react/lib/update'
import Card from './Card'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const style = {
  width: 400,
}

// @DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cards, moveCard, saveCards } = this.props

    return (
      <div style={style}>
        {cards.map((card, index) => {
          return (
            <Card
              key={card.id}
              index={index}
              id={card.id}
              text={card.text}
              moveCard={moveCard}
              save={saveCards}
            />
          )
        })}
      </div>
    )
  }
}
