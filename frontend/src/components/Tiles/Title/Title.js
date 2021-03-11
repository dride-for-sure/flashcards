import Tiles from '../Tiles';
import Container from './styled';

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
