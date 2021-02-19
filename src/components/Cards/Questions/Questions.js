import PropTypes from 'prop-types';
import React from 'react';
import { Button, Container } from './styles';

export default function Questions(
  {
    questions,
    gameMode,
    onQuestionClick,
  },
) {
  const nerdfactorIcon = (question) => {
    if (question.nerdfactor === '3') {
      return '🤯';
    } if (question.nerdfactor === '2') {
      return '💪';
    }
    return '🥱';
  };

  return (
    <>
      {
        questions.map((question) => (
          <Container
            status={question.status}
            nerdfactor={question.nerdfactor}
            key={question.id}
            gameMode={gameMode}>
            <span>
              {nerdfactorIcon(question)}
            </span>
            <h1>
              {question.topic}
            </h1>
            <span>{question.description}</span>
            <span>
              <Button
                disabled={question.status !== 'selected'}
                onClick={() => { onQuestionClick(question, 'a'); }}>
                👉
                {question.answer.a.description}
              </Button>
              <Button
                disabled={question.status !== 'selected'}
                onClick={() => { onQuestionClick(question, 'b'); }}>
                👉
                {question.answer.b.description}
              </Button>
            </span>
          </Container>
        ))
      }
    </>
  );
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      description: PropTypes.string,
      nerdfactor: PropTypes.string,
      status: PropTypes.string,
      answer: PropTypes.shape({
        a: PropTypes.shape({ description: PropTypes.string, correct: PropTypes.bool }),
        b: PropTypes.shape({ description: PropTypes.string, correct: PropTypes.bool }),
      }),
    }),
  ).isRequired,
  gameMode: PropTypes.string.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
};
