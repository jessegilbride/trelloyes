import React from 'react';
import Card from './Card'
import PropTypes from 'prop-types'
import './List.css';

function List(props) {
  return (
    <section className="List">
      <header className="List-header">
        <h2>{props.header}</h2>
      </header>
      <div className="List-cards">
      {props.cards.map((card) =>
          <Card
            key={card.id}
            title={card.title}
            content={card.content}
          />
        )}
        <button type="button" className="List-add-button">+ add a card</button>
      </div>
    </section>
  )
}

List.defaultProps = {
  header: "list header",
  cards: [
    {
      title: "card title",
      content: "card content"
    }
  ]
}

List.propTypes = {
  header: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
}

export default List
