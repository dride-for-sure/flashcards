import PropTypes from 'prop-types';
import { deleteAllQuestions, selectRandomQuestion } from '../../../common/helper';
import Button from './styles';

export default function PlayControls({ setQuestions, questions, gameMode, setGameMode }) {
  const btn = () => {
    if (gameMode === 'play') {
      return 'Give up!';
    } if (gameMode === 'finish') {
      return 'Restart';
    } if (gameMode === 'prepared') {
      return 'Punch it!';
    }
    return 'Shuffle first!';
  };

  return (
    <Button
      disabled={gameMode !== 'ready' && gameMode !== 'play' && gameMode !== 'finish' && gameMode !== 'prepared'}
      gameMode={gameMode}
      onClick={() => {
        if (gameMode === 'prepared') {
          setGameMode('play');
          setQuestions(selectRandomQuestion(questions));
        } else {
          setGameMode('empty');
          setQuestions(deleteAllQuestions());
        }
      }}>
      {btn()}
    </Button>
  );
}

PlayControls.propTypes = {
  setQuestions: PropTypes.func.isRequired,
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
  gameMode: PropTypes.string.isRequired,
  setGameMode: PropTypes.func.isRequired,
};
