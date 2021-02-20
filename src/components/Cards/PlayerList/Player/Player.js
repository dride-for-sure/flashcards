import PropTypes from 'prop-types';
import getPlayerCardStyle from '../../../../common/handleCardStyle';
import Container from './styles';

export default function Player({ player }) {
  const playerCardStyle = getPlayerCardStyle();

  return (
    <Container background={playerCardStyle.background}>
      <span>
        {playerCardStyle.icon}
      </span>
      <h1>{player.name}</h1>
    </Container>
  );
}

Player.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
