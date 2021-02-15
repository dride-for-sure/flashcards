import PropTypes from 'prop-types';
import { Button, Card } from './styles';

export default function Questions({ questions, gameMode }) {
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
              {() => {
                if (question.nerdfactor === '3') {
                  return '🤯';
                } if (question.nerdfactor === '2') {
                  return '💪';
                }
                return '🥱';
              }}
            </span>
            <span>
              {question.topic}
              {' '}
            </span>
            <span>{question.description}</span>
            <span>
              <Button disabled={question.status !== 'selected'}>
                👉
                {question.answer.a}
              </Button>
              <Button disabled={question.status !== 'selected'}>
                👉
                {question.answer.b}
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
    answer: PropTypes.arrayOf(PropTypes.shape({
      a: PropTypes.string,
      b: PropTypes.string,
    })),
  })),
  gameMode: PropTypes.string,
};

Questions.defaultProps = {
  questions: [],
  gameMode: 'empty',
};
