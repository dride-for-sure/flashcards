import PropTypes from 'prop-types';
import GameTitle from '../../../components/Cards/GameTitle/GameTitle';
import Play from '../../../components/Cards/Play/Play';
import Questions from '../../../components/Cards/Questions/Questions';
import Shuffle from '../../../components/Cards/Shuffle/Shuffle';
import Container from './styles';

export default function Grid(
  {
    questions,
    setQuestions,
    shuffleQuestions,
    onMissed,
    onChecked,
    gameMode,
    setGameMode,
  },
) {
  return (
    <Container>
      <GameTitle />
      <Shuffle
        questions={questions}
        shuffleQuestions={shuffleQuestions}
        gameMode={gameMode}
        setGameMode={setGameMode} />
      <Play
        setQuestions={setQuestions}
        questions={questions}
        gameMode={gameMode}
        setGameMode={setGameMode} />
      <Questions
        questions={questions}
        onMissed={onMissed}
        onChecked={onChecked}
        gameMode={gameMode} />
    </Container>
  );
}

Grid.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    topic: PropTypes.string,
    description: PropTypes.string,
    nerdfactor: PropTypes.string,
    status: PropTypes.string,
    answer: PropTypes.shape({
      a: PropTypes.string,
      b: PropTypes.string,
    }),
  })).isRequired,
  setQuestions: PropTypes.func.isRequired,
  shuffleQuestions: PropTypes.func.isRequired,
  onMissed: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  gameMode: PropTypes.string.isRequired,
  setGameMode: PropTypes.func.isRequired,
};
