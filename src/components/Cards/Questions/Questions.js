import PropTypes from 'prop-types';
import React from 'react';
import { Button, Container } from './styles';

export default function Questions({ game, onQuestionAnswered }) {
  const questionLevel = (level) => {
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
        game.questions.map((question) => (
          <Container
            status={question.status}
            level={question.level}
            key={question.id}>
            <span>
              {questionLevel(question.level)}
            </span>
            <h1>
              {question.title}
            </h1>
            <span>{question.description}</span>
            <span>
              <Button
                onClick={() => { onQuestionAnswered(question.id, 'a'); }}>
                👉
                {question.answers.a}
              </Button>
              <Button
                onClick={() => { onQuestionAnswered(question.id, 'b'); }}>
                👉
                {question.answer.b}
              </Button>
            </span>
          </Container>
        ))
      }
    </>
  );
}

Questions.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    player: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      points: PropTypes.number,
    })),
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      level: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      answers: PropTypes.shape({
        a: PropTypes.string,
        b: PropTypes.string,
      }),
      status: PropTypes.string,
    })),
  }).isRequired,
  onQuestionAnswered: PropTypes.func.isRequired,
};
