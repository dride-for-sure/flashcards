import PropTypes from 'prop-types';
import Container from './styles';

export default function Countdown({ countdown }) {
  return (
    <Container>
      <h1>{countdown}</h1>
    </Container>
  );
}

Countdown.propTypes = {
  countdown: PropTypes.number.isRequired,
};
