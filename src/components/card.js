import React from 'react';
import { Image } from 'react-bootstrap';

const Card = (props) => {
  let {image, value, suit} = props.card;
  return (
      <Image className='Card' src={image} alt={`${value} of ${suit}`} responsive/>
  );
}

export default Card;
