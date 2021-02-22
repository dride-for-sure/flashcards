import PropTypes from 'prop-types';
import PlayerScore from './PlayerScore/PlayerScore';
import Container from './styles';

export default function Charts({ game, calcPlayerScoreColor, calcPlayerScoreWidth }) {
  return (
    <Container>
      {game.player.map((player) => (
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
  game: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    player: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      points: PropTypes.number,
    })),
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      question: PropTypes.string,
    })),
  }).isRequired,
  calcPlayerScoreColor: PropTypes.func.isRequired,
  calcPlayerScoreWidth: PropTypes.func.isRequired,
};
