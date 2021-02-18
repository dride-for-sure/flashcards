import PropTypes from 'prop-types';
import Container from './styles';

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
    <Container skill={skill}>
      <span>
        {skill === 'master' && '🥷'}
        {skill === 'ninja' && '💪'}
        {skill === 'noob' && '👶'}
      </span>
      <h1>{player.name}</h1>
      <span>{`Won ${player.history.won} and lost ${player.history.lost}`}</span>
    </Container>
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
