import PropTypes from 'prop-types';
import Container from './styled';

export default function Waiting({ gameMasterName }) {
  return (
    <Container>
      <h1>Be prepared!</h1>
      <span>
        The master
        {' '}
        <b>{gameMasterName}</b>
        {' '}
        of this round starts the game immediately...
      </span>
    </Container>
  );
}

Waiting.propTypes = {
  gameMasterName: PropTypes.string.isRequired,
};
