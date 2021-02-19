import PropTypes from 'prop-types';
import PlayerScore from './PlayerScore/PlayerScore';
import Container from './styles';

export default function Charts({ players, calcPlayerScoreColor, calcPlayerScoreWidth }) {
  return (
    <Container>
      {players.map((player) => (
        <PlayerScore
          key={player.id}
          player={player}
          calcPlayerScoreColor={calcPlayerScoreColor}
          calcPlayerScoreWidth={calcPlayerScoreWidth}
        />
      ))}
    </Container>
  );
}

Charts.propTypes = {
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
};
