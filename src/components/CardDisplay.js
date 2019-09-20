import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Card from './card';

const CardDisplay = ({ cards }) => {
  const [cardOne, cardTwo] = cards;

  function getValue(card) {
    switch (card.value) {
      case 'JACK':
        return 11;
      case 'QUEEN':
        return 12;
      case 'KING':
        return 13;
      case 'ACE':
        return 14;
      default:
        return parseInt(card.value);
    }
  }

  function getWinner(val1, val2) {
    if (val1 === val2) {
      return "It's a tie!";
    }
    return `Player ${val1 > val2 ? '1' : '2'} wins!`;
  }

  const cardOneValue = getValue(cardOne);
  const cardTwoValue = getValue(cardTwo);

  return (
    <Row>
      <Col xs={6}>
        <Card card={cardOne} />
        <p>{cardOneValue}</p>
      </Col>
      <Col xs={6}>
        <Card card={cardTwo} />
        <p>{cardTwoValue}</p>
      </Col>
      <Col xs={12}>{getWinner(cardOneValue, cardTwoValue)}</Col>
    </Row>
  );
};

CardDisplay.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
};

export default CardDisplay;
