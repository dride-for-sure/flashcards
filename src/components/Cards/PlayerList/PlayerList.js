import PropTypes from 'prop-types';
import Player from './Player/Player';
import SetPlayerName from './PlayerInfos/SetPlayerName';

export default function PlayerList({ players, thisPlayer, setThisPlayer }) {
  return (
    <>
      <SetPlayerName thisPlayer={thisPlayer} setThisPlayer={setThisPlayer} />
      {players.map((player) => <Player key={player.id} player={player} />)}
    </>
  );
}

PlayerList.propTypes = {
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
  thisPlayer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setThisPlayer: PropTypes.func.isRequired,
};
