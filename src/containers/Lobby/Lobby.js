import PropTypes from 'prop-types';
import Countdown from '../../components/Cards/Countdown/Countdown';
import GameLogo from '../../components/Cards/GameLogo/GameLogo';
import GameTitle from '../../components/Cards/GameTitle/GameTitle';
import PlayerList from '../../components/Cards/PlayerList/PlayerList';
import StartGame from '../../components/Cards/StartGame/StartGame';
import Container from './styles';

export default function Lobby(
  {
    game,
    player,
    setPlayer,
    countdown,
    onGameStart,
  },
) {
  return (
    <>
      <Container>
        <GameLogo />
        <GameTitle />
        {countdown === '' && (
          <StartGame
            onGameStart={onGameStart} />
        )}
        {countdown !== '' && (
          <Countdown
            countdown={countdown} />
        )}
        <PlayerList
          game={game}
          player={player}
          setPlayer={setPlayer} />
      </Container>
    </>
  );
}

Lobby.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      points: PropTypes.number,
    })),
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      level: PropTypes.number,
      subject: PropTypes.string,
      question: PropTypes.string,
      choices: PropTypes.arrayOf(PropTypes.string),
    })),
  }).isRequired,
  player: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setPlayer: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
  onGameStart: PropTypes.func.isRequired,
};
