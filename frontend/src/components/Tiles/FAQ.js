import { string } from 'prop-types';
import styled from 'styled-components/macro';
import Tiles from './Tiles';

export default function FAQ({ playerName }) {
  return (
    <Tiles bg="var(--color-green-dark)">
      <Hey>Hey,</Hey>
      <h1>{`${playerName}!`}</h1>
      <Span>
        Feel free to start a new game or join an existing one.
      </Span>
    </Tiles>
  );
}

const Hey = styled.span`
  margin-bottom: 5px;
  font-style: italic;
`;

const Span = styled.span`
  margin-top: 5px;
  font-style: italic;
`;

FAQ.propTypes = {
  playerName: string.isRequired,
};
