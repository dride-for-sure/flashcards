import PropTypes from 'prop-types';
import Player from './Player/Player';

export default function PlayerList({ players }) {
  return (
    <>
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
};
