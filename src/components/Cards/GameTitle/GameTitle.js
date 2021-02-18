import { Link } from 'react-router-dom';
import { H1, Head, Span } from './styles';

export default function GameTitle() {
  return (
    <Head>
      <H1>Mortal Coding Combat</H1>
      <Span>Fight like the snake in the eagles shadow</Span>
      <Link to="/about">
        <small>About</small>
      </Link>
    </Head>
  );
}
