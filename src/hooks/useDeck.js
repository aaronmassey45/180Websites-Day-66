import axios from 'axios';
import { useState, useRef, useCallback } from 'react';

const useDeck = () => {
  const [cards, setCards] = useState([]);
  const deckId = useRef(null);

  const getTwoCards = async () => {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=2`
    );

    if (response.data.remaining <= 10) {
      axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/`
      );
    }

    setCards(response.data.cards);
  };

  const drawCards = useCallback(() => {
    if (!deckId.current) {
      axios
        .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
          deckId.current = response.data.deck_id;
        })
        .then(() => getTwoCards());
    } else {
      getTwoCards();
    }
  }, []);

  return { cards, drawCards };
};

export default useDeck;
