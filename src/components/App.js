import React, { Component } from 'react';
import axios from 'axios';
import { Button, Col, Grid, Row } from 'react-bootstrap';

import Card from './card';
import Navbar from './navbar';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: '',
      cards: '',
      remaining: ''
    }
  }

  componentDidMount() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(deck => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=2`)
          .then(cards => {
            this.setState({
              deck_id: cards.data.deck_id,
              cards: cards.data.cards,
              remaining: cards.data.remaining
            })
          })
      })
      .catch(err => {
        console.log(err);
      });
  }

  drawAgain = () => {
    this.setState({ cards: '' })
    if (this.state.remaining === 0) {
      axios.get(`https://cors-anywhere.herokuapp.com/https://deckofcardsapi.com/api/deck/${this.state.deck_id}/shuffle`)
        .then((cards) => {
          console.log(cards.data);
          this.drawAgain();
          this.setState({ remaining: 52 })
        })
    } else {
      axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=2`)
        .then(cards => {
          console.log(cards.data.remaining);
          this.setState({
            cards: cards.data.cards,
            remaining: cards.data.remaining
          })
        });
    }
  }

  getValue(card) {
    switch (card) {
      case 'JACK':
        return 11;
      case 'QUEEN':
        return 12;
      case 'KING':
        return 13;
      case 'ACE':
        return Math.random() > .5 ? 14 : 1;
      default:
        return card
    }
  }

  winner = (val1, val2) => {
    let p1 = Number(val1);
    let p2 = Number(val2);
    let winner;

    if (p1 > p2) {
      winner = "Player 1 wins!"
    } else if (p1 < p2) {
      winner = "Player 2 wins!"
    } else {
      winner = "It's a tie!"
    }
    return winner;
  }

  render() {
    let { cards } = this.state;

    if (!cards) {
      return (
        <div className="App">
          <Navbar brand='High Card' />
          <h3>Ace can be high or low card!</h3>
          <p>Drawing cards...</p>
        </div>
      );
    }

    let val0 = this.getValue(cards[0].value);
    let val1 = this.getValue(cards[1].value);

    return (
      <div className="App">
        <Navbar brand='High Card' />
        <h3>Ace can be 1 or 14!</h3>
        <Grid className='Cards'>
          <Row>
            <Col xs={6}>
              <Card card={cards[0]} />
              <p>{val0}</p>
            </Col>
            <Col xs={6}>
              <Card card={cards[1]} />
              <p>{val1}</p>
            </Col>
            <Col xs={12}>{this.winner(val0, val1)}</Col>
          </Row>
        </Grid>
        <p>
          <Button onClick={this.drawAgain} bsStyle="primary">Draw</Button>
        </p>
      </div>
    );
  }
}

export default App;
