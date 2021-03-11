import { string } from 'prop-types';
import Tiles from '../Tiles';
import Container from './styled';

export default function Waiting({ gameMasterName }) {
  return (
    <Tiles bg="var(--color-monochom-medium)">
      <Container>
        <h1>Ready?</h1>
        <span>
          <b>{gameMasterName}</b>
          {' '}
          will start this round immediately...maybe!
        </span>
      </Container>
    </Tiles>
  );
}

Waiting.propTypes = {
  gameMasterName: string.isRequired,
};
