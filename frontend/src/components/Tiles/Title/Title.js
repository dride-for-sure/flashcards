import styled from 'styled-components/macro';
import Tiles from '../Tiles';

export default function Title() {
  return (
    <Tiles bg="var(--color-green-dark)">
      <Container>
        <h1>Mortal Coding Combat</h1>
        <span>Fight like the snake in the eagles shadow</span>
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
  }

  > span {
    margin-top: 10px;
    font-style: italic;
    flex-grow: 2;
  }
`;
