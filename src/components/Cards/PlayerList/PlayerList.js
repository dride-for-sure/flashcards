import PropTypes from 'prop-types';
import Player from './Player/Player';
import SetPlayerName from './PlayerInfos/SetPlayerName';

export default function PlayerList({ players, playerInfos, setPlayerInfos }) {
  return (
    <>
      <SetPlayerName playerInfos={playerInfos} setPlayerInfos={setPlayerInfos} />
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
  playerInfos: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setPlayerInfos: PropTypes.func.isRequired,
};
