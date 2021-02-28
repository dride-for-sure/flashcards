import PropTypes from 'prop-types';
import { Container } from '../styles';

export default function ResultListItem({ position, player, playerDetails }) {
  const itsMe = playerDetails.id === player.id ? 'true' : 'false';

  return (
    <Container>
      <span itsMe={itsMe}>
        {position}
        .
      </span>
      <span>{player.name}</span>
      <span>{player.points}</span>
    </Container>
  );
}

ResultListItem.propTypes = {
  position: PropTypes.number.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.number,
  }).isRequired,
  playerDetails: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
