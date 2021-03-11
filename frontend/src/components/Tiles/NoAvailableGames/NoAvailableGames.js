import Tiles from '../Tiles';
import Container from './styles';

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
