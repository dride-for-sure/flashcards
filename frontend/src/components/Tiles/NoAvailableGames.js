import styled from 'styled-components/macro';
import Tiles from './Tiles';

export default function NoAvailableGames() {
  return (
    <Tiles bg="var(--color-monochrom-light)">
      <h1>No open games so far</h1>
      <Span>If you are bold, open your own.</Span>
    </Tiles>
  );
}

const Span = styled.span`
    margin-top: 10px;
    font-style: italic;
`;
