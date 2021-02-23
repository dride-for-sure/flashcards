import React from 'react';
import { gameType, onCardAnsweredType } from '../../../types/types';
import { Button, Container } from './styles';

export default function FlashCard({ game, onCardAnswered }) {
  const cardLevel = (level) => {
    if (level === '3') {
      return '🤯';
    } if (level === '2') {
      return '💪';
    }
    return '🥱';
  };

  return (
    <>
      {
        game.cards.map((card) => (
          <Container
            status={card.status}
            level={card.level}
            key={card.id}>
            <span>
              {cardLevel(card.level)}
            </span>
            <h1>
              {card.title}
            </h1>
            <span>{card.description}</span>
            <span>
              <Button
                onClick={() => { onCardAnswered(card.id, 0); }}>
                👉
                {card.answers.a}
              </Button>
              <Button
                onClick={() => { onCardAnswered(card.id, 1); }}>
                👉
                {card.answer.b}
              </Button>
            </span>
          </Container>
        ))
      }
    </>
  );
}

FlashCard.propTypes = {
  game: gameType.isRequired,
  onCardAnswered: onCardAnsweredType.isRequired,
};
