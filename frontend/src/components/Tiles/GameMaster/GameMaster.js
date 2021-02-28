import PropTypes from 'prop-types';
import Container from './styled';

export default function GameMaster({ onClick }) {
  return (
    <Container>
      <button type="button" onClick={onClick}>⚔️</button>
    </Container>
  );
}

GameMaster.propTypes = {
  onClick: PropTypes.func.isRequired,
};
