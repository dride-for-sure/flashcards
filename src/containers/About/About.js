import { Link, useParams } from 'react-router-dom';
import { Center, Container } from './styles';

export default function About() {
  const { slug } = useParams();

  return (
    <Container>
      <Center>
        <Link to="/">
          <span>👊</span>
          <h1>Awesome coding transfunctioner</h1>
          <em>
            {slug === undefined ? 'Drop it like its hot!' : `${slug
            }...guess what?`}
          </em>
        </Link>
      </Center>
    </Container>
  );
}
