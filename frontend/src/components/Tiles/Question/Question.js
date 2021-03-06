import { func } from 'prop-types';
import React from 'react';
import getColorByDifficulty from '../../../common/handleDifficultyColor';
import { questionListItemType } from '../../../types/types';
import Button from '../../Buttons/Button';
import Tiles from '../Tiles';
import Container from './styled';

export default function Question({ question, onSendAnswer }) {
  return (
    <Tiles
      bg={getColorByDifficulty(question.difficulty)}
      status={question.status}
      checked={question.points > 0}>
      <Container
        disabled={question.status !== 'SELECTED'}>
        <span>{question.icon}</span>
        <h1>{question.category}</h1>
        <span>{question.question}</span>
        <Button
          disabled={question.status !== 'SELECTED'}
          onClick={() => onSendAnswer(question.id, 'A')}>
          👉
          {question.answers[0]}
        </Button>
        <Button
          disabled={question.status !== 'SELECTED'}
          onClick={() => onSendAnswer(question.id, 'B')}>
          👉
          {question.answers[1]}
        </Button>
      </Container>
    </Tiles>
  );
}

Question.propTypes = {
  question: questionListItemType.isRequired,
  onSendAnswer: func.isRequired,
};
