import { Link } from 'react-router-dom';
import { H1, Head, Span } from './styles';

export default function GameTitle() {
  return (
    <Head>
      <H1>Drop it like its hot</H1>
      <Span>Awesome coding transfunctioner</Span>
      <Link to="/about">
        <small>About</small>
      </Link>
    </Head>
  );
}
