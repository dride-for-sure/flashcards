import React from 'react';
import { funcType, questionType } from '../../../types/types';
import { Button, Container } from './styles';

export default function Question({ question, onClick }) {
  const levelIcon = (level) => {
    if (level === '3') {
      return '🤯';
    } if (level === '2') {
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
