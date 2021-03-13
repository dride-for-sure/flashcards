import styled from 'styled-components/macro';
import Tiles from '../Tiles';

export default function NoAvailableGames() {
  return (
    <Tiles bg="var(--color-orange-light)">
      <Container>
        <h1>No open games so far</h1>
        <span>If you are bold, open your own.</span>
      </Container>
    </Tiles>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

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
  }
`;
