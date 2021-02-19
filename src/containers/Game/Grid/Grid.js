import PropTypes from 'prop-types';
import GameLogo from '../../../components/Cards/GameLogo/GameLogo';
import GameTitle from '../../../components/Cards/GameTitle/GameTitle';
import PlayerList from '../../../components/Cards/PlayerList/PlayerList';
import Questions from '../../../components/Cards/Questions/Questions';
import StartGame from '../../../components/Cards/StartGame/StartGame';
import Container from './styles';

export default function Grid(
  {
    questions,
    gameMode,
    onStartGameClick,
    onQuestionClick,
    players,
  },
) {
  return (
    <Container>
      <GameLogo />
      <GameTitle />
      <StartGame
        gameMode={gameMode}
        onStartGameClick={onStartGameClick} />
      {gameMode !== 'lobby' && (
        <Questions
          questions={questions}
          gameMode={gameMode}
          onQuestionClick={onQuestionClick} />
      )}
      {gameMode === 'lobby' && (
        <PlayerList players={players} />
      )}
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
  onStartGameClick: PropTypes.func.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      history: PropTypes.shape({
        won: PropTypes.number,
        lost: PropTypes.number,
      }),
    }),
  ).isRequired,
};
