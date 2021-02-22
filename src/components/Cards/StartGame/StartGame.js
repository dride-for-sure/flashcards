import PropTypes from 'prop-types';
import { Container, Difficulty } from './styles';

export default function StartGame({ onGameStart }) {
  return (
    <Container>
      <h1>To start choose a level</h1>
      <span>
        <Difficulty
          onClick={() => { onGameStart('easy'); }}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          onClick={() => { onGameStart('moderat'); }}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          onClick={() => { onGameStart('hard'); }}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </Container>
  );
}

StartGame.propTypes = {
  onGameStart: PropTypes.func.isRequired,
};
