import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import CardDisplay from './CardDisplay';
import Navbar from './navbar';

import '../App.scss';

const App = () => {
  const [deckId, setDeckId] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => {
        setDeckId(response.data.deck_id);
      });
  }, []);

  async function drawCards() {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );

    if (response.data.remaining === 0) {
      await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      drawCards();
    }

    setCards(response.data.cards);
  }

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
