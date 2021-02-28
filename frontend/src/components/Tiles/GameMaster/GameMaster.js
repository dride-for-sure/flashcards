import PropTypes from 'prop-types';
import { Container, StartGame } from './styled';

export default function GameMaster({ onClick }) {
  return (
    <Container>
      <StartGame type="button" title="Lets fight!" onClick={onClick}>⚔️</StartGame>
    </Container>
  );
}

GameMaster.propTypes = {
  onClick: PropTypes.func.isRequired,
};
