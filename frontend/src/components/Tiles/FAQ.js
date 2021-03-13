import { string } from 'prop-types';
import styled from 'styled-components/macro';
import Tiles from './Tiles';

export default function FAQ({ playerName }) {
  return (
    <Tiles bg="var(--color-green-dark)">
      <h1>
        Hey
        {' '}
        {playerName}
        !
      </h1>
      <Span>
        This is the lobby.
      </Span>
      <Span>
        Feel free to start a new game or join an existing one.
      </Span>
    </Tiles>
  );
}

const Span = styled.div`
    margin-top: 10px;
    font-style: italic;
    flex-grow: 2;
    display:block;

`;

FAQ.propTypes = {
  playerName: string.isRequired,
};
