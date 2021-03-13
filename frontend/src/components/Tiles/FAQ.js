import { string } from 'prop-types';
import styled from 'styled-components/macro';
import Tiles from './Tiles';

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

const Container = styled.div`

  > h1 {
      font-weight: 600;
      font-size: 2rem;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      word-break: break-word;
  }

  > span {
    margin-top: 10px;
    font-style: italic;
    flex-grow: 2;
    display:block;
  }
`;

FAQ.propTypes = {
  playerName: string.isRequired,
};
