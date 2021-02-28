import PropTypes from 'prop-types';
import Container from './styled';

export default function Waiting({ gameMasterName }) {
  return (
    <Container>
      <h1>Waiting</h1>
      <span>
        This round master
        {' '}
        {gameMasterName}
        {' '}
        has to start the game
      </span>
    </Container>
  );
}

Waiting.propTypes = {
  gameMasterName: PropTypes.string.isRequired,
};
