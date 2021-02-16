import PropTypes from 'prop-types';
import { Button, Container, Message } from './styles';

export default function Congrats({ handleCongratsClick, results }) {
  const result = () => {
    if (results.missed > results.checked) {
      return ('loose');
    } if (results.missed === results.checked) {
      return ('draw');
    }
    return ('win');
  };

  const count = (
    <span>
      🤟
      {' '}
      {results.checked}
      {' '}
      / ☠️
      {' '}
      {results.missed}
    </span>
  );

  const btn = (
    <Button onClick={() => handleCongratsClick()}>
      Again, again and again!
    </Button>
  );

  const win = (
    <Message>
      <span>🏅</span>
      {count}
      <span>Well done! Praise the nerd!</span>
      {btn}
    </Message>
  );

  const draw = (
    <Message>
      <span>🤒</span>
      {count}
      <span>Well, trying is not enough...</span>
      {btn}
    </Message>
  );

  const loose = (
    <Message>
      <span>☠️ </span>
      {count}
      <span>This was probably nothing</span>
      {btn}
    </Message>
  );

  return (
    <Container result={result()}>
      {result() === 'win' ? win : null}
      {result() === 'draw' ? draw : null}
      {result() === 'loose' ? loose : null}
    </Container>

  );
}

Congrats.propTypes = {
  handleCongratsClick: PropTypes.func.isRequired,
  results: PropTypes.shape({
    missed: PropTypes.number,
    checked: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};
