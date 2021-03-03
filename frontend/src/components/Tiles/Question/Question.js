import { func } from 'prop-types';
import React from 'react';
import { questionListItemType } from '../../../types/types';
import { Button, Container } from './styles';

export default function Question({ question, onSendAnswer }) {
  return (
    <Container
      status={question.status}
      difficulty={question.difficulty}
      key={question.id}>
      <span>{question.icon}</span>
      <h1>{question.category}</h1>
      <span>{question.question}</span>
      <span>
        <Button
          onClick={() => onSendAnswer(question.id, 'A')}>
          👉
          {question.answers[0]}
        </Button>
        <Button
          onClick={() => onSendAnswer(question.id, 'B')}>
          👉
          {question.answers[1]}
        </Button>
      </span>
    </Container>
  );
}

Question.propTypes = {
  question: questionListItemType.isRequired,
  onSendAnswer: func.isRequired,
};
