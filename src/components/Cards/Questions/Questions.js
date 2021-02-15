import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from './styles';

export default function Questions({ questions, gameMode, onMissed, onChecked }) {
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
          <Card
            status={question.status}
            nerdfactor={question.nerdfactor}
            key={question.id}
            gameMode={gameMode}>
            <span>
              {nerdfactorIcon(question)}
            </span>
            <span>
              {question.topic}
              {' '}
            </span>
            <span>{question.description}</span>
            <span>
              <Button
                disabled={question.status !== 'selected'}
                onClick={() => {
                  if (question.answer.a.correct === true) {
                    onMissed(question);
                  } else {
                    onChecked(question);
                  }
                }}>
                👉
                {question.answer.a.description}
              </Button>
              <Button
                disabled={question.status !== 'selected'}
                onClick={() => {
                  if (question.answer.b.correct === true) {
                    onMissed(question);
                  } else {
                    onChecked(question);
                  }
                }}>
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
  questions: PropTypes.arrayOf(PropTypes.shape({
    topic: PropTypes.string,
    description: PropTypes.string,
    nerdfactor: PropTypes.string,
    status: PropTypes.string,
    answer: PropTypes.shape({
      a: PropTypes.shape({ description: PropTypes.string, correct: PropTypes.bool }),
      b: PropTypes.shape({ description: PropTypes.string, correct: PropTypes.bool }),
    }),
  })).isRequired,
  onMissed: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  gameMode: PropTypes.string.isRequired,
};
