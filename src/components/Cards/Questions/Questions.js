import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from './styles';

export default function Questions(
  {
    questions,
    gameMode,
    getNerdfactorIcon,
    onQuestionClick,
  },
) {
  return (
    <>
      {
        questions.map((question) => (
          <Card
            status={question.status}
            nerdfactor={question.nerdfactor}
            key={question.id}
            gameMode={gameMode}>
            <span>
              {getNerdfactorIcon(question)}
            </span>
            <span>
              {question.topic}
              {' '}
            </span>
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
            <span> Timer</span>
          </Card>
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
  getNerdfactorIcon: PropTypes.func.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
};
