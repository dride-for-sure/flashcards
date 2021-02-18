import PropTypes from 'prop-types';
import SinglePlayer from './styles';

export default function Player({ player }) {
  const skill = (() => {
    if (player.history.won > 5) {
      return 'master';
    } if (player.history.won > 2) {
      return 'ninja';
    }
    return 'noob';
  }
  )();

  return (
    <SinglePlayer skill={skill}>
      <span>
        {skill === 'master' && '🥷'}
        {skill === 'ninja' && '💪'}
        {skill === 'noob' && '👶'}
      </span>
      <span>{player.name}</span>
      <span>{`Won ${player.history.won} and lost ${player.history.lost}`}</span>
    </SinglePlayer>
  );
}

Player.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    history: PropTypes.shape({
      won: PropTypes.number,
      lost: PropTypes.number,
    }),
  }).isRequired,
};
