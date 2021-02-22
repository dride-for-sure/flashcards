import PropTypes from 'prop-types';
import Player from './Player/Player';
import SetPlayerName from './PlayerInfos/SetPlayerName';

export default function PlayerList({ game, player, setPlayer }) {
  return (
    <>
      <SetPlayerName player={player} setPlayer={setPlayer} />
      {game.players.map((aPlayer) => <Player key={aPlayer.id} player={aPlayer} />)}
    </>
  );
}

PlayerList.propTypes = {
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
};
