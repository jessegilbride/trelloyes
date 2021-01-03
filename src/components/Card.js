import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card(props) {
  return (
    <div className="Card">
      <button type="button">delete</button>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}

Card.defaultProps = {
  title: "Card",
  content: "(content)"
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Card