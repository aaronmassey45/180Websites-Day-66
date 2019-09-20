import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

const Card = ({ card: { image, value, suit } }) => (
  <Image className="Card" src={image} alt={`${value} of ${suit}`} fluid />
);

Card.propTypes = {
  card: PropTypes.shape({
    image: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};

export default Card;
