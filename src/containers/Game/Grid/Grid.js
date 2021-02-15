import PropTypes from 'prop-types';
import GameTitle from '../../../components/Cards/GameTitle/GameTitle';
import Play from '../../../components/Cards/Play/Play';
import Questions from '../../../components/Cards/Questions/Questions';
import Shuffle from '../../../components/Cards/Shuffle/Shuffle';
import Container from './styles';

export default function Grid(
  {
    questions,
    gameMode,
    onPlayClick,
    onShuffleClick,
    getNerdfactorIcon,
    onQuestionClick,
  },
) {
  return (
    <Container>
      <GameTitle />
      <Shuffle
        gameMode={gameMode}
        onShuffleClick={onShuffleClick} />
      <Play
        gameMode={gameMode}
        onPlayClick={onPlayClick} />
      <Questions
        questions={questions}
        gameMode={gameMode}
        getNerdfactorIcon={getNerdfactorIcon}
        onQuestionClick={onQuestionClick} />
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
      a: PropTypes.shape({ description: PropTypes.string, correct: PropTypes.bool }),
      b: PropTypes.shape({ description: PropTypes.string, correct: PropTypes.bool }),
    }),
  })).isRequired,
  gameMode: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onShuffleClick: PropTypes.func.isRequired,
  getNerdfactorIcon: PropTypes.func.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
};
