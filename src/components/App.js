import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import CardDisplay from './CardDisplay';
import Navbar from './navbar';
import useDeck from '../hooks/useDeck';

import '../App.scss';

const App = () => {
  const { cards, drawCards } = useDeck();

  useEffect(() => {
    drawCards();
  }, [drawCards]);

  return (
    <div className="App">
      <Navbar />
      <h3>Ace is 14!</h3>
      {cards.length > 0 && <CardDisplay cards={cards} />}
      <p>
        <Button onClick={drawCards} variant="primary">
          Draw Cards
        </Button>
      </p>
    </div>
  );
};

export default App;
