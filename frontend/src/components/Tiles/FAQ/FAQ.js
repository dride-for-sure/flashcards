import { string } from 'prop-types';
import Tiles from '../Tiles';
import Container from './styled';

export default function FAQ({ playerName }) {
  return (
    <Tiles bg="var(--color-green-dark)">
      <Container>
        <h1>
          Hey
          {' '}
          {playerName}
          !
        </h1>
        <span>
          This is the lobby.
        </span>
        <span>
          Feel free to start a new game or join an existing one.
        </span>
      </Container>
    </Tiles>
  );
}

FAQ.propTypes = {
  playerName: string.isRequired,
};
