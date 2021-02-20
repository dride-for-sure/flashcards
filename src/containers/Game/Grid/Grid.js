import PropTypes from 'prop-types';
import Countdown from '../../../components/Cards/Countdown/Countdown';
import GameLogo from '../../../components/Cards/GameLogo/GameLogo';
import GameTitle from '../../../components/Cards/GameTitle/GameTitle';
import PlayerList from '../../../components/Cards/PlayerList/PlayerList';
import Questions from '../../../components/Cards/Questions/Questions';
import StartGame from '../../../components/Cards/StartGame/StartGame';
import Charts from '../../../components/Charts/Charts';
import Container from './styles';

export default function Grid(
  {
    questions,
    gameMode,
    onStartGameClick,
    onQuestionClick,
    players,
    calcPlayerScoreColor,
    calcPlayerScoreWidth,
    countdown,
    playerInfos,
    setPlayerInfos,
  },
) {
  return (
    <>
      <Container>
        <GameLogo />
        <GameTitle />
        {gameMode === 'lobby' && (
        <StartGame
          onStartGameClick={onStartGameClick} />
        )}
        {gameMode === 'countdown' && (
        <Countdown
          countdown={countdown} />
        )}
        {(gameMode === 'lobby' || gameMode === 'countdown') && (
        <PlayerList
          players={players}
          playerInfos={playerInfos}
          setPlayerInfos={setPlayerInfos} />
        )}
        {gameMode !== 'lobby' && (
        <Questions
          questions={questions}
          gameMode={gameMode}
          onQuestionClick={onQuestionClick} />
        )}
      </Container>
      {gameMode === 'play' && (
      <Charts
        players={players}
        calcPlayerScoreColor={calcPlayerScoreColor}
        calcPlayerScoreWidth={calcPlayerScoreWidth} />
      )}
    </>
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
  calcPlayerScoreColor: PropTypes.func.isRequired,
  calcPlayerScoreWidth: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
  playerInfos: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setPlayerInfos: PropTypes.func.isRequired,
};
