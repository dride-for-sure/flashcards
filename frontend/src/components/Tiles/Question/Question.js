import React from 'react';
import { funcType, questionType } from '../../../types/types';
import { Button, Container } from './styles';

export default function Question({ question, onClick }) {
  const levelIcon = (level) => {
    if (level === 'hard') {
      return '🤯';
    } if (level === 'moderat') {
      return '💪';
    }
    return '🥱';
  };

  return (
    <Container
      status={question.status}
      level={question.level}
      key={question.id}>
      <span>
        {levelIcon(question.level)}
      </span>
      <h1>
        {question.subject}
      </h1>
      <span>{question.question}</span>
      <span>
        <Button
          onClick={onClick(question.id, 'A')}>
          👉
          {question.choices[0]}
        </Button>
        <Button
          onClick={onClick(question.id, 'B')}>
          👉
          {question.choices[1]}
        </Button>
      </span>
    </Container>
  );
}

Question.propTypes = {
  question: questionType.isRequired,
  onClick: funcType.isRequired,
};
