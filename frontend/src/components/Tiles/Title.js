import styled from 'styled-components/macro';
import Tiles from './Tiles';

export default function Title() {
  return (
    <Tiles bg="var(--color-green-dark)">
      <h1>Mortal Coding Combat</h1>
      <Span>Fight like the snake in the eagles shadow</Span>
    </Tiles>
  );
}

const Span = styled.div`
  margin-top: 10px;
  font-style: italic;
  flex-grow: 2;
`;
